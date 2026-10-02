import { NextResponse } from "next/server";
import { BLACK, WHITE, applyMove, gameStatus, legalMovesForColor, newGameState } from "../../../../../lib/chessEngine";
import {
  MATCH_GAMES,
  emptyMatch,
  getGame,
  hostAway,
  notifyHost,
  playerView,
  presenceView,
  readPresence,
  roleOf,
  saveGame,
  seatFor,
  touchPresence,
} from "../../../../../lib/chessStore";

export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store" };
const FILES = "abcdefgh";
const PROMOS = ["Q", "R", "B", "N"];

function json(data, status = 200) {
  return NextResponse.json(data, { status, headers: NO_STORE });
}

function validSq(s) {
  return Array.isArray(s) && s.length === 2 && s.every((n) => Number.isInteger(n) && n >= 0 && n < 8);
}

function sqName(s) {
  return FILES[s[1]] + (8 - s[0]);
}

function other(color) {
  return color === WHITE ? BLACK : WHITE;
}

// Server-side match tally (players cannot edit it). Counted once, when a game ends.
function recordResult(game) {
  const m = game.match || emptyMatch();
  const w = game.result.winner;
  const who = !w ? null : w === game.hostColor ? "host" : "friend";
  if (who) m[who] += 1;
  else m.draws += 1;
  m.history.push({ winner: who, reason: game.result.reason });
  game.match = m;
}

async function respond(game, seat) {
  let map = {};
  try {
    map = await readPresence(game);
  } catch {
    map = {};
  }
  return json({ ...playerView(game, seat), presence: presenceView(map, game, seat) });
}

// Email Byron when his friend moves (or the game ends) while Byron is not watching the board.
async function maybeNotifyHost(game, seat) {
  if (roleOf(game, seat) !== "friend") return;
  try {
    const map = await readPresence(game);
    if (!hostAway(map)) return;
    const who = game.names[seat];
    if (game.result) {
      await notifyHost(game, "♟ Game over vs " + who, "Your game with " + who + " has ended. See the result on the board.");
    } else {
      await notifyHost(game, "♟ " + who + " moved — your turn", who + " made a move. It is your turn.");
    }
  } catch {
    // notifications are best-effort
  }
}

async function loadForPlayer(id, token) {
  const game = await getGame(id);
  if (!game) return { error: json({ error: "This game was not found or has expired." }, 404) };
  const seat = seatFor(game, token);
  if (!seat) return { error: json({ error: "This game link is not valid." }, 403) };
  return { game, seat };
}

// GET: current board for a player (?t=<player token>)
export async function GET(request, { params }) {
  const { id } = await params;
  const token = new URL(request.url).searchParams.get("t") || "";
  try {
    const { game, seat, error } = await loadForPlayer(id, token);
    if (error) return error;
    let map = {};
    try {
      const p = await touchPresence(game, seat);
      map = p.map;
      if (p.firstVisit && p.role === "friend") {
        const who = game.names[seat];
        await notifyHost(game, "♟ " + who + " joined your chess game", who + " just opened your AGILE Chess invite. Game on!");
      }
    } catch {
      map = {};
    }
    return json({ ...playerView(game, seat), presence: presenceView(map, game, seat) });
  } catch (err) {
    return json({ error: err.message || "Could not load game." }, 500);
  }
}

// POST: { t, version, action: "move" | "resign" | "rematch", from, to, promoteTo }
export async function POST(request, { params }) {
  const { id } = await params;
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Bad request." }, 400);
  }
  try {
    const { game, seat, error } = await loadForPlayer(id, String(body.t || ""));
    if (error) return error;
    const action = body.action || "move";

    if (action === "rematch") {
      if (!game.result) return json({ error: "This game is still in progress." }, 409);
      if (body.version !== game.version) return respond(game, seat); // already rematched
      const fresh = {
        ...game,
        state: newGameState(),
        status: "playing",
        result: null,
        version: game.version + 1,
        moves: [],
        lastMove: null,
        hostColor: other(game.hostColor),
        names: { w: game.names.b, b: game.names.w },
        tokens: { w: game.tokens.b, b: game.tokens.w },
        updatedAt: Date.now(),
      };
      if (game.match && game.match.history.length >= MATCH_GAMES) fresh.match = emptyMatch(); // start a new match
      await saveGame(fresh);
      return respond(fresh, other(seat));
    }

    if (game.result) return json({ error: "This game is over." }, 409);

    if (action === "resign") {
      game.result = { winner: other(seat), reason: "resignation" };
      game.status = "over";
      recordResult(game);
      game.version += 1;
      game.updatedAt = Date.now();
      await saveGame(game);
      await maybeNotifyHost(game, seat);
      return respond(game, seat);
    }

    if (action !== "move") return json({ error: "Unknown action." }, 400);
    if (body.version !== game.version) return json({ error: "The board changed — refreshing." }, 409);
    if (game.state.turn !== seat) return json({ error: "It is not your turn." }, 409);
    if (!validSq(body.from) || !validSq(body.to)) return json({ error: "Bad move." }, 400);

    const legal = legalMovesForColor(game.state, seat).find(
      (m) => m.from[0] === body.from[0] && m.from[1] === body.from[1] && m.to[0] === body.to[0] && m.to[1] === body.to[1]
    );
    if (!legal) return json({ error: "That move is not legal." }, 400);

    const promoteTo = PROMOS.includes(body.promoteTo) ? body.promoteTo : "Q";
    const next = applyMove(game.state, legal.promo ? { ...legal, promoteTo } : legal);
    const status = gameStatus(next);

    game.state = next;
    game.status = status;
    game.moves.push(sqName(legal.from) + sqName(legal.to) + (legal.promo ? promoteTo.toLowerCase() : ""));
    game.lastMove = { from: legal.from, to: legal.to };
    if (status === "checkmate") game.result = { winner: seat, reason: "checkmate" };
    else if (status === "stalemate") game.result = { winner: null, reason: "stalemate" };
    if (game.result) recordResult(game);
    game.version += 1;
    game.updatedAt = Date.now();
    await saveGame(game);
    await maybeNotifyHost(game, seat);
    return respond(game, seat);
  } catch (err) {
    return json({ error: err.message || "Could not save move." }, 500);
  }
}
