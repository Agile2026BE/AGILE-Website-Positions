"use client";

import { useEffect } from "react";
import styles from "./SiteHeader.module.css";

const BASE_URL = "https://careers.agileconsultingsolutions.com";
const MOBILE_BREAKPOINT = 760;

function getTargetId(href) {
  const hashIndex = href.indexOf("#");
  return hashIndex >= 0 ? href.slice(hashIndex + 1) : "";
}

function scrollToMobileTarget(targetId, behavior = "smooth") {
  if (window.innerWidth > MOBILE_BREAKPOINT) return false;

  if (targetId === "top") {
    window.scrollTo({ top: 0, behavior });
    return true;
  }

  const target = document.getElementById(targetId);
  const header = document.querySelector(".site-header");
  if (!target || !header) return false;

  const headerHeight = Math.ceil(header.getBoundingClientRect().height);
  const targetTop = target.getBoundingClientRect().top + window.scrollY;
  const landingTop = Math.max(0, targetTop - headerHeight - 2);

  window.scrollTo({ top: landingTop, behavior });
  return true;
}

export default function SiteHeader() {
  useEffect(() => {
    function alignCurrentHash() {
      const targetId = window.location.hash.replace(/^#/, "");
      if (!targetId) return;

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => scrollToMobileTarget(targetId, "auto"));
      });
    }

    alignCurrentHash();
    window.addEventListener("hashchange", alignCurrentHash);
    window.addEventListener("resize", alignCurrentHash);

    return () => {
      window.removeEventListener("hashchange", alignCurrentHash);
      window.removeEventListener("resize", alignCurrentHash);
    };
  }, []);

  function handleNavigation(event, href) {
    if (window.innerWidth > MOBILE_BREAKPOINT) return;

    const url = new URL(href, window.location.href);
    const isHomePage = window.location.hostname === url.hostname && window.location.pathname === "/";
    if (!isHomePage) return;

    const targetId = getTargetId(href);
    if (!targetId) return;

    event.preventDefault();
    const nextHash = `#${targetId}`;
    if (window.location.hash !== nextHash) {
      window.history.pushState(null, "", nextHash);
    }
    scrollToMobileTarget(targetId);
  }

  const links = [
    ["agile-insights", "AGILE Insights"],
    ["positions", "Positions"],
    ["reviews", "Reviews"],
    ["contact", "Contact"],
    ["top", "Top"],
  ];

  return (
    <header className={`site-header ${styles.header}`}>
      <div className={`container site-header-inner ${styles.inner}`}>
        <a className={`brand ${styles.brand}`} href={`${BASE_URL}/`} aria-label="AGILE Careers home">
          <span className={styles.wordmark}>AGILE</span>
        </a>
        <nav className={`site-nav ${styles.nav}`} aria-label="Primary navigation">
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
