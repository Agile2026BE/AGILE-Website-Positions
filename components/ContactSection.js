"use client";

import { useEffect, useState } from "react";
import styles from "./ContactSection.module.css";

const baseMessages = {
  position: "Hello,\nI would like to learn more about the selected position and whether my background may be a fit. Please contact me to discuss the opportunity and timing.\nThank you.",
  confidential: "Hello,\nI would like to discuss confidential career options that may align with my background and goals. Please contact me when convenient.\nThank you.",
  resume: "Hello,\nI have a question before sharing my résumé. Please contact me so I can learn more about the opportunity and next steps.\nThank you.",
};

function positionMessage(id, title) {
  if (!id) return baseMessages.position;
  return `Hello,\nI would like to learn more about Position ID ${id}${title ? `, ${title}` : ""} and whether my background may be a fit. Please contact me to discuss the opportunity and timing.\nThank you.`;
}

export default function ContactSection() {
  const [quickMessage, setQuickMessage] = useState("position");
  const [message, setMessage] = useState(baseMessages.position);
  const [positionId, setPositionId] = useState("");
  const [positionTitle, setPositionTitle] = useState("");
  const [discipline, setDiscipline] = useState("");
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("positionId") || "";
    const title = params.get("positionTitle") || "";
    const selectedDiscipline = params.get("discipline") || "";
    if (id) {
      const frame = requestAnimationFrame(() => {
        setPositionId(id); setPositionTitle(title); setDiscipline(selectedDiscipline); setQuickMessage("position"); setMessage(positionMessage(id, title));
      });
      return () => cancelAnimationFrame(frame);
    }
    return undefined;
  }, []);

  function handleQuickMessage(event) {
    const value = event.target.value;
    setQuickMessage(value);
    setMessage(value === "position" ? positionMessage(positionId, positionTitle) : baseMessages[value] ?? "");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSending(true); setStatus("");
    const formData = new FormData(event.currentTarget);
    formData.set("positionId", positionId);
    formData.set("positionTitle", positionTitle);
    try {
      const response = await fetch("/api/inquiry", { method: "POST", body: formData });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Unable to send inquiry.");
      setStatus("Inquiry Sent, we look forward to speaking with you!");
      event.currentTarget.reset();
      setPositionId(""); setPositionTitle(""); setDiscipline(""); setQuickMessage("position"); setMessage(baseMessages.position);
      window.history.replaceState({}, "", `${window.location.pathname}#contact`);
    } catch (error) {
      setStatus(error.message || "We could not send your inquiry. Please try again.");
    } finally { setSending(false); }
  }

  return (
    <section className={`section contact-section ${styles.section}`} id="contact">
      <div className={`container contact-grid ${styles.grid}`}>
        <div className={styles.intro}>
          <p className={`contact-eyebrow ${styles.eyebrow}`}>PROFESSIONAL CAREER INQUIRY</p>
          <h2 className="section-title">Start with a conversation.</h2>
          <p className="section-copy">Not a formal application. No fee or obligation. Tell us what matters most, or simply ask about a selected position.</p>
          <div className={`contact-badges ${styles.badges}`} aria-label="Inquiry details"><span>✓ Résumé optional</span><span>✓ No account required</span><span>✓ Main Office: 407-868-7254</span></div>
        </div>

        <form className={`contact-form ${styles.form}`} onSubmit={handleSubmit}>
          {positionId ? <div className={`${styles.full} ${styles.positionReference}`}><span>POSITION OF INTEREST</span><strong>Position ID {positionId}{positionTitle ? ` · ${positionTitle}` : ""}</strong></div> : null}
          <label>Name<input type="text" name="name" placeholder="First and last name" /></label>
          <label>Email *<input type="email" name="email" placeholder="name@example.com" required /></label>
          <label>Phone<input type="tel" name="phone" placeholder="(407) 868-7254" /></label>
          <label>Discipline of Interest<select name="discipline" value={discipline} onChange={(event)=>setDiscipline(event.target.value)}><option value="">Choose a discipline</option><option>Electrical Engineering</option><option>Mechanical Engineering</option><option>Plumbing</option><option>Fire Protection</option><option>Civil Engineering</option><option>Transportation</option><option>Commissioning</option></select></label>
          <label className={styles.full}>Quick Message — Optional<select name="quickMessage" value={quickMessage} onChange={handleQuickMessage}><option value="position">Tell me more about this position</option><option value="confidential">I would like to discuss confidential career options</option><option value="resume">I have a question before sharing my résumé</option></select></label>
          <label className={styles.full}>Your Message — Optional<textarea name="message" rows="4" value={message} onChange={(event)=>setMessage(event.target.value)} /></label>
          <label className={styles.resume}><span className={styles.resumePrompt}><strong>Attach Résumé</strong> <em>Optional</em></span><input type="file" name="resume" accept=".pdf,.doc,.docx" /></label>
          <div className={styles.submitCell}><button type="submit" disabled={sending}>{sending ? "Sending..." : "Send My Inquiry"}</button></div>
          {status ? <div className={`${styles.full} ${status.startsWith("Inquiry Sent") ? styles.success : styles.error}`} role="status" aria-live="polite">{status}</div> : null}
        </form>
      </div>
    </section>
  );
}
