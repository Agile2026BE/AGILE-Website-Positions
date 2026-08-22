# Homepage Hero — Desktop Green Baseline

Date: 2026-08-22
Repository: Agile2026BE/AGILE-Website-Positions
Branch: preview/unified-homepage-v2

## Locked functional baseline

This checkpoint locks in the desktop presentation of the homepage hero
section (`app/page.js` / `app/page.module.css`) after the August 22 review
session. Byron confirmed this state as correct on desktop. Going forward,
desktop hero styling should not change unless Byron explicitly asks for it
— work from this point forward is expected to focus on the mobile /
narrow-viewport experience instead.

Key confirmed desktop items (all scoped inside the `@media(min-width:821px)`
block in `app/page.module.css` unless noted):

- Hero button sizing: `.hero .primary,.hero .secondary` at `min-height:50px;
  padding:0 26px;font-size:1.04rem`
- Check-off row: `.hero .actionGrid` at `column-gap:26px;row-gap:16px;
  margin-top:22px;font-size:.95rem`; extra `margin-top:28px` on the first
  two check-offs (`.actionBadge:nth-of-type(-n+2)`) for separation from the
  buttons above
- "We work directly with leadership teams..." paragraph (`.heroAdvantage`):
  `margin-top:24px;padding-top:18px;border-top:none` — no divider line, and
  positioned to clear the blueprint/conference table in the background
  photo
- Hero top spacing: `.heroContent{padding-top:50px}`, headline
  `.hero h1{margin:16px 0 14px}`
- Wordmark: `.miniLogo{margin-left:30px;transform:translateY(-6px)}` —
  nudged up and indented right from its un-scoped base position
  (`margin-left:18px`, no vertical offset), independent of the ACCESS menu
  button beside it
- Hero paragraph line-wrap widths (base, not desktop-only):
  `.lead{max-width:560px}`, `.heroAdvantage{max-width:800px}` — tuned to
  Byron's specified line breaks
- No horizontal shift/transform on `.heroContent` — the earlier
  translateX experiment was fully reverted per explicit request

Also confirmed working as of this baseline, sitewide (not hero-specific):

- Contact-section landing fix: `lib/scrollToSection.js` +
  `components/SiteHeader.js` (absolute-position settle-polling, instant
  scroll bypass for `scroll-behavior:smooth`, native-scroll race removed
  from the position-detail page CTA and the careers-hero CTA)
- Salary range display spacing (`$X – $Y` with spaces around the en dash)
  across all job data and every render site
- Position 1100 retired as a duplicate of 1099 — see
  `data/retiredPositionIds.js`; ID never reused, per Byron's numbering
  policy
- Footer spacing between the "Let's explore what comes next." statement
  and "STATES SERVED"

## Change control

Before further website changes, use this checkpoint as the comparison
point for desktop hero styling specifically. Mobile/narrow-viewport work
should not need to touch anything listed above — if a mobile fix seems to
require changing one of these rules outside a `max-width` media query,
stop and confirm with Byron first, since that would affect desktop too.
