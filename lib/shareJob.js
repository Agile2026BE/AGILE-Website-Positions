export function positionUrl(job) {
  const id = job?.id ?? "";
  return id
    ? `${window.location.origin}/p/${id}`
    : `${window.location.origin}/#positions`;
}

export function positionShareText(job) {
  const title = job?.title ?? "AGILE Career Opportunity";
  const location = job?.location ?? "";
  const workplace = job?.workplace ?? "";
  const salary = job?.salaryDisplay ?? "";
  const id = job?.id ?? "";
  const detailLine = [location, workplace].filter(Boolean).join(" · ");
  const compensationLine = [salary, id ? `ID ${id}` : ""].filter(Boolean).join(" · ");

  return [
    title,
    detailLine,
    compensationLine,
    `View Position: ${positionUrl(job)}`,
  ].filter(Boolean).join("\n");
}

export async function shareJob(job) {
  const url = positionUrl(job);
  const text = positionShareText(job);
  await navigator.clipboard.writeText(text);
  return { method: "clipboard", url, text };
}
