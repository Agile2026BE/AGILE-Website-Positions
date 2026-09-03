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
  {
    id: "1012",
    retiredOn: "2026-08-27",
    reason:
      "Dormant — client (Arora Engineers) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if Arora re-engages AGILE.",
  },
  {
    id: "1002",
    retiredOn: "2026-09-02",
    reason:
      "Dormant — client (JBB) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if JBB re-engages AGILE.",
  },
  {
    id: "1003",
    retiredOn: "2026-09-02",
    reason:
      "Dormant — client (JBB) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if JBB re-engages AGILE.",
  },
  {
    id: "1004",
    retiredOn: "2026-09-02",
    reason:
      "Dormant — client (JBB) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if JBB re-engages AGILE.",
  },
  {
    id: "1005",
    retiredOn: "2026-09-02",
    reason:
      "Dormant — client (JBB) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if JBB re-engages AGILE.",
  },
  {
    id: "1009",
    retiredOn: "2026-09-02",
    reason:
      "Dormant — client (JBB) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if JBB re-engages AGILE.",
  },
  {
    id: "1016",
    retiredOn: "2026-09-02",
    reason:
      "Dormant — client (JBB) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if JBB re-engages AGILE.",
  },
  {
    id: "1017",
    retiredOn: "2026-09-02",
    reason:
      "Dormant — client (JBB) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if JBB re-engages AGILE.",
  },
  {
    id: "1038",
    retiredOn: "2026-09-02",
    reason:
      "Dormant — client (JBB) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if JBB re-engages AGILE.",
  },
  {
    id: "1040",
    retiredOn: "2026-09-02",
    reason:
      "Dormant — client (JBB) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if JBB re-engages AGILE.",
  },
  {
    id: "1041",
    retiredOn: "2026-09-02",
    reason:
      "Dormant — client (JBB) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if JBB re-engages AGILE.",
  },
  {
    id: "1042",
    retiredOn: "2026-09-02",
    reason:
      "Dormant — client (JBB) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if JBB re-engages AGILE.",
  },
  {
    id: "1043",
    retiredOn: "2026-09-02",
    reason:
      "Dormant — client (JBB) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if JBB re-engages AGILE.",
  },
  {
    id: "1044",
    retiredOn: "2026-09-02",
    reason:
      "Dormant — client (JBB) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if JBB re-engages AGILE.",
  },
  {
    id: "1045",
    retiredOn: "2026-09-02",
    reason:
      "Dormant — client (JBB) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if JBB re-engages AGILE.",
  },
  {
    id: "1046",
    retiredOn: "2026-09-02",
    reason:
      "Dormant — client (JBB) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if JBB re-engages AGILE.",
  },
  {
    id: "1071",
    retiredOn: "2026-09-02",
    reason:
      "Dormant — client (JBB) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if JBB re-engages AGILE.",
  },
  {
    id: "1104",
    retiredOn: "2026-09-02",
    reason:
      "Dormant — client (JBB) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if JBB re-engages AGILE.",
  },
  {
    id: "1019",
    retiredOn: "2026-09-02",
    reason:
      "Dormant — client (Arora Engineers) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if Arora re-engages AGILE.",
  },
  {
    id: "1020",
    retiredOn: "2026-09-02",
    reason:
      "Dormant — client (Arora Engineers) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if Arora re-engages AGILE.",
  },
  {
    id: "1021",
    retiredOn: "2026-09-02",
    reason:
      "Dormant — client (Arora Engineers) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if Arora re-engages AGILE.",
  },
  {
    id: "1022",
    retiredOn: "2026-09-02",
    reason:
      "Dormant — client (Arora Engineers) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if Arora re-engages AGILE.",
  },
  {
    id: "1023",
    retiredOn: "2026-09-02",
    reason:
      "Dormant — client (Arora Engineers) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if Arora re-engages AGILE.",
  },
  {
    id: "1050",
    retiredOn: "2026-09-02",
    reason:
      "Dormant — client (Arora Engineers) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if Arora re-engages AGILE.",
  },
  {
    id: "1051",
    retiredOn: "2026-09-02",
    reason:
      "Dormant — client (Arora Engineers) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if Arora re-engages AGILE.",
  },
  {
    id: "1052",
    retiredOn: "2026-09-02",
    reason:
      "Dormant — client (Arora Engineers) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if Arora re-engages AGILE.",
  },
  {
    id: "1076",
    retiredOn: "2026-09-02",
    reason:
      "Dormant — client (Arora Engineers) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if Arora re-engages AGILE.",
  },
  {
    id: "1077",
    retiredOn: "2026-09-02",
    reason:
      "Dormant — client (Arora Engineers) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if Arora re-engages AGILE.",
  },
  {
    id: "1111",
    retiredOn: "2026-09-02",
    reason:
      "Dormant — client (Arora Engineers) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if Arora re-engages AGILE.",
  },
  {
    id: "1181",
    retiredOn: "2026-09-03",
    reason:
      "Duplicate of 1198 — same Assistant Chief Engineer, Structural (Bridge) opening for French and Parrello in Wall Township, NJ (identical salary $150,000-$200,000, 15+ years experience, PE required; the title/summary/responsibilities text was just reworded). 1198 is the newer, fully-mapped listing that stays live.",
  },
  {
    id: "1047",
    retiredOn: "2026-09-03",
    reason:
      "Dormant — client (Rock Brook Group) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if Rock Brook Group re-engages AGILE.",
  },
  {
    id: "1065",
    retiredOn: "2026-09-03",
    reason:
      "Dormant — client (M/E Engineering) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if M/E Engineering re-engages AGILE.",
  },
  {
    id: "1030",
    retiredOn: "2026-09-03",
    reason:
      "Dormant — client (M/E Engineering) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if M/E Engineering re-engages AGILE.",
  },
  {
    id: "1031",
    retiredOn: "2026-09-03",
    reason:
      "Dormant — client (M/E Engineering) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if M/E Engineering re-engages AGILE.",
  },
  {
    id: "1032",
    retiredOn: "2026-09-03",
    reason:
      "Dormant — client (M/E Engineering) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if M/E Engineering re-engages AGILE.",
  },
  {
    id: "1033",
    retiredOn: "2026-09-03",
    reason:
      "Dormant — client (M/E Engineering) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if M/E Engineering re-engages AGILE.",
  },
  {
    id: "1054",
    retiredOn: "2026-09-03",
    reason:
      "Dormant — client (M/E Engineering) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if M/E Engineering re-engages AGILE.",
  },
  {
    id: "1055",
    retiredOn: "2026-09-03",
    reason:
      "Dormant — client (M/E Engineering) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if M/E Engineering re-engages AGILE.",
  },
  {
    id: "1058",
    retiredOn: "2026-09-03",
    reason:
      "Dormant — client (M/E Engineering) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if M/E Engineering re-engages AGILE.",
  },
  {
    id: "1059",
    retiredOn: "2026-09-03",
    reason:
      "Dormant — client (M/E Engineering) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if M/E Engineering re-engages AGILE.",
  },
  {
    id: "1064",
    retiredOn: "2026-09-03",
    reason:
      "Dormant — client (M/E Engineering) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if M/E Engineering re-engages AGILE.",
  },
  {
    id: "1068",
    retiredOn: "2026-09-03",
    reason:
      "Dormant — client (M/E Engineering) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if M/E Engineering re-engages AGILE.",
  },
  {
    id: "1069",
    retiredOn: "2026-09-03",
    reason:
      "Dormant — client (M/E Engineering) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if M/E Engineering re-engages AGILE.",
  },
  {
    id: "1105",
    retiredOn: "2026-09-03",
    reason:
      "Dormant — client (M/E Engineering) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if M/E Engineering re-engages AGILE.",
  },
];
