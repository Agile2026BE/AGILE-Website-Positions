"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "../../app/page.module.css";
import ChessPieceIcon from "../home/ChessPieceIcon";
import { BLACK, WHITE, legalMovesForColor } from "../../lib/chessEngine";

const POLL_MS = 2500;
const HIDDEN_POLL_MS = 8000; // keep checking (more slowly) while this tab is in the background
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
    : game.names[opp] + " is thinking…";
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

const CHAT_CSS = `
@keyframes agileTypingDot { 0%, 60%, 100% { transform: translateY(0); opacity: 0.45; } 30% { transform: translateY(-4px); opacity: 1; } }
.agileChatDock { margin: 10px 0 0; border: 1px solid rgba(176, 141, 87, 0.45); border-radius: 12px; background: #fbf9f4; box-shadow: 0 6px 18px rgba(11, 37, 69, 0.08); display: flex; flex-direction: column; overflow: hidden; font-size: 0.9rem; }
.agileChatMsgs { max-height: 120px; overflow-y: auto; padding: 8px 10px; display: flex; flex-direction: column; gap: 5px; }
@media (min-width: 1200px) {
  .agileChatDock { position: fixed; right: 16px; bottom: 24px; width: clamp(220px, calc((100vw - 700px) / 2 - 32px), 320px); margin: 0; z-index: 20; }
  .agileChatMsgs { max-height: 46vh; min-height: 140px; }
}
`;

