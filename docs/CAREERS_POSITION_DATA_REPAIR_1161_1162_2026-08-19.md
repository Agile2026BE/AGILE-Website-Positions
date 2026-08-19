# AGILE Careers Position Data Repair — IDs 1161 and 1162

**Date:** August 19, 2026

**Repository:** `Agile2026BE/AGILE-Website-Positions`

**Approved baseline:** `e772fadec385d161706c689cc9c17f67e5150286`

**Status:** Review publication authorized — existing Careers review branch only

**Review publication authorization:** Yes — August 19, 2026

**Production authorization:** No

## Exact Authorized Repair

Correct the searchable Careers position records for IDs 1161 and 1162 so the State and Discipline filters return their verified New York Civil Engineering positions. Do not alter the filter logic or any unrelated position.

## Corrected Position 1161

- Title: Senior Civil Project Manager
- Discipline: Civil Engineering
- Specialty: Civil Engineering – Public Infrastructure & Transportation
- Location: New York, NY
- State: New York
- Workplace: Hybrid Schedule
- Salary: $170,000–$230,000
- Experience: 10–15 years
- Credential: New York PE required
- Bonus: Yes
- Slug: `1161-senior-civil-project-manager`

## Corrected Position 1162

- Title: Senior Highway/Civil Engineer
- Discipline: Civil Engineering
- Specialty: Highway & Civil Engineering – Transportation Infrastructure
- Location: New York, NY
- State: New York
- Workplace: Hybrid Schedule
- Salary: $142,000–$185,000
- Experience: 8–12 years
- Credential: New York PE required
- Bonus: Yes
- Slug: `1162-senior-highway-civil-engineer`

## Accuracy Controls

- The correction uses the position fields supplied by Byron Evans and the existing detailed Civil responsibilities, qualifications, and Why Consider content already assigned to IDs 1161 and 1162.
- No client name was added to or changed in the public website data.
- No responsibility, qualification, or Why Consider text was changed.
- No filter logic was changed.
- No other position record was changed.

## Validation

1. `npm run validate:jobs` passed for all 183 position records.
2. ESLint passed.
3. The optimized Next.js production build passed and generated all 373 static pages.
4. New York + Civil Engineering + Any Salary returns exactly IDs 1161 and 1162.
5. New York + Civil Engineering + $180,000 minimum returns IDs 1161 and 1162 because both salary ceilings meet that threshold.
6. New York + Civil Engineering + $200,000 minimum returns only ID 1161.
7. Both corrected position pages return the verified Civil title, discipline, and salary.
8. All 183 IDs and slugs remain unique.
9. Semantic comparison confirms that only records 1161 and 1162 changed.

## Integrity Audit — IDs 1153–1171

The audit found searchable-index/detail-title mismatches for IDs 1153–1160 and 1163–1171. Those records were not changed because complete verified core fields were not available for every position.

The affected IDs are:

`1153`, `1154`, `1155`, `1156`, `1157`, `1158`, `1159`, `1160`, `1163`, `1164`, `1165`, `1166`, `1167`, `1168`, `1169`, `1170`, and `1171`.

Correcting those records requires a separate controlled review against their client-specific source descriptions. Guessing or extrapolating is prohibited.

## Changed Source File

`data/jobs/positions-1153-1162.js`

## Rollback

The exact pre-repair data recovery point is baseline commit `e772fadec385d161706c689cc9c17f67e5150286`. The existing Careers review-branch history remains preserved.
