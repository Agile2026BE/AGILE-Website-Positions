# AGILE Careers Project Checkpoint

 Last updated: September 3, 2026 — GREEN baseline confirmed on both GitHub Project Check and Vercel Production deployment (positions 1191-1198 added and pushed live for the first time, position 1097 salary corrected, client-name leak on 1197/1198 caught and fixed)

 ## Purpose

 This is the operational handoff and recovery record for AGILE Careers development. Read this file before making future production changes.

 ## GREEN BASELINE

 Current verified GREEN recovery baseline code commit:

 `a912779122ab486da21a912f66d50630ba2cd70f`

 (Supersedes `37422e6`, the September 2 late-night position-1190 baseline.)

 Commit message:

 `Fix: anonymize client names on live positions 1197 and 1198`

 Detailed baseline record:

 `docs/CAREERS_GREEN_BASELINE_2026-09-03.md` for this session (positions 1191-1198 added and pushed live for the first time, position 1097 salary corrected, client-name leak on 1197/1198 caught and fixed); `docs/CAREERS_GREEN_BASELINE_2026-09-02_POSITION_1190.md` for the prior session (position 1190 added, position 1103 salary/openings corrected); `docs/CAREERS_GREEN_BASELINE_2026-09-02_POSITION_1189.md` for the earlier same-night session (new position 1189 added, MG Engineering/MGE naming corrected workbook-wide); `docs/CAREERS_GREEN_BASELINE_2026-09-02_POSITION_RETIREMENTS.md` for the earlier same-day session (position 1104 retired dormant, position 1012 relabeled, all 12 Arora Engineers positions taken dormant, Dormant-vs-Retired terminology rule); `docs/CAREERS_GREEN_BASELINE_2026-09-02.md` for the earlier Sept 2 session (position-modal MARKET field, position 1188 specialty trim, sitewide standalone-"Education"-to-"Higher Education" cleanup); `docs/CAREERS_GREEN_BASELINE_2026-09-01.md` for August/September 1 history; see the SEPTEMBER 2 REFINEMENTS section below for the openings-field work

 Verification for this exact code SHA:

 - All 10 market-data commits confirmed "Verified" on GitHub individually
 - - Job data validation / lint / production build: PASS (no schema/field changes in this cycle, only existing `market`/`specialty` string values)
   - - Live production fetch of position 1010 confirmed the corrected `MARKET: Mission Critical | Data Centers | Healthcare | Higher Education` matches the committed diff exactly
    
     - Production domain:
    
     - `https://www.agileconsultingsolutions.com`
    
     - (Changed from `https://careers.agileconsultingsolutions.com`, recorded in every baseline through August 11 — confirm intentionally whether that subdomain should still resolve, redirect, or be retired.)
    
     - Repository:
    
     - `Agile2026BE/AGILE-Website-Positions`
    
     - Branch:
    
     - `main`
    
     - Inquiry delivery:
    
     - Resend -> `careers@agileconsultingsolutions.com`
    
     - IMPORTANT: Documentation commits created to record this baseline come after the baseline code SHA. The recovery target for site behavior is the code commit above unless a later production code change is independently verified and documented.
    
     - Note: `a7df363` itself contains no visible/functional changes versus `64aab93` (the August 20–23 feature commit) — it's the second of two lint-only follow-up commits that got the repository's GitHub Actions "Project Check" back to green. See `docs/CAREERS_GREEN_BASELINE_2026-08-23.md` for the full chain and what each lint fix touched.
    
     - ## AUGUST 11 LOCKED REFINEMENTS
    
     - The August 11 GREEN baseline includes the approved desktop Contact landing, sitewide blue dropdown chevrons, blue Market Sectors chevron states, natural inquiry message wrapping, the three-position shortlist limit, inquiry success confirmation at the top of the modal, starburst celebration, a soft success chime, mobile-only stronger supporting-text contrast, and a mobile Market Sectors Done control.
    
     - The latest mobile-only refinements should receive a final phone smoke test, but GitHub Project Check and the exact Vercel Production deployment are GREEN.
    
     - ## AUGUST 23 REFINEMENTS (now part of the GREEN BASELINE above)
    
     - Position modal and job grid cards redesigned to match (salary promoted near Shortlist/top, compact Location/Workplace/Experience/Position ID layout, no separate Position ID badge). Shortlist star turns gold/bronze on selection. Salary normalizes to "Market Rate" in green when not a real number. Workplace display normalizes to Hybrid/On-Site/Remote everywhere. Position ID and several readability-pass font sizes increased (Explore Resources accordion, chess panel, Contact form, position card meta labels). Share/copy email formatting rebuilt compact and `pt`-sized for Outlook, with link text shortened to "View Position" and color made redundant (span + legacy `font` tag) after Outlook was found to strip block-level color. The standalone position detail page (`/careers/positions/[slug]`, what a shared `/p/[id]` link opens to) gained a working Shortlist button (sharing the same saved-positions storage as the grid) and a Similar Positions section, via new `lib/similarJobs.js` and `components/PositionPageShortlist.js`. That page also received a small mobile-only font-size increase; desktop/laptop are unchanged. Two follow-up commits then fixed six lint violations flagged by the repository's own GitHub Actions "Project Check" (no visible/functional change) to get this cycle's work fully GREEN — see `docs/CAREERS_GREEN_BASELINE_2026-08-23.md`.
    
     - ## SEPTEMBER 1 REFINEMENTS (now part of the GREEN BASELINE above)
    
     - Discipline taxonomy overhaul: found that 77 live positions (~40% of the site) used a `"discipline":"Mechanical Engineering"` value that had no matching option in the `disciplineOptions` dropdown and printed as a non-standard label on every job card. Added a new `MEP Project Manager` discipline option, tightened the `"mechanical hvac"` fuzzy-match alias in `lib/jobFilters.js` so it no longer over-matches on the bare word "mechanical," and retagged all 77 positions into `Mechanical HVAC` (58), `Mechanical Plumbing and Fire Protection` (14), or `MEP Project Manager` (5) based on their actual title/specialty content. Zero positions remain tagged `Mechanical Engineering` — verified live against the GitHub API. Two Commissioning-discipline retags (positions 1010, 1074) carried over from a prior session were also completed. New position 1187 (Senior Mechanical Engineer, Pine Brook NJ) added and tagged `Mechanical HVAC`. `Featured Positions` (`data/featuredPositionIds.js`) curated per Byron's direction: 1010 → 1074, 1040 → 1162, 1129 → 1095 (added for Florida geographic representation), settling at `["1074", "1075", "1095", "1162", "1181"]`. Position 1074 salary updated to $175,000–$210,000 and market expanded to `Healthcare | Higher Education | Commercial`. The homepage/careers hero `.lifeWord` ("life." in "Find work that fits your life.") was tried at bold, then semibold, then reverted to the original italic-only styling after Byron felt the added weight looked "cartoonish" — net no visible change from session start, documented so this isn't re-attempted blind in a future session. Same-day follow-up: Byron caught via a phone screenshot that Featured Positions salaries didn't align cleanly on mobile (location text length varies card to card, pushing salary to different horizontal positions). Fixed in two iterations — first stacked salary under location (commit `fda3d75`), then corrected per Byron's preference to keep salary right-aligned on the same row instead, matching the rest of the site's convention (commit `38e6e52`, the baseline as of September 1). Full detail, exact position-ID lists, SEO/indexing audit findings, and operational notes (GitHub API vs. raw.githubusercontent.com CDN lag, intermittent commit-dialog failures) are in `docs/CAREERS_GREEN_BASELINE_2026-09-01.md`.
    
     - ## SEPTEMBER 2 REFINEMENTS (now part of the GREEN BASELINE above)
    
     - New position 1188 (Senior Electrical Engineer, New York, NY) added and tagged `Electrical Engineering`. Market curated to `Corporate and Finance | Cultural | Healthcare | Higher Education | Hospitality | Laboratory & Research` per Byron's working rule: sectors named or clearly implied in the source job description take priority; when the JD is silent, company-background sectors are trimmed to what's plausible for the specific role rather than the client's full practice list. Specialty set to `Electrical Low and Medium Voltage` rather than the vaguer `Building Systems`, keeping the discipline/specialty fuzzy-match in `lib/jobFilters.js` accurate.
    
     - New sitewide feature: multiple-openings display. Added an optional `openings` field (number) to the job schema, shown as a conditional badge ("N Openings", rendered only when greater than 1) in `components/JobCard.js` (grid), `components/PositionModal.js` (modal info grid, next to Position ID), and the standalone detail page (`app/careers/positions/[slug]/page.js`). Deliberately excluded from the JobPosting JSON-LD structured data since there is no matching schema.org property, so there is no SEO impact. First deploy failed Project Check (run #617): `data/jobBoardConfig.js` exports a `jobFieldKeys` allowlist that `lib/validateJobs.js` checks every job record against, and `openings` was not registered there. Fixed by adding it to that list (commit `0097528`). Full commit chain: `ed6462b` -> `7206982` -> `a63b64f` -> `aa44971` -> `31f279c` -> `fc6fa07` -> `0097528`.
    
     - Live-verified in production after the fix: the standalone position page shows OPENINGS 3; the grid card shows a "3 Openings" badge; the position modal shows an OPENINGS cell next to Position ID; the Discipline filter (Electrical Engineering) and keyword search ("1188") both correctly isolate the position; Similar Positions is populated with relevant NYC electrical listings.
    
     - **Same-day follow-up cycle — position-modal MARKET field, 1188 specialty trim, and sitewide market-sector cleanup (new baseline `de0324e`, see `docs/CAREERS_GREEN_BASELINE_2026-09-02.md` for full detail):**
    
     - The position detail modal (`components/PositionModal.js`) had no dedicated MARKET row — only SPECIALTY — unlike the standalone detail page, which already showed the full market list. Added a MARKET row immediately after SPECIALTY, mirroring the standalone page, plus a matching `.market` CSS rule in `components/PositionModal.module.css` (teal/gray-green accent, distinct from `.specialty`'s blue). Commits `5ec1d7a`, `4d3997f`. Position 1188's `specialty` text was then trimmed from a version that restated all six market sectors down to just `Electrical Low and Medium Voltage`, now that MARKET has its own row everywhere. Commit `4e2b620`.
    
     - Byron then requested a sitewide cleanup: every position's `market` field containing a standalone `"Education"` value should be consolidated into `"Higher Education"` (no separate lower-education category exists on the site). Found 56 positions across 10 of the 16 `data/jobs/positions-*.js` files — 39 simple renames, 17 dedupes (positions that already had both `"Higher Education"` and a redundant standalone `"Education"`, where the standalone entry was removed instead of renamed to avoid a duplicate tag). Full per-file/per-commit position list is in `docs/CAREERS_GREEN_BASELINE_2026-09-02.md`. No filter-options file needed updating — the Market Sectors dropdown derives its option list live from actual job data (`lib/jobFilters.js`'s `buildFilterOptions()`), so `"Education"` stopped appearing as a selectable option automatically once no position used it anymore. Two mistakes were made and caught mid-session before any bad data was committed: a missed position (1078) found via a full file re-read before that file's commit, and a corrupted market string on position 1146 (a find/replace field wasn't fully cleared before typing new text) caught by re-reading the file immediately after the edit and fixed with a corrective replace before committing — full detail of both in the dated doc.
    
     - ## SEPTEMBER 2 EVENING — POSITION RETIREMENTS (now part of the GREEN BASELINE above)

 Position 1104 retired dormant (client JBB, matching the other 16 JBB positions taken dormant earlier the same day). Position 1012's existing dormant entry (retired Aug 27) relabeled from generic "client went unresponsive" wording to the standard Dormant phrasing. All 12 Arora Engineers positions (1012, 1019, 1020, 1021, 1022, 1023, 1050, 1051, 1052, 1076, 1077, 1111) taken dormant per Byron's direction — Arora not currently engaged. `retiredPositionIds` array grew from 21 to 32 entries across two commits (`02749c9`, `5405fe0`). Live position count: 154 (186 total records minus 32 held back: 1 Retired + 31 Dormant). Full detail in `docs/CAREERS_GREEN_BASELINE_2026-09-02_POSITION_RETIREMENTS.md`.

 Standing terminology rule confirmed by Byron this session: **Dormant** (off the live site, reactivatable if the client re-engages) and **Retired** (permanent, ID never used again) are not interchangeable. Only position 1100 is Retired; every other held-back position (all JBB and all Arora) is Dormant. No Position ID is ever recycled regardless of status. The `data/retiredPositionIds.js` filename is a pre-existing technical label for the takedown mechanism, not a business status.

 ## SEPTEMBER 2 NIGHT — NEW POSITION 1189 (now part of the GREEN BASELINE above)

