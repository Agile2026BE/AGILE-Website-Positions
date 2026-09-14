# CAREERS GREEN BASELINE — 2026-09-13 (Visual Polish: JobCard Title, Share Card Option B, 1115/1116 Title Fix)

Locked 2026-09-13, following a working session that started from Byron's
screenshots of the live Outlook draft and the /careers grid. Supersedes the
2026-09-12 share/copy baseline (`1977b55`) for the email/share card, and adds
two fixes with no prior baseline entry (JobCard grid title size, positions
1115/1116 title text).

## Baseline commit

Latest verified commit on `main`: **`d6d8ffc`**
("Fix stale seoTitle/metaDescription double-dash on 1115/1116")

Full commit chain this session, oldest to newest:

1. `cc65b64` — Reduce position title font size on JobCard for visual consistency
2. `d57202e` — Cut email share card title from 15px to 13px, still reads oversized
3. `34ee390` — Match Position ID line size to detail line (11px to 12px)
4. `4fac3d1` — Ship Option B: confident hierarchy for email share card
5. `6ccf2f7` — Fix double-dash title on positions 1115/1116 to Intermediate/Senior
6. `d6d8ffc` — Fix stale seoTitle/metaDescription double-dash on 1115/1116

Vercel production deployment: **`dpl_AJUh5rjrAF9E4J8V7DBHkXsBFCsq`** — READY,
verified live (project `prj_IBpz6UjdpSOtOtd87V3A4aGlP3SI`, team
`team_lTUAnuGUaUTLSqB2D2LbSlcD`).

## What changed and why

### 1. /careers job-listing card title (`components/JobCard.module.css`)

The `.cardContent h3` title (e.g. "Associate Electrical Engineer- Technical")
was set to `clamp(1rem, 1.08vw, 1.12rem)` — topping out at 17.92px, visibly
larger than every other element on the card including the salary line
(16.8px). Byron flagged it as "very off" against the rest of the card.
Reduced to `clamp(.95rem, 1vw, 1.05rem)` (tops out at 16.8px, now equal to
the salary line); mobile override tightened from 1.06rem to 1rem to match.
Verified via computed style on the live page (`getComputedStyle(h3).fontSize`
→ 16.8px).

### 2. Email/text "Copy Link" share card (`lib/shareJob.js`, `positionShareHtml`)

This went through several rounds this session alone, on top of the extensive
2026-09-11/09-12 history already in `docs/CAREERS_GREEN_BASELINE_2026-09-12_SHARE_COPY_LINKS.md`:

- The title, previously "settled" at 15px/700 (`371a27b`), still read as an
  oversized shouty headline once Byron actually pasted it into a real Outlook
  compose window next to Outlook's own 12pt/16px default body text. Cut to
  13px/700 (`d57202e`).
- Position ID raised from 11px to 12px to match the detail line (location ·
  workplace), so the two secondary/metadata lines read at the same size
  instead of Position ID looking smaller (`34ee390`).
- **Full redesign pass ("Option B: confident hierarchy," `4fac3d1`)** — Byron
  asked for an end-to-end review (font, color, layout, eye-catch, trust) with
  finished options to choose from rather than more incremental tweaks. Two
  full mockups were rendered inline for comparison; Byron picked Option B
  outright. Final card, top to bottom:
  - Eyebrow "AGILE CAREER OPPORTUNITY": 10px/700, unified brand blue `#0c6ca3`
    (previously two slightly different blues, `#0874ae` and `#1476a8`, used
    inconsistently between the eyebrow and the links — now one color
    everywhere)
  - Title: 14px/700, navy `#173958`
  - Detail line: 12px/400, gray `#5a7185` — **now includes years of
    experience** (location · workplace · experience), not just location ·
    workplace, so the card carries where/how/level before a click-through
  - Salary: **14px/700**, green `#0a8a4a` — deliberately the single largest,
    boldest element on the card; the number a passive candidate's eye should
    land on first
  - Position ID: 11px/400, light gray `#8a94a0` — quietest element on the
    card, since it's a reference number for Byron, not something a candidate
    needs to notice
  - "View Position →": 14px/700, unified blue, underlined — stays the loudest
    link, arrow added as a directional cue
  - "See similar positions": 12px/400, lighter blue `#5a8caa`, lowercase,
    underlined — deliberately quieter than "View Position" so it reads as
    the secondary option, not a competing action
  - No background, border, or padding on any line — Outlook's paste sanitizer
    strips those regardless of framing; only font-size/font-weight/color/
    text-decoration survive on the innermost `<span>`/`<font>` elements, per
    the established three-layer pattern (`div` + `span` + legacy `font`) from
    the 09-11 baseline. This constraint was called out explicitly to Byron
    rather than silently worked around.

  Verified live by actually clicking "Copy Link" on a real card and reading
  the clipboard's `text/html` payload in the browser console — not just
  checking the source — for both the 13px-title fix and the full Option B
  redesign. This is now the standard verification method for this feature:
  source-level confirmation alone was not sufficient in earlier sessions
  when a font-size call had already been marked "settled" once before and
  still needed correcting.

