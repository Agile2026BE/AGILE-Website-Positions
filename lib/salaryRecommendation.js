// Salary recommendations are computed only from your own real position records
// (data/jobs/*.js) — nothing here is invented or pulled from an external source.

import { PLAUSIBLE_MIN, PLAUSIBLE_MAX } from "./salaryChecks.js";

const isPlausible = (n) => Number.isFinite(n) && n >= PLAUSIBLE_MIN && n <= PLAUSIBLE_MAX;

function median(sorted) {
  const n = sorted.length;
  if (n === 0) return null;
  const mid = Math.floor(n / 2);
  return n % 2 ? sorted[mid] : Math.round((sorted[mid - 1] + sorted[mid]) / 2);
}

function percentile(sorted, p) {
  if (sorted.length === 0) return null;
  const idx = (sorted.length - 1) * p;
  const lo = Math.floor(idx);
  const hi = Math.ceil(idx);
  if (lo === hi) return sorted[lo];
  return Math.round(sorted[lo] + (sorted[hi] - sorted[lo]) * (idx - lo));
}

/**
 * Recommend a salary range for a given discipline (optionally narrowed by state
 * and/or experience), based entirely on your existing real position records.
 */
export function recommendSalary(jobs = [], { discipline, state, experience } = {}) {
  if (!discipline) throw new Error("recommendSalary requires a discipline");

  const matches = jobs.filter((job) => {
    if (job.discipline !== discipline) return false;
    if (state) {
      const tokens = String(job.state ?? "")
        .split("|")
        .map((s) => s.trim());
      if (!tokens.includes(state)) return false;
    }
    if (experience) {
      if (!String(job.experience ?? "").toLowerCase().includes(String(experience).toLowerCase())) {
        return false;
      }
    }
    return true;
  });

  const rawMins = matches.map((j) => Number(j.salaryMin));
  const rawMaxes = matches.map((j) => Number(j.salaryMax));

  // Exclude implausible figures (e.g. a salaryMin of 0 from a data-entry error) rather
  // than let a known bad value silently drag the recommendation down. These are the
  // same bounds scripts/check-positions.mjs flags, so run that first to fix them at
  // the source when possible.
  const mins = rawMins.filter(isPlausible).sort((a, b) => a - b);
  const maxes = rawMaxes.filter(isPlausible).sort((a, b) => a - b);
  const excludedMins = rawMins.length - mins.length;
  const excludedMaxes = rawMaxes.length - maxes.length;

  if (mins.length === 0 || maxes.length === 0) {
    return {
      discipline,
      state: state ?? null,
      experience: experience ?? null,
      sampleSize: matches.length,
      recommendation: null,
      note:
        matches.length === 0
          ? "No matching real positions found — not enough data to recommend a range."
          : "Matching positions exist, but none had a plausible salaryMin/salaryMax to compute a range from — check scripts/check-positions.mjs output.",
    };
  }

  const recommendation = {
    min: percentile(mins, 0.25),
    max: percentile(maxes, 0.75),
  };

  const notes = [];
  if (matches.length < 3) {
    notes.push("Fewer than 3 matching real positions — treat this as a rough estimate, not a firm number.");
  }
  if (excludedMins || excludedMaxes) {
    notes.push(
      `Excluded ${excludedMins} salaryMin and ${excludedMaxes} salaryMax value(s) outside the plausible $${PLAUSIBLE_MIN.toLocaleString()}–$${PLAUSIBLE_MAX.toLocaleString()} range (likely data-entry errors — see scripts/check-positions.mjs).`,
    );
  }

  return {
    discipline,
    state: state ?? null,
    experience: experience ?? null,
    sampleSize: matches.length,
    recommendation,
    stats: {
      minOfMins: mins[0],
      maxOfMins: mins[mins.length - 1],
      medianMin: median(mins),
      minOfMaxes: maxes[0],
      maxOfMaxes: maxes[maxes.length - 1],
      medianMax: median(maxes),
    },
    matchingIds: matches.map((j) => j.id),
    note: notes.length ? notes.join(" ") : null,
  };
}
