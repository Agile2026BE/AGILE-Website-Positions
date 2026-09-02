# AGILE Careers — GREEN Baseline: Position Retirements (Sept 2, 2026, evening cycle)

Supersedes `de0324e` (the September 2 market-sector-cleanup baseline recorded earlier the same day in `docs/CAREERS_GREEN_BASELINE_2026-09-02.md`). This document covers a same-day follow-up cycle: retiring position 1104, correcting position 1012's labeling, and taking all 12 Arora Engineers positions dormant.

## New baseline commit

`5405fe0726928023315edb5e6786c4619d7aa059`

Commit message: `Update retiredPositionIds.js`

Repository: `Agile2026BE/AGILE-Website-Positions`
Branch: `main`

## What changed

Two commits, both touching only `data/retiredPositionIds.js` (no schema/component changes):

1. **`02749c92c7522acd25730060267abc8804612000`** — "Retire position 1104 (JBB dormant)": added position 1104 to the dormant list, client JBB, same reason text as the other 16 JBB positions retired earlier Sept 2.
2. **`5405fe0726928023315edb5e6786c4619d7aa059`** — "Update retiredPositionIds.js": two changes —
   - Relabeled position 1012's existing entry (retired 2026-08-27) from its old generic "client went unresponsive" wording to the standard Dormant phrasing, client Arora Engineers.
   - Added the other 11 Arora Engineers positions as Dormant (retired 2026-09-02): 1019, 1020, 1021, 1022, 1023, 1050, 1051, 1052, 1076, 1077, 1111.

`retiredPositionIds` array grew from 21 to 32 entries. No position IDs were deleted or reused — full records remain untouched in `data/jobs/*.js` and `data/jobDetails/*.js`; this only changes which IDs are filtered out of the live `jobs` export.

## Status terminology (standing rule, confirmed by Byron 2026-09-02)

**Dormant** and **Retired** are not interchangeable:
- **Dormant** = off the live site, reactivatable if the client re-engages. Applies to all 17 JBB positions (including 1104) and all 12 Arora Engineers positions.
- **Retired** = permanent, the position is never used again. Applies only to position 1100.

No Position ID is ever recycled for a new posting, regardless of Dormant/Retired/Active status. The literal filename `data/retiredPositionIds.js` is a pre-existing engineering label for the technical takedown mechanism (any ID in that array is filtered from the live site) — it is not itself a business status and does not imply permanence.

## Verification for this exact code SHA

- GitHub Actions "Project Check" #640 (commit `5405fe0`) and #639 (commit `02749c9`): both completed successfully on `main`.
- IndexNow Submit #34 and #33: both completed successfully (auto-submits retired position URLs to Bing/Yahoo for reindexing).
- Vercel production deployment `dpl_5aTGdRNtCJ75QhPWJzrpN6ugPYVB`: state `READY`, target `production`, built from commit `5405fe0`.
- Live production fetch confirmed:
  - `data/retiredPositionIds.js` on `raw.githubusercontent.com` shows 21 entries including 1104's correct reason text (fetched fresh, not cached).
  - `/careers` listing page: "154 positions match your current criteria" (fetched with a cache-busting query param after an initial fetch returned a stale cached 182 — see note below).
  - `/careers/positions/1104-...` and `/careers/positions/1019-senior-electrical-engineer` both return 404 (confirmed off the live site).
  - Position 1100 remains correctly absent from the sitemap (retired since Aug 22, unaffected by this cycle).

**Caching note:** `raw.githubusercontent.com` and the live `/careers` page can serve a stale cached response to a first fetch after a push; a cache-busting query string (`?cb=<sha>`) on the retry got a fresh result both times this session. Don't trust a single fetch immediately after a push if the number looks wrong — retry with a cache-buster before concluding something failed.

## Live position count

**154 positions live** on the careers site as of this baseline (186 total position records in the Master Position List workbook, minus 32 held back: 1 Retired + 31 Dormant).

## Master Position List workbook

Companion workbook update: v10 (`AGILE_Master_Position_List_20260902_v10.xlsx`), Status column set to `Dormant` for 1104 and all 12 Arora Engineers positions, `Retired` for 1100 only. See `/areas/agile-website.md` in Claude's memory for the full workbook version history and terminology rule.

## Recovery

If this cycle needs to be rolled back: revert commits `02749c9` and `5405fe0` (or remove the specific IDs from `data/retiredPositionIds.js`), confirm Project Check, confirm Vercel deployment, and re-verify the live position count.
