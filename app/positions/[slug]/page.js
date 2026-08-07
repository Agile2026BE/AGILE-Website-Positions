import { notFound } from "next/navigation";
import styles from "./page.module.css";
import ContactSection from "../../../components/ContactSection";
import SiteFooter from "../../../components/SiteFooter";
import SiteHeader from "../../../components/SiteHeader";
import { jobs } from "../../../data/jobs";

export function generateStaticParams() {
  return jobs
    .filter((job) => job.slug)
    .map((job) => ({ slug: job.slug }));
}

export default async function PositionPage({ params }) {
  const { slug } = await params;
  const job = jobs.find((item) => item.slug === slug);

  if (!job) {
    notFound();
  }

  return (
    <main>
      <SiteHeader />

      <section className={`section position-detail ${styles.detail}`}>
        <div className="container">
          <p className={`contact-eyebrow ${styles.eyebrow}`}>AVAILABLE POSITION</p>
          <h1 className="section-title">{job.title}</h1>
          {job.summary ? <p className="section-copy">{job.summary}</p> : null}

          <dl className={`position-detail-grid ${styles.grid}`}>
            <div><dt>Location</dt><dd>{job.location}</dd></div>
            <div><dt>State</dt><dd>{job.state}</dd></div>
            <div><dt>Workplace</dt><dd>{job.workplace}</dd></div>
            <div><dt>Salary</dt><dd>{job.salaryDisplay}</dd></div>
            <div><dt>Experience</dt><dd>{job.experience}</dd></div>
            <div><dt>Discipline</dt><dd>{job.discipline}</dd></div>
            {job.specialty ? <div><dt>Specialty</dt><dd>{job.specialty}</dd></div> : null}
            {job.market ? <div><dt>Market</dt><dd>{job.market}</dd></div> : null}
            {job.credential ? <div><dt>Credential</dt><dd>{job.credential}</dd></div> : null}
            {job.bonus ? <div><dt>Bonus</dt><dd>{job.bonus}</dd></div> : null}
          </dl>

          <a className={`hero-primary ${styles.cta}`} href="#contact">Start a Conversation</a>
        </div>
      </section>

      <ContactSection />
      <SiteFooter />
    </main>
  );
}
