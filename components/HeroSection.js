"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./HeroSection.module.css";
import { handleSamePageNav } from "../lib/scrollToSection";

export default function HeroSection() {
  const badgesRef = useRef(null);
  const [badgesVisible, setBadgesVisible] = useState(false);

  useEffect(() => {
    const node = badgesRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setBadgesVisible(entry.isIntersecting);
      },
      { threshold: 0.35 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  const trustBadges = [
    "Salary disclosed",
    "Location disclosed",
    "Virtual Interviews",
    "Work schedule disclosed",
    "No Account Setup Required",
  ];

  return (
    <section className={`hero ${styles.hero}`} id="top">
      <div className={`container hero-inner ${styles.inner}`}>
        <p className={`hero-eyebrow ${styles.eyebrow}`}>
          <em>SPECIALIZED</em> AEC RECRUITING
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
          Commissioning, Civil Engineering, and Private Owner&apos;s Representation
          across Healthcare, Higher Education, Life Sciences, Hospitality,
          Cultural, High-Rise Commercial and Residential, Mission Critical, Data
          Centers, Aviation, Transportation, Rail and Transit, Water and
          Wastewater, and Industrial markets.
        </p>

        <div className={`hero-actions ${styles.actions}`}>
          <a
            className={`hero-primary ${styles.primary}`}
            href="/careers/#positions"
            onClick={(event) => handleSamePageNav(event, "/careers/#positions", "/careers")}
          >
            Explore Positions
          </a>

          <Link
            className={`hero-secondary ${styles.secondary}`}
            href="/careers/#contact"
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
              style={{ "--badge-delay": `${index * 750}ms` }}
              key={label}
            >
              <b className={styles.check} aria-hidden="true">
                ✓
              </b>
              {label}
            </span>
          ))}
        </div>

        <figure className={`${styles.storyBand} ${styles.desktopStoryBand}`}>
          <Image
            className={styles.storyPoster}
            src="/agile-informed-move-storyboard-v1.png"
            alt="Professionals moving through a city, reviewing engineering plans, and considering a skyline before a meeting."
            fill
            sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1100px) calc(100vw - 64px), 1000px"
          />
        </figure>

        <figure className={`${styles.storyBand} ${styles.mobileStoryBand}`}>
          <Image
            className={styles.mobileStoryPoster}
            src="/agile-executive-window.webp"
            alt="An executive looking through a contemporary office window while considering his next career move."
            fill
            sizes="calc(100vw - 24px)"
          />
        </figure>
      </div>
    </section>
  );
}
