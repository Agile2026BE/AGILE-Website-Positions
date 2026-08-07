import Link from "next/link";
import styles from "./not-found.module.css";
import SiteFooter from "../../../components/SiteFooter";
import SiteHeader from "../../../components/SiteHeader";

export default function PositionNotFound() {
  return (
    <main>
      <SiteHeader />

      <section className={`section position-detail ${styles.detail}`}>
        <div className={`container ${styles.inner}`}>
          <p className={`contact-eyebrow ${styles.eyebrow}`}>POSITION NOT FOUND</p>
          <h1 className="section-title">This position is no longer available.</h1>
          <p className="section-copy">
            Return to the current AGILE career opportunities to continue your search.
          </p>
          <div className={`hero-actions ${styles.actions}`}>
            <Link className={`hero-primary ${styles.primary}`} href="/#positions">View Current Positions</Link>
            <Link className={`hero-secondary ${styles.secondary}`} href="/#contact">Start a Conversation</Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
