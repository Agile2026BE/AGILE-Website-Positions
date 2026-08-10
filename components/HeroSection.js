"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  const badgesRef = useRef(null);
  const [badgesVisible, setBadgesVisible] = useState(false);

  useEffect(() => {
    const node = badgesRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBadgesVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  const trustBadges = [
    "Salary disclosed",
    "Location disclosed",
    "Work schedule disclosed",
    "Virtual Interviews",
    "No Account Setup Required",
  ];

  return (
    <section className={`hero ${styles.hero}`} id="top">
      <div className={`container hero-inner ${styles.inner}`}>
        <p className={`hero-eyebrow ${styles.eyebrow}`}>
          SPECIALIZED AEC RECRUITING
        </p>

        <h1 className={`hero-title ${styles.title}`}>
          <span className={styles.desktopTitle}>
            Know the details <em>before</em> applying.
          </span>

          <span className={styles.mobileTitle}>
            <span className={styles.titleLine}>Know the details</span>
            <span className={styles.titleLine}>
              <em>before</em> applying.
            </span>
          </span>
        </h1>

        <p className={styles.lead}>
          Explore career opportunities in MEP Building Systems Consulting,
          Commissioning, and Owner&apos;s Representation across Healthcare,
          Higher Education, Life Sciences, Hospitality, Cultural, High-Rise
          Commercial and Residential, Mission Critical, Data Centers, Aviation,
          Transportation, Rail and Transit, Water and Wastewater, and Industrial
          markets.
        </p>

        <div className={`hero-actions ${styles.actions}`}>
          <Link
            className={`hero-primary ${styles.primary}`}
            href="/#positions"
          >
            Explore Positions
          </Link>

          <Link
            className={`hero-secondary ${styles.secondary}`}
            href="/#contact"
          >
            Start a Conversation
          </Link>
        </div>

        <div
          ref={badgesRef}
          className={`hero-badges ${styles.badges}`}
          aria-label="Career search details"
        >
          {trustBadges.map((label, index) => (
            <span
              className={`${styles.badge} ${
                badgesVisible ? styles.badgeVisible : ""
              }`}
              style={{ "--badge-delay": `${index * 220}ms` }}
              key={label}
            >
              <b className={styles.check} aria-hidden="true">
                ✓
              </b>
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}