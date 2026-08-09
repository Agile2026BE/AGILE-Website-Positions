const PUBLIC_CAREERS_ORIGIN = "https://careers.agileconsultingsolutions.com";

export function positionUrl(job) {
  const id = job?.id ?? "";
  return id
    ? `${PUBLIC_CAREERS_ORIGIN}/p/${id}`
    : `${PUBLIC_CAREERS_ORIGIN}/#positions`;
}

export function positionShareText(job) {
  const title = job?.title ?? "AGILE Career Opportunity";
  const location = job?.location ?? "";
  const workplace = job?.workplace ?? "";
  const salary = job?.salaryDisplay ?? "";
  const detailLine = [location, workplace].filter(Boolean).join(" · ");

  return [
    title,
    detailLine,
    salary,
    "",
    `View Position: ${positionUrl(job)}`,
  ].join("\n");
}

export function positionShareHtml(job) {
  const title = job?.title ?? "AGILE Career Opportunity";
  const location = job?.location ?? "";
  const workplace = job?.workplace ?? "";
  const salary = job?.salaryDisplay ?? "";
  const detailLine = [location, workplace].filter(Boolean).join(" · ");
  const url = positionUrl(job);
  return `<div><strong>${title}</strong>${detailLine?`<br>${detailLine}`:""}${salary?`<br>${salary}`:""}<br><br><a href="${url}">View Position</a></div>`;
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
