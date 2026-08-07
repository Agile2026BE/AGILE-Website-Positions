import Link from "next/link";
import SiteFooter from "../../../components/SiteFooter";
import SiteHeader from "../../../components/SiteHeader";

export default function PositionNotFound() {
  return (
    <main>
      <SiteHeader />

      <section className="section position-detail">
        <div className="container">
          <p className="contact-eyebrow">POSITION NOT FOUND</p>
          <h1 className="section-title">This position is no longer available.</h1>
          <p className="section-copy">
            Return to the current AGILE career opportunities to continue your search.
          </p>
          <div className="hero-actions">
            <Link className="hero-primary" href="/#positions">View Current Positions</Link>
            <Link className="hero-secondary" href="/#contact">Start a Conversation</Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
