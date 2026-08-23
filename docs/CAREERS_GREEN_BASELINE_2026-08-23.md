# AGILE Careers GREEN Baseline — August 23, 2026

## Status

GREEN baseline established after the August 20–23 position-sharing, position-detail-page, and mobile-readability refinement cycle. This baseline is confirmed live in production by the site owner on the real business domain, with candidate share links (email and text) verified end to end.

Baseline code commit:

`a7df363` — "Lint Fixes 2," branch `main`. This is the short (7-character) SHA as shown by GitHub and Vercel; if the full 40-character SHA is needed for git operations, open GitHub Desktop's History tab, click this commit, and copy the full hash shown at the top.

**Why the baseline commit isn't the feature commit:** the actual August 20–23 feature work (position sharing/email formatting, standalone position page Shortlist/Similar Positions, mobile readability) landed at `64aab93` ("Font on Phone Increase by 1"). Two follow-up commits, `373949a` ("Lint Fixes and final log updating") and `a7df363` ("Lint Fixes 2"), made no visible or functional changes — they only fixed six instances of a newer, stricter React lint rule (`react-hooks/set-state-in-effect`, flagging synchronous `setState` calls inside `useEffect`) and one `@next/next/no-html-link-for-pages` violation (a raw `<a>` swapped for Next's `<Link>`) that were failing the repository's GitHub Actions "Project Check." `a7df363` is the first commit in this chain confirmed fully green on both checks.

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

**Gap versus prior baselines — now closed:** this working environment cannot run GitHub Actions or query the Vercel API directly, so the code-level checks above are a substitute for `npm run check`, not a replacement for it. The site owner confirmed both real checks directly on GitHub.com and in the Vercel dashboard on August 23.

- GitHub Project Check: **SUCCESS** — confirmed directly on the commit page for `a7df363` on GitHub.com, showing "✓ 2/2" (both the `Project Check / check` workflow and the Vercel deployment-status check passed).
- GitHub Actions run: confirmed passing via the commit's check-mark UI; exact numeric run ID not separately recorded.
- Vercel Production deployment: **SUCCESS** — status Ready, tagged Production and Current, build duration 21s.
- Vercel deployment ID: `C4sJ9xXPBz7ZZA9K2JxRiyQfUMHS`
- Domains attached to this deployment: `www.agileconsultingsolutions.com` plus 3 additional project domains (the `agile-website-positions...vercel.app` aliases).

For context, the intermediate commits on the way to green were also deployed and independently checked:
- `64aab93` ("Font on Phone Increase by 1") — the feature commit, Vercel deployment `9oWT1E3dGWu6r9sEuVaGUupD2RRH`, Ready/Production, but GitHub Project Check FAILED (1/2) — 5 `react-hooks/set-state-in-effect` errors.
- `373949a` ("Lint Fixes and final log updating") — fixed those 5 errors; GitHub Project Check still FAILED (1/2) — 1 remaining `@next/next/no-html-link-for-pages` error.
- `a7df363` ("Lint Fixes 2") — fixed the remaining error; GitHub Project Check PASSED (2/2). This is the baseline commit above.

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
- Six `useEffect` hooks (`components/JobBoard.js`, `components/PositionBackLink.js`, `components/home/PlayAgileChess.js`, `components/PositionPageShortlist.js`, `components/home/HomeResourcesAccordion.js`, `components/ContactSection.js`) reworked to defer their client-only setState calls by one tick (`window.setTimeout(fn, 0)` + cleanup), matching a pattern already used elsewhere in the codebase, to satisfy the `react-hooks/set-state-in-effect` lint rule. No visible or functional change.
- One raw internal `<a href="/#client-hiring-support">` in `components/home/HomeAccessMenu.js` swapped for Next's `<Link>` component to satisfy `@next/next/no-html-link-for-pages`. No visible change.

## Protected Recovery Rule

Commit `a7df363` on `main` is the recovery target for this baseline — confirmed deployed and live on `www.agileconsultingsolutions.com`, and confirmed GREEN on both GitHub Project Check and Vercel Production deployment. This satisfies the repo's full Launch/Change Gate procedure and is now promoted into `PROJECT_CHECKPOINT.md`'s "GREEN BASELINE" section in place of the August 11 one.
