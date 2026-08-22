// Retired position IDs.
//
// Policy: when a position is retired (closed, filled, or — as with 1100
// below — found to be a duplicate of another live listing), we do NOT
// delete its entry out of data/jobs/*.js or data/jobDetails/*.js, and we do
// NOT reuse its ID for a different position later. Its record stays in the
// data files exactly as written; this file is the single switch that takes
// it out of the live, publicly visible list. jobs.js filters any ID listed
// here out of the exported `jobs` array before the site ever sees it, so it
// won't appear on /careers, in search, in the sitemap, or get its own
// /careers/positions/[slug] page.
//
// The next brand-new position should always get the next number after the
// highest ID that has ever been used (check the data/jobs/*.js filenames
// for the current ceiling) — never a number that appears in this list, and
// never a number that was skipped for any other reason. IDs only ever climb.
export const retiredPositionIds = [
  {
    id: "1100",
    retiredOn: "2026-08-22",
    reason:
      "Duplicate of 1099 — same Mechanical Engineer (HVAC) opening in Wall Township, NJ (identical salary, experience range, credential, and market tags; the summary/specialty/responsibilities text was just reworded). 1099 is the listing that stays live.",
  },
];
