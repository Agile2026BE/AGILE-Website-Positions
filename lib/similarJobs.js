// Shared "how similar is this other job?" scoring used to power the
// "Similar Positions" list in both the PositionModal popup (browsing grid)
// and the standalone /careers/positions/[slug] page (what a shared link
// opens to). Keeping this in one place means a recipient who clicks a
// shared/emailed link sees the same quality of suggestions as someone
// browsing the grid, instead of two logics drifting apart over time.
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
  const candidateMarkets = String(candidate.market || "").toLowerCase();
  if (markets.some((m) => candidateMarkets.includes(m))) score += 2;
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
