"use client";

import Link from "next/link";
import styles from "./error.module.css";

export default function ErrorPage({ reset }) {
  return (
    <main>
      <section className={`section ${styles.section}`}>
        <div className={`container ${styles.inner}`}>
          <p className={styles.eyebrow}>SOMETHING WENT WRONG</p>
          <h1 className="section-title">We could not load this page.</h1>
          <p className="section-copy">
            Please try the page again. If the issue continues, return to the careers homepage.
          </p>
          <div className={styles.actions}>
            <button className={styles.button} type="button" onClick={() => reset()}>
              Try Again
            </button>
            <Link className={styles.link} href="/">
              Return to Careers
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
