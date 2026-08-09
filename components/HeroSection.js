import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={`hero ${styles.hero}`} id="top">
      <div className={`container hero-inner ${styles.inner}`}>
        <p className={`hero-eyebrow ${styles.eyebrow}`}>AGILE CAREERS · SPECIALIZED AEC RECRUITING</p>
        <h1 className={`hero-title ${styles.title}`}>
          <span className={styles.titleLine}>The details professionals need.</span>
          <span className={styles.titleLine}><em>Before</em> they apply.</span>
        </h1>
        <p className={styles.lead}>
          Discover opportunities with the consulting firms and private sector organizations that trust AGILE to identify top talent.
        </p>
        <p className={`hero-copy ${styles.copy}`}>
          MEP and Building Systems · Civil Infrastructure · Water and Wastewater · Transportation · Aviation · Rail and Transit · Commissioning · Mission Critical · Data Centers
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
