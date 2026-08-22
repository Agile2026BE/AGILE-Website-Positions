"use client";

import { useEffect } from "react";
import Link from "next/link";
import styles from "./SiteHeader.module.css";
import { getTargetId, scrollToTarget, handleSamePageNav } from "../lib/scrollToSection";

// The careers engine now lives at /careers within the same unified deployment
// (it used to be a separate site at careers.agileconsultingsolutions.com root).
const CAREERS_PATH = "/careers";
const MAIN_HOME_URL = "/";

// Images above/around the target (hero photos, storyboard figures) can
// still be loading and shifting the page's layout well after the initial
// scroll-into-view already ran, which was silently landing fresh
// cross-page navigations (e.g. Home -> /careers/#contact, or the ACCESS
// menu's "Start a Career Conversation") short of the real target, leaving
// the previous section visible above it. A fixed timing budget isn't
// reliable here — image load time depends entirely on the visitor's
// connection — so this listens directly for every image on the page to
// actually finish loading and re-aligns immediately when one does, on top
// of a background poll as a catch-all for shifts images don't explain
// (fonts swapping, etc). It keeps working until the target's position
// holds steady, the visitor starts scrolling on their own, or a generous
// bounded time window elapses (long enough to cover a slow connection).
const SETTLE_POLL_INTERVAL_MS = 150;
const SETTLE_MAX_ATTEMPTS = 80; // ~12s, covers slow-connection image loads

export default function SiteHeader() {
  useEffect(() => {
    let pollTimer = null;
    let userInteracted = false;
    let imageListenerCleanups = [];

    function stopSettling() {
      if (pollTimer) {
        window.clearInterval(pollTimer);
        pollTimer = null;
      }
      imageListenerCleanups.forEach((cleanup) => cleanup());
      imageListenerCleanups = [];
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

      function recheck() {
        if (userInteracted) {
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
        } else {
          // The target moved since the last check, so the page is still
          // settling underneath it — catch up before checking again.
          stableCount = 0;
          scrollToTarget(targetId, "auto");
        }
        lastTop = top;
      }

      // Re-check the instant any not-yet-loaded image on the page finishes,
      // since that's the actual event that shifts layout — far more
      // precise than waiting for the next poll tick.
      Array.prototype.forEach.call(document.images || [], (img) => {
        if (img.complete) return;
        const onSettled = () => {
          stableCount = 0;
          recheck();
        };
        img.addEventListener("load", onSettled);
        img.addEventListener("error", onSettled);
        imageListenerCleanups.push(() => {
          img.removeEventListener("load", onSettled);
          img.removeEventListener("error", onSettled);
        });
      });

      pollTimer = window.setInterval(() => {
        attempts += 1;
        if (userInteracted || attempts > SETTLE_MAX_ATTEMPTS) {
          stopSettling();
          return;
        }
        recheck();
        if (stableCount >= 2) {
          stopSettling();
        }
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
