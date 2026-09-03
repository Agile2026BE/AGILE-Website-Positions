# GREEN Baseline — French and Parrello Client-Mapping Audit & Duplicate Cleanup (September 3, 2026, late session)

**Baseline code commit:** `7b2f49be8de1c85d092931c3dd07b39680616ffd`
(Supersedes `a912779`, the earlier September 3 client-name-leak fix baseline.)

**Commit message:** `Retire 1181 (duplicate of 1198), fix workplace/market consistency on 1182-1185 (French and Parrello)`

## What triggered this

Byron re-sent the "New Positions 35% Fee" client-doc batch for French and Parrello (also duplicated under a "French and Parrello Urgent 35% Fee" subfolder) — 5 job description .docx files, all Wall Township, NJ HQ roles. Before treating any of them as new, each was checked against the live site by title/location/salary/experience.

## Findings

All 5 client docs already had live matches — nothing new needed creating:

| Client doc | Live Position ID | Title |
|---|---|---|
| Assistant Chief Engineer Bridge Job Description.docx | 1198 (see below re: 1181) | Assistant Chief Engineer – Structural (Bridge) |
| Project Engineer - Structural (Bridge).docx | 1182 | Project Engineer, Structural (Bridge) |
| Senior Transportation Project Manager.docx | 1183 | Senior Transportation Engineering Project Manager |
| Transportation Engineering Project Manager.docx | 1184 | Transportation Engineering Project Manager |
| Transportation Group Manager.docx | 1185 | Transportation Group Manager |

Two data-integrity problems surfaced during the audit:

1. **Undetected live duplicate — position 1181 vs 1198.** Position 1181 ("Assistant Chief Engineer, Structural (Bridge)", added Aug 22 via commit `435dcd5`) and position 1198 ("Assistant Chief Engineer – Structural (Bridge)", added Sept 3 via commit `bd94bdd`) are the same French and Parrello opening — identical salary ($150,000–$200,000), identical experience (15+ years), identical location (Wall Township, NJ), identical PE requirement, responsibilities/qualifications text just reworded. Both were live simultaneously. Resolved by retiring 1181 (added to `data/retiredPositionIds.js`, same mechanism as the 1099/1100 precedent) and keeping 1198 — the newer, fully client-mapped listing — live.
2. **Workbook-only phantom duplicate — row 1199.** The Master Position List workbook had a row for Position ID "1199" ("Project Engineer – Structural (Bridge)") that duplicated live position 1182 in every field, but was never wired into `data/jobs/*.js` — it existed only in the workbook, never live. Deleted the row entirely (not marked Retired, since it was never live and no ID was ever assigned on the site).

## Internal Client mapping fixed

The Master Position List workbook's Internal Client column was blank for 1182, 1183, 1184, 1185 (1085 and 1198 were already mapped). All now correctly show **French and Parrello**:

| Position ID | Title | Status |
|---|---|---|
| 1085 | Electrical Department Group Manager | Active |
| 1182 | Project Engineer, Structural (Bridge) | Active |
| 1183 | Senior Transportation Engineering Project Manager | Active |
| 1184 | Transportation Engineering Project Manager | Active |
| 1185 | Transportation Group Manager | Active |
| 1198 | Assistant Chief Engineer – Structural (Bridge) | Active |
| 1181 | Assistant Chief Engineer, Structural (Bridge) | **Retired** (duplicate of 1198) |

Workbook is now at **v31** (`AGILE_Master_Position_List_20260903_v31.xlsx`), in the "Claude Downloads!!" folder on Byron's Desktop.

## Consistency fixes applied to 1182–1185 (live site + workbook)

To match sibling listing 1198's already-correct values:

- `workplace`: "Not stated" → **"On-Site"**
- `market`: "Transportation | Infrastructure / Civil" → **"Transportation / Aviation / Rail | Infrastructure / Civil"**

Position 1181's own record was left untouched (per standing retirement policy — full record stays as-written, only the retired-IDs filter changes what's publicly visible).

## Verification

- `npm run validate:jobs`: 163 records validated, clean
- `npm run lint`: clean, zero violations
- Vercel production deployment `dpl_4h8HQeBDt11w6WZyinMvPyA3p6Sc` — **READY**, built from commit `7b2f49b`
- Live-site spot checks after deploy:
  - `/careers/positions/1181-assistant-chief-engineer-structural-bridge` → **404** (correctly retired)
  - `/careers/positions/1183-senior-transportation-engineering-project-manager` → Workplace "On-Site", Market "Transportation / Aviation / Rail | Infrastructure / Civil" (fix confirmed live)
  - `/careers/positions/1198-assistant-chief-engineer-structural-bridge` → still live, title and On-Site workplace unaffected

## Live position count

No change in live count from adding/removing — 1181 retired (−1) exactly offsets that no new position was created. Live count remains 164 (unchanged from the prior `a912779` baseline), now with 33 IDs in `retiredPositionIds.js` (was 32).
