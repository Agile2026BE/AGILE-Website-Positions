import { jobs } from "../data/jobs.js";
import { validateJobs } from "../lib/validateJobs.js";
import { checkAllPositions } from "../lib/salaryChecks.js";

const structural = validateJobs(jobs);
const accuracy = checkAllPositions(jobs);

const structuralIssues = structural.filter((r) => !r.valid);
const accuracyIssues = accuracy.filter((r) => !r.accurate);
const pending = accuracy.filter((r) => r.salaryPending);

if (pending.length) {
  console.log(`${pending.length} position(s) have salary intentionally pending (not counted as issues):`);
  for (const r of pending) {
    console.log(`  ${r.id ?? r.slug ?? `index ${r.index}`}`);
  }
  console.log("");
}

if (structuralIssues.length === 0 && accuracyIssues.length === 0) {
  console.log(`Checked ${jobs.length} position${jobs.length === 1 ? "" : "s"} — no issues found.`);
  process.exit(0);
}

if (structuralIssues.length) {
  console.error(`\n${structuralIssues.length} position(s) with missing/unknown fields:`);
  for (const r of structuralIssues) {
    const label = r.id ?? r.slug ?? `index ${r.index}`;
    console.error(`  ${label}`);
    if (r.missing.length) console.error(`    Missing: ${r.missing.join(", ")}`);
    if (r.unknown.length) console.error(`    Unknown: ${r.unknown.join(", ")}`);
  }
}

if (accuracyIssues.length) {
  console.error(`\n${accuracyIssues.length} position(s) with accuracy issues:`);
  for (const r of accuracyIssues) {
    const label = r.id ?? r.slug ?? `index ${r.index}`;
    console.error(`  ${label}`);
    for (const issue of r.issues) console.error(`    - ${issue}`);
  }
}

const totalFlagged = new Set([
  ...structuralIssues.map((r) => r.index),
  ...accuracyIssues.map((r) => r.index),
]).size;

console.error(`\n${totalFlagged} of ${jobs.length} positions need attention.`);
process.exit(1);
