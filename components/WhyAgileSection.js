import styles from "./WhyAgileSection.module.css";

const steps = [
  { number: "01", title: "Know the essentials", copy: "Review location, workplace, compensation, experience, credentials and project focus upfront." },
  { number: "02", title: "Save and share", copy: "Save up to three opportunities and copy a direct link to send by email, text or LinkedIn." },
  { number: "03", title: "Talk before applying", copy: "Start with a confidential conversation. A résumé is welcome, but never required for an initial inquiry." },
];

export default function WhyAgileSection() {
  return (
    <section className={styles.section} id="why-agile" aria-label="Why AGILE">
      <span id="contact-guide" className={styles.contactAnchor} aria-hidden="true" />
      <div className={styles.relationship}>
        <p className={styles.eyebrow}>THE AGILE ADVANTAGE</p>
        <h2>We know our clients personally, and they know AGILE.</h2>
        <p>AGILE works directly with more than 40 consulting and engineering firms across our key local markets. Our candidates receive full representation, interview scheduling and preparation, client feedback and follow up, offer negotiation, and access to additional opportunities that may never be publicly posted.</p>
        <p className={styles.closer}>Often, the best positions come through established relationships, reputation and name recognition. We do not knock on doors. We open them for our candidates.</p>
        <h3>Why not just apply on your own?</h3>
        <p>You certainly can. The difference is what happens after your résumé arrives. AGILE stays in regular contact with the hiring managers we know, which gives us natural opportunities to bring your name and qualifications back into the conversation as needs develop.</p>
        <p className={styles.closer}>You can promote your own accomplishments. When AGILE speaks about you, we can turn that solo into a symphony.</p>
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
