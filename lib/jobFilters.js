const normalize = (value) => String(value ?? "").trim().toLowerCase();

const uniqueSorted = (values) =>
  [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));

export function buildFilterOptions(jobs) {
  return {
    state: uniqueSorted(jobs.map((job) => job.state)),
    discipline: uniqueSorted(jobs.map((job) => job.discipline)),
    workplace: uniqueSorted(jobs.map((job) => job.workplace)),
    market: uniqueSorted(jobs.map((job) => job.market)),
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
    if (state && normalize(job.state) !== normalize(state)) return false;
    if (discipline && normalize(job.discipline) !== normalize(discipline)) return false;
    if (workplace && normalize(job.workplace) !== normalize(workplace)) return false;
    if (market && normalize(job.market) !== normalize(market)) return false;

    if (minimum) {
      const salaryCeiling = Number(job.salaryMax ?? job.salaryMin ?? 0);
      if (salaryCeiling < minimum) return false;
    }

    if (normalizedQuery) {
      const searchable = [
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
