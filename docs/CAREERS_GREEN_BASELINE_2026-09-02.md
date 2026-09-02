# AGILE Careers GREEN Baseline — September 2, 2026 (Market Sector Cleanup)

## Status

GREEN baseline established after this session's position-modal MARKET field addition, position 1188 specialty trim, and a sitewide market-sector data cleanup (standalone "Education" consolidated into "Higher Education" across 56 positions). Confirmed live in production and spot-verified directly against the live site.

Baseline code commit:

`de0324e` — "Consolidate standalone Education into Higher Education (1187)," branch `main`. This supersedes commit `0097528` (the September 2 "openings field" baseline recorded earlier the same day in `PROJECT_CHECKPOINT.md`).

Repository:

`Agile2026BE/AGILE-Website-Positions`

Branch:

`main`

Production domain:

`https://www.agileconsultingsolutions.com/careers` (also serves at `https://careers.agileconsultingsolutions.com`)

## Work Included In This Baseline

### 1. Position modal MARKET field added

**Problem:** the position detail modal (`components/PositionModal.js`, opened from the "View Position" grid card) only rendered `job.specialty` in a labeled blue box — it had no dedicated MARKET row at all, unlike the standalone detail page (`app/careers/positions/[slug]/page.js`), which already showed the full pipe-separated market list in its own `<dl>` row. On most positions this meant a candidate viewing the modal could not see which market sectors applied unless they happened to also be spelled out inside the specialty text (true only for position 1188, by coincidence of how that specialty was originally written).

**Fix:** added a second labeled row to the modal, immediately after SPECIALTY, mirroring the standalone page's pattern:

```jsx
{job.specialty?<div className={styles.specialty}>SPECIALTY: {job.specialty}</div>:null}
{job.market?<div className={styles.market}>MARKET: {job.market}</div>:null}
```

New `.market` CSS rule added to `components/PositionModal.module.css`, visually matching `.specialty`'s shape (padding, border-left accent, uppercase label styling) but with a distinct teal/gray-green accent color instead of blue, so the two rows read as related-but-different fields rather than duplicates. Matching mobile font-size rule added to the existing `@media(max-width:640px)` block.

Commits: `5ec1d7a` (modal JSX), `4d3997f` (CSS).

### 2. Position 1188 specialty text trimmed

**Problem:** position 1188's `specialty` field was originally written as `"Electrical Low and Medium Voltage – Corporate, Healthcare, Higher Education, Hospitality, Cultural, Laboratory & Research"` — restating all six of the position's market sectors inside the specialty text, which is what had been making the (pre-fix) modal appear to show market info by coincidence. Now that MARKET has its own row everywhere, this duplication read as confusing/redundant on the standalone page, which shows SPECIALTY and MARKET side by side.

**Fix:** trimmed `specialty` down to just `"Electrical Low and Medium Voltage"` — describing the work, not the industries. `market` field (`"Corporate and Finance | Cultural | Healthcare | Higher Education | Hospitality | Laboratory & Research"`) was already correct and untouched.

Commit: `4e2b620`.

**Going-forward convention (not enforced in code, just a content note for future postings):** specialty should describe the type of engineering work; market should carry the industry/sector list. Keeping them separate avoids exactly the ambiguity this fix cleaned up.

### 3. Sitewide market-sector cleanup — standalone "Education" retired

**Decision (Byron):** every position's `market` field that contained a standalone `"Education"` value should be consolidated into `"Higher Education"` — there is no separate "K-12 / lower education" market category on the site, and candidates will be told separately (outside the site) that they may also have a chance to work on lower education levels. This is a data-only change; no new market category was created.

**Scope found:** 56 positions across 10 of the 16 `data/jobs/positions-*.js` files contained a standalone `"Education"` value. Two patterns existed and were handled differently to avoid producing a duplicate tag:

- **Rename** (39 positions) — market had only standalone `"Education"`, no `"Higher Education"` already present. Simple rename to `"Higher Education"`, preserving every other sector in the pipe-separated list exactly.
- **Dedupe** (17 positions) — market already contained *both* `"Higher Education"` and a separate standalone `"Education"` entry (redundant even before this cleanup). The standalone `"Education"` was removed rather than renamed, to avoid ending up with `"Higher Education | Higher Education"`.

**Full position list by file and commit:**

