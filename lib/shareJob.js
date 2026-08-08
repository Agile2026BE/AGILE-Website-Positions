export async function shareJob(job) {
  const slug = job?.slug ?? "";
  const title = job?.title ?? "AGILE Career Opportunity";
  const url = slug
    ? `${window.location.origin}/positions/${slug}`
    : `${window.location.origin}/#positions`;
  const shareText = `${title}\n${url}`;

  if (navigator.share) {
    await navigator.share({ title, text: title, url });
    return { method: "share", url };
  }

  await navigator.clipboard.writeText(shareText);
  return { method: "clipboard", url };
}
