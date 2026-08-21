import { jobs } from "../data/jobs.js";
import { recommendSalary } from "../lib/salaryRecommendation.js";
import { disciplineOptions } from "../data/filterOptions.js";

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      const next = argv[i + 1];
      const value = next && !next.startsWith("--") ? argv[++i] : true;
      args[key] = value;
    }
  }
  return args;
}

const args = parseArgs(process.argv.slice(2));

if (!args.discipline) {
  console.error(
    'Usage: node scripts/recommend-salary.mjs --discipline "Electrical Engineering" [--state "New York"] [--experience "5+"]',
  );
  console.error(`\nKnown disciplines:\n  ${disciplineOptions.join("\n  ")}`);
  process.exit(1);
}

const result = recommendSalary(jobs, {
  discipline: args.discipline,
  state: args.state,
  experience: args.experience,
});

console.log(JSON.stringify(result, null, 2));

if (result.recommendation) {
  const scopeBits = [
    result.state ? `in ${result.state}` : null,
    result.experience ? `(${result.experience} experience)` : null,
  ]
    .filter(Boolean)
    .join(" ");
  console.log(
    `\nRecommended range for ${result.discipline}${scopeBits ? ` ${scopeBits}` : ""}: ` +
      `$${result.recommendation.min.toLocaleString()}–$${result.recommendation.max.toLocaleString()} ` +
      `(based on ${result.sampleSize} real posting${result.sampleSize === 1 ? "" : "s"})`,
  );
}

if (result.note) {
  console.log(`\nNote: ${result.note}`);
}
