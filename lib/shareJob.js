export async function shareJob(job) {
  const slug = job?.slug ?? "";
  const title = job?.title ?? "AGILE Career Opportunity";
  const url = slug
    ? `${window.location.origin}/positions/${slug}`
    : `${window.location.origin}/#positions`;

  if (navigator.share) {
    await navigator.share({
      title,
      text: `View this AGILE career opportunity: ${title}`,
      url,
    });
    return { method: "share" };
  }

  await navigator.clipboard.writeText(url);
  return { method: "clipboard", url };
}
