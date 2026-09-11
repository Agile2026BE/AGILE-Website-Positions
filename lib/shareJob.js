import { formatSalaryDisplay, formatWorkplaceDisplay } from "./jobFilters";

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

export function positionShareText(job) {
  // ALL CAPS on the title is the plain-text stand-in for bold/emphasis —
  // plain text (SMS, LinkedIn messaging) has no bold, italics, or font
  // styling of any kind, so this is the one emphasis trick that renders
  // identically everywhere without relying on client-specific formatting.
  const title = (job?.title ?? "AGILE Career Opportunity").toUpperCase();
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
    `Similar Positions:\n${url}#similar-positions`,
  ].filter(Boolean).join("\n");
}

export function positionShareHtml(job) {
  const title = escapeHtml(job?.title ?? "AGILE Career Opportunity");
  const location = job?.location ?? "";
  const workplace = formatWorkplaceDisplay(job?.workplace) ?? "";
  const salary = escapeHtml(formatSalaryDisplay(job?.salaryDisplay) ?? "");
  const id = job?.id ?? "";
  const detailLine = escapeHtml([location, workplace].filter(Boolean).join(" · "));
  const url = positionUrl(job);

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
  // formatting). 2026-09-11: confirmed via a real Outlook Web paste test
  // that color-only redundancy was insufficient — size and weight came
  // through at Outlook's oversized default despite correct colors — so
  // size/weight now carry the same three-way redundancy as color.
  //
  // Boldness is also deliberately rationed to two lines (title, link) —
  // when every line is heavily bolded with no color to break it up (the
  // worst case above), the whole block reads as a wall of bold black text.
  // Compact ~9-10pt scale throughout (Outlook's rendering engine is Word,
  // which reads pt sizing more predictably than px), matching the small,
  // uniform size originally requested. Title sits at 9pt (reduced from an
  // initial 10.5pt across two rounds of feedback) — deliberately kept at or
  // just above the supporting detail lines (location 9pt, salary 9.5pt)
  // rather than smaller, so it still reads as the card's headline instead
  // of blending into the supporting details.
  const colored = (text, { size, weight = 400, color, letterSpacing, margin = "0 0 2px" }) => {
    // Isolate each CSS property into its own single-purpose style layer.
    // 2026-09-11 real-world Outlook Web testing (two rounds) found: bundling
    // color together with font-size/font-weight in one style attribute —
    // even redundantly on span+font, even with !important — makes Outlook's
    // paste sanitizer drop color while still keeping size/weight. The
    // ORIGINAL Aug 23 version, which only ever wrote color as a lone,
    // single-property style value, preserved color correctly (confirmed
    // directly against that commit's source). Fix: a dedicated span carries
    // ONLY font-size/font-weight, wrapping a second dedicated span + legacy
    // <font color> that carries ONLY color — exactly the syntax already
    // proven to survive Outlook's paste-cleanup for color, kept completely
    // separate from the size/weight layer so neither's sanitizer handling
    // can interfere with the other.
    const sizeWeightStyle = `font-size:${size};font-weight:${weight};`;
    return `<div style="font-family:Arial,Helvetica,sans-serif;font-size:${size};font-weight:${weight};color:${color};${letterSpacing ? `letter-spacing:${letterSpacing};` : ""}line-height:1.3;margin:${margin}"><span style="${sizeWeightStyle}"><span style="color:${color}"><font color="${color}">${text}</font></span></span></div>`;
  };

  const eyebrow = colored("AGILE CAREER OPPORTUNITY", { size: "7.5pt", weight: 600, color: "#1476a8", letterSpacing: ".5px", margin: "0 0 3px" });
  const titleLine = colored(title, { size: "9pt", weight: 700, color: "#173958" });
  const detail = detailLine ? colored(detailLine, { size: "9pt", weight: 400, color: "#5a7185" }) : "";
  const salaryLine = salary ? colored(salary, { size: "9.5pt", weight: 700, color: "#0a8a4a" }) : "";
  const idLine = id ? colored(`Position ID ${escapeHtml(id)}`, { size: "8pt", weight: 400, color: "#8a97a8", margin: "0 0 4px" }) : "";

  const linkSizeWeight = "font-size:9.5pt;font-weight:600;";
  const linkColor = "#1476a8";
  const link = `<div><a href="${url}" style="font-family:Arial,Helvetica,sans-serif;font-size:9.5pt;font-weight:600;color:${linkColor};text-decoration:underline"><span style="${linkSizeWeight}"><span style="color:${linkColor}"><font color="${linkColor}">View Position</font></span></span></a></div>`;

  const similarSizeWeight = "font-size:8.5pt;font-weight:400;";
  const similarColor = "#5a7185";
  const similarLink = `<div style="margin:2px 0 0"><a href="${url}#similar-positions" style="font-family:Arial,Helvetica,sans-serif;font-size:8.5pt;font-weight:400;color:${similarColor};text-decoration:underline"><span style="${similarSizeWeight}"><span style="color:${similarColor}"><font color="${similarColor}">See Similar Positions</font></span></span></a></div>`;

  return `<div style="font-family:Arial,Helvetica,sans-serif">${eyebrow}${titleLine}${detail}${salaryLine}${idLine}${link}${similarLink}</div>`;
}

export async function copyRichPosition(job) {
  const text = positionShareText(job);
  const html = positionShareHtml(job);
  if (navigator.clipboard?.write && typeof ClipboardItem !== "undefined") {
    const item = new ClipboardItem({
      "text/plain": new Blob([text], { type: "text/plain" }),
      "text/html": new Blob([html], { type: "text/html" }),
    });
    await navigator.clipboard.write([item]);
    return { method: "rich-clipboard", url: positionUrl(job), text, html };
  }
  await navigator.clipboard.writeText(text);
  return { method: "clipboard", url: positionUrl(job), text };
}

export async function shareJob(job) {
  return copyRichPosition(job);
}
