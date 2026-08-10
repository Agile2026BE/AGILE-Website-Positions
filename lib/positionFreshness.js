export const POSITION_REVIEW_LABEL = "Reviewed August 10, 2026";

const freshnessLines = [
  "There is still time to make a strong career move this year.",
  "If the timing feels right, this can still be a meaningful next step before year-end.",
  "There is plenty of runway left this year to explore a better-fit opportunity.",
  "A thoughtful move now can put you in a stronger position heading into next year.",
  "If a career change has been on your mind, there is still time to act on it this year.",
  "This is a good point in the year to explore what your next step could look like.",
  "You still have time this year to make a move that better matches your goals.",
  "There is time left this year to turn the right conversation into a strong next step.",
  "Before the year closes, there is still room to make a strategic career move.",
  "Now is a practical time to explore a change without waiting for a new year.",
  "If you have been waiting for the right opening, this is still a good time to explore.",
  "A strong next move does not have to wait until next year.",
  "Use the rest of this year to explore whether this opportunity fits your goals.",
  "There is still time this year to improve the fit between your work and your priorities.",
  "The right career conversation now can still change the direction of your year.",
  "If you are ready for a stronger fit, there is time to make that move this year.",
  "This is still a useful time of year to compare opportunities and make a thoughtful move.",
  "You do not need to wait for January to explore a better next step.",
  "There is meaningful time left this year to evaluate a move on your terms.",
  "A well-timed conversation now can create a stronger path for the rest of the year.",
  "If your current role no longer fits, there is still time this year to explore what does.",
  "The rest of this year can still be enough time to make a smart professional change.",
  "A better-aligned opportunity is worth exploring now rather than putting off until next year.",
  "There is still time to finish the year moving toward work that fits you better."
];

export function cleanPositionCopy(value) {
  return String(value ?? "")
    .replace(/\bthroughout\s+2026\b/gi, "this year")
    .replace(/\bfor\s+2026\b/gi, "this year")
    .replace(/\bin\s+2026\b/gi, "this year")
    .replace(/\b2026\b/g, "this year")
    .replace(/\bthis year\s+this year\b/gi, "this year")
    .trim();
}

export function freshWhyConsider(job) {
  const cleaned = cleanPositionCopy(job?.whyConsider);
  const rawLines = cleaned
    .split(/\r?\n/)
    .map((line) => line.replace(/^\s*[•*-]\s*/, "").trim())
    .filter(Boolean);

  const availableLines = rawLines.filter((line) => /^available now\.?$/i.test(line));
  const contentLines = rawLines.filter((line) => !/^available now\.?$/i.test(line));
  const numericId = Number.parseInt(String(job?.id ?? "0"), 10) || 0;
  const freshness = freshnessLines[numericId % freshnessLines.length];

  if (!contentLines.some((line) => line.toLowerCase() === freshness.toLowerCase())) {
    contentLines.push(freshness);
  }

  return [...contentLines, ...(availableLines.length ? ["Available now."] : ["Available now."])];
}
