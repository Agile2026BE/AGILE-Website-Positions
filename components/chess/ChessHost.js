"use client";

import { useRef, useState } from "react";
import styles from "../../app/page.module.css";

const KEY_STORAGE = "agile-chess-host-key";

function readKey() {
  try {
    return window.localStorage.getItem(KEY_STORAGE) || "";
  } catch {
    return "";
  }
}

function storeKey(key) {
  try {
    window.localStorage.setItem(KEY_STORAGE, key);
  } catch {
    // storage unavailable — key just will not be remembered
  }
}

function summaryStatus(g) {
  if (g.result) {
    if (!g.result.winner) return "Draw (" + g.result.reason + ")";
    return g.names[g.result.winner] + " won by " + g.result.reason;
  }
  if (g.moveCount === 0) return g.turn === g.hostColor ? "Not started — your move" : "Not started — waiting on " + g.names[g.turn];
  return (g.turn === g.hostColor ? "Your move" : "Waiting on " + g.names[g.turn]) + " · " + g.moveCount + " moves";
}

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid rgba(0,0,0,0.2)",
  fontSize: 16,
  boxSizing: "border-box",
};

export default function ChessHost() {
  const [keyInput, setKeyInput] = useState("");
  const [hostName, setHostName] = useState("Byron");
  const [friendName, setFriendName] = useState("");
  const [hostColor, setHostColor] = useState("w");
  const [created, setCreated] = useState(null);
  const [games, setGames] = useState(null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [flashed, setFlashed] = useState(null);
  const flashTimer = useRef(null);

  async function request(method, body) {
    const key = keyInput.trim() || readKey();
    if (!key) {
      setMessage("Enter your host key first.");
      return null;
    }
    setBusy(true);
    setMessage("");
    try {
      const res = await fetch("/api/chess/host", {
        method,
        headers: { "Content-Type": "application/json", "x-chess-host-key": key },
        body: body ? JSON.stringify(body) : undefined,
        cache: "no-store",
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || "Something went wrong.");
        return null;
      }
      storeKey(key);
      setKeyInput("");
      return data;
    } catch {
      setMessage("Could not reach the server.");
      return null;
    } finally {
      setBusy(false);
    }
  }

  async function createGame() {
    const data = await request("POST", { hostName, friendName, hostColor });
    if (data) {
      setCreated(data.game);
      setGames(null);
    }
  }

  async function loadGames() {
    const data = await request("GET");
    if (data) setGames(data.games);
  }

  function inviteText(g) {
    const host = g.names[g.hostColor];
    return host + " invited you to a game of chess on AGILE. Tap to play (no account needed): " + window.location.origin + g.friendLink;
  }

  // Shows the result right on the button that was tapped (e.g. "Copied ✓") for a few seconds.
  function flash(id, kind) {
    setFlashed({ id, kind });
    window.clearTimeout(flashTimer.current);
    flashTimer.current = window.setTimeout(() => setFlashed(null), 3000);
  }

  // Older iPhones and some desktop setups block navigator.clipboard; this hidden-box copy works there.
  function legacyCopy(text) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.top = "-1000px";
    ta.style.fontSize = "16px";
    document.body.appendChild(ta);
    ta.select();
    ta.setSelectionRange(0, text.length);
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch {
      ok = false;
    }
    document.body.removeChild(ta);
    return ok;
  }

  async function copyInvite(g) {
    const text = inviteText(g);
    let ok = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        ok = true;
      }
    } catch {
      ok = false;
    }
    if (!ok) ok = legacyCopy(text);
    flash(g.id, ok ? "copied" : "failed");
  }

  // Opens Messages with the invite already typed in. Apple devices use "sms:&body=", others "sms:?body=".
  function smsHref(g) {
    const apple = typeof navigator !== "undefined" && /iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent);
    return (apple ? "sms:&body=" : "sms:?body=") + encodeURIComponent(inviteText(g));
  }

  function forgetKey() {
    try {
      window.localStorage.removeItem(KEY_STORAGE);
    } catch {
      // nothing to remove
    }
    setMessage("Host key removed from this device.");
  }

  function gameRow(g) {
    const friendSeat = g.hostColor === "w" ? "b" : "w";
    return (
      <div key={g.id} style={{ borderTop: "1px solid rgba(0,0,0,0.12)", padding: "12px 0" }}>
        <strong>
          {g.names[g.hostColor]} ({g.hostColor === "w" ? "Silver" : "Gold"}) vs {g.names[friendSeat]}
        </strong>
        <div className={styles.chessSub}>{summaryStatus(g)}</div>
        {g.match ? (
          <div className={styles.chessSub}>
            Match: {g.match.host.name} {g.match.host.wins} – {g.match.friend.wins} {g.match.friend.name}
            {g.match.draws ? " · Draws " + g.match.draws : ""}
            {g.match.complete ? " (final)" : " · " + g.match.played + " of " + g.match.target + " played"}
          </div>
        ) : null}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
          <a className={styles.chessNewGame} href={g.hostLink}>
            Open my board
          </a>
          <a className={styles.chessOutlineBtn} style={{ textAlign: "center", textDecoration: "none" }} href={smsHref(g)}>
            Text invite
          </a>
          <button type="button" className={styles.chessOutlineBtn} onClick={() => copyInvite(g)}>
            {flashed && flashed.id === g.id ? (flashed.kind === "copied" ? "Copied ✓" : "Copy blocked") : "Copy invite"}
          </button>
        </div>
        {flashed && flashed.id === g.id ? (
          <p className={styles.chessSaveNote} style={{ margin: "6px 0 0" }}>
            {flashed.kind === "copied"
              ? "Invite copied — paste it into a text or email."
              : "This browser blocked copying. Press and hold the link below to copy it."}
          </p>
        ) : null}
        <input
          readOnly
          aria-label="Invite link"
          value={inviteText(g)}
          onFocus={(e) => e.target.select()}
          style={{ ...inputStyle, marginTop: 8, fontSize: 13, color: "#3c5164", background: "#fbf7ec" }}
        />
      </div>
    );
  }

  return (
    <section className={styles.chessCard}>
      <h2>AGILE Chess — Play a Friend</h2>
      <p className={styles.chessSub}>Private host console. Create a game, send the invite link, and play from any device.</p>

      <label style={{ display: "block", margin: "16px 0 6px", fontWeight: 600 }} htmlFor="chess-host-key">
        Host key
      </label>
      <input
        id="chess-host-key"
        type="password"
        autoComplete="off"
        placeholder="Only needed once per device"
        value={keyInput}
        onChange={(e) => setKeyInput(e.target.value)}
        style={inputStyle}
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 12 }}>
        <div>
          <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }} htmlFor="chess-host-name">
            Your name
          </label>
          <input id="chess-host-name" value={hostName} maxLength={24} onChange={(e) => setHostName(e.target.value)} style={inputStyle} />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }} htmlFor="chess-friend-name">
            Friend name
          </label>
          <input
            id="chess-friend-name"
            value={friendName}
            maxLength={24}
            placeholder="e.g. Brother"
            onChange={(e) => setFriendName(e.target.value)}
            style={inputStyle}
          />
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
        <button
          type="button"
          className={hostColor === "w" ? styles.chessNewGame : styles.chessOutlineBtn}
          onClick={() => setHostColor("w")}
        >
          I play Silver
        </button>
        <button
          type="button"
          className={hostColor === "b" ? styles.chessNewGame : styles.chessOutlineBtn}
          onClick={() => setHostColor("b")}
        >
          I play Gold
        </button>
      </div>

      <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
        <button type="button" className={styles.chessNewGame} disabled={busy} onClick={createGame}>
          Create game
        </button>
        <button type="button" className={styles.chessOutlineBtn} disabled={busy} onClick={loadGames}>
          My games
        </button>
        <button type="button" className={styles.chessOutlineBtn} onClick={forgetKey}>
          Forget key on this device
        </button>
      </div>

      {message ? <p className={styles.chessSaveNote}>{message}</p> : null}

      {created ? (
        <div style={{ marginTop: 16 }}>
          <h3>New game ready</h3>
          <p className={styles.chessSub}>Send the invite to your friend, then open your board.</p>
          {gameRow(created)}
        </div>
      ) : null}

      {games ? (
        <div style={{ marginTop: 16 }}>
          <h3>My games</h3>
          {games.length === 0 ? <p className={styles.chessSub}>No active games.</p> : games.map(gameRow)}
        </div>
      ) : null}
    </section>
  );
}
