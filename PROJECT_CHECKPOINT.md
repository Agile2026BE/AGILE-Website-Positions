# AGILE Careers Project Checkpoint

Last updated: August 8, 2026

## Purpose

This is the operational handoff and recovery record for AGILE Careers development. Read this file before making future production changes.

## Current Launch Baseline

Baseline candidate: current `main` after the August 8, 2026 launch-readiness work.

The exact final baseline commit SHA should be updated after the current Project Check and Vercel deployment are confirmed green.

Recent known commits leading into this checkpoint:

- `cddcbd52830ecbd75224475d49e80c52b6acbdb6` saved-position lint repair / successful recovery path
- `0d8995476030d731ccbe3d723e02291ab4410a53` search-aware testimonial curation
- `a6a1d85caf64d93a9c7e4cd1089e73bb81ecbecf` tightened AGILE Advantage section
- `cf79084690c8cf5f445950d5b636a5b65c73cce6` inquiry success experience
- `01c90190ce94635334da674c65c8114998e1fd5f` responsive inquiry layout
- `9255841bb0a9fcf8512554d4d381e6f04dca49ef` README and recovery documentation update

## Production Target

- Domain: `careers.agileconsultingsolutions.com`
- Repository: `Agile2026BE/AGILE-Website-Positions`
- Branch: `main`
- Deployment: Vercel
- Inquiry delivery: Resend

## Known-Good / Protected Features

Do not remove these during redesign work:

- Search Careers
- State filter
- Discipline filter
- Minimum Salary filter
- Workplace filter
- Market filter
- Keyword search
- Position result cards
- View Position
- Similar Positions
- Saved Positions
- Copy Link / Share
- Direct position URLs
- Position ID display
- Salary display
- Location display
- Workplace display
- Responsibilities / qualifications / Why Consider content
- Career inquiry form
- Optional resume upload
- Inquiry email delivery
- Responsive layouts

## Recruiter Use Case

The Careers site is not only candidate-facing. Byron uses it as an active recruiting tool. He must be able to search positions, open an opportunity, find Similar Positions, save opportunities, and copy/share direct links into Outlook emails, text messages, and LinkedIn outreach.

Any future feature that interferes with this workflow is a regression.

## Candidate Conversion Direction

The site should reduce friction and encourage conversation rather than force a traditional application.

Core journey:

Attention -> Search -> Opportunity -> Relevant proof -> AGILE value -> Conversation

Key conversion principles:

- Salary, location, workplace and Position ID are visible.
- Client identity remains confidential until appropriate discussion/representation.
- Candidates can inquire without creating an account.
- Resume is optional for an initial inquiry.
- Similar Positions should expose additional relevant opportunities.
- Saved Positions encourage return visits.
- Reviews should feel relevant and fresh rather than static.

## Testimonials

Reviews are real AGILE placement testimonials retained from original emails/texts. Use approved initials and professional titles.

Desired engine:

- Two discipline/specialty-relevant verified testimonials when available.
- One verified broader AGILE or Lilly testimonial.
- Rotate qualifying reviews after search/filter changes and across repeat browsing.
- Use attribution/signature and tags for matching.
- Never invent a quote or attribution to fill a category.

Known approved signature examples mentioned during design:

- J.T. - Senior Electrical Engineer
- M.B. - Commissioning Agent, CxA, RCxA
- J.S. - Project Manager, Construction

The exact associated quote text must come from verified AGILE source material before adding these records to code.

## Visual Baseline

Careers establishes the design language for the later main-site overhaul.

Use:

- Deep navy / slate blue
- White / warm white reading areas
- Light blue accents
- Restrained gold for selected calls to action/highlights
- High contrast, readable body typography
- Serif display headings where already established
- Controlled content width on very large monitors
- Responsive stacking on laptop/tablet/mobile
- Comfortable iPhone touch targets

Avoid:

- Cartoonishly oversized content on wide monitors
- Dense banking-dashboard presentation on phones
- Purple gradients or unrelated color systems
- Excessive animation/video that slows loading
- Large unused vertical gaps between sections

## Main Website Direction After Careers

Do not rebuild the legacy GoDaddy site page-for-page. Preserve useful content and reorganize it into one connected experience.

Planned structure/direction:

- Home: current activity, proof, pathways, conversion
- Careers: search and opportunity discovery
- Why AGILE / How We Work: representation and candidate value
- Reviews: full verified testimonial library
- Insights / Trends: living market intelligence and salary tools
- Employers: client services
- Priority Opportunities: successor to Hot Jobs
- Footer resources: Privacy Policy, Candidate Security, Recruiting Scam Warning

The legacy 170-position GoDaddy wall should no longer be the primary search experience once Careers is fully launched.

## Launch Gate

Before declaring a new baseline:

1. Project Check passes.
2. Vercel deployment succeeds.
3. Search/filter smoke test passes.
4. Position modal/page opens.
5. Similar Positions works.
6. Copy Link opens the intended position.
7. Saved Position survives refresh.
8. Inquiry submission succeeds.
9. Desktop, midsize and iPhone layouts are usable.

## Recovery Procedure

If a production change breaks Careers:

1. Stop adding new changes.
2. Identify the last documented green baseline commit.
3. Compare the breaking commit against that baseline.
4. Restore/revert only the breaking change when possible.
5. Run Project Check.
6. Confirm Vercel deployment.
7. Smoke-test the protected recruiter workflow.
8. Update this checkpoint with the repaired baseline.

Never reconstruct the site from memory if a documented Git baseline exists.

## Immediate Next Work

Launch-critical only:

- Confirm current Project Check and Vercel status after documentation commit.
- Smoke-test recruiter workflow and inquiry.
- Confirm responsive layout on wide desktop, midsize/laptop, and iPhone.
- Establish exact green baseline SHA in this file.
- Launch/hold stable.

Design refinements and the broader GoDaddy site overhaul happen after the Careers launch is stable.
