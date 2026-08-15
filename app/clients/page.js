import Link from "next/link";
import BrandLogo from "../../components/BrandLogo";
import s from "../wrap.module.css";

export const metadata = {
  title: "Client Hiring Support | AGILE Business Consulting",
  description: "Specialized recruiting support for Architecture, Engineering, and Construction firms.",
};

export default function Clients() {
  return (
    <main className={s.page}>
      <Header />
      <section className={s.hero}>
        <p className={s.label}>HIRING SUPPORT FOR AEC FIRMS</p>
        <h1>Specialized talent.<br/><em>Stronger project teams.</em></h1>
        <p>Focused recruiting support built around your discipline, market, project demands, and hiring priorities.</p>
        <a className={s.primary} href="mailto:careers@agileconsultingsolutions.com">Start a Hiring Conversation</a>
      </section>

      <section className={s.content}>
        <div>
          <p className={s.label}>CLIENT EXPECTATIONS</p>
          <h2>Direct recruiting support when the right hire matters.</h2>
        </div>
        <div>
          <h3>Targeted Search</h3>
          <p>Advanced sourcing and in-depth market research to identify strong active and passive candidates.</p>
          <h3>Professional Qualification</h3>
          <p>Personal interviews, skill verification, project-background review, and reference support before candidates reach your team.</p>
          <h3>Aligned Presentation</h3>
          <p>Candidate delivery centered on your technical requirements, business goals, team needs, and company culture.</p>
          <h3>Offer & Closing Support</h3>
          <p>Ongoing candidate engagement, timely feedback, competitive offer strategy, and negotiation support through acceptance.</p>
        </div>
      </section>

      <section className={s.band}>
        <div><p className={s.label}>AEC SPECIALIZATION</p><h2>Architecture. Engineering. Construction.</h2></div>
        <p>AGILE supports consulting firms and private owners across specialized technical disciplines and key U.S. markets, with recruiting relationships built around access, responsiveness, and long-term fit.</p>
      </section>

      <section className={s.cta}>
        <p className={s.label}>FOR HIRING LEADERS</p>
        <h2>Build the team your work demands.</h2>
        <p>Start a direct conversation about the professionals, disciplines, and experience your organization needs.</p>
        <a className={s.primary} href="mailto:careers@agileconsultingsolutions.com">Start a Hiring Conversation</a>
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
