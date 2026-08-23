"use client";

import { useEffect } from "react";
import Link from "next/link";
import styles from "./SiteHeader.module.css";
import { getTargetId, getTargetScrollTop, scrollToTarget, handleSamePageNav } from "../lib/scrollToSection";

// The careers engine now lives at /careers within the same unified deployment
// (it used to be a separate site at careers.agileconsultingsolutions.com root).
const CAREERS_PATH = "/careers";
const MAIN_HOME_URL = "/";

// Content above/around the target (hero photos, storyboard figures, fonts
// swapping in, etc.) can still be loading and shifting the page's layout
// well after the initial scroll-into-view already ran, which was silently
// landing fresh cross-page navigations (e.g. Home -> /careers/#contact, or
// the ACCESS menu's "Start a Career Conversation") short of the real
// target, leaving the previous section visible above it. A fixed timing
// budget isn't reliable here — load time depends entirely on the visitor's
// connection — so this locks onto the target with three layers: a
// ResizeObserver on the whole page (catches literally any layout size
// change, whatever causes it), direct load listeners on every still-loading
// image (fires the instant one finishes, faster than waiting for the
// resize to be reported), and a background poll as a final catch-all.
//
// IMPORTANT: every check re-computes the CORRECT scroll position and
// compares it against where the page actually is right now — it does not
// just watch for movement. An earlier version only re-corrected when the
// target's position visibly shifted between checks, which meant a landing
// that was wrong from the very first frame (but never moved again, e.g. on
// a fast connection with nothing left to load) would be treated as
// "stable" and left wrong. Checking absolute correctness every tick fixes
// that regardless of whether anything else on the page ever shifts.
const SETTLE_POLL_INTERVAL_MS = 150;
const SETTLE_MAX_ATTEMPTS = 80; // ~12s, covers slow-connection image loads
const SETTLE_TOLERANCE_PX = 2;

export default function SiteHeader() {
  useEffect(() => {
    let pollTimer = null;
    let userInteracted = false;
    let settleCleanups = [];

    function stopSettling() {
      if (pollTimer) {
        window.clearInterval(pollTimer);
        pollTimer = null;
      }
      settleCleanups.forEach((cleanup) => cleanup());
      settleCleanups = [];
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

      let stableCount = 0;
      let attempts = 0;

      function recheck() {
        if (userInteracted) {
          stopSettling();
          return;
        }
        const desiredTop = getTargetScrollTop(targetId);
        if (desiredTop === null) {
          stopSettling();
          return;
        }
        const currentTop = window.scrollY;
        if (Math.abs(currentTop - desiredTop) <= SETTLE_TOLERANCE_PX) {
          stableCount += 1;
        } else {
          // Either the page just settled into a new layout underneath the
          // target, or the earlier landing simply wasn't correct — either
          // way, correct it now rather than assuming "unchanged" means
          // "right".
          stableCount = 0;
          scrollToTarget(targetId, "auto");
        }
      }

      // Check immediately rather than waiting for the first observer
      // callback or poll tick — if the landing was already wrong on
      // arrival, fix it right away instead of leaving it visible even
      // briefly.
      recheck();

      // Catch literally any layout size change on the page — image loads,
      // font swaps, video metadata, dynamically-inserted content, anything
      // — and re-align the instant one happens. This is the general-purpose
      // net; it doesn't need to know what might shift the layout.
      if (typeof ResizeObserver !== "undefined") {
        const ro = new ResizeObserver(() => {
          stableCount = 0;
          recheck();
        });
        ro.observe(document.body);
        settleCleanups.push(() => ro.disconnect());
      }

      // Also listen directly on every still-loading image so the very
      // first correction can happen the instant it finishes, without
      // waiting on the ResizeObserver's own reporting delay.
      Array.prototype.forEach.call(document.images || [], (img) => {
        if (img.complete) return;
        const onSettled = () => {
          stableCount = 0;
          recheck();
        };
        img.addEventListener("load", onSettled);
        img.addEventListener("error", onSettled);
        settleCleanups.push(() => {
          img.removeEventListener("load", onSettled);
          img.removeEventListener("error", onSettled);
        });
      });

      // iOS Safari resizes the visual viewport as its address bar/toolbar
      // collapses or expands during the very moment a fresh page is
      // landing — that can shift how much of the page is actually visible
      // without firing a ResizeObserver entry on document.body (the
      // document's layout size hasn't changed, only how much of it is
      // shown). Re-checking on visualViewport resize catches that case too.
      if (window.visualViewport) {
        const onViewportResize = () => {
          stableCount = 0;
          recheck();
        };
        window.visualViewport.addEventListener("resize", onViewportResize);
        settleCleanups.push(() => window.visualViewport.removeEventListener("resize", onViewportResize));
      }

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
