import styles from "./WhyAgileSection.module.css";

const steps = [
  { number: "01", title: "You built the experience", copy: "We learn what you have done, where you want to go, and what matters before your name ever reaches a client." },
  { number: "02", title: "We recommend you", copy: "We do not just refer your résumé. AGILE recommends you directly to the hiring leadership we know on a first name basis." },
  { number: "03", title: "You move with an advocate", copy: "Interview preparation, feedback, offer strategy, negotiation and follow through stay coordinated through one relationship." },
];

export default function WhyAgileSection() {
  return (
    <section className={styles.section} id="why-agile" aria-label="Why AGILE">
      <span id="contact-guide" className={styles.contactAnchor} aria-hidden="true" />

      <div className={styles.motionStage}>
        <video
          className={styles.cityVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source src="https://assets.mixkit.co/videos/4169/4169-720.mp4" type="video/mp4" />
        </video>
        <div className={styles.videoOverlay} aria-hidden="true" />
        <div className={styles.centerGlow} aria-hidden="true" />

        <div className={styles.motionCopy}>
          <p className={styles.eyebrow}>THE AGILE ADVANTAGE</p>
          <h2>We only work with the best. <span className={styles.question}>Shouldn&apos;t you?</span></h2>
          <p className={styles.challenge}>You&apos;ve worked hard to build your career. Why leave your representation to chance?</p>
          <p className={styles.recommendLine}>We don&apos;t just share your résumé. We <span className={styles.recommendWord}>recommend</span> you to our clients.</p>
          <p className={styles.supporting}>We know their hiring leadership on a first name basis.</p>
        </div>
      </div>

      <div className={styles.bridge}>
        <p className={styles.bridgeLead}>Representation changes the conversation.</p>
        <h3>Your résumé shows what you have done. AGILE helps clients understand why you should be the person they meet.</h3>
      </div>

      <div className={styles.grid}>
        {steps.map((step) => (
          <article className={styles.step} key={step.number}>
            <span className={styles.number}>{step.number}</span>
            <h3>{step.title}</h3>
            <p>{step.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
