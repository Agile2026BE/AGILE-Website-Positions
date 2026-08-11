# AGILE Careers GREEN Baseline — August 10, 2026

## Status

GREEN recovery baseline established for the current AGILE Careers production code after the August 10 repair and refinement cycle.

Baseline code commit:

`cc2d5c8104d092426dd8efaab8e4813d8582339a`

Commit message:

`Standardize blue dropdown chevrons sitewide`

Repository:

`Agile2026BE/AGILE-Website-Positions`

Branch:

`main`

Production domain:

`https://careers.agileconsultingsolutions.com`

## Verification Evidence

### GitHub Project Check

PASS.

GitHub Actions run: `31452798018`

The Project Check completed successfully for the exact baseline SHA. Its `Validate, lint, and build` step passed, which runs the repository `npm run check` command.

`npm run check` consists of:

1. Position/job data validation
2. ESLint
3. Next.js production build

### Vercel Production Deployment

PASS.

Vercel deployment was created for the exact baseline SHA and reported `success` / `Deployment has completed`.

GitHub deployment ID: `5843376365`

Production deployment timestamp: August 10, 2026 at approximately 10:35 PM Eastern.

## Functional Evidence Carried Forward From August 10 Production Testing

The August 10 production testing checkpoint confirmed the following working before this baseline was frozen:

- Position cards display and open correctly.
- Position detail modal opens correctly.
- Similar Positions are visible.
- Shortlist supports multiple positions and enforces the three-position limit.
- Clear Shortlist works.
- Saved shortlist state survives browser refresh.
- Single-position Copy Link produces clean content for Outlook and text messaging.
- Multi-position copying produces clean stacked content.
- Direct Careers links open the intended individual opportunity.
- Direct position pages preserve position details and Start a Conversation behavior.
- Start a professional conversation modal opens correctly.
- Quick Message selection changes the prefilled message.
- Inquiry submission reached `careers@agileconsultingsolutions.com` during live testing.
- Inquiry success confirmation and celebration behavior work.
- Resume attachment chooser opens the operating-system file picker.
- Personal inquiry fields do not persist after refresh.
- Saved shortlist selections remain available after refresh.

## August 10 Repairs Included In This Baseline

The baseline includes the controlled August 10 repair work and later launch refinements, including:

- Candidate inquiry greeting and closing copy.
- Required candidate Name validation in browser and API.
- Optional phone and explicit SMS/texting consent behavior.
- Masked public phone placeholders.
- Improved inquiry success placement on mobile.
- Shortlisted-position bullets in the inquiry modal.
- Updated shortlist count/review wording.
- Copy Link confirmation placement refinements.
- Footer wording refinements.
- Inquiry email output for shortlisted positions and texting permission.
- Position freshness/review-date presentation.
- Direct position page launch refresh.
- Verified professional review rotation updates.
- Hero copy refinements.
- Sitewide blue dropdown chevrons and mobile select treatment.

## Protected Recovery Rule

If a later production change causes a regression, return to code commit:

`cc2d5c8104d092426dd8efaab8e4813d8582339a`

Do not rebuild the Careers site from memory. Compare the later change against this SHA and restore only the breaking change whenever possible.

## Remaining Non-Blocking Follow-Up

The GitHub Actions run produced one infrastructure warning that does not fail the build: GitHub currently reports that Node.js 20-based versions of `actions/checkout@v4` and `actions/setup-node@v4` are being forced onto Node.js 24 by the runner. This is a workflow-maintenance item, not a Careers production failure.

Future browser/device QA should continue to use `TESTING.md` and `docs/CAREERS_TEST_CHECKPOINT_2026-08-10.md`. Any new functional or visual change after this baseline must independently pass Project Check and Vercel before replacing this recovery SHA.

## Baseline Decision

This commit is the current documented GREEN recovery baseline because:

- GitHub Project Check passed for the exact SHA.
- Job validation passed.
- ESLint passed.
- Next.js production build passed.
- Vercel production deployment succeeded for the exact SHA.
- Core recruiter/candidate workflows were confirmed during the August 10 production testing cycle and the subsequent commits remained inside the documented repair/refinement scope.
