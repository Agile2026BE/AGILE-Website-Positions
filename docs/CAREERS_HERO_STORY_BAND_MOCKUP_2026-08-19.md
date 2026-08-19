# Careers Hero Story Band — Local Review Mockup

**Control ID:** ACB-012

**Date:** August 19, 2026

**Status:** Review publication authorized — existing Careers review branch only

## Authorized change

Add a contained, high-definition visual story band beneath the five existing career-detail capsules to evaluate whether the unused blue hero space can support a future video.

## Current mockup

- Desktop and laptop show a contained three-part sequence: city movement, AEC plan review, and a skyline decision moment.
- Mobile shows a tighter static crop centered on the plan-review scene.
- The mockup introduces no new wording, button, audio, autoplay, or interaction.
- Existing hero copy, actions, capsules, navigation, position data, and form functionality remain unchanged.

## Files

- `components/HeroSection.js`
- `components/HeroSection.module.css`
- `public/agile-informed-move-storyboard-v1.png`

## Verification

- `npm run validate:jobs`: passed; 183 records validated.
- Changed Hero source lint: passed.
- `npm run build`: passed; 373 static pages generated.
- Complete diff inspected; the unrelated controlled position-record repair for IDs 1161 and 1162 remains separate under ACB-011.
- The existing Version 2.10 review branch contains an inherited lint finding in `components/JobBoard.js`; that protected file is unchanged by this mockup.

## Deployment control

Publishing is authorized only to `agent/open-client-support-from-main-menu` with a Vercel preview deployment. Merge, promotion, and production publication remain prohibited.
