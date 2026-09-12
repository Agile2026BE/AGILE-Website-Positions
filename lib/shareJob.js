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
  // formatting).
  //
  // 2026-09-12: real-world testing across Gmail, Outlook Web/app, and Apple
  // Mail found the earlier compact pt-based sizing (7.5-9.5pt, 2-4px
  // margins) reads fine in Outlook/Word's rendering but comes across tiny
  // and cramped in Gmail and Apple Mail, which render sizes literally
  // instead of Word's more generous on-screen scaling. Sizes below are
  // bumped to a px scale that reads comfortably in a plain browser-rendered
  // client, with more line-height and margin between lines for breathing
  // room. "See Similar Positions" also moved from a subdued gray-blue to
  // the same blue as "View Position" (just lighter weight) — the darker
  // gray no longer read as a tappable link in Apple Mail's simplified
  // rendering.
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

  const eyebrow = colored("AGILE CAREER OPPORTUNITY", { size: "11px", weight: 700, color: "#1476a8", letterSpacing: ".4px", margin: "0 0 5px" });
  const titleLine = colored(title, { size: "16px", weight: 700, color: "#173958" });
  const detail = detailLine ? colored(detailLine, { size: "13px", weight: 400, color: "#5a7185" }) : "";
  const salaryLine = salary ? colored(salary, { size: "15px", weight: 700, color: "#0a8a4a" }) : "";
  const idLine = id ? colored(`Position ID ${escapeHtml(id)}`, { size: "12px", weight: 400, color: "#6b7684", margin: "0 0 8px" }) : "";

  const linkSizeWeight = "font-size:14px;font-weight:700;";
  const linkColor = "#1476a8";
  const link = `<div style="margin:0 0 3px"><a href="${url}" style="font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:${linkColor};text-decoration:underline"><span style="${linkSizeWeight}"><span style="color:${linkColor}"><font color="${linkColor}">View Position</font></span></span></a></div>`;

  const similarSizeWeight = "font-size:13px;font-weight:600;";
  const similarColor = "#1476a8";
  const similarLink = `<div style="margin:0"><a href="${url}#similar-positions" style="font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:600;color:${similarColor};text-decoration:underline"><span style="${similarSizeWeight}"><span style="color:${similarColor}"><font color="${similarColor}">See Similar Positions</font></span></span></a></div>`;

  return `<div style="font-family:Arial,Helvetica,sans-serif">${eyebrow}${titleLine}${detail}${salaryLine}${idLine}${link}${similarLink}</div>`;
}

// Copies the polished rich HTML card — this is the button people reach for
// by habit on each job card, so it needs to just work for the common case
// (pasting into an email) without making them think about format. Writes
// ONLY text/html (no sibling text/plain on the clipboard item), which is
// what keeps rich-text apps like Outlook Web from inserting a duplicate
// plain-text copy underneath the styled card. For texting, LinkedIn
// messaging, or Juicebox specifically, use "Share Position" →
// "Copy for Text / LinkedIn / Juicebox" instead, which copies the short
// plain-text version built for those contexts.
export async function copyRichPosition(job) {
  const html = positionShareHtml(job);
  const text = positionShareText(job);
  try {
    if (navigator.clipboard?.write && typeof ClipboardItem !== "undefined") {
      await navigator.clipboard.write([new ClipboardItem({
        "text/html": new Blob([html], { type: "text/html" }),
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
