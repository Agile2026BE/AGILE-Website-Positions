import { redirect, notFound } from "next/navigation";
import { jobs } from "../../../data/jobs";

export function generateStaticParams() {
  return jobs.map((job) => ({ id: String(job.id) }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const job = jobs.find((item) => String(item.id) === String(id));
  if (!job) return {};
  return {
    title: job.seoTitle || `${job.title} | AGILE Position ${job.id}`,
    description: job.metaDescription || job.summary,
    alternates: { canonical: `/careers/positions/${job.slug}` },
  };
}

export default async function ShortPositionPage({ params }) {
  const { id } = await params;
  const job = jobs.find((item) => String(item.id) === String(id));
  if (!job || !job.slug) notFound();
  redirect(`/careers/positions/${job.slug}`);
}
