import Link from "next/link";
import BrandLogo from "../../components/BrandLogo";
import s from "../wrap.module.css";

export const metadata = {
  title: "Professionals | AGILE Business Consulting",
  description: "Learn what AEC professionals can expect when working with AGILE and explore current career opportunities.",
};

export default function Professionals() {
  return (
    <main className={s.page}>
      <Header />
      <section className={s.hero}>
        <p className={s.label}>FOR AEC PROFESSIONALS</p>
        <h1>Expect more from your <em>next move.</em></h1>
        <p>AGILE provides confidential career representation built around your experience, project background, goals, and long-term career direction.</p>
        <Link className={s.primary} href="/#positions">Explore Positions</Link>
      </section>

      <section className={s.content}>
        <div>
          <p className={s.label}>CANDIDATE EXPECTATIONS</p>
          <h2>Professional representation from first conversation through offer.</h2>
        </div>
        <div>
          <h3>Opportunity Alignment</h3>
          <p>Careful review of your experience and project portfolio to align your expertise with opportunities that make sense for your career.</p>
          <h3>Priority Consideration</h3>
          <p>Targeted representation for relevant client openings and direct communication throughout the process.</p>
          <h3>Interview Preparation</h3>
          <p>Personal interview preparation, coordination, scheduling, and timely follow-up before and after each conversation.</p>
          <h3>Offer Guidance</h3>
          <p>Compensation, start-date, and transition guidance designed to help you evaluate and secure the right long-term role.</p>
        </div>
      </section>

      <section className={s.band}>
        <div>
          <p className={s.label}>RESUME PERFORMANCE REVIEW</p>
          <h2>Present your experience at its strongest.</h2>
        </div>
        <p>AGILE reviews professional experience, educational achievements, skill sets, project history, and accomplishments to help qualified professionals communicate their value clearly and gain interview interest.</p>
      </section>

      <section className={s.cta}>
        <p className={s.label}>WHAT’S YOUR NEXT MOVE?</p>
        <h2>Explore opportunities when you’re ready.</h2>
        <p>The Careers engine is built to let you review the details before deciding where you want to go next.</p>
        <Link className={s.primary} href="/#positions">Explore Positions</Link>
      </section>
      <Footer />
    </main>
  );
}

function Header() {
  return <header className={s.header}><div className={s.nav}><Link className={s.brand} href="/home" aria-label="AGILE home"><BrandLogo className={s.logo} /></Link><nav><Link href="/home">Home</Link><Link href="/professionals">Professionals</Link><Link href="/clients">Clients</Link><Link href="/insights">Insights</Link><Link href="/#contact">Contact</Link></nav><Link className={s.navCta} href="/#positions">Explore Positions</Link></div></header>;
}

function Footer() {
  return <footer className={s.footer}>AGILE Business Consulting • AEC</footer>;
}
