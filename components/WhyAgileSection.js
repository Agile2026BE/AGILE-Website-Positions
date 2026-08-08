import styles from "./WhyAgileSection.module.css";

const steps = [
  { number: "01", title: "Know the essentials", copy: "Review location, workplace, compensation, experience, credentials and project focus upfront." },
  { number: "02", title: "Compare intelligently", copy: "Shortlist up to three opportunities and share clean, direct links by email, text or LinkedIn." },
  { number: "03", title: "Talk before applying", copy: "Begin with a professional conversation. A résumé is welcome, but never required for an initial inquiry." },
];

export default function WhyAgileSection() {
  return (
    <section className={styles.section} id="why-agile" aria-label="Why AGILE">
      <span id="contact-guide" className={styles.contactAnchor} aria-hidden="true" />
      <div className={styles.relationship}>
        <p className={styles.eyebrow}>THE AGILE ADVANTAGE</p>
        <h2>We’re on a first-name basis with our client firms.</h2>
        <p>AGILE works directly with more than 40 consulting and engineering companies in the local markets of our key target geographic marketplaces. Our support includes full representation, interview scheduling and preparation, client feedback and follow-up, offer negotiation, and access to additional opportunities that may never be publicly posted.</p>
        <p className={styles.closer}>Often, the best positions come through established relationships, reputation, and name recognition. We don’t knock on doors—we open them for our candidates.</p>
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
