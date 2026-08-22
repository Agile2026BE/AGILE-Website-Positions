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
  const workplace = job?.workplace ?? "";
  const salary = job?.salaryDisplay ?? "";
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
  const workplace = job?.workplace ?? "";
  const salary = escapeHtml(job?.salaryDisplay ?? "");
  const id = job?.id ?? "";
  const detailLine = escapeHtml([location, workplace].filter(Boolean).join(" · "));
  const url = positionUrl(job);

  return `<div><strong>${title}</strong>${detailLine?`<br>${detailLine}`:""}${salary?`<br><span style="display:inline-block;padding:1px 7px;border-radius:4px;background:#e6f6ec;color:#00c853;font-weight:800">${salary}</span>`:""}${id?`<br>Position ID ${escapeHtml(id)}`:""}<br><a href="${url}">View Position</a></div>`;
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
