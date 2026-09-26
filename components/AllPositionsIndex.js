import styles from "./AllPositionsIndex.module.css";

// Server-rendered index of every live position, grouped by discipline.
// JobBoard only renders its first page of cards in the initial HTML, so most
// position pages had no crawlable internal link. Every link here is in the
// server HTML (including inside closed <details>), which search engines read.
// Mobile-first: one column of tap-to-open discipline groups on phones,
// two columns on tablets, three on desktop.

const DISCIPLINE_LABELS = {
  "Mechanical HVAC": "Mechanical / HVAC",
  "Mechanical Plumbing and Fire Protection": "Plumbing & Fire Protection",
  "MEP Project Manager": "MEP Project Management",
  "BIM/VDC": "BIM / VDC",
};

function groupByDiscipline(jobs) {
  const groups = new Map();
  for (const job of jobs) {
    const key = job.discipline || "Other";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(job);
  }
  return [...groups.entries()]
    .map(([key, list]) => ({
      key,
      label: DISCIPLINE_LABELS[key] || key,
      jobs: list.sort((a, b) => Number(b.id) - Number(a.id)),
    }))
    .sort((a, b) => b.jobs.length - a.jobs.length || a.label.localeCompare(b.label));
}

export default function AllPositionsIndex({ jobs }) {
  const groups = groupByDiscipline(jobs);

  return (
    <section className={styles.section} aria-label="All open positions by discipline">
      <div className="container">
        <details className={styles.outer}>
          <summary className={styles.outerSummary}>
            <span>Browse all {jobs.length} open positions</span>
            <span className={styles.outerHint}>by discipline</span>
          </summary>
          <div className={styles.groups}>
            {groups.map((group) => (
              <details key={group.key} className={styles.group}>
                <summary className={styles.groupSummary}>
                  <span className={styles.groupName}>{group.label}</span>
                  <span className={styles.count}>{group.jobs.length}</span>
                </summary>
                <ul className={styles.list}>
                  {group.jobs.map((job) => (
                    <li key={job.id} className={styles.item}>
                      <a className={styles.row} href={`/careers/positions/${job.slug}`}>
                        <span className={styles.title}>{job.title}</span>
                        <span className={styles.meta}>
                          {typeof job.location === "string" && job.location
                            ? `${job.location} · `
                            : ""}
                          Position ID {job.id}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </details>
      </div>
    </section>
  );
}
