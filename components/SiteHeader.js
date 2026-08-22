"use client";

import { useEffect } from "react";
import Link from "next/link";
import styles from "./SiteHeader.module.css";
import { getTargetId, scrollToTarget, handleSamePageNav } from "../lib/scrollToSection";

// The careers engine now lives at /careers within the same unified deployment
// (it used to be a separate site at careers.agileconsultingsolutions.com root).
const CAREERS_PATH = "/careers";
const MAIN_HOME_URL = "/";

export default function SiteHeader() {
  useEffect(() => {
    function alignCurrentHash() {
      const targetId = window.location.hash.replace(/^#/, "");
      if (!targetId) return;

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => scrollToTarget(targetId, "auto"));
      });
    }

    alignCurrentHash();
    window.addEventListener("hashchange", alignCurrentHash);

    return () => {
      window.removeEventListener("hashchange", alignCurrentHash);
    };
  }, []);

  function handleNavigation(event, href) {
    handleSamePageNav(event, href, CAREERS_PATH);
  }

  const links = [
    ["agile-insights", "AGILE Insights"],
    ["positions", "Positions"],
    ["reviews", "Reviews"],
    ["market-insights", "Contact"],
    ["top", "Top"],
  ];

  return (
    <header className={`site-header ${styles.header}`}>
      <div className={`container site-header-inner ${styles.inner}`}>
        <a className={`brand ${styles.brand}`} href={CAREERS_PATH} aria-label="AGILE Careers home">
          <span className={styles.wordmark}>AGILE</span>
        </a>
        <nav className={`site-nav ${styles.nav}`} aria-label="Primary navigation">
          <a href={MAIN_HOME_URL}>Home</a>
          {links.map(([targetId, label]) => {
            const href = `${CAREERS_PATH}/#${targetId}`;
            return (
              <a key={targetId} href={href} onClick={(event) => handleNavigation(event, href)}>
                {label}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
