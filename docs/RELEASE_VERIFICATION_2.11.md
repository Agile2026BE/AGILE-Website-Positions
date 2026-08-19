# AGILE Careers Release Verification 2.11

**Date:** August 19, 2026
**Repository:** `Agile2026BE/AGILE-Website-Positions`
**Release source:** `115ff3cd0e6e035e6ad287a9b22a273145a7fc69`
**Production release record:** `ab88739304e9817d43bc45d30836256a1e6b98b7`
**Live domain:** `https://careers.agileconsultingsolutions.com/`
**Status:** Production verification passed for the authorized Civil Engineering repair

## Live Verification Results

1. The live page loaded successfully with 183 total positions.
2. State `New York` plus Discipline `Civil Engineering` returned exactly 2 positions.
3. The returned IDs were exactly `1161` and `1162`.
4. Position 1161 displayed `Senior Civil Project Manager`.
5. Position 1162 displayed `Senior Highway/Civil Engineer`.
6. The page displayed no Next.js error overlay.
7. The approved Careers hero, capsule wording, capsule order, and desktop story image were present in the live DOM.

## Separate Known Runtime Observation

The browser console reported React minified error 418, indicating a hydration mismatch elsewhere on the existing page. The authorized Civil Engineering filter and both returned position records remained fully functional. This warning is outside the approved Version 2.11 change set and was not altered during this release.

## Recovery

- Exact pre-release production checkpoint: `e772fadec385d161706c689cc9c17f67e5150286`
- Exact Version 2.11 source recovery: `115ff3cd0e6e035e6ad287a9b22a273145a7fc69`
