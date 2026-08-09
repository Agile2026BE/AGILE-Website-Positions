"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./ReviewsSection.module.css";

const reviews = [
  {
    quote: "I applied once with AGILE and they expertly guided the complete process from start to finish with multiple MEP firm openings. I now have the position I always wanted, and a great recruiting contact.",
    attribution: "C.N. · Senior Engineer, MEP",
    tags: ["mep", "electrical", "mechanical"],
    type: "discipline",
  },
  {
    quote: "I wasn’t actively looking, but AGILE took the time to understand what I wanted in my next role and went searching for it. I actually just started this month.",
    attribution: "M.S. · Commissioning Professional, CxA",
    tags: ["commissioning", "cxa", "rcxa"],
    type: "discipline",
  },
  {
    quote: "AGILE helped me secure a better offer while keeping the focus on enthusiasm for the role, not just compensation.",
    attribution: "T.W. · Project Manager, MEP",
    tags: ["mep", "project manager", "construction"],
    type: "general",
  },
];

function normalizeSearch(detail = {}) {
  return [detail.discipline, detail.query, ...(detail.market || [])]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function rotate(items, offset) {
  if (!items.length) return [];
  const start = offset % items.length;
  return [...items.slice(start), ...items.slice(0, start)];
}

export default function ReviewsSection() {
  const [searchContext, setSearchContext] = useState("");
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    function handleCareerSearch(event) {
      setSearchContext(normalizeSearch(event.detail));
      setRotation(current => current + 1);
    }
    window.addEventListener("agile:career-search", handleCareerSearch);
    return () => window.removeEventListener("agile:career-search", handleCareerSearch);
  }, []);

  const visibleReviews = useMemo(() => {
    const disciplineMatches = searchContext
      ? reviews.filter(review => review.type !== "general" && review.tags.some(tag => searchContext.includes(tag)))
      : reviews.filter(review => review.type !== "general");
    const generalReviews = reviews.filter(review => review.type === "general");
    const selected = [
      ...rotate(disciplineMatches, rotation).slice(0, 2),
      ...rotate(generalReviews, rotation).slice(0, 1),
    ];
    const fallback = rotate(reviews.filter(review => !selected.includes(review)), rotation);
    return [...selected, ...fallback].slice(0, 3);
  }, [searchContext, rotation]);

  return (
    <section className={`section reviews-section ${styles.section}`} id="reviews">
      <div className={`container ${styles.panel}`}>
        <p className={styles.badge}>✓ Professional experiences relevant to your search</p>
        <div className={styles.headingRow}>
          <h2 className={styles.heading}>What MEP and AEC Professionals<br />say about AGILE.</h2>
        </div>
        <div className={styles.grid}>
          {visibleReviews.map((review) => (
            <blockquote className={styles.review} key={review.attribution}>
              <p>“{review.quote}”</p>
              <footer>{review.attribution}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
