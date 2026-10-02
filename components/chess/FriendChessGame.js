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
  return color === WHITE ? "Silver" : "Gold";
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
  const check = game.status === "check" && !over;
  const m = game.match;
  const gameLabel = m
    ? m.complete
      ? "Final: " + matchResultText(m)
      : "Game " + Math.min(m.played + (over ? 0 : 1), m.target) + " of " + m.target
    : "";
  const pieceClass = (color) =>
    [styles.chessPiece, color === WHITE ? styles.chessPieceWhite : styles.chessPieceBlack].join(" ");
  const boardWidth = "max(280px, min(100%, calc(100vh - 320px)))";
  const lostMine = capturedOf(game.state.board, seat);
  const lostTheirs = capturedOf(game.state.board, opp);
  const lead = materialOf(lostTheirs) - materialOf(lostMine);
  const tray = (list, color, extra, label) => (
    <div
      aria-label={label}
      style={{ display: "flex", alignItems: "center", gap: 2, minHeight: 28, margin: "6px auto", width: boardWidth, flexWrap: "wrap" }}
    >
      {list.map((t, i) => (
        <span
          key={t + "-" + i}
          style={{ position: "relative", width: 24, height: 24, display: "inline-flex", alignItems: "center", justifyContent: "center" }}
        >
          <span className={pieceClass(color)} style={{ width: "100%", height: "100%" }}>
            <ChessPieceIcon type={t} />
          </span>
        </span>
      ))}
      {extra > 0 ? <span style={{ marginLeft: 6, fontWeight: 700, fontSize: "0.85rem" }}>+{extra}</span> : null}
    </div>
  );

  return (
    <section className={styles.chessCard} style={{ paddingTop: 12, paddingBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
        <h2 style={{ margin: 0, fontSize: "1.3rem", lineHeight: 1.2 }}>
          What’s Your <em>Next</em> Move?
        </h2>
        <span style={{ fontSize: "0.85rem", opacity: 0.8 }}>
          AGILE Chess · You ({game.names[seat]}) play {colorName(seat)} vs {game.names[opp]} ({colorName(opp)})
        </span>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 8,
          flexWrap: "wrap",
          margin: "10px 0 8px",
          padding: "6px 12px",
          borderRadius: 8,
          background: "rgba(201, 162, 39, 0.14)",
          fontWeight: 700,
          fontSize: "0.95rem",
        }}
      >
        <span aria-label="Match score">
          {m ? m.host.name + " " + m.host.wins + " – " + m.friend.wins + " " + m.friend.name + (m.draws ? " · Draws " + m.draws : "") : ""}
        </span>
        <span aria-live="polite" style={{ color: check ? "#b42318" : undefined }}>
          {statusLine(game, seat, myTurn)}
        </span>
        <span>{gameLabel}</span>
      </div>

      {tray(lostMine, seat, -lead, "Your pieces captured by " + game.names[opp])}

      <div
        className={styles.chessBoardWrap}
        style={{ width: boardWidth, margin: "0 auto" }}
      >
        <div className={styles.chessBoard}>
          {rows.map((r) =>
            cols.map((c) => {
              const piece = game.state.board[r][c];
              const destMove = legalForSelected.find((mv) => sameSq(mv.to, r, c));
              const isSel = sameSq(selected, r, c);
              const isLast = game.lastMove && (sameSq(game.lastMove.from, r, c) || sameSq(game.lastMove.to, r, c));
              const sqClasses = [styles.chessSq, (r + c) % 2 === 0 ? styles.chessSqLight : styles.chessSqDark];
              if (isSel) sqClasses.push(styles.chessSqSelected);
              return (
                <div
                  key={r + "-" + c}
                  className={sqClasses.join(" ")}
                  style={
                    isSel
                      ? { boxShadow: "inset 0 0 0 5px #c9a227" }
                      : isLast
                        ? { boxShadow: "inset 0 0 0 4px rgba(201, 162, 39, 0.85)" }
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
                      style={destMove.capture ? undefined : { width: "34%", height: "34%" }}
                    />
                  ) : null}
                </div>
              );
            })
          )}
        </div>
      </div>

      {tray(lostTheirs, opp, lead, "Pieces you captured")}

      {pendingPromo ? (
        <div style={{ display: "flex", gap: 8, justifyContent: "center", alignItems: "center", margin: "8px 0 0", flexWrap: "wrap" }}>
          <span style={{ fontWeight: 600 }}>Promote to:</span>
          {PROMOS.map((p) => (
            <button
              key={p}
              type="button"
              className={styles.chessOutlineBtn}
              style={{ width: "auto" }}
              disabled={busy}
              onClick={() => post({ action: "move", from: pendingPromo.from, to: pendingPromo.to, promoteTo: p })}
              aria-label={"Promote to " + p}
            >
              <span className={pieceClass(seat)}>
                <ChessPieceIcon type={p} />
              </span>
            </button>
          ))}
          <button type="button" className={styles.chessOutlineBtn} style={{ width: "auto" }} onClick={() => setPendingPromo(null)}>
            Cancel
          </button>
        </div>
      ) : null}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 8,
          flexWrap: "wrap",
          marginTop: 14,
          fontSize: "0.85rem",
        }}
      >
        {over ? (
          <button
            type="button"
            className={styles.chessNewGame}
            style={{ width: "auto", padding: "6px 16px" }}
            disabled={busy}
            onClick={() => post({ action: "rematch" })}
          >
            {m && m.complete ? "New 5-game match" : "Next game (swap colors)"}
          </button>
        ) : (
          <button
            type="button"
            className={styles.chessOutlineBtn}
            style={{ width: "auto", padding: "6px 16px" }}
            disabled={busy}
            onClick={resign}
          >
            Resign
          </button>
        )}
        <span style={{ fontWeight: 600, color: error ? "#b42318" : undefined }}>
          {error ? error : "Moves: " + game.moveCount}
        </span>
        <span style={{ opacity: 0.7 }}>Private game — by invitation link only. No peeking!</span>
      </div>
    </section>
  );
}
