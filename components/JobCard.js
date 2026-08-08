"use client";

import { useState } from "react";
import styles from "./JobCard.module.css";
import ShareButton from "./ShareButton";
import ShortlistButton from "./ShortlistButton";
import ViewPositionLink from "./ViewPositionLink";
import { jobBoardConfig } from "../data/jobBoardConfig";
import { shareJob } from "../lib/shareJob";

function displayCredential(value) {
  const text = String(value ?? "").trim();
  if (!text) return "";
  const normalized = text.toLowerCase();
  if (normalized === "not stated" || normalized === "pe mentioned") return "";
  if (normalized === "pe required") return "PE Required";
  if (normalized === "pe preferred") return "PE Appreciated";
  return text;
}

function displayWorkplace(value) {
  const text = String(value ?? "").trim();
  if (!text) return "";
  const normalized = text.toLowerCase();
  if (normalized.includes("hybrid") || /\b[1-4]\s*\/\s*[1-4]\b/.test(normalized) || normalized.includes("50/50")) return "Hybrid";
  if (normalized.includes("remote")) return "Remote";
  if (normalized.includes("onsite") || normalized.includes("on-site") || normalized.includes("on site")) return "On-Site";
  return text;
}

export default function JobCard({ job, isShortlisted = false, onShortlist, onViewPosition }) {
  const labels = jobBoardConfig.cardLabels;
  const [shareStatus, setShareStatus] = useState("");
  const credential = displayCredential(job.credential);
  const workplace = displayWorkplace(job.workplace);

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
            <dd>{workplace}</dd>
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
          {credential ? <span>{credential}</span> : null}
          {job.bonus ? <span>Bonus</span> : null}
        </div>
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
