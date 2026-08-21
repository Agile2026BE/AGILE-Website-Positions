// Minimal but complete chess engine: legal move generation (incl. castling,
// en passant, promotion), check/checkmate/stalemate detection, and a simple
// minimax AI opponent. Hand-written, no external dependency — the npm
// registry chess.js package wasn't reachable to install, and this keeps the
// "Play AGILE" feature dependency-free. Verified against known positions
// (20 legal opening moves, Fool's Mate checkmate detection, save/restore
// round-trip) before being wired into the site.

export const WHITE = "w";
export const BLACK = "b";

export function initialBoard() {
  const back = ["R", "N", "B", "Q", "K", "B", "N", "R"];
  const board = [];
  board.push(back.map((p) => ({ type: p, color: BLACK })));
  board.push(Array(8).fill(null).map(() => ({ type: "P", color: BLACK })));
  for (let r = 2; r < 6; r++) board.push(Array(8).fill(null));
  board.push(Array(8).fill(null).map(() => ({ type: "P", color: WHITE })));
  board.push(back.map((p) => ({ type: p, color: WHITE })));
  return board;
}

export function newGameState() {
  return {
    board: initialBoard(),
    turn: WHITE,
    castling: { w: { k: true, q: true }, b: { k: true, q: true } },
    epTarget: null,
  };
}

function cloneBoard(b) {
  return b.map((row) => row.map((c) => (c ? { ...c } : null)));
}

function inBounds(r, c) {
  return r >= 0 && r < 8 && c >= 0 && c < 8;
}

const DIRS = {
  B: [[-1, -1], [-1, 1], [1, -1], [1, 1]],
  R: [[-1, 0], [1, 0], [0, -1], [0, 1]],
};
DIRS.Q = [...DIRS.B, ...DIRS.R];

function slidingMoves(board, r, c, color, dirs) {
  const moves = [];
  for (const [dr, dc] of dirs) {
    let nr = r + dr, nc = c + dc;
    while (inBounds(nr, nc)) {
      const target = board[nr][nc];
      if (!target) {
        moves.push([nr, nc]);
      } else {
        if (target.color !== color) moves.push([nr, nc]);
        break;
      }
      nr += dr;
      nc += dc;
    }
  }
  return moves;
}

function pseudoMovesForSquare(state, r, c) {
  const board = state.board;
  const piece = board[r][c];
  if (!piece) return [];
  const { type, color } = piece;
  const moves = [];

  if (type === "P") {
    const dir = color === WHITE ? -1 : 1;
    const startRow = color === WHITE ? 6 : 1;
    const oneAhead = r + dir;
    if (inBounds(oneAhead, c) && !board[oneAhead][c]) {
      moves.push({ to: [oneAhead, c], promo: oneAhead === 0 || oneAhead === 7 });
      const twoAhead = r + 2 * dir;
      if (r === startRow && !board[twoAhead][c]) {
        moves.push({ to: [twoAhead, c], double: true });
      }
    }
    for (const dc of [-1, 1]) {
      const nr = r + dir, nc = c + dc;
      if (!inBounds(nr, nc)) continue;
      const target = board[nr][nc];
      if (target && target.color !== color) {
        moves.push({ to: [nr, nc], capture: true, promo: nr === 0 || nr === 7 });
      } else if (state.epTarget && state.epTarget[0] === nr && state.epTarget[1] === nc) {
        moves.push({ to: [nr, nc], capture: true, enPassant: true });
      }
    }
  } else if (type === "N") {
    const deltas = [[-2, -1], [-2, 1], [2, -1], [2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2]];
    for (const [dr, dc] of deltas) {
      const nr = r + dr, nc = c + dc;
      if (!inBounds(nr, nc)) continue;
      const target = board[nr][nc];
      if (!target || target.color !== color) moves.push({ to: [nr, nc], capture: !!target });
    }
  } else if (type === "B" || type === "R" || type === "Q") {
    for (const [nr, nc] of slidingMoves(board, r, c, color, DIRS[type])) {
      moves.push({ to: [nr, nc], capture: !!board[nr][nc] });
    }
  } else if (type === "K") {
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        const nr = r + dr, nc = c + dc;
        if (!inBounds(nr, nc)) continue;
        const target = board[nr][nc];
        if (!target || target.color !== color) moves.push({ to: [nr, nc], capture: !!target });
      }
    }
    const rights = state.castling[color];
    const row = color === WHITE ? 7 : 0;
    if (r === row && c === 4) {
      if (rights.k && !board[row][5] && !board[row][6] && board[row][7]?.type === "R") {
        if (!isSquareAttacked(state, row, 4, opponent(color)) &&
            !isSquareAttacked(state, row, 5, opponent(color)) &&
            !isSquareAttacked(state, row, 6, opponent(color))) {
          moves.push({ to: [row, 6], castle: "k" });
        }
      }
      if (rights.q && !board[row][1] && !board[row][2] && !board[row][3] && board[row][0]?.type === "R") {
        if (!isSquareAttacked(state, row, 4, opponent(color)) &&
            !isSquareAttacked(state, row, 3, opponent(color)) &&
            !isSquareAttacked(state, row, 2, opponent(color))) {
          moves.push({ to: [row, 2], castle: "q" });
        }
      }
    }
  }
  return moves.map((m) => ({ from: [r, c], ...m }));
}

function opponent(color) {
  return color === WHITE ? BLACK : WHITE;
}