Byron pasted a raw internal MGE (MG Engineering) HR job description for a Senior Electrical Designer and confirmed the new-position workflow: assign the next Position ID, anonymize the real client on the public site as "AGILE's Client," record the real client internally by Position ID in the Master Position List workbook, add the position to the live site data, get it live, and update this baseline. Byron supplied salary ($120,000–$150,000), experience (10+ years), workplace (Hybrid), and opening count (3) for fields the raw doc didn't specify.

Position 1189 (Senior Electrical Designer, NYC NY, Hybrid, $120,000–$150,000, 10+ years, 3 openings, PE preferred) added via `data/jobs/positions-1189-1189.js` and `data/jobDetails/details-1189-1189.js`, wired into `data/jobs.js`. Commit `07dc87d`. Live-verified: `/careers/positions/1189-senior-electrical-designer` loads correctly with all fields matching and the client name properly withheld; live count moved from 154 to 155.

Byron also corrected the client's internal-records name: it is "MG Engineering" or "MGE," not "MG Engineers." The Master Position List workbook was updated workbook-wide (v12) to rename Internal Client on positions 1006, 1007, 1008, 1103, 1113, 1152, and 1189 from "MG Engineers" to "MG Engineering (MGE)." This is a workbook-only change — it does not affect any live site data, since real client names never appear there. Full detail in `docs/CAREERS_GREEN_BASELINE_2026-09-02_POSITION_1189.md`.

 ## SEPTEMBER 2 LATE NIGHT — POSITION 1190 ADDED, POSITION 1103 CORRECTED (now part of the GREEN BASELINE above)

