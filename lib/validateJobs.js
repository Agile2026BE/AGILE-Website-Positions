import { jobFieldKeys } from "../data/jobBoardConfig.js";

const requiredFields = [
  "id",
  "discipline",
  "title",
  "location",
  "state",
  "workplace",
  "salaryDisplay",
  "experience",
  "slug",
];

export function validateJob(job) {
  const missing = requiredFields.filter((field) => {
    const value = job?.[field];
    return value === undefined || value === null || String(value).trim() === "";
  });

  const unknown = Object.keys(job ?? {}).filter(
    (field) => !jobFieldKeys.includes(field),
  );

  return {
    valid: missing.length === 0 && unknown.length === 0,
    missing,
    unknown,
  };
}

export function validateJobs(jobs = []) {
  return jobs.map((job, index) => ({
    index,
    id: job?.id ?? null,
    slug: job?.slug ?? null,
    ...validateJob(job),
  }));
}
