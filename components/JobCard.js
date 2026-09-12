"use client";

import { useState } from "react";
import styles from "./JobCard.module.css";
import ShareButton from "./ShareButton";
import ShortlistButton from "./ShortlistButton";
import ViewPositionLink from "./ViewPositionLink";
import { jobBoardConfig } from "../data/jobBoardConfig";
import { shareJob, copyPositionForText } from "../lib/shareJob";
import { formatExperienceDisplay, formatSalaryDisplay, formatWorkplaceDisplay } from "../lib/jobFilters";

export default function JobCard({ job, isShortlisted = false, onShortlist, onViewPosition }) {
const labels = jobBoardConfig.cardLabels;
const [shareStatus, setShareStatus] = useState("");

async function handleShare() {
try {
const result = await shareJob(job);
setShareStatus(result.method === "rich-clipboard" ? "Copied" : "Link copied");
} catch (error) {
if (error?.name !== "AbortError") {
setShareStatus("Unable to share");
}
}
}

// Dedicated always-plain-text copy, for texting. "Copy Link" above writes
// both text/html and text/plain to the clipboard so it works well for
// email, but real-world testing found iOS/Mac Messages will render the
// rich HTML representation (bold headers, colored/underlined lines)
// instead of falling back to the plain version, which looks cluttered
// in a text thread. This button always writes plain text only, so
// texting has its own reliably-clean one-tap action.
async function handleShareText() {
try {
await copyPositionForText(job);
setShareStatus("Copied for text");
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
{job.salaryDisplay ? <p className={styles.cardSalaryRow}><span className={styles.salaryValue}>{formatSalaryDisplay(job.salaryDisplay)}</span></p> : null}
{job.summary ? <p className={styles.summary}>{job.summary}</p> : null}

<dl className={styles.meta}>
<div className={styles.metaRow}>
<dt>{labels.location}</dt>
<dd>{job.location}</dd>
</div>
<div className={styles.metaRow}>
<dt>{labels.workplace}</dt>
<dd>{formatWorkplaceDisplay(job.workplace)}</dd>
</div>
<div className={styles.metaRow}>
<dt>{labels.experience}</dt>
<dd>{formatExperienceDisplay(job.experience)}</dd>
</div>
{job.id ? <div className={styles.metaRow}>
<dt>Position ID</dt>
<dd>{job.id}</dd>
</div> : null}
</dl>

<div className={styles.tags} aria-label="Position details">
{job.specialty ? <span>{job.specialty}</span> : null}
{job.market ? <span>{job.market.split("|")[0].trim()}{job.market.split("|").length > 1 ? ` +${job.market.split("|").length - 1}` : ""}</span> : null}
{job.credential && job.credential.trim().toLowerCase() !== "not stated" ? <span>{job.credential}</span> : null}
{job.bonus ? <span>Bonus</span> : null}
{job.openings > 1 ? <span className={styles.openingsBadge}>{job.openings} Openings</span> : null}
</div>
</div>

<div className={`job-card-actions ${styles.actions}`}>
<ViewPositionLink href={`/careers/positions/${job.slug}`} onClick={() => onViewPosition?.(job)} label={labels.viewPosition} />
<ShareButton label={labels.share} onClick={handleShare} />
<ShareButton label={labels.shareText} onClick={handleShareText} />
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
