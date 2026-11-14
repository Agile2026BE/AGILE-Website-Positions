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
import { clientGroupById } from "../data/clientGroups.js";

const splitList = (value) =>
  String(value || "")
    .toLowerCase()
    .split("|")
    .map((v) => v.trim())
    .filter(Boolean);

const CITY_ALIASES = { "new york": "nyc", "new york city": "nyc", "manhattan": "nyc", "philly": "philadelphia" };

// "NYC, NY; Boston, MA" / "Hollywood, FL, Philadelphia, PA" -> ["nyc", "boston"] etc.
// Two-letter state codes and connector words are dropped.
const citiesOf = (location) =>
  String(location || "")
    .toLowerCase()
    .split(/[;,]|\bor\b|\band\b/)
    .map((v) => v.trim())
    .filter((v) => v && !/^[a-z]{2}$/.test(v))
    .map((v) => CITY_ALIASES[v] || v);

export function similarityScore(candidate, active) {
  let score = 0;
  if (candidate.discipline && candidate.discipline === active.discipline) score += 5;
  // States: joined postings carry "A | B" — credit any shared state, not
  // just an exact string match, so multi-location postings still rank.
  const activeStates = splitList(active.state);
  if (splitList(candidate.state).some((st) => activeStates.includes(st))) score += 8;
  // Same city ranks above same state (e.g. NYC roles above Buffalo roles
  // for an NYC posting). Discipline still decides first in getSimilarJobs.
  const activeCities = citiesOf(active.location);
  if (citiesOf(candidate.location).some((c) => activeCities.includes(c))) score += 15;
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

// Minimum years a posting asks for ("10–15+ years" -> 10, "Minimum 4 years" -> 4).
export function minYears(job) {
  const m = String(job?.experience || "").match(/(\d+)/);
  return m ? Number(m[1]) : null;
}

// How many years apart still counts as the "same level". The band widens with
// seniority: 2 vs 5 years is a real difference, 10 vs 13 years is the same pool.
export function sameLevelBand(years) {
  if (years >= 12) return 4;
  if (years >= 7) return 3;
  return 2;
}

// Years-only level of a suggestion relative to the posting being viewed.
function yearsRelation(candidate, active) {
  const a = minYears(active);
  const c = minYears(candidate);
  if (a == null || c == null) return null;
  const band = sameLevelBand(a);
  if (c - a > band) return "up";
  if (a - c > band) return "down";
  return "same";
}

const salaryMid = (j) => (Number(j?.salaryMin) && Number(j?.salaryMax) ? (Number(j.salaryMin) + Number(j.salaryMax)) / 2 : null);

// Pay-only level: a suggestion whose pay midpoint sits inside the viewed
// posting's range is the same level; above the top is up, below the bottom is down.
function salaryRelation(candidate, active) {
  const mid = salaryMid(candidate);
  const lo = Number(active?.salaryMin);
  const hi = Number(active?.salaryMax);
  if (mid == null || !lo || !hi) return null;
  if (mid > hi) return "up";
  if (mid < lo) return "down";
  return "same";
}

// Final level uses BOTH years and pay, so a "Same Level" card never shows a
// clearly different salary. If one signal says "same", the other decides.
// If years and pay point in opposite directions, the role gets no level tag
// (it isn't used as a labeled suggestion).
function baseRelation(candidate, active) {
  const y = yearsRelation(candidate, active);
  const s = salaryRelation(candidate, active);
  if (!y) return s;
  if (!s || y === s) return y;
  if (y === "same") return s;
  if (s === "same") return y;
  return null;
}

// Pay must agree with the tag a candidate sees: a Level Down card can't top out
// above this posting's top, and a Level Up card can't start below its start.
// Anything that fails falls back to Same Level (if its pay midpoint sits in
// this posting's range) or gets no tag.
export function levelRelation(candidate, active) {
  const rel = baseRelation(candidate, active);
  const cMin = Number(candidate?.salaryMin), cMax = Number(candidate?.salaryMax);
  const aMin = Number(active?.salaryMin), aMax = Number(active?.salaryMax);
  const cMid = salaryMid(candidate), aMid = salaryMid(active);
  if (!cMin || !cMax || !aMin || !aMax) return rel;
  const fallback = salaryRelation(candidate, active) === "same" ? "same" : null;
  if (rel === "down" && (cMax > aMax || cMid >= aMid)) return titleRelation(candidate, active, fallback);
  if (rel === "up" && (cMin < aMin || cMid <= aMid)) return titleRelation(candidate, active, fallback);
  if (rel === "same" || rel == null) return titleRelation(candidate, active, rel);
  return rel;
}

// Title ladder (Byron, 2026-11-13): when pay overlaps, a higher title such as
// Lead or Manager is a Level Up, and a lower title is a Level Down, so a Lead
// role is never shown as "Same Level" next to a Senior role. The title only
// breaks a tie; it never overrides pay pointing the other way.
export function titleRank(job) {
  const t = String(job?.title || "").toLowerCase();
  if (/\b(director|principal|department manager|dept\.? manager|group manager|design manager|discipline lead)\b/.test(t)) return 4;
  if (/\blead\b/.test(t)) return 3;
  if (/\b(senior|sr\.?)\b/.test(t)) return 2;
  return 1;
}

function titleRelation(candidate, active, otherwise) {
  const cr = titleRank(candidate), ar = titleRank(active);
  const cMin = Number(candidate?.salaryMin), cMax = Number(candidate?.salaryMax);
  const aMin = Number(active?.salaryMin), aMax = Number(active?.salaryMax);
  if (cr > ar && cMin >= aMin && cMax >= aMax) return "up";
  if (cr < ar && cMax <= aMax && cMin <= aMin) return "down";
  return otherwise;
}

// Tag wording chosen by Byron (2026-11-13).
export const LEVEL_LABELS = { up: "Level Up", same: "Same Level", down: "Level Down", similar: "Similar Role" };

const keyOf = (job) => job?.id ?? job?.slug;
const clientOf = (job) => clientGroupById[String(job?.id)] || null;
const sharesState = (a, b) => {
  const as = splitList(a.state);
  return splitList(b.state).some((st) => as.includes(st));
};

// "Similar Positions" mix: 4–6 suggestions in the same discipline and the
// same state (same city ranks first), spread across a step up, the same level
// and a step down, and across different clients. A role at a different client
// is preferred, and no client fills more than two slots. If a level has no
// match nearby, the next best same-discipline role fills the slot, so the
// list never comes up short.
export function getSimilarJobsWithLevels(job, jobs = [], { min = 4, max = 6 } = {}) {
  if (!job) return [];
  const key = keyOf(job);
  const activeClient = clientOf(job);
  const others = jobs.filter((c) => keyOf(c) !== key);
  const adjusted = (c) => {
    let score = similarityScore(c, job);
    const cl = clientOf(c);
    if (activeClient && cl && cl === activeClient) score -= 30;
    return score;
  };
  const rank = (pool) => pool.map((c) => ({ c, s: adjusted(c) })).sort((x, y) => y.s - x.s).map((x) => x.c);

  const sameState = rank(others.filter((c) => c.discipline === job.discipline && sharesState(c, job)));
  // If the posting's own city has enough roles, keep the suggestions in that
  // city (an NYC candidate shouldn't be shown Albany); otherwise use the state.
  const homeCities = citiesOf(job.location);
  const sameCity = sameState.filter((c) => citiesOf(c.location).some((x) => homeCities.includes(x)));
  const local = sameCity.length >= min ? sameCity : sameState;
  const buckets = { same: [], up: [], down: [] };
  for (const c of local) {
    const rel = levelRelation(c, job);
    if (rel) buckets[rel].push(c);
  }
  // A step up or down should be the NEXT step, not a leap: closest level
  // first, then the usual similarity order (local[] is already ranked).
  const gap = (c) => Math.abs((minYears(c) ?? 0) - (minYears(job) ?? 0));
  const payGap = (c) => Math.abs((salaryMid(c) ?? 0) - (salaryMid(job) ?? 0));
  // Same city always comes first (commute matters more than anything else).
  const activeCities = citiesOf(job.location);
  const far = (c) => (citiesOf(c.location).some((x) => activeCities.includes(x)) ? 0 : 1);
  for (const lvl of ["up", "down"]) buckets[lvl].sort((x, y) => far(x) - far(y) || gap(x) - gap(y) || payGap(x) - payGap(y));
  // Same Level: closest pay first, so the cards look like true peers.
  buckets.same.sort((x, y) => far(x) - far(y) || payGap(x) - payGap(y));

  const picks = [];
  const used = new Set();
  const perClient = {};
  const canTake = (c) => {
    if (used.has(keyOf(c))) return false;
    const cl = clientOf(c);
    return !cl || (perClient[cl] || 0) < 2;
  };
  const take = (c) => {
    used.add(keyOf(c));
    const cl = clientOf(c);
    if (cl) perClient[cl] = (perClient[cl] || 0) + 1;
    picks.push({ job: c, level: levelRelation(c, job) || "similar" });
  };

  // Round-robin across levels so one level can't crowd out the others.
  for (let round = 0; round < 2 && picks.length < max; round += 1) {
    for (const lvl of ["same", "up", "down"]) {
      if (picks.length >= max) break;
      const next = buckets[lvl].find(canTake);
      if (next) take(next);
    }
  }
  // Room left? Add more nearby roles at any level, up to the maximum.
  for (const c of local) {
    if (picks.length >= max) break;
    if (levelRelation(c, job) && canTake(c)) take(c);
  }
  // Fill to the minimum with the best remaining roles: nearby first, then the
  // rest of the same discipline, then other disciplines.
  const fallback = [
    ...local,
    ...rank(others.filter((c) => c.discipline === job.discipline && !sharesState(c, job))),
    ...rank(others.filter((c) => c.discipline !== job.discipline)),
  ];
  for (const c of fallback) {
    if (picks.length >= min) break;
    if (canTake(c)) take(c);
  }
  for (const c of fallback) {
    if (picks.length >= min) break;
    if (!used.has(keyOf(c))) take(c);
  }

  const order = { same: 0, up: 1, down: 2, similar: 3 };
  return picks.sort((a, b) => (order[a.level] ?? 3) - (order[b.level] ?? 3));
}

// Kept for any caller that just wants the jobs.
export function getSimilarJobs(job, jobs = [], limit = 6) {
  return getSimilarJobsWithLevels(job, jobs, { min: Math.min(4, limit), max: limit }).map((p) => p.job);
}
