"use client";

import { useState } from "react";
import styles from "../../app/page.module.css";

const CANDIDATE_EXPECTATIONS = [
  "Careful review of experience and project portfolios to align your expertise with the right opportunities.",
  "Priority consideration for relevant client openings through focused, strategic representation.",
  "Interview preparation, coordination, and scheduling handled personally on your behalf.",
  "Direct communication and feedback throughout the interview process led by experienced professionals.",
  "Compensation guidance and ongoing career support to help secure the right long term role.",
];

const RESUME_REVIEW_PARAGRAPHS = [
  "Interested in having your resume professionally evaluated by an experienced recruiting executive?",
  "Our advisors will give your resume the in depth review necessary to effectively highlight your experience, educational achievements, skill sets, and professional accomplishments needed to gain interview interest.",
  "Contact our office and request a confidential review and career consultation to discover your true value in your competitive career markets.",
];

const CLIENT_EXPECTATIONS = [
  "Advanced sourcing and in depth market research to attract the best active and passive candidates.",
  "Streamlined recruitment through personal interviews, skill verification, and reference checks.",
  "Delivery of candidates aligned with your firm's business goals and company culture.",
  "Ongoing candidate engagement, timely feedback, and a hiring experience built around your firm's priorities.",
  "Competitive offer strategy and negotiation support to secure the top talent.",
];

export default function HomeAccessMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openRow, setOpenRow] = useState(null);
  const [openSub, setOpenSub] = useState(null);

  function toggleRow(row) {
    setOpenSub(null);
    setOpenRow((current) => (current === row ? null : row));
  }

  function toggleSub(sub) {
    setOpenSub((current) => (current === sub ? null : sub));
  }

  function closeAll() {
    setMenuOpen(false);
    setOpenRow(null);
    setOpenSub(null);
  }

  return (
    <div className={styles.accessWrap}>
      <button
        type="button"
        className={styles.menuIcon}
        aria-expanded={menuOpen}
        aria-label="Open menu"
        onClick={() => {
          setMenuOpen((v) => !v);
          setOpenRow(null);
          setOpenSub(null);
        }}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`${styles.accessPanel} ${menuOpen ? styles.accessPanelOpen : ""}`}>
        <div className={styles.accessPanelHead}>Access</div>

        <a href="/#professionals" className={styles.accessRowLink} onClick={closeAll}>
          About Us
        </a>

        <div className={`${styles.accessRow} ${openRow === "candidate" ? styles.accessRowExpanded : ""}`}>
          <div className={styles.accessRowHead} onClick={() => toggleRow("candidate")}>
            Candidate Support <span className={styles.accessRowChev}></span>
          </div>
          <div className={styles.accessRowBody}>
            <div className={`${styles.accessSubRow} ${openSub === "candidate-expectations" ? styles.accessSubRowExpanded : ""}`}>
              <div className={styles.accessSubRowHead} onClick={() => toggleSub("candidate-expectations")}>
                Candidate Expectations
              </div>
              <div className={styles.accessSubRowBody}>
                <ul className={styles.accessList}>
                  {CANDIDATE_EXPECTATIONS.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className={`${styles.accessSubRow} ${openSub === "resume-review" ? styles.accessSubRowExpanded : ""}`}>
              <div className={styles.accessSubRowHead} onClick={() => toggleSub("resume-review")}>
                Resume Performance Review
              </div>
              <div className={styles.accessSubRowBody}>
                <ul className={styles.accessList}>
                  {RESUME_REVIEW_PARAGRAPHS.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.accessRow} ${openRow === "client" ? styles.accessRowExpanded : ""}`}>
          <div className={styles.accessRowHead} onClick={() => toggleRow("client")}>
            Client Support <span className={styles.accessRowChev}></span>
          </div>
          <div className={styles.accessRowBody}>
            <div className={`${styles.accessSubRow} ${openSub === "client-expectations" ? styles.accessSubRowExpanded : ""}`}>
              <div className={styles.accessSubRowHead} onClick={() => toggleSub("client-expectations")}>
                Client Expectations
              </div>
              <div className={styles.accessSubRowBody}>
                <ul className={styles.accessList}>
                  {CLIENT_EXPECTATIONS.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <a href="/#client-hiring-support" className={styles.accessInlineLink} onClick={closeAll}>
                  Start a Client Conversation
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.accessRow} ${openRow === "contact" ? styles.accessRowExpanded : ""}`}>
          <div className={styles.accessRowHead} onClick={() => toggleRow("contact")}>
            Contact Us <span className={styles.accessRowChev}></span>
          </div>
          <div className={styles.accessRowBody}>
            <div className={styles.accessContact}>
              <strong>Start a Career Conversation</strong>
              <a href="mailto:careers@agileconsultingsolutions.com">careers@agileconsultingsolutions.com</a>
              <strong>AGILE | 407-868-7254</strong>
              <a href="https://www.agileconsultingsolutions.com">www.agileconsultingsolutions.com</a>
            </div>
          </div>
        </div>

        <div className={`${styles.accessRow} ${openRow === "media" ? styles.accessRowExpanded : ""}`}>
          <div className={styles.accessRowHead} onClick={() => toggleRow("media")}>
            Media &amp; Communications <span className={styles.accessRowChev}></span>
          </div>
          <div className={styles.accessRowBody}>
            <div className={styles.accessContact}>
              <strong>Lilly Genao</strong>
              <span>Communications Manager</span>
              <span className={styles.accessContactRole}>Architecture, MEP Engineering &amp; Construction</span>
              <a href="mailto:lgenao@agileconsultingsolutions.com">lgenao@agileconsultingsolutions.com</a>
              <a
                href="https://www.linkedin.com/in/lilly-genao-771ba338a/"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Lilly on LinkedIn ↗
              </a>
            </div>
          </div>
        </div>

        <div className={`${styles.accessRow} ${openRow === "hours" ? styles.accessRowExpanded : ""}`}>
          <div className={styles.accessRowHead} onClick={() => toggleRow("hours")}>
            Hours of Availability <span className={styles.accessRowChev}></span>
          </div>
          <div className={styles.accessRowBody}>
            <div className={styles.accessHours}>
              <strong>Monday through Friday</strong>
              <span>8:00 AM to 8:30 PM Eastern Time</span>
              <strong>Saturday</strong>
              <span>9:00 AM to 12:30 PM Eastern Time</span>
              <em>Additional availability by request.</em>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
