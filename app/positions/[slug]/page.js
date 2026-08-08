import { notFound } from "next/navigation";
import styles from "./page.module.css";
import ContactSection from "../../../components/ContactSection";
import SiteFooter from "../../../components/SiteFooter";
import SiteHeader from "../../../components/SiteHeader";
import { jobs } from "../../../data/jobs";

const lines = (value) =>
  String(value ?? "")
    .split(/\r?\n/)
    .map((line) => line.replace(/^\s*[•*-]\s*/, "").trim())
    .filter(Boolean);

function displayCredential(value) {
  const text = String(value ?? "").trim();
  const normalized = text.toLowerCase();
  if (!text || normalized === "not stated" || normalized === "pe mentioned") return "";
  if (normalized === "pe required") return "PE Required";
  if (normalized === "pe preferred") return "PE Appreciated";
  return text;
}

const usefulWhyConsider = (value) => lines(value).filter((line) => line.toLowerCase() !== "available now.");

export function generateStaticParams() {
  return jobs.filter((job) => job.slug).map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const job = jobs.find((item) => item.slug === slug);
  if (!job) return {};
  return { title: job.seoTitle || `${job.title} | AGILE Position ${job.id}`, description: job.metaDescription || job.summary };
}

export default async function PositionPage({ params }) {
  const { slug } = await params;
  const job = jobs.find((item) => item.slug === slug);
  if (!job) notFound();

  const responsibilities = lines(job.responsibilities);
  const qualifications = lines(job.qualifications);
  const whyConsider = usefulWhyConsider(job.whyConsider);
  const credential = displayCredential(job.credential);

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
            {credential ? <div><dt>Credential</dt><dd>{credential}</dd></div> : null}
            {job.bonus ? <div><dt>Bonus</dt><dd>{job.bonus}</dd></div> : null}
            <div><dt>Position ID</dt><dd>{job.id}</dd></div>
          </dl>
          {responsibilities.length ? <section className={styles.contentSection}><h2>Key Responsibilities</h2><ul>{responsibilities.map((item) => <li key={item}>{item}</li>)}</ul></section> : null}
          {qualifications.length ? <section className={styles.contentSection}><h2>Key Qualifications</h2><ul>{qualifications.map((item) => <li key={item}>{item}</li>)}</ul></section> : null}
          {whyConsider.length ? <section className={styles.contentSection}><h2>Why Consider?</h2>{whyConsider.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section> : null}
          <a className={`hero-primary ${styles.cta}`} href="#contact">Start a Conversation</a>
        </div>
      </section>
      <ContactSection />
      <SiteFooter />
    </main>
  );
}
