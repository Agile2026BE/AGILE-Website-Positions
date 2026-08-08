import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={`hero ${styles.hero}`} id="top">
      <div className={`container hero-inner ${styles.inner}`}>
        <p className={`hero-eyebrow ${styles.eyebrow}`}>AGILE CAREERS · SPECIALIZED AEC RECRUITING</p>
        <h1 className={`hero-title ${styles.title}`}>
          What’s your next move?
        </h1>
        <p className={styles.lead}>Search career opportunities built around your experience, priorities, and where you want to go next.</p>
        <p className={`hero-copy ${styles.copy}`}>
          Explore MEP and Building Systems, Civil Infrastructure, Water and Wastewater,
          Transportation, Aviation, Rail and Transit, Commissioning, Mission Critical,
          and Data Center opportunities.
        </p>
        <div className={`hero-actions ${styles.actions}`}>
          <a className={`hero-primary ${styles.primary}`} href="#positions">Search Careers</a>
          <a className={`hero-secondary ${styles.secondary}`} href="#positions">Explore Positions</a>
        </div>
        <div className={`hero-badges ${styles.badges}`} aria-label="Career search details">
          <span>Salary disclosed</span>
          <span>Location disclosed</span>
          <span>Work schedule disclosed</span>
          <span>No account required</span>
        </div>
      </div>
    </section>
  );
}
