# AGILE Website Design System

Last updated: August 8, 2026

## Purpose

This file is the visual source of truth for AGILE Careers and the broader `www.agileconsultingsolutions.com` redesign. Use these tokens and patterns so Careers, Employers, Reviews, Insights, Contact, and future AGILE pages clearly belong to the same brand family.

Do not redesign colors, typography, spacing, or controls independently page by page unless Byron explicitly approves a system change.

## Core Brand Colors

These values are taken directly from the current Careers codebase.

### Primary Navy Family

- AGILE Navy Dark: `#173958`
  - Primary headings, strong text, selected interface accents.
- Header / Wordmark Navy: `#173957`
  - Current AGILE wordmark in the header.
- Core Navy: `#243B67`
  - Global navy token and selected controls.
- Deep Motion Navy: `#102F49`
  - Video / motion section fallback and dark visual fields.
- Hero Navy Start: `#173954`
- Hero Navy Mid: `#244F6C`
- Hero Navy End: `#315E79`
  - Use together for the established hero gradient.

### AGILE Blue Accent Family

- Primary Action Blue: `#1476A8`
  - Search Careers, View Position, Send My Inquiry, primary utility buttons.
- Secondary Accent Blue: `#1684B6`
  - Editorial accents, emphasized labels, line treatments.
- Bright Light Blue: `#67C6E9`
  - Underlines, top rules, emphasis.
- Light Cyan Accent: `#70CDEF`
  - Eyebrows and motion-section labels.
- Soft Eyebrow Blue: `#73C1E6`
  - Contact-section labels.
- Hero Eyebrow Blue: `#A8D9EE`
- Hero Emphasis Blue: `#9ED8EC`
  - Use selectively for highlighted words, not body copy.

### Gold Accent Family

- Global Gold Accent: `#D9B16F`
- Primary CTA Gold currently used in hero: `#D6A94C`
  - Gold is restrained. Use for one prioritized call to action or brand emphasis, not as a general page color.

### Backgrounds and Surfaces

- Main Page Background: `#F7F9FB`
- Warm / Neutral Section Background: `#F7F8FA`
- Position Search Background: `#EDF2F5`
- Surface White: `#FFFFFF`
- Muted Surface: `#EEF2F8`
- Soft Blue Surface: `#EEF7FB`
- Tag / Light Blue Surface: `#DFF1F8`
- Pale Badge Surface: `#F5FBFE`

The preferred pattern is a subtly tinted page canvas with white cards or form surfaces on top. Avoid white-on-white layouts where cards disappear into the page.

### Text Colors

- Primary Text: `#1D2433`
- Navigation Text: `#152033`
- Navy Heading Text: `#173958`
- Form / UI Text: `#26384B`
- Secondary Navy Text: `#29415A`
- Muted Text: `#667085`
- Secondary Muted Text: `#53697A`
- Supporting Text: `#4B667B`

### Borders

- Global Border: `#D8DFEB`
- Header Border: `#E4E9EE`
- Form Border: `#C7D5DF`
- Filter Border: `#CFD9E2`
- Badge Border: `#BFD5E2`

## Typography

### Primary Interface Font

Use:

`Arial, Helvetica, sans-serif`

This is the default for body copy, navigation, filters, form labels, position metadata, buttons, badges, position-card supporting text, and compact interface content.

### Display / Editorial Font

Use selectively:

`Georgia, "Times New Roman", serif`

Use only for deliberate editorial headlines, the AGILE wordmark, hero display language, and selected Why AGILE statements.

Do not use serif display typography for every job title or form heading.

## Position Typography Rules

Position titles must remain compact and practical.

- Search-result position titles: Arial/Helvetica, bold, only modestly larger than body copy.
- View Position modal title: Arial/Helvetica, bold, compact.
- Standalone position-page title: Arial/Helvetica, bold, compact.
- Inquiry position reference: compact bold sans-serif.
- Share panel position title: compact bold sans-serif.
- Avoid giant Georgia job titles.
- Avoid title sizing that causes one or two words to fall onto a new line unnecessarily.

Recommended working scale after normalization:

- Desktop job title: approximately `1.15rem` to `1.35rem`, weight `700`.
- Mobile job title: approximately `1.05rem` to `1.2rem`, weight `700`.
- Position body copy: readable sans-serif around `0.9rem` to `1rem`; do not reduce to 9px.
- Compact metadata: approximately `0.72rem` to `0.9rem` depending on hierarchy.

## Heading Hierarchy

### Eyebrows / Section Labels

- Sans-serif.
- Uppercase.
- Weight `800`.
- Letter spacing generally `.12em` to `.20em`.
- Typical size `.68rem` to `.78rem`.
- Preferred colors: `#70CDEF`, `#73C1E6`, `#A8D9EE`, or `#1684B6` depending on background.

### Major Editorial Headlines

- Georgia / Times New Roman only where intentional.
- Must be responsive and deliberately wrapped.
- Do not allow isolated one-word continuation lines.
- Hero and marketing statements may use italic emphasis sparingly.

### Body Copy

- Arial / Helvetica.
- High contrast.
- Typical line-height `1.45` to `1.65`.
- Keep paragraphs short and scannable on mobile.

## Buttons and Controls

### Primary Blue Button

- Background: `#1476A8`
- Text: `#FFFFFF`
- Border radius: usually `5px` to `6px`
- Minimum height: approximately `44px` to `50px`
- Font weight: `700` to `800`

Use for:

- Search Careers
- View Position
- Send My Inquiry
- Primary functional actions

### Gold Priority CTA

