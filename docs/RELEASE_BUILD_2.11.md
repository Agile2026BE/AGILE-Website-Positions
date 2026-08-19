# AGILE Careers Release Build 2.11

**Date:** August 19, 2026
**Repository:** `Agile2026BE/AGILE-Website-Positions`
**Production branch:** `main`
**Current production checkpoint:** `e772fadec385d161706c689cc9c17f67e5150286`
**Release candidate checkpoint:** `115ff3cd0e6e035e6ad287a9b22a273145a7fc69`
**Status:** Promoted to production branch on August 19, 2026

## Included Approved Changes

1. Civil Engineering position repair for IDs 1161 and 1162.
2. Approved Careers mobile hero with the executive at the window.
3. Desktop three-image story band preserved.
4. Mobile capsule layout preserved at three pills on the first row and two pills on the second row.
5. Capsule order preserved as Salary Disclosed, Location Disclosed, Virtual Interviews, Work Schedule Disclosed, and No Account Setup Required.
6. Unified capsule activation motion and slower checkmark timing preserved across desktop and mobile.
7. Existing position filters, detail pages, forms, navigation, and unrelated position records preserved.

## Civil Engineering Records

### Position 1161

- Senior Civil Project Manager
- New York, NY
- Civil Engineering
- Hybrid Schedule
- $170,000–$230,000
- New York PE required

### Position 1162

- Senior Highway/Civil Engineer
- New York, NY
- Civil Engineering
- Hybrid Schedule
- $142,000–$185,000
- New York PE required

## Verified Search Results

1. New York + Civil Engineering + Any Salary returns IDs 1161 and 1162.
2. New York + Civil Engineering + $180,000 minimum returns IDs 1161 and 1162.
3. New York + Civil Engineering + $200,000 minimum returns only ID 1161.

## Validation Already Completed

1. All 183 position records pass the job validator.
2. ESLint passes.
3. The optimized Next.js build passes and generates all 373 static pages.
4. IDs and slugs remain unique.
5. Only the approved Civil records changed in the position data repair.

## Release Control

The live Careers domain is still serving production checkpoint `e772fadec385d161706c689cc9c17f67e5150286`, which does not contain the Civil Engineering repair. Release candidate `115ff3cd0e6e035e6ad287a9b22a273145a7fc69` was promoted to `main` after Byron Evans explicitly authorized Careers Version 2.11 production promotion.

## Recovery

- Pre-release production recovery: `e772fadec385d161706c689cc9c17f67e5150286`
- Exact Version 2.11 release candidate: `115ff3cd0e6e035e6ad287a9b22a273145a7fc69`