Byron pasted a raw internal MGE HR job description for a "Lead Plumbing & Fire Protection Designer" and asked to create it as position 1190. Before going live, Byron caught that this was a duplicate of existing position 1103 (identical title, same client). The drafted 1190 files were deleted before being wired into `data/jobs.js` — no live impact. Instead, 1103 was updated in place: salary lowered from $135,000–$170,000 to $120,000–$150,000, and `openings: 2` added (commit `17378ec`), matching Byron's direction that this round of MGE listings would carry that salary band, with 2 openings. The `metaDescription` in `data/jobDetails/details-1101-1112.js` was also corrected to match the new salary.

Byron then pasted a second raw MGE job description — this one genuinely distinct: "Plumbing & Fire Protection Engineer," explicitly requiring a licensed PE, with a higher salary band ($135,000–$170,000) reflecting the PE requirement, and 2 openings. Confirmed not a duplicate of 1103 (different title, PE required vs. preferred, different salary band) and added as **position 1190** via `data/jobs/positions-1190-1190.js` and `data/jobDetails/details-1190-1190.js`, wired into `data/jobs.js` (commit `37422e6`). Live-verified: `/careers/positions/1190-plumbing-fire-protection-engineer` loads correctly (title, location, workplace, salary, PE-required credential, 2 openings, client withheld); `/careers/positions/1103-lead-plumbing-fire-protection-designer` shows the corrected $120,000–$150,000 / 2 openings. Live count moved from 155 to 156.

