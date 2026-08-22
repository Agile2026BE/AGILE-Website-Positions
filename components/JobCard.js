"use client";

import { useState } from "react";
import styles from "./JobCard.module.css";
import ShareButton from "./ShareButton";
import ShortlistButton from "./ShortlistButton";
import ViewPositionLink from "./ViewPositionLink";
import { jobBoardConfig } from "../data/jobBoardConfig";
import { shareJob } from "../lib/shareJob";
import { formatExperienceDisplay } from "../lib/jobFilters";

export default function JobCard({ job, isShortlisted = false, onShortlist, onViewPosition }) {
  const labels = jobBoardConfig.cardLabels;
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

      <div className={styles.cardContent}>
        <p>{job.discipline}</p>
        <h3>{job.title}</h3>
        {job.summary ? <p className={styles.summary}>{job.summary}</p> : null}

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
            <dd className={styles.salaryValue}>{job.salaryDisplay}</dd>
          </div>
          <div className={styles.metaRow}>
            <dt>{labels.experience}</dt>
            <dd>{formatExperienceDisplay(job.experience)}</dd>
          </div>
        </dl>

        <div className={styles.tags} aria-label="Position details">
          {job.specialty ? <span>{job.specialty}</span> : null}
          {job.market ? <span>{job.market.split("|")[0].trim()}</span> : null}
          {job.credential && job.credential.trim().toLowerCase() !== "not stated" ? <span>{job.credential}</span> : null}
          {job.bonus ? <span>Bonus</span> : null}
        </div>

        {job.id ? <p className={styles.positionId}>Position ID {job.id}</p> : null}
      </div>

      <div className={`job-card-actions ${styles.actions}`}>
        <ViewPositionLink onClick={() => onViewPosition?.(job)} label={labels.viewPosition} />
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
