import { jobPostedDates } from "../data/jobPostedDates";
import { POSITION_REVIEW_LABEL } from "./positionFreshness";

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

// The real "datePosted" for one position's JobPosting structured data — see
// data/jobPostedDates.js for why this matters (Google Jobs freshness) and
// where these dates come from. Any Position ID not yet in that map (should
// only happen if someone forgets to add one for a brand-new posting) falls
// back to the old site-wide reviewed-date behavior so nothing breaks.
export function getJobDatePosted(job) {
  return jobPostedDates[String(job?.id)] ?? getReviewedDateISO(POSITION_REVIEW_LABEL);
}

// Extracts a minimum "months of experience" figure from free-text experience
// strings like "10+ years", "Minimum of 10 years", "3–10 years", "5 to 8
// years". Takes the first number found (the floor of the range) and converts
// years to months for schema.org's OccupationalExperienceRequirements.
// Returns null for non-numeric text ("Not stated") so callers can omit the
// field entirely rather than publish a fabricated requirement.
export function parseExperienceMonths(text) {
  const match = String(text ?? "").match(/\d+(?:\.\d+)?/);
  if (!match) return null;
  return Math.round(Number.parseFloat(match[0]) * 12);
}

// validThrough for JobPosting structured data. Google drops a posting from
// Google Jobs once validThrough is in the past, so it must roll forward with
// each build instead of being pinned to datePosted + 60 days (which had
// 126 of 160 live postings marked expired on 2026-10-17). Pages are built at
// deploy time, so this is "60 days from the latest deploy" -- any live
// posting stays valid as long as the site is redeployed within 60 days.
export function getValidThrough(datePosted, days = 60) {
  const buildDate = new Date().toISOString().slice(0, 10);
  const fromPosted = addDaysISO(datePosted, days);
  const fromBuild = addDaysISO(buildDate, days);
  return `${fromBuild > fromPosted ? fromBuild : fromPosted}T23:59:59Z`;
}
