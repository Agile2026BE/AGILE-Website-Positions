"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "../../app/page.module.css";
import ChessPieceIcon from "../home/ChessPieceIcon";
import { BLACK, WHITE, legalMovesForColor } from "../../lib/chessEngine";

const POLL_MS = 2500;
const PROMOS = ["Q", "R", "B", "N"];
const ORDER = [0, 1, 2, 3, 4, 5, 6, 7];

function sameSq(a, r, c) {
  return !!a && a[0] === r && a[1] === c;
}

function colorName(color) {
  return color === WHITE ? "White" : "Black";
}

function statusLine(game, seat, myTurn) {
  const opp = seat === WHITE ? BLACK : WHITE;
  const r = game.result;
  if (r) {
    if (!r.winner) return "Draw by stalemate";
    const winnerText = r.winner === seat ? "you win!" : game.names[r.winner] + " wins";
    if (r.reason === "resignation") {
      const loser = r.winner === WHITE ? BLACK : WHITE;
      return (loser === seat ? "You resigned" : game.names[loser] + " resigned") + " — " + winnerText;
    }
    return "Checkmate — " + winnerText;
  }
  if (myTurn) return game.status === "check" ? "Check! Your move" : "Your move";
  return game.status === "check"
    ? game.names[opp] + " is in check — their move"
    : "Waiting for " + game.names[opp] + " to move…";
}

function matchResultText(m) {
  const h = m.host.wins;
  const f = m.friend.wins;
  if (h > f) return m.host.name + " wins the match " + h + "–" + f;
  if (f > h) return m.friend.name + " wins the match " + f + "–" + h;
  return "Match tied " + h + "–" + f;
}

