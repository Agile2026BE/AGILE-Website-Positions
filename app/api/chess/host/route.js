import { NextResponse } from "next/server";
import { BLACK, WHITE, newGameState } from "../../../../lib/chessEngine";
import { hostCheck, hostSummary, listGames, randomId, saveGame } from "../../../../lib/chessStore";

export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store" };

function cleanName(value, fallback) {
  const name = String(value || "")
    .replace(/[^\w .'-]/g, "")
    .trim()
    .slice(0, 24);
  return name || fallback;
}

// GET: list recent games (host only)
export async function GET(request) {
  const denied = hostCheck(request);
  if (denied) return denied;
  try {
    const games = await listGames(20);
    return NextResponse.json({ games: games.map(hostSummary) }, { headers: NO_STORE });
  } catch (err) {
    return NextResponse.json({ error: err.message || "Could not load games." }, { status: 500 });
  }
}

// POST: create a new private game (host only)
export async function POST(request) {
  const denied = hostCheck(request);
  if (denied) return denied;
  let body = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }
  const hostColor = body.hostColor === BLACK ? BLACK : WHITE;
  const hostName = cleanName(body.hostName, "Byron");
  const friendName = cleanName(body.friendName, "Friend");
  const now = Date.now();
  const game = {
    id: randomId(10),
    state: newGameState(),
    status: "playing",
    result: null,
    version: 0,
    moves: [],
    lastMove: null,
    hostColor,
    names: hostColor === WHITE ? { w: hostName, b: friendName } : { w: friendName, b: hostName },
    tokens: { w: randomId(16), b: randomId(16) },
    createdAt: now,
    updatedAt: now,
  };
  try {
    await saveGame(game);
    return NextResponse.json({ game: hostSummary(game) }, { headers: NO_STORE });
  } catch (err) {
    return NextResponse.json({ error: err.message || "Could not create game." }, { status: 500 });
  }
}
