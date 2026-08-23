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

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function positionShareText(job) {
  const title = job?.title ?? "AGILE Career Opportunity";
  const location = job?.location ?? "";
  const workplace = formatWorkplaceDisplay(job?.workplace) ?? "";
  const salary = formatSalaryDisplay(job?.salaryDisplay) ?? "";
  const id = job?.id ?? "";
  const detailLine = [location, workplace].filter(Boolean).join(" · ");

  return [
    title,
    detailLine,
    salary,
    id ? `Position ID ${id}` : "",
    `View Position: ${positionUrl(job)}`,
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
  // Real-world testing in Outlook Web surfaced a second, sneakier loss:
  // `color` set only on a block-level <div> gets dropped by Outlook's
  // paste-cleanup, while the SAME color set on an inline <span>/<font>
  // *inside* that div survives. Every colored line below therefore carries
  // its color redundantly — once on the wrapping <div> for clients that
  // honor it, and again on an inner <span style> and legacy <font color>
  // for clients that only keep inline/character-level formatting. Without
  // that redundancy, a client that strips the div-level color renders
  // everything in plain black text — which is exactly what was happening
  // (the title, salary, and eyebrow all came through solid black instead
  // of navy/green/blue, reading as one dense, heavy block).
  //
  // Boldness is also deliberately rationed to two lines (title, link) —
  // when every line is font-weight:800 with no color to break it up (the
  // worst case above), the whole block reads as a wall of bold black text.
  // Compact ~9-10pt scale throughout (Outlook's rendering engine is Word,
  // which reads pt sizing more predictably than px), matching the small,
  // uniform size originally requested.
  const colored = (text, { size, weight = 400, color, letterSpacing, margin = "0 0 2px" }) =>
    `<div style="font-family:Arial,Helvetica,sans-serif;font-size:${size};font-weight:${weight};color:${color};${letterSpacing ? `letter-spacing:${letterSpacing};` : ""}line-height:1.3;margin:${margin}"><span style="color:${color}"><font color="${color}">${text}</font></span></div>`;

  const eyebrow = colored("AGILE CAREER OPPORTUNITY", { size: "7.5pt", weight: 600, color: "#1476a8", letterSpacing: ".5px", margin: "0 0 3px" });
  const titleLine = colored(title, { size: "10.5pt", weight: 700, color: "#173958" });
  const detail = detailLine ? colored(detailLine, { size: "9pt", weight: 400, color: "#5a7185" }) : "";
  const salaryLine = salary ? colored(salary, { size: "9.5pt", weight: 700, color: "#0a8a4a" }) : "";
  const idLine = id ? colored(`Position ID ${escapeHtml(id)}`, { size: "8pt", weight: 400, color: "#8a97a8", margin: "0 0 4px" }) : "";
  const link = `<div><a href="${url}" style="font-family:Arial,Helvetica,sans-serif;font-size:9.5pt;font-weight:600;color:#1476a8;text-decoration:underline"><span style="color:#1476a8"><font color="#1476a8">View Position</font></span></a></div>`;

  return `<div style="font-family:Arial,Helvetica,sans-serif">${eyebrow}${titleLine}${detail}${salaryLine}${idLine}${link}</div>`;
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
