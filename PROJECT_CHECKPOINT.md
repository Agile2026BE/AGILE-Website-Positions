# AGILE Careers Project Checkpoint

Last updated: August 10, 2026

## Purpose

This is the operational handoff and recovery record for AGILE Careers development. Read this file before making future production changes.

## AUGUST 10 ACTIVE TESTING CHECKPOINT

Current live testing and repair-queue record:

`docs/CAREERS_TEST_CHECKPOINT_2026-08-10.md`

Testing checkpoint commit:

`5fec0123e70dd82975ff754de4f153c45b736169`

This August 10 checkpoint records confirmed live behavior, Outlook/text/direct-link testing, inquiry testing, responsive observations, and the current repair/improvement queue.

IMPORTANT: This is a testing checkpoint, not a replacement for the verified GREEN BASELINE below. Do not treat unverified August 10 changes as a new green recovery baseline until Project Check, Vercel, and final browser/device smoke testing pass.

If work is interrupted or context is lost, read `README.md`, this file, `docs/CAREERS_BASELINE_2026-08-09.md`, and then `docs/CAREERS_TEST_CHECKPOINT_2026-08-10.md` before making additional changes.

## GREEN BASELINE

Current verified green baseline commit:

`a570f8ae40ae33af940476fbcf7c0c00c2f2cf84`

Commit message: `Refine position title typography for scanning`

Vercel status for this exact commit: SUCCESS.

Production domain:

`https://careers.agileconsultingsolutions.com`

Repository:

`Agile2026BE/AGILE-Website-Positions`

Branch:

`main`

Deployment:

Vercel

Inquiry delivery:

Resend -> `careers@agileconsultingsolutions.com`

## LOCKED REBUILD DIRECTION

Careers establishes the design system for the broader AGILE website rebuild.

Responsive targets:

- Large desktop / 36–40 inch+ monitors
- Standard desktop and laptop
- Tablet
- iPhone / mobile devices

Visual direction:

- Mature professional AEC appearance
- Deep navy, slate / steel blue, warm white
- Restrained light-blue and gold accents
- Strong readable typography
- Compact practical job-title typography
- Natural page flow rather than isolated brochure pages
- Motion only where it adds energy, trust, relevance, and professional appeal
- No cartoonish or oversized layouts
- No white-on-white card systems that lose visual hierarchy

Experience direction:

Attention -> Search -> Opportunity -> Proof -> AGILE Value -> Insights -> Conversation

Careers is the functional engine. The main AGILE website becomes the trust, positioning, relationship and conversion layer around it.

Do NOT rebuild the legacy GoDaddy site page-for-page. Preserve useful information and credibility, then reorganize it into a stronger connected experience.

## KNOWN-GOOD / PROTECTED FEATURES

Do not remove these during future visual work:

- Search Careers
- State filter
- Discipline filter
- Minimum Salary filter
- Workplace filter
- Market filter
- Keyword search
- Dynamic results count
- View Positions action
- Position result cards
- View Position
- Similar Positions
- +Shortlist / Saved Positions
- Maximum three shortlisted positions
- Copy Link / Share
- Direct Position ID URLs
- Position ID display
- Salary display
- Location display
- Workplace display
- Experience display
- Responsibilities / qualifications / Why Consider content
- Career inquiry form
- Optional resume upload
- Inquiry email delivery
- Market Insights opt-in
- Client Hiring Support pathway
- Responsive layouts
- Reviews / testimonial relevance logic
- AGILE Insights / legacy Why AGILE anchor compatibility

## RECRUITER USE CASE

The Careers site is not only candidate-facing. It is an active recruiting tool.

Required recruiter workflow:

Search -> open opportunity -> Similar Positions -> shortlist up to three -> copy/share direct links -> paste into Outlook, text, notes, Juicebox, or LinkedIn outreach.

Any future feature that interferes with this workflow is a regression.

## CANDIDATE CONVERSION DIRECTION

The site should reduce friction and encourage conversation rather than force a traditional application.

Key principles:

- Salary, location, workplace, experience and Position ID are visible.
- Client identity remains confidential until appropriate discussion/representation.
- Candidates can inquire without creating an account.
- Resume is optional for an initial inquiry.
- Similar Positions expose additional relevant opportunities.
- Saved Positions encourage return visits.
- Reviews should feel relevant and fresh rather than static.
- Market Insights gives professionals a reason to return even when they are not ready to apply.
- AGILE should feel specialized, connected, current, professional and human.

## TESTIMONIALS

Reviews are real AGILE placement testimonials retained from original emails/texts. Use approved initials and professional titles.

Desired engine:

- Two discipline/specialty-relevant verified testimonials when available.
- One verified broader AGILE experience.
- Rotate qualifying reviews after search/filter changes and across repeat browsing.
- Use attribution/signature and tags for matching.
- Never invent a quote or attribution to fill a category.

## CURRENT PAGE ORDER

Navigation and physical page order should agree:

