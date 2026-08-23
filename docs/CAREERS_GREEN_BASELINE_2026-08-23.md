# AGILE Careers GREEN Baseline — August 23, 2026

## Status

GREEN baseline established after the August 20–23 position-sharing, position-detail-page, and mobile-readability refinement cycle. This baseline is confirmed live in production by the site owner on the real business domain, with candidate share links (email and text) verified end to end.

Baseline code commit:

`64aab93` — "Font on Phone Increase by 1," branch `main`. Confirmed August 23 via the Vercel Deployments list for `agile-website-positions` (this is the newest deployment on `main` as of that check, and it is the mobile-readability commit — the last code commit of this cycle). This is the short (7-character) SHA as shown by Vercel; if the full 40-character SHA is needed for git operations, open GitHub Desktop's History tab, click this commit, and copy the full hash shown at the top.

Repository:

`Agile2026BE/AGILE-Website-Positions`

Branch:

`main`

Production domain:

`https://www.agileconsultingsolutions.com`

**Domain note:** prior baseline records (August 8–11) list `https://careers.agileconsultingsolutions.com` as the production domain. As of this baseline, the live, confirmed-working domain is `https://www.agileconsultingsolutions.com`, serving Careers at `/careers`, with individual positions at `/careers/positions/[slug]` and short links at `/p/[id]` redirecting there. If `careers.agileconsultingsolutions.com` is still live anywhere (DNS, an old bookmark, a saved share link), confirm intentionally whether it should keep resolving, redirect to the www domain, or be retired — this baseline does not change or remove it, it only records which domain was actually tested and confirmed tonight.

## Verification Evidence

### Code-level checks (run in this working environment)

PASS — run directly against the repository source, not through GitHub Actions:

- All 96 `.js`/`.jsx` files across `app/`, `components/`, `lib/`, and `data/` parsed cleanly (no syntax errors).
- Every stylesheet checked for brace balance — clean.
- A full data-integrity sweep ran against all 182 active positions (post-retirement-filter) in `data/jobs.js`, checking: unique `id` and `slug` per position, every position resolvable through `/p/[id]` → `/careers/positions/[slug]`, no missing required fields, no garbled/leftover text in `workplace` or `salaryDisplay`, `formatWorkplaceDisplay`/`formatSalaryDisplay` produce output for every position with a value, `getSimilarJobs` runs without error and never suggests a position to itself for all 182 positions, and `positionUrl`/`positionShareText`/`positionShareHtml` generate correctly for all 182 positions. Zero real defects found.

**Gap versus prior baselines:** this environment cannot run the repository's GitHub Actions "Project Check" workflow or query the Vercel API directly — no CI or Vercel API access from here. The code-level checks above are a substitute for the `npm run check` step, not a replacement for it. The Vercel deployment itself has now been confirmed directly by the site owner in the Vercel dashboard (see below). What's still open is confirming the GitHub Actions "Project Check" workflow reports success for this exact commit — open the commit on GitHub.com and confirm the green check mark, or check the Actions tab, and record the run ID here.

- GitHub Project Check: `PENDING — confirm the green check mark next to commit 64aab93 on GitHub.com, or check the Actions tab`
- GitHub Actions run: `PENDING`
- Vercel Production deployment: **SUCCESS** — confirmed August 23 in the Vercel dashboard (Deployments list for `agile-website-positions`): commit `64aab93` "Font on Phone Increase by 1," branch `main`, status Ready, tagged Production, build duration 19s.
- Vercel deployment ID: `9oWT1E3dGWu6r9sEuVaGUupD2RRH`
- Domains attached to this deployment: `www.agileconsultingsolutions.com` (confirmed in the Domains panel of the same deployment page), plus the project's own `agile-website-positions...vercel.app` addresses.

### Live production verification (site owner, August 22–23)

PASS — confirmed directly on `www.agileconsultingsolutions.com` in production, on both desktop and an iPhone:

