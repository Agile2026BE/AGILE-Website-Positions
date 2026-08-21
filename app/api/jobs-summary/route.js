import { NextResponse } from "next/server";
import { jobs } from "../../../data/jobs";
import { stateOptions, disciplineOptions, workplaceOptions, experienceOptions } from "../../../data/filterOptions";
import { buildFilterOptions, parseExperienceRange } from "../../../lib/jobFilters";

export const runtime = "nodejs";

// Public, read-only feed of live AGILE postings and their real filter options —
// the same data, categories, and experience-band definitions already used by
// the positions search on careers.agileconsultingsolutions.com (see
// lib/jobFilters.js and data/filterOptions.js), reshaped so the corporate site
// (a separate deployment) can build a real, filterable Salary Calculator
// against live data instead of duplicating or guessing at it.
const FEATURED_IDS = ["1010", "1040", "1075", "1129", "1181"];

function pick(job) {
  const exp = parseExperienceRange(job.experience);
  return {
    id: job.id,
    title: job.title,
    location: job.location,
    state: job.state,
    discipline: job.discipline,
    workplace: job.workplace,
    market: job.market,
    experience: job.experience,
    experienceMin: exp.min,
    experienceMax: exp.max,
    salaryDisplay: job.salaryDisplay,
    salaryMin: job.salaryMin,
    salaryMax: job.salaryMax,
    slug: job.slug,
  };
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Cache-Control": "public, max-age=300, stale-while-revalidate=600",
  };
}

export async function GET() {
  const mins = jobs.map((job) => job.salaryMin).filter(Boolean);
  const maxs = jobs.map((job) => job.salaryMax).filter(Boolean);
  const dynamicOptions = buildFilterOptions(jobs);

  const payload = {
    count: jobs.length,
    min: mins.length ? Math.min(...mins) : null,
    max: maxs.length ? Math.max(...maxs) : null,
    jobs: jobs.map(pick),
    sample: jobs.slice(0, 5).map(pick),
    featured: FEATURED_IDS.map((id) => jobs.find((job) => job.id === id)).filter(Boolean).map(pick),
    filterOptions: {
      state: stateOptions,
      discipline: disciplineOptions,
      workplace: workplaceOptions,
      market: dynamicOptions.market,
      experience: experienceOptions,
    },
  };

  return NextResponse.json(payload, { headers: corsHeaders() });
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders() });
}
