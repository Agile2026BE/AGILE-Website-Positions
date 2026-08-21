import { disciplineOptions, stateOptions } from "../data/filterOptions.js";

export const PLAUSIBLE_MIN = 30000;
export const PLAUSIBLE_MAX = 500000;

function workplaceGroup(value) {
  const text = String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[-–—]/g, " ");
  if (text.includes("remote")) return "remote";
  if (text.includes("hybrid")) return "hybrid";
  if (text.includes("onsite") || text.includes("on site") || text.includes("in office")) {
    return "onsite";
  }
  return null;
}

// Pulls every "$123,456" style figure out of a salaryDisplay string, in order.
// Handles a trailing "+" (open-ended) and en-dash/hyphen separators without caring
// which one was used.
export function parseSalaryDisplay(display) {
  const matches = [...String(display ?? "").matchAll(/\$([\d,]+)/g)].map((m) =>
    Number(m[1].replace(/,/g, "")),
  );
  if (matches.length === 0) return null;
  const [min, max = min] = matches;
  return { min, max };
}

// A position counts as "salary pending" — not broken, just not filled in yet —
// only when BOTH the display text has no dollar figure AND the numeric fields are
// blank/zero. That's a deliberate, self-consistent "not yet disclosed" state (e.g.
// salaryDisplay: "Competitive compensation", salaryMin/salaryMax: 0 or unset).
// Anything less consistent than that (e.g. a real number in one field but not the
// other) is still treated as a genuine data bug below.
export function isSalaryPending(job) {
  const parsed = parseSalaryDisplay(job.salaryDisplay);
  const min = Number(job.salaryMin);
  const max = Number(job.salaryMax);
  const minEmpty = !Number.isFinite(min) || min === 0;
  const maxEmpty = !Number.isFinite(max) || max === 0;
  return parsed === null && minEmpty && maxEmpty;
}

export function checkPositionAccuracy(job) {
  const issues = [];

  if (isSalaryPending(job)) {
    // Intentionally deferred — excluded from salary math (see
    // lib/salaryRecommendation.js's plausibility filter) and not flagged as an
    // error. Tracked separately via checkAllPositions()'s `pending` field instead.
  } else {
    const parsed = parseSalaryDisplay(job.salaryDisplay);
    if (!parsed) {
      issues.push(`salaryDisplay "${job.salaryDisplay}" has no parseable dollar figures`);
    } else {
      if (Number(job.salaryMin) !== parsed.min) {
        issues.push(
          `salaryMin (${job.salaryMin}) doesn't match the first figure in salaryDisplay (${parsed.min})`,
        );
      }
      if (Number(job.salaryMax) !== parsed.max) {
        issues.push(
          `salaryMax (${job.salaryMax}) doesn't match the second figure in salaryDisplay (${parsed.max})`,
        );
      }
    }

    const min = Number(job.salaryMin);
    const max = Number(job.salaryMax);

    if (!Number.isFinite(min) || min <= 0) {
      issues.push(`salaryMin (${job.salaryMin}) is not a positive number`);
    }
    if (!Number.isFinite(max) || max <= 0) {
      issues.push(`salaryMax (${job.salaryMax}) is not a positive number`);
    }
    if (Number.isFinite(min) && Number.isFinite(max) && min > max) {
      issues.push(`salaryMin (${min}) is greater than salaryMax (${max})`);
    }
    if (Number.isFinite(min) && (min < PLAUSIBLE_MIN || min > PLAUSIBLE_MAX)) {
      issues.push(
        `salaryMin (${min}) is outside the plausible $${PLAUSIBLE_MIN.toLocaleString()}–$${PLAUSIBLE_MAX.toLocaleString()} range — check for a typo`,
      );
    }
    if (Number.isFinite(max) && (max < PLAUSIBLE_MIN || max > PLAUSIBLE_MAX)) {
      issues.push(
        `salaryMax (${max}) is outside the plausible $${PLAUSIBLE_MIN.toLocaleString()}–$${PLAUSIBLE_MAX.toLocaleString()} range — check for a typo`,
      );
    }
  }

  if (job.discipline && !disciplineOptions.includes(job.discipline)) {
    issues.push(`discipline "${job.discipline}" is not one of the site's known disciplines`);
  }

  const stateTokens = String(job.state ?? "")
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean);
  if (stateTokens.length === 0) {
    issues.push("state is empty");
  } else {
    for (const token of stateTokens) {
      if (!stateOptions.includes(token)) {
        issues.push(`state "${token}" is not one of the site's known states`);
      }
    }
  }

  if (job.workplace && !workplaceGroup(job.workplace)) {
    issues.push(
      `workplace "${job.workplace}" doesn't map to remote/hybrid/onsite and won't match the workplace filter`,
    );
  }

  if (job.slug && job.id && !job.slug.startsWith(`${job.id}-`)) {
    issues.push(`slug "${job.slug}" doesn't start with id "${job.id}-"`);
  }

  return issues;
}

export function checkAllPositions(jobs = []) {
  const idCounts = new Map();
  const slugCounts = new Map();
  for (const job of jobs) {
    idCounts.set(job.id, (idCounts.get(job.id) ?? 0) + 1);
    slugCounts.set(job.slug, (slugCounts.get(job.slug) ?? 0) + 1);
  }

  return jobs.map((job, index) => {
    const issues = checkPositionAccuracy(job);
    if (idCounts.get(job.id) > 1) {
      issues.push(`id "${job.id}" is used by ${idCounts.get(job.id)} positions`);
    }
    if (slugCounts.get(job.slug) > 1) {
      issues.push(`slug "${job.slug}" is used by ${slugCounts.get(job.slug)} positions`);
    }
    return {
      index,
      id: job.id ?? null,
      slug: job.slug ?? null,
      issues,
      accurate: issues.length === 0,
      salaryPending: isSalaryPending(job),
    };
  });
}
