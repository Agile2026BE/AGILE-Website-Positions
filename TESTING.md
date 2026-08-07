# AGILE Website Positions Testing Checklist

Use this checklist before any deployment or live-site replacement.

## Automated Check

Run:

```bash
npm install
npm run check
```

`npm run check` must complete all three stages successfully:

1. Job data validation
2. ESLint
3. Next.js production build

Do not proceed to deployment if any stage fails.

## Homepage Browser Check

Verify the homepage at desktop and mobile widths.

- Header remains readable and navigation links work.
- Hero typography does not overflow.
- Explore Positions scrolls to the job board.
- Start a Conversation scrolls to the contact section.
- All five position filters open and update results correctly.
- Keyword search updates results correctly.
- Reset Filters clears every active filter and search term.
- Result count matches the displayed filter state.
- Initial result display is limited to 24 positions when more than 24 verified jobs exist.
- Show More Positions adds the next batch without resetting filters.
- Empty-results state appears when no jobs match.
- Job cards remain readable at desktop, tablet, and mobile widths.
- Shortlist toggles correctly.
- View Position opens the correct detail page.
- Share uses the native share sheet when available and clipboard fallback otherwise.

## Position Detail Check

For at least one verified job record, confirm:

- The correct title is displayed.
- Location, state, workplace, salary, experience, and discipline match the source data exactly.
- Optional specialty, market, credential, and bonus fields appear only when present.
- Start a Conversation moves to the contact section.
- Header and footer remain intact.
- Mobile layout collapses the detail grid to one column.

## Missing Position Check

Open a nonexistent position slug and confirm:

- The unavailable-position page renders instead of a broken page.
- View Current Positions returns to the homepage job board.
- Start a Conversation returns to the homepage contact section.

## Contact Section Check

Before enabling live submission, confirm the current form remains presentation-only unless a verified backend has been connected.

- Name, email, phone, discipline, quick message, and message controls render correctly.
- Required email validation works in the browser.
- No résumé upload or submission behavior should be represented as operational until the backend and file handling are implemented and tested.

## Content Verification Rule

Do not add or restore factual job records, reviews, compensation, addresses, position IDs, or other source-specific content unless it has been verified against the approved live reference, screenshots, or an exact recovered source.

## Deployment Gate

Deployment is allowed only after:

- `npm run check` passes.
- Homepage browser checks pass.
- Position detail checks pass.
- Missing-position checks pass.
- Responsive checks pass.
- Verified source content has been reviewed.
- The reconstructed site has been compared visually against the approved live reference.
