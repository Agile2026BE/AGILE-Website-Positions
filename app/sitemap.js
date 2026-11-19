import { jobs } from "../data/jobs";
import { POSITION_REVIEW_LABEL } from "../lib/positionFreshness";
import { SITE_URL, getReviewedDateISO, getJobDatePosted } from "../lib/seo";
import { HUBS, hubJobs } from "../lib/jobHubs";

export default function sitemap() {
  const lastModified = getReviewedDateISO(POSITION_REVIEW_LABEL);

  const staticRoutes = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/careers`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/privacy-policy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/recruiting-scam-warning`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/candidate-security`, changeFrequency: "yearly", priority: 0.2 },
  ].map((route) => ({ ...route, lastModified }));

  const positionRoutes = jobs
    .filter((job) => job.slug)
    .map((job) => ({
      url: `${SITE_URL}/careers/positions/${job.slug}`,
      lastModified: getJobDatePosted(job),
      changeFrequency: "daily",
      priority: 0.8,
    }));

  // City / state / discipline job pages (lib/jobHubs.js).
  const hubRoutes = HUBS.filter((hub) => hubJobs(hub, jobs).length > 0).map((hub) => ({
    url: `${SITE_URL}/careers/jobs/${hub.slug}`,
    lastModified,
    changeFrequency: "daily",
    priority: 0.85,
  }));

  return [...staticRoutes, ...hubRoutes, ...positionRoutes];
}
