"use client";

import { useEffect } from "react";
import styles from "./SiteHeader.module.css";

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
  const landingTop = Math.max(0, targetTop - headerHeight - 8);

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
    return () => window.removeEventListener("hashchange", alignCurrentHash);
  }, []);

  function handleNavigation(event, href) {
    const url = new URL(href, window.location.origin);
    const homePath = window.location.pathname === "/";
    const targetId = getTargetId(href);

    if (!homePath || !targetId) return;

    event.preventDefault();
    const nextHash = `#${targetId}`;
    if (window.location.hash !== nextHash) window.history.pushState(null, "", nextHash);
    scrollToTarget(targetId);
  }

  const links = [
    ["/home", "Home"],
    ["/professionals", "Professionals"],
    ["/clients", "Clients"],
    ["/insights", "Insights"],
    ["/#contact", "Contact"],
  ];

  return (
    <header className={`site-header ${styles.header}`}>
      <div className={`container site-header-inner ${styles.inner}`}>
        <a className={`brand ${styles.brand}`} href="/home" aria-label="AGILE home">
          <span className={styles.wordmark}>AGILE</span>
        </a>
        <nav className={`site-nav ${styles.nav}`} aria-label="Primary navigation">
          {links.map(([href, label]) => (
            <a key={href} href={href} onClick={(event) => handleNavigation(event, href)}>
              {label}
            </a>
          ))}
          <a className={styles.searchCareers} href="/#positions" onClick={(event) => handleNavigation(event, "/#positions")}>Explore Positions</a>
        </nav>
      </div>
    </header>
  );
}
