"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ContactSection.module.css";
import { disciplineOptions } from "../data/filterOptions";
import ConfettiBurst from "./ConfettiBurst";

const baseMessages = {
  position: "Hello,\nI'd like to learn more about the selected position and discuss my qualifications. Thank you.",
  confidential: "Hello,\nInterested in discussing career opportunities that align with my professional background and personal goals. Thank you.",
  resume: "Hello,\nI have a question before sharing my résumé. Please contact me so I can learn more about the opportunity and next steps. Thank you.",
  guidance: "Hello,\nI'd like confidential career guidance and would appreciate the opportunity to discuss my background and next move. Thank you.",
  lilly: "Hello,\nI'd like to connect with Lilly regarding my career search and discuss how AGILE may be able to help. Thank you.",
  other: "Hello,\nI'd like to connect with AGILE regarding my career search. Thank you.",
};

function positionMessage(id, title) {
  if (!id) return baseMessages.position;
  return `Hello,\nI'd like to learn more about Position ID ${id}${title ? `, ${title}` : ""} and discuss my qualifications. Thank you.`;
}

function formatPhone(value) {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length < 4) return digits;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export default function ContactSection() {
  const [quickMessage, setQuickMessage] = useState("position");
  const [message, setMessage] = useState(baseMessages.position);
  const [positionId, setPositionId] = useState("");
  const [positionTitle, setPositionTitle] = useState("");
  const [discipline, setDiscipline] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  const [celebrating, setCelebrating] = useState(false);

  const badgesRef = useRef(null);
  const formRef = useRef(null);
  const [badgesVisible, setBadgesVisible] = useState(false);

  useEffect(() => {
    const syncPositionFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const id = params.get("positionId") || "";
      const title = params.get("positionTitle") || "";
      const selectedDiscipline = params.get("discipline") || "";
      setStatus("");
      setCelebrating(false);
      if (id) {
        setPositionId(id); setPositionTitle(title); setDiscipline(selectedDiscipline); setQuickMessage("position"); setMessage(positionMessage(id, title));
      }
    };
    const timer = window.setTimeout(syncPositionFromUrl, 0);
    window.addEventListener("hashchange", syncPositionFromUrl);
    window.addEventListener("popstate", syncPositionFromUrl);
    return () => { window.clearTimeout(timer); window.removeEventListener("hashchange", syncPositionFromUrl); window.removeEventListener("popstate", syncPositionFromUrl); };
  }, []);

  useEffect(() => {
    const node = badgesRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => { setBadgesVisible(entry.isIntersecting); }, { threshold: 0.35 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  function handleQuickMessage(event) {
    const value = event.target.value;
    setStatus(""); setCelebrating(false);
    setQuickMessage(value);
    setMessage(value === "position" ? positionMessage(positionId, positionTitle) : baseMessages[value] ?? "");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setSending(true); setStatus(""); setCelebrating(false);
    const formData = new FormData(form);
    formData.set("positionId", positionId); formData.set("positionTitle", positionTitle);
    formData.set("textingConsent", formData.get("textingConsent") === "yes" ? "Yes" : "No");
    try {
      const response = await fetch("/api/inquiry", { method: "POST", body: formData });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Unable to send inquiry.");
      form.reset(); setPositionId(""); setPositionTitle(""); setDiscipline(""); setPhone(""); setQuickMessage("position"); setMessage(baseMessages.position);
      setStatus("Success! Your message has been sent. We look forward to connecting soon!"); setCelebrating(true);
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(() => setCelebrating(false), 2600);
      window.history.replaceState({}, "", `${window.location.pathname}#contact`);
    } catch (error) { setStatus(error.message || "We could not send your inquiry. Please try again."); }
    finally { setSending(false); }
  }

  const success = status.startsWith("Success!");

  return (
    <section className={`section contact-section ${styles.section}`} id="contact">
      <div className={`container contact-grid ${styles.grid}`}>
        <div className={styles.intro}>
          <p className={`contact-eyebrow ${styles.eyebrow}`}>PROFESSIONAL CAREER INQUIRY</p>
          <h2 className="section-title">Start with a conversation.</h2>
          <p className="section-copy">Not a formal application. No fee or obligation.<br />Tell us what matters most, or simply ask about a selected position.</p>
          <div ref={badgesRef} className={`contact-badges ${styles.badges} ${styles.badgesThree}`} aria-label="Inquiry details">
            <span className={`${styles.contactBadge} ${badgesVisible ? styles.contactBadgeVisible : ""}`} style={{ "--badge-delay": "0ms" }}><b className={styles.contactCheck} aria-hidden="true">✓</b>No application</span>
            <span className={`${styles.contactBadge} ${badgesVisible ? styles.contactBadgeVisible : ""}`} style={{ "--badge-delay": "900ms" }}><b className={styles.contactCheck} aria-hidden="true">✓</b>Résumé optional</span>
            <span className={`${styles.contactBadge} ${badgesVisible ? styles.contactBadgeVisible : ""}`} style={{ "--badge-delay": "1800ms" }}><b className={styles.contactCheck} aria-hidden="true">✓</b>No account required</span>
          </div>
          <aside className={styles.peopleCard} aria-label="AGILE communications and professional engagement">
            <p className={styles.peopleLabel}>AGILE COMMUNICATIONS</p><strong>Lilly Genao</strong><span>Communications &amp; Professional Engagement</span><span>Architecture, MEP Engineering &amp; Construction</span>
            <a href="mailto:lgenao@agileconsultingsolutions.com" target="_blank" rel="noopener noreferrer">lgenao@agileconsultingsolutions.com</a>
            <a href="https://www.linkedin.com/in/lilly-genao-771ba338a/" target="_blank" rel="noreferrer">View Lilly on LinkedIn ↗</a>
          </aside>
        </div>
        <form ref={formRef} id="candidate-inquiry-form" className={`contact-form ${styles.form}`} onSubmit={handleSubmit} autoComplete="off" onChange={()=>{ if(status){ setStatus(""); setCelebrating(false); } }}>
          {celebrating ? <ConfettiBurst className={styles.confettiBurst} /> : null}
          {status ? <div className={`${styles.full} ${success ? styles.success : styles.error} ${celebrating ? styles.statusPop : ""}`} role="status" aria-live="polite">{status}</div> : null}
          {positionId ? <div className={`${styles.full} ${styles.positionReference}`}><span>POSITION OF INTEREST</span><strong>Position ID {positionId}{positionTitle ? ` · ${positionTitle}` : ""}</strong></div> : null}
          <label>Name *<input type="text" name="career_inquiry_name" placeholder="First and last name" autoComplete="off" required /></label>
          <label>Email *<input type="email" name="career_inquiry_email" placeholder="name@example.com" autoComplete="off" required /></label>
          <label>Phone<input type="tel" name="career_inquiry_phone" placeholder="(***) ***-****" autoComplete="off" inputMode="tel" value={phone} onChange={(event) => setPhone(formatPhone(event.target.value))} /></label>
          <label>Discipline of Interest<select name="discipline" value={discipline} onChange={(event) => setDiscipline(event.target.value)}><option value="">Choose a discipline</option>{disciplineOptions.map((option)=><option key={option}>{option}</option>)}<option>Other</option></select></label>
          <label>Best Time to Reach Me<select name="bestTime" defaultValue=""><option value="">Choose a time</option><option>Morning · 8 AM–11 AM</option><option>Midday · 11 AM–2 PM</option><option>Afternoon · 2 PM–5 PM</option><option>Evening · 5 PM–8 PM</option><option>Flexible</option></select></label>
          <label>Preferred Contact Method<select name="contactMethod" defaultValue=""><option value="">No preference</option><option>Phone</option><option>Text</option><option>Email</option></select></label>
          {phone ? <label className={`${styles.full} ${styles.consent}`}><input type="checkbox" name="textingConsent" value="yes" /><span>OK to text me about this inquiry and future opportunities. Optional — msg &amp; data rates may apply, reply STOP to opt out.</span></label> : null}
          <label className={styles.full}>Reason for Reaching Out<select name="quickMessage" value={quickMessage} onChange={handleQuickMessage}><option value="position">I’m interested in a specific position</option><option value="confidential">I’d like to discuss career options</option><option value="resume">I have a question before sharing my résumé</option><option value="guidance">I’d like confidential career guidance</option><option value="lilly">I’d like to connect with Lilly</option><option value="other">Other career inquiry</option></select></label>
          <label className={styles.full}>Your Message — Optional<textarea name="message" rows="4" value={message} onChange={(event) => setMessage(event.target.value)} /></label>
          <label className={styles.resume}><span className={styles.resumePrompt}><strong>Attach Résumé</strong> <em>Optional</em></span><input type="file" name="resume" accept=".pdf,.doc,.docx" /></label>
          <div className={styles.submitCell}><button type="submit" disabled={sending}>{sending ? "Sending..." : "Send My Inquiry"}</button></div>
        </form>
      </div>
    </section>
  );
}
