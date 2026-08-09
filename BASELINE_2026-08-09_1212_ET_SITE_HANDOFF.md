# AGILE Website Handoff Baseline

Timestamp: August 9, 2026, 12:12 PM ET
Repository: Agile2026BE/AGILE-Website-Positions
Purpose: Freeze the current approved Careers site before beginning migration of the remaining www.agileconsultingsolutions.com pages to Vercel.

## Architecture decision

- Keep agileconsultingsolutions.com registered at GoDaddy for now.
- Preserve current email-related DNS records at GoDaddy.
- Move the public website experience to Vercel.
- Keep GitHub as the source-of-truth code repository and recovery point.
- Connect the finished Careers experience into the unified Vercel-hosted AGILE website.
- Do not transfer the domain registrar away from GoDaddy during this phase.

## Current Careers state

The Careers experience is the approved design/functionality baseline, subject only to launch-critical fixes. Cosmetic refinements can be resumed after the unified site is live.

Recent approved items include:
- Header navigation: AGILE Insights, Positions, Reviews, Contact, Top.
- Redundant Search Careers header button removed.
- Homepage hero: Know the details before applying.
- Hero trust checklist includes Salary disclosed, Location disclosed, Work schedule disclosed, Virtual Interviews, No Account Setup Required.
- Position filtering, shortlist up to 3, inquiry flows, phone formatting, success/confetti behavior.
- Universal share architecture for rich text and plain text.
- Position sharing format includes title, location/workplace, salary, Position ID, then View Position with tight spacing.
- Reviews headline: What AEC and MEP Professionals are saying...
- AGILE Insights HD-video section and supporting messaging.
- Market Insights heading: Stay current on your local market.
- Market Insights Name field added above Email.
- Footer descriptor moved beside the AGILE logo: Specialized Recruiting and Career Representation for Architects, Engineers, and Construction Professionals.
- Footer states and contact details retained.

## Migration goal

Recreate the remaining public pages currently living at www.agileconsultingsolutions.com inside the Vercel/GitHub architecture, preserve the approved AGILE visual language, connect Careers cleanly, test desktop/mobile/forms/navigation, then point the GoDaddy-managed domain DNS to Vercel while leaving email records intact.

## Launch protection

Before DNS cutover:
1. Complete all remaining pages in Vercel.
2. Confirm desktop and mobile layouts.
3. Verify every navigation link and form.
4. Verify Careers integration and direct position links.
5. Confirm Vercel production deployment is healthy.
6. Record current GoDaddy web DNS values before changing them.
7. Do not alter MX, SPF, DKIM, DMARC, Microsoft 365, or other mail-related records during website cutover.
8. Connect root domain and www to Vercel using the exact DNS records Vercel provides for the project.
9. Verify SSL and both www/non-www routing.
10. Preserve this GitHub baseline as rollback reference.
