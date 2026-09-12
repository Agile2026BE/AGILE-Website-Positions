"use client";

import { useEffect, useState } from "react";
import styles from "./SharePositionsModal.module.css";
import { copyPositionsForEmail, copyPositionsForText } from "../lib/shareJob";
import { formatSalaryDisplay, formatWorkplaceDisplay } from "../lib/jobFilters";

export default function SharePositionsModal({ jobs = [], onClose, onRemove, onInquire }) {
  const [status, setStatus] = useState("");
  useEffect(() => {
    if (!jobs.length) return undefined;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event) => { if (event.key === "Escape") onClose?.(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = originalOverflow; window.removeEventListener("keydown", onKey); };
  }, [jobs.length, onClose]);
  if (!jobs.length) return null;

  const countLabel = `${jobs.length} position${jobs.length === 1 ? "" : "s"}`;

  async function copyForEmail() {
    try {
      await copyPositionsForEmail(jobs);
      setStatus(`${countLabel} copied — paste into Gmail, Yahoo, or Outlook`);
    } catch {
      setStatus("Unable to copy");
    }
  }

  async function copyForText() {
    try {
      await copyPositionsForText(jobs);
      setStatus(`${countLabel} copied — paste into a text message, LinkedIn message, or Juicebox`);
    } catch {
      setStatus("Unable to copy");
    }
  }

  return <div className={styles.overlay} role="presentation" onMouseDown={(event)=>{if(event.target===event.currentTarget)onClose?.();}}><section className={styles.modal} role="dialog" aria-modal="true"><button className={styles.close} type="button" onClick={onClose}>×</button><p className={styles.eyebrow}>CLEAN LINKS. NO ACCOUNT REQUIRED.</p><h2>Share selected positions</h2><p className={styles.intro}>Choose the format that matches where you&apos;re sending this: a polished visual card for email, or a short, link-based summary for texting, LinkedIn, and Juicebox.</p><div className={styles.list}>{jobs.map(job=><div className={styles.job} key={job.id??job.slug}><div><strong>{job.title}</strong><span>{job.location} · {formatWorkplaceDisplay(job.workplace)} · <span className={styles.salaryValue}>{formatSalaryDisplay(job.salaryDisplay)}</span> · Position ID {job.id}</span></div><button type="button" onClick={()=>onRemove?.(job)}>Remove</button></div>)}</div><div className={styles.actions}><button type="button" className={styles.primary} onClick={copyForEmail}>Copy for Email</button><button type="button" className={styles.primary} onClick={copyForText}>Copy for Text / LinkedIn / Juicebox</button><button type="button" onClick={()=>onInquire?.(jobs[0])}>Inquire About These</button></div>{status?<p className={styles.status}>{status}</p>:null}</section></div>;
}
