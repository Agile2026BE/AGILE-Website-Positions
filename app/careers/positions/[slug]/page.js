import { notFound } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";
import ContactSection from "../../../../components/ContactSection";
import SiteFooter from "../../../../components/SiteFooter";
import SiteHeader from "../../../../components/SiteHeader";
import PositionBackLink from "../../../../components/PositionBackLink";
import PositionContactCta from "../../../../components/PositionContactCta";
import PositionPageShortlist from "../../../../components/PositionPageShortlist";
import { jobs } from "../../../../data/jobs";
import { jobLocations } from "../../../../data/jobLocations";
import { freshWhyConsider, POSITION_REVIEW_LABEL } from "../../../../lib/positionFreshness";
import { formatExperienceDisplay, formatSalaryDisplay, formatWorkplaceDisplay } from "../../../../lib/jobFilters";
import { getSimilarJobs } from "../../../../lib/similarJobs";
import { SITE_URL, getReviewedDateISO, addDaysISO } from "../../../../lib/seo";

const lines = (value) =>
  String(value ?? "")
    .split(/\r?\n/)
    .map((line) => line.replace(/^\s*[•*-]\s*/, "").trim())
    .filter(Boolean);

// Builds the schema.org jobLocation value for a job's JobPosting JSON-LD.
//
// When we have clean, confirmed location data for this Position ID in
// data/jobLocations.js, emit it as an array of Place/PostalAddress objects
// — one per office the posting covers, each with a real postal code when
// we have one. This is what lets Google Jobs geocode the posting precisely
// and match it against a candidate's "jobs near me" radius search, and it
// correctly represents multi-office postings instead of jamming two cities
// into a single addressLocality string.
//
// For any Position ID not yet in jobLocations.js, fall back to the original
// single-Place behavior built from the free-text job.location/job.state
// fields, so nothing regresses for postings we haven't cleaned up yet.
function buildJobLocation(job) {
  const locations = jobLocations[String(job.id)];

  if (locations && locations.length) {
    return locations.map((loc) => ({
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: loc.city,
        addressRegion: loc.state,
        ...(loc.zip ? { postalCode: loc.zip } : {}),
        addressCountry: "US",
      },
    }));
  }

  return {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressLocality: job.location,
      addressRegion: job.state,
      addressCountry: "US",
    },
  };
}

export function generateStaticParams() {
  return jobs.filter((job) => job.slug).map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const job = jobs.find((item) => item.slug === slug);

  if (!job) return {};

  return {
    title: job.seoTitle || `${job.title} | AGILE Position ${job.id}`,
    description: job.metaDescription || job.summary,
    alternates: { canonical: `/careers/positions/${job.slug}` },
  };
}

export default async function PositionPage({ params }) {
  const { slug } = await params;
  const job = jobs.find((item) => item.slug === slug);

  if (!job) notFound();

  const responsibilities = lines(job.responsibilities);
  const qualifications = lines(job.qualifications);
  const whyConsider = freshWhyConsider(job);
  const similarJobs = getSimilarJobs(job, jobs, 3);

  const datePosted = getReviewedDateISO(POSITION_REVIEW_LABEL);
  const jobPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.metaDescription || job.summary || job.title,
    identifier: {
      "@type": "PropertyValue",
      name: "AGILE Business Consulting",
      value: job.id,
    },
    datePosted,
    validThrough: `${addDaysISO(datePosted, 60)}T23:59:59Z`,
    employmentType: "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: "AGILE Business Consulting",
      sameAs: SITE_URL,
    },
    jobLocation: buildJobLocation(job),
    ...(job.salaryMin && job.salaryMax
      ? {
          baseSalary: {
            "@type": "MonetaryAmount",
            currency: "USD",
            value: {
              "@type": "QuantitativeValue",
              minValue: job.salaryMin,
              maxValue: job.salaryMax,
              unitText: "YEAR",
            },
          },
        }
      : {}),
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingJsonLd) }}
      />
      <SiteHeader />

      <section className={`section position-detail ${styles.detail}`}>
        <div className="container">
          <PositionBackLink className={styles.backLink} />
          <p className={`contact-eyebrow ${styles.eyebrow}`}>AVAILABLE POSITION · {POSITION_REVIEW_LABEL.toUpperCase()}</p>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>{job.title}</h1>
            <PositionPageShortlist job={job} />
          </div>
          {job.summary ? <p className="section-copy">{job.summary}</p> : null}

          <dl className={`position-detail-grid ${styles.grid}`}>
            <div><dt>Location</dt><dd>{job.location}</dd></div>
            <div><dt>State</dt><dd>{job.state}</dd></div>
            <div><dt>Workplace</dt><dd>{formatWorkplaceDisplay(job.workplace)}</dd></div>
            <div><dt>Salary</dt><dd className={styles.salaryValue}>{formatSalaryDisplay(job.salaryDisplay)}</dd></div>
            <div><dt>Experience</dt><dd>{formatExperienceDisplay(job.experience)}</dd></div>
            <div><dt>Discipline</dt><dd>{job.discipline}</dd></div>
            {job.specialty ? <div><dt>Specialty</dt><dd>{job.specialty}</dd></div> : null}
            {job.market ? <div><dt>Market</dt><dd>{job.market}</dd></div> : null}
            {job.credential ? <div><dt>Credential</dt><dd>{job.credential}</dd></div> : null}
            {job.bonus ? <div><dt>Bonus</dt><dd>{job.bonus}</dd></div> : null}
            <div><dt>Position ID</dt><dd>{job.id}</dd></div>
          </dl>

          {responsibilities.length ? (
            <section className={styles.contentSection}>
              <h2>Key Responsibilities</h2>
              <ul>{responsibilities.map((item) => <li key={item}>{item}</li>)}</ul>
            </section>
          ) : null}

          {qualifications.length ? (
            <section className={styles.contentSection}>
              <h2>Key Qualifications</h2>
              <ul>{qualifications.map((item) => <li key={item}>{item}</li>)}</ul>
            </section>
          ) : null}

          {whyConsider.length ? (
            <section className={styles.contentSection}>
              <h2>Why Consider?</h2>
              {whyConsider.map((paragraph, index) => <p key={`${paragraph}-${index}`}>{paragraph}</p>)}
            </section>
          ) : null}

          {similarJobs.length ? (
            <section className={`${styles.contentSection} ${styles.similarBlock}`}>
              <h2>Similar Positions</h2>
              <div className={styles.similarList}>
                {similarJobs.map((similar) => (
                  <Link key={similar.id ?? similar.slug} href={`/careers/positions/${similar.slug}`} className={styles.similarCard}>
                    <strong>{similar.title}</strong>
                    <span className={styles.similarMeta}>
                      <span>{similar.location}</span>
                      <span className={styles.salaryValue}>{formatSalaryDisplay(similar.salaryDisplay)}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          <PositionContactCta className={`hero-primary ${styles.cta}`} />
        </div>
      </section>

      <ContactSection />
      <SiteFooter />
    </main>
  );
}