- Background: `#D6A94C`
- Text: deep navy such as `#173954`
- Use only where one action should receive premium visual priority.

### Secondary Button

- Transparent or white background.
- Fine border.
- Navy text on light backgrounds or white text on dark backgrounds.
- Do not create competing heavy CTAs side by side.

### Focus State

Preferred blue focus:

- Border / outline: `#1476A8`
- Soft focus ring: `rgba(20,118,168,.12)` to `rgba(20,118,168,.20)`

## Cards and Surfaces

Global card pattern:

- Background: `#FFFFFF`
- Border: `1px solid #D8DFEB`
- Standard radius: `14px`
- Small radius: `10px`
- Large radius: `22px`
- Shadows should be restrained.

Current global shadow token:

`0 10px 30px rgba(30,45,75,.06)`

Use hover elevation only where it improves discoverability; avoid excessive floating-card effects.

## Layout Widths

### Global Container

Desktop maximum:

`min(1420px, calc(100% - 120px))`

Mobile container:

`min(100% - 24px, 1420px)`

### Specialized Wider Areas

- Contact grid can use up to approximately `1440px`.
- Why AGILE card grid can use approximately `1320px`.
- Hero content is intentionally narrower, approximately `1180px`, for readable line length.

Large 40-inch+ monitors should retain controlled maximum widths rather than stretching content edge to edge.

## Section Spacing

Global section default:

- Desktop vertical padding: approximately `72px`.
- Mobile vertical padding: approximately `52px`.

Functional pages may tighten this when large spacing hurts anchor landing accuracy.

Avoid large empty vertical gaps merely for decoration.

## Responsive Breakpoints in Current Careers Code

These are the main established breakpoints currently used:

- `1440px` — extra-wide desktop tuning.
- `1180px` / `1100px` / `1024px` — wide-to-standard desktop adjustments.
- `980px` / `900px` — tablet / compact desktop stacking.
- `760px` / `720px` — primary mobile/tablet navigation and layout transition.
- `640px` / `620px` — phone layout refinements.
- `520px` — narrow-card/mobile adjustments.

Future AGILE pages should reuse these breakpoint neighborhoods rather than inventing unrelated breakpoint systems.

## Header / Navigation Pattern

Current standard:

- White sticky header.
- Thin bottom border `#E4E9EE`.
- AGILE wordmark in `#173957`.
- Desktop header minimum height approximately `82px`.
- Navigation text `#152033`, bold.
- Hover state `#1476A8`.
- Search Careers uses the primary blue CTA treatment.

Mobile:

- Navigation wraps cleanly.
- Wordmark reduces in size.
- Search Careers remains a clear tap target.
- Do not restore the oversized image logo in the mobile header.

## Hero Pattern

Established dark hero gradient:

`linear-gradient(125deg, #173954 0%, #244F6C 62%, #315E79 100%)`

Hero principles:

- Strong market-identifying eyebrow.
- Deliberate headline wrapping.
- One primary and one secondary action maximum.
- Short supporting copy.
- Optional disclosure badges below actions.
- Avoid oversized headings that dominate an entire monitor.

## Why AGILE Motion Pattern

- Deep navy fallback: `#102F49`.
- Video is decorative and must not prevent content access.
- Overlay must maintain text contrast.
- Editorial light-blue underline: `#67C6E9`.
- Motion copy uses white with light-blue eyebrow accents.
- Respect `prefers-reduced-motion`; provide a static gradient fallback.

## Forms

- White surface on contrasting page background.
- Form text Arial/Helvetica.
- Field border `#C7D5DF`.
- Border radius about `5px` to `7px`.
- Field text approximately `.96rem` / 15px.
- Minimum input height about `42px` desktop and `46px` mobile.
- Primary submit button uses `#1476A8`.
- Avoid browser autofill surprises where they create incorrect candidate data.

## Success / Celebration Pattern

Successful inquiry behavior:

1. Submission must actually succeed first.
2. Show a brief, tasteful confetti burst for approximately 1–2 seconds.
3. Show a clear success message.
4. Confetti disappears automatically.
5. Do not leave a permanent celebration icon on screen.
6. Keep the burst tighter on mobile than desktop.
7. Reduced-motion users should receive the success state without forced animation.

Current success colors:

- Success background: `#EAF7EF`
- Success text: `#1E6841`
- Success border: `#B9DFC8`

## Search / Position Experience

- Position-search page background should be visually distinct from white position cards.
- Filters and dropdowns use white surfaces.
- Dropdowns should use consistent ordering and real job data.
- Position ID, salary, location, workplace, specialty and experience remain clearly visible.
- Shortlist is limited to three positions.
- Clean copied position links should be usable in email, SMS, notes and LinkedIn outreach.

## Brand Consistency Rule for Main Website

When rebuilding `www.agileconsultingsolutions.com`, begin with this system rather than the legacy GoDaddy visual styling.

Pages may have different content and layouts, but they should share:

- the same navy family,
- the same light-blue accents,
- the same restrained gold,
- the same Arial/Helvetica interface typography,
- the same selective Georgia editorial typography,
- the same button language,
- the same border/radius family,
- the same controlled desktop widths,
- the same responsive breakpoint neighborhoods,
- and the same clean, professional AEC recruiting tone.

The goal is one AGILE digital family, not identical pages.

## Change Control

If a future page requires a new color, font, radius, or major component treatment:

1. Reuse an existing token first.
2. Add a new token only when the existing system cannot solve the need cleanly.
3. Document the new token here.
4. Apply it consistently across related pages.
5. Do not silently drift from the Careers design language.
