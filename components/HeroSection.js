import Link from "next/link";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  const trustBadges = [
    "Salary disclosed",
    "Location disclosed",
    "Work schedule disclosed",
    "Virtual Interviews",
    "No Account Setup Required",
  ];

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
          Explore career opportunities in MEP Building Systems Consulting, Commissioning, and Owner&apos;s Representation across Healthcare, Higher Education, Life Sciences, Hospitality, Cultural, High-Rise Commercial and Residential, Mission Critical, Data Centers, Aviation, Transportation, Rail and Transit, Water and Wastewater, and Industrial markets.
        </p>
        <div className={`hero-actions ${styles.actions}`}>
          <Link className={`hero-primary ${styles.primary}`} href="/#positions">Explore Positions</Link>
          <Link className={`hero-secondary ${styles.secondary}`} href="/#contact">Start a Conversation</Link>
        </div>
        <div className={`hero-badges ${styles.badges}`} aria-label="Career search details">
          {trustBadges.map((label,index)=>(
            <span className={styles.badge} style={{"--badge-delay":`${index * 220}ms`}} key={label}>
              <b className={styles.check} aria-hidden="true">✓</b>{label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
