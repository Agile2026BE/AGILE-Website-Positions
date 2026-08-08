import styles from "./ReviewsSection.module.css";

const reviews = [
  {
    quote:
      "I applied once with AGILE and they expertly guided the complete process from start to finish with multiple MEP firm openings. I now have the position I always wanted, and a great recruiting contact.",
    attribution: "C.N. · Senior Engineer, MEP",
  },
  {
    quote:
      "I wasn’t actively looking, but AGILE took the time to understand what I wanted in my next role and went searching for it. I actually just started this month.",
    attribution: "M.S. · Commissioning Professional, CxA",
  },
  {
    quote:
      "AGILE helped me secure a better offer while keeping the focus on enthusiasm for the role, not just compensation.",
    attribution: "T.W. · Project Manager, MEP",
  },
];

export default function ReviewsSection() {
  return (
    <section className={`section reviews-section ${styles.section}`} id="reviews">
      <div className={`container ${styles.panel}`}>
        <p className={styles.badge}>✓ Matched to your search</p>

        <div className={styles.headingRow}>
          <h2 className={styles.heading}>What MEP and AEC professionals<br />say about AGILE.</h2>
          <p className={styles.copy}>
            Relevant candidate experiences appear alongside the positions you are considering.
          </p>
        </div>

        <div className={styles.grid}>
          {reviews.map((review) => (
            <blockquote className={styles.review} key={review.attribution}>
              <p>“{review.quote}”</p>
              <footer>{review.attribution}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
