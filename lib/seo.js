export const SITE_URL = "https://www.agileconsultingsolutions.com";

// Parses labels like "Reviewed August 10, 2026" into an ISO date string.
// Falls back to today if the label can't be parsed for any reason.
export function getReviewedDateISO(label) {
  const match = String(label ?? "").match(/([A-Za-z]+ \d{1,2}, \d{4})/);
  const parsed = match ? new Date(match[1]) : null;

  if (parsed && !Number.isNaN(parsed.getTime())) {
    return parsed.toISOString().slice(0, 10);
  }

  return new Date().toISOString().slice(0, 10);
}

export function addDaysISO(isoDate, days) {
  const date = new Date(`${isoDate}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}
