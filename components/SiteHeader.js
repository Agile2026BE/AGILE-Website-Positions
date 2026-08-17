"use client";

import { useEffect } from "react";
import styles from "./SiteHeader.module.css";

const BASE_URL = "https://careers.agileconsultingsolutions.com";
const MAIN_HOME_URL = "https://agile-homepage.vercel.app/#top";

function getTargetId(href) {
  const hashIndex = href.indexOf("#");
  return hashIndex >= 0 ? href.slice(hashIndex + 1) : "";
}

function scrollToTarget(targetId, behavior = "smooth") {
  if (targetId === "top") {
    window.scrollTo({ top: 0, behavior });
    return true;
  }

  const target = document.getElementById(targetId);
  const header = document.querySelector(".site-header");
  if (!target || !header) return false;

  const headerHeight = Math.ceil(header.getBoundingClientRect().height);
  const targetTop = target.getBoundingClientRect().top + window.scrollY;
  const extraGap = targetId === "contact" ? 36 : 8;
  const landingTop = Math.max(0, targetTop - headerHeight - extraGap);

  window.scrollTo({ top: landingTop, behavior });
  return true;
}

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
    const url = new URL(href, window.location.href);
    const sameSite = window.location.hostname === url.hostname;
    const homePath = window.location.pathname === "/";
    const targetId = getTargetId(href);

    if (!sameSite || !homePath || !targetId) return;

    event.preventDefault();
    const nextHash = `#${targetId}`;
    if (window.location.hash !== nextHash) {
      window.history.pushState(null, "", nextHash);
    }
    scrollToTarget(targetId);
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
        <a className={`brand ${styles.brand}`} href={`${BASE_URL}/`} aria-label="AGILE Careers home">
          <span className={styles.wordmark}>AGILE</span>
        </a>
        <nav className={`site-nav ${styles.nav}`} aria-label="Primary navigation">
          <a href={MAIN_HOME_URL}>Home</a>
          {links.map(([targetId, label]) => {
            const href = `${BASE_URL}/#${targetId}`;
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
