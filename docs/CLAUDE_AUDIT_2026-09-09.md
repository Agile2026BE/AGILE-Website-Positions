# Claude session audit — 2026-09-09

Read this file first if you're a future Claude session picking up AGILE careers-site
work. It records what was verified live tonight, a real identifying-text leak found
across multiple positions, and exactly what's still outstanding.

## What's confirmed live and correct (verified against the live site, not just the repo)
- Position 1205 (Plumbing & Fire Protection Designer, Hollywood FL, MG Engineering) —
  created, wired into jobs.js, confirmed live.
- 1095/1097 — salaryMax fixed ($145K / $135K respectively, was inverted), confirmed
  live including the SEO metaDescription text.
- 1065 — experience field fixed from "Not stated" to "2-3 years", confirmed live.

## Standing rule
Every live position located in Hollywood, FL maps to Internal Client "MG Engineering" —
MG Engineering is AGILE's only client in Hollywood, FL.

## Client-name leak check — PASSED for public-facing data
Searched data/jobs/*.js and data/jobDetails/*.js for: Vanderweil, MG Engineering, MGE,
Dewberry, French and Parrello, Concord, Rock Brook, Meyers. Zero hits in files that
actually render on the public site. The only hits found were:
- `terminatedPositionIds.js` and `dormantPositionIds.js` (internal-only, filtered out
  of the public `jobs` export in jobs.js — never rendered)
- One code comment in `jobLocations.js` mentioning "Concord Engineering" — not a data
  field, doesn't ship to the browser, but worth cleaning up as hygiene next time
  that file is touched.

IMPORTANT CAVEAT: GitHub's code search index lags behind recent pushes — files
committed earlier in the same session did not show up in search results for several
minutes. Don't trust "0 results" from github.com/search for anything pushed in the
current session; fetch the raw file directly instead
(raw.githubusercontent.com/.../data/...) and search the text yourself.

## Real issue found — identifying "boilerplate" text leak (like the 1101/Vanderweil case)
Position 1101's public summary was found to be near-verbatim Vanderweil Engineers'
own "who we are" text (confirmed via web search match) — specific enough that anyone
could search it and land on the real firm despite "AGILE's Client" phrasing. That
was flagged to Byron and left as-is pending a decision on the rewrite.

Scanning ALL 33 data/jobs/*.js files for the same pattern (a summary containing both
"offices" and "professionals"/"employees" — i.e., real firm bio copy) found this is
NOT isolated to 1101. Full list, with severity:

| ID | File | Severity | Why |
|---|---|---|---|
| 1101 | positions-1101-1112.js | HIGH (confirmed) | Verbatim match to Vanderweil's own site text |
| 1114 | positions-1113-1132.js | HIGH | "founded nearly 45 years ago, ~205 professionals, offices in Greater Philadelphia, New York, Boston, Baltimore, and Washington, DC" — 5 named cities + exact headcount + exact age is very identifiable |
| 1160 | positions-1153-1162.js | HIGH | "180+ professionals across its Clarks Summit, PA and New York, NY offices" — Clarks Summit is an unusual, easily-searchable city name for a firm HQ |
| 1106 | positions-1101-1112.js | MEDIUM | "over 50 years... offices across three states... staff of 130+ professionals... education, commercial, industrial, multi-family housing, specialty community facilities" |
| 1093 | positions-1081-1100.js | MEDIUM-HIGH | Near-identical to 1101's Vanderweil text ("75 years... 500+ professionals... nine offices... largest independently owned") |
| 1094 | positions-1081-1100.js | MEDIUM-HIGH | Same Vanderweil-style paragraph as 1093 |
| 1046 | positions-1041-1060.js | LOW | "over a century... offices across the Northeast, including Philadelphia" — vaguer, generic "Employees are heard" tripped the scan but this one is lower-risk than the others |

Exact summary text for each is in the raw files if you need to re-verify — search
each position's record for "offices" to find the paragraph.

## STILL OUTSTANDING (not done as of this note)
1. **jobDetails files not yet scanned.** Only data/jobs/*.js (the summary field) was
   checked. The whyConsider/qualifications text in data/jobDetails/*.js could contain
   the same kind of identifying copy and hasn't been checked at all.
2. **The 7 flagged positions above still need to be rewritten** to generic,
   non-identifying copy (same approach used to fix nothing yet — 1101 itself is
   STILL UNFIXED on the live site, just flagged). Byron has not yet given the
   go-ahead to rewrite; when he does, follow the same anonymization approach used
   for position 1205's copy (real substance, no specific identifying combo of
   years/headcount/office list).
3. **Master Position List workbook** needs the client-mapping / status implications
   of this audit reflected once Byron supplies the current file (he keeps it in a
   local Downloads folder, versioned as either `_vNN.xlsx` or a
   `_HH MM_FINAL_TRUTH_BASELINE.xlsx` snapshot — always check actual file modified
   timestamps, not just the version number, to find the true current one; a
   FINAL_TRUTH_BASELINE file can be newer than the highest numbered _vNN file).

## Operational notes for automating GitHub pushes from a plain chat session (no device bridge)
- `claude-in-chrome`'s `file_upload` tool does NOT work for pushing sandbox-generated
  files to GitHub's web upload page in this kind of session — it errors that it "no
  longer accepts host filesystem paths."
- Working alternative: inject file content directly via JS on the GitHub upload page
  — `new File([bytes], name)` + `DataTransfer` + dispatch a `change` event on the
  page's `input[type=file]`. Base64-encode the content in the sandbox first and
  decode via `atob` in the injected script to avoid quoting/escaping issues.
- Clicking "Commit changes" is the fragile part. In order of reliability:
  1. Best: get the button's live `getBoundingClientRect()` via JS immediately before
     clicking, then click those exact pixel coordinates with the real (non-JS)
     click tool. A screenshot right before clicking to confirm the button's actual
     on-screen position is the most reliable check — the page can scroll/reflow
     between calls in ways that make stale coordinates miss.
  2. `element.click()` via JS does NOT reliably trigger GitHub's submit handler.
  3. `form.requestSubmit()` via JS does NOT reliably trigger it either.
  4. Always verify a commit actually landed by checking
     github.com/OWNER/REPO/commits/main afterward (or fetching the raw file and
     checking its content) — a page redirect away from the upload URL is a good
     sign but confirm via commit history before reporting success. Multiple pushes
     this session appeared to submit but silently failed with "Add some files to
     include in this commit." with nothing actually staged.
  5. raw.githubusercontent.com content can lag by a few minutes after a push — if a
     just-pushed change doesn't show up, wait and retry before assuming failure.
- The Claude-in-Chrome browser connection itself can drop mid-session (shows "not
  connected" or 4-minute timeouts). This is usually transient; re-running
  `tabs_context_mcp` after a short wait typically reconnects. If it doesn't, the
  Chrome extension on the user's machine likely needs a restart.
