# CAREERS GREEN BASELINE â 2026-09-21

**Baseline commit: `22328f7`** ("Sync 1211 salary in metaDescription")
Verified: GitHub Actions Project Check green, IndexNow Submit green, live-site spot check on positions 1207 and 1209 confirmed correct (title, salary, location, openings badge).

## What changed since the prior baseline (2026-09-13, commit `d6d8ffc`)

### 1. Multiple-openings badge corrections (existing positions)
Openings counts corrected to match the current MGE NYC headcount request (previous values were from an earlier, different MGE ask):
- **1151** (Lead Electrical Designer, NYC, 8+ yrs): openings set to **3**
- **1152** (Senior Electrical Designer, NYC, 4+ yrs): openings set to **2**
- **1189** (Senior Electrical Designer, NYC, 10+ yrs): openings corrected from 3 â **1**
- **1103** (Lead Plumbing & Fire Protection Designer, NYC, 6+ yrs): openings corrected from 2 â **1** (the second slot is now its own separate posting, 1208)

### 2. Site-wide review date
`lib/positionFreshness.js` `POSITION_REVIEW_LABEL` updated from "Reviewed August 10, 2026" â **"Reviewed September 21, 2026"**. This drives the JobPosting `datePosted` schema field and the sitemap `lastModified` date sitewide.

### 3. Five new MGE positions added â IDs 1207â1211
New files: `data/jobs/positions-1207-1211.js`, `data/jobDetails/details-1207-1211.js`. Wired into `data/jobs.js` (import + array spread, same pattern as every prior batch). Client: MG Engineering (MGE) for all 5. All Hybrid.

| ID | Title | Location | Salary | Experience | Openings |
|---|---|---|---|---|---|
| 1207 | Electrical Design Manager/Senior Electrical Engineer | NYC, NY | $165,000â$185,000 | 10+ yrs | 1 |
| 1208 | Lead Plumbing & Fire Protection Designer (2nd NYC posting) | NYC, NY | $135,000â$175,000 | 8+ yrs | 1 |
| 1209 | Lead Mechanical Designer | Hollywood, FL + Philadelphia, PA (one posting, both states â same multi-state pattern as position 1006) | $125,000â$160,000 | 8+ yrs | 2 |
| 1210 | Senior Plumbing & Fire Protection Designer | Philadelphia, PA | $90,000â$125,000 | 4+ yrs | 1 |
| 1211 | Senior Electrical Designer | Hollywood, FL + Philadelphia, PA (one posting, both states) | $110,000â$150,000 (corrected same day from an initial $100,000â$140,000 draft) | 4+ yrs | 2 |

Note: position ID 1206 was already in use (BIM Coordinator, MGE, added by a separate session) by the time this batch was assigned â confirmed by checking the live `data/jobs/` directory listing directly rather than trusting workbook notes, which is why this batch starts at 1207, not 1206.

### 4. Master Position List workbook
Updated to **v39** (`AGILE_Master_Position_List_20260921_v39.xlsx`) â all 5 new positions added with Internal Client "MG Engineering (MGE)". 208 total records, 170 Active. Recalc clean (0 formula errors).

## Recovery
If a later change breaks the site, revert `main` to commit `22328f7` and reapply anything after it one commit at a time â every commit in this batch is individually named and atomic.