Full detail in `docs/CAREERS_GREEN_BASELINE_2026-09-02_POSITION_1190.md`.

 ## LOCKED REBUILD DIRECTION
    
     - Careers establishes the design system for the broader AGILE website rebuild.
    
     - Responsive targets:
    
     - - Large desktop / 36–40 inch+ monitors
       - - Standard desktop and laptop
         - - Tablet
           - - iPhone / mobile devices
            
             - Visual direction:
            
             - - Mature professional AEC appearance
               - - Deep navy, slate / steel blue, warm white
                 - - Restrained light-blue and gold accents
                   - - Strong readable typography
                     - - Compact practical job-title typography
                       - - Natural page flow rather than isolated brochure pages
                         - - Motion only where it adds energy, trust, relevance, and professional appeal
                           - - No cartoonish or oversized layouts
                             - - No white-on-white card systems that lose visual hierarchy
                              
                               - Experience direction:
                              
                               - Attention -> Search -> Opportunity -> Proof -> AGILE Value -> Insights -> Conversation
                              
                               - Careers is the functional engine. The main AGILE website becomes the trust, positioning, relationship and conversion layer around it.
                              
                               - Do NOT rebuild the legacy GoDaddy site page-for-page. Preserve useful information and credibility, then reorganize it into a stronger connected experience.
                              
                               - ## KNOWN-GOOD / PROTECTED FEATURES
                              
                               - Do not remove these during future visual work:
                              
                               - - Search Careers
                                 - - State filter
                                   - - Discipline filter
                                     - - Minimum Salary filter
                                       - - Workplace filter
                                         - - Market filter
                                           - - Keyword search
                                             - - Dynamic results count
                                               - - View Positions action
                                                 - - Position result cards
                                                   - - View Position
                                                     - - Similar Positions (grid modal AND the standalone direct/shared position page — added August 23)
                                                       - - +Shortlist / Saved Positions (grid modal AND the standalone direct/shared position page — added August 23, same shared `agile-saved-positions` storage)
                                                         - - Maximum three shortlisted positions
                                                           - - Copy Link / Share
                                                             - - Compact, correctly colored Outlook/Gmail share formatting (August 23 — see baseline candidate note)
                                                               - - Direct Position ID URLs
                                                                 - - Position ID display
                                                                   - - Salary display
                                                                     - - Location display
                                                                       - - Workplace display
                                                                         - - Experience display
                                                                           - - Responsibilities / qualifications / Why Consider content
                                                                             - - Career inquiry form
                                                                               - - Optional resume upload
                                                                                 - - Inquiry email delivery
                                                                                   - - Market Insights opt-in
                                                                                     - - Client Hiring Support pathway
                                                                                       - - Responsive layouts
                                                                                         - - Reviews / testimonial relevance logic
                                                                                           - - AGILE Insights / legacy Why AGILE anchor compatibility
                                                                                            
                                                                                             - ## RECRUITER USE CASE
                                                                                            
                                                                                             - The Careers site is not only candidate-facing. It is an active recruiting tool.
                                                                                            
                                                                                             - Required recruiter workflow:
                                                                                            
                                                                                             - Search -> open opportunity -> Similar Positions -> shortlist up to three -> copy/share direct links -> paste into Outlook, text, notes, Juicebox, or LinkedIn outreach.
                                                                                            
                                                                                             - Any future feature that interferes with this workflow is a regression.
                                                                                            
                                                                                             - ## CANDIDATE CONVERSION DIRECTION
                                                                                            
                                                                                             - The site should reduce friction and encourage conversation rather than force a traditional application.
                                                                                            
                                                                                             - Key principles:
                                                                                            
                                                                                             - - Salary, location, workplace, experience and Position ID are visible.
                                                                                               - - Client identity remains confidential until appropriate discussion/representation.
                                                                                                 - - Candidates can inquire without creating an account.
                                                                                                   - - Resume is optional for an initial inquiry.
                                                                                                     - - Similar Positions expose additional relevant opportunities.
                                                                                                       - - Saved Positions encourage return visits.
                                                                                                         - - Reviews should feel relevant and fresh rather than static.
                                                                                                           - - Market Insights gives professionals a reason to return even when they are not ready to apply.
                                                                                                             - - AGILE should feel specialized, connected, current, professional and human.
                                                                                                              
                                                                                                               - ## TESTIMONIALS
                                                                                                              
                                                                                                               - Reviews are real AGILE placement testimonials retained from original emails/texts. Use approved initials and professional titles.
                                                                                                              
                                                                                                               - Desired engine:
                                                                                                              
                                                                                                               - - Two discipline/specialty-relevant verified testimonials when available.
                                                                                                                 - - One verified broader AGILE experience.
                                                                                                                   - - Rotate qualifying reviews after search/filter changes and across repeat browsing.
                                                                                                                     - - Use attribution/signature and tags for matching.
                                                                                                                       - - Never invent a quote or attribution to fill a category.
                                                                                                                        
                                                                                                                         - ## CURRENT PAGE ORDER
                                                                                                                        
                                                                                                                         - Navigation and physical page order should agree:
                                                                                                                        
                                                                                                                         - 1. Home / Careers Intro
                                                                                                                           2. 2. Positions / Search Careers
                                                                                                                              3. 3. AGILE Insights
                                                                                                                                 4. 4. Reviews
                                                                                                                                    5. 5. Market Insights
                                                                                                                                       6. 6. Contact / Start a Conversation
                                                                                                                                          7. 7. Footer / Client Hiring Support
                                                                                                                                            
                                                                                                                                             8. Legacy `#why-agile` links should continue to resolve to AGILE Insights.
                                                                                                                                            
                                                                                                                                             9. ## LANDING / RESPONSIVE RULE
                                                                                                                                            
                                                                                                                                             10. Anchor landing should be governed by one responsive sticky-header offset system rather than separate guessed values for every section.
                                                                                                                                            
                                                                                                                                             11. Every navigation action must land cleanly without:
                                                                                                                                            
                                                                                                                                             12. - exposing too much of the section above,
                                                                                                                                                 - - hiding the destination heading beneath the sticky header,
                                                                                                                                                   - - leaving large dead-space gaps,
                                                                                                                                                     - - or centering mobile copy merely because the screen is narrow.
                                                                                                                                                      
                                                                                                                                                       - Mobile content should default to clean left alignment unless a specific visual statement is intentionally centered.
                                                                                                                                                      
                                                                                                                                                       - ## MAIN WEBSITE REBUILD DIRECTION AFTER CAREERS
                                                                                                                                                      
                                                                                                                                                       - Planned modern structure:
                                                                                                                                                      
                                                                                                                                                       - - Home: current activity, positioning, proof, pathways and conversion
                                                                                                                                                         - - Careers: Search Careers and opportunity discovery
                                                                                                                                                           - - AGILE Insights: career guidance, market intelligence, compensation insights and professional guidance
                                                                                                                                                             - - Reviews: verified professional experiences
                                                                                                                                                               - - Employers / Client Hiring Support: recruiting services and relationship pathway
                                                                                                                                                                 - - Priority Opportunities: successor to Hot Jobs
                                                                                                                                                                   - - Salary tools: retain useful functionality but completely restyle
                                                                                                                                                                     - - Client proof / portfolio: modern metrics and relationship evidence rather than static logo walls
                                                                                                                                                                       - - Contact: professional institutional contact pathways plus quiet human credibility signals
                                                                                                                                                                         - - Footer resources: Privacy Policy, Candidate Security, Recruiting Scam Warning
                                                                                                                                                                          
                                                                                                                                                                           - Motion direction for the main site:
                                                                                                                                                                          
                                                                                                                                                                           - - Fast-loading, compressed HD loops
                                                                                                                                                                             - - NYC / major-market business movement
                                                                                                                                                                               - - Professionals in authentic business environments
                                                                                                                                                                                 - - Architecture and modern skyscrapers
                                                                                                                                                                                   - - Infrastructure / engineering context where appropriate
                                                                                                                                                                                     - - No motion merely for decoration
                                                                                                                                                                                       - - Mobile receives lighter media treatment when necessary for speed
                                                                                                                                                                                         - - Always respect reduced-motion preferences
                                                                                                                                                                                          
                                                                                                                                                                                           - ## HOSTING DECISION — IMPORTANT BEFORE GODADDY RENEWAL
                                                                                                                                                                                          
                                                                                                                                                                                           - Do not assume the rebuilt main site must remain inside GoDaddy Websites + Marketing.
                                                                                                                                                                                          
                                                                                                                                                                                           - The legacy GoDaddy builder permits custom HTML/CSS/JavaScript only inside custom HTML sections and does not provide the site-wide code control needed for the full AGILE rebuild direction.
                                                                                                                                                                                          
                                                                                                                                                                                           - Before renewing a website-builder or hosting product, confirm exactly which GoDaddy products are currently being billed and which services are actually required.
                                                                                                                                                                                          
                                                                                                                                                                                           - The domain registration may remain at GoDaddy while the rebuilt website itself can be hosted elsewhere. Domain registration and website hosting are separate decisions.
                                                                                                                                                                                          
                                                                                                                                                                                           - Do not cancel or allow a domain registration to lapse while migration is in progress.
                                                                                                                                                                                          
                                                                                                                                                                                           - ## LAUNCH / CHANGE GATE — CAREERS
                                                                                                                                                                                          
                                                                                                                                                                                           - The current baseline is frozen. For any later production code change to replace it:
                                                                                                                                                                                          
                                                                                                                                                                                           - 1. Preserve protected recruiter/candidate workflows.
                                                                                                                                                                                             2. 2. Run Project Check.
                                                                                                                                                                                                3. 3. Confirm job validation, lint, and production build pass.
                                                                                                                                                                                                   4. 4. Confirm Vercel production deployment succeeds.
                                                                                                                                                                                                      5. 5. Smoke-test the changed functional area in production.
                                                                                                                                                                                                         6. 6. Check responsive behavior affected by the change.
                                                                                                                                                                                                            7. 7. Record the replacement baseline SHA here only after verification.
                                                                                                                                                                                                              
                                                                                                                                                                                                               8. ## RECOVERY PROCEDURE
                                                                                                                                                                                                              
                                                                                                                                                                                                               9. If a production change breaks Careers:
                                                                                                                                                                                                              
                                                                                                                                                                                                               10. 1. Stop adding new changes.
                                                                                                                                                                                                                   2. 2. Return to `3daf725af3eedf389524ac30f8ec762be9453d23`.
                                                                                                                                                                                                                      3. 3. Compare the breaking commit against that baseline.
                                                                                                                                                                                                                         4. 4. Restore/revert only the breaking change when possible.
                                                                                                                                                                                                                            5. 5. Confirm Project Check.
                                                                                                                                                                                                                               6. 6. Confirm Vercel deployment.
                                                                                                                                                                                                                                  7. 7. Smoke-test the protected recruiter workflow.
                                                                                                                                                                                                                                     8. 8. Update this checkpoint only after the repaired code is verified.
                                                                                                                                                                                                                                       
                                                                                                                                                                                                                                        9. Never reconstruct the site from memory if a documented Git baseline exists.
                                                                                                                                                                                                                                       
                                                                                                                                                                                                                                        10. ## NON-BLOCKING MAINTENANCE
                                                                                                                                                                                                                                       
                                                                                                                                                                                                                                        11. GitHub Actions currently emits one infrastructure warning: Node.js 20-based `actions/checkout@v4` and `actions/setup-node@v4` are being forced to Node.js 24 by the runner. The Project Check still passes. Treat this as workflow maintenance, not a production Careers failure.
                                                                                                                                                                                                                                       
                                                                                                                                                                                                                                        12. ## IMMEDIATE NEXT WORK
                                                                                                                                                                                                                                       
                                                                                                                                                                                                                                        13. Careers has a documented GREEN recovery baseline. Complete the final mobile smoke test, then preserve this baseline unless a confirmed production defect requires a change.
                                                                                                                                                                                                                                       
                                                                                                                                                                                                                                        14. Next planned development phase after Careers is locked:
                                                                                                                                                                                                                                       
                                                                                                                                                                                                                                        15. Begin the main AGILE website rebuild using the established Careers design system and rebuild direction.
                                                                                                                                                                                                                                        16. 
