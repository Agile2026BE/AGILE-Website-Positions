import styles from "./AllPositionsIndex.module.css";

// Server-rendered index of every live position, grouped by discipline, then
// by state. JobBoard only renders its first page of cards in the initial
// HTML, so most position pages had no crawlable internal link. Every link
// here is in the server HTML (including inside closed <details>).
// Mobile-first: one column of tap-to-open discipline groups on phones,
// two columns on tablets, three on desktop.
// A posting that spans several states (state: "Florida | Pennsylvania")
// is listed under each of those states.

const DISCIPLINE_LABELS = {
  "Mechanical HVAC": "Mechanical / HVAC",
  "Mechanical Plumbing and Fire Protection": "Plumbing & Fire Protection",
  "MEP Project Manager": "MEP Project Management",
  "BIM/VDC": "BIM / VDC",
};

function statesOf(job) {
  const raw = typeof job.state === "string" ? job.state : "";
  const list = raw
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean);
  return list.length ? list : ["Other Locations"];
}

function byState(jobs) {
  const states = new Map();
  for (const job of jobs) {
    for (const state of statesOf(job)) {
      if (!states.has(state)) states.set(state, []);
      states.get(state).push(job);
    }
  }
  return [...states.entries()]
    .map(([state, list]) => ({ state, jobs: list }))
    .sort((a, b) => {
      if (a.state === "Other Locations") return 1;
      if (b.state === "Other Locations") return -1;
      return a.state.localeCompare(b.state);
    });
}

function groupByDiscipline(jobs) {
  const groups = new Map();
  for (const job of jobs) {
    const key = job.discipline || "Other";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(job);
  }
  return [...groups.entries()]
    .map(([key, list]) => {
      const sorted = [...list].sort((a, b) => Number(b.id) - Number(a.id));
      return {
        key,
        label: DISCIPLINE_LABELS[key] || key,
        count: sorted.length,
        states: byState(sorted),
      };
    })
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

export default function AllPositionsIndex({ jobs }) {
  const groups = groupByDiscipline(jobs);

  return (
    <section className={styles.section} aria-label="All open positions by discipline and state">
      <div className="container">
        <details className={styles.outer}>
          <summary className={styles.outerSummary}>
            <span>Browse all {jobs.length} open positions</span>
            <span className={styles.outerHint}>by discipline and state</span>
          </summary>
          <div className={styles.groups}>
            {groups.map((group) => (
              <details key={group.key} className={styles.group}>
                <summary className={styles.groupSummary}>
                  <span className={styles.groupName}>{group.label}</span>
                  <span className={styles.count}>{group.count}</span>
                </summary>
                <div className={styles.body}>
                  {group.states.map((block) => (
                    <div key={block.state} className={styles.stateBlock}>
                      <h3 className={styles.stateName}>
                        {block.state}
                        <span className={styles.stateCount}>{block.jobs.length}</span>
                      </h3>
                      <ul className={styles.list}>
                        {block.jobs.map((job) => (
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
                    </div>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </details>
      </div>
    </section>
  );
}
