# AGILE Careers — Share/Copy Feature Baseline (2026-09-12)

## Purpose
This documents the settled, verified-live state of the position share/copy feature (`lib/shareJob.js`, `next.config.mjs`) as of 2026-09-12. Read this before making further changes to the "Copy Link" / "Copy for Text" buttons, the email card, or the SMS/text plain-text output.

## Current baseline commit
`1977b55270a19f96324eddaeb4e1af9d7ee6c40e`

Commit message: "Strip www from short similar-positions URL to match View Position"

Vercel production deployment: `dpl_FwVKibbZWAkCeycexyJELmkesnZW` — READY, verified live via direct clipboard testing on position 1010.

## What's live and confirmed working

### Two separate share actions per job card (JobCard.js)
- **Copy Link** — rich HTML card + plain-text fallback, for pasting into email (Outlook, Gmail, Apple Mail). Uses `copyRichPosition()`.
- **Copy for Text** — plain text only, for SMS/iMessage, LinkedIn messaging, Juicebox. Uses `copyPositionForText()`. A dedicated button exists because pasting the rich HTML card into Mac Messages produced a badly-wrapping long-URL mess — HTML on the clipboard is never safe for texting.
- The bulk "Share Position" dialog (SharePositionsModal.js) keeps its own separate Copy for Email / Copy for Text buttons for multi-select sharing — unaffected by this baseline.

### Plain-text output (`positionShareText()`)
- Title renders as plain ordinary text, no styling. Two earlier emphasis treatments were tried and reverted: ALL CAPS (too shouty) and Unicode Mathematical Sans-Serif Bold (rendered oversized/off in iOS's fallback font).
- Format: title / location · workplace / salary / Position ID / "View Position:" + URL / "Similar Positions:" + URL, one field per line.
- Both links use the short no-www form.

### Email HTML card (`positionShareHtml()`) — settled font sizes
Rescaled 2026-09-12 to read comfortably at normal email body-text scale (12px), after several rounds of shrinking that ended up making the card look smaller than the surrounding email prose:
- Eyebrow ("AGILE CAREER OPPORTUNITY"): 10px / weight 700, letter-spaced
- Title (the headline): 15px / weight 700
- Detail line (location · workplace): 12px / weight 400
- Salary: 13px / weight 700
- Position ID: 11px / weight 400
- "View Position" link: 13px / weight 700
- "Similar Positions" link: 13px / weight 700 (matched to View Position)

Every visual property (color, size, weight) is written three times — outer div, inner span, legacy font tag — because Outlook Web's paste sanitizer strips anything not set at the innermost text-carrying element. Color is isolated into its own style layer, separate from size/weight, because Outlook Web's sanitizer drops color specifically when it's bundled with size/weight in one style attribute.

### Short link route for Similar Positions
- Added `/s/:id` redirect in next.config.mjs → `/p/:id#similar-positions` (permanent: false).
- `shortSimilarUrl(job)` in shareJob.js builds this short link and strips `www.` to match the existing short-URL convention used by View Position.
- Used by both the plain-text (SMS) and email-card Similar Positions link. Shortens that link from ~53 characters (`/p/1010#similar-positions`) to ~39 (`/s/1010`).

## Known device-level limitation (not fixable in code)
iOS Messages mid-word hyphenation of long words (e.g. a title wrapping as "Engi-/neer") is controlled by the recipient's own iOS text-size setting (Settings → Accessibility → Display & Text Size → Larger Text) — it triggers once system text is set above the default size. SMS carries no styling/CSS at all, so nothing the site sends can control this.

## Commit history for this baseline (oldest to newest)
- `fd91ede` Fix share/copy: single-format clipboard writes, bigger legible email card sizing
- `aa45d24` Restore rich HTML card as the default Copy Link behavior
- `a08f134` Update Copy Link status label for rich-clipboard method
- `1006f90` Add copyPositionForText single-job wrapper
- `501d482` Add dedicated Copy for Text button to each job card
- `533757b` Shorten card links to no-www URL, shorten Similar Positions label
- `709bb7a` Reduce email card font sizes so Messages paste doesn't look oversized
- `14cb866` Drop all-caps title from plain-text version, reads too shouty
- `40ca271` Add Unicode bold title emphasis for plain-text sharing
- `45b106d` Remove redundant Copy for Text button, Copy Link handles both now
- `6e74d4a` Add dedicated Copy for Text button to JobCard (fix messy iPhone Messages paste)
- `664dc0f` Add Copy for Text label to job board config
- `7a119e5` Drop Unicode bold title from plain-text share, reads too large/off on iOS
- `2316742` Shrink View Position / Similar Positions link sizes 2px, other lines 1px
- `13aae41` Cut email card title to 10px/600 weight, still too large next to eyebrow
- `eadd36d` Match Similar Positions link size to View Position (10px/700)
- `371a27b` Rescale email card to read at body-text scale, not shrunken
- `72acb58` Add /s/:id short redirect to similar-positions anchor
- `50fc979` Use short /s/:id link for Similar Positions in text and email
- `1977b55` Strip www from short similar-positions URL to match View Position (current HEAD for this baseline)

## Verification method used
Every sizing and link change in this baseline was confirmed live (not assumed) by: reading the deployed source directly from GitHub, confirming the matching Vercel production deployment reached READY, then clicking the actual "Copy Link" / "Copy for Text" buttons on the live site and reading the real clipboard contents (`navigator.clipboard.read()`) to check exact rendered font-size/weight values and URLs.
