# AGILE Careers Project Checkpoint

Last updated: August 10, 2026 — GREEN baseline freeze

## Purpose

This is the operational handoff and recovery record for AGILE Careers development. Read this file before making future production changes.

## GREEN BASELINE

Current verified GREEN recovery baseline code commit:

`cc2d5c8104d092426dd8efaab8e4813d8582339a`

Commit message:

`Standardize blue dropdown chevrons sitewide`

Detailed baseline record:

`docs/CAREERS_GREEN_BASELINE_2026-08-10.md`

Verification for this exact code SHA:

- GitHub Project Check: SUCCESS
- GitHub Actions run: `31452798018`
- Job data validation: PASS
- ESLint: PASS
- Next.js production build: PASS
- Vercel Production deployment: SUCCESS
- GitHub deployment ID: `5843376365`

Production domain:

`https://careers.agileconsultingsolutions.com`

Repository:

`Agile2026BE/AGILE-Website-Positions`

Branch:

`main`

Inquiry delivery:

Resend -> `careers@agileconsultingsolutions.com`

IMPORTANT: The documentation commits created to record this baseline come after the baseline code SHA. The recovery target for site behavior remains the code commit above unless a later production code change is independently verified and documented.

## AUGUST 10 TESTING RECORD

Live testing and repair history:

`docs/CAREERS_TEST_CHECKPOINT_2026-08-10.md`

That testing cycle confirmed core position search/shortlist, direct-link/share, inquiry delivery, success-state, resume chooser, and privacy/refresh behavior before the final August 10 repair/refinement commits.

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

## LAUNCH / CHANGE GATE — CAREERS

The current baseline is frozen. For any later production code change to replace it:

1. Preserve protected recruiter/candidate workflows.
2. Run Project Check.
3. Confirm job validation, lint, and production build pass.
4. Confirm Vercel production deployment succeeds.
5. Smoke-test the changed functional area in production.
6. Check responsive behavior affected by the change.
7. Record the replacement baseline SHA here only after verification.

## RECOVERY PROCEDURE

If a production change breaks Careers:

1. Stop adding new changes.
2. Return to `cc2d5c8104d092426dd8efaab8e4813d8582339a`.
3. Compare the breaking commit against that baseline.
4. Restore/revert only the breaking change when possible.
5. Confirm Project Check.
6. Confirm Vercel deployment.
7. Smoke-test the protected recruiter workflow.
8. Update this checkpoint only after the repaired code is verified.

Never reconstruct the site from memory if a documented Git baseline exists.

## NON-BLOCKING MAINTENANCE

GitHub Actions currently emits one infrastructure warning: Node.js 20-based `actions/checkout@v4` and `actions/setup-node@v4` are being forced to Node.js 24 by the runner. The Project Check still passes. Treat this as workflow maintenance, not a production Careers failure.

## IMMEDIATE NEXT WORK

Careers has a documented GREEN recovery baseline. Do not reopen broad feature work tonight unless required for a confirmed production defect.

Next planned development phase after Careers is locked:

Begin the main AGILE website rebuild using the established Careers design system and rebuild direction.
