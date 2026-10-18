export const POSITION_REVIEW_LABEL = "Reviewed October 17, 2026";

export function cleanPositionCopy(value) {
  return String(value ?? "")
    .replace(/\bthroughout\s+2026\b/gi, "this year")
    .replace(/\bfor\s+2026\b/gi, "this year")
    .replace(/\bin\s+2026\b/gi, "this year")
    .replace(/\b2026\b/g, "this year")
    .replace(/\bthis year\s+this year\b/gi, "this year")
    .trim();
}

// Returns a posting's Why Consider bullets exactly as written in the data.
// (It used to append a rotating "time left this year" line and "Available
// now." to every posting; both were removed 2026-10-17 at Byron's request.)
export function freshWhyConsider(job) {
  return cleanPositionCopy(job?.whyConsider)
    .split(/\r?\n/)
    .map((line) => line.replace(/^\s*[•*-]\s*/, "").trim())
    .filter(Boolean);
}
