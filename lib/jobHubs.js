// Job hub pages: one crawlable landing page per city / state / discipline,
// served at /careers/jobs/<slug>. Built 2026-11-18 so the site answers
// searches like "NYC electrical engineering jobs" or "MEP engineer jobs in
// New Jersey" directly (Google, Bing, and the AI assistants that read them).
//
// Rules:
// - Every number on a hub page (counts, salary range, PE counts, workplace
//   mix, project types) is computed from the live posting data at build time.
//   Nothing is typed in by hand, so the pages stay accurate as postings are
//   added, filled, or set Dormant.
// - Never put a client name in this file (see CLAUDE.md, Confidentiality).
// - Only build a hub where there are enough live postings to fill it; thin
//   pages hurt search rankings. Adding a hub = add an entry to HUBS.

import { parseSalaryDisplay } from "./salaryChecks.js";

// Same three labels as formatWorkplaceDisplay in lib/jobFilters.js. Inlined so
// this file stays importable from plain Node (scripts/submit-indexnow.mjs);
// jobFilters.js uses extensionless imports that only the Next.js build resolves.
function workplaceLabel(text) {
  const t = String(text || "").toLowerCase().replace(/[-–—]/g, " ");
  if (t.includes("hybrid")) return "Hybrid";
  if (t.includes("remote")) return "Remote";
  if (t.includes("onsite") || t.includes("on site") || t.includes("in office")) return "On-Site";
  return String(text || "").trim() || "Not stated";
}

export const DISCIPLINE_LABELS = {
  "Electrical Engineering": "Electrical Engineering",
  "Mechanical HVAC": "Mechanical / HVAC",
  "Mechanical Plumbing and Fire Protection": "Plumbing & Fire Protection",
  "Civil Engineering": "Civil Engineering",
  "Structural Engineering": "Structural Engineering",
  "MEP Project Manager": "MEP Project Management",
  "MEP Executive Leadership": "MEP Executive Leadership",
  Commissioning: "Commissioning",
  "BIM/VDC": "BIM / VDC",
};

const STATE_ABBR = {
  NY: "New York", NJ: "New Jersey", PA: "Pennsylvania", FL: "Florida", CT: "Connecticut",
  CO: "Colorado", NC: "North Carolina", MA: "Massachusetts", CA: "California",
};

const isNYC = (job) => /\bNYC\b|New York City/i.test(String(job.location));
const inState = (name) => (job) => String(job.state).split("|").map((s) => s.trim()).includes(name);
const isDiscipline = (name) => (job) => job.discipline === name;

