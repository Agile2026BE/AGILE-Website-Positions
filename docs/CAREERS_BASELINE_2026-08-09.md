# AGILE Careers Baseline — August 9, 2026

Baseline captured: August 9, 2026 · approximately 9:15 AM ET

Repository: `Agile2026BE/AGILE-Website-Positions`
Branch: `main`
Production domain: `https://careers.agileconsultingsolutions.com`
Hosting/deployment: Vercel
Current documented source commit: `620fe73a50df85f8a03f1086a7e51fb76bd62323`

## IMPORTANT STATUS NOTE

The source state at the commit above is the new documented AGILE Careers baseline.

At capture time, GitHub reported the Vercel status as `failure` because of a Vercel `build-rate-limit` / upgrade-to-Pro restriction. This is a deployment quota/status problem, not evidence that the source code itself failed to compile. Do not treat this as a code regression without checking the actual build logs first.

## PURPOSE OF THIS FILE

This is the detailed recovery and continuation record for `careers.agileconsultingsolutions.com`.

Read this document together with:

- `README.md`
- `PROJECT_CHECKPOINT.md`
- `TESTING.md`
- `.github/workflows/check.yml`

before making future launch-critical changes.

If anything harmful, accidental, destructive, or visually regressive happens, restore from Git history rather than recreating the site from memory.

## CURRENT PRODUCT ROLE

AGILE Careers is the candidate-facing functional engine for AGILE.

It serves two simultaneous purposes:

1. Professional career discovery for Architects, Engineers, Construction and AEC professionals.
2. A recruiter operating tool for Byron/AGILE to search, shortlist, inspect and share positions directly through Outlook, SMS, LinkedIn, Juicebox and other outreach workflows.

The main company website at `www.agileconsultingsolutions.com` is a separate project and should not be confused with AGILE Mission Control.

## CURRENT PAGE ORDER

The homepage order is intentionally:

1. Home / Careers Hero
2. Positions / Search Careers
3. AGILE Insights
4. Reviews
5. Market Insights
6. Contact / Start a Conversation
7. Footer / Client Hiring Support

Navigation order and physical page order should stay aligned.

Legacy `#why-agile` links should continue resolving to AGILE Insights.

## HERO — LOCKED CURRENT MESSAGE

Eyebrow:

`SPECIALIZED AEC RECRUITING`

Headline:

`Know the details before applying.`

The word `before` is intentionally italicized and rendered in the lighter AGILE blue accent.

Desktop may display the sentence naturally on one line when space allows.

Mobile should be intentionally controlled as:

`Know the details`

`before applying.`

The goal is clean, deliberate wrapping rather than browser-created orphan lines.

Supporting copy currently describes career opportunities across MEP Consulting and Building Systems, Civil Infrastructure, Water and Wastewater, Transportation, Aviation, Rail and Transit, Commissioning, Mission Critical, and Data Centers.

Hero actions:

- Explore Positions
- Start a Conversation

Hero proof badges:

- Salary disclosed
- Location disclosed
- Work schedule disclosed
- No account required

## ANCHOR / LANDING SYSTEM

The sticky-header landing issue was corrected by moving to one responsive global anchor-offset system.

Do not reintroduce separate `scroll-margin-top` guesses on individual sections unless there is a verified reason.

Landing behavior must be tested on desktop and iPhone after navigation changes.

A correct landing must not:

- expose a large piece of the previous section,
- hide the destination heading under the sticky header,
- create excessive blank space,
- or cause mobile content to appear detached from its destination.

## POSITION SEARCH / FILTERS

Protected search capabilities:

- State
- Discipline
- Minimum Salary
- Workplace
- Market Sectors
- Keyword / title / specialty / skill / city / commute-area search
- Dynamic result count
- View results action
- Reset

Dropdown options should be alphabetical whenever alphabetical order makes sense.

Exceptions should remain logically ordered rather than alphabetized, such as:

- salary thresholds,
- experience progression,
- time-of-day ranges,
- hiring timing.

Neutral/default choices such as `All States`, `Choose a discipline`, `None`, or `Any Salary` remain at the top.

