"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../../app/page.module.css";

const badges = [
  "Focused AEC Expertise",
  "Career & Hiring Insight",
  "Premier Client Connections",
  "Marketplace Intelligence",
];

export default function HomeActionBadges() {
  const firstRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = firstRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return badges.map((label, index) => (
    <span
      ref={index === 0 ? firstRef : null}
      className={`${styles.actionBadge} ${visible ? styles.actionBadgeVisible : ""}`}
      style={{ "--badge-delay": `${index * 750}ms` }}
      key={label}
    >
      <b className={styles.actionCheck} aria-hidden="true">
        ✓
      </b>
      {label}
    </span>
  ));
}
