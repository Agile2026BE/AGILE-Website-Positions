"use client";

import { useState } from "react";
import styles from "./FeaturedPositionsButton.module.css";
import { featuredPositionIds } from "../data/featuredPositionIds";
import { formatSalaryDisplay } from "../lib/jobFilters";

export default function FeaturedPositionsButton({ jobs = [] }) {
  const [open, setOpen] = useState(false);
  const featured = featuredPositionIds.map((id) => jobs.find((job) => job.id === id)).filter(Boolean);

if (!featured.length) return null;

return (
  <div className={styles.wrap}>
<button type="button" className={styles.trigger} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
<span>Featured Positions</span>
<span className={styles.chevron} aria-hidden="true">{open ? "\u25B2" : "\u25BC"}</span>
  </button>
{open ? (
  <div className={styles.panel}>
{featured.map((job) => (
  <a key={job.id} href={`/careers/positions/${job.slug}`} className={styles.item}>
<span className={styles.itemTitle}>{job.title}</span>
<span className={styles.itemMeta}>
<span>{job.location}</span>
<span className={styles.salaryValue}>{formatSalaryDisplay(job.salaryDisplay)}</span>
  </span>
  </a>
))}
  </div>
) : null}
  </div>
);
}