1. Home / Careers Intro
2. Positions / Search Careers
3. AGILE Insights
4. Reviews
5. Market Insights
6. Contact / Start a Conversation
7. Footer / Client Hiring Support

Legacy `#why-agile` links should continue to resolve to AGILE Insights.

## LANDING / RESPONSIVE RULE

Anchor landing should be governed by one responsive sticky-header offset system rather than separate guessed values for every section.

Every navigation action must land cleanly without:

- exposing too much of the section above,
- hiding the destination heading beneath the sticky header,
- leaving large dead-space gaps,
- or centering mobile copy merely because the screen is narrow.

Mobile content should default to clean left alignment unless a specific visual statement is intentionally centered.

## MAIN WEBSITE REBUILD DIRECTION AFTER CAREERS

Planned modern structure:

- Home: current activity, positioning, proof, pathways and conversion
- Careers: Search Careers and opportunity discovery
- AGILE Insights: career guidance, market intelligence, compensation insights and professional guidance
- Reviews: verified professional experiences
- Employers / Client Hiring Support: recruiting services and relationship pathway
- Priority Opportunities: successor to Hot Jobs
- Salary tools: retain useful functionality but completely restyle
- Client proof / portfolio: modern metrics and relationship evidence rather than static logo walls
- Contact: professional institutional contact pathways plus quiet human credibility signals
- Footer resources: Privacy Policy, Candidate Security, Recruiting Scam Warning

Motion direction for the main site:

- Fast-loading, compressed HD loops
- NYC / major-market business movement
- Professionals in authentic business environments
- Architecture and modern skyscrapers
- Infrastructure / engineering context where appropriate
- No motion merely for decoration
- Mobile receives lighter media treatment when necessary for speed
- Always respect reduced-motion preferences

## HOSTING DECISION — IMPORTANT BEFORE GODADDY RENEWAL

Do not assume the rebuilt main site must remain inside GoDaddy Websites + Marketing.

The legacy GoDaddy builder permits custom HTML/CSS/JavaScript only inside custom HTML sections and does not provide the site-wide code control needed for the full AGILE rebuild direction.

Before renewing a website-builder or hosting product, confirm exactly which GoDaddy products are currently being billed and which services are actually required.

The domain registration may remain at GoDaddy while the rebuilt website itself can be hosted elsewhere. Domain registration and website hosting are separate decisions.

Do not cancel or allow a domain registration to lapse while migration is in progress.

## LAUNCH GATE — CAREERS

Before declaring Careers fully locked for launch:

1. Current commit remains green in Vercel.
2. Production homepage opens normally.
3. Home navigation returns to the top correctly.
4. Positions lands correctly on desktop and iPhone.
5. AGILE Insights lands correctly on desktop and iPhone.
6. Reviews lands correctly on desktop and iPhone.
7. Market Insights lands correctly on desktop and iPhone.
8. Contact lands correctly on desktop and iPhone.
9. Search/filter smoke test passes.
10. Dynamic result count updates correctly.
11. View Position opens.
12. Similar Positions opens selected position at the top.
13. +Shortlist adds/removes and persists through refresh on the same browser/device.
14. Maximum-three shortlist limit works.
15. Copy Link opens the intended exact Position ID route.
16. Share output remains clean in email, SMS and LinkedIn use cases.
17. Career inquiry submission succeeds.
18. Inquiry success state and brief AGILE celebration work.
19. Market Insights submission succeeds.
20. Client Hiring Support submission succeeds.
21. Desktop, laptop/tablet and iPhone layouts remain usable.
22. No overlapping section landings or excessive dead space.
23. Final green baseline SHA is updated here after all tests pass.

## RECOVERY PROCEDURE

If a production change breaks Careers:

1. Stop adding new changes.
2. Return to the last documented green baseline SHA.
3. Compare the breaking commit against that baseline.
4. Restore/revert only the breaking change when possible.
5. Confirm Vercel deployment.
6. Smoke-test the protected recruiter workflow.
7. Update this checkpoint with the repaired green baseline.

Never reconstruct the site from memory if a documented Git baseline exists.

## IMMEDIATE NEXT WORK

Launch-critical Careers testing only. The detailed August 10 pass/fail observations and repair queue are recorded in `docs/CAREERS_TEST_CHECKPOINT_2026-08-10.md`.

Continue the remaining launch tests before applying the collected repair batch:

- Complete any remaining navigation/responsive checks.
- Complete Search Careers/filter checks not already verified.
- Complete View Position / Similar Positions checks not already verified.
- Complete shortlist persistence checks not already verified.
- Complete remaining share-channel checks, including LinkedIn-style use if still outstanding.
- Complete Market Insights submission test.
- Complete Client Hiring Support submission test.
- Record any additional visual/function defects in the August 10 testing checkpoint.
- Then fix only the documented defects.
- Run Project Check and verify Vercel.
- Re-test the repaired functions.
- Freeze final Careers SHA only after the launch gate passes.

After Careers is locked, immediately begin the main AGILE website rebuild using this design system and rebuild direction.
