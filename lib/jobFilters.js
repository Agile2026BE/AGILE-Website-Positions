import { experienceOptions } from "../data/filterOptions";

const normalize = (value) => String(value ?? "").trim().toLowerCase();

const splitValues = (value) =>
  String(value ?? "")
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);

const uniqueSorted = (values) =>
  [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));

const stateAliases = {
  "new york": ["new york", "ny"],
  "new jersey": ["new jersey", "nj"],
  pennsylvania: ["pennsylvania", "pa"],
  massachusetts: ["massachusetts", "ma"],
  florida: ["florida", "fl"],
  connecticut: ["connecticut", "ct"],
  colorado: ["colorado", "co"],
  california: ["california", "ca"],
  "north carolina": ["north carolina", "nc"],
};

const workplaceGroup = (value) => {
  const text = normalize(value).replace(/[-–—]/g, " ");
  if (text.includes("remote")) return "remote";
  if (text.includes("hybrid")) return "hybrid";
  if (text.includes("onsite") || text.includes("on site")) return "onsite";
  return text;
};

const stateMatches = (value, selected) => {
  if (!selected) return true;
  const aliases = stateAliases[normalize(selected)] || [normalize(selected)];
  const values = splitValues(value).map(normalize);
  return values.some((item) => aliases.some((alias) => item === alias || item.includes(alias)));
};

const disciplineMatches = (job, selected) => {
  if (!selected) return true;
  const haystack = normalize([job.discipline, job.specialty, job.title].join(" "));
  const selectedValue = normalize(selected);
  const aliases = {
    "mechanical hvac": ["mechanical", "hvac"],
    "mechanical plumbing and fire protection": ["plumbing", "fire protection", "mechanical plumbing"],
    "ict/av technology": ["ict", "audio visual", "a/v", "av ", "low voltage", "technology"],
    "civil engineering": ["civil"],
    "structural engineering": ["structural"],
    "resident engineering": ["resident engineer", "resident engineering"],
    "construction management": ["construction management", "construction manager"],
    "mep executive leadership": ["vice president", "vp ", "principal", "executive", "director", "mep leadership"],
    "electrical engineering": ["electrical"],
  };
  return (aliases[selectedValue] || [selectedValue]).some((term) => haystack.includes(term));
};

const marketMatches = (value, selectedMarkets) => {
  if (!selectedMarkets?.length) return true;
  const jobMarkets = splitValues(value).map(normalize);
  return selectedMarkets.some((selected) => jobMarkets.includes(normalize(selected)));
};

// Postings write "experience" as free text ("5+ years", "Minimum 10 years",
// "3–7 years", "Not stated", etc.). Parse it into a numeric range so it can be
// compared against a selected band without changing the original wording
// anywhere it's still displayed on the card or position detail.
export function parseExperienceRange(text) {
  if (!text) return { min: null, max: null };
  const raw = String(text).toLowerCase();
  if (raw.includes("not stated")) return { min: null, max: null };

  const numbers = (raw.match(/\d+/g) || []).map(Number);
  if (!numbers.length) return { min: null, max: null };

  const hasPlus = raw.includes("+");
  if (numbers.length === 1) {
    return hasPlus || raw.includes("minimum") ? { min: numbers[0], max: null } : { min: numbers[0], max: numbers[0] };
  }
  const min = Math.min(numbers[0], numbers[1]);
  const max = hasPlus ? null : Math.max(numbers[0], numbers[1]);
  return { min, max };
}

// A candidate selects the band that best matches their own years of
// experience. That's read as a ceiling on what they've achieved (someone who
// picks "6-10 years" has at most 10), so they qualify for any posting whose
// stated minimum requirement is at or below that ceiling — e.g. a candidate
// with 10 years qualifies for a posting requiring "5+ years." A posting with
// no stated/parseable minimum has no experience barrier, so it always shows.
const experienceMatches = (job, selectedBand) => {
  if (!selectedBand) return true;
  const band = experienceOptions.find((option) => option.value === selectedBand);
  if (!band) return true;
  const { min } = parseExperienceRange(job.experience);
  if (min == null) return true;
  return min <= band.max;
};

// Postings with no stated experience requirement read literally as "Not
// stated" in the source data — clear internally, but weak client-facing copy.
// Display it as "Market Rate" instead everywhere the raw text is shown to a
// candidate; the underlying data and matching logic (experienceMatches
// above) are untouched, this only changes what's printed on screen.
export function formatExperienceDisplay(text) {
  if (!text) return text;
  return String(text).trim().toLowerCase() === "not stated" ? "Market Rate" : text;
}

export function buildFilterOptions(jobs) {
  return {
    state: uniqueSorted(jobs.flatMap((job) => splitValues(job.state))),
    discipline: uniqueSorted(jobs.flatMap((job) => splitValues(job.discipline))),
    workplace: uniqueSorted(jobs.flatMap((job) => splitValues(job.workplace))),
    market: uniqueSorted(jobs.flatMap((job) => splitValues(job.market))),
  };
}

export function filterJobs(jobs,{ state="",discipline="",minimumSalary="",workplace="",market=[],experience="",query="" }={}) {
  const normalizedQuery = normalize(query);
  const minimum = Number(minimumSalary) || 0;

  return jobs.filter((job) => {
    if (!stateMatches(job.state, state)) return false;
    if (!disciplineMatches(job, discipline)) return false;
    if (workplace && workplaceGroup(job.workplace) !== normalize(workplace)) return false;
    if (!marketMatches(job.market, market)) return false;
    if (!experienceMatches(job, experience)) return false;

    if (minimum) {
      const salaryCeiling = Number(job.salaryMax || job.salaryMin || 0);
      if (salaryCeiling < minimum) return false;
    }

    if (normalizedQuery) {
      const searchable = [job.id,job.title,job.summary,job.location,job.state,job.discipline,job.specialty,job.market,job.credential].map(normalize).join(" ");
      if (!searchable.includes(normalizedQuery)) return false;
    }
    return true;
  });
}
