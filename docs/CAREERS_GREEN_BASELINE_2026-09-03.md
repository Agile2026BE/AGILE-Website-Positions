# AGILE Careers — GREEN Baseline: Positions 1191–1198 Live, Client-Name Leak Fixed (Sept 3, 2026)

Supersedes `37422e6` (the September 2 late-night position-1190 baseline recorded in `docs/CAREERS_GREEN_BASELINE_2026-09-02_POSITION_1190.md`). This document covers pushing eight new positions live for the first time this session (previously they only existed in the Master Position List workbook), a salary correction on an existing position, and an urgent fix for a client-confidentiality leak caught immediately after the first deploy.

## New baseline commit

`a912779122ab486da21a912f66d50630ba2cd70f`

Commit message: `Fix: anonymize client names on live positions 1197 and 1198`

Repository: `Agile2026BE/AGILE-Website-Positions`
Branch: `main`

## What happened

**1. Eight new positions added and wired (commits `7b65ef2`, `bd94bdd`).** Byron asked that all positions built out in the Master Position List workbook this session be pushed live to GitHub/Vercel for the first time — previously new positions were only added to the workbook, not deployed. Added `data/jobs/positions-<id>-<id>.js` + `data/jobDetails/details-<id>-<id>.js` pairs and wired each into `data/jobs.js` (import + array-spread) for:

- 1191 Senior Mechanical Engineer (MGE, NYC, Hybrid, $140K–$170K)
- 1192 Mechanical Designer (MGE, NYC, Hybrid, $85K–$130K)
- 1193 Lead Electrical Designer (MGE, Hollywood FL, Hybrid, $120K–$150K)
- 1194 Senior Mechanical Engineer (MGE, Hollywood FL, Hybrid, $140K–$170K)
- 1195 Plumbing & Fire Protection Design Manager (MGE, Hollywood FL, Hybrid, $120K–$150K)
- 1196 Lead Plumbing & Fire Protection Designer (MGE, Hollywood FL, Hybrid, $110K–$145K)
- 1197 Mechanical Project Engineer (Dewberry, NYC, Hybrid, $110K–$165K)
- 1198 Assistant Chief Engineer – Structural (Bridge) (French and Parrello, Wall Township NJ, On-Site, $150K–$200K)

**2. Position 1097 salary correction (commit `51006cb`).** Salary top end raised from $125,000 to $140,000 (`salaryDisplay` and `salaryMax` in `data/jobs/positions-1081-1100.js`) per Byron's inline instruction while reviewing a related Dewberry posting.

**3. Client-name leak caught and fixed (commit `a912779`).** Immediately after the first deploy went `READY`, a live-site spot check of position 1198 found the real employer name ("French and Parrello Associates (FPA)") published in the `summary` and `whyConsider` text — a direct violation of the standing rule that client names stay internal-only. Root cause: 1197 (Dewberry) and 1198 (French and Parrello) were the first two positions this session for clients other than MGE, and their generated text opened with the real company name instead of following the "AGILE's Client is seeking..." pattern used correctly for all six MGE positions. Fixed by:

- Replacing "Dewberry" / "French and Parrello Associates (FPA)" with "AGILE's Client" throughout both positions' `summary` and `whyConsider` fields.
- Removing identifying specifics from the surrounding flavor text (named office/employee counts, award rankings, named public-agency clients) so the firm isn't inferable from public detail either.
- Verified via grep across the changed files that no client names remain (`dewberry`, `french`/`parrello`, `fpa`, `mg engineering`/`mge`).

`validateJobs()` and `npm run lint` clean after each commit.

## Verification for this exact code SHA

- Vercel production deployment `dpl_3fsTE5zoDeYe6yECDtnQwRdsqBV4`: state `READY`, built from commit `a912779`, aliased to `www.agileconsultingsolutions.com`, `careers.agileconsultingsolutions.com`, and `agileconsultingsolutions.com`.
- Live production fetch confirmed directly (with cache-busting):
  - `/careers/positions/1197-mechanical-project-engineer` — no mention of "Dewberry" anywhere; opens "AGILE's Client is seeking a Mechanical Project Engineer for their New York, NY office..."
  - `/careers/positions/1198-assistant-chief-engineer-structural-bridge` — no mention of "French and Parrello" or "FPA" anywhere; opens "AGILE's Client is seeking an Assistant Chief Engineer – Structural (Bridge)..."
- `npm run validate:jobs`: 164 job records validated, 0 errors.
- `npm run lint`: clean.

## Live position count

**164 positions live** on the careers site as of this baseline (up from 156 at the 1190 baseline — the 8 new positions 1191–1198). Held-back count unchanged: `retiredPositionIds.js` was not touched this cycle (still 1 Retired + remaining Dormant entries from prior baselines).

## Master Position List workbook

Companion workbook update: **v28** (`AGILE_Master_Position_List_20260902_v28.xlsx`) — the workbook side of this session's work, built across v16→v28:

- Rows added for positions 1192–1198 (matching the live site data above).
- Position 1097 salary top end corrected to $140,000.
- Positions 1173–1177 (5 rows) corrected from a French and Parrello mismap to the actual client, Dewberry Engineers, per Byron's confirmation.
- **v28 specifically**: corrected the same client-name leak in the workbook's Summary / Why Consider / Full Website Description fields for positions 1197 and 1198, matching the text now live on the site (`AGILE's Client...`). Internal "Internal Client" columns in the workbook still correctly record the real client names (Dewberry Engineers, French and Parrello) — those columns are internal-only and were never part of the leak; only the public-facing text fields were affected.

Recalculated clean (0 formula errors) at every version. See `/areas/agile-website.md` in Claude's memory for the full workbook version history.

## Recovery

If any of positions 1191–1198 need to be rolled back: revert commit `7b65ef2` (1191) and/or `bd94bdd` (1192–1198), or remove the specific position's two data files plus its `data/jobs.js` wiring, confirm Project Check, confirm Vercel deployment, and re-verify the live position count returns to 156 (or 163 if only one of the eight is removed). If 1097's salary correction needs to be rolled back: revert commit `51006cb` (salary top end reverts to $125,000). The client-name-anonymization fix (`a912779`) should never be rolled back — it corrects a confidentiality violation; if 1197 or 1198 need further text changes, edit forward from `a912779`, not before it.

## Standing lesson for future sessions

When drafting public-facing summary/whyConsider text for a **new client** (i.e., not one already established in prior positions), explicitly open with "AGILE's Client is..." — do not draft with the real company name and rely on a substitution pass later. The leak here happened because the six MGE positions (an established, familiar client) were drafted correctly on the first pass, but the two positions for newer clients in the same batch (Dewberry, French and Parrello) were drafted with real names and the substitution was missed until a live-site spot check caught it. Spot-checking at least one live page per new client after every deploy remains the backstop, but getting it right on the first draft avoids the exposure window entirely.
