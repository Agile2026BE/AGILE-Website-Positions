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

// Candidate (you) plays white and moves first, shown in silver. AGILE plays
// black, shown in gold — matching the hero image where gold sits on AGILE's
// side of the board.
function pieceColorClass(color) {
  return color === WHITE ? styles.chessPieceWhite : styles.chessPieceBlack;
}

function serializeState(state, moveNum) {
  return JSON.stringify({
    board: state.board.map((row) => row.map((p) => (p ? { type: p.type, color: p.color } : null))),
    turn: state.turn,
    castling: state.castling,
    epTarget: state.epTarget,
    moveNum,
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
  const [state, setState] = useState(() => newGameState());
  const [moveNum, setMoveNum] = useState(1);
  const [selected, setSelected] = useState(null);
  const [saveNote, setSaveNote] = useState("");
  const [savedGameFound, setSavedGameFound] = useState(false);
  const noteTimer = useRef(null);

  // Check for a saved game once we're on the client (localStorage isn't
  // available during server rendering).
  useEffect(() => {
    if (readSave()) setSavedGameFound(true);
  }, []);

  useEffect(() => () => clearTimeout(noteTimer.current), []);

  const status = gameStatus(state);
  const legalForSelected = selected
    ? legalMovesForColor(state, state.turn).filter((m) => m.from[0] === selected[0] && m.from[1] === selected[1])
    : [];
  const gameOver = status === "checkmate" || status === "stalemate";

  function statusText() {
    if (status === "checkmate") return state.turn === WHITE ? "AGILE wins — checkmate." : "You win — checkmate!";
    if (status === "stalemate") return "Draw — stalemate.";
    if (state.turn === BLACK) return "AGILE is thinking…";
    return status === "check" ? "Check — your move" : "Your move";
  }

  function playAgileMove(fromState) {
    setTimeout(() => {
      const move = bestMove(fromState, AI_DEPTH);
      if (!move) return;
      const next = applyMove(fromState, move);
      setState(next);
      setMoveNum((n) => n + 1);
    }, 320);
  }

  function onSquareClick(r, c) {
    if (gameOver || state.turn !== WHITE) return;
    const piece = state.board[r][c];

    if (selected) {
      const move = legalForSelected.find((m) => m.to[0] === r && m.to[1] === c);
      if (move) {
        const next = applyMove(state, move);
        setState(next);
        setSelected(null);
        if (gameStatus(next) !== "checkmate" && gameStatus(next) !== "stalemate" && next.turn === BLACK) {
          playAgileMove(next);
        }
        return;
      }
    }

    if (piece && piece.color === WHITE) {
      setSelected([r, c]);
    } else {
      setSelected(null);
    }
  }

  function startFresh() {
    setState(newGameState());
    setSelected(null);
    setMoveNum(1);
  }

  function handleSave() {
    const ok = writeSave(serializeState(state, moveNum));
    setSaveNote(ok ? "Game saved — pick up where you left off next time." : "Saving isn't available in this browser right now.");
    clearTimeout(noteTimer.current);
    noteTimer.current = setTimeout(() => setSaveNote(""), 4000);
  }

  function handleContinue() {
    const raw = readSave();
    setSavedGameFound(false);
    if (!raw) {
      startFresh();
      return;
    }
    try {
      const data = JSON.parse(raw);
      const restored = { board: data.board, turn: data.turn, castling: data.castling, epTarget: data.epTarget };
      setState(restored);
      setMoveNum(data.moveNum || 1);
      setSelected(null);
      const restoredStatus = gameStatus(restored);
      if (restoredStatus !== "checkmate" && restoredStatus !== "stalemate" && restored.turn === BLACK) {
        playAgileMove(restored);
      }
    } catch {
      startFresh();
    }
  }

  function handleDiscardSave() {
    clearSave();
    setSavedGameFound(false);
    startFresh();
  }

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

      <p className={styles.chessSub}>A quick game while you&apos;re on the way to work. You&apos;re silver and move first — tap a piece, then tap where it moves.</p>

      <div className={`${styles.chessStatus} ${status === "check" ? styles.chessStatusCheck : ""} ${gameOver ? styles.chessStatusOver : ""} ${state.turn === BLACK && !gameOver ? styles.chessStatusThinking : ""}`}>
        {statusText()}
      </div>

      <div className={styles.chessBoardWrap}>
        <div className={styles.chessBoard}>
          {state.board.map((row, r) =>
            row.map((piece, c) => {
              const isSelected = selected && selected[0] === r && selected[1] === c;
              const destMove = legalForSelected.find((m) => m.to[0] === r && m.to[1] === c);
              return (
                <div
                  key={`${r}-${c}`}
                  className={`${styles.chessSq} ${(r + c) % 2 === 0 ? styles.chessSqLight : styles.chessSqDark} ${isSelected ? styles.chessSqSelected : ""}`}
                  onClick={() => onSquareClick(r, c)}
                >
                  {piece ? (
                    <span className={`${styles.chessPiece} ${pieceColorClass(piece.color)}`}>
                      <ChessPieceIcon type={piece.type} />
                    </span>
                  ) : null}
                  {destMove ? <div className={destMove.capture ? styles.chessCapMark : styles.chessDot}></div> : null}
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className={styles.chessFooter}>
        <button type="button" className={styles.chessOutlineBtn} onClick={startFresh}>Start New</button>
        <button type="button" className={styles.chessNewGame} onClick={handleSave}>Save Game</button>
      </div>
      <p className={styles.chessMoveCount}>Move {moveNum}</p>
      {saveNote ? <p className={styles.chessSaveNote}>{saveNote}</p> : null}
    </div>
  );
}
