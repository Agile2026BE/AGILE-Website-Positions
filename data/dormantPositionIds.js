// Dormant position IDs.
//
// Policy: Dormant means the client isn't currently engaged with the firm,
// but this is REVERSIBLE — the position can come back live if the client
// re-engages. This is not the same thing as Terminated (see
// terminatedPositionIds.js), which means permanently gone, never coming
// back.
//
// We do NOT delete the entry out of data/jobs/*.js or data/jobDetails/*.js
// while a position is dormant — the full record stays exactly as written
// so it can be reactivated quickly. This file is the single switch that
// takes it out of the live, publicly visible list. jobs.js filters any ID
// listed here (and in terminatedPositionIds.js) out of the exported `jobs`
// array before the site ever sees it, so it won't appear on /careers, in
// search, in the sitemap, or get its own /careers/positions/[slug] page.
//
// The next brand-new position should always get the next number after the
// highest ID that has ever been used (check the data/jobs/*.js filenames
// for the current ceiling) — never a number that appears in this file or
// in terminatedPositionIds.js, and never a number that was skipped for any
// other reason. IDs only ever climb.
export const dormantPositionIds = [
  {
    id: "1012",
    dormantOn: "2026-08-27",
    reason:
      "Dormant — client (Arora Engineers) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if Arora re-engages AGILE.",
  },
  {
    id: "1002",
    dormantOn: "2026-09-02",
    reason:
      "Dormant — client (JBB) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if JBB re-engages AGILE.",
  },
  {
    id: "1003",
    dormantOn: "2026-09-02",
    reason:
      "Dormant — client (JBB) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if JBB re-engages AGILE.",
  },
  {
    id: "1004",
    dormantOn: "2026-09-02",
    reason:
      "Dormant — client (JBB) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if JBB re-engages AGILE.",
  },
  {
    id: "1005",
    dormantOn: "2026-09-02",
    reason:
      "Dormant — client (JBB) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if JBB re-engages AGILE.",
  },
  {
    id: "1009",
    dormantOn: "2026-09-02",
    reason:
      "Dormant — client (JBB) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if JBB re-engages AGILE.",
  },
  {
    id: "1016",
    dormantOn: "2026-09-02",
    reason:
      "Dormant — client (JBB) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if JBB re-engages AGILE.",
  },
  {
    id: "1017",
    dormantOn: "2026-09-02",
    reason:
      "Dormant — client (JBB) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if JBB re-engages AGILE.",
  },
  {
    id: "1038",
    dormantOn: "2026-09-02",
    reason:
      "Dormant — client (JBB) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if JBB re-engages AGILE.",
  },
  {
    id: "1040",
    dormantOn: "2026-09-02",
    reason:
      "Dormant — client (JBB) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if JBB re-engages AGILE.",
  },
  {
    id: "1041",
    dormantOn: "2026-09-02",
    reason:
      "Dormant — client (JBB) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if JBB re-engages AGILE.",
  },
  {
    id: "1042",
    dormantOn: "2026-09-02",
    reason:
      "Dormant — client (JBB) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if JBB re-engages AGILE.",
  },
  {
    id: "1043",
    dormantOn: "2026-09-02",
    reason:
      "Dormant — client (JBB) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if JBB re-engages AGILE.",
  },
  {
    id: "1044",
    dormantOn: "2026-09-02",
    reason:
      "Dormant — client (JBB) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if JBB re-engages AGILE.",
  },
  {
    id: "1045",
    dormantOn: "2026-09-02",
    reason:
      "Dormant — client (JBB) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if JBB re-engages AGILE.",
  },
  {
    id: "1046",
    dormantOn: "2026-09-02",
    reason:
      "Dormant — client (JBB) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if JBB re-engages AGILE.",
  },
  {
    id: "1071",
    dormantOn: "2026-09-02",
    reason:
      "Dormant — client (JBB) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if JBB re-engages AGILE.",
  },
  {
    id: "1104",
    dormantOn: "2026-09-02",
    reason:
      "Dormant — client (JBB) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if JBB re-engages AGILE.",
  },
  {
    id: "1019",
    dormantOn: "2026-09-02",
    reason:
      "Dormant — client (Arora Engineers) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if Arora re-engages AGILE.",
  },
  {
    id: "1020",
    dormantOn: "2026-09-02",
    reason:
      "Dormant — client (Arora Engineers) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if Arora re-engages AGILE.",
  },
  {
    id: "1021",
    dormantOn: "2026-09-02",
    reason:
      "Dormant — client (Arora Engineers) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if Arora re-engages AGILE.",
  },
  {
    id: "1022",
    dormantOn: "2026-09-02",
    reason:
      "Dormant — client (Arora Engineers) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if Arora re-engages AGILE.",
  },
  {
    id: "1023",
    dormantOn: "2026-09-02",
    reason:
      "Dormant — client (Arora Engineers) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if Arora re-engages AGILE.",
  },
  {
    id: "1050",
    dormantOn: "2026-09-02",
    reason:
      "Dormant — client (Arora Engineers) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if Arora re-engages AGILE.",
  },
  {
    id: "1051",
    dormantOn: "2026-09-02",
    reason:
      "Dormant — client (Arora Engineers) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if Arora re-engages AGILE.",
  },
  {
    id: "1052",
    dormantOn: "2026-09-02",
    reason:
      "Dormant — client (Arora Engineers) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if Arora re-engages AGILE.",
  },
  {
    id: "1076",
    dormantOn: "2026-09-02",
    reason:
      "Dormant — client (Arora Engineers) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if Arora re-engages AGILE.",
  },
  {
    id: "1077",
    dormantOn: "2026-09-02",
    reason:
      "Dormant — client (Arora Engineers) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if Arora re-engages AGILE.",
  },
  {
    id: "1111",
    dormantOn: "2026-09-02",
    reason:
      "Dormant — client (Arora Engineers) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if Arora re-engages AGILE.",
  },
  {
    id: "1047",
    dormantOn: "2026-09-03",
    reason:
      "Dormant — client (Rock Brook Group) not currently engaged with the firm. Not deleted or reassigned; full record retained as-is so this can be reactivated quickly if Rock Brook Group re-engages AGILE.",
  },
];
