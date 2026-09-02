# AGILE Careers Project Checkpoint

Last updated: September 2, 2026 — GREEN baseline confirmed on both GitHub Project Check and Vercel Production deployment

## Purpose

This is the operational handoff and recovery record for AGILE Careers development. Read this file before making future production changes.

## GREEN BASELINE

Current verified GREEN recovery baseline code commit:

`0097528`

(Short SHA as confirmed on GitHub/Vercel; full 40-character hash: `00975287f4e806f8f10f8788fa19b1d2d1f8df65`.)

Commit message:

`Add 'openings' to job board configuration`

Detailed baseline record:

`docs/CAREERS_GREEN_BASELINE_2026-09-01.md` for August/September 1 history; see the SEPTEMBER 2 REFINEMENTS section below for this session

Verification for this exact code SHA:

- GitHub Project Check: SUCCESS (run #618) — green after the fix to `data/jobBoardConfig.js`; run #617 (prior commit) had failed job-record validation, see SEPTEMBER 2 REFINEMENTS below
- Job data validation / lint / production build: PASS through Project Check
- Vercel Production deployment: SUCCESS — Ready, tagged Production and Current, confirmed via the Vercel API
- Vercel deployment ID: `dpl_HVpkVWoxkLoy4X7AG7oHyzTPgGWL`

Production domain:

`https://www.agileconsultingsolutions.com`

(Changed from `https://careers.agileconsultingsolutions.com`, recorded in every baseline through August 11 — confirm intentionally whether that subdomain should still resolve, redirect, or be retired.)

Repository:

`Agile2026BE/AGILE-Website-Positions`

Branch:

`main`

Inquiry delivery:

Resend -> `careers@agileconsultingsolutions.com`

IMPORTANT: Documentation commits created to record this baseline come after the baseline code SHA. The recovery target for site behavior is the code commit above unless a later production code change is independently verified and documented.

Note: `a7df363` itself contains no visible/functional changes versus `64aab93` (the August 20–23 feature commit) — it's the second of two lint-only follow-up commits that got the repository's GitHub Actions "Project Check" back to green. See `docs/CAREERS_GREEN_BASELINE_2026-08-23.md` for the full chain and what each lint fix touched.

## AUGUST 11 LOCKED REFINEMENTS

The August 11 GREEN baseline includes the approved desktop Contact landing, sitewide blue dropdown chevrons, blue Market Sectors chevron states, natural inquiry message wrapping, the three-position shortlist limit, inquiry success confirmation at the top of the modal, starburst celebration, a soft success chime, mobile-only stronger supporting-text contrast, and a mobile Market Sectors Done control.

The latest mobile-only refinements should receive a final phone smoke test, but GitHub Project Check and the exact Vercel Production deployment are GREEN.

## AUGUST 23 REFINEMENTS (now part of the GREEN BASELINE above)

Position modal and job grid cards redesigned to match (salary promoted near Shortlist/top, compact Location/Workplace/Experience/Position ID layout, no separate Position ID badge). Shortlist star turns gold/bronze on selection. Salary normalizes to "Market Rate" in green when not a real number. Workplace display normalizes to Hybrid/On-Site/Remote everywhere. Position ID and several readability-pass font sizes increased (Explore Resources accordion, chess panel, Contact form, position card meta labels). Share/copy email formatting rebuilt compact and `pt`-sized for Outlook, with link text shortened to "View Position" and color made redundant (span + legacy `font` tag) after Outlook was found to strip block-level color. The standalone position detail page (`/careers/positions/[slug]`, what a shared `/p/[id]` link opens to) gained a working Shortlist button (sharing the same saved-positions storage as the grid) and a Similar Positions section, via new `lib/similarJobs.js` and `components/PositionPageShortlist.js`. That page also received a small mobile-only font-size increase; desktop/laptop are unchanged. Two follow-up commits then fixed six lint violations flagged by the repository's own GitHub Actions "Project Check" (no visible/functional change) to get this cycle's work fully GREEN — see `docs/CAREERS_GREEN_BASELINE_2026-08-23.md`.

## SEPTEMBER 1 REFINEMENTS (now part of the GREEN BASELINE above)

Discipline taxonomy overhaul: found that 77 live positions (~40% of the site) used a `"discipline":"Mechanical Engineering"` value that had no matching option in the `disciplineOptions` dropdown and printed as a non-standard label on every job card. Added a new `MEP Project Manager` discipline option, tightened the `"mechanical hvac"` fuzzy-match alias in `lib/jobFilters.js` so it no longer over-matches on the bare word "mechanical," and retagged all 77 positions into `Mechanical HVAC` (58), `Mechanical Plumbing and Fire Protection` (14), or `MEP Project Manager` (5) based on their actual title/specialty content. Zero positions remain tagged `Mechanical Engineering` — verified live against the GitHub API. Two Commissioning-discipline retags (positions 1010, 1074) carried over from a prior session were also completed. New position 1187 (Senior Mechanical Engineer, Pine Brook NJ) added and tagged `Mechanical HVAC`. `Featured Positions` (`data/featuredPositionIds.js`) curated per Byron's direction: 1010 → 1074, 1040 → 1162, 1129 → 1095 (added for Florida geographic representation), settling at `["1074", "1075", "1095", "1162", "1181"]`. Position 1074 salary updated to $175,000–$210,000 and market expanded to `Healthcare | Higher Education | Commercial`. The homepage/careers hero `.lifeWord` ("life." in "Find work that fits your life.") was tried at bold, then semibold, then reverted to the original italic-only styling after Byron felt the added weight looked "cartoonish" — net no visible change from session start, documented so this isn't re-attempted blind in a future session. Same-day follow-up: Byron caught via a phone screenshot that Featured Positions salaries didn't align cleanly on mobile (location text length varies card to card, pushing salary to different horizontal positions). Fixed in two iterations — first stacked salary under location (commit `fda3d75`), then corrected per Byron's preference to keep salary right-aligned on the same row instead, matching the rest of the site's convention (commit `38e6e52`, the baseline as of September 1). Full detail, exact position-ID lists, SEO/indexing audit findings, and operational notes (GitHub API vs. raw.githubusercontent.com CDN lag, intermittent commit-dialog failures) are in `docs/CAREERS_GREEN_BASELINE_2026-09-01.md`.

## SEPTEMBER 2 REFINEMENTS (now part of the GREEN BASELINE above)

New position 1188 (Senior Electrical Engineer, New York, NY) added and tagged `Electrical Engineering`. Market curated to `Corporate and Finance | Cultural | Healthcare | Higher Education | Hospitality | Laboratory & Research` per Byron's working rule: sectors named or clearly implied in the source job description take priority; when the JD is silent, company-background sectors are trimmed to what's plausible for the specific role rather than the client's full practice list. Specialty set to `Electrical Low and Medium Voltage` rather than the vaguer `Building Systems`, keeping the discipline/specialty fuzzy-match in `lib/jobFilters.js` accurate.

New sitewide feature: multiple-openings display. Added an optional `openings` field (number) to the job schema, shown as a conditional badge ("N Openings", rendered only when greater than 1) in `components/JobCard.js` (grid), `components/PositionModal.js` (modal info grid, next to Position ID), and the standalone detail page (`app/careers/positions/[slug]/page.js`). Deliberately excluded from the JobPosting JSON-LD structured data since there is no matching schema.org property, so there is no SEO impact. First deploy failed Project Check (run #617): `data/jobBoardConfig.js` exports a `jobFieldKeys` allowlist that `lib/validateJobs.js` checks every job record against, and `openings` was not registered there. Fixed by adding it to that list (commit `0097528`, the current baseline). Full commit chain: `ed6462b` -> `7206982` -> `a63b64f` -> `aa44971` -> `31f279c` -> `fc6fa07` -> `0097528`.

Live-verified in production after the fix: the standalone position page shows OPENINGS 3; the grid card shows a "3 Openings" badge; the position modal shows an OPENINGS cell next to Position ID; the Discipline filter (Electrical Engineering) and keyword search ("1188") both correctly isolate the position; Similar Positions is populated with relevant NYC electrical listings.

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
- Similar Positions (grid modal AND the standalone direct/shared position page — added August 23)
- +Shortlist / Saved Positions (grid modal AND the standalone direct/shared position page — added August 23, same shared `agile-saved-positions` storage)
- Maximum three shortlisted positions
- Copy Link / Share
- Compact, correctly colored Outlook/Gmail share formatting (August 23 — see baseline candidate note)
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
2. Return to `3daf725af3eedf389524ac30f8ec762be9453d23`.
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

Careers has a documented GREEN recovery baseline. Complete the final mobile smoke test, then preserve this baseline unless a confirmed production defect requires a change.

Next planned development phase after Careers is locked:

Begin the main AGILE website rebuild using the established Careers design system and rebuild direction.
