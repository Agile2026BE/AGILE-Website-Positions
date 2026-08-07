"use client";

import Link from "next/link";
import { useState } from "react";
import ShareButton from "./ShareButton";
import ShortlistButton from "./ShortlistButton";
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
    <article className="card job-card">
      <p>{job.discipline}</p>
      <h3>{job.title}</h3>
      {job.summary ? <p>{job.summary}</p> : null}

      <dl>
        <div>
          <dt>{labels.location}</dt>
          <dd>{job.location}</dd>
        </div>
        <div>
          <dt>{labels.workplace}</dt>
          <dd>{job.workplace}</dd>
        </div>
        <div>
          <dt>{labels.salary}</dt>
          <dd>{job.salaryDisplay}</dd>
        </div>
        <div>
          <dt>{labels.experience}</dt>
          <dd>{job.experience}</dd>
        </div>
      </dl>

      <div className="job-card-actions">
        <ShortlistButton
          isShortlisted={isShortlisted}
          onClick={() => onShortlist?.(job)}
        />
        <Link href={href}>{labels.viewPosition}</Link>
        <ShareButton label={labels.share} onClick={handleShare} />
      </div>

      {shareStatus ? (
        <p className="job-share-status" role="status" aria-live="polite">
          {shareStatus}
        </p>
      ) : null}
    </article>
  );
}
