# AGILE Careers — GREEN Baseline: New Position 1189 (Sept 2, 2026, night)

Supersedes `5405fe0` (the September 2 evening position-retirements baseline recorded earlier the same day in `docs/CAREERS_GREEN_BASELINE_2026-09-02_POSITION_RETIREMENTS.md`). This document covers adding a brand-new position — 1189 — using the confirmed new-position workflow, plus a workbook-wide client-name correction that grew out of it.

## New baseline commit

`07dc87d335ea45a04af1a919fc3052bf555770ab`

Commit message: `Add position 1189 — Senior Electrical Designer (MGE)`

Repository: `Agile2026BE/AGILE-Website-Positions`
Branch: `main`

## New-position workflow (confirmed by Byron, 2026-09-02)

Byron pastes a raw internal job description into chat. From there:

1. Claude assigns the next Position ID — always the next number after the highest ID ever used, never a recycled or skipped one.
2. The real client name is anonymized on every public-facing string (summary, responsibilities, qualifications, why-consider) as "AGILE's Client is..." — never published.
3. The real client is recorded internally, by Position ID, in the Master Position List workbook's "Internal Client" column only.
4. The position is added to the live site data (`data/jobs/*.js` + `data/jobDetails/*.js`, wired into `data/jobs.js`), verified locally against the site's own `validateJobs()`, then committed and pushed live.
5. This baseline doc + `PROJECT_CHECKPOINT.md` get updated to reflect it.

Byron supplies whatever specifics the raw doc doesn't state (salary range, workplace, years of experience, opening count) when asked.

## What changed

**Position 1189** — Senior Electrical Designer, client MG Engineering (MGE), NYC NY, Hybrid, $120,000–$150,000, 10+ years experience, PE preferred, 3 openings. Built from an internal MGE HR job description Byron pasted, using position 1152 (an existing MG Engineering Senior Electrical Designer listing) as the template for specialty/market/tone consistency.

Files added:
- `data/jobs/positions-1189-1189.js`
- `data/jobDetails/details-1189-1189.js`

Files modified:
- `data/jobs.js` — import + array-spread wiring for the two files above (4 line insertions, no other changes)

Local verification before commit: `jobs.length` = 155 (up from 154), position 1189 present with all fields correctly merged (core + details overlay), `validateJobs()` returned 0 invalid records.

**Client-naming correction (workbook only):** Byron corrected the client's internal-records name — it is "MG Engineering" or "MGE," **not** "MG Engineers." The Master Position List workbook was updated to rename Internal Client on all 7 positions tied to this client:

| Position ID | Old value | New value |
|---|---|---|
| 1006 | MG Engineers | MG Engineering (MGE) |
| 1007 | MG Engineers | MG Engineering (MGE) |
| 1008 | MG Engineers | MG Engineering (MGE) |
| 1103 | MG Engineers | MG Engineering (MGE) |
| 1113 | MG Engineers | MG Engineering (MGE) |
| 1152 | MG Engineers | MG Engineering (MGE) |
| 1189 | (new row) | MG Engineering (MGE) |

This is a **workbook-only** change — it has no effect on live site data or code, since real client names are never published on the site regardless of which internal name is used. No `data/*.js` file references client names at all.

## Verification for this exact code SHA

- Vercel production deployment `dpl_FWykCp57gxsMCJfbQn21gY33nsuo`: state `READY`, target `production`, built from commit `07dc87d`.
- Live production fetch confirmed (fetched directly, with a cache-busting query param):
  - `/careers/positions/1189-senior-electrical-designer` loads correctly: title "Senior Electrical Designer," NYC NY, Hybrid, $120,000–$150,000, 10+ years, 3 openings — client identity correctly withheld ("AGILE's Client," no company name anywhere on the page).
  - `/careers` listing page: "155 positions match your current criteria" (up from 154).

## Live position count

**155 positions live** on the careers site as of this baseline (187 total position records in the Master Position List workbook, minus 32 held back: 1 Retired + 31 Dormant).

## Master Position List workbook

Companion workbook update: v12 (`AGILE_Master_Position_List_20260902_v12.xlsx`) — adds row 188 for Position 1189, and renames Internal Client on positions 1006, 1007, 1008, 1103, 1113, 1152, and 1189 from "MG Engineers" to "MG Engineering (MGE)." Recalculated clean (0 formula errors). See `/areas/agile-website.md` in Claude's memory for the full workbook version history and this naming rule.

## Recovery

If this addition needs to be rolled back: revert commit `07dc87d` (or remove position 1189's two data files and the `data/jobs.js` wiring), confirm Project Check, confirm Vercel deployment, and re-verify the live position count returns to 154. The workbook rename is independent and has no code to revert — restore the workbook's Internal Client values from v10/v11 if needed.
