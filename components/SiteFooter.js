import BrandLogo from "./BrandLogo";
import styles from "./SiteFooter.module.css";

export default function SiteFooter() {
  return (
    <footer className={`site-footer ${styles.footer}`}>
      <div className={`container footer-grid ${styles.grid}`}>
        <div>
          <BrandLogo className={styles.footerLogo} />
          <p>Specialized recruiting and consulting career guidance for Architects, Engineers and Construction Professionals.</p>
        </div>
        <div>
          <p className={`footer-eyebrow ${styles.eyebrow}`}>STATES SERVED</p>
          <h2>Connecting AEC professionals and consulting firms across nine key markets.</h2>
          <p>New York · New Jersey · Pennsylvania · Massachusetts · Florida · California · Colorado · North Carolina · Connecticut</p>
          <div className={`footer-actions ${styles.actions}`}><a href="#positions">SEARCH CAREERS</a><a href="#contact">CLIENT HIRING SUPPORT</a></div>
        </div>
        <div>
          <p className={`footer-eyebrow ${styles.eyebrow}`}>CONNECT WITH AGILE</p>
          <p>careers@agileconsultingsolutions.com</p>
          <p><strong>MAIN OFFICE 407-868-7254</strong></p>
          <p>Direct, professional support for both candidates and clients.</p>
          <p className={`footer-eyebrow ${styles.eyebrow}`}>AVAILABLE HOURS · EASTERN</p>
          <p>Monday–Friday · 8:00 AM–8:30 PM</p><p>Saturday · 9:00 AM–12:30 PM</p>
        </div>
      </div>
      <div className={`footer-bottom ${styles.bottom}`}><div className={`container footer-bottom-inner ${styles.bottomInner}`}><span>© 2026 AGILE Business Consulting · All Rights Reserved</span><span>Direct Career Support · No Résumé Required</span><a href="#contact">Start a Conversation</a></div></div>
    </footer>
  );
}
