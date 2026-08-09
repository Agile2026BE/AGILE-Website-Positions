import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={`hero ${styles.hero}`} id="top">
      <div className={`container hero-inner ${styles.inner}`}>
        <p className={`hero-eyebrow ${styles.eyebrow}`}>AGILE CAREERS · SPECIALIZED AEC RECRUITING</p>
        <h1 className={`hero-title ${styles.title}`}>
          <span className={styles.titleLine}>The details professionals need.</span>
         