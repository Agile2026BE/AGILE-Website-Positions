"use client";

import { useEffect } from "react";
import Link from "next/link";
import styles from "./SiteHeader.module.css";
import { getTargetId, scrollToTarget, handleSamePageNav } from "../lib/scrollToSection";

// The careers engine now lives at /careers within the same unified deployment
// (it used to be a separate site at careers.agileconsultingsolutions.com root).
const CAREERS_PATH = "/careers";
const MAIN_HOME_URL = "/";

// Images below the fold (hero photos, storyboard figures) can still be
// decoding and settling into their final layout well after the initial
// scroll-into-view already ran, which was silently landing fresh
// cross-page navigations (e.g. Home -> /careers/#contact, or the ACCESS
// menu's "Start a Career Conversation") short of the real target, leaving
// the previous section visible above it. Rather than guess a fixed delay,
// poll the target's on-screen position and keep re-aligning until it holds
// steady across two checks in a row, the visitor starts scrolling on their
// own, or a bounded time window elapses.
const SETTLE_POLL_INTERVAL_MS = 150;
const SETTLE_MAX_ATTEMPTS = 20; // ~3s

export default function SiteHeader() {
  useEffect(() => {
    let pollTimer = null;
    let userInteracted = false;

    function stopSettling() {
      if (pollTimer) {
        window.clearInterval(pollTimer);
        pollTimer = null;
      }
    }

    function markUserInteracted() {
      userInteracted = true;
      stopSettling();
    }

    function alignCurrentHash() {
      const targetId = window.location.hash.replace(/^#/, "");
      if (!targetId) return;

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => scrollToTarget(targetId, "auto"));
      });
    }

    function settleOnCurrentHash() {
      stopSettling();
      const targetId = window.location.hash.replace(/^#/, "");
      if (!targetId || targetId === "top") return;

      let lastTop = null;
      let stableCount = 0;
      let attempts = 0;

      pollTimer = window.setInterval(() => {
        attempts += 1;
        if (userInteracted || attempts > SETTLE_MAX_ATTEMPTS) {
          stopSettling();
          return;
        }
        const target = document.getElementById(targetId);
        if (!target) {
          stopSettling();
          return;
        }
        const top = Math.round(target.getBoundingClientRect().top);
        if (lastTop !== null && Math.abs(top - lastTop) <= 1) {
          stableCount += 1;
          if (stableCount >= 2) {
            stopSettling();
            return;
          }
        } else {
          // The target moved since the last check, so the page is still
          // settling underneath it — catch up before checking again.
          stableCount = 0;
          scrollToTarget(targetId, "auto");
        }
        lastTop = top;
      }, SETTLE_POLL_INTERVAL_MS);
    }

    function handleHashChange() {
      userInteracted = false;
      alignCurrentHash();
      settleOnCurrentHash();
    }

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("load", handleHashChange);
    window.addEventListener("wheel", markUserInteracted, { passive: true });
    window.addEventListener("touchmove", markUserInteracted, { passive: true });

    return () => {
      stopSettling();
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("load", handleHashChange);
      window.removeEventListener("wheel", markUserInteracted);
      window.removeEventListener("touchmove", markUserInteracted);
    };
  }, []);

  function handleNavigation(event, href) {
    handleSamePageNav(event, href, CAREERS_PATH);
  }

  const links = [
    ["agile-insights", "Insights"],
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
