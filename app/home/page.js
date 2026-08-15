import Link from "next/link";
import BrandLogo from "../../components/BrandLogo";
import SiteFooter from "../../components/SiteFooter";
import styles from "./page.module.css";

export const metadata = {
  title: "AGILE Business Consulting | AEC Recruiting & Career Representation",
  description: "Specialized recruiting and career representation for Architecture, Engineering, and Construction professionals and firms.",
};

export default function CorporateHomePage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.nav}>
          <Link href="/home" className={styles.brand} aria-label="AGILE home"><BrandLogo className={styles.logo} /></Link>
          <nav aria-label="Main navigation">
            <Link href="/professionals">Expectations</Link>
            <Link href="/clients">Hiring Support</Link>
            <Link href="/insights">Insights</Link>
            <Link href="/#reviews">Reviews</Link>
            <Link href="/#contact">Contact</Link>
          </nav>
          <Link href="/#positions" className={styles.navCta}>Explore Positions</Link>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroImage} aria-hidden="true" />
        <div className={styles.heroShade} />
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>ARCHITECTURE · ENGINEERING · CONSTRUCTION</p>
          <h1>What’s Your <em>Next Move?</em></h1>
          <p className={styles.lead}>Specialized recruiting and career representation connecting accomplished AEC professionals with firms shaping the built environment.</p>
          <div className={styles.heroActions}>
            <Link href="/#positions" className={styles.primary}>Explore Career Opportunities</Link>
            <Link href="/clients" className={styles.secondary}>Client Hiring Support</Link>
          </div>
          <div className={styles.trustRow}>
            <span>Confidential Career Representation</span>
            <span>Direct Hiring Connections</span>
            <span>No Account Setup Required</span>
          </div>
        </div>
      </section>

      <section className={styles.intro}>
        <p className={styles.sectionLabel}>THE AGILE ADVANTAGE</p>
        <div className={styles.introGrid}>
          <div>
            <h2>Trusted by AEC firms.<br/><em>Focused on your success.</em></h2>
          </div>
          <div className={styles.story}>
            <p>AGILE is a specialized recruiting and staffing firm serving the Architecture, Engineering, and Construction (AEC) industry. We help professionals make informed, strategic career decisions by preparing them to connect with firms that value technical expertise, project experience, and long-term career growth.</p>
            <p>Our client relationships include ENR Top 100 and Top 500 Design Firms, nationally recognized multidisciplinary consulting firms, notable mid-size and regional consultants, and Best Places to Work award winners.</p>
            <p>Professional discretion is maintained throughout the search process. AGILE provides professional representation, current market intelligence, access to direct hire opportunities, personalized interview preparation, compensation and start-date negotiation, and onboarding assistance through a dedicated point of contact.</p>
          </div>
        </div>
      </section>

      <section className={styles.pathways} aria-label="Explore AGILE">
        <Link href="/professionals"><small>PROFESSIONALS</small><strong>Expect More.<br/>Achieve More.</strong><span>Explore Expectations →</span></Link>
        <Link href="/insights"><small>INSIGHTS</small><strong>Stay Informed.<br/>Stay Ahead.</strong><span>View Trends & Insights →</span></Link>
        <Link href="/clients"><small>CLIENTS</small><strong>Hiring Support<br/>That Delivers.</strong><span>Explore Hiring Support →</span></Link>
      </section>

      <section className={styles.darkBand}>
        <div>
          <p className={styles.eyebrow}>PROFESSIONAL REVIEWS</p>
          <h2>Credibility built through the experience we provide.</h2>
          <Link href="/#reviews" className={styles.textLinkLight}>Read Reviews →</Link>
        </div>
        <div className={styles.positionCallout}>
          <p className={styles.eyebrow}>READY FOR WHAT’S NEXT?</p>
          <h2>Explore career opportunities that align with your goals.</h2>
          <Link href="/#positions" className={styles.primary}>Explore Positions</Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