| File | Commit | Positions |
|---|---|---|
| `data/jobs/positions-1001-1020.js` | `d1c3b1c` | 1007, 1010, 1011, 1012, 1014, 1018, 1020 |
| `data/jobs/positions-1021-1040.js` | `4ee98ac` | 1023, 1024, 1028, 1030, 1036, 1037, 1039 |
| `data/jobs/positions-1041-1060.js` | `5e243e8` | 1047, 1049, 1050, 1051, 1052, 1057 |
| `data/jobs/positions-1061-1080.js` | `b53c232` | 1065, 1066, 1067, 1073, 1076, 1078, 1079 |
| `data/jobs/positions-1081-1100.js` | `abb4dae` | 1082, 1085, 1089, 1090, 1096, 1097 |
| `data/jobs/positions-1101-1112.js` | `4edf1f6` | 1103, 1104, 1106, 1111 |
| `data/jobs/positions-1113-1132.js` | `a5feae6` | 1114, 1119, 1122, 1127, 1128, 1131 |
| `data/jobs/positions-1133-1142.js` | `f627c31` | 1133, 1136, 1138, 1139, 1141 |
| `data/jobs/positions-1143-1152.js` | `be4b06d` | 1144, 1145, 1146, 1147, 1148, 1149, 1150 |
| `data/jobs/positions-1187-1187.js` | `de0324e` | 1187 |

56 positions total. Every remaining `data/jobs/*.js` file (1153–1186, 1188) was checked against the original session's raw fetch of all job data and confirmed to have no standalone `"Education"` value needing this fix.

**No filter-options file needed updating.** The Market Sectors dropdown (`components/MultiSelectFilter.js`, rendered from `components/JobBoard.js`) is not backed by a static options list — `lib/jobFilters.js`'s `buildFilterOptions()` derives the market option list live from `jobs.flatMap(job => splitValues(job.market))` on every render. With no position left containing standalone `"Education"`, that value stops appearing as a selectable filter option automatically, with nothing further to edit.

### 4. Two mistakes caught and corrected mid-session (both fixed before committing)

- **Missed position 1078** — the initial per-file audit list omitted position 1078 (`"Mission Critical | Healthcare | Education | Commercial | Media and Broadcast"`) from the `positions-1061-1080.js` work list. Caught via a full re-read of that file's final content before committing; 1078 was fixed and folded into the same commit (`b53c232`) rather than requiring a follow-up.
- **Corrupted market string in `positions-1143-1152.js`** — a browser-editor find/replace operation intended to fix positions 1146/1148/1149 (which shared an identical market value) produced a garbled string on 1146 (`"market":"H"market":"Healthcare | Higher Education | Commercial | Industrial"ealthcare | Higher Education | Transportation | Energy and Utilities"`) because the replace field's prior contents weren't fully cleared before typing the new value. Caught by re-reading the file immediately after the operation, before committing. Fixed with a second, corrective find/replace targeting the exact corrupted string; all three positions (1146, 1148, 1149) re-verified clean afterward. The corrupted string was never committed to `main` at any point.

Both catches happened because every file's final content was re-read and manually cross-checked against the original raw data (captured earlier in the same session) immediately before each `git commit` — no file was committed on the strength of the edit tool's own success message alone.

## Live Verification Performed This Session

- Position 1010 standalone detail page (`/careers/positions/1010-senior-electrical-commissioning-engineer`): live-fetched and confirmed `MARKET: Mission Critical | Data Centers | Healthcare | Higher Education` — correct deduped value, matches the committed diff exactly.
- Position 1188 detail modal and standalone page: confirmed MARKET row renders correctly (six sectors, pipe-separated) and SPECIALTY now reads only `Electrical Low and Medium Voltage`.
- Position 1010 and 1078's modal MARKET rows spot-checked via screenshots mid-session, confirmed rendering with the new `.market` styling, visually distinct from the existing `.specialty` box.
- All 10 commit pages confirmed "Verified" on GitHub after each commit.

## Protected Recovery Rule

Commit `de0324e` on `main` is the recovery target for this baseline. All September 2 "openings field" work (baseline `0097528`, see `PROJECT_CHECKPOINT.md`) remains intact and unmodified — nothing in this session touched `data/jobBoardConfig.js`, the openings badge, or any non-`market`/non-`specialty` field on any position. Nothing in this session touched discipline tagging, Featured Positions, or any component outside `PositionModal.js`/`PositionModal.module.css` and the `data/jobs/*.js` market values listed above.
