# AGILE Careers GREEN Baseline — September 1, 2026

## Status

GREEN baseline established after the September 1 discipline-taxonomy overhaul, new-position, Featured Positions curation, and hero-styling cycle. Confirmed live in production and verified directly against the live site and the GitHub API (not just local diffs) throughout the session.

Baseline code commit:

`513451e` (full: `513451e2e7506cb429046880631841fdbd3530eb`) — "Update .lifeWord class styling in JobBoard.module.css," branch `main`. Confirmed "2/2" (GitHub Project Check + Vercel deployment-status check) on the commit page.

Repository:

`Agile2026BE/AGILE-Website-Positions`

Branch:

`main`

Production domain:

`https://careers.agileconsultingsolutions.com` (also serves at `https://www.agileconsultingsolutions.com/careers` — both confirmed live and in sync tonight; see `PROJECT_CHECKPOINT.md` domain note from the August 23 baseline for background).

## Work Included In This Baseline (September 1 cycle)

### 1. Commissioning discipline retagging (carried over from a prior session, completed tonight)

- Position **1010** ("Senior Electrical Commissioning Engineer") retagged from `Electrical Engineering` to `Commissioning`. Commit `d6c1a94`.
- Position **1074** ("Director of Operations – Commissioning Group") retagged from `Electrical Engineering` to `Commissioning`. Commit `daeae3e`.
- The `Commissioning` discipline option itself was already present in `data/filterOptions.js` from a prior session (commit `0ee0f9d`, predates this baseline).
- Live `Commissioning`-tagged positions as of this baseline: **1010, 1074** (verified via live API read of all `data/jobs/*.js` files).

### 2. New position added — 1187, Senior Mechanical Engineer

- Client: Shenoy Engineering / SEPC (kept internal-only per standing rule — never appears in public position data).
- Location: Pine Brook, NJ · Hybrid Schedule · $100,000–$150,000 · 5+ years · PE/LEED AP preferred · Commissioning-adjacent HVAC design leadership role.
- New files: `data/jobs/positions-1187-1187.js`, `data/jobDetails/details-1187-1187.js`, wired into `data/jobs.js`. Commits `edae167`, `636e64d`, `ed7de8c`.
- Discipline set to `Mechanical HVAC` (see next section) at creation, then formally retagged in the discipline overhaul below for consistency — final state `Mechanical HVAC`. Commit `6dc5a81`.

### 3. Discipline taxonomy overhaul — "Mechanical Engineering" retired

**Problem found:** 77 live positions used `"discipline":"Mechanical Engineering"`, a value that was not present in `data/filterOptions.js`'s `disciplineOptions` dropdown at all — roughly 40% of the site's positions had no exact-match filter category. Investigation of `lib/jobFilters.js`'s `disciplineMatches()` showed the site actually does fuzzy keyword matching across `discipline + specialty + title` (not exact-match against `discipline` alone), so these positions were not literally invisible in search, but the **visible discipline badge** printed on every job card (`<p>{job.discipline}</p>` in `components/JobCard.js`) still showed the non-standard "Mechanical Engineering" label to every candidate, and the fuzzy `"mechanical hvac"` alias's inclusion of the bare word "mechanical" meant pure plumbing/fire-protection postings were also over-matching into HVAC search results.

**Fix — new discipline option added:**

- `MEP Project Manager` added to `disciplineOptions` in `data/filterOptions.js`. Commit `790d704`. (`Mechanical HVAC` and `Mechanical Plumbing and Fire Protection` already existed as options but had zero positions correctly tagged into them before tonight.)

**Fix — `lib/jobFilters.js` alias precision, commit `d40578e`:**

- `"mechanical hvac"` alias tightened from `["mechanical","hvac"]` to `["hvac"]` only — stops any mechanical-discipline posting from auto-matching HVAC searches just because "mechanical" appears in its own discipline string.
- New `"mep project manager"` alias added: `["mep project","project manager – mep","project manager - mep"]`.

**Fix — all 77 positions retagged**, split by actual title/specialty content (full verification query run against live data, see below):

