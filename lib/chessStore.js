import { NextResponse } from "next/server";

// Server-only helpers for "Play a Friend" chess (private mode).
// Game state lives in the Upstash Redis store AGILE_Chess_Games via its REST API.

const KEY_PREFIX = "chess:game:";
const INDEX_KEY = "chess:games";
export const GAME_TTL_SECONDS = 60 * 60 * 24 * 30; // games expire 30 days after the last move
const ALPHABET = "abcdefghijkmnpqrstuvwxyz23456789";
export const MATCH_GAMES = 5; // games per match; the server keeps the tally

function endpoint() {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) throw new Error("Chess database is not connected.");
  return { url: url.replace(/\/$/, ""), token };
}

async function call(path, payload) {
  const { url, token } = endpoint();
  const res = await fetch(url + path, {
    method: "POST",
    headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Chess database error (" + res.status + ")");
  return res.json();
}

async function redis(command) {
  const data = await call("", command);
  if (data.error) throw new Error(data.error);
  return data.result;
}

async function pipeline(commands) {
  const data = await call("/pipeline", commands);
  return data.map((d) => {
    if (d.error) throw new Error(d.error);
    return d.result;
  });
}

export function randomId(length) {
  const bytes = new Uint8Array(length);
  globalThis.crypto.getRandomValues(bytes);
  let out = "";
  for (const b of bytes) out += ALPHABET[b % ALPHABET.length];
  return out;
}

export function isValidGameId(id) {
  return typeof id === "string" && /^[a-z2-9]{10}$/.test(id);
}

export async function getGame(id) {
  if (!isValidGameId(id)) return null;
  const raw = await redis(["GET", KEY_PREFIX + id]);
  return raw ? JSON.parse(raw) : null;
}

export async function saveGame(game) {
  await pipeline([
    ["SET", KEY_PREFIX + game.id, JSON.stringify(game), "EX", String(GAME_TTL_SECONDS)],
    ["ZADD", INDEX_KEY, String(game.updatedAt), game.id],
  ]);
}

export async function listGames(limit = 20) {
  const ids = await redis(["ZREVRANGE", INDEX_KEY, "0", String(limit - 1)]);
  if (!ids || ids.length === 0) return [];
  const raws = await redis(["MGET", ...ids.map((id) => KEY_PREFIX + id)]);
  const games = [];
  const expired = [];
  raws.forEach((raw, i) => {
    if (raw) games.push(JSON.parse(raw));
    else expired.push(ids[i]);
  });
  if (expired.length) await redis(["ZREM", INDEX_KEY, ...expired]);
  return games;
}

function safeEqual(a, b) {
  if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export function seatFor(game, token) {
  if (!game || !token) return null;
  if (safeEqual(token, game.tokens.w)) return "w";
  if (safeEqual(token, game.tokens.b)) return "b";
  return null;
}

// Private mode: only someone holding CHESS_HOST_KEY can create or list games.
export function hostCheck(request) {
  const expected = (process.env.CHESS_HOST_KEY || "").trim();
  if (!expected) {
    return NextResponse.json({ error: "Host key is not set up yet (CHESS_HOST_KEY in Vercel)." }, { status: 503 });
  }
  const given = (request.headers.get("x-chess-host-key") || "").trim();
  if (!safeEqual(given, expected)) {
    return NextResponse.json({ error: "Host key not accepted." }, { status: 401 });
  }
  return null;
}

export function emptyMatch() {
  return { host: 0, friend: 0, draws: 0, history: [] };
}

// Match score is tracked by player (host vs friend), not by color, so it stays correct when colors swap.
export function matchInfo(game) {
  const m = game.match || emptyMatch();
  const hostSeat = game.hostColor;
  const friendSeat = hostSeat === "w" ? "b" : "w";
  return {
    target: MATCH_GAMES,
    played: m.history.length,
    draws: m.draws,
    host: { name: game.names[hostSeat], seat: hostSeat, wins: m.host },
    friend: { name: game.names[friendSeat], seat: friendSeat, wins: m.friend },
    history: m.history,
    complete: m.history.length >= MATCH_GAMES,
  };
}

export function playerView(game, seat) {
  return {
    id: game.id,
    seat,
    state: game.state,
    status: game.status,
    result: game.result,
    version: game.version,
    moveCount: game.moves.length,
    lastMove: game.lastMove,
    names: game.names,
    updatedAt: game.updatedAt,
    match: matchInfo(game),
  };
}

export function hostSummary(game) {
  const hostSeat = game.hostColor;
  const friendSeat = hostSeat === "w" ? "b" : "w";
  return {
    id: game.id,
    names: game.names,
    hostColor: hostSeat,
    status: game.status,
    result: game.result,
    moveCount: game.moves.length,
    turn: game.state.turn,
    updatedAt: game.updatedAt,
    match: matchInfo(game),
    hostLink: "/chess/play/" + game.id + "?t=" + game.tokens[hostSeat],
    friendLink: "/chess/play/" + game.id + "?t=" + game.tokens[friendSeat],
  };
}

// ---- Presence ("Bo is here") and email alerts --------------------------
const SEEN_PREFIX = "chess:seen:";
const ONLINE_MS = 180000; // counts as "here" if seen in the last 3 minutes (room to check other windows)
const SEEN_WRITE_MS = 10000; // throttle presence writes to save database commands
const SITE_URL = "https://www.agileconsultingsolutions.com";

export function roleOf(game, seat) {
  return seat === game.hostColor ? "host" : "friend";
}

function parseHash(raw) {
  const map = {};
  if (Array.isArray(raw)) {
    for (let i = 0; i + 1 < raw.length; i += 2) map[raw[i]] = Number(raw[i + 1]);
  } else if (raw && typeof raw === "object") {
    for (const k of Object.keys(raw)) map[k] = Number(raw[k]);
  }
  return map;
}

export async function readPresence(game) {
  return parseHash(await redis(["HGETALL", SEEN_PREFIX + game.id]));
}

// Records that this player has the board open. Returns the presence map and whether this is their first-ever visit.
export async function touchPresence(game, seat) {
  const key = SEEN_PREFIX + game.id;
  const role = roleOf(game, seat);
  const map = await readPresence(game);
  const now = Date.now();
  const firstVisit = !map[role];
  if (!map[role] || now - map[role] > SEEN_WRITE_MS) {
    map[role] = now;
    await pipeline([
      ["HSET", key, role, String(now)],
      ["EXPIRE", key, String(GAME_TTL_SECONDS)],
    ]);
  }
  return { map, firstVisit, role };
}

export function presenceView(map, game, seat) {
  const other = roleOf(game, seat) === "host" ? "friend" : "host";
  const last = map[other] || 0;
  return { opponentJoined: !!last, opponentOnline: !!last && Date.now() - last < ONLINE_MS };
}

export function hostAway(map, ms = 60000) {
  return Date.now() - (map.host || 0) > ms;
}

// Best-effort email to Byron through the site's existing Resend setup (same as the contact form).
export async function notifyHost(game, subject, line) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_TO_EMAIL;
  const from = process.env.INQUIRY_FROM_EMAIL;
  if (!key || !to || !from) return;
  const link = SITE_URL + "/chess/play/" + game.id + "?t=" + game.tokens[game.hostColor];
  const html =
    '<div style="font-family:Georgia,serif;font-size:16px;color:#16263d">' +
    "<p>" + line + "</p>" +
    '<p><a href="' + link + '" style="color:#0c6ca3;font-weight:bold">Open your board</a></p>' +
    '<p style="font-size:12px;color:#888">AGILE Chess · What’s Your Next Move?</p></div>';
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: "Bearer " + key, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: to.split(",").map((t) => t.trim()).filter(Boolean),
        subject,
        html,
        text: line + "\n\nOpen your board: " + link,
      }),
    });
  } catch {
    // email is best-effort; never block the game
  }
}
