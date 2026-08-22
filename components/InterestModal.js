"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./InterestModal.module.css";
import ConfettiBurst from "./ConfettiBurst";

const starters = {
  position: "Hello,\nInterested in discussing the shortlisted positions and how my experience aligns with current opportunities. Thank you.",
  confidential: "Hello,\nInterested in discussing career opportunities that align with my professional background and personal goals. Thank you.",
  resume: "Hello,\nI have a question before sharing my résumé. Please contact me so I can learn more about the opportunity and next steps. Thank you.",
};

function formatPhone(value) {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length < 4) return digits;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function playSuccessChime() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const context = new AudioContext();
    const gain = context.createGain();
    gain.connect(context.destination);
    const now = context.currentTime;
    gain.gain.setValueAtTime(.0001, now);
    gain.gain.exponentialRampToValueAtTime(.12, now + .015);
    gain.gain.exponentialRampToValueAtTime(.0001, now + .42);
    [659.25, 880].forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(frequency, now + index * .09);
      oscillator.connect(gain);
      oscillator.start(now + index * .09);
      oscillator.stop(now + .38 + index * .09);
    });
    window.setTimeout(() => context.close().catch(() => {}), 700);
  } catch (_) {}
}

export default function InterestModal({ job, shortlistedJobs = [], onClose }) {
  const [quickMessage, setQuickMessage] = useState("position");
  const [message, setMessage] = useState(starters.position);
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const [invalidField, setInvalidField] = useState("");
  const modalRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    if (!job) return undefined;
    const resetTimer = window.setTimeout(() => {
      setStatus("");
      setCelebrating(false);
      setQuickMessage("position");
      setMessage(starters.position);
      setPhone("");
      setInvalidField("");
      formRef.current?.reset();
    }, 0);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event) => {
      if (event.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(resetTimer);
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [job, onClose]);

  if (!job) return null;

  const primaryKey = String(job.id ?? job.slug ?? "");
  const allShortlisted = shortlistedJobs.some(
    (item) => String(item.id ?? item.slug ?? "") === primaryKey
  )
    ? shortlistedJobs
    : [job, ...shortlistedJobs].slice(0, 3);

  function showValidation(field, messageText) {
    setSending(false);
    setCelebrating(false);
    setStatus(messageText);
    setInvalidField(field.name || "");
    window.requestAnimationFrame(() => {
      field.focus({ preventScroll: true });
      field.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const nameInput = form.elements.namedItem("name");
    const emailInput = form.elements.namedItem("email");

    if (!nameInput?.value.trim()) {
      showValidation(nameInput, "Please enter your name.");
      return;
    }
    if (!emailInput?.value.trim()) {
      showValidation(emailInput, "Please enter your email address.");
      return;
    }
    if (emailInput.validity?.typeMismatch) {
      showValidation(emailInput, "Please enter a valid email address.");
      return;
    }

    setInvalidField("");
    const formData = new FormData(form);
    formData.set("positionId", String(job.id ?? ""));
    formData.set("positionTitle", job.title ?? "");
    formData.set("discipline", job.discipline ?? "");
    formData.set(
      "shortlistedPositions",
      allShortlisted
        .map((item) => `${item.title} · ID ${item.id ?? item.slug ?? ""}`)
        .join("\n")
    );
    formData.set(
      "textingConsent",
      formData.get("textingConsent") === "yes" ? "Yes" : "No"
    );
    setSending(true);
    setStatus("");
    setCelebrating(false);
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        body: formData,
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(result.error || "Unable to send inquiry.");
      }
      setStatus("Success! We look forward to connecting soon!");
      setCelebrating(true);
      playSuccessChime();
      window.setTimeout(() => setCelebrating(false), 1900);
      form.reset();
      setQuickMessage("position");
      setMessage(starters.position);
      setPhone("");
      setInvalidField("");
      window.setTimeout(
        () => modalRef.current?.scrollTo({ top: 0, behavior: "smooth" }),
        0
      );
    } catch (error) {
      setStatus(error.message || "We could not send your inquiry. Please try again.");
    } finally {
      setSending(false);
    }
  }

  function handleQuickMessage(event) {
    const value = event.target.value;
    setStatus("");
    setCelebrating(false);
    setQuickMessage(value);
    setMessage(starters[value] || "");
  }

  function clearValidationState() {
    if (status && !status.startsWith("Success!")) setStatus("");
    if (invalidField) setInvalidField("");
    setCelebrating(false);
  }

  const success = status.startsWith("Success!");

  return (
    <div
      className={styles.overlay}
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose?.();
      }}
    >
      <section
        ref={modalRef}
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="interest-modal-title"
      >
        {celebrating ? <ConfettiBurst className={styles.confettiBurst} /> : null}
        <button
          className={styles.close}
          type="button"
          onClick={onClose}
          aria-label="Close inquiry form"
        >
          ×
        </button>
        <p className={styles.eyebrow}>NO FORMAL APPLICATION REQUIRED</p>
        <h2 id="interest-modal-title">Start a professional conversation</h2>
        {status ? (
          <p
            className={`${styles.status} ${success ? styles.success : styles.error} ${celebrating ? styles.statusPop : ""}`}
            role="status"
            aria-live="polite"
          >
            {status}
          </p>
        ) : null}
        <div className={styles.positionReference}>
          <span className={styles.primaryLabel}>SHORTLISTED POSITIONS</span>
          <ul>
            {allShortlisted.map((item) => (
              <li key={item.id ?? item.slug}>
                <strong>
                  {item.title} · ID {item.id ?? item.slug}
                </strong>
              </li>
            ))}
          </ul>
        </div>
        <form
          ref={formRef}
          noValidate
          onSubmit={handleSubmit}
          onChange={clearValidationState}
          className={styles.form}
        >
          <label>
            Name *
            <input
              type="text"
              name="name"
              placeholder="First and last name"
              required
              aria-invalid={invalidField === "name" ? "true" : undefined}
            />
          </label>
          <label>
            Email *
            <input
              type="email"
              name="email"
              placeholder="name@example.com"
              required
              aria-invalid={invalidField === "email" ? "true" : undefined}
            />
          </label>
          <label>
            Phone
            <input
              type="tel"
              name="phone"
              placeholder="(***) ***-****"
              inputMode="tel"
              value={phone}
              onChange={(event) => setPhone(formatPhone(event.target.value))}
            />
          </label>
          {phone ? (
            <label className={styles.consent}>
              <input type="checkbox" name="textingConsent" value="yes" />
              <span>
                AGILE may text me about my inquiry and career opportunities. Consent is optional and is not required. Message/data rates may apply. Reply STOP to opt out.
              </span>
            </label>
          ) : null}
          <label>
            Quick Message — Optional
            <select
              name="quickMessage"
              value={quickMessage}
              onChange={handleQuickMessage}
            >
              <option value="position">Discuss my shortlisted positions</option>
              <option value="confidential">
                Discuss career opportunities aligned with my goals
              </option>
              <option value="resume">
                I have a question before sharing my résumé
              </option>
            </select>
          </label>
          <label>
            Your Message — Optional
            <textarea
              name="message"
              rows="4"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
          </label>
          <div className={styles.bottomRow}>
            <label className={styles.resume}>
              <span>
                <strong>Attach Résumé</strong> <em>Optional</em>
              </span>
              <input type="file" name="resume" accept=".pdf,.doc,.docx" />
            </label>
            <button type="submit" disabled={sending}>
              {sending ? "Sending..." : "Send My Inquiry"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
