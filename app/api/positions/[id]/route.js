import { NextResponse } from "next/server";
import { jobs } from "../../../../data/jobs";

export const runtime = "nodejs";

// Public, read-only details for ONE live posting, used by AGILE Mission Control's
// "Import from Website" button. Only fields already shown on the public
// position page are returned. Internal client names are never part of job data.

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Cache-Control": "public, max-age=300, stale-while-revalidate=600",
  };
}

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders() });
}

export async function GET(_request, { params }) {
  const { id } = await params;
  const job = jobs.find((j) => String(j.id) === String(id));
  if (!job) {
    return NextResponse.json({ error: "not_found" }, { status: 404, headers: corsHeaders() });
  }
  return NextResponse.json(
    {
      position: {
        id: job.id,
        title: job.title,
        discipline: job.discipline,
        specialty: job.specialty,
        market: job.market,
        location: job.location,
        state: job.state,
        workplace: job.workplace,
        experience: job.experience,
        credential: job.credential,
        bonus: job.bonus,
        openings: job.openings,
        salaryDisplay: job.salaryDisplay,
        salaryMin: job.salaryMin,
        salaryMax: job.salaryMax,
        summary: job.summary,
        responsibilities: job.responsibilities,
        qualifications: job.qualifications,
        whyConsider: job.whyConsider,
        slug: job.slug,
        url: `https://www.agileconsultingsolutions.com/p/${job.id}`,
      },
    },
    { headers: corsHeaders() }
  );
}