// "Table Talk": a small text-message style window for friendly trash talk.
function ChatPanel({ chat, oppName, onSend, onTyping }) {
  const [text, setText] = useState("");
  const listRef = useRef(null);
  const typingSentRef = useRef(0);
  const messages = chat ? chat.messages : [];
  const count = messages.length;
  const typing = !!(chat && chat.opponentTyping);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [count, typing]);

  function stopTyping() {
    if (typingSentRef.current) {
      typingSentRef.current = 0;
      onTyping(false);
    }
  }

  function change(e) {
    const v = e.target.value.slice(0, 140);
    setText(v);
    const now = Date.now();
    if (v && now - typingSentRef.current > 3000) {
      typingSentRef.current = now;
      onTyping(true);
    }
    if (!v) stopTyping();
  }

  function submit() {
    const v = text.trim();
    if (!v) return;
    setText("");
    typingSentRef.current = 0;
    onSend(v);
  }

  return (
    <div className="agileChatDock">
      <style>{CHAT_CSS}</style>
      <div
        style={{
          padding: "7px 12px",
          borderBottom: "1px solid rgba(176, 141, 87, 0.3)",
          fontFamily: "Georgia, 'Times New Roman', serif",
          color: "#0b2545",
          fontWeight: 600,
          letterSpacing: "0.02em",
        }}
      >
        Table Talk <span style={{ color: "#8a6d3b", fontWeight: 400, fontSize: "0.8rem" }}>· with {oppName}</span>
      </div>
      <div ref={listRef} className="agileChatMsgs">
        {count === 0 && !typing ? (
          <span style={{ opacity: 0.55, fontStyle: "italic", fontSize: "0.82rem" }}>
            No messages yet. A little friendly trash talk is encouraged.
          </span>
        ) : null}
        {messages.map((m, i) => (
          <div
            key={m.at + "-" + i}
            style={{
              alignSelf: m.mine ? "flex-end" : "flex-start",
              maxWidth: "85%",
              padding: "5px 10px",
              borderRadius: 14,
              background: m.mine ? "#0b2545" : "#efe9dc",
              color: m.mine ? "#f7f4ee" : "#0b2545",
              lineHeight: 1.3,
              wordBreak: "break-word",
            }}
          >
            {m.text}
          </div>
        ))}
        {typing ? (
          <div
            aria-label={oppName + " is typing"}
            style={{ alignSelf: "flex-start", padding: "8px 12px", borderRadius: 14, background: "#efe9dc", display: "flex", gap: 4 }}
          >
            {[0, 1, 2].map((d) => (
              <span
                key={d}
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#8a6d3b",
                  animation: "agileTypingDot 1.2s infinite ease-in-out",
                  animationDelay: d * 0.15 + "s",
                }}
              />
            ))}
          </div>
        ) : null}
      </div>
      <div style={{ display: "flex", gap: 6, padding: 8, borderTop: "1px solid rgba(176, 141, 87, 0.3)" }}>
        <input
          value={text}
          onChange={change}
          onBlur={stopTyping}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              submit();
            }
          }}
          maxLength={140}
          placeholder="Say something…"
          aria-label="Message"
          style={{
            flex: 1,
            minWidth: 0,
            padding: "6px 10px",
            borderRadius: 999,
            border: "1px solid rgba(11, 37, 69, 0.2)",
            background: "#fff",
            fontSize: 16,
          }}
        />
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={submit}
          style={{
            padding: "6px 14px",
            borderRadius: 999,
            border: "none",
            background: "#0b2545",
            color: "#f7f4ee",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default function FriendChessGame({ id, token }) {
  const [game, setGame] = useState(null);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);
  const [pendingPromo, setPendingPromo] = useState(null);
  const [busy, setBusy] = useState(false);
  const [presence, setPresence] = useState(null);
  const [chat, setChat] = useState(null);
  const versionRef = useRef(-1);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/chess/game/" + id + "?t=" + encodeURIComponent(token), { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Game not found.");
        return;
      }
      setPresence(data.presence || null);
        if (data.chat) setChat(data.chat);
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
      await load();
      if (alive) timer = setTimeout(tick, document.visibilityState === "visible" ? POLL_MS : HIDDEN_POLL_MS);
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


  // Softer, off-white page background while a game is open.
  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;
    const prevBody = body.style.background;
    const prevHtml = html.style.background;
    body.style.background = "#ece7dc";
    html.style.background = "#ece7dc";
    return () => {
      body.style.background = prevBody;
      html.style.background = prevHtml;
    };
  }, []);

  // Tab alert: when the opponent moves while this window isn't focused,
  // flash the tab title and swap the tab icon until you click back in.
  // Table Talk: send messages / typing status, and flash the tab on a new message.
  async function sendChat(text) {
    try {
      const res = await fetch("/api/chess/game/" + id, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ t: token, action: "chat", text }),
      });
      const data = await res.json();
      if (res.ok && data.chat) setChat(data.chat);
    } catch {
      // message will simply not appear; the player can resend
    }
  }
  function sendTyping(on) {
    fetch("/api/chess/game/" + id, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ t: token, action: "typing", on }),
    }).catch(() => {});
  }
  const incomingMsgs = chat ? chat.messages.filter((m) => !m.mine) : null;
  const latestIncomingAt = incomingMsgs ? (incomingMsgs.length ? incomingMsgs[incomingMsgs.length - 1].at : 0) : null;
  const lastIncomingRef = useRef(null);
  useEffect(() => {
    if (latestIncomingAt === null) return undefined;
    const prev = lastIncomingRef.current;
    lastIncomingRef.current = latestIncomingAt;
    if (prev === null || latestIncomingAt <= prev) return undefined;
    if (document.hasFocus() && document.visibilityState === "visible") return undefined;
    const baseTitle = document.title;
    const alertText = "\u{1F4AC} New message";
    let on = true;
    document.title = alertText;
    const flash = setInterval(() => {
      on = !on;
      document.title = on ? alertText : baseTitle;
    }, 1000);
    let done = false;
    const restore = () => {
      if (done) return;
      done = true;
      clearInterval(flash);
      document.title = baseTitle;
      window.removeEventListener("focus", onBack);
      document.removeEventListener("visibilitychange", onBack);
    };
    function onBack() {
      if (document.hasFocus() && document.visibilityState === "visible") restore();
    }
    window.addEventListener("focus", onBack);
    document.addEventListener("visibilitychange", onBack);
    return restore;
  }, [latestIncomingAt]);

  const prevMyTurnRef = useRef(null);
  useEffect(() => {
    const prev = prevMyTurnRef.current;
    prevMyTurnRef.current = myTurn;
    if (prev !== false || !myTurn) return undefined;
    if (document.hasFocus() && document.visibilityState === "visible") return undefined;
    const baseTitle = document.title;
    let icon = document.querySelector("link[rel~='icon']");
    let addedIcon = false;
    if (!icon) {
      icon = document.createElement("link");
      icon.setAttribute("rel", "icon");
      document.head.appendChild(icon);
      addedIcon = true;
    }
    const baseIcon = icon.getAttribute("href");
    const alertIcon =
      "data:image/svg+xml," +
      encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="30" fill="#c9a227"/><circle cx="32" cy="32" r="13" fill="#0b2545"/></svg>'
      );
    icon.setAttribute("href", alertIcon);
    let on = true;
    document.title = "\u265F YOUR MOVE!";
    const flash = setInterval(() => {
      on = !on;
      document.title = on ? "\u265F YOUR MOVE!" : baseTitle;
    }, 1000);
    let done = false;
    const restore = () => {
      if (done) return;
      done = true;
      clearInterval(flash);
      document.title = baseTitle;
      if (addedIcon) icon.remove();
      else if (baseIcon !== null) icon.setAttribute("href", baseIcon);
      window.removeEventListener("focus", onBack);
      document.removeEventListener("visibilitychange", onBack);
    };
    function onBack() {
      if (document.hasFocus() && document.visibilityState === "visible") restore();
    }
    window.addEventListener("focus", onBack);
    document.addEventListener("visibilitychange", onBack);
    return restore;
  }, [myTurn]);

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
        setPresence(data.presence || null);
        if (data.chat) setChat(data.chat);
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
  const boardWidth = "max(280px, min(100%, calc(100dvh - 215px)))";
  const lostMine = capturedOf(game.state.board, seat);
  const lostTheirs = capturedOf(game.state.board, opp);
  const lead = materialOf(lostTheirs) - materialOf(lostMine);
  const tray = (list, color, extra, label) => (
    <div
      aria-label={label}
      style={{ display: "flex", alignItems: "center", gap: 2, minHeight: 24, margin: "2px auto", width: boardWidth, flexWrap: "wrap" }}
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
    <section className={styles.chessCard} style={{ paddingTop: 12, paddingBottom: 12, background: "#f7f4ee" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
        <h2 style={{ margin: 0, fontSize: "1.7rem", lineHeight: 1.2, fontWeight: 400, fontFamily: "Georgia, 'Times New Roman', serif" }}>
          What’s Your Next <em style={{ color: "#66c7e9" }}>Move?</em>
          <sup style={{ fontSize: "0.4em", marginLeft: 2 }}>SM</sup>
        </h2>
        <span style={{ fontSize: "0.85rem", opacity: 0.8 }}>
          AGILE Chess · You ({game.names[seat]}) play {colorName(seat)} vs {game.names[opp]} ({colorName(opp)})
          {presence ? (
            <span
              style={{ marginLeft: 8, fontWeight: 600, whiteSpace: "nowrap", color: presence.opponentOnline ? "#1a7f37" : "#6b7280" }}
            >
              {presence.opponentOnline
                ? "● " + game.names[opp] + " is here"
                : presence.opponentJoined
                  ? "○ " + game.names[opp] + " is away"
                  : "○ Invite not opened yet"}
            </span>
          ) : null}
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
          {!myTurn && !over && presence && !presence.opponentJoined
            ? "Waiting for " + game.names[opp] + " to open the invite…"
            : statusLine(game, seat, myTurn)}
        </span>
        <span>{gameLabel}</span>
      </div>

      {tray(lostMine, seat, -lead, "Your pieces captured by " + game.names[opp])}

      <div
        className={styles.chessBoardWrap}
        style={{ width: boardWidth, margin: "0 auto", padding: "0 0 8px" }}
      >
        <div className={styles.chessBoard}>
          {rows.map((r) =>
            cols.map((c) => {
              const piece = game.state.board[r][c];
              const destMove = legalForSelected.find((mv) => sameSq(mv.to, r, c));
              const isSel = sameSq(selected, r, c);
              const isCheckedKing =
                !!piece &&
                piece.type === "K" &&
                piece.color === game.state.turn &&
                (game.status === "check" || game.status === "checkmate");
              const isLastFrom = !!game.lastMove && sameSq(game.lastMove.from, r, c);
              const isLastTo = !!game.lastMove && sameSq(game.lastMove.to, r, c);
              const sqClasses = [styles.chessSq, (r + c) % 2 === 0 ? styles.chessSqLight : styles.chessSqDark];
              if (isSel) sqClasses.push(styles.chessSqSelected);
              return (
                <div
                  key={r + "-" + c}
                  className={sqClasses.join(" ")}
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
            style={{ width: "auto", flex: "0 0 auto", padding: "6px 22px" }}
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
      <ChatPanel chat={chat} oppName={game.names[opp]} onSend={sendChat} onTyping={sendTyping} />
      </section>
  );
}
