import Link from "next/link";
import styles from "./not-found.module.css";
import SiteFooter from "../../../../components/SiteFooter";
import SiteHeader from "../../../../components/SiteHeader";

export default function PositionNotFound() {
  return (
    <main>
      <SiteHeader />

      <section className={`section position-detail ${styles.detail}`}>
        <div className={`container ${styles.inner}`}>
          <p className={`contact-eyebrow ${styles.eyebrow}`}>POSITION NOT FOUND</p>
          <h1 className="section-title">This Opportunity Has Been Filled</h1>
          <p className="section-copy">
            This particular opportunity has been filled, however we would like to speak with you regarding other positions that are currently available with our clients.
          </p>
          <div className={`hero-actions ${styles.actions}`}>
            <Link className={`hero-primary ${styles.primary}`} href="/careers/#positions">View Current Positions</Link>
            <Link className={`hero-secondary ${styles.secondary}`} href="/careers/#contact">Start a Conversation</Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