### 3. Positions 1115 and 1116 — double-dash title text

Byron caught (via a mobile Safari screenshot) that both positions were
titled "Intermediate – Senior – Electrical Engineer" (double en-dash,
inconsistent spacing between the two — 1115 was actually missing a space:
"Senior– Electrical"). Asked to fix site-wide.

**A full sweep of every one of the 165 live positions (all 33 files under
`data/jobs/`) confirmed 1115 and 1116 were the only two positions anywhere
on the site with this double-dash pattern** — this was a two-position fix,
not a widespread one. Retitled both to **"Intermediate/Senior Electrical
Engineer"** in `data/jobs/positions-1113-1132.js` (`6ccf2f7`).

**This had two layers, not one** — the fix above only changed `job.title`
(used for the H1 and the grid card), but each position also carries its own
independently-authored `seoTitle` and `metaDescription` fields in the
`data/jobDetails/` overlay (see the existing CLAUDE.md working rule on
`seoTitle`/`metaDescription` drift — this is a fresh, concrete instance of
exactly that failure mode). Both fields on 1115 and 1116, in
`data/jobDetails/details-1113-1122.js`, still carried the old double-dash
title verbatim. Fixed in a second commit (`d6d8ffc`) after Byron said "continue"
following an incomplete first verification. **Any future title text fix on a
position must check `job.title` (base record), `seoTitle`, and
`metaDescription` (both in the `jobDetails` overlay) — fixing only the first
leaves the browser tab title and search-engine snippet stale even though the
page body looks correct.**

Verified live: page H1, browser tab `<title>`, and `<meta name="description">`
all read "Intermediate/Senior Electrical Engineer" cleanly on both
`/careers/positions/1115-intermediate-senior-electrical-engineer` and
`.../1116-intermediate-senior-electrical-engineer`. Also reflected instantly
in `/api/jobs-summary` (which the `/careers` grid, search, and filters all
read from) — that layer updates immediately since it's not statically
pre-rendered.

## Operational note: verifying a fix went live

Static position-detail pages (`app/careers/positions/[slug]/page.js`) are
fully pre-rendered at build time via `generateStaticParams` (all 165 slugs).
After a genuinely fresh, READY deployment, the page **body** (H1, from
`job.title`) reflected the fix within seconds, but the `<title>` tag lagged
behind on the first checks — not because of a CDN cache issue, but because
it was reading a *different, still-stale field* (`seoTitle`) than the body
was (`job.title`). What looked like a caching problem was actually the
seoTitle/metaDescription overlay gap described above. Don't assume "the
static page hasn't picked up the new deployment yet" — check whether the
specific value on the page (title tag vs. H1 vs. meta description) is
sourced from a different field first.

## Operational note: pushing multi-file edits without device bridge

This session ran in a plain chat context with no device bridge (no local
repo access) — all commits were made via GitHub's web "Upload files" flow,
injecting a `File`/`DataTransfer` into the page's hidden `<input
type="file">` via `javascript_tool`, per the established method. New this
session: when a fix requires reading a file's current content on one page
(e.g. `raw.githubusercontent.com`) and then uploading the edited version on
a different origin (`github.com/.../upload/...`), `fetch()` between the two
fails (blocked, likely CSP), and `sessionStorage`/`localStorage` don't
survive the origin change. **`window.name` does survive a same-tab
cross-origin navigation** and was used as the transfer mechanism: read and
edit the file's text on the source page, stash it in `window.name`, navigate
to the upload page, read it back out of `window.name`, then build the
`File`/`DataTransfer` from that. Worked cleanly for a 33-file sweep plus two
follow-up edits in this session.

## Verification checklist for this baseline

- [x] JobCard title font-size confirmed via live computed style (16.8px)
- [x] Email share card Option B confirmed via live clipboard read after
      clicking "Copy Link" on a real card (all 7 style/content checks passed)
- [x] Positions 1115/1116 `job.title`, `seoTitle`, and `metaDescription` all
      confirmed live via direct page fetch and `/api/jobs-summary`
- [x] All three fixes traced to Vercel deployments independently confirmed
      READY on the production target, not assumed from the GitHub push alone
