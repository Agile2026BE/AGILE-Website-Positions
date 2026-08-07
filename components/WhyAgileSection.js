import styles from "./WhyAgileSection.module.css";

const steps = [
  {
    number: "01",
    title: "Know the essentials",
    copy: "Review location, workplace, compensation, experience, credentials and project focus upfront.",
  },
  {
    number: "02",
    title: "Compare intelligently",
    copy: "Shortlist up to three opportunities and share clean, direct links by email, text or LinkedIn.",
  },
  {
    number: "03",
    title: "Talk before applying",
    copy: "Begin with a professional conversation. A résumé is welcome, but never required for an initial inquiry.",
  },
];

export default function WhyAgileSection() {
  return (
    <section className={styles.section} id="why-agile" aria-label="Why AGILE">
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
