import styles from "./AllPositionsIndex.module.css";

// Server-rendered index of every live position.
// JobBoard only renders its first page of cards in the initial HTML, so most
// position pages had no crawlable internal link. This list gives search
// engines (and candidates) a plain link to every live posting.
export default function AllPositionsIndex({ jobs }) {
  const sorted = [...jobs].sort((a, b) => Number(b.id) - Number(a.id));

  return (
    <section className={styles.section} aria-label="All open positions">
      <details className={styles.details}>
        <summary className={styles.summary}>
          Browse all {sorted.length} open positions
        </summary>
        <ul className={styles.list}>
          {sorted.map((job) => (
            <li key={job.id} className={styles.item}>
              <a href={`/careers/positions/${job.slug}`} className={styles.link}>
                {job.title}
              </a>
              {typeof job.location === "string" && job.location ? (
                <span className={styles.meta}> · {job.location}</span>
              ) : null}
              <span className={styles.positionId}> · Position ID {job.id}</span>
            </li>
          ))}
        </ul>
      </details>
    </section>
  );
}
