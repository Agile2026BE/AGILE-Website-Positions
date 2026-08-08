import styles from "./WhyAgileSection.module.css";

const steps = [
  { number: "01", title: "You built the experience", copy: "We learn what you have done, where you want to go, and what matters before your name ever reaches a client." },
  { number: "02", title: "We build the introduction", copy: "AGILE presents your background directly to hiring leaders we know and keeps your experience in the conversation as needs develop." },
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
          <p className={styles.supporting}>In a crowded market, strong experience can still disappear into the noise. AGILE works directly with more than 40 consulting and engineering firms and helps make sure the right hiring leaders know who you are.</p>
          <p className={styles.doorLine}>We do not knock on doors. We open them for our candidates.</p>
        </div>
      </div>

      <div className={styles.bridge}>
        <p className={styles.bridgeLead}>You can promote your own accomplishments.</p>
        <h3>When AGILE speaks about you, we can turn that solo into a symphony.</h3>
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