- Position grid cards show salary promoted near the top, Workplace/Experience/Position ID compact in the meta grid, no separate Position ID badge.
- Position detail modal (popup, opened from the grid) shows salary on the same line as Shortlist, reorganized Location/Experience/Workplace/Position ID/Reviewed layout.
- Shortlist star fills gold/bronze when a position is shortlisted, on the grid, the modal, and the standalone position page.
- Direct/shared position pages (`/careers/positions/[slug]`, reached via `/p/[id]` short links) now include a working Shortlist button and a Similar Positions section, matching the modal's feature set — confirmed via a real shared link opened fresh on production.
- Copying a position produces a clean `www.agileconsultingsolutions.com/p/[id]` link in iMessage/SMS and a clean, compact, correctly colored HTML block in Outlook Web — confirmed via real share/copy actions from the live domain, not a preview deployment.
- Explore Resources accordion (Salary Calculator, Featured Positions, Private Client Portfolio), the chess game panel, and the Contact form read clearly at the enlarged font sizes applied earlier in this cycle.
- Position detail page (grid labels/values, Key Responsibilities/Qualifications bullets, Why Consider, Similar Positions) reads clearly at the small additional mobile-only size increase applied in this cycle; desktop/laptop rendering of that page is unchanged.

## Work Included In This Baseline (August 20–23 cycle)

- Position modal redesign: salary promoted onto the Shortlist row, reorganized info grid, tightened box padding, Position ID shown as a plain number.
- Shortlist star turns gold/bronze on selection (star only, not the whole button).
- Salary display normalized to show "Market Rate" in green for non-numeric/prose salary text, applied everywhere salary is shown.
- Workplace display normalized to clean Hybrid / On-Site / Remote labels everywhere, independent of the (unchanged) filter-matching logic.
- Position ID font size increased one step for readability, on both the modal and the grid cards.
- Job/browsing grid cards (`JobCard`) brought up to the same redesign as the modal: salary promoted near the top, Workplace/Experience/Position ID compact in the meta grid, standalone Position ID badge removed.
- Homepage hero paragraph copy updated.
- Explore Resources accordion, chess game panel, and Contact form font sizes increased for readability.
- Three data-entry typos found via an automated sweep and corrected in position records 1047 and 1151; a `bonus` field conflict on position 1031 was flagged, not guessed at, and is still open for the site owner's own data decision.
- Share/copy formatting (`lib/shareJob.js`): compact, uniform HTML email formatting (~8–10.5pt, `pt` units for Outlook/Word rendering), shortened link text to "View Position," and color set redundantly (block + inline span + legacy `font` tag) after live testing showed Outlook's paste sanitizer was dropping block-level color and leaving the email looking heavy and monochrome.
- New shared helper `lib/similarJobs.js` (`getSimilarJobs`) extracted from the modal's inline similarity scoring, so the standalone position page and the modal share one implementation.
- New `components/PositionPageShortlist.js` client component gives the standalone position page (`/careers/positions/[slug]`) a working Shortlist button backed by the same `agile-saved-positions` `localStorage` key the browsing grid uses, so shortlist state is shared across both.
- Standalone position page now also shows a Similar Positions section, matching the modal.
- Small mobile-only font-size increase on the standalone position page (info grid, bullets, Similar Positions cards) — desktop/laptop untouched.
- `FALLBACK_CAREERS_ORIGIN` in `lib/shareJob.js` corrected from a nonexistent `careers.` subdomain to match the real production domain, for the rare server-side fallback path.

## Protected Recovery Rule

Commit `64aab93` on `main` is the recovery target for this baseline — confirmed deployed and live on `www.agileconsultingsolutions.com`. The one remaining gap versus the repo's full Launch/Change Gate procedure is an explicit confirmation that GitHub Actions "Project Check" passed for this commit (Vercel's own build succeeding is a strong signal but is not the same check). Once that's confirmed, this baseline can be promoted into `PROJECT_CHECKPOINT.md`'s "GREEN BASELINE" section in place of the August 11 one.
