const normalize = (value) => String(value ?? "").trim().toLowerCase();

const splitValues = (value) =>
  String(value ?? "")
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);

const uniqueSorted = (values) =>
  [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));

const fieldMatches = (value, selected) =>
  !selected || splitValues(value).some((item) => normalize(item) === normalize(selected));

export function buildFilterOptions(jobs) {
  return {
    state: uniqueSorted(jobs.flatMap((job) => splitValues(job.state))),
    discipline: uniqueSorted(jobs.flatMap((job) => splitValues(job.discipline))),
    workplace: uniqueSorted(jobs.flatMap((job) => splitValues(job.workplace))),
    market: uniqueSorted(jobs.flatMap((job) => splitValues(job.market))),
  };
}

export function filterJobs(
  jobs,
  {
    state = "",
    discipline = "",
    minimumSalary = "",
    workplace = "",
    market = "",
    query = "",
  } = {},
) {
  const normalizedQuery = normalize(query);
  const minimum = Number(minimumSalary) || 0;

  return jobs.filter((job) => {
    if (!fieldMatches(job.state, state)) return false;
    if (!fieldMatches(job.discipline, discipline)) return false;
    if (!fieldMatches(job.workplace, workplace)) return false;
    if (!fieldMatches(job.market, market)) return false;

    if (minimum) {
      const salaryCeiling = Number(job.salaryMax || job.salaryMin || 0);
      if (salaryCeiling < minimum) return false;
    }

    if (normalizedQuery) {
      const searchable = [
        job.id,
        job.title,
        job.summary,
        job.location,
        job.state,
        job.discipline,
        job.specialty,
        job.market,
        job.credential,
      ]
        .map(normalize)
        .join(" ");

      if (!searchable.includes(normalizedQuery)) return false;
    }

    return true;
  });
}