| New discipline | Count | Position IDs |
|---|---|---|
| `Mechanical HVAC` | 58 (57 retagged + new position 1187) | 1036–1040, 1041–1061, 1091–1100, 1133–1137, 1140–1145, 1147, 1154–1156, 1158, 1160, 1164, 1166, 1168, 1170, **1187** |
| `Mechanical Plumbing and Fire Protection` | 14 | 1062–1072, 1103–1105 |
| `MEP Project Manager` | 5 | 1106, 1107, 1110, 1138, 1150 (1150 is retired — see `retiredPositionIds.js`; retagged anyway for data consistency, has no live-site effect) |

Commits: `f5501e5`, `b466a54`, `f75e355`, `dc5b15c`, `a946d4d`, `6c27a92`, `09aacda`, `144bd66`, `780308e`, `6dc5a81`.

**`MEP Project Manager` reasoning:** these 5 are genuine multi-system project-management roles (title/specialty explicitly say "MEP Project Manager" or "MEP Project Leadership"), not senior executive leadership (the existing `MEP Executive Leadership` alias only matches VP/Principal/Director-level language, which these titles don't contain) and not single-discipline design engineers. 1106/1150 share the identical title pattern "Senior Mechanical Engineer / Project Manager" and were both placed here for label consistency, even though 1150 is retired.

**Verification run live against the GitHub API (not local files) at the end of the session:** zero positions remain tagged `"Mechanical Engineering"` anywhere in `data/jobs/*.js`. Final counts confirmed: `Mechanical HVAC`=58, `Mechanical Plumbing and Fire Protection`=14, `MEP Project Manager`=5 (58+14+5=77, matches the original audit exactly).

**Live filter-panel spot check (careers.agileconsultingsolutions.com):** selecting `Mechanical HVAC` returns 59 positions (58 retagged + 1 pre-existing), `Mechanical Plumbing and Fire Protection` returns 19 (14 retagged + 5 pre-existing), `MEP Project Manager` returns 4 (the 4 live IDs; 1150 correctly excluded as retired). Position 1135 and 1138 (both explicitly multi-system, e.g. "HVAC, Plumbing, Fire Protection" in their specialty text) confirmed to surface under *both* the HVAC and Plumbing/FP filters simultaneously — this works automatically because `disciplineMatches()` checks specialty/title text, not just the `discipline` field, so it required no special dual-tagging.

**Known follow-up not done tonight:** `ICT/AV Technology`, `Resident Engineering`, and `Construction Management` were not audited for the same "does the underlying data actually use this label" problem — only the `Mechanical Engineering` gap (found via an earlier, unrelated 1135/1138 conversation) was investigated and fixed. Worth a similar sweep in a future session if Byron wants full taxonomy confidence.

### 4. Featured Positions curated (`data/featuredPositionIds.js`)

Went through several rounds of edits tonight, ending at:

```js
export const featuredPositionIds = ["1074", "1075", "1095", "1162", "1181"];
```

- 1010 (Senior Electrical Commissioning Engineer) → removed, replaced by 1074 (Director of Operations – Commissioning Group). Commit `8ea3004`.
- 1040 (Associate Mechanical Engineer – Data Centers HVAC) → removed, replaced by 1162 (Senior Highway/Civil Engineer). Commit `f2a5545`.
- 1129 (Senior Electrical Engineer – Water/Wastewater) → removed, replaced by 1095 (Senior Mechanical Designer, Hollywood FL — added specifically for Florida geographic representation in the featured set). Commit `2da964f`.
- 1075 and 1181 unchanged throughout.
- This file is the single source for both the `/careers` page's own "Featured Positions" panel (`components/FeaturedPositionsButton.js`) and the homepage's "Featured Positions" accordion tab (`components/home/HomeResourcesAccordion.js`, via its `/api/jobs-summary` endpoint) — confirmed both stay in sync automatically, no separate edit needed.
- **Not updated:** `HomeResourcesAccordion.js`'s hardcoded `FALLBACK_FEATURED_JOBS` constant (used only if the live `/api/jobs-summary` fetch fails) still reflects the *original* featured set (1010, 1040, 1075, 1129, 1181), not tonight's changes. Low-risk since it's a fallback-only path, but worth updating in a future session for full consistency.

### 5. Position 1074 detail edits

- Salary: `$170,000+` → `$175,000 – $210,000` (`salaryMin`/`salaryMax` updated to 175000/210000 to match). Commit `c1ff3e4`.
- Market: `"Healthcare"` → `"Healthcare | Higher Education | Commercial"`. Byron initially said "Universities"; substituted `Higher Education` since that's the term used consistently everywhere else on the site (no other posting uses "Universities") — confirmed with Byron before applying. Commit `3393f52`.

### 6. Homepage/Careers hero "life." styling — explored, then reverted to original

`components/JobBoard.module.css`, `.lifeWord` rule (styles the word "life." in "Find work that fits your life."):

1. Started at `color:#1684a6; font-style:italic;` (original, pre-session).
2. Bold added (`font-weight:700`) per Byron's request. Commit `b1bb090`.
3. Byron felt bold+italic looked "cartoonish" on both mobile and desktop; tried semibold (`font-weight:600`) instead. Commit `fe4cb64`.
4. Still felt overemphasized at semibold. Reverted to the original italic-only styling, no added weight. Commit `513451e` — **this is the current, final, GREEN state.**

Net effect versus the start of the session: **no visible change** — `.lifeWord` is back to exactly `color:#1684a6; font-style:italic;`. Documented here so a future session doesn't re-attempt the same bold/semibold exploration without knowing it was already tried and explicitly rejected by Byron.

## SEO / Indexing Audit (informational, no code changes)

Run mid-session as a "candidate test drive" at Byron's request. Findings, all confirmed live:

- **Structured data:** every position page carries full `schema.org/JobPosting` JSON-LD (title, description, `identifier`, `datePosted`, `validThrough`, `employmentType`, `hiringOrganization`, `jobLocation`, `baseSalary`) — this is what powers Google's "Jobs" rich-result treatment, already working correctly for position 1187.
- **`datePosted` freshness quirk (pre-existing, not introduced tonight):** every position's `datePosted` reads the same site-wide "last reviewed" date (currently August 10, 2026) rather than that specific position's actual creation date — so newly added positions like 1187 show as if posted weeks before they existed. Not fixed tonight; worth a look in a future data-hygiene pass since Google weighs this as a freshness signal.
- **`robots.txt`** (`careers.agileconsultingsolutions.com/robots.txt`): `User-Agent: * / Allow: /`, no disallow rules at all — open to Google, Bing, and AI crawlers (GPTBot, ClaudeBot, PerplexityBot, etc.) alike. Sitemap directive points to `https://www.agileconsultingsolutions.com/sitemap.xml`.
- **Sitemap:** confirmed to include position 1187 within moments of that position's data landing on `main` (186 URLs total at the time of the check) — the sitemap is generated dynamically at build/deploy time, not manually maintained.
- **IndexNow (Bing/Yahoo):** the repo's `.github/workflows/indexnow.yml` fired automatically on every one of tonight's commits that touched job data. Spot-checked run #16 (commit `6dc5a81`): `"Submitting 185 URLs to IndexNow (181 live, 4 retired)... IndexNow accepted the submission (HTTP 200)."` Confirms this pipeline is fully automated and working, no manual action needed for Bing/Yahoo.
- **Google specifically:** the domain overall is well-indexed with deep content already showing in search results (individual position salary/specialty text appearing in snippets, not just the homepage). Brand-new positions like 1187 will not show up in Google immediately — IndexNow does not reach Google directly, and per `PROJECT_CHECKPOINT.md`/prior-session notes, Google re-indexing is still a manual "Request Indexing" batch Byron runs periodically in Search Console (GCP/2FA automation for this was deliberately deferred in an earlier session). **Actionable follow-up:** include position 1187 (and any other very recent additions) in the next manual Request Indexing batch.
- **AI answer engines** (ChatGPT, Perplexity, Claude, etc.): infrastructure is fully crawlable (open `robots.txt`, clean structured data, no JS-only rendering blockers observed) — nothing on the technical side is stopping these engines from indexing the site, but their own current index contents were not independently checked from this session.

## Live Verification Performed This Session

All of the following were checked directly against `careers.agileconsultingsolutions.com` in a live browser session, not just inferred from committed diffs:

- Discipline filter dropdown: `MEP Project Manager` present, no `Mechanical Engineering` option ever existed to remove.
- Filtering by `Mechanical HVAC`, `Mechanical Plumbing and Fire Protection`, and `MEP Project Manager` each returns the expected position count and position list.
- Position 1135 and 1138 both confirmed to surface under two different discipline filters simultaneously via direct search-box + filter combination testing.
- Position 1187 detail page renders correctly end-to-end: title, salary, location, discipline badge, specialty, market, credential, bonus, and the browser tab's SEO title (`Senior Mechanical Engineer | AGILE Position 1187`).
- Featured Positions panel (careers page, expanded) shows the exact 5 IDs from `featuredPositionIds.js`, in order, after each of the three rounds of edits — re-verified after every single swap, including a mid-session catch where a stale browser cache showed the *previous* Vercel deployment's content until a hard reload + explicit Vercel deployment-state check (`READY`) confirmed the real live state.
- Position 1074 detail page: salary and market both show the updated values together (no regression from the earlier salary edit when the market edit was applied afterward — this was specifically checked because of a raw.githubusercontent.com CDN-cache issue described below).
- `.lifeWord` styling checked visually at each of the three states (italic-only → bold → semibold → italic-only) via live screenshots, per Byron's own visual feedback rather than assumed from the CSS alone.

## Operational Notes From This Session (for future Claude sessions)

- **`raw.githubusercontent.com` lags behind real commits by anywhere from several seconds to a few minutes.** Every fetch against that CDN domain in this session eventually returned stale (pre-commit) content at least once, including one case where it would have caused a real regression (reverting an already-committed salary change) had the stale content been committed back without checking. **Fix used:** for any read where correctness matters (i.e., before building a new commit on top of existing content), read via `https://api.github.com/repos/.../contents/<path>?ref=main` instead — confirmed not to exhibit this lag anywhere in the session — and decode the response as UTF-8 (`atob` + `TextDecoder`, not raw `atob` alone, which mangles curly quotes/en-dashes into mojibake).
- **GitHub's lightweight web editor's "Commit changes" button is intermittently unresponsive** — roughly 1 in 3 clicks in this session did nothing (dialog never opened), with no visible error. Recovery pattern used throughout: click again (usually resolves it within 1–2 more attempts); if the page navigated away from the edit view without a dialog ever appearing, the edit is safely preserved as a browser-local draft and reappears with an "unsaved changes" banner on returning to the same edit URL — but **dismissing that banner with its "X" discards the draft**, only "Restore" keeps it. This cost one redo in this session.
- **The GitHub blob page immediately after a redirect from a commit sometimes briefly shows stale commit metadata/content** (old commit hash, old file content) before a client-side re-render catches up — a hard `location.reload(true)` or simply re-querying `document.body.innerText` a second time after a short pause resolved this every time it came up. Don't treat the first read after a commit-redirect as final if it looks wrong.
- **Vercel auto-deploys on every push to `main`** (no manual deploy step) via the existing GitHub integration, typically `READY` within 10–20 seconds of the commit landing — confirmed via `Vercel:list_deployments` throughout the session rather than guessed from wait times.
- GitHub's own code search (`github.com/search?type=code`) does not reliably index this repo's `data/` or `.css` files — it returned 0 results for known-present strings (`Universities`, `lifeWord`) multiple times tonight. Don't trust a 0-result code search as proof something doesn't exist in this repo; grep the actual file content instead.

## Protected Recovery Rule

Commit `513451e` on `main` is the recovery target for this baseline — confirmed "2/2" GREEN on GitHub Project Check + Vercel deployment status, and confirmed live on `careers.agileconsultingsolutions.com`. This supersedes the August 23 baseline (`a7df363`) in `PROJECT_CHECKPOINT.md`'s "GREEN BASELINE" section. All August 23 protected behaviors remain intact and unmodified by tonight's work — nothing in this session touched the position modal, sharing, Similar Positions, or Shortlist functionality documented in that baseline.
