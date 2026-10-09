"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../../app/page.module.css";
import ChessPieceIcon from "./ChessPieceIcon";
import {
  WHITE,
  BLACK,
  newGameState,
  applyMove,
  legalMovesForColor,
  gameStatus,
  bestMove,
} from "../../lib/chessEngine";

const SAVE_KEY = "agileChessSave";
const AI_DEPTH = 3;
const ORDER = [0, 1, 2, 3, 4, 5, 6, 7];

// Silver = white (moves first, offense). Gold = dark (AGILE opens, you defend).
// The player always sits at the bottom of the board, whichever side they pick.
const START = { P: 8, N: 2, B: 2, R: 2, Q: 1 };
const VALUE = { P: 1, N: 3, B: 3, R: 5, Q: 9 };
const TRAY_ORDER = ["Q", "R", "B", "N", "P"];

// Pieces of one color that have been captured, worked out from the board (promotions accounted for).
function capturedOf(board, color) {
  const have = { P: 0, N: 0, B: 0, R: 0, Q: 0 };
  for (const row of board) {
    for (const p of row) {
      if (p && p.color === color && have[p.type] !== undefined) have[p.type] += 1;
    }
  }
  let promoted = 0;
  const lost = {};
  for (const t of ["N", "B", "R", "Q"]) {
    promoted += Math.max(0, have[t] - START[t]);
    lost[t] = Math.max(0, START[t] - have[t]);
  }
  lost.P = Math.max(0, 8 - have.P - promoted);
  const list = [];
  for (const t of TRAY_ORDER) for (let i = 0; i < lost[t]; i++) list.push(t);
  return list;
}

function materialOf(list) {
  return list.reduce((sum, t) => sum + VALUE[t], 0);
}

function sameSq(a, r, c) {
  return !!a && a[0] === r && a[1] === c;
}

function pieceClass(color) {
  return `${styles.chessPiece} ${color === WHITE ? styles.chessPieceWhite : styles.chessPieceBlack}`;
}

function serializeState(state, moveNum, you, lastMove) {
  return JSON.stringify({
    board: state.board.map((row) => row.map((p) => (p ? { type: p.type, color: p.color } : null))),
    turn: state.turn,
    castling: state.castling,
    epTarget: state.epTarget,
    moveNum,
    you,
    lastMove,
  });
}

function readSave() {
  try {
    return window.localStorage.getItem(SAVE_KEY);
  } catch {
    return null;
  }
}

function writeSave(raw) {
  try {
    window.localStorage.setItem(SAVE_KEY, raw);
    return true;
  } catch {
    return false;
  }
}

function clearSave() {
  try {
    window.localStorage.removeItem(SAVE_KEY);
  } catch {
    // ignore — nothing to clean up if storage isn't available
  }
}

