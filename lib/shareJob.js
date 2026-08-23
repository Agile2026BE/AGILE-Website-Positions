import { formatSalaryDisplay, formatWorkplaceDisplay } from "./jobFilters";

const FALLBACK_CAREERS_ORIGIN = "https://careers.agileconsultingsolutions.com";

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
  // "badge" into plain text). font-family, font-size, font-weight, color,
  // text-decoration, and margin on block-level elements survive far more
  // reliably across clients, so the hierarchy here is built entirely from
  // those instead of relying on a pill/badge treatment.
  const eyebrow = `<div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:800;letter-spacing:1.5px;color:#1476a8;margin:0 0 6px">AGILE CAREER OPPORTUNITY</div>`;
  const titleLine = `<div style="font-family:Georgia,'Times New Roman',serif;font-size:21px;font-weight:700;color:#173958;line-height:1.25;margin:0 0 6px">${title}</div>`;
  const detail = detailLine ? `<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#46607a;margin:0 0 5px">${detailLine}</div>` : "";
  const salaryLine = salary ? `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:800;color:#0a8a4a;margin:0 0 8px">${salary}</div>` : "";
  const idLine = id ? `<div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#7c8ba0;margin:0 0 10px">Position ID ${escapeHtml(id)}</div>` : "";
  const link = `<div><a href="${url}" style="font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#1476a8;text-decoration:underline">View Full Position Details &#8594;</a></div>`;

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
