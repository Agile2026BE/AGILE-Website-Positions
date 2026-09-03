// Terminated position IDs.
//
// Policy: Terminated means PERMANENT. A Terminated position will never go
// live again, full stop — this is not the same thing as Dormant (see
// dormantPositionIds.js), which is reversible when a client re-engages.
// Terminated exists for cases like a confirmed duplicate listing, where
// there is no scenario in which this specific record should ever return.
//
// We do NOT delete the entry out of data/jobs/*.js or data/jobDetails/*.js,
// and we do NOT reuse its ID for a different position later — this file is
// the single switch that takes it out of the live, publicly visible list.
// jobs.js filters any ID listed here (and in dormantPositionIds.js) out of
// the exported `jobs` array before the site ever sees it, so it won't
// appear on /careers, in search, in the sitemap, or get its own
// /careers/positions/[slug] page.
//
// The next brand-new position should always get the next number after the
// highest ID that has ever been used (check the data/jobs/*.js filenames
// for the current ceiling) — never a number that appears in this file or
// in dormantPositionIds.js, and never a number that was skipped for any
// other reason. IDs only ever climb.
export const terminatedPositionIds = [
  {
    id: "1100",
    terminatedOn: "2026-08-22",
    reason:
      "Duplicate of 1099 — same Mechanical Engineer (HVAC) opening in Wall Township, NJ (identical salary, experience range, credential, and market tags; the summary/specialty/responsibilities text was just reworded). 1099 is the listing that stays live.",
  },
  {
    id: "1181",
    terminatedOn: "2026-09-03",
    reason:
      "Duplicate of 1198 — same Assistant Chief Engineer, Structural (Bridge) opening for French and Parrello in Wall Township, NJ (identical salary $150,000-$200,000, 15+ years experience, PE required; the title/summary/responsibilities text was just reworded). 1198 is the newer, fully-mapped listing that stays live.",
  },
];