export default function PlayAgileChess() {
  const [phase, setPhase] = useState("pick"); // "pick" = choosing a side, "play" = game on
  const [you, setYou] = useState(WHITE);
  const [state, setState] = useState(() => newGameState());
  const [moveNum, setMoveNum] = useState(1);
  const [selected, setSelected] = useState(null);
  const [lastMove, setLastMove] = useState(null);
  const [saveNote, setSaveNote] = useState("");
  const [savedGameFound, setSavedGameFound] = useState(false);
  const noteTimer = useRef(null);
  const gameId = useRef(0); // ignores a late AGILE reply after "Start New"

  // Check for a saved game once we're on the client (localStorage isn't
  // available during server rendering).
  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (readSave()) setSavedGameFound(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => () => clearTimeout(noteTimer.current), []);

  const agile = you === WHITE ? BLACK : WHITE;
  const status = gameStatus(state);
  const gameOver = status === "checkmate" || status === "stalemate";
  const legalForSelected = selected
    ? legalMovesForColor(state, state.turn).filter((m) => sameSq(m.from, selected[0], selected[1]))
    : [];

  function statusText() {
    if (status === "checkmate") return state.turn === you ? "AGILE wins — checkmate." : "You win — checkmate!";
    if (status === "stalemate") return "Draw — stalemate.";
    if (state.turn === agile) return "AGILE is thinking…";
    return status === "check" ? "Check — your move" : "Your move";
  }

  function playAgileMove(fromState) {
    const id = gameId.current;
    setTimeout(() => {
      if (id !== gameId.current) return;
      const move = bestMove(fromState, AI_DEPTH);
      if (!move) return;
      const next = applyMove(fromState, move);
      setState(next);
      setLastMove({ from: move.from, to: move.to });
      setMoveNum((n) => n + 1);
    }, 320);
  }

  function onSquareClick(r, c) {
    if (phase !== "play" || gameOver || state.turn !== you) return;
    const piece = state.board[r][c];

    if (selected) {
      const move = legalForSelected.find((m) => sameSq(m.to, r, c));
      if (move) {
        const next = applyMove(state, move);
        setState(next);
        setLastMove({ from: move.from, to: move.to });
        setSelected(null);
        const s = gameStatus(next);
        if (s !== "checkmate" && s !== "stalemate" && next.turn === agile) playAgileMove(next);
        return;
      }
    }

    if (piece && piece.color === you && !sameSq(selected, r, c)) {
      setSelected([r, c]);
    } else {
      setSelected(null);
    }
  }

  function startGame(side) {
    gameId.current += 1;
    const fresh = newGameState();
    setYou(side);
    setState(fresh);
    setSelected(null);
    setLastMove(null);
    setMoveNum(1);
    setPhase("play");
    if (side === BLACK) playAgileMove(fresh); // AGILE plays Silver and opens
  }

  function backToPicker() {
    gameId.current += 1;
    setSelected(null);
    setPhase("pick");
  }

  function handleSave() {
    const ok = writeSave(serializeState(state, moveNum, you, lastMove));
    setSaveNote(ok ? "Game saved — pick up where you left off next time." : "Saving isn't available in this browser right now.");
    clearTimeout(noteTimer.current);
    noteTimer.current = setTimeout(() => setSaveNote(""), 4000);
  }

  function handleContinue() {
    const raw = readSave();
    setSavedGameFound(false);
    if (!raw) return;
    try {
      const data = JSON.parse(raw);
      const restored = { board: data.board, turn: data.turn, castling: data.castling, epTarget: data.epTarget };
      const side = data.you === BLACK ? BLACK : WHITE; // older saves were always Silver
      gameId.current += 1;
      setYou(side);
      setState(restored);
      setMoveNum(data.moveNum || 1);
      setLastMove(data.lastMove || null);
      setSelected(null);
      setPhase("play");
      const s = gameStatus(restored);
      if (s !== "checkmate" && s !== "stalemate" && restored.turn !== side) playAgileMove(restored);
    } catch {
      setPhase("pick");
    }
  }

  function handleDiscardSave() {
    clearSave();
    setSavedGameFound(false);
    setPhase("pick");
  }

  const rows = you === BLACK ? [...ORDER].reverse() : ORDER;
  const cols = you === BLACK ? [...ORDER].reverse() : ORDER;
  const lostMine = capturedOf(state.board, you);
  const lostAgile = capturedOf(state.board, agile);
  const lead = materialOf(lostAgile) - materialOf(lostMine);

  const tray = (list, color, extra, label) => (
    <div className={styles.chessTray} aria-label={label}>
      {list.map((t, i) => (
        <span key={t + "-" + i} className={styles.chessTrayPiece}>
          <span className={pieceClass(color)} style={{ width: "100%", height: "100%" }}>
            <ChessPieceIcon type={t} />
          </span>
        </span>
      ))}
      {extra > 0 ? <span className={styles.chessTrayLead}>+{extra}</span> : null}
    </div>
  );

  const sidePicker = (
    <div className={styles.chessPick}>
      <p className={styles.chessPickTitle}>Choose your side</p>
      <div className={styles.chessPickBtns}>
        <button type="button" className={styles.chessPickBtn} onClick={() => startGame(WHITE)}>
          <span className={`${styles.chessPickIcon} ${pieceClass(WHITE)}`}><ChessPieceIcon type="K" /></span>
          <b>Silver (White)</b>
          <small>Offense</small>
        </button>
        <button type="button" className={styles.chessPickBtn} onClick={() => startGame(BLACK)}>
          <span className={`${styles.chessPickIcon} ${pieceClass(BLACK)}`}><ChessPieceIcon type="K" /></span>
          <b>Gold (Dark)</b>
          <small>Defense</small>
        </button>
      </div>
      <p className={styles.chessPickNote}>Silver is Offense and Gold is Defense. AGILE plays the opposite of your choice.</p>
    </div>
  );

  return (
    <div className={styles.chessCard}>
      {savedGameFound ? (
        <div className={styles.chessResumeBanner}>
          <p>You have a saved game from your last visit.</p>
          <div className={styles.chessResumeBtns}>
            <button type="button" className={styles.chessNewGame} onClick={handleContinue}>Continue Game</button>
            <button type="button" className={styles.chessOutlineBtn} onClick={handleDiscardSave}>Start New</button>
          </div>
        </div>
      ) : null}

      {phase === "pick" ? (
        sidePicker
      ) : (
        <>
          <div className={`${styles.chessStatus} ${status === "check" ? styles.chessStatusCheck : ""} ${gameOver ? styles.chessStatusOver : ""} ${state.turn === agile && !gameOver ? styles.chessStatusThinking : ""}`}>
            {statusText()}
            <span className={styles.chessStatusSide}>You: {you === WHITE ? "Silver" : "Gold"}</span>
          </div>

          {tray(lostMine, you, -lead, "Your pieces captured by AGILE")}

          <div className={styles.chessBoardWrap}>
            <div className={styles.chessBoard}>
              {rows.map((r) =>
                cols.map((c) => {
                  const piece = state.board[r][c];
                  const destMove = legalForSelected.find((m) => sameSq(m.to, r, c));
                  const isSel = sameSq(selected, r, c);
                  const isCheckedKing =
                    !!piece && piece.type === "K" && piece.color === state.turn && (status === "check" || status === "checkmate");
                  const isLastFrom = !!lastMove && sameSq(lastMove.from, r, c);
                  const isLastTo = !!lastMove && sameSq(lastMove.to, r, c);
                  return (
                    <div
                      key={`${r}-${c}`}
                      className={`${styles.chessSq} ${(r + c) % 2 === 0 ? styles.chessSqLight : styles.chessSqDark}`}
                      style={
                        isSel
                          ? { boxShadow: "inset 0 0 0 5px #c9a227" }
                          : isCheckedKing
                            ? { boxShadow: "inset 0 0 0 5px #b42318" }
                            : isLastTo
                              ? { boxShadow: "inset 0 0 0 3px rgba(176, 141, 87, 0.95)" }
                              : isLastFrom
                                ? { boxShadow: "inset 0 0 0 2px rgba(176, 141, 87, 0.55)" }
                                : undefined
                      }
                      onClick={() => onSquareClick(r, c)}
                    >
                      {piece ? (
                        <span className={pieceClass(piece.color)}>
                          <ChessPieceIcon type={piece.type} />
                        </span>
                      ) : null}
                      {destMove ? (
                        <span
                          className={destMove.capture ? styles.chessCapMark : styles.chessDot}
                          style={
                            destMove.capture
                              ? { inset: "5%", border: "3px solid rgba(122, 31, 43, 0.8)", zIndex: 2, pointerEvents: "none" }
                              : { width: "30%", height: "30%", background: "rgba(176, 141, 87, 0.9)", boxShadow: "0 0 0 2px rgba(247, 244, 238, 0.85), 0 1px 3px rgba(0, 0, 0, 0.25)", zIndex: 2, pointerEvents: "none" }
                          }
                        />
                      ) : null}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {tray(lostAgile, agile, lead, "Pieces you captured")}

          <div className={styles.chessFooter}>
            <button type="button" className={styles.chessOutlineBtn} onClick={backToPicker}>Start New</button>
            <button type="button" className={styles.chessNewGame} onClick={handleSave}>Save Game</button>
          </div>
          <p className={styles.chessMoveCount}>Move {moveNum}</p>
          {saveNote ? <p className={styles.chessSaveNote}>{saveNote}</p> : null}
        </>
      )}
    </div>
  );
}