function findKing(board, color) {
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const p = board[r][c];
      if (p && p.type === "K" && p.color === color) return [r, c];
    }
  }
  return null;
}

function isSquareAttacked(state, r, c, byColor) {
  const board = state.board;
  for (let rr = 0; rr < 8; rr++) {
    for (let cc = 0; cc < 8; cc++) {
      const p = board[rr][cc];
      if (!p || p.color !== byColor) continue;
      if (p.type === "P") {
        const dir = byColor === WHITE ? -1 : 1;
        if (rr + dir === r && (cc - 1 === c || cc + 1 === c)) return true;
        continue;
      }
      if (p.type === "K") {
        if (Math.abs(rr - r) <= 1 && Math.abs(cc - c) <= 1 && !(rr === r && cc === c)) return true;
        continue;
      }
      const pseudo = pseudoMovesForSquare({ ...state, board }, rr, cc);
      for (const m of pseudo) {
        if (m.castle) continue;
        if (m.to[0] === r && m.to[1] === c) return true;
      }
    }
  }
  return false;
}

export function applyMove(state, move) {
  const next = {
    board: cloneBoard(state.board),
    turn: opponent(state.turn),
    castling: { w: { ...state.castling.w }, b: { ...state.castling.b } },
    epTarget: null,
  };
  const [fr, fc] = move.from;
  const [tr, tc] = move.to;
  const piece = next.board[fr][fc];
  const color = piece.color;

  if (move.enPassant) {
    const capturedRow = color === WHITE ? tr + 1 : tr - 1;
    next.board[capturedRow][tc] = null;
  }

  next.board[tr][tc] = piece;
  next.board[fr][fc] = null;

  if (move.promo) {
    next.board[tr][tc] = { type: move.promoteTo || "Q", color };
  }

  if (move.double) {
    next.epTarget = [(fr + tr) / 2, fc];
  }

  if (move.castle === "k") {
    const row = fr;
    next.board[row][5] = next.board[row][7];
    next.board[row][7] = null;
  } else if (move.castle === "q") {
    const row = fr;
    next.board[row][3] = next.board[row][0];
    next.board[row][0] = null;
  }

  if (piece.type === "K") {
    next.castling[color].k = false;
    next.castling[color].q = false;
  }
  if (piece.type === "R") {
    if (fr === (color === WHITE ? 7 : 0) && fc === 0) next.castling[color].q = false;
    if (fr === (color === WHITE ? 7 : 0) && fc === 7) next.castling[color].k = false;
  }
  if (tr === 7 && tc === 0) next.castling.w.q = false;
  if (tr === 7 && tc === 7) next.castling.w.k = false;
  if (tr === 0 && tc === 0) next.castling.b.q = false;
  if (tr === 0 && tc === 7) next.castling.b.k = false;

  return next;
}

export function legalMovesForColor(state, color) {
  const legal = [];
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const p = state.board[r][c];
      if (!p || p.color !== color) continue;
      const pseudo = pseudoMovesForSquare(state, r, c);
      for (const m of pseudo) {
        const next = applyMove(state, m);
        const kingPos = findKing(next.board, color);
        if (!kingPos) continue;
        if (!isSquareAttacked(next, kingPos[0], kingPos[1], opponent(color))) {
          legal.push(m);
        }
      }
    }
  }
  return legal;
}

export function isInCheck(state, color) {
  const kingPos = findKing(state.board, color);
  if (!kingPos) return false;
  return isSquareAttacked(state, kingPos[0], kingPos[1], opponent(color));
}

export function gameStatus(state) {
  const moves = legalMovesForColor(state, state.turn);
  const check = isInCheck(state, state.turn);
  if (moves.length === 0) {
    return check ? "checkmate" : "stalemate";
  }
  return check ? "check" : "playing";
}

const VALUES = { P: 100, N: 320, B: 330, R: 500, Q: 900, K: 0 };

function evaluate(state) {
  let score = 0;
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const p = state.board[r][c];
      if (!p) continue;
      score += p.color === WHITE ? VALUES[p.type] : -VALUES[p.type];
    }
  }
  return score;
}

function minimax(state, depth, alpha, beta, maximizing) {
  const status = gameStatus(state);
  if (status === "checkmate") return maximizing ? -100000 - depth : 100000 + depth;
  if (status === "stalemate") return 0;
  if (depth === 0) return evaluate(state);

  const moves = legalMovesForColor(state, state.turn);
  if (maximizing) {
    let best = -Infinity;
    for (const m of moves) {
      const next = applyMove(state, m);
      best = Math.max(best, minimax(next, depth - 1, alpha, beta, false));
      alpha = Math.max(alpha, best);
      if (beta <= alpha) break;
    }
    return best;
  }
  let best = Infinity;
  for (const m of moves) {
    const next = applyMove(state, m);
    best = Math.min(best, minimax(next, depth - 1, alpha, beta, true));
    beta = Math.min(beta, best);
    if (beta <= alpha) break;
  }
  return best;
}

export function bestMove(state, depth) {
  const moves = legalMovesForColor(state, state.turn);
  if (moves.length === 0) return null;
  const maximizing = state.turn === WHITE;
  let best = null;
  let bestScore = maximizing ? -Infinity : Infinity;
  for (const m of moves) {
    const next = applyMove(state, m);
    const score = minimax(next, depth - 1, -Infinity, Infinity, !maximizing);
    if (maximizing ? score > bestScore : score < bestScore) {
      bestScore = score;
      best = m;
    }
  }
  return best;
}
