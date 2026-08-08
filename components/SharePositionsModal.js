"use client";

import { useEffect, useState } from "react";
import styles from "./SharePositionsModal.module.css";

function positionUrl(job) {
  return job?.slug ? `${window.location.origin}/positions/${job.slug}` : `${window.location.origin}/#positions`;
}

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

  async function copyForEmail() {
    const text = jobs.map(job => `${job.title}\n${job.location} · ${job.workplace}\n${job.salaryDisplay} · ID ${job.id}\n\nView Position: ${positionUrl(job)}`).join("\n\n");
    try { await navigator.clipboard.writeText(text); setStatus("Copied for email"); }
    catch { setStatus("Unable to copy"); }
  }

  return <div className={styles.overlay} role="presentation" onMouseDown={(event)=>{if(event.target===event.currentTarget)onClose?.();}}><section className={styles.modal} role="dialog" aria-modal="true"><button className={styles.close} type="button" onClick={onClose}>×</button><p className={styles.eyebrow}>CLEAN LINKS. NO ACCOUNT REQUIRED.</p><h2>Share selected positions</h2><p className={styles.intro}>Choose up to three opportunities. The copied email format preserves a clean Position Details link for each one.</p><div className={styles.list}>{jobs.map(job=><div className={styles.job} key={job.id??job.slug}><div><strong>{job.title}</strong><span>{job.location} · {job.workplace} · {job.salaryDisplay} · Position ID {job.id}</span></div><button type="button" onClick={()=>onRemove?.(job)}>Remove</button></div>)}</div><div className={styles.actions}><button type="button" className={styles.primary} onClick={copyForEmail}>Copy for Email</button><button type="button" onClick={()=>onInquire?.(jobs[0])}>Inquire About These</button></div>{status?<p className={styles.status}>{status}</p>:null}</section></div>;
}
