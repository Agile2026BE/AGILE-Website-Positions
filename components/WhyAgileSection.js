import styles from "./WhyAgileSection.module.css";

const steps = [
  { number: "01", title: "Your career path is discussed clearly", copy: "We learn what matters most to you and which direction you want your career to follow." },
  { number: "02", title: "We know our clients on a first name basis", copy: "We have established relationships directly with current hiring leadership." },
  { number: "03", title: "Extensive market intelligence and client insight", copy: "We properly present your experience to generate interview interest on your behalf." },
];

export default function WhyAgileSection() {
  return (
    <section className={styles.section} id="agile-insights" aria-label="AGILE Insights">
      <span id="why-agile" className={styles.legacyAnchor} aria-hidden="true" />
      <span id="contact-guide" className={styles.contactAnchor} aria-hidden="true" />

      <div className={styles.motionStage}>
        <video className={styles.cityVideo} autoPlay muted loop playsInline preload="metadata" aria-hidden="true">
          <source src="https://assets.mixkit.co/videos/4169/4169-720.mp4" type="video/mp4" />
        </video>
        <div className={styles.videoOverlay} aria-hidden="true" />
        <div className={styles.centerGlow} aria-hidden="true" />
        <div className={styles.motionCopy}>
          <p className={styles.eyebrow}>AGILE INSIGHTS</p>
          <h2>We only work with the best. <span className={styles.question}>Shouldn&apos;t you?</span></h2>
        </div>
      </div>

      <div className={styles.storyText}>
        <p className={styles.challenge}>Your career has created real professional value.</p>
        <p className={styles.recommendLine}>Your introduction should reflect it.</p>
        <h3 className={styles.firstImpression}>Make your first impression <span className={styles.really}>really</span> count.</h3>
        <p className={styles.supporting}>Let our established connections and reputation be your advantage.</p>
      </div>

      <div className={styles.grid}>
        {steps.map((step) => <article className={styles.step} key={step.number}><div className={styles.stepHeading}><span className={styles.number}>{step.number}</span><h3>{step.title}</h3></div><p>{step.copy}</p></article>)}
      </div>
    </section>
  );
}
