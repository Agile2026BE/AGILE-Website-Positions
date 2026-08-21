import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import styles from "../legal.module.css";

export const metadata = {
  title: "Candidate Security | AGILE Business Consulting",
  description: "How AGILE Business Consulting protects candidate information throughout the recruiting process.",
};

export default function CandidateSecurityPage() {
  return (
    <main>
      <SiteHeader />

      <section className={`section ${styles.detail}`}>
        <div className={`container ${styles.inner}`}>
          <p className={`contact-eyebrow ${styles.eyebrow}`}>TRUST &amp; SECURITY</p>
          <h1 className="section-title">Candidate Security</h1>

          <div className={styles.body}>
            <p>
              Career discussions often involve sensitive personal and
              professional information, and we treat that responsibility with
              care and professional discretion.
            </p>

            <h2>Who Sees Your Information</h2>
            <p>
              Your information is reviewed by real members of our team and is
              used solely to evaluate potential career opportunities aligned
              with your experience, goals, and preferences.
            </p>

            <h2>Your Approval Comes First</h2>
            <p>
              Your information is released only after your approval. AGILE does
              not distribute resumes, profiles, or personal details to client
              firms without your consent, and we never sell candidate
              information.
            </p>

            <h2>Security Measures</h2>
            <p>
              We maintain technical safeguards designed to prevent unauthorized
              access, misuse, or disclosure of information submitted through
              our website or shared during conversations.
            </p>

            <h2>How To Recognize Official Communication</h2>
            <p>
              Legitimate communication from AGILE will always come from an
              @agileconsultingsolutions.com email address or our main office
              phone number.
            </p>

            <h2>Your Rights</h2>
            <p>
              You may request updates to your information, ask questions, or
              request removal at any time by contacting us directly.
            </p>

            <div className={styles.contactCard}>
              <strong>Reach us directly</strong>
              <a href="mailto:careers@agileconsultingsolutions.com">careers@agileconsultingsolutions.com</a>
              <br />
              Main Office · 407-868-7254
            </div>

            <p className={styles.sourceNote}>
              This page mirrors the Candidate Security notice published at
              agileconsultingsolutions.com. If you maintain a longer or more
              current version of this notice elsewhere, send it over and we
              will replace this text with it exactly.
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
