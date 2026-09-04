# AGILE Careers Website — Working Notes

Read this before touching anything in this repo. It exists so a new session
picks up exactly where the last one left off instead of re-learning (or
re-breaking) the same things.

## Current state

- **Live baseline:** commit `f146c37`, locked 2026-09-03 21:34 EDT. Full
  roster and what changed to reach it: [docs/CAREERS_FINAL_TRUTH_BASELINE_2026-09-03_2134.md](docs/CAREERS_FINAL_TRUTH_BASELINE_2026-09-03_2134.md).
- **Counts:** 202 total position records — 164 Active (live), 30 Dormant,
  8 Terminated.
- **Production:** `https://www.agileconsultingsolutions.com/careers`
  (also aliased at `careers.agileconsultingsolutions.com`). Vercel project
  `prj_IBpz6UjdpSOtOtd87V3A4aGlP3SI`, team `team_lTUAnuGUaUTLSqB2D2LbSlcD`.
  Always confirm a deployment actually reached `READY` and is aliased to
  the production domain before telling Byron something is live — don't
  assert it from the git push alone.
- **Master workbook** (real client names — see Confidentiality below):
  `AGILE_Master_Position_List_20260903_2134_FINAL_TRUTH_BASELINE.xlsx`,
  kept in sync in two places:
  `/Users/byronevens/Documents/Claude outputs/` and
  `/Users/byronevens/Desktop/Claude Downloads!!/`. Check both for the
  highest version number before trusting either — they have drifted
  before.

## Non-negotiable terminology

- **Dormant** = the client isn't currently engaged with the firm. Reversible.
  The position can come back live if the client re-engages. Data file:
  `data/dormantPositionIds.js`.
- **Terminated** = permanent. This Position ID will never go live again,
  full stop, and the ID is never reused for anything else. Data file:
  `data/terminatedPositionIds.js`.
- These are not interchangeable and must never be conflated in commit
  messages, docs, or conversation — Byron has corrected this repeatedly
  and it matters a lot to him. Don't say "retired" for either one; that
  word was removed from the codebase entirely (see `dc71c6d`).
- "Business Development" is a third, different concept: a position kept
  **live** for marketing/prospecting purposes even though the client
  relationship isn't formally active. It is NOT Dormant. This only exists
  as an internal note in the workbook, never as a code-level status.

## Confidentiality rule

Real client names must **never** appear in any public-facing data file
(`data/jobs/*.js`, `data/jobDetails/*.js`) — always write "AGILE's Client…".
Real client names live only in the Excel workbook's "Internal Client"
column, which is never committed to this git repo.

## Working rules that came from real mistakes this session

- **Never guess a fact.** Salary, credential requirements, market tags,
  client identity — every one of these must trace back to either the
  position's own existing content or a real source document Byron
  provided. Don't fabricate a hedge value like "PE mentioned" when you
  don't know required vs. preferred — go read the qualifications text.
- **Before assuming a position is a duplicate or overwriting it, read its
  own `seoTitle`/`metaDescription` first.** More than once a position was
  wrongly flagged as a duplicate of another because it superficially
  looked similar, when its own hidden data proved it was a distinct real
  posting. Cross-checking `seoTitle` (strip the `| AGILE Position N`
  suffix) against `title`, and the salary in `metaDescription` against
  `salaryMin`/`salaryMax`, is the reliable way to catch base-record vs.
  `jobDetails`-overlay drift, which has been a recurring root cause.
- **IDs only ever climb.** The next new position always gets the next
  number after the highest ID ever used — check the `data/jobs/*.js`
  filenames for the ceiling. Never reuse or skip a number, and never
  renumber an existing position.
- **`coreJobs` vs `jobs`:** `coreJobs` (from `data/jobs.js`) is the raw
  base records, with no `jobDetails` overlay merged in, and includes
  Dormant/Terminated records. `jobs` is the public export — overlay
  merged, hidden IDs filtered out. If you need full accurate content for
  *every* record including hidden ones (for an audit or a workbook
  rebuild), you must replicate the overlay merge yourself against
  `coreJobs` — querying `coreJobs` directly gives you stale/incomplete
  fields for many positions, since the real content often lives only in
  the `jobDetails` overlay.
- **Every fix is its own commit**, verified (syntax-checked, and ideally
  built/linted — though the auto-mode classifier has intermittently
  blocked `npm run build`/`npm run lint`/even `git add` on this project;
  retry once before assuming it's a real block) before pushing, then
  confirmed on Vercel by ID, not assumed from the push succeeding.
- **A stray `.git/refs/remotes/origin/HEAD 2` file** (macOS/iCloud sync
  artifact) has broken `git fetch`/tracking more than once with
  `fatal: bad object refs/remotes/origin/HEAD 2`. If you hit that error,
  diff the stray file against the real `HEAD` file (they've always been
  identical so far) and delete the stray one, then re-fetch.

## Pending / open items

- **36 Active positions have no confirmed Internal Client** anywhere in
  the workbook's history. Don't guess at these — leave them unmapped
  until Byron identifies the client or provides a real source document.
- **Client spot-check is an ongoing process:** Byron names a client, you
  pull every Position ID mapped to it from the workbook and report
  status/title/location/salary/experience for him to verify against the
  live site. Clients already spot-checked and confirmed accurate this
  session: French and Parrello (9 IDs), Concord Engineering Group, Inc.
  (15 IDs), Meyers + Engineers (1 ID), Dewberry (post-dedup). Many other
  clients in the workbook (JBB, Arora Engineers, Highland Associates,
  M/E Engineering, M-E Engineers, Ads Engineers, LaBella, MG Engineering,
  Vanderweil, Rock Brook Group, D&B Engineers, and others) have not yet
  been spot-checked this way — expect this to continue in future sessions.
- **Workbook "Internal Client" normalization** applied only inside the
  FINAL TRUTH BASELINE workbook build, not as a separate durable script —
  if a future session rebuilds the workbook from an older version, re-apply:
  "Concord Engineering" + "Concord Engineering Group, Inc." → one name;
  "Dewberry" + "Dewberry Engineers" → one name; position 1128 → "M-E
  Engineers" (NYC, distinct from "M/E Engineering" in Buffalo); the 13
  M/E Engineering IDs (1030,1031,1032,1033,1054,1055,1058,1059,1064,1065,
  1068,1069,1105) → tagged Business Development, must stay Active.
