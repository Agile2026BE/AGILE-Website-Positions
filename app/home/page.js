import Link from "next/link";
import BrandLogo from "../../components/BrandLogo";
import SiteFooter from "../../components/SiteFooter";
import styles from "./page.module.css";

export const metadata = {
  title: "AGILE Business Consulting | AEC Recruiting & Career Representation",
  description: "Specialized recruiting and career representation for Architects, Engineers, and Construction Professionals across key U.S. markets.",
};

export default function CorporateHomePage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.nav}>
          <Link href="/home" className={styles.brand} aria-label="AGILE home"><BrandLogo className={styles.logo} /></Link>
          <nav aria-label="Main navigation">
            <Link href="/">Careers</Link>
            <Link href="/professionals">Expectations</Link>
            <Link href="/clients">Hiring Support</Link>
            <Link href="/insights">Insights</Link>
            <Link href="/#contact">Contact</Link>
          </nav>
          <Link href="/#positions" className={styles.navCta}>Explore Positions</Link>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.motion} aria-hidden="true">
          <div className={styles.architecture}></div>
          <div className={styles.motionLines}><i></i><i></i><i></i></div>
        </div>
        <div className={styles.heroShade}></div>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>ARCHITECTURE · ENGINEERING · CONSTRUCTION</p>
          <h1>What’s Your <em>Next Move?</em></h1>
          <p className={styles.lead}>Specialized recruiting and career representation connecting accomplished AEC professionals with firms shaping the built environment.</p>
          <div className={styles.heroActions}>
            <Link href="/#positions" className={styles.primary}>Explore Positions</Link>
            <Link href="/clients" className={styles.secondary}>Hiring Support</Link>
          </div>
          <div className={styles.trustRow}><span>✓ Confidential Career Representation</span><span>✓ Direct Hiring Connections</span><span>✓ No Account Setup Required</span></div>
        </div>
      </section>

      <section className={styles.intro}>
        <div className={styles.sectionLabel}>AGILE BUSINESS CONSULTING</div>
        <div className={styles.introGrid}>
          <h2>Specialized recruiting for the built environment.<br/><em>Personal representation for your next move.</em></h2>
          <div>
            <p>AGILE is a specialized recruiting and staffing firm serving the Architecture, Engineering, and Construction (AEC) industry. We help professionals make informed, strategic career decisions by preparing them to connect with firms that value technical expertise, project experience, and long-term career growth.</p>
            <p>We recruit across New York, New Jersey, Pennsylvania, Massachusetts, California, Colorado, and Florida. Our client relationships include ENR Top 100 and Top 500 Design Firms, nationally recognized multidisciplinary consulting firms, notable mid-size and regional consultants, and Best Places to Work award winners.</p>
            <p>Professional discretion is maintained throughout the search process. AGILE provides professional representation, current market intelligence, access to direct hire opportunities, personalized interview preparation, compensation and start-date negotiation, and onboarding assistance through a dedicated point of contact.</p>
          </div>
        </div>
      </section>

      <section className={styles.finalCta}>
        <p className={styles.sectionLabel}>CAREER OPPORTUNITIES</p>
        <h2>Your next opportunity may already be here.</h2>
        <p>Step directly into the AGILE Careers search experience.</p>
        <div className={styles.heroActions}><Link href="/#positions" className={styles.primary}>Explore Positions</Link></div>
      </section>

      <section className={styles.clientSection}>
        <div className={styles.clientCopy}>
          <p className={styles.eyebrow}>FOR AEC FIRMS & PRIVATE OWNERS</p>
          <h2>Hiring support built around your standards.</h2>
          <p>AGILE provides focused recruiting support for firms that need specialized technical talent, responsive communication, and a partner who understands the AEC market.</p>
          <Link href="/clients" className={styles.lightButton}>Explore Hiring Support</Link>
        </div>
        <div className={styles.metrics}>
          <div><strong>Direct</strong><span>Access to hiring leadership and specialized talent</span></div>
          <div><strong>Focused</strong><span>Recruiting aligned with discipline, market, and project needs</span></div>
          <div><strong>Confidential</strong><span>Professional representation throughout the process</span></div>
          <div><strong>AEC</strong><span>Architecture · Engineering · Construction</span></div>
        </div>
      </section>

      <section className={styles.finalCta}>
        <p className={styles.sectionLabel}>LEARN MORE ABOUT AGILE</p>
        <h2>Clear information. Strong opportunities. One connected experience.</h2>
        <div className={styles.heroActions}>
          <Link href="/professionals" className={styles.outlineDark}>Expectations</Link>
          <Link href="/insights" className={styles.outlineDark}>Insights</Link>
          <Link href="/#contact" className={styles.outlineDark}>Contact</Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
