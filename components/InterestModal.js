"use client";

import { useEffect, useState } from "react";
import styles from "./InterestModal.module.css";

const starters = {
  position: "Interested in discussing the shortlisted positions and how my experience aligns with current opportunities.",
  confidential: "I would like to discuss confidential career options that may align with my background and goals.",
  resume: "I have a question before sharing my résumé. Please contact me so I can learn more about the opportunity and next steps.",
};

export default function InterestModal({ job, shortlistedJobs = [], onClose }) {
  const [quickMessage, setQuickMessage] = useState("position");
  const [message, setMessage] = useState(starters.position);
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  const [celebrating, setCelebrating] = useState(false);

  useEffect(() => {
    if (!job) return undefined;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setQuickMessage("position"); setMessage(starters.position); setStatus(""); setCelebrating(false);
    const onKey = (event) => { if (event.key === "Escape") onClose?.(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = originalOverflow; window.removeEventListener("keydown", onKey); };
  }, [job, onClose]);

  if (!job) return null;

  const primaryKey = String(job.id ?? job.slug ?? "");
  const otherShortlisted = shortlistedJobs.filter(item => String(item.id ?? item.slug ?? "") !== primaryKey);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("positionId", String(job.id ?? ""));
    formData.set("positionTitle", job.title ?? "");
    formData.set("discipline", job.discipline ?? "");
    if (otherShortlisted.length) formData.set("otherShortlistedPositions", otherShortlisted.map(item => `${item.title} · ID ${item.id ?? item.slug ?? ""}`).join("\n"));
    setSending(true); setStatus(""); setCelebrating(false);
    try {
      const response = await fetch("/api/inquiry", { method: "POST", body: formData });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Unable to send inquiry.");
      setStatus("Success! We look forward to connecting soon!");
      setCelebrating(true);
      window.setTimeout(() => setCelebrating(false), 1600);
      form.reset();
      setQuickMessage("position");
      setMessage(starters.position);
    } catch (error) {
      setStatus(error.message || "We could not send your inquiry. Please try again.");
    } finally { setSending(false); }
  }

  function handleQuickMessage(event) {
    const value = event.target.value;
    setQuickMessage(value);
    setMessage(starters[value] || "");
  }

  const success = status.startsWith("Success!");

  return (
    <div className={styles.overlay} role="presentation" onMouseDown={(event)=>{ if(event.target===event.currentTarget) onClose?.(); }}>
      <section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="interest-modal-title">
        {celebrating ? <div className={styles.confetti} aria-hidden="true">{Array.from({length:22}).map((_,index)=><i key={index} style={{"--i":index}} />)}</div> : null}
        <button className={styles.close} type="button" onClick={onClose} aria-label="Close inquiry form">×</button>
        <p className={styles.eyebrow}>NO FORMAL APPLICATION REQUIRED</p>
        <h2 id="interest-modal-title">Start a professional conversation</h2>
        <div className={styles.positionReference}><span className={styles.primaryLabel}>POSITION OF INTEREST</span><strong>{job.title} · ID {job.id}</strong>{otherShortlisted.length ? <div className={styles.otherPositions}><span>ALSO SHORTLISTED</span>{otherShortlisted.map(item=><div key={item.id??item.slug}>{item.title} · ID {item.id??item.slug}</div>)}</div> : null}</div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>Name<input type="text" name="name" placeholder="First and last name" /></label>
          <label>Email *<input type="email" name="email" placeholder="name@example.com" required /></label>
          <label>Phone<input type="tel" name="phone" placeholder="(407) 868-7254" /></label>
          <label>Quick Message — Optional<select name="quickMessage" value={quickMessage} onChange={handleQuickMessage}><option value="position">Tell me more about this position</option><option value="confidential">I would like to discuss confidential career options</option><option value="resume">I have a question before sharing my résumé</option></select></label>
          <label>Your Message — Optional<textarea name="message" rows="4" value={message} onChange={(event)=>setMessage(event.target.value)} /></label>
          <div className={styles.bottomRow}><label className={styles.resume}><span><strong>Attach Résumé</strong> <em>Optional</em></span><input type="file" name="resume" accept=".pdf,.doc,.docx" /></label><button type="submit" disabled={sending}>{sending ? "Sending..." : "Send My Inquiry"}</button></div>
          {status ? <p className={`${styles.status} ${success ? styles.success : styles.error}`} role="status" aria-live="polite">{status}</p> : null}
        </form>
      </section>
    </div>
  );
}