## SHORTLIST — LOCKED FUNCTIONAL BEHAVIOR

Maximum shortlist size: 3 positions.

The shortlist persists in browser local storage.

When at least one position is shortlisted, a visible `YOUR SHORTLIST` summary appears above the job-card results.

Each shortlisted position shows:

- title,
- location,
- salary,
- View,
- Remove.

The shortlist panel also provides `Clear Shortlist`.

Reset is intended to clear both:

- search/filter state,
- shortlisted positions.

When a fourth position is attempted, the user receives the warning:

`3/3 positions selected. Remove one from your shortlist to add another.`

Do not silently reject a fourth selection.

## POSITION DETAIL / MODALS

Protected detail information includes:

- discipline,
- position title,
- location,
- workplace,
- salary,
- experience,
- position ID,
- specialty / technical track,
- summary,
- responsibilities,
- qualifications,
- Why Consider / supporting job content where present,
- Similar Positions,
- Shortlist action,
- inquiry action,
- share/copy behavior.

Position factual data must never be changed or invented merely for visual consistency.

## CLEAN SHARE / COPY STANDARD

Public sharing must never expose Vercel preview/deployment URLs.

Canonical public Careers origin:

`https://careers.agileconsultingsolutions.com`

Short public position route format:

`https://careers.agileconsultingsolutions.com/p/####`

Plain-text sharing format is intentionally minimal:

`Position Title`
`Location · Workplace`
`Salary`

`View Position: careers.agileconsultingsolutions.com/p/####`

Do not add a visible Position ID to outward-facing share copy unless explicitly requested. The `/p/####` route already identifies the opportunity.

Rich-text destinations should copy a true hyperlink so the recipient sees a clean blue/underlined `View Position` rather than the raw URL.

Plain-text destinations such as SMS, LinkedIn, some Automator/Outlook workflows and systems that strip HTML must use the short AGILE Careers URL, never the long Vercel URL.

This standard applies to:

- single-position Copy/Share,
- Position Modal sharing,
- selected/shortlisted multi-position sharing.

For up to three selected positions, each position should preserve the same clean title/location/workplace/salary/View Position hierarchy.

## CAREER INQUIRY FORM

Career inquiry is intentionally low-friction.

Key principles:

- no formal application required,
- no account required,
- resume optional,
- salary/location/workplace already disclosed where appropriate,
- confidential career-conversation option,
- selected position can populate the inquiry context.

Phone numbers should format live as standard U.S. numbers, e.g. `(407) 868-7254`.

The API accepts both field naming patterns used by the page and position modal so visible user entries are recognized server-side.

## CLIENT HIRING SUPPORT

Client Hiring Support remains a footer-accessed modal.

The form minimizes free typing with structured dropdowns for common subjects and hiring details.

Current inquiry subjects include:

1. Interested in discussing our company hiring needs.
2. Interested in AGILE services, recruiting fees and placement guarantees.

Selecting a subject auto-populates a professional editable message beginning with `Hello,` and ending with `Thank you.`

Client phone input should format live as `(407) 868-7254`.

Incoming support email includes the selected subject so AGILE immediately understands why the client contacted the firm.

## SUCCESS EXPERIENCE — CURRENT STANDARD

The intended universal success wording is:

`Success! We look forward to connecting soon!`

The success treatment should be visually prominent and use the AGILE turquoise/light-blue family rather than green.

The success experience should include a short confetti burst only after the backend confirms a successful submission.

This standard is intended across:

- Career Inquiry / Contact,
- Position Inquiry modal,
- Client Hiring Support,
- Market Insights opt-in,
- future Careers forms unless a specific exception is approved.

IMPORTANT: At the time this baseline was documented, the standardized wording/confetti had been applied to Contact, Position Inquiry, and Client Hiring Support. The turquoise visual standard had been approved as the next styling standard. Verify all success-state CSS and Market Insights before declaring the next fully tested green baseline.

## AGILE INSIGHTS — CURRENT COPY

Hero/motion statement remains:

`We only work with the best. Shouldn't you?`

The updated copy immediately below is:

`Your experience has created value.`

`Your introduction should reflect it.`

`Let our connections be your advantage.`

