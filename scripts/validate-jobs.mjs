import { jobs } from "../data/jobs.js";
import { validateJobs } from "../lib/validateJobs.js";

const results = validateJobs(jobs);
const invalid = results.filter((result) => !result.valid);

if (invalid.length === 0) {
  console.log(`Validated ${jobs.length} job record${jobs.length === 1 ? "" : "s"}.`);
  process.exit(0);
}

console.error(`Found ${invalid.length} invalid job record${invalid.length === 1 ? "" : "s"}.`);

for (const result of invalid) {
  const label = result.id ?? result.slug ?? `index ${result.index}`;
  console.error(`\n${label}`);

  if (result.missing.length) {
    console.error(`  Missing: ${result.missing.join(", ")}`);
  }

  if (result.unknown.length) {
    console.error(`  Unknown: ${result.unknown.join(", ")}`);
  }
}

process.exit(1);
