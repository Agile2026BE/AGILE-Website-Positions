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

const fieldMatches = (value, selected) =>
  !selected || splitValues(value).some((item) => normalize(item) === normalize(selected));

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

export function buildFilterOptions(jobs) {
  return {
    state: uniqueSorted(jobs.flatMap((job) => splitValues(job.state))),
    discipline: uniqueSorted(jobs.flatMap((job) => splitValues(job.discipline))),
    workplace: uniqueSorted(jobs.flatMap((job) => splitValues(job.workplace))),
    market: uniqueSorted(jobs.flatMap((job) => splitValues(job.market))),
  };
}

export function filterJobs(jobs,{ state="",discipline="",minimumSalary="",workplace="",market="",query="" }={}) {
  const normalizedQuery = normalize(query);
  const minimum = Number(minimumSalary) || 0;

  return jobs.filter((job) => {
    if (!stateMatches(job.state, state)) return false;
    if (!disciplineMatches(job, discipline)) return false;
    if (workplace && workplaceGroup(job.workplace) !== normalize(workplace)) return false;
    if (!fieldMatches(job.market, market)) return false;

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