Bridge statement:

`Make your first impression really count.`

The word `really` is intentionally italicized and rendered in the lighter blue accent.

Existing three-step cards remain below unless specifically changed:

01 — You built the experience
02 — We recommend you
03 — Build what comes next

## REVIEWS

Reviews/testimonials must remain verified AGILE placement/professional experiences.

Never invent testimonials, attributions, disciplines or review text.

Desired matching behavior:

- two discipline/specialty-relevant verified testimonials when enough exist,
- one broader AGILE experience,
- rotation to avoid a static repetitive experience,
- fallback to verified general testimonials when discipline-specific proof is unavailable.

## MARKET INSIGHTS

Market Insights is the return-visit / professional-intelligence pathway.

Current purpose:

- hiring activity,
- compensation trends,
- new opportunities,
- demand by discipline/location,
- occasional professional market and career updates.

Submission should be tested as part of every launch gate.

Success UI should eventually match the universal turquoise success/confetti standard above.

## FOOTER — LOCKED CURRENT COPY / ORDER

Headline:

`Connecting AEC Professionals and Consulting Firms across 9 key geographic markets.`

Then:

`STATES SERVED`

State order is intentionally:

`New York · New Jersey · Pennsylvania · Massachusetts · Connecticut · North Carolina · Florida · Colorado · California`

Do not reorder this footer list unless specifically requested.

Footer also includes:

- Search Careers
- Client Hiring Support
- careers@agileconsultingsolutions.com
- Main Office 407-868-7254
- operating hours
- AGILE branding and professional career-consultant positioning.

## RESPONSIVE DESIGN RULES

Primary targets:

- large desktop / ultrawide monitors,
- standard desktop/laptop,
- tablet,
- iPhone/mobile,
- smaller mobile screens.

Mobile should not simply scale desktop down.

Control headline wrapping where brand impact matters.

Default mobile text alignment should be left-aligned unless a section was intentionally designed otherwise.

Do not allow sticky navigation, modal height, browser chrome or form controls to hide important content.

## VISUAL SYSTEM

Continue using the established AGILE Careers system:

- deep navy / slate blue,
- white / warm white,
- turquoise / light-blue emphasis,
- restrained gold accents,
- Georgia/serif display typography where established,
- clean sans-serif body/interface typography,
- rounded but restrained cards,
- professional engineering/AEC tone,
- no cartoonish styling,
- no excessive animation,
- no gratuitous gradients or decorative motion.

## DEPLOYMENT / SERVICES

Source control: GitHub
Repository: `Agile2026BE/AGILE-Website-Positions`
Branch: `main`
Hosting: Vercel
Production domain: `careers.agileconsultingsolutions.com`
Inquiry email delivery: Resend -> `careers@agileconsultingsolutions.com`

Domain registration/hosting decisions for the main AGILE site are separate from Careers.

## RECOVERY PROCEDURE

If a later change damages Careers:

1. Stop making additional changes.
2. Read this baseline and `PROJECT_CHECKPOINT.md`.
3. Identify the last known-good source commit.
4. Compare the breaking commit against that baseline.
5. Revert only the breaking changes where possible.
6. Do not overwrite `data/jobs.js` or verified testimonials during recovery unless those files are proven to be the cause.
7. Confirm the public domain and Vercel deployment.
8. Smoke-test navigation anchors.
9. Smoke-test search/filter results.
10. Test View Position.
11. Test Similar Positions.
12. Test shortlist add/remove/clear/persistence/max-three warning.
13. Test clean single-position and three-position sharing.
14. Test Career Inquiry delivery.
15. Test Position Inquiry delivery.
16. Test Client Hiring Support delivery.
17. Test Market Insights delivery.
18. Verify success-state messaging/confetti.
19. Test desktop and iPhone layouts.
20. Only then declare a repaired green baseline.

Do not rebuild the interface from memory if Git history and this documentation are available.

## NEXT BASELINE RULE

This file represents the August 9 morning source/design baseline.

A later baseline should not overwrite this historical record. Create a new dated baseline file and update `PROJECT_CHECKPOINT.md` to point to the newest verified green commit.
