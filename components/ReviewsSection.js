"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./ReviewsSection.module.css";

const reviews = [
  {
    quote: "I applied once with AGILE and they expertly guided the complete process from start to finish with multiple MEP firm openings. I now have the position I always wanted, and a great recruiting contact.",
    attribution: "C.N. · Senior Engineer, MEP",
    tags: ["mep", "electrical", "mechanical"],
  },
  {
    quote: "I wasn’t actively looking, but AGILE took the time to understand what I wanted in my next role and went searching for it. I actually just started this month.",
    attribution: "M.S. · Commissioning Professional, CxA",
    tags: ["commissioning", "cxa", "rcxa"],
  },
  {
    quote: "AGILE helped me secure a better offer while keeping the focus on enthusiasm for the role, not just compensation.",
    attribution: "T.W. · Project Manager, MEP",
    tags: ["mep", "project manager", "construction"],
  },
];

function normalizeSearch(detail = {}) {
  return [detail.discipline, detail.query, ...(detail.market || [])]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
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
    const relevant = searchContext
      ? reviews.filter(review => review.tags.some(tag => searchContext.includes(tag)))
      : [];
    const pool = relevant.length ? [...relevant, ...reviews.filter(review => !relevant.includes(review))] : reviews;
    return pool.map((_, index) => pool[(index + rotation) % pool.length]).slice(0, 3);
  }, [searchContext, rotation]);

  return (
    <section className={`section reviews-section ${styles.section}`} id="reviews">
      <div className={`container ${styles.panel}`}>
        <p className={styles.badge}>✓ Professional experiences relevant to your search</p>
        <div className={styles.headingRow}>
          <h2 className={styles.heading}>What MEP and AEC professionals<br />say about AGILE.</h2>
          <p className={styles.copy}>As you refine your career search, candidate experiences rotate to keep the perspective relevant and useful.</p>
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
