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
    "Virtual Interviews",
    "Salary disclosed",
    "Location disclosed",
    "Work schedule disclosed",
    "No Account Setup Required",
  ];

  return (
    <section className={`hero ${styles.hero}`} id="top">
      <div className={`container hero-inner ${styles.inner}`}>
        <p className={`hero-eyebrow ${styles.eyebrow}`}>
          <em>AEC</em> Recruiting and Consulting
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
            onClick={(event) => handleSamePageNav(event, "/careers/#contact", "/careers")}
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
          <div className={styles.storyRow}>
            <div className={`${styles.storyPanel} ${styles.storyPanelLeft}`}>
              <Image
                className={styles.storyPanelImg}
                src="/agile-story-left.jpg"
                alt="Professionals moving through a city on their way to work."
                fill
                sizes="(max-width: 1300px) 30vw, 340px"
              />
            </div>
            <div className={`${styles.storyPanel} ${styles.storyPanelCenter}`}>
              <Image
                className={styles.storyPanelImg}
                src="/agile-story-center.jpg"
                alt="A team reviewing engineering plans together in a conference room."
                fill
                sizes="(max-width: 1300px) 44vw, 500px"
              />
            </div>
            <div className={`${styles.storyPanel} ${styles.storyPanelRight}`}>
              <Image
                className={styles.storyPanelImg}
                src="/agile-story-right.jpg"
                alt="An executive looking through a contemporary office window while considering his next career move."
                fill
                sizes="(max-width: 1300px) 32vw, 370px"
              />
            </div>
          </div>
        </figure>

        <figure className={`${styles.storyBand} ${styles.mobileStoryBand}`}>
          <Image
            className={styles.mobileStoryPoster}
            src="/agile-story-right.jpg"
            alt="An executive looking through a contemporary office window while considering his next career move."
            fill
            sizes="calc(100vw - 24px)"
          />
        </figure>
      </div>
    </section>
  );
}
