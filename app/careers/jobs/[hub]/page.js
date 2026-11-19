import { notFound } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";
import ContactSection from "../../../../components/ContactSection";
import SiteFooter from "../../../../components/SiteFooter";
import SiteHeader from "../../../../components/SiteHeader";
import JobHubLinks from "../../../../components/JobHubLinks";
import { jobs } from "../../../../data/jobs";
import { POSITION_REVIEW_LABEL } from "../../../../lib/positionFreshness";
import { formatExperienceDisplay, formatSalaryDisplay, formatWorkplaceDisplay } from "../../../../lib/jobFilters";
import { SITE_URL } from "../../../../lib/seo";
import { HUBS, getHub, hubJobs, hubStats, groupHubJobs, hubFaq, projectTypes } from "../../../../lib/jobHubs";

// City / state / discipline landing pages (see lib/jobHubs.js). Fully
// server-rendered so every posting link and every answer is in the HTML
// that Google, Bing, and AI assistants read.

export const dynamicParams = false;

export function generateStaticParams() {
  return HUBS.map((hub) => ({ hub: hub.slug }));
}

export async function generateMetadata({ params }) {
  const { hub: slug } = await params;
  const hub = getHub(slug);
  if (!hub) return {};
  const list = hubJobs(hub, jobs);
  const stats = hubStats(list);
  const pay = stats.salaryText ? ` Salaries ${stats.salaryText}.` : "";
  return {
    title: hub.title,
    description: `${stats.count} open ${hub.searchName}.${pay} Salary, experience, and hybrid / on-site details listed on every posting. ${POSITION_REVIEW_LABEL}.`,
    alternates: { canonical: `/careers/jobs/${hub.slug}` },
    openGraph: {
      title: hub.title,
      description: `${stats.count} open ${hub.searchName} with salary ranges listed up front.`,
      url: `${SITE_URL}/careers/jobs/${hub.slug}`,
      type: "website",
    },
  };
}

export default async function JobHubPage({ params }) {
  const { hub: slug } = await params;
  const hub = getHub(slug);
  if (!hub) notFound();

  const list = hubJobs(hub, jobs);
  const stats = hubStats(list);
  const groups = groupHubJobs(hub, list);
  const faq = hubFaq(hub, stats, groups);
  const url = `${SITE_URL}/careers/jobs/${hub.slug}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Careers", item: `${SITE_URL}/careers` },
        { "@type": "ListItem", position: 2, name: hub.short, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: hub.h1,
      url,
      description: hub.intro,
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: list.length,
        itemListElement: list.map((job, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${SITE_URL}/careers/positions/${job.slug}`,
          name: `${job.title} — ${job.location}`,
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ];

  const workplaceLine = Object.entries(stats.workplace)
    .sort((a, b) => b[1] - a[1])
    .map(([label, n]) => `${n} ${label}`)
    .join(" · ");

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader />

      <section className={`section ${styles.hub}`}>
        <div className="container">
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/careers">Careers</Link>
            <span aria-hidden="true"> › </span>
            <span>{hub.short}</span>
          </nav>
          <p className={styles.eyebrow}>{stats.count} OPEN POSITIONS · {POSITION_REVIEW_LABEL.toUpperCase()}</p>
          <h1 className={styles.title}>{hub.h1}</h1>
          <p className={styles.intro}>{hub.intro}</p>

          <dl className={styles.stats}>
            <div><dt>Open positions</dt><dd>{stats.count}</dd></div>
            {stats.salaryText ? <div><dt>Salary range</dt><dd className={styles.salary}>{stats.salaryText}</dd></div> : null}
            {stats.typicalText ? <div><dt>Typical midpoint</dt><dd className={styles.salary}>{stats.typicalText}</dd></div> : null}
            {workplaceLine ? <div><dt>Workplace</dt><dd>{workplaceLine}</dd></div> : null}
          </dl>

          {stats.topTypes.length ? (
            <div className={styles.typesBlock}>
              <h2 className={styles.smallHeading}>Project types</h2>
              <ul className={styles.typeChips}>
                {stats.topTypes.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </div>
          ) : null}

          {groups.map((group) => (
            <section key={group.label || "all"} className={styles.group}>
              <h2 className={styles.groupHeading}>
                {group.label ? `${group.label}` : `All ${hub.short}`}
                <span className={styles.groupCount}>{group.jobs.length}</span>
              </h2>
              <ul className={styles.list}>
                {group.jobs.map((job) => {
                  const types = projectTypes(job);
                  return (
                    <li key={job.id}>
                      <Link href={`/careers/positions/${job.slug}`} className={styles.card}>
                        <strong className={styles.cardTitle}>{job.title}</strong>
                        <span className={styles.cardMeta}>
                          <span>{job.location} · {formatWorkplaceDisplay(job.workplace)}</span>
                          <span className={styles.salary}>{formatSalaryDisplay(job.salaryDisplay)}</span>
                        </span>
                        <span className={styles.cardMeta}>
                          <span>{formatExperienceDisplay(job.experience)}{job.credential ? ` · ${job.credential}` : ""}</span>
                          <span className={styles.posId}>Position ID {job.id}</span>
                        </span>
                        {types.length ? (
                          <span className={styles.cardTypes}>
                            {types.slice(0, 3).join(" · ")}{types.length > 3 ? ` +${types.length - 3}` : ""}
                          </span>
                        ) : null}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}

          <section className={styles.faq}>
            <h2 className={styles.groupHeading}>Frequently asked questions</h2>
            {faq.map(({ q, a }) => (
              <details key={q} className={styles.faqItem} open>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </section>

          <JobHubLinks exclude={hub.slug} heading="Browse more engineering jobs" />
        </div>
      </section>

      <ContactSection />
      <SiteFooter />
    </main>
  );
}
