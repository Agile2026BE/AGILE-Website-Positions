import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={`hero ${styles.hero}`} id="top">
      <div className={`container hero-inner ${styles.inner}`}>
        <p className={`hero-eyebrow ${styles.eyebrow}`}>SPECIALIZED AEC RECRUITING</p>
        <h1 className={`hero-title ${styles.title}`}>
          <span className={styles.desktopTitle}>
            Know the details <em>before</em> applying.
          </span>
          <span className={styles.mobileTitle}>
            <span className={styles.titleLine}>Know the details</span>
            <span className={styles.titleLine}><em>before</em> applying.</span>
          </span>
        </h1>
        <p className={styles.lead}>
          Explore opportunities with industry-leading consulting firms shaping Education, Hospitality, Cultural Facilities, Transportation Systems, Aviation Infrastructure, Mission Critical Facilities, and Data Centers.
        </p>
        <div className={`hero-actions ${styles.actions}`}>
          <a className={`hero-primary ${styles.primary}`} href="/#positions">Explore Positions</a>
          <a className={`hero-secondary ${styles.secondary}`} href="/#contact">Start a Conversation</a>
        </div>
        <div className={`hero-badges ${styles.badges}`} aria-label="Career search details">
          <span>✓ Salary disclosed</span>
          <span>✓ Location disclosed</span>
          <span>✓ Work schedule disclosed</span>
          <span>✓ No account required</span>
        </div>
      </div>
    </section>
  );
}
