# AGILE Website Positions

Reconstruction workspace for the AGILE Careers website.

## Current Architecture

The project is a Next.js application using the App Router.

Current structure:

- `app/layout.js` root document and metadata
- `app/page.js` homepage composition
- `app/globals.css` shared global tokens and base styles
- `app/positions/[slug]/page.js` individual position detail page
- `app/positions/[slug]/page.module.css` position detail page styles
- `app/positions/[slug]/not-found.js` unavailable position page
- `app/positions/[slug]/not-found.module.css` unavailable position page styles
- `components/SiteHeader.js` primary site navigation
- `components/HeroSection.js` careers hero
- `components/JobBoard.js` interactive search and filtering UI
- `components/JobCard.js` position card and actions
- `components/ReviewsSection.js` verified-content placeholder for candidate reviews
- `components/ContactSection.js` professional career inquiry section
- `components/SiteFooter.js` careers footer
- dedicated CSS modules for the primary interface components and controls
- `data/jobBoardConfig.js` job board labels and field definitions
- `data/jobs.js` verified job data source placeholder
- `lib/jobFilters.js` filtering and keyword search logic
- `lib/shareJob.js` position sharing behavior
- `scripts/validate-jobs.mjs` job data validation
- `TESTING.md` browser, responsive, content, and deployment verification checklist
- `.github/workflows/check.yml` automated validation, lint, and production build checks

## Reconstruction Rules

1. Work only inside `Agile2026BE/AGILE-Website-Positions`.
2. Do not access or modify AGILE Mission Control, the Recruiting Operating System, AGILE_CORE_BUILD, recovery folders, or unrelated repositories.
3. Rebuild one file at a time.
4. Do not use autonomous looping tools.
5. Do not invent job records, reviews, compensation, locations, position IDs, or other factual site content.
6. Restore factual content only from verified live-site text, screenshots, or an exact recovered blueprint.
7. Do not change or redeploy the current live ChatGPT Site until the reconstructed version has been reviewed and tested.

## Current Functional Status

Implemented:

- Next.js project foundation
- Responsive page shell
- Header navigation
- Careers hero
- Five job filters: State, Discipline, Minimum Salary, Workplace, Market
- Keyword search
- Reset control
- Dynamic result count
- Initial 24-position display behavior
- Show 24 More Positions behavior
- Job card field structure
- Shortlist action state
- View Position links
- Share action with native sharing or clipboard fallback
- Individual position detail pages
- Position not found state
- Candidate reviews section placeholder
- Career inquiry section layout
- Footer
- Component-level responsive CSS modules for the primary interface
- Cleanup of duplicated component rules from `app/globals.css`
- Combined `npm run check` verification command
- GitHub Actions project-check workflow
- Pre-deployment testing checklist

Not yet completed:

- Verified 170-position dataset
- Exact filter option values from the source site
- Verified candidate review text
- Working inquiry submission backend and resume upload
- Exact visual matching against the live site
- Confirmed passing automated build in a complete Node environment
- Full browser and responsive testing
- Deployment configuration

## Verification Commands

Run locally:

```bash
npm install
npm run check
```

`npm run check` runs job validation, ESLint, and the Next.js production build. Use `TESTING.md` for the required browser and deployment-gate checks after the automated command passes.

## Source of Truth

Current live reference:

`https://agile-careers-experience.byron-evans-3540.chatgpt.site`

The original editable ChatGPT Site source has not been recovered. This repository is therefore a controlled reconstruction, not an export of the original source.

## Current Checkpoint

The main interface architecture and responsive CSS module migration are substantially complete. Shared styling has been reduced to global tokens and layout primitives, and automated verification plus a manual testing checklist are now in place. A successful project build and browser pass must be confirmed before verified content restoration expands or any deployment changes are considered.

## Next Recommended Step

Run `npm install` followed by `npm run check` in a complete Node environment. Resolve any validation, lint, or build errors one file at a time, then complete the checks in `TESTING.md` before proceeding to verified content restoration and exact visual matching.
