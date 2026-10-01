import { NextResponse } from "next/server";
import { BLACK, WHITE, applyMove, gameStatus, legalMovesForColor, newGameState } from "../../../../../lib/chessEngine";
import { getGame, playerView, saveGame, seatFor } from "../../../../../lib/chessStore";

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
    return json(playerView(game, seat));
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
      if (body.version !== game.version) return json(playerView(game, seat)); // already rematched
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
      await saveGame(fresh);
      return json(playerView(fresh, other(seat)));
    }

    if (game.result) return json({ error: "This game is over." }, 409);

    if (action === "resign") {
      game.result = { winner: other(seat), reason: "resignation" };
      game.status = "over";
      game.version += 1;
      game.updatedAt = Date.now();
      await saveGame(game);
      return json(playerView(game, seat));
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
    game.version += 1;
    game.updatedAt = Date.now();
    await saveGame(game);
    return json(playerView(game, seat));
  } catch (err) {
    return json({ error: err.message || "Could not save move." }, 500);
  }
}
