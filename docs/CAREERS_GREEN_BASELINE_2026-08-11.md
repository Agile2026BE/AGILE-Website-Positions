# AGILE Careers GREEN Baseline — August 11, 2026

## Recovery Baseline

Current protected production code SHA:

`3daf725af3eedf389524ac30f8ec762be9453d23`

Commit message:

`Improve mobile market selection and text contrast`

Repository: `Agile2026BE/AGILE-Website-Positions`

Branch: `main`

Production domain: `https://careers.agileconsultingsolutions.com`

## Verification

GitHub Project Check: PASS

GitHub Actions run: `31491504397`

Vercel Production deployment: SUCCESS

GitHub deployment ID: `5850441846`

The production deployment for the exact baseline SHA completed successfully.

## Changes Included Since The Previous Baseline

This baseline carries forward all verified August 10 Careers work plus the August 11 refinements, including:

- Sitewide blue dropdown chevrons.
- Blue custom Market Sectors chevron with up/down state.
- Natural inquiry message wrapping so `Thank you.` remains on the preceding line when space allows.
- Final approved desktop Contact anchor landing.
- Existing mobile Contact anchor behavior preserved separately.
- Three-position shortlist limit behavior preserved.
- Inquiry success confirmation preserved at the top of the modal.
- Existing starburst/confetti success celebration preserved.
- Soft two-tone success chime added after successful inquiry submission.
- Mobile-only stronger supporting-text contrast.
- Mobile Market Sectors selector now includes a visible Done control below the scrolling selection list.
- Desktop typography and desktop text contrast remain unchanged by the mobile contrast adjustment.

## User-Confirmed Production Behavior During August 11 Testing

- Desktop Contact landing approved.
- Three-position shortlist limit approved.
- Inquiry submission completed successfully.
- Green success confirmation displayed correctly at the top of the modal.
- Starburst celebration displayed correctly.

## Remaining Smoke Test

The latest mobile-only refinements should still be visually smoke-tested on a phone:

- Market Sectors Done control is clear and easy to reach.
- Mobile supporting text is easier to read without looking overly heavy.
- Success chime is audible where browser/device audio policy permits it.

These are confirmation tests, not build/deployment blockers. Project Check and Vercel Production are both GREEN for the baseline SHA.

## Recovery Rule

If a later production change causes a regression, return to:

`3daf725af3eedf389524ac30f8ec762be9453d23`

Compare the later commit against this SHA and restore only the breaking change whenever possible. Do not rebuild the Careers site from memory.
