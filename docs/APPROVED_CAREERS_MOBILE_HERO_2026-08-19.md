# Approved Careers Mobile Hero Baseline

**Date:** August 19, 2026  
**Repository:** `Agile2026BE/AGILE-Website-Positions`  
**Branch:** `agent/open-client-support-from-main-menu`  
**Published implementation commit:** `4130164e08c0d8c61c848d393822d2eac308f555`
**Status:** Approved, published, and locked review baseline
**Publication authorization:** Yes, August 19, 2026

## Approved Experience

### Desktop and Laptop

1. Preserve the approved three-image horizontal storyboard.
2. Preserve the existing hero content, buttons, capsules, colors, and layout.

### Mobile and Small Viewports

1. Show the executive looking out the contemporary office window as the single story image.
2. Keep his complete head and face visible with the approved crop.
3. Apply a subtle 9.5-second push-in from scale 1.02 to 1.11, alternating smoothly without sideways drift.
4. Disable the image movement when reduced motion is requested.
5. Use the approved capsule grid and reading order:
   - Salary disclosed
   - Location disclosed
   - Virtual Interviews
   - Work schedule disclosed
   - No Account Setup Required
6. Place the first three capsules on the first row and the remaining two on the second row.
7. Keep the capsules slim at a 32-pixel minimum height.
8. Activate the entire capsules once, 750 milliseconds apart, with the check marks following each capsule.
9. Do not loop or replay the capsule sequence.

## Changed Files

1. `components/HeroSection.js`
2. `components/HeroSection.module.css`
3. `public/agile-executive-window.webp`

## Validation

1. The optimized Next.js production build passes using the webpack build path.
2. All 373 generated routes complete successfully.
3. The desktop storyboard remains present and is hidden only below the approved responsive breakpoint.
4. The mobile executive image is hidden above that breakpoint.
5. Reduced-motion handling is present for both image movement and capsule activation.

## Recovery

Restore commit `4130164e08c0d8c61c848d393822d2eac308f555` to recover the exact approved implementation. This record and the protected-state file identify it as the approved review baseline. No merge or production-domain promotion was performed.
