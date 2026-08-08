# AGILE Website Positions

Production workspace for the AGILE Careers website at `careers.agileconsultingsolutions.com`.

## Current Architecture

The project is a Next.js application using the App Router and Vercel deployment.

Current structure:

- `app/layout.js` root document and metadata
- `app/page.js` homepage composition
- `app/globals.css` shared global tokens and base styles
- `app/positions/[slug]/page.js` individual position detail page
- `components/SiteHeader.js` primary site navigation
- `components/HeroSection.js` careers landing section
- `components/JobBoard.js` interactive search, filters, saved positions, and position modal launcher
- `components/PositionModal.js` position details, Similar Positions, inquiry action, and Copy Link behavior
- `components/ReviewsSection.js` verified candidate testimonial rotation tied to search context
- `components/WhyAgileSection.js` AGILE candidate representation/value section
- `components/ContactSection.js` professional career inquiry form and resume upload
- `components/SiteFooter.js` careers footer and trust links
- `data/jobs.js` position data source
- `lib/jobFilters.js` filtering and keyword search logic
- `lib/shareJob.js` direct position sharing behavior
- `scripts/validate-jobs.mjs` job data validation
- `TESTING.md` browser, responsive, content, and deployment verification checklist
- `.github/workflows/check.yml` automated validation, lint, and production build checks
- `PROJECT_CHECKPOINT.md` current launch baseline, recovery instructions, protected features, and next work

## Project Rules

1. Work only inside `Agile2026BE/AGILE-Website-Positions` for Careers development.
2. Do not modify AGILE Mission Control, Recruiting Operating System, or unrelated repositories.
3. Preserve verified position IDs, salaries, locations, workplace information, responsibilities, qualifications, and other factual content exactly unless Byron explicitly requests a factual change.
4. Do not invent testimonials. Candidate reviews are real AGILE placement testimonials and use approved initials/professional titles.
5. Protect recruiter-critical functionality: Search Careers, Similar Positions, Saved Positions, Copy Link/Share, direct position links, and inquiry routing.
6. Every launch-relevant change should pass the Project Check workflow and Vercel deployment before it becomes a new baseline.
7. Maintain responsive behavior for large desktop monitors, normal laptops, tablets, iPhone, and smaller mobile screens.
8. Use the established AGILE visual system: deep navy/slate blue, white/warm white, light blue accents, restrained gold, readable sans-serif body copy, and Georgia/serif display headings where already established.
9. Function and stability come before nonessential design tweaks during launch windows.

## Current Functional Status

Implemented and active:

- Vercel deployment connected to `main`
- Custom Careers domain workflow
- Responsive Careers hero
- State, Discipline, Minimum Salary, Workplace, and Market filters
- Keyword search
- Reset filters
- Dynamic result count
- Progressive position display
- Position cards and detail modal
- Similar Positions recommendations
- Saved Positions persisted in browser local storage
- Copy Link/Share workflow for recruiter and candidate outreach
- Direct position pages
- Candidate inquiry form
- Optional resume upload
- Resend-powered inquiry email delivery
- Successful inquiry confirmation and lightweight celebration
- Search-aware testimonial rotation structure
- AGILE candidate representation/value section
- GitHub Actions Project Check
- Vercel production build checks

## Protected Recruiter Workflow

Byron must always be able to:

1. Search the full Careers inventory himself.
2. Open a position and review all details.
3. View Similar Positions for targeted candidate outreach.
4. Copy/share a direct position link into Outlook, text, or LinkedIn.
5. Save positions for later comparison/reference.
6. Send candidates directly into the relevant opportunity and inquiry path.

Do not remove or materially weaken these functions during future redesign work.

## Testimonial Strategy

Candidate testimonials are verified AGILE placement reviews.

Target behavior:

- Two reviews relevant to the candidate's active discipline/search when enough verified reviews exist.
- One broader AGILE or Lilly experience.
- Rotate qualifying reviews so repeated searches and repeat visits do not become static.
- Match using approved attribution/signature, discipline, specialty, and review category.
- Never manufacture a missing discipline review. Fall back to verified general AGILE testimonials.

## Verification Commands

Run locally:

```bash
npm install
npm run check
```

`npm run check` runs job validation, ESLint, and the Next.js production build.

Before declaring a launch baseline, also confirm:

- GitHub Actions `Project Check` = success
- Vercel deployment = success
- Search and filters work
- View Position works
- Similar Positions works
- Copy Link/direct link works
- Saved Positions survive refresh
- Inquiry sends successfully
- Responsive layouts remain usable on wide desktop, laptop/tablet, and iPhone/mobile

## Version and Recovery Discipline

Git commits are the primary version history. Important launch-ready states are additionally recorded in `PROJECT_CHECKPOINT.md`.

When establishing a new baseline:

1. Confirm Project Check is green.
2. Confirm Vercel is green.
3. Record the baseline commit SHA in `PROJECT_CHECKPOINT.md`.
4. Record what is known-good and what remains unfinished.
5. Do not overwrite factual position/testimonial data during recovery.
6. If a later change breaks the site, recover by returning `main` to the last documented known-good commit, then reapply later changes one at a time.

## Current Source of Truth

Repository:

`Agile2026BE/AGILE-Website-Positions`

Production Careers domain:

`https://careers.agileconsultingsolutions.com`

Primary branch:

`main`

## Current Checkpoint

See `PROJECT_CHECKPOINT.md`. That file is the short operational handoff for Ace/Byron and should be read before future development sessions.
