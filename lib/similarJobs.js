// Shared "how similar is this other job?" scoring used to power the
// "Similar Positions" list in both the PositionModal popup (browsing grid)
// and the standalone /careers/positions/[slug] page (what a shared link
// opens to). Keeping this in one place means a recipient who clicks a
// shared/emailed link sees the same quality of suggestions as someone
// browsing the grid, instead of two logics drifting apart over time.
// Market overlap is weighted per shared tag (3 points each) rather than a
// flat bonus for "any" overlap, so two postings that share a specific,
// narrow combination — e.g. both tagged "Mission Critical" AND "Data
// Centers" — score higher (+6) than two postings that merely share the same
// broad discipline (+5). A shared discipline alone is a weak relevance
// signal (it just means "also an engineer"); sharing multiple specific
// market tags means the roles are genuinely the same kind of work, which is
// what a candidate skimming "Similar Positions" actually wants to see.
export function similarityScore(candidate, active) {
  let score = 0;
  if (candidate.discipline && candidate.discipline === active.discipline) score += 5;
  if (candidate.state && candidate.state === active.state) score += 3;
  if (candidate.workplace && candidate.workplace === active.workplace) score += 1;

  const markets = String(active.market || "")
    .toLowerCase()
    .split("|")
    .map((v) => v.trim())
    .filter(Boolean);
  const candidateMarkets = String(candidate.market || "")
    .toLowerCase()
    .split("|")
    .map((v) => v.trim())
    .filter(Boolean);
  const sharedMarketCount = markets.filter((m) => candidateMarkets.includes(m)).length;
  score += sharedMarketCount * 3;

  return score;
}

export function getSimilarJobs(job, jobs = [], limit = 3) {
  if (!job) return [];
  const key = job.id ?? job.slug;
  return jobs
    .filter((candidate) => (candidate.id ?? candidate.slug) !== key)
    .map((candidate) => ({ candidate, score: similarityScore(candidate, job) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.candidate);
}