// group: how postings are sectioned on the page — "discipline", "city", "state", or null.
export const HUBS = [
  {
    slug: "nyc-mep-engineering-jobs",
    kind: "city",
    place: "New York City",
    filter: isNYC,
    group: "discipline",
    title: "MEP Engineering Jobs in NYC | Electrical, HVAC & Plumbing",
    h1: "MEP Engineering Jobs in New York City (NYC)",
    short: "NYC MEP Engineering Jobs",
    searchName: "MEP engineering jobs in NYC",
    intro:
      "Open MEP engineer jobs in New York City — electrical, mechanical / HVAC, and plumbing & fire protection engineering and design roles with building systems consulting firms, plus civil and structural positions. Every posting lists the salary range, experience, and workplace up front.",
  },
  {
    slug: "nyc-electrical-engineering-jobs",
    kind: "city",
    place: "New York City",
    filter: (j) => isNYC(j) && j.discipline === "Electrical Engineering",
    group: null,
    title: "Electrical Engineering Jobs in NYC | MEP Electrical Engineer",
    h1: "Electrical Engineering Jobs in New York City (NYC)",
    short: "NYC Electrical Engineering Jobs",
    searchName: "electrical engineer jobs in NYC",
    intro:
      "Open electrical engineer jobs in New York City, from electrical designer and electrical project engineer to senior electrical engineer, electrical project manager, and electrical design manager. These are MEP / building systems electrical roles — power distribution, lighting, fire alarm, life safety, emergency power, and low voltage (ICT, security, AV) design — with salary ranges listed on every posting.",
  },
  {
    slug: "nyc-mechanical-hvac-engineering-jobs",
    kind: "city",
    place: "New York City",
    filter: (j) => isNYC(j) && j.discipline === "Mechanical HVAC",
    group: null,
    title: "Mechanical & HVAC Engineering Jobs in NYC | MEP Mechanical",
    h1: "Mechanical / HVAC Engineering Jobs in New York City (NYC)",
    short: "NYC Mechanical / HVAC Engineering Jobs",
    searchName: "HVAC and mechanical engineer jobs in NYC",
    intro:
      "Open mechanical engineer and HVAC engineer jobs in New York City — mechanical designer, project engineer, senior mechanical engineer, and mechanical project manager roles in MEP / building systems design, plus building energy analyst and sustainability engineer positions, with salary ranges listed on every posting.",
  },
  {
    slug: "nyc-plumbing-fire-protection-engineering-jobs",
    kind: "city",
    place: "New York City",
    filter: (j) => isNYC(j) && j.discipline === "Mechanical Plumbing and Fire Protection",
    group: null,
    title: "Plumbing & Fire Protection Engineering Jobs in NYC",
    h1: "Plumbing & Fire Protection Engineering Jobs in New York City (NYC)",
    short: "NYC Plumbing & Fire Protection Jobs",
    searchName: "plumbing and fire protection engineer jobs in NYC",
    intro:
      "Open plumbing engineer, fire protection engineer, and plumbing / fire protection designer jobs in New York City — MEP building systems roles in plumbing, fire protection, and sprinkler system design, with salary ranges listed on every posting.",
  },
  {
    slug: "new-york-state-engineering-jobs",
    kind: "state",
    place: "New York State",
    filter: inState("New York"),
    group: "city",
    title: "Engineering Jobs in New York | MEP, Electrical, HVAC & Civil",
    h1: "MEP & Civil Engineering Jobs in New York State",
    short: "New York State Engineering Jobs",
    searchName: "engineering jobs in New York",
    intro:
      "Open engineering jobs across New York — New York City and Long Island, plus Buffalo, Albany, Rochester, and the Capital Region and Western New York. Electrical, mechanical / HVAC, plumbing & fire protection, and civil engineering roles, each with the salary range, experience, and workplace listed up front.",
  },
  {
    slug: "new-jersey-engineering-jobs",
    kind: "state",
    place: "New Jersey",
    filter: inState("New Jersey"),
    group: "city",
    title: "Engineering Jobs in New Jersey | MEP, Electrical & Civil",
    h1: "MEP & Civil Engineering Jobs in New Jersey",
    short: "New Jersey Engineering Jobs",
    searchName: "engineering jobs in New Jersey",
    intro:
      "Open engineering jobs in New Jersey — electrical, mechanical / HVAC, plumbing & fire protection, civil, and structural engineering roles across North, Central, and South Jersey, each with the salary range, experience, and workplace listed up front.",
  },
  {
    slug: "south-florida-engineering-jobs",
    kind: "state",
    place: "South Florida",
    filter: inState("Florida"),
    group: "city",
    title: "MEP Engineering Jobs in South Florida | Miami, Hollywood, Fort Lauderdale",
    h1: "MEP Engineering Jobs in South Florida",
    short: "South Florida Engineering Jobs",
    searchName: "MEP engineering jobs in South Florida",
    intro:
      "Open MEP engineer jobs in South Florida — Hollywood, Miami, and Fort Lauderdale. Plumbing & fire protection, mechanical / HVAC, and electrical engineering roles in building systems design, each with the salary range, experience, and workplace listed up front.",
  },
  {
    slug: "pennsylvania-engineering-jobs",
    kind: "state",
    place: "Pennsylvania",
    filter: inState("Pennsylvania"),
    group: "city",
    title: "Engineering Jobs in Pennsylvania | MEP Jobs in Philadelphia & NEPA",
    h1: "MEP Engineering Jobs in Pennsylvania",
    short: "Pennsylvania Engineering Jobs",
    searchName: "engineering jobs in Pennsylvania",
    intro:
      "Open engineering jobs in Pennsylvania — Philadelphia and Northeastern Pennsylvania (Clarks Summit / Scranton area). Electrical, mechanical / HVAC, plumbing & fire protection, and structural engineering roles, each with the salary range, experience, and workplace listed up front.",
  },
  {
    slug: "electrical-engineering-jobs",
    kind: "discipline",
    place: "",
    filter: isDiscipline("Electrical Engineering"),
    group: "state",
    title: "Electrical Engineering Jobs | MEP & Building Systems Electrical",
    h1: "Electrical Engineering Jobs — MEP & Building Systems",
    short: "Electrical Engineering Jobs",
    searchName: "electrical engineering jobs",
    intro:
      "Open electrical engineer jobs in MEP and building systems design — electrical designer, project engineer, senior electrical engineer, electrical project manager, design manager, and team lead roles. Work spans power distribution, lighting, fire alarm, life safety, emergency power, and low / medium voltage systems. Every posting lists the salary range, experience, and workplace up front.",
  },
  {
    slug: "mechanical-hvac-engineering-jobs",
    kind: "discipline",
    place: "",
    filter: isDiscipline("Mechanical HVAC"),
    group: "state",
    title: "Mechanical & HVAC Engineering Jobs | MEP Mechanical Engineer",
    h1: "Mechanical / HVAC Engineering Jobs — MEP & Building Systems",
    short: "Mechanical / HVAC Engineering Jobs",
    searchName: "mechanical and HVAC engineering jobs",
    intro:
      "Open mechanical engineer and HVAC engineer jobs in MEP and building systems design — mechanical designer, project engineer, senior mechanical engineer, mechanical project manager, and energy / sustainability roles. Every posting lists the salary range, experience, and workplace up front.",
  },
  {
    slug: "plumbing-fire-protection-engineering-jobs",
    kind: "discipline",
    place: "",
    filter: isDiscipline("Mechanical Plumbing and Fire Protection"),
    group: "state",
    title: "Plumbing & Fire Protection Engineering Jobs | MEP Plumbing Engineer",
    h1: "Plumbing & Fire Protection Engineering Jobs",
    short: "Plumbing & Fire Protection Jobs",
    searchName: "plumbing and fire protection engineering jobs",
    intro:
      "Open plumbing engineer, fire protection engineer, and plumbing / fire protection designer jobs in MEP building systems design — domestic water, sanitary and storm drainage, sprinkler and standpipe, fire pump, and medical gas design. Every posting lists the salary range, experience, and workplace up front.",
  },
  {
    slug: "civil-engineering-jobs",
    kind: "discipline",
    place: "",
    filter: isDiscipline("Civil Engineering"),
    group: "state",
    title: "Civil Engineering Jobs | Transportation, Site/Civil & Water",
    h1: "Civil Engineering Jobs",
    short: "Civil Engineering Jobs",
    searchName: "civil engineering jobs",
    intro:
      "Open civil engineer jobs — transportation and highway engineering, site / civil and land development, water / wastewater, and civil CAD design roles, from project engineer to senior project manager and group leadership. Every posting lists the salary range, experience, and workplace up front.",
  },
];

