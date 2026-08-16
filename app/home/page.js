import fs from "fs";
import path from "path";
import Link from "next/link";
import BrandLogo from "../../components/BrandLogo";
import JobBoard from "../../components/JobBoard";
import { jobs } from "../../data/jobs";
import styles from "./page.module.css";

export const metadata = {
  title: "AGILE Business Consulting | AEC Recruiting & Career Representation",
  description: "Specialized recruiting and career representation for Architecture, Engineering, and Construction professionals and firms.",
};

export default function CorporateHomePage() {
  const approvedVisual = Array.from({ length: 9 }, (_, index) =>
    fs.readFileSync(
      path.join(
        process.cwd(),
        "public",
        "approved-avif",
        `q30-${String(index + 1).padStart(2, "0")}.txt`
      ),
      "utf8"
    ).trim()
  ).join("");

  return (
    <main className={styles.page}>
      <div
        className={styles.approvedVisualLock}
        aria-label="AGILE Business Consulting homepage"
        style={{ backgroundImage: `url(data:image/avif;base64,${approvedVisual})` }}
      />

      <div className={styles.liveSite}>
        <header className={styles.header}>
          <div className={styles.nav}>
            <Link href="/home" className={styles.brand} aria-label="AGILE home"><BrandLogo className={styles.logo} /></Link>
            <nav aria-label="Main navigation">
              <Link href="/">Careers</Link>
              <Link href="/professionals">Professionals</Link>
              <Link href="/clients">Clients</Link>
              <Link href="/insights">Insights</Link>
              <Link href="/#contact">Contact</Link>
            </nav>
            <Link href="/#positions" className={styles.navCta}>Explore Positions</Link>
          </div>
        </header>

        <section className={styles.hero}>
          <div className={styles.heroReference} aria-hidden="true" />
          <div className={styles.heroShade} />
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>ARCHITECTURE · ENGINEERING · CONSTRUCTION</p>
            <h1>What’s Your <span className={styles.nextWord}>Next</span> Move?</h1>
            <p className={styles.lead}>Specialized recruiting and career representation connecting accomplished AEC Professionals with firms shaping the built environment.</p>
            <div className={styles.heroActions}>
              <Link href="/#positions" className={styles.primary}>Explore Career Opportunities</Link>
              <Link href="/clients" className={styles.secondary}>Client Hiring Support</Link>
            </div>
            <div className={styles.trustRow}>
              <span>✓ Confidential Career Representation</span>
              <span>✓ Direct Hiring Connections</span>
              <span>✓ No Account Setup Required</span>
            </div>
          </div>
        </section>

        <JobBoard jobs={jobs} />

        <section className={styles.intro}>
          <p className={styles.sectionLabel}>THE AGILE ADVANTAGE</p>
          <div className={styles.introGrid}>
            <div>
              <h2>Trusted by AEC Firms.<br/>Focused on Your Success.</h2>
              <div className={styles.introCopy}>
                <p>AGILE is a specialized recruiting and career consulting firm representing top talent across Architecture, Engineering, Construction, and related disciplines.</p>
                <p>We work directly with leading firms to connect exceptional professionals with opportunities where they can thrive—and advance what’s next in their careers.</p>
                <Link href="/professionals" className={styles.textLink}>Learn more about AGILE →</Link>
              </div>
            </div>
            <div className={styles.advantageImage} aria-hidden="true" />
          </div>
        </section>

        <section className={styles.pathways} aria-label="Explore AGILE">
          <Link href="/professionals"><small>PROFESSIONALS</small><strong>Expect More.<br/>Achieve More.</strong><p>We represent professionals who expect more from their careers—and help them achieve it. Discover what to expect when working with AGILE.</p><span>Explore Expectations →</span></Link>
          <Link href="/insights"><small>INSIGHTS</small><strong>Stay Informed.<br/>Stay Ahead.</strong><p>Industry trends, market intelligence, and career insights for AEC professionals.</p><span>View Trends & Insights →</span></Link>
          <Link href="/clients"><small>CLIENTS</small><strong>Hiring Support<br/>That Delivers.</strong><p>We partner with firms to identify, engage, and secure the talent that drives results.</p><span>Learn About Our Services →</span></Link>
        </section>

        <section className={styles.darkBand}>
          <div>
            <p className={styles.eyebrow}>CLIENT REVIEWS</p>
            <blockquote>“AGILE delivers top-tier candidates with professionalism, discretion, and a true understanding of our needs.”</blockquote>
            <p className={styles.attribution}>— Director of Engineering, MEP Firm</p>
            <Link href="/#reviews" className={styles.textLinkLight}>Read More Reviews →</Link>
          </div>
          <div className={styles.positionCallout}>
            <p className={styles.eyebrow}>READY FOR WHAT’S NEXT?</p>
            <h2>Explore career opportunities<br/>that align with your goals.</h2>
            <Link href="/#positions" className={styles.primary}>Explore Positions</Link>
          </div>
        </section>

        <footer className={styles.footer}>
          <span>© 2025 AGILE Business Consulting • AEC. All rights reserved.</span>
          <span>Privacy Policy &nbsp; | &nbsp; Terms of Use</span>
        </footer>
      </div>
    </main>
  );
}
