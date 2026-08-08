import styles from "./WhyAgileSection.module.css";

const steps = [
  { number: "01", title: "Know the essentials", copy: "Review location, workplace, compensation, experience, credentials and project focus upfront." },
  { number: "02", title: "Save and share", copy: "Save up to three opportunities for later and copy a clean direct link to send by email, text or LinkedIn." },
  { number: "03", title: "Talk before applying", copy: "Begin with a professional conversation. A résumé is welcome, but never required for an initial inquiry." },
];

export default function WhyAgileSection() {
  return (
    <section className={styles.section} id="why-agile" aria-label="Why AGILE">
      <span id="contact-guide" className={styles.contactAnchor} aria-hidden="true" />
      <div className={styles.relationship}>
        <p className={styles.eyebrow}>THE AGILE ADVANTAGE</p>
        <h2>We’re on a first-name basis with our client firms.</h2>
        <p>AGILE works directly with more than 40 consulting and engineering companies in the local markets of our key target geographic marketplaces. We know all of our clients personally. Our support includes full representation, interview scheduling and preparation, client feedback and follow-up, offer negotiation, and access to additional opportunities that may never be publicly posted.</p>
        <p className={styles.closer}>Often, the best positions come through established relationships, reputation, and name recognition. We don’t knock on doors—we open them for our candidates.</p>
        <h3>Why not just apply on your own?</h3>
        <p>Sure, you can. You can also get lost in the HR process after being told, “We’ll get back to you,” while your résumé is being evaluated for weeks and you have little reason to keep calling.</p>
        <p>AGILE stays in regular contact with our clients about hiring needs, market activity, and the professionals we represent. That gives us natural opportunities to bring your name and qualifications back into the conversation as relevant needs develop—not just once when a résumé arrives.</p>
        <p className={styles.closer}>You can certainly promote your own experience and accomplishments. When AGILE talks about you, we can turn that solo into a symphony.</p>
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
