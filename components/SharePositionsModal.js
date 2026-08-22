"use client";

import { useEffect, useState } from "react";
import styles from "./SharePositionsModal.module.css";
import { positionShareHtml, positionShareText } from "../lib/shareJob";

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

  async function copySelected() {
    const text = jobs.map(positionShareText).join("\n\n");
    const html = jobs.map(positionShareHtml).join("<br>");
    try {
      if (navigator.clipboard?.write && typeof ClipboardItem !== "undefined") {
        await navigator.clipboard.write([new ClipboardItem({
          "text/plain": new Blob([text], { type: "text/plain" }),
          "text/html": new Blob([html], { type: "text/html" }),
        })]);
      } else {
        await navigator.clipboard.writeText(text);
      }
      setStatus(`${jobs.length} position${jobs.length===1?"":"s"} copied`);
    } catch {
      try { await navigator.clipboard.writeText(text); setStatus(`${jobs.length} position${jobs.length===1?"":"s"} copied`); }
      catch { setStatus("Unable to copy"); }
    }
  }

  return <div className={styles.overlay} role="presentation" onMouseDown={(event)=>{if(event.target===event.currentTarget)onClose?.();}}><section className={styles.modal} role="dialog" aria-modal="true"><button className={styles.close} type="button" onClick={onClose}>×</button><p className={styles.eyebrow}>CLEAN LINKS. NO ACCOUNT REQUIRED.</p><h2>Share selected positions</h2><p className={styles.intro}>Copy a clean, ready-to-send summary of your selected opportunities. Rich-text apps show a simple View Position link; plain-text apps use the direct AGILE Careers position address.</p><div className={styles.list}>{jobs.map(job=><div className={styles.job} key={job.id??job.slug}><div><strong>{job.title}</strong><span>{job.location} · {job.workplace} · <span className={styles.salaryValue}>{job.salaryDisplay}</span> · Position ID {job.id}</span></div><button type="button" onClick={()=>onRemove?.(job)}>Remove</button></div>)}</div><div className={styles.actions}><button type="button" className={styles.primary} onClick={copySelected}>Copy Selected Positions</button><button type="button" onClick={()=>onInquire?.(jobs[0])}>Inquire About These</button></div>{status?<p className={styles.status}>{status}</p>:null}</section></div>;
}
