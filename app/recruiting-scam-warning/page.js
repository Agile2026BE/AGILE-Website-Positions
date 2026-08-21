import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import styles from "../legal.module.css";

export const metadata = {
  title: "Recruiting Scam Warning | AGILE Business Consulting",
  description: "How to recognize legitimate communication from AGILE Business Consulting and avoid recruiting scams.",
};

export default function RecruitingScamWarningPage() {
  return (
    <main>
      <SiteHeader />

      <section className={`section ${styles.detail}`}>
        <div className={`container ${styles.inner}`}>
          <p className={`contact-eyebrow ${styles.eyebrow}`}>TRUST &amp; SECURITY</p>
          <h1 className="section-title">Recruiting Scam Warning</h1>

          <div className={styles.body}>
            <p>
              AGILE Business Consulting is committed to protecting the safety,
              privacy, and trust of our candidates.
            </p>

            <h2>AGILE Never Charges Candidates</h2>
            <p>
              AGILE never charges candidates fees to apply, interview, or
              receive job offers. We do not request payment through any
              method, including gift cards, cryptocurrency, or banking
              details. Any message requesting payment does not come from
              AGILE.
            </p>

            <h2>How To Verify Official Communication</h2>
            <p>
              Official communication from AGILE will always come from an
              @agileconsultingsolutions.com email address or our main office
              phone number. We do not conduct interviews or send offers
              through messaging apps, text-only platforms, or unofficial email
              accounts.
            </p>

            <h2>Red Flags To Watch For</h2>
            <ul>
              <li>Requests for payment of any kind, at any stage of the process.</li>
              <li>Requests for banking or financial details early in a conversation.</li>
              <li>Urgent or pressured language pushing you to act immediately.</li>
              <li>Messages from email addresses outside @agileconsultingsolutions.com.</li>
            </ul>

            <h2>If Something Feels Off</h2>
            <p>
              Contact us directly to verify any communication that claims to be
              from AGILE before responding or sharing information.
            </p>

            <div className={styles.contactCard}>
              <strong>Verify with us directly</strong>
              <a href="mailto:careers@agileconsultingsolutions.com">careers@agileconsultingsolutions.com</a>
              <br />
              Main Office · 407-868-7254
            </div>

            <p className={styles.sourceNote}>
              This page mirrors the Recruiting Scam Warning published at
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
