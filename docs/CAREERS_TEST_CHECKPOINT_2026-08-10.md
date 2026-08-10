# AGILE Careers Testing Checkpoint — August 10, 2026

## Purpose

This file records the August 10, 2026 production testing session and controlled repair batch for the AGILE Careers site.

Repository: `Agile2026BE/AGILE-Website-Positions`
Production: `https://careers.agileconsultingsolutions.com`
Branch: `main`

The August 9 verified green baseline remains the emergency recovery baseline until this repair batch passes GitHub Project Check, Vercel deployment, and final browser/device smoke testing.

## Testing Strategy

1. Test a complete functional area.
2. Record defects and UX adjustments.
3. Apply related repairs as one controlled batch.
4. Run validation, lint, and production build through Project Check.
5. Confirm Vercel deployment.
6. Re-test repaired behavior in production on desktop/laptop and mobile.
7. Establish a new green baseline only after those checks pass.

## Confirmed Working During August 10 Testing

### Position search and shortlist

- Position cards display and open correctly.
- Position detail modal opens above the page and retains focus well.
- Similar Positions are visible.
- Shortlist supports multiple positions and enforces the three-position limit.
- Clear Shortlist works.
- Saved shortlist state survives browser refresh.

### Sharing and direct links

- Single-position Copy Link produces clean content for Outlook and text messaging.
- Multi-position copying produces clean stacked content.
- Direct Careers links open the intended individual opportunity.
- Direct position pages preserve position details and Start a Conversation behavior.

### Inquiry workflow

- Start a professional conversation modal opens correctly.
- Quick Message dropdown changes the prefilled message.
- Inquiry submission reached `careers@agileconsultingsolutions.com` during live testing.
- Green success confirmation and celebration behavior work.
- Resume attachment chooser correctly opens the operating system file picker. Desktop and mobile devices control the available file locations.

### Privacy and refresh test

PASS on August 10:

- Refresh closes the inquiry modal.
- Entered Name, Email, and Phone do not persist after refresh.
- Saved shortlist selections remain available after refresh.
- Reopening the inquiry form presents blank personal identity fields.

This is the desired separation: browsing selections may persist locally, while personal inquiry data does not.

## Controlled Repair Batch Applied August 10

The following source changes were committed to `main` after testing:

- Candidate inquiry Quick Message templates now begin with `Hello,` and end with `Thank you.`.
- Main Career Inquiry message templates were aligned to the same greeting and closing convention.
- Candidate inquiry Name is now required in the browser form and enforced again by the inquiry API.
- Phone remains optional.
- When a candidate enters a phone number, an optional explicit texting-permission checkbox appears. The submission email records Yes/No permission rather than assuming consent.
- Public form phone placeholders no longer expose the AGILE office number; they use `(***) ***-****`.
- Inquiry success feedback was moved higher in the modal and the modal scrolls to the top after successful submission so mobile users can immediately see confirmation.
- Shortlisted positions inside the inquiry modal are rendered as a clear bulleted list.
- Shortlist count wording now says `positions selected` rather than `positions saved`, and the shortlist panel includes a lightweight review/clear cue.
- Job-card share confirmation is aligned to the right beneath the Copy Link action.
- Footer wording changed from `Career Representation` to `Professional Representation`.
- Inquiry email output now includes shortlisted positions and texting-permission status.

## Items Intentionally Not Declared Complete Yet

These require production verification after deployment:

- Confirm GitHub Project Check is green for the repair batch.
- Confirm Vercel production deployment is green.
- Re-test inquiry submission after Name requirement and SMS-consent changes.
- Re-test desktop/laptop modal success placement.
- Re-test iPhone/mobile success placement.
- Verify all three Quick Message choices visibly contain `Hello,` and `Thank you.`.
- Verify masked phone placeholder on the candidate inquiry form.
- Verify optional SMS checkbox appears only after phone entry and does not block submission when unchecked.
- Verify shortlist bullets and selected-count wording.
- Verify Copy Link feedback placement.
- Continue checking dropdown chevron visibility and responsive anchor spacing during final smoke testing.

## Important Share-Link Observation

Clicking the actual direct hyperlink from Outlook or text messaging routes to the intended AGILE Careers position page. Pasting an entire human-readable copied summary into Chrome's address/search bar causes Chrome/Google to interpret the summary as a search query. That behavior is not an AGILE routing failure.

## Design and UX Principles Reconfirmed

- Function and stability before nonessential design work.
- Clear proof after user actions.
- Minimal reading burden.
- Strong mobile touch targets.
- Personal inquiry data must not persist after refresh.
- Saved position selections may persist to support comparison and return visits.
- Desktop, laptop, tablet, and phone must each be deliberately composed.

## Next Test

After the repair deployment is available, perform one focused production smoke test:

1. Open a position and shortlist it.
2. Open Start a professional conversation.
3. Confirm blank Name, Email, and Phone fields.
4. Confirm phone placeholder is masked.
5. Enter a phone number and confirm optional texting permission appears.
6. Cycle all Quick Message choices and confirm each begins `Hello,` and ends `Thank you.`.
7. Submit a valid inquiry and confirm the success message is immediately visible.
8. Refresh and confirm personal fields do not persist while shortlist state does.

## Recovery Rule

If context is lost, read in this order:

1. `README.md`
2. `PROJECT_CHECKPOINT.md`
3. `docs/CAREERS_BASELINE_2026-08-09.md`
4. `docs/CAREERS_TEST_CHECKPOINT_2026-08-10.md`

Never rebuild this state from conversation memory when the GitHub records are available.
