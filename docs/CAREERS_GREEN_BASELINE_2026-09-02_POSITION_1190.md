# AGILE Careers — GREEN Baseline: Position 1190 Added, Position 1103 Corrected (Sept 2, 2026, late night)

Supersedes `efed524` (the September 2 night position-1189 baseline recorded earlier the same night in `docs/CAREERS_GREEN_BASELINE_2026-09-02_POSITION_1189.md`). This document covers a same-night follow-up cycle: catching a duplicate before it went live, correcting position 1103, and adding a genuinely new position — 1190.

## New baseline commit

`37422e6eb1e3ae6d7a011241412734d1248a6a49`

Commit message: `Add position 1190 — Plumbing & Fire Protection Engineer (MGE)`

Repository: `Agile2026BE/AGILE-Website-Positions`
Branch: `main`

## What happened

**1. Duplicate caught before going live.** Byron pasted a raw internal MGE HR job description for a "Lead Plumbing & Fire Protection Designer" and asked to build it as position 1190. Site data files were drafted and locally verified, but before they were wired into `data/jobs.js`, Byron caught that this was a duplicate of existing position 1103 — identical title, same client (MG Engineering / MGE). The drafted files were deleted immediately. No live impact; `git status` confirmed a clean repo afterward.

**2. Position 1103 updated instead (commit `17378ec`).** Rather than publish a duplicate, Byron's 1190 details (salary, openings) were folded into 1103:
- Salary: $135,000–$170,000 → **$120,000–$150,000**
- Openings: added, set to **2**
- The `metaDescription` in `data/jobDetails/details-1101-1112.js` was corrected to match the new salary (it had been left stale on the first pass — caught and fixed before commit).

Byron noted the next PE-required MGE role would return to the $135,000–$170,000 band — this became position 1190 below.

**3. Position 1190 added for real (commit `37422e6`).** Byron pasted a second raw MGE job description — "Plumbing & Fire Protection Engineer" — genuinely distinct from 1103: explicitly requires a licensed PE (not just preferred), and carries a higher salary band reflecting that requirement. Confirmed not a duplicate (different title, PE required vs. preferred, different salary band, 1103 remains live and unaffected) and added:

- `data/jobs/positions-1190-1190.js`
- `data/jobDetails/details-1190-1190.js`
- `data/jobs.js` — import + array-spread wiring (4 line insertions)

Position 1190: Plumbing & Fire Protection Engineer, client MG Engineering (MGE), NYC NY, Hybrid, $135,000–$170,000, 6+ years, **PE required**, 2 openings.

Local verification before commit: `jobs.length` = 156 (up from 155), 1190 present with all fields correctly merged, `validateJobs()` returned 0 invalid records.

## Verification for this exact code SHA

- Vercel production deployment `dpl_2xsPnMi4PzaugaZA2cggvYebu32o`: state `READY`, target `production`, built from commit `37422e6`. (1103's fix deployed separately first, `dpl_27TjL34uBXbVcAedfEjQfdwWstks`, also `READY`.)
- Live production fetch confirmed directly (with cache-busting):
  - `/careers/positions/1190-plumbing-fire-protection-engineer` loads correctly: title "Plumbing & Fire Protection Engineer," NYC NY, Hybrid, $135,000–$170,000, 6+ years / PE required, 2 openings — client withheld ("AGILE's Client" only, no company name anywhere on the page).
  - `/careers/positions/1103-lead-plumbing-fire-protection-designer` shows the corrected $120,000–$150,000, 2 openings.
  - `/careers` listing page: "156 positions match your current criteria" (up from 155).

## Live position count

**156 positions live** on the careers site as of this baseline (188 total position records in the Master Position List workbook, minus 32 held back: 1 Retired + 31 Dormant — unchanged tonight, `retiredPositionIds.js` was not touched).

## Master Position List workbook

Companion workbook update: v14 (`AGILE_Master_Position_List_20260902_v14.xlsx`) — adds row 189 for Position 1190, and reflects 1103's corrected salary/openings (from v13). Recalculated clean (0 formula errors). See `/areas/agile-website.md` in Claude's memory for the full workbook version history.

## Recovery

If position 1190 needs to be rolled back: revert commit `37422e6` (or remove its two data files and the `data/jobs.js` wiring), confirm Project Check, confirm Vercel deployment, and re-verify the live position count returns to 155. If 1103's salary/openings correction needs to be rolled back independently: revert commit `17378ec` (salary reverts to $135,000–$170,000, `openings` field is removed). Both commits are independent and can be reverted separately without affecting the other.
