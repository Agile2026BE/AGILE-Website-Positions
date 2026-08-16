import Link from "next/link";
import BrandLogo from "../../components/BrandLogo";
import s from "../wrap.module.css";

export const metadata = {
  title: "AEC Trends & Insights | AGILE Business Consulting",
  description: "AEC hiring trends, market perspective, and career intelligence from AGILE Business Consulting.",
};

export default function Insights() {
  return (
    <main className={s.page}>
      <Header />
      <section className={s.hero}>
        <p className={s.label}>AGILE INSIGHTS</p>
        <h1>Stay informed.<br/><em>Stay ahead.</em></h1>
        <p>Hiring intelligence shaped by active AEC recruiting, direct firm relationships, and the markets where our clients are building teams.</p>
        <Link className={s.primary} href="/#positions">Explore Positions</Link>
      </section>

      <section className={s.content}>
        <div>
          <p className={s.label}>HIRING TRENDS & OUTLOOK</p>
          <h2>Where demand is moving.</h2>
        </div>
        <div>
          <h3>Complex Sectors</h3>
          <p>MEP and construction firms continue hiring for data centers, healthcare, higher education, infrastructure, transportation, aviation, commercial, and other technically demanding project environments.</p>
          <h3>Experience & Specialization</h3>
          <p>Technical depth remains important while coordination, leadership, system-level experience, client interaction, and business exposure can broaden career paths.</p>
          <h3>Geography & Compensation</h3>
          <p>Opportunity can change significantly by state, market, discipline, experience level, specialty, and salary expectations—the same dimensions professionals can use when exploring AGILE positions.</p>
        </div>
      </section>

      <section className={s.band}>
        <div><p className={s.label}>MARKET PERSPECTIVE</p><h2>Information that helps you evaluate the move.</h2></div>
        <p>AGILE’s Careers experience is designed to connect market perspective with actual opportunities, allowing professionals to move directly from insight into detailed position exploration.</p>
      </section>

      <section className={s.cta}>
        <p className={s.label}>CURRENT OPPORTUNITIES</p>
        <h2>Put the market intelligence to work.</h2>
        <p>Explore positions by the filters that matter to your search and review the details before deciding what deserves your attention.</p>
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
