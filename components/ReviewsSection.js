import styles from "./ReviewsSection.module.css";

export default function ReviewsSection() {
  return (
    <section className={`section reviews-section ${styles.section}`} id="reviews">
      <div className={`container ${styles.inner}`}>
        <p className={`contact-eyebrow ${styles.eyebrow}`}>CANDIDATE REVIEWS</p>
        <h2 className="section-title">What professionals say about working with AGILE.</h2>
        <p className={`section-copy ${styles.copy}`}>
          Candidate review content will be restored here only from verified live-site text or an exact recovered blueprint.
        </p>
      </div>
    </section>
  );
}
