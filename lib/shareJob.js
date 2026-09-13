import { formatSalaryDisplay, formatWorkplaceDisplay, formatExperienceDisplay } from "./jobFilters";

const FALLBACK_CAREERS_ORIGIN = "https://www.agileconsultingsolutions.com";

// Share/copy links must always point back at the live site the visitor is
// actually on (this preview deployment, or production once launched) — never
// a hardcoded domain, which would silently link out to a stale, unrelated
// deployment with old branding and its own separate "Home" page.
function careersOrigin() {
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin;
  }
  return FALLBACK_CAREERS_ORIGIN;
}

export function positionUrl(job) {
  const id = job?.id ?? "";
  const origin = careersOrigin();
  return id
    ? `${origin}/p/${id}`
    : `${origin}/#positions`;
}

// Shortened, still-universally-linkable form of the share URL for plain-text
// contexts (SMS, LinkedIn messaging, Juicebox). Drops "www." since both
// agileconsultingsolutions.com and www.agileconsultingsolutions.com resolve
// to the live site — but keeps "https://", because several messaging/email
// clients only auto-detect (and make tappable) a URL that starts with a
// recognized scheme. A bare domain with neither "https://" nor "www." is
// not reliably auto-linkified everywhere, which would silently turn the
// link into dead, unclickable text for some recipients.
function shortShareUrl(job) {
  return positionUrl(job).replace("https://www.", "https://");
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function shortSimilarUrl(job) {
  const id = job?.id ?? "";
  const origin = careersOrigin();
  return (id ? `${origin}/s/${id}` : `${origin}/#positions`).replace("https://www.", "https://");
}

export function positionShareText(job) {
  // Plain text (SMS, LinkedIn messaging) has no bold, italics, or font
  // styling of any kind. Two earlier emphasis treatments were tried for
  // the title — ALL CAPS (too shouty) and Unicode Mathematical Sans-Serif
  // Bold characters (2026-09-12: on-device testing found these render in
  // a visibly different, larger-looking fallback font/weight on iOS,
  // which read as odd and out of place rather than "bold"). Both were
  // dropped in favor of the title as plain, ordinary text — it reads
  // naturally alongside the rest of the message instead of standing out.
  const title = job?.title ?? "AGILE Career Opportunity";
  const location = job?.location ?? "";
  const workplace = formatWorkplaceDisplay(job?.workplace) ?? "";
  const salary = formatSalaryDisplay(job?.salaryDisplay) ?? "";
  const id = job?.id ?? "";
  const detailLine = [location, workplace].filter(Boolean).join(" · ");
  const url = shortShareUrl(job);

  // "View Position:"/"Similar Positions:" sit on their own line, with the
  // link starting fresh on the next line — so on a narrow phone screen the
  // label and the link wrap independently instead of breaking mid-link.
  return [
    title,
    detailLine,
    salary,
    id ? `Position ID ${id}` : "",
    `View Position:\n${url}`,
    `Similar Positions:\n${shortSimilarUrl(job)}`,
  ].filter(Boolean).join("\n");
}

// 2026-09-13: "Confident hierarchy" pass on the HTML card (Byron reviewed
// two full mockups — "refined current" vs. this one — and picked this one
// outright). The goal was a genuine hierarchy instead of every line reading
// at similar weight: salary is now the single largest, boldest element on
// the card (the number a passive candidate's eye should land on first,
// ahead of even the title), "View Position" stays the loudest link with a
// directional arrow, and "Similar Positions" is deliberately quieter
// (smaller, lighter blue, lowercase) so it reads as the secondary option
// instead of competing with "View Position". Position ID drops to the
// quietest treatment on the card (11px, lightest gray) since it's a
// reference number for Byron, not something a candidate needs to notice.
// The two slightly-different blues previously in use (#0874ae, #1476a8)
// are unified into one consistent brand blue (#0c6ca3) across eyebrow and
// both links. The detail line now also includes years of experience
// (location · workplace · experience) so the card carries the three facts
// — where, how, and what level — a candidate needs before clicking through.
export function positionShareHtml(job) {
  const title = escapeHtml(job?.title ?? "AGILE Career Opportunity");
  const location = job?.location ?? "";
  const workplace = formatWorkplaceDisplay(job?.workplace) ?? "";
  const experience = formatExperienceDisplay(job?.experience) ?? "";
  const salary = escapeHtml(formatSalaryDisplay(job?.salaryDisplay) ?? "");
  const id = job?.id ?? "";
  const detailLine = escapeHtml([location, workplace, experience].filter(Boolean).join(" · "));
  const url = shortShareUrl(job);

  // Email/messaging apps (Apple Mail, Outlook, Gmail, LinkedIn messaging)
  // each run pasted HTML through their own sanitizer before it lands in the
  // compose box. Layout-style properties — background-color, border-radius,
  // padding, display:inline-block — are the ones most commonly stripped in
  // that process (this is what was silently flattening the old salary
  // "badge" into plain text).
  //
  // Real-world testing in Outlook Web confirmed the paste-cleanup keeps
  // ONLY what's written directly on the innermost text-carrying elements
  // (<span style>, <font style/color>) and discards anything set only on
  // the wrapping <div> — including font-size and font-weight, not just
  // color. Every visual property below is therefore written THREE times:
  // once on the outer <div> (for clients that honor it), and again on an
  // inner <span style> and a legacy <font style/color> (for clients, like
  // Outlook Web, that strip the div and keep only inline/character-level
  // formatting).
  const colored = (text, { size, weight = 400, color, letterSpacing, margin = "0 0 4px" }) => {
    // Isolate each CSS property into its own single-purpose style layer.
    // 2026-09-11 real-world Outlook Web testing (two rounds) found: bundling
    // color together with font-size/font-weight in one style attribute —
    // even redundantly on span+font, even with !important — makes Outlook's
    // paste sanitizer drop color while still keeping size/weight. Fix: a
    // dedicated span carries ONLY font-size/font-weight, wrapping a second
    // dedicated span + legacy <font color> that carries ONLY color.
    const sizeWeightStyle = `font-size:${size};font-weight:${weight};`;
    return `<div style="font-family:Arial,Helvetica,sans-serif;font-size:${size};font-weight:${weight};color:${color};${letterSpacing ? `letter-spacing:${letterSpacing};` : ""}line-height:1.45;margin:${margin}"><span style="${sizeWeightStyle}"><span style="color:${color}"><font color="${color}">${text}</font></span></span></div>`;
  };

  const eyebrow = colored("AGILE CAREER OPPORTUNITY", { size: "10px", weight: 700, color: "#0c6ca3", letterSpacing: ".5px", margin: "0 0 5px" });
  const titleLine = colored(title, { size: "14px", weight: 700, color: "#173958", margin: "0 0 5px" });
  const detail = detailLine ? colored(detailLine, { size: "12px", weight: 400, color: "#5a7185", margin: "0 0 5px" }) : "";
  const salaryLine = salary ? colored(salary, { size: "14px", weight: 700, color: "#0a8a4a", margin: "0 0 5px" }) : "";
  const idLine = id ? colored(`Position ID ${escapeHtml(id)}`, { size: "11px", weight: 400, color: "#8a94a0", margin: "0 0 12px" }) : "";

  const linkSizeWeight = "font-size:14px;font-weight:700;";
  const linkColor = "#0c6ca3";
  const link = `<div style="margin:0 0 4px"><a href="${url}" style="font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:${linkColor};text-decoration:underline"><span style="${linkSizeWeight}"><span style="color:${linkColor}"><font color="${linkColor}">View Position &rarr;</font></span></span></a></div>`;

  const similarSizeWeight = "font-size:12px;font-weight:400;";
  const similarColor = "#5a8caa";
  const similarLink = `<div style="margin:0"><a href="${shortSimilarUrl(job)}" style="font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:400;color:${similarColor};text-decoration:underline"><span style="${similarSizeWeight}"><span style="color:${similarColor}"><font color="${similarColor}">See similar positions</font></span></span></a></div>`;

  return `<div style="font-family:Arial,Helvetica,sans-serif">${eyebrow}${titleLine}${detail}${salaryLine}${idLine}${link}${similarLink}</div>`;
}

// Copies both the rich HTML card and a short plain-text fallback in one
// action — this is the button people reach for by habit and paste
// wherever they're sending it (email or text), so both representations
// need to be correct on their own. Both now use the same short, no-www
// URL (see shortShareUrl), so however a destination app chooses to
// interpret the clipboard — rendering the styled HTML card, or extracting
// a link out of it into plain text (as Mac Messages does) — the URL that
// shows up is always the short one, never the longer www. form.
export async function copyRichPosition(job) {
  const html = positionShareHtml(job);
  const text = positionShareText(job);
  try {
    if (navigator.clipboard?.write && typeof ClipboardItem !== "undefined") {
      await navigator.clipboard.write([new ClipboardItem({
        "text/html": new Blob([html], { type: "text/html" }),
        "text/plain": new Blob([text], { type: "text/plain" }),
      })]);
      return { method: "rich-clipboard", url: positionUrl(job), text };
    }
  } catch {
    // fall through to plain-text fallback below
  }
  await navigator.clipboard.writeText(text);
  return { method: "clipboard", url: positionUrl(job), text };
}

export async function shareJob(job) {
  return copyRichPosition(job);
}

// Copies ONLY the rich HTML card — for Gmail, Yahoo, and Outlook. Writing
// solely text/html (no sibling text/plain on the same clipboard item)
// guarantees the destination app has nothing else to insert or duplicate;
// real-world testing found Outlook Web will insert BOTH representations
// when a single copy offers both at once.
export async function copyPositionsForEmail(jobs = []) {
  const html = jobs.map(positionShareHtml).join("<br><br>");
  const text = jobs.map(positionShareText).join("\n\n");
  try {
    if (navigator.clipboard?.write && typeof ClipboardItem !== "undefined") {
      await navigator.clipboard.write([new ClipboardItem({
        "text/html": new Blob([html], { type: "text/html" }),
      })]);
      return { method: "email-html" };
    }
  } catch {
    // fall through to plain-text fallback below
  }
  await navigator.clipboard.writeText(text);
  return { method: "email-fallback-text" };
}

// Copies ONLY the short plain-text summary — for texting, LinkedIn
// messaging, and Juicebox, none of which render HTML.
export async function copyPositionsForText(jobs = []) {
  const text = jobs.map(positionShareText).join("\n\n");
  await navigator.clipboard.writeText(text);
  return { method: "text" };
}

// Single-job convenience wrapper around copyPositionsForText, for the
// per-card "Copy for Text" button. 2026-09-12: real-world testing found
// that pasting the rich HTML card (from "Copy Link") into Mac Messages
// gets auto-converted into a long "Label (full-url-with-www)" form that
// wraps badly on a phone screen — HTML on the clipboard is never safe for
// texting, no matter how it's structured. This gives texting its own
// always-plain, always-short one-click action right on the card, instead
// of only living inside the "Share Position" multi-select dialog.
export async function copyPositionForText(job) {
  return copyPositionsForText([job]);
}
