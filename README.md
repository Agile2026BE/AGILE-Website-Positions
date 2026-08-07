# AGILE Website Positions

Reconstruction workspace for the AGILE Careers website.

## Current Architecture

The project is a Next.js application using the App Router.

Current structure:

- `app/layout.js` root document and metadata
- `app/page.js` homepage composition
- `app/globals.css` global responsive styles
- `components/SiteHeader.js` primary site navigation
- `components/HeroSection.js` careers hero
- `components/JobBoard.js` interactive search and filtering UI
- `components/ReviewsSection.js` verified-content placeholder for candidate reviews
- `components/ContactSection.js` professional career inquiry section
- `components/SiteFooter.js` careers footer
- `data/jobBoardConfig.js` job board labels and field definitions
- `data/jobs.js` verified job data source placeholder
- `lib/jobFilters.js` filtering and keyword search logic

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
- Candidate reviews section placeholder
- Career inquiry section
- Footer

Not yet completed:

- Verified 170-position dataset
- Exact filter option values from the source site
- Full job card actions such as Shortlist, View Position, and Share
- Individual position detail pages
- Verified candidate review text
- Working inquiry submission backend and résumé upload
- Exact visual matching against the live site
- Local build and browser testing
- Deployment configuration

## Source of Truth

Current live reference:

`https://agile-careers-experience.byron-evans-3540.chatgpt.site`

The original editable ChatGPT Site source has not been recovered. This repository is therefore a controlled reconstruction, not an export of the original source.

## Next Recommended Step

Continue restoring verified interface behavior and content one file at a time, then run the first local Next.js build before adding or changing the live deployment.
