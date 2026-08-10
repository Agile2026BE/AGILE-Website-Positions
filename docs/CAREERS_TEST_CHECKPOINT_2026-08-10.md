# AGILE Careers Testing Checkpoint — August 10, 2026

## Purpose

This file records the August 10, 2026 live production testing session before the next repair batch. It is a recovery and handoff record, not a declaration that every item below has been fixed.

Repository: `Agile2026BE/AGILE-Website-Positions`

Production: `https://careers.agileconsultingsolutions.com`

Branch: `main`

Latest repository commit observed before this testing checkpoint was documented:

`2984eb9b4592ed574981f96690fd39784d7a42ab`

Commit message: `Slow and replay badge animations`

IMPORTANT: The previously documented verified GREEN BASELINE remains the recovery baseline until a new repair batch passes Project Check, Vercel, and final browser/device smoke testing. Do not replace the green baseline merely because this testing checkpoint exists.

## Testing Strategy

Current launch strategy is:

1. Test one functional area completely.
2. Record every defect, wording adjustment, layout issue, and UX improvement.
3. Do not interrupt the test cycle for isolated cosmetic fixes unless a defect blocks testing.
4. Pause after a complete area is tested.
5. Apply the collected fixes as a controlled batch.
6. Run validation / lint / production build.
7. Confirm GitHub Project Check and Vercel.
8. Re-run the same functional test area on desktop/laptop and mobile.
9. Only then establish a new green baseline.

Function and stability remain higher priority than cosmetic refinement during launch testing.

## Confirmed Working During August 10 Testing

### Position search and shortlist

- Position cards display and can be opened.
- Position detail modal opens over the page and retains focus well.
- Similar Positions are visible from the position detail experience.
- Shortlist supports multiple positions and enforces the three-position limit.
- The three-position limit produces a clear message when a fourth item is attempted.
- Shortlisted positions remain visible in the shortlist area.
- Clear Shortlist works.

### Sharing / clipboard workflow

- Single-position Copy Link produces a clean position summary suitable for Outlook and text messaging.
- Multi-position copying produces a clean stacked summary in Outlook.
- Multi-position copying also pastes cleanly into text messaging.
- Direct links embedded in copied Outlook/text content can open the intended AGILE Careers position route.
- Direct AGILE Careers position pages such as `/positions/1012-senior-special-systems-designer` load the intended individual opportunity.
- The direct position page includes position facts, qualifications / Why Consider content, and a Start a Conversation pathway.

### Inquiry workflow

- Start a professional conversation modal opens centered above a darkened page background.
- Quick Message dropdown changes the prefilled message.
- Inquiry submission reaches `careers@agileconsultingsolutions.com` during live testing.
- A visible green success confirmation appears after a successful submission.
- The lightweight celebration / starburst success behavior was positively received during testing.

### Responsive / composition observations

- Desktop position search, cards, shortlist and modals are visually organized and professional.
- Modal presentation is especially effective because the lifted centered panel removes competing page distractions.
- Direct position page is readable and preserves AGILE navigation and footer structure.
- Mobile success behavior functions, but the success location requires refinement described below.

## Repair / Improvement Queue — NOT YET ASSUMED COMPLETE

These items were identified during August 10 testing and should be handled as a controlled repair batch after the current test area is complete.

### Shortlist clarity

- In inquiry forms that show shortlisted positions, render each shortlisted position as a clearly identifiable list item / bullet instead of allowing the group to read visually like a heading block.
- Add a very small, low-reading-load instruction or cue explaining where the shortlist can be reviewed / cleared so users do not have to hunt for it.
- Keep the instruction lightweight; do not turn the interface into a tutorial.

### Form validation and contact permissions

- Name must be required before an inquiry can submit.
- Review whether phone should also be required; current testing exposed that submission can proceed without a complete identity set. Final behavior should be deliberate and consistent.
- Add an explicit texting-permission checkbox when a phone number is supplied, using legally cautious nationwide-friendly consent wording rather than assuming SMS permission.
- Do not imply that providing a phone number automatically grants marketing-text consent.

### Success confirmation UX

- On mobile, the green success message can land too low and become difficult to notice because of browser bottom controls / Google search field area.
- Move or duplicate the successful-submission confirmation into an immediately visible portion of the modal after submit.
- Preserve the current visible confirmation plus restrained celebration behavior.
- Consider a low-volume optional success chime / reward tone only if implemented with an obvious sound-off / volume control and without autoplay annoyance. Treat this as secondary to launch-critical functionality.

### Interactive dropdown affordance

- Make dropdown arrows / chevrons blue or otherwise more visibly interactive where appropriate.
- Apply consistently across appropriate AGILE Careers controls.
- Maintain accessible contrast and large enough mobile touch targets.

### Share confirmation placement

- Current small `Shared` feedback can appear under the left side of the card and is easy to miss.
- Move share/copy confirmation directly beneath or adjacent to the `Copy Link` action so cause and result are visually connected.

### Public phone-number presentation

- Replace exposed office phone digits in the identified public display context with masked stars/dashes where requested rather than showing the full office number in that specific presentation.
- Review all repeated public phone-number presentations before applying so the correction is intentional and does not accidentally break legitimate contact pathways.

### Wording refinement

- Replace `Career Representation` with `Professional Representation` in the footer / supporting description where identified. The requested wording is both more accurate and visually fits the composition better.

### Landing / spacing refinement

- Continue judging anchor and modal landing positions by actual screen composition, not abstract CSS values alone.
- Validate top and bottom breathing room on large desktop, normal laptop, and phone.
- Ensure destination headings are not hidden below the sticky header and that excessive dead space is not introduced.

## Important Share-Link Observation

During testing, two behaviors were observed depending on how the copied content was handled:

1. Clicking the actual hyperlink from Outlook or text messaging can route directly to the AGILE Careers position page as intended.
2. Pasting the entire human-readable copied summary into the Chrome address/search bar causes Chrome/Google to treat the complete summary as a search query. Google may then surface the legacy `agileconsultingsolutions.com/positions` page in search results.

This is not the same action as opening the direct hyperlink. The direct AGILE Careers position URL itself is working and was verified to open the intended position page.

Repair work should preserve clean clickable direct URLs and minimize ambiguity in copied output, but Google treating an entire pasted sentence as a search query should not be confused with an AGILE routing failure.

## Direct Position Page Observation

The new direct position route is materially better for sharing than the legacy GoDaddy positions destination because it opens the intended position inside the modern AGILE Careers experience. Keep direct position URLs protected during repairs.

## Design / UX Principles Reconfirmed During Testing

- Engineer / architect level attention to alignment and details.
- Modern, restrained, premium professional presentation.
- Clear visual proof after actions: copied, saved, submitted, succeeded.
- Interactive fields should visibly look interactive.
- Strong mobile touch targets.
- Prefilled choices where they save effort.
- Modal focus for important actions where appropriate.
- Minimal reading burden.
- Anticipate the next useful action rather than forcing the user to hunt.
- Desktop, laptop and phone must each be deliberately composed rather than treated as scaled versions of one layout.

## Next Testing Position

Resume Careers launch testing from the point immediately after the share/direct-link/inquiry cycle recorded above.

Do not begin the repair batch until the current functional area has been fully tested and the remaining observations are captured.

## Recovery Rule

If context is lost, read in this order:

1. `README.md`
2. `PROJECT_CHECKPOINT.md`
3. `docs/CAREERS_BASELINE_2026-08-09.md`
4. `docs/CAREERS_TEST_CHECKPOINT_2026-08-10.md`

Never rebuild this state from conversation memory when the GitHub records are available.
