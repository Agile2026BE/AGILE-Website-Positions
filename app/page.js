import SiteFooter from "../components/SiteFooter";
import HomeActionBadges from "../components/home/HomeActionBadges";
import HomeAccessMenu from "../components/home/HomeAccessMenu";
import HomeResourcesAccordion from "../components/home/HomeResourcesAccordion";
import styles from "./page.module.css";

export const metadata = {
  title: "AGILE Business Consulting | AEC Recruiting & Career Representation",
  description: "Specialized recruiting and career representation for Architects, Engineers, and Construction Professionals across key U.S. markets.",
};

export default function CorporateHomePage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.motion} aria-hidden="true">
          <div className={styles.architecture}></div>
        </div>
        <div className={styles.heroShade}></div>
        <div className={styles.miniHeader}>
          <span className={styles.miniLogo}>AGILE</span>
          <HomeAccessMenu />
        </div>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>AEC RECRUITING AND CONSULTING</p>
          <h1>What’s Your<br />Next <em>Move?</em></h1>
          <p className={styles.lead}>Specialized recruiting and professional representation connecting architects, engineers, and construction professionals with firms shaping the built environment.</p>
          <div className={styles.actionGrid}>
            <a href="/careers/#positions" className={styles.primary}>Explore Opportunities</a>
            <a href="#contact" className={styles.secondary}>Start a Conversation</a>
            <HomeActionBadges />
          </div>
        </div>
        <HomeResourcesAccordion variant="desktop" />

        <div className={styles.mobilePhotoWrap} aria-hidden="false">
          <div className={styles.mobilePhoto}>
            <div className={styles.mobilePhotoFade}></div>
          </div>
          <HomeResourcesAccordion variant="mobile" />
        </div>
      </section>

      <section className={styles.intro} id="professionals">
        <div className={styles.sectionLabel}>THE AGILE ADVANTAGE</div>
        <div className={styles.introGrid}>
          <h2>Your experience has created value.<br/><em>Your next move should reflect it.</em></h2>
          <div><p>AGILE works directly with hiring leadership across Architecture, Engineering, Construction, Commissioning, and Owner’s Representation. We help experienced Professionals understand the opportunity before making a move.</p><a href="/careers" className={styles.textLink}>Search current positions →</a></div>
        </div>
      </section>

      <section className={styles.disciplines}>
        <article><span>01</span><h3>Architecture</h3><p>Design leadership, project delivery, interiors, planning, and technical architecture.</p></article>
        <article><span>02</span><h3>Engineering</h3><p>Mechanical, Electrical, Plumbing, Fire Protection, Civil, Transportation, and Infrastructure.</p></article>
        <article><span>03</span><h3>Construction</h3><p>Project management, construction leadership, commissioning, and owner-side representation.</p></article>
      </section>

      <section className={styles.markets} id="insights">
        <div><p className={styles.eyebrowDark}>BUILT ENVIRONMENT · REAL OPPORTUNITY</p><h2>Where design, infrastructure, and careers are moving.</h2></div>
        <div className={styles.marketGrid}><span>New York</span><span>New Jersey</span><span>Pennsylvania</span><span>Massachusetts</span><span>Connecticut</span><span>North Carolina</span><span>Florida</span><span>Colorado</span><span>California</span></div>
      </section>

      <section className={styles.clientSection} id="clients">
        <div className={styles.clientCopy}><p className={styles.eyebrow}>FOR AEC FIRMS & PRIVATE OWNERS</p><h2>Specialized talent.<br/>Stronger project teams.</h2><p>When the right hire matters, access matters. AGILE provides focused recruiting support built around your discipline, market, project demands, and hiring priorities.</p><a href="#client-hiring-support" className={styles.lightButton}>Start a Hiring Conversation</a></div>
        <div className={styles.metrics}><div><strong>9</strong><span>Key U.S. Markets</span></div><div><strong>AEC</strong><span>Specialized Recruiting</span></div><div><strong>Direct</strong><span>Hiring Leadership Access</span></div><div><strong>Focused</strong><span>Professional Representation</span></div></div>
      </section>

      <section className={styles.finalCta} id="contact"><p className={styles.sectionLabel}>YOUR NEXT MOVE</p><h2>Ready when you are.</h2><p>Explore current opportunities or start a confidential conversation with AGILE.</p><div className={styles.heroActions}><a href="/careers/#positions" className={styles.primary}>Search Careers</a><a href="mailto:careers@agileconsultingsolutions.com" className={styles.outlineDark}>Start a Conversation</a></div></section>
      <SiteFooter />
    </main>
  );
}