export function getHub(slug) {
  return HUBS.find((hub) => hub.slug === slug) || null;
}

export function hubJobs(hub, jobs) {
  return jobs.filter((job) => job.slug && hub.filter(job)).sort((a, b) => Number(b.id) - Number(a.id));
}

// Hubs a given posting appears on (used for "More jobs like this" links).
export function hubsForJob(job) {
  return HUBS.filter((hub) => hub.filter(job));
}

export function disciplineLabel(name) {
  return DISCIPLINE_LABELS[name] || name;
}

export function projectTypes(job) {
  return String(job.market || "")
    .split("|")
    .map((t) => t.trim())
    .filter(Boolean);
}

// "Hollywood, FL, Philadelphia, PA" / "NYC, Long Island, NY, Voorhees, NJ" /
// "Fresno, CA or Rancho Cordova, CA" -> [{ city, state }]
export function citiesOf(job) {
  const tokens = String(job.location || "")
    .split(/[;,]|\bor\b|\band\b/)
    .map((t) => t.replace(/\(.*?\)/g, "").replace(/\bAreas?\b/i, "").trim())
    .filter(Boolean);
  const out = [];
  let pending = [];
  for (const token of tokens) {
    if (/^NYC$/i.test(token)) {
      out.push({ city: "New York City", state: "New York" });
      pending = [];
      continue;
    }
    if (STATE_ABBR[token]) {
      for (const city of pending) out.push({ city, state: STATE_ABBR[token] });
      pending = [];
      continue;
    }
    pending.push(token);
  }
  return out;
}

function median(values) {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : Math.round((sorted[mid - 1] + sorted[mid]) / 2);
}

export const money = (n) => `$${(Math.round(n / 1000) * 1000).toLocaleString("en-US")}`;

export function hubStats(list) {
  const salaries = list.map((job) => parseSalaryDisplay(job.salaryDisplay)).filter(Boolean);
  const low = salaries.length ? Math.min(...salaries.map((s) => s.min)) : null;
  const high = salaries.length ? Math.max(...salaries.map((s) => s.max)) : null;
  const typical = median(salaries.map((s) => (s.min + s.max) / 2));

  const workplace = {};
  for (const job of list) {
    const label = workplaceLabel(job.workplace);
    workplace[label] = (workplace[label] || 0) + 1;
  }

  const types = {};
  for (const job of list) for (const t of projectTypes(job)) types[t] = (types[t] || 0) + 1;
  const topTypes = Object.entries(types).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, 8).map(([t]) => t);

  const peListed = list.filter((job) => /\bPE\b/.test(String(job.credential || ""))).length;
  const peRequired = list.filter((job) => /\bPE\b[^;,]*required/i.test(String(job.credential || ""))).length;

  const years = list
    .map((job) => String(job.experience || "").match(/\d+/))
    .filter(Boolean)
    .map((m) => Number(m[0]));

  const cities = new Set();
  for (const job of list) for (const c of citiesOf(job)) cities.add(c.city);

  return {
    count: list.length,
    salaryLow: low,
    salaryHigh: high,
    salaryTypical: typical,
    salaryText: low && high ? `${money(low)} – ${money(high)}` : null,
    typicalText: typical ? money(typical) : null,
    workplace,
    topTypes,
    peListed,
    peRequired,
    minYears: years.length ? Math.min(...years) : null,
    maxYears: years.length ? Math.max(...years) : null,
    cityCount: cities.size,
  };
}

