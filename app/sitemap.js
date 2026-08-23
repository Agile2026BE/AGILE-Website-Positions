import { jobs } from "../data/jobs";
import { POSITION_REVIEW_LABEL } from "../lib/positionFreshness";
import { SITE_URL, getReviewedDateISO } from "../lib/seo";

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
      lastModified,
      changeFrequency: "daily",
      priority: 0.8,
    }));

  return [...staticRoutes, ...positionRoutes];
}
