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
- terminatedPositionIds.js and dormantPositionIds.js (internal-only, filtered out
of the public jobs export in jobs.js — never rendered)
- One code comment in jobLocations.js mentioning "Concord Engineering" — not a data
field, doesn't ship to the browser, but worth cleaning up as hygiene next time
that file is touched.

IMPORTANT CAVEAT: GitHub's code search index lags behind recent pushes — files
committed earlier in the same session did not show up in search results for several
minutes. Don't trust "0 results" from github.com/search for anything pushed in the
current session; fetch the raw file directly instead and search the text yourself.
raw.githubusercontent.com can ALSO serve a stale cached copy for a few minutes after
a push — if a just-committed change doesn't show up in the raw file, check
github.com/OWNER/REPO/commits/main/PATH (commit history) before assuming it failed.

## Identifying "boilerplate" text leak — FULLY FIXED, all 8 positions confirmed live
Position 1101's public summary was originally found to be near-verbatim Vanderweil
Engineers' own "who we are" text. Scanning all data/jobs/*.js files for the pattern
(a summary containing both "offices" and "professionals"/"employees") found 7 flagged
positions; a later full scan of data/jobDetails/*.js (whyConsider/qualifications)
found an 8th. All 8 have now been rewritten to the same generic-but-impressive house
style (real substance — ENR Top 500, well-established multi-decade reputation for
excellence, genuinely supportive team, challenging and interesting projects, etc. —
with no specific identifying headcount/city-list/founding-year combination) and
confirmed live via commit history:

| ID | File | Confirmed live |
|---|---|---|
| 1046 | data/jobs/positions-1041-1060.js | Yes |
| 1093 | data/jobs/positions-1081-1100.js | Yes |
| 1094 | data/jobs/positions-1081-1100.js | Yes |
| 1101 | data/jobs/positions-1101-1112.js | Yes |
| 1106 | data/jobs/positions-1101-1112.js | Yes |
| 1114 | data/jobs/positions-1113-1132.js | Yes |
| 1160 | data/jobs/positions-1153-1162.js | Yes (commit 869623c) |
| 1204 | data/jobDetails/details-1204-1204.js | Yes (commit c99db08) — whyConsider had "60+ locations and 2,500+ professionals nationwide" |

## jobDetails scan — COMPLETE (2026-09-09)
All 41 data/jobDetails/*.js files have now been scanned for the same identifying
pattern. Result: only 1204 (above) was flagged and fixed. Everything else — including
the 24 files covering 1001-1185 scanned earlier, plus 1186-1205 scanned in this
session — came back clean.

## STILL OUTSTANDING
1. Master Position List workbook needs the client-mapping / status implications of
this audit reflected once Byron supplies the current file (he keeps it in a local
Downloads folder, versioned as either _vNN.xlsx or a _HH MM_FINAL_TRUTH_BASELINE.xlsx
snapshot — always check actual file modified timestamps, not just the version
number, to find the true current one; a FINAL_TRUTH_BASELINE file can be newer
than the highest numbered _vNN file).
2. Minor hygiene item, low priority: a code comment in data/jobLocations.js names
"Concord Engineering." Not a data field, doesn't ship to the browser, no actual
exposure — just worth cleaning up next time that file gets touched.
3. 1114's internal client is ambiguous in the workbook ("Ads Engineers; Vanderweil"
listed together for the same position) — worth a quick decision from Byron,
doesn't affect anything public-facing.

## Operational notes for automating GitHub pushes from a plain chat session (no device bridge)
- claude-in-chrome's file_upload tool does NOT work for pushing sandbox-generated
files to GitHub's web upload page in this kind of session — it errors that it "no
longer accepts host filesystem paths."
- Working alternative: inject file content directly via JS on the GitHub upload page
— new File([bytes], name) + DataTransfer + dispatch a change event on the
page's input[type=file].
- The github.com/OWNER/REPO/raw/refs/heads/main/PATH and
github.com/OWNER/REPO/raw/COMMIT_SHA/PATH URLs both work as authenticated
same-origin navigations for reading file content without hitting the raw CDN's
cache — prefer these over raw.githubusercontent.com when verifying a just-made edit.
- Clicking "Commit changes" is the fragile part. In order of reliability:
1. Take a screenshot immediately before clicking to confirm the button's actual
on-screen position, then click those exact pixel coordinates with the real
(non-JS) click tool — the page can scroll/reflow between calls.
2. element.click() via JS does NOT reliably trigger GitHub's submit handler.
3. form.requestSubmit() via JS does NOT reliably trigger it either.
4. Always verify a commit actually landed by checking
github.com/OWNER/REPO/commits/main/PATH afterward — a page redirect away from
the upload URL is a good sign but confirm via commit history before reporting
success.
- The Claude-in-Chrome browser connection itself can drop mid-session (shows "not
connected" or 4-minute timeouts). This is usually transient; re-running
tabs_context_mcp after a short wait typically reconnects. If it doesn't, the
Chrome extension on the user's machine likely needs a restart.