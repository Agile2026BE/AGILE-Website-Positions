import styles from "./ContactSection.module.css";

export default function ContactSection() {
  return (
    <section className={`section contact-section ${styles.section}`} id="contact">
      <div className={`container contact-grid ${styles.grid}`}>
        <div>
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

          <label className={`contact-full ${styles.full}`}>
            Quick Message — Optional
            <select name="quickMessage" defaultValue="">
              <option value="" disabled>Choose a quick message</option>
              <option>I am interested in a position on the site.</option>
              <option>I would like to discuss confidential career options.</option>
              <option>I have a question before sharing my résumé.</option>
            </select>
          </label>

          <label className={`contact-full ${styles.full}`}>
            Your Message — Optional
            <textarea
              name="message"
              rows="4"
              placeholder="Choose a message above or write your own. You can edit any starter message."
            />
          </label>

          <div
            className={`contact-full contact-form-footer ${styles.full} ${styles.footer}`}
          >
            <div>
              <strong>Attach Résumé</strong> <span>Optional</span>
            </div>
            <button type="submit">Send My Inquiry</button>
          </div>
        </form>
      </div>
    </section>
  );
}