// Sections of postings for the hub page.
export function groupHubJobs(hub, list) {
  if (!hub.group) return [{ label: null, jobs: list }];
  const groups = new Map();
  const add = (key, job) => {
    if (!groups.has(key)) groups.set(key, []);
    if (!groups.get(key).includes(job)) groups.get(key).push(job);
  };
  for (const job of list) {
    if (hub.group === "discipline") add(disciplineLabel(job.discipline), job);
    else if (hub.group === "state") {
      for (const st of String(job.state).split("|").map((s) => s.trim()).filter(Boolean)) add(st, job);
    } else if (hub.group === "city") {
      const target = hub.place === "South Florida" ? "Florida" : hub.place.replace(" State", "");
      const here = citiesOf(job).filter((c) => c.state === target).map((c) => c.city);
      if (here.length) for (const city of here) add(city, job);
      else add(`Multiple locations in ${hub.place}`, job);
    }
  }
  return [...groups.entries()]
    .map(([label, jobs]) => ({ label, jobs }))
    .sort((a, b) => b.jobs.length - a.jobs.length || a.label.localeCompare(b.label));
}

// FAQ — every answer is generated from the live numbers above.
export function hubFaq(hub, stats, groups) {
  const where = hub.place ? ` in ${hub.place}` : "";
  const name = hub.searchName;
  const faq = [];

  const sections = groups.filter((g) => g.label).map((g) => `${g.label} (${g.jobs.length})`);
  faq.push({
    q: `How many ${name} are open right now?`,
    a: `AGILE currently has ${stats.count} open ${stats.count === 1 ? "position" : "positions"}${hub.kind === "discipline" ? "" : where}.${sections.length ? ` By ${hub.group === "city" ? "location" : hub.group}: ${sections.join(", ")}.` : ""} The list on this page updates automatically as positions open and fill.`,
  });

  if (stats.salaryText) {
    faq.push({
      q: `How much do ${name} pay?`,
      a: `Salary ranges on these postings run from ${money(stats.salaryLow)} to ${money(stats.salaryHigh)}${stats.typicalText ? `, with a typical midpoint around ${stats.typicalText}` : ""}. Each posting lists its own range, set by experience level and role.`,
    });
  }

  if (stats.minYears !== null) {
    faq.push({
      q: `How much experience do I need?`,
      a: stats.minYears === stats.maxYears
        ? `These postings ask for about ${stats.minYears} years of experience.`
        : `Openings range from ${stats.minYears}+ years of experience to senior and leadership roles asking for ${stats.maxYears}+ years, so there are roles for early-career, mid-level, and senior engineers.`,
    });
  }

  if (stats.peListed > 0) {
    faq.push({
      q: `Do I need a PE license?`,
      a: `${stats.peListed} of the ${stats.count} postings mention a PE license${stats.peRequired ? ` (${stats.peRequired} list it as required; the rest as favored or preferred)` : ", as favored or preferred rather than required"}. Engineers working toward a PE, and EITs, are a fit for many of these roles.`,
    });
  }

  const wp = Object.entries(stats.workplace).sort((a, b) => b[1] - a[1]);
  if (wp.length) {
    faq.push({
      q: `Are these jobs hybrid, remote, or on-site?`,
      a: `${wp.map(([label, n]) => `${n} ${label.toLowerCase()}`).join(", ")}. Each posting states its own workplace arrangement.`,
    });
  }

  if (stats.topTypes.length) {
    faq.push({
      q: `What kinds of projects will I work on?`,
      a: `The most common project types across these postings are ${stats.topTypes.slice(0, 6).join(", ")}.`,
    });
  }

  faq.push({
    q: `How do I apply?`,
    a: `Open any posting and use "Start a Conversation" to reach AGILE Business Consulting directly. It is a conversation with a recruiter, not a formal application, and there is no cost to candidates.`,
  });

  return faq;
}
