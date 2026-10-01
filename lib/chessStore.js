import { NextResponse } from "next/server";

// Server-only helpers for "Play a Friend" chess (private mode).
// Game state lives in the Upstash Redis store AGILE_Chess_Games via its REST API.

const KEY_PREFIX = "chess:game:";
const INDEX_KEY = "chess:games";
export const GAME_TTL_SECONDS = 60 * 60 * 24 * 30; // games expire 30 days after the last move
const ALPHABET = "abcdefghijkmnpqrstuvwxyz23456789";

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
    hostLink: "/chess/play/" + game.id + "?t=" + game.tokens[hostSeat],
    friendLink: "/chess/play/" + game.id + "?t=" + game.tokens[friendSeat],
  };
}
