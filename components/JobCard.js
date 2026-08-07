"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./JobCard.module.css";
import ShareButton from "./ShareButton";
import ShortlistButton from "./ShortlistButton";
import ViewPositionLink from "./ViewPositionLink";
import { jobBoardConfig } from "../data/jobBoardConfig";
import { shareJob } from "../lib/shareJob";

export default function JobCard({ job, isShortlisted = false, onShortlist }) {
  const labels = jobBoardConfig.cardLabels;
  const href = job.slug ? `/positions/${job.slug}` : "#contact";
  const [shareStatus, setShareStatus] = useState("");

  async function handleShare() {
    try {
      const result = await shareJob(job);
      setShareStatus(result.method === "clipboard" ? "Link copied" : "Shared");
    } catch (error) {
      if (error?.name !== "AbortError") {
        setShareStatus("Unable to share");
      }
    }
  }

  return (
    <article className={`card job-card ${styles.card}`}>
      <div className={styles.shortlist}>
        <ShortlistButton
          isShortlisted={isShortlisted}
          onClick={() => onShortlist?.(job)}
        />
      </div>

      <Link
        className={styles.cardLink}
        href={href}
        aria-label={`View ${job.title}`}
      >
        <p>{job.discipline}</p>
        <h3>{job.title}</h3>
        {job.summary ? <p>{job.summary}</p> : null}

        <dl className={styles.meta}>
          <div className={styles.metaRow}>
            <dt>{labels.location}</dt>
            <dd>{job.location}</dd>
          </div>
          <div className={styles.metaRow}>
            <dt>{labels.workplace}</dt>
            <dd>{job.workplace}</dd>
          </div>
          <div className={styles.metaRow}>
            <dt>{labels.salary}</dt>
            <dd>{job.salaryDisplay}</dd>
          </div>
          <div className={styles.metaRow}>
            <dt>{labels.experience}</dt>
            <dd>{job.experience}</dd>
          </div>
        </dl>

        <div className={styles.tags} aria-label="Position details">
          {job.specialty ? <span>{job.specialty}</span> : null}
          {job.market ? <span>{job.market.split("|")[0].trim()}</span> : null}
          {job.credential ? <span>{job.credential}</span> : null}
          {job.bonus ? <span>Bonus</span> : null}
        </div>
      </Link>

      <div className={`job-card-actions ${styles.actions}`}>
        <ViewPositionLink href={href} label={labels.viewPosition} />
        <ShareButton label={labels.share} onClick={handleShare} />
      </div>

      {shareStatus ? (
        <p
          className={`job-share-status ${styles.shareStatus}`}
          role="status"
          aria-live="polite"
        >
          {shareStatus}
        </p>
      ) : null}
    </article>
  );
}
