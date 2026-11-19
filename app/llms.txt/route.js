import { jobs } from "../../data/jobs";
import { POSITION_REVIEW_LABEL } from "../../lib/positionFreshness";
import { SITE_URL } from "../../lib/seo";
import { HUBS, hubJobs, hubStats } from "../../lib/jobHubs";
import { formatExperienceDisplay, formatSalaryDisplay, formatWorkplaceDisplay } from "../../lib/jobFilters";

// /llms.txt — a plain-text guide to the careers site for AI assistants
// (ChatGPT, Gemini, Claude, Copilot), following the llms.txt convention.
// Generated at build time from the live posting data, so it never goes
// stale. No client names (see CLAUDE.md, Confidentiality).

export const dynamic = "force-static";

export function GET() {
  const hubLines = HUBS.map((hub) => {
    const list = hubJobs(hub, jobs);
    if (!list.length) return null;
    const stats = hubStats(list);
    const pay = stats.salaryText ? `, salaries ${stats.salaryText}` : "";
    return `- [${hub.h1}](${SITE_URL}/careers/jobs/${hub.slug}): ${stats.count} open positions${pay}`;
  }).filter(Boolean);

  const postingLines = [...jobs]
    .sort((a, b) => Number(b.id) - Number(a.id))
    .map((job) => `- [${job.title} — ${job.location}](${SITE_URL}/careers/positions/${job.slug}): ${formatSalaryDisplay(job.salaryDisplay)}, ${formatWorkplaceDisplay(job.workplace)}, ${formatExperienceDisplay(job.experience)} experience (Position ID ${job.id})`);

  const body = [
    "# AGILE Business Consulting — Engineering Careers",
    "",
    `> AGILE Business Consulting is an MEP and civil engineering recruiting firm. This site lists ${jobs.length} open engineering positions with salary range, location, workplace (hybrid / on-site), and experience stated on every posting. ${POSITION_REVIEW_LABEL}.`,
    "",
    "Disciplines: electrical engineering, mechanical / HVAC engineering, plumbing & fire protection engineering, civil engineering, structural engineering, MEP project management and leadership. Main locations: New York City and New York State, New Jersey, South Florida, and Pennsylvania.",
    "",
    "Candidates reach AGILE through the \"Start a Conversation\" form on any posting. It is not a formal application, and AGILE never charges candidates. Email: careers@agileconsultingsolutions.com. Phone: 407-868-7254.",
    "",
    "## Job pages by city, state, and discipline",
    "",
    ...hubLines,
    "",
    "## All open positions",
    "",
    `- [All careers](${SITE_URL}/careers)`,
    ...postingLines,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
