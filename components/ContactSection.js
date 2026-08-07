"use client";

import { useState } from "react";
import styles from "./ContactSection.module.css";

const quickMessages = {
  position:
    "Hello,\nI would like to learn more about the selected position and whether my background may be a fit. Please contact me to discuss the opportunity and timing.",
  confidential:
    "Hello,\nI would like to discuss confidential career options that may align with my background and goals. Please contact me when convenient.",
  resume:
    "Hello,\nI have a question before sharing my résumé. Please contact me so I can learn more about the opportunity and next steps.",
};

export default function ContactSection() {
  const [quickMessage, setQuickMessage] = useState("position");
  const [message, setMessage] = useState(quickMessages.position);

  function handleQuickMessage(event) {
    const value = event.target.value;
    setQuickMessage(value);
    setMessage(quickMessages[value] ?? "");
  }

  return (
    <section className={`section contact-section ${styles.section}`} id="contact">
      <div className={`container contact-grid ${styles.grid}`}>
        <div className={styles.intro}>
          <p className={`contact-eyebrow ${styles.eyebrow}`}>
            PROFESSIONAL CAREER INQUIRY
          </p>
          <h2 className="section-title">Start with a conversation.</h2>
          <p className="section-copy">
            Not a formal application. No fee or obligation. Tell us what matters most,
            or simply ask about a selected position.
          </p>
          <div
            className={`contact-badges ${styles.badges}`}
            aria-label="Inquiry details"
          >
            <span>✓ Résumé optional</span>
            <span>✓ No account required</span>
            <span>✓ Main Office: 407-868-7254</span>
          </div>
        </div>

        <form className={`contact-form ${styles.form}`}>
          <label>
            Name
            <input type="text" name="name" placeholder="First and last name" />
          </label>

          <label>
            Email *
            <input type="email" name="email" placeholder="name@example.com" required />
          </label>

          <label>
            Phone
            <input type="tel" name="phone" placeholder="(407) 868-7254" />
          </label>

          <label>
            Discipline of Interest
            <select name="discipline" defaultValue="">
              <option value="" disabled>Choose a discipline</option>
              <option>Electrical Engineering</option>
              <option>Mechanical Engineering</option>
              <option>Plumbing</option>
              <option>Fire Protection</option>
              <option>Civil Engineering</option>
              <option>Transportation</option>
              <option>Commissioning</option>
            </select>
          </label>

          <label className={styles.full}>
            Quick Message — Optional
            <select name="quickMessage" value={quickMessage} onChange={handleQuickMessage}>
              <option value="position">Tell me more about this position</option>
              <option value="confidential">I would like to discuss confidential career options</option>
              <option value="resume">I have a question before sharing my résumé</option>
            </select>
          </label>

          <label className={styles.full}>
            Your Message — Optional
            <textarea
              name="message"
              rows="3"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
          </label>

          <label className={styles.resume}>
            <span className={styles.resumePrompt}><strong>Attach Résumé</strong> <em>Optional</em></span>
            <input type="file" name="resume" accept=".pdf,.doc,.docx" />
          </label>

          <div className={styles.submitCell}>
            <button type="submit">Send My Inquiry</button>
          </div>
        </form>
      </div>
    </section>
  );
}
