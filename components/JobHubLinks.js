import Link from "next/link";
import styles from "./JobHubLinks.module.css";
import { jobs } from "../data/jobs";
import { HUBS, hubJobs } from "../lib/jobHubs";

// Crawlable links to the city / state / discipline job pages
// (/careers/jobs/<slug>). Server-rendered; used on /careers, on each hub
// page, and (with `only`) on each posting page.
export default function JobHubLinks({ exclude = "", only = null, heading = "Browse Jobs by Location & Discipline" }) {
  const hubs = HUBS.filter((hub) => hub.slug !== exclude && (!only || only.includes(hub.slug)))
    .map((hub) => ({ hub, count: hubJobs(hub, jobs).length }))
    .filter(({ count }) => count > 0);
  if (!hubs.length) return null;

  const sections = [
    { label: "By city", kind: "city" },
    { label: "By state / region", kind: "state" },
    { label: "By discipline", kind: "discipline" },
  ]
    .map((s) => ({ ...s, hubs: hubs.filter(({ hub }) => hub.kind === s.kind) }))
    .filter((s) => s.hubs.length);

  return (
    <nav className={styles.wrap} aria-label={heading}>
      <h2 className={styles.heading}>{heading}</h2>
      <div className={styles.columns}>
        {sections.map((s) => (
          <div key={s.kind}>
            {only ? null : <h3 className={styles.sub}>{s.label}</h3>}
            <ul className={styles.list}>
              {s.hubs.map(({ hub, count }) => (
                <li key={hub.slug}>
                  <Link href={`/careers/jobs/${hub.slug}`}>
                    {hub.short} <span className={styles.count}>({count})</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
