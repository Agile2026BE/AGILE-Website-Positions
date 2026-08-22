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
            <a href="/careers" className={styles.primary}>Explore Opportunities</a>
            <a href="/careers/#contact" className={styles.secondary}>Start a Conversation</a>
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

      <SiteFooter />
    </main>
  );
}
