"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./PositionModal.module.css";
import ShareButton from "./ShareButton";
import ShortlistButton from "./ShortlistButton";
import { shareJob } from "../lib/shareJob";

const lines = (value) => String(value ?? "").split(/\r?\n/).map((line) => line.replace(/^\s*[•*-]\s*/, "").trim()).filter(Boolean);

function similarityScore(candidate, active) {
  let score = 0;
  if (candidate.discipline && candidate.discipline === active.discipline) score += 5;
  if (candidate.state && candidate.state === active.state) score += 3;
  if (candidate.workplace && candidate.workplace === active.workplace) score += 1;
  const activeMarkets = String(active.market || "").toLowerCase().split("|").map(v=>v.trim()).filter(Boolean);
  const candidateMarkets = String(candidate.market || "").toLowerCase();
  if (activeMarkets.some(market => candidateMarkets.includes(market))) score += 2;
  return score;
}

export default function PositionModal({ job, jobs = [], onClose, onSelectJob, isShortlisted = false, onShortlist }) {
  const paneRef = useRef(null);
  const [shareStatus, setShareStatus] = useState("");
  const similarJobs = useMemo(() => {
    if (!job) return [];
    const key = job.id ?? job.slug;
    return jobs.filter(candidate => (candidate.id ?? candidate.slug) !== key).map(candidate => ({ candidate, score: similarityScore(candidate, job) })).sort((a,b) => b.score - a.score).slice(0,3).map(item => item.candidate);
  }, [job, jobs]);

  useEffect(() => {
    if (!job) return undefined;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function handleKeyDown(event) { if (event.key === "Escape") onClose?.(); }
    window.addEventListener("keydown", handleKeyDown);
    return () => { document.body.style.overflow = originalOverflow; window.removeEventListener("keydown", handleKeyDown); };
  }, [job, onClose]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setShareStatus("");
      if (paneRef.current) paneRef.current.scrollTop = 0;
    });
    return () => cancelAnimationFrame(frame);
  }, [job]);
  if (!job) return null;

  const responsibilities = lines(job.responsibilities);
  const qualifications = lines(job.qualifications);
  const whyConsider = lines(job.whyConsider);

  async function handleShare() {
    try { const result = await shareJob(job); setShareStatus(result.method === "clipboard" ? "Link copied" : "Shared"); }
    catch (error) { if (error?.name !== "AbortError") setShareStatus("Unable to share"); }
  }

  function selectSimilar(similarJob) { onSelectJob?.(similarJob); requestAnimationFrame(() => { if (paneRef.current) paneRef.current.scrollTop = 0; }); }

  function handleInterested(event) {
    event.preventDefault();
    const params = new URLSearchParams({ positionId: String(job.id ?? ""), positionTitle: job.title ?? "", discipline: job.discipline ?? "" });
    onClose?.();
    window.location.href = `/?${params.toString()}#contact`;
  }

  return (
    <div className={styles.overlay} role="presentation" onMouseDown={(event)=>{ if(event.target===event.currentTarget) onClose?.(); }}>
      <section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby={`position-modal-${job.id ?? job.slug}`}>
        <button className={styles.close} type="button" onClick={onClose} aria-label="Close position details">×</button>
        <div className={styles.pane} ref={paneRef}>
          <p className={styles.discipline}>{job.discipline}</p>
          <div className={styles.titleRow}>
            <h2 id={`position-modal-${job.id ?? job.slug}`}>{job.title}</h2>
            <ShortlistButton isShortlisted={isShortlisted} onClick={()=>onShortlist?.(job)} />
          </div>
          <div className={styles.pills}>
            {job.location ? <span>{job.location}</span> : null}{job.workplace ? <span>{job.workplace}</span> : null}{job.salaryDisplay ? <span>{job.salaryDisplay}</span> : null}{job.experience ? <span>{job.experience}</span> : null}<span>Position ID {job.id}</span>
          </div>
          {job.specialty ? <div className={styles.specialty}>SPECIALTY: {job.specialty}</div> : null}
          {job.summary ? <p className={styles.summary}>{job.summary}</p> : null}
          {responsibilities.length ? <section className={styles.sectionBlock}><h3>Key Responsibilities</h3><ul>{responsibilities.map((item,index)=><li key={`${item}-${index}`}>{item}</li>)}</ul></section> : null}
          {qualifications.length ? <section className={styles.sectionBlock}><h3>Key Qualifications</h3><ul>{qualifications.map((item,index)=><li key={`${item}-${index}`}>{item}</li>)}</ul></section> : null}
          {whyConsider.length ? <section className={styles.sectionBlock}><h3>Why Consider?</h3>{whyConsider.map((paragraph,index)=><p key={`${paragraph}-${index}`}>{paragraph}</p>)}</section> : null}
          {similarJobs.length ? <section className={`${styles.sectionBlock} ${styles.similarBlock}`}><h3>Similar Positions</h3><div className={styles.similarList}>{similarJobs.map(similar => <button key={similar.id ?? similar.slug} type="button" onClick={()=>selectSimilar(similar)}><strong>{similar.title}</strong><span>{similar.location} · {similar.salaryDisplay}</span></button>)}</div></section> : null}
          <div className={styles.actions}><a className={styles.interested} href="#contact" onClick={handleInterested}>I’m Interested</a><ShareButton label="Share Position" onClick={handleShare} /></div>
          {shareStatus ? <p className={styles.shareStatus} role="status" aria-live="polite">{shareStatus}</p> : null}
        </div>
      </section>
    </div>
  );
}
