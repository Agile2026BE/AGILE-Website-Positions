# AGILE Careers — Locked Protected State

## Approved Mobile Hero Baseline — 2026-08-19

Byron Evans explicitly approved and locked the current Careers hero treatment on August 19, 2026.

- Published implementation commit: `4130164e08c0d8c61c848d393822d2eac308f555`
- Recovery record: `docs/APPROVED_CAREERS_MOBILE_HERO_2026-08-19.md`
- Desktop story band remains the approved three-image storyboard.
- Mobile uses the single executive-at-the-window image with a subtle slow push-in.
- Mobile capsules use the approved three-over-two order and a one-time 750-millisecond sequential activation.

Do not change this approved hero baseline without a new explicit current instruction from Byron Evans.

## Current Main-Site Integration Reference — 2026-08-18 4:53 PM ET

The protected cross-repository reference for planned main-site menu routing into existing Careers functions is:

`docs/MAIN_SITE_MENU_INTEGRATION_REFERENCE_2026-08-18_1653.md`

This documentation does not authorize any Careers code, design, form, landing, anchor, offset, section, or navigation change.

Locked on: 2026-08-16

## Purpose

This file is the handoff source of truth for careers.agileconsultingsolutions.com. The Careers site landing positions, anchors, offsets, section placement, and navigation behavior are protected.

## Permanent Protection Rule

NEVER alter any Careers landing position, scroll offset, anchor behavior, section placement, or navigation behavior unless Byron Evans gives an explicit current instruction to change that exact Careers item.

Do not infer permission from older messages. Do not make adjacent adjustments. Do not normalize offsets. Do not improve related sections unless explicitly directed in the current task.

## Careers Top Navigation — Locked

- Home
- AGILE Insights
- Positions
- Reviews
- Contact
- Top

Do not redesign this navigation.

## Approved Careers Landing Behavior

### Top

- `#top`
- Must return to the approved Careers hero.

### AGILE Insights

- `#agile-insights`
- Preserve current approved landing.

### Positions

- `#positions`
- Preserve current approved landing.

### Reviews

- `#reviews`
- Current approved landing is locked at the position established by commit:
- `125b3f1ce878166d157c0933f482eeb972325945` — Lock approved Reviews landing position

Do not alter this Reviews landing without explicit current instruction.

### Contact

- Top-nav Contact routes to `#market-insights`.
- Approved lower Contact / Market Insights landing is locked at the position established by commit:
- `63437c498974b5bcc500254191d442b5665153da` — Match approved Contact landing position

Do not alter this Contact landing without explicit current instruction.

### Start a Conversation

- Preserve the currently approved Careers behavior from the restored Careers hero state.
- Do not change routing or landing unless explicitly instructed.

## Careers Hero / Content Baseline

The Careers hero content and navigation were restored to the approved state at:

- `9ede99529f71af69901bce9f986b799c3a64117f` — Restore approved Careers hero navigation

The Careers site includes:

- "Know the details before applying."
- Explore Positions
- Start a Conversation
- Trust badges

Do not redesign these elements as part of main-homepage work.

## Market Filter

The market filter workflow is already approved and must not be disturbed during unrelated work.

Known approved behavior includes:

- Multi-select markets
- Up to 5 selections
- Visible selected-count footer
- View Results action
- Existing positions filtering behavior

## Relationship to Main Website

The Careers site owns the candidate-specific journey, including:

- AGILE Insights
- Positions
- Reviews
- Candidate Contact
- Top navigation within Careers

The main homepage may link into these destinations but should not duplicate or modify Careers behavior.

## Main Homepage Handoff

See the main-site repository file:

`LOCKED_SITE_STATE_2026-08-16.md`

Approved main homepage navigation architecture documented there:

Top nav:
- About
- AGILE Insights
- Reviews
- Contact

Hero buttons:
- Explore Opportunities
- Client Hiring Support

Footer utility links:
- Privacy Policy
- Candidate Security
- Scam Warning
- AGILE Security

## Working Rule for Any Future Agent or Chat

Before touching this repository:

1. Read this file.
2. Treat every existing Careers landing as protected.
3. Make only the exact change Byron currently requests.
4. Do not change any other landing, anchor, offset, section, or navigation behavior.
5. If the task concerns the main homepage, work in `Agile2026BE/AGILE-Main-Website` instead.