export default function FriendChessGame({ id, token }) {
  const [game, setGame] = useState(null);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);
  const [pendingPromo, setPendingPromo] = useState(null);
  const [busy, setBusy] = useState(false);
  const versionRef = useRef(-1);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/chess/game/" + id + "?t=" + encodeURIComponent(token), { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Game not found.");
        return;
      }
      if (data.version !== versionRef.current) {
        versionRef.current = data.version;
        setGame(data);
        setSelected(null);
        setPendingPromo(null);
      }
      setError("");
    } catch {
      setError("Connection problem — retrying…");
    }
  }, [id, token]);

  useEffect(() => {
    let alive = true;
    let timer = null;
    const tick = async () => {
      if (document.visibilityState === "visible") await load();
      if (alive) timer = setTimeout(tick, POLL_MS);
    };
    tick();
    return () => {
      alive = false;
      clearTimeout(timer);
    };
  }, [load]);

  const seat = game ? game.seat : null;
  const over = !!(game && game.result);
  const myTurn = !!(game && !over && game.state.turn === seat);

  const legal = useMemo(() => (myTurn ? legalMovesForColor(game.state, seat) : []), [game, myTurn, seat]);
  const legalForSelected = selected ? legal.filter((m) => sameSq(m.from, selected[0], selected[1])) : [];

  async function post(body) {
    setBusy(true);
    try {
      const res = await fetch("/api/chess/game/" + id, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ t: token, version: versionRef.current, ...body }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Move not accepted.");
        await load();
      } else {
        versionRef.current = data.version;
        setGame(data);
        setError("");
      }
    } catch {
      setError("Could not reach the server. Try again.");
    }
    setBusy(false);
    setSelected(null);
    setPendingPromo(null);
  }

  function onSquareClick(r, c) {
    if (!myTurn || busy || pendingPromo) return;
    const piece = game.state.board[r][c];
    if (selected) {
      const mv = legalForSelected.find((m) => sameSq(m.to, r, c));
      if (mv) {
        if (mv.promo) {
          setPendingPromo(mv);
          return;
        }
        post({ action: "move", from: mv.from, to: mv.to });
        return;
      }
    }
    if (piece && piece.color === seat && !sameSq(selected, r, c) && legal.some((m) => sameSq(m.from, r, c))) {
      setSelected([r, c]);
    } else {
      setSelected(null);
    }
  }

  function resign() {
    if (window.confirm("Resign this game?")) post({ action: "resign" });
  }

  if (!game) {
    return (
      <section className={styles.chessCard}>
        <h2>AGILE Chess — Play a Friend</h2>
        <p className={styles.chessSub}>{error || "Loading game…"}</p>
      </section>
    );
  }

  const opp = seat === WHITE ? BLACK : WHITE;
  const rows = seat === BLACK ? [...ORDER].reverse() : ORDER;
  const cols = seat === BLACK ? [...ORDER].reverse() : ORDER;
  const statusClasses = [styles.chessStatus];
  if (game.status === "check" && !over) statusClasses.push(styles.chessStatusCheck);
  if (over) statusClasses.push(styles.chessStatusOver);

  return (
    <section className={styles.chessCard}>
      <h2>AGILE Chess — Play a Friend</h2>
      <p className={styles.chessSub}>
        You ({game.names[seat]}) play {colorName(seat)} vs {game.names[opp]} ({colorName(opp)})
      </p>

      {game.match ? (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 8,
            flexWrap: "wrap",
            margin: "8px 0",
            padding: "8px 12px",
            borderRadius: 8,
            background: "rgba(201, 162, 39, 0.14)",
            fontWeight: 700,
          }}
          aria-label="Match score"
        >
          <span>
            {game.match.host.name} {game.match.host.wins} – {game.match.friend.wins} {game.match.friend.name}
            {game.match.draws ? " · Draws " + game.match.draws : ""}
          </span>
          <span>
            {game.match.complete
              ? "Final: " + matchResultText(game.match)
              : "Game " + Math.min(game.match.played + (over ? 0 : 1), game.match.target) + " of " + game.match.target}
          </span>
        </div>
      ) : null}

      <div className={statusClasses.join(" ")} aria-live="polite">
        {statusLine(game, seat, myTurn)}
      </div>

      <div className={styles.chessBoardWrap}>
        <div className={styles.chessBoard}>
          {rows.map((r) =>
            cols.map((c) => {
              const piece = game.state.board[r][c];
              const destMove = legalForSelected.find((m) => sameSq(m.to, r, c));
              const isLast = game.lastMove && (sameSq(game.lastMove.from, r, c) || sameSq(game.lastMove.to, r, c));
              const sqClasses = [styles.chessSq, (r + c) % 2 === 0 ? styles.chessSqLight : styles.chessSqDark];
              if (sameSq(selected, r, c)) sqClasses.push(styles.chessSqSelected);
              return (
                <div
                  key={r + "-" + c}
                  className={sqClasses.join(" ")}
                  style={isLast ? { boxShadow: "inset 0 0 0 3px rgba(201, 162, 39, 0.85)" } : undefined}
                  onClick={() => onSquareClick(r, c)}
                >
                  {piece ? (
                    <span className={[styles.chessPiece, piece.color === WHITE ? styles.chessPieceWhite : styles.chessPieceBlack].join(" ")}>
                      <ChessPieceIcon type={piece.type} />
                    </span>
                  ) : null}
                  {destMove ? <span className={destMove.capture ? styles.chessCapMark : styles.chessDot} /> : null}
                </div>
              );
            })
          )}
        </div>
      </div>

      {pendingPromo ? (
        <div style={{ display: "flex", gap: 8, justifyContent: "center", alignItems: "center", margin: "12px 0", flexWrap: "wrap" }}>
          <span className={styles.chessSub}>Promote to:</span>
          {PROMOS.map((p) => (
            <button
              key={p}
              type="button"
              className={styles.chessOutlineBtn}
              disabled={busy}
              onClick={() => post({ action: "move", from: pendingPromo.from, to: pendingPromo.to, promoteTo: p })}
              aria-label={"Promote to " + p}
            >
              <span className={[styles.chessPiece, seat === WHITE ? styles.chessPieceWhite : styles.chessPieceBlack].join(" ")}>
                <ChessPieceIcon type={p} />
              </span>
            </button>
          ))}
          <button type="button" className={styles.chessOutlineBtn} onClick={() => setPendingPromo(null)}>
            Cancel
          </button>
        </div>
      ) : null}

      {error ? <p className={styles.chessSaveNote}>{error}</p> : null}

      <div className={styles.chessFooter}>
        {over ? (
          <button type="button" className={styles.chessNewGame} disabled={busy} onClick={() => post({ action: "rematch" })}>
            {game.match && game.match.complete ? "New 5-game match" : "Next game (swap colors)"}
          </button>
        ) : (
          <button type="button" className={styles.chessOutlineBtn} disabled={busy} onClick={resign}>
            Resign
          </button>
        )}
        <span className={styles.chessMoveCount}>Moves: {game.moveCount}</span>
      </div>
      <p className={styles.chessSaveNote}>Private game — only people with a link to this game can see it. The board updates automatically.</p>
    </section>
  );
}
