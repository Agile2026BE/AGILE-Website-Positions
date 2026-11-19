// Pushes every live position URL — plus every retired position's URL — to
// IndexNow (https://www.indexnow.org/). IndexNow is a free, no-account,
// no-OAuth protocol backed by Bing, so a single submission here notifies
// Bing directly and Yahoo (which serves Bing's index) as a side effect.
// It does not reach Google; Google has no IndexNow support, only its own
// (currently unused, see /areas/agile-website.md) Indexing API.
//
// Why we resubmit retired URLs too: a retired position's page now 404s
// (see app/careers/positions/[slug]/page.js's notFound() call), but
// nothing else would ever tell Bing that. Submitting the now-dead URL is
// exactly the IndexNow-recommended way to get a removed page dropped from
// the index quickly, so retirement is handled by this same script with no
// extra logic — no separate "removal" step to remember.
//
// Run manually with `npm run indexnow:submit`. Also runs automatically via
// .github/workflows/indexnow.yml whenever the job data files change.
//
// 2026-11-18: Bing Webmaster Tools flagged "Avoid IndexNow Batch Mode" because
// every push resubmitted all ~200 URLs. When the workflow passes the previous
// commit (INDEXNOW_BEFORE_SHA), this script now loads the job data as it was
// at that commit and submits ONLY the postings whose content, slug, or
// live/hidden status changed, plus the job hub pages (/careers/jobs/...) those
// postings appear on. A manual run (no previous commit) still sends the full
// list.

import { readdirSync, readFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import { fileURLToPath } from "node:url";
import path from "node:path";

import { jobs, coreJobs } from "../data/jobs.js";
import { terminatedPositionIds } from "../data/terminatedPositionIds.js";
import { dormantPositionIds } from "../data/dormantPositionIds.js";
import { HUBS } from "../lib/jobHubs.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, "..", "public");
const HOST = "www.agileconsultingsolutions.com";
const BASE_URL = `https://${HOST}`;
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

function findIndexNowKey() {
  const match = readdirSync(PUBLIC_DIR).find((name) => /^[0-9a-f]{32}\.txt$/.test(name));
  if (!match) {
    throw new Error(
      "No IndexNow key file found in public/ (expected a 32-char-hex <key>.txt). " +
        "See scripts/submit-indexnow.mjs for how it's used.",
    );
  }
  const key = match.replace(/\.txt$/, "");
  const fileContents = readFileSync(path.join(PUBLIC_DIR, match), "utf8").trim();
  if (fileContents !== key) {
    throw new Error(`Key file ${match} does not contain the matching key.`);
  }
  return key;
}

function buildUrlList() {
  const liveUrls = jobs.map((job) => `${BASE_URL}/careers/positions/${job.slug}`);

  const coreById = new Map(coreJobs.map((job) => [String(job.id), job]));
  const hiddenUrls = [...terminatedPositionIds, ...dormantPositionIds]
    .map((entry) => coreById.get(String(entry.id)))
    .filter(Boolean)
    .map((job) => `${BASE_URL}/careers/positions/${job.slug}`);

  return Array.from(new Set([...liveUrls, ...hiddenUrls]));
}

async function submit(urlList, key) {
  const body = {
    host: HOST,
    key,
    keyLocation: `${BASE_URL}/${key}.txt`,
    urlList,
  };

  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });

  return response;
}

const positionUrl = (job) => `${BASE_URL}/careers/positions/${job.slug}`;
const hubUrl = (hub) => `${BASE_URL}/careers/jobs/${hub.slug}`;

// Loads `jobs` as it was at an earlier commit: extracts that commit's data/
// folder (git archive) into a temp folder and imports it from there.
async function loadJobsAt(sha) {
  const repoRoot = path.join(__dirname, "..");
  const dir = mkdtempSync(path.join(tmpdir(), "indexnow-prev-"));
  const archive = execFileSync("git", ["archive", sha, "data"], { cwd: repoRoot, maxBuffer: 64 * 1024 * 1024 });
  execFileSync("tar", ["-x", "-C", dir], { input: archive });
  const mod = await import(pathToFileURL(path.join(dir, "data", "jobs.js")).href);
  return mod.jobs;
}

async function buildChangedUrlList(beforeSha) {
  const before = await loadJobsAt(beforeSha);
  const prevById = new Map(before.map((job) => [String(job.id), job]));
  const nowById = new Map(jobs.map((job) => [String(job.id), job]));
  const urls = new Set();
  const touched = [];

  for (const job of jobs) {
    const prev = prevById.get(String(job.id));
    if (!prev || JSON.stringify(prev) !== JSON.stringify(job)) {
      urls.add(positionUrl(job));
      if (prev && prev.slug !== job.slug) urls.add(positionUrl(prev));
      touched.push(job);
      if (prev) touched.push(prev);
    }
  }
  // Was live before, hidden now (filled / Dormant / Terminated) -> its page now 404s.
  for (const prev of before) {
    if (!nowById.has(String(prev.id))) {
      urls.add(positionUrl(prev));
      touched.push(prev);
    }
  }
  for (const hub of HUBS) {
    if (touched.some((job) => hub.filter(job))) urls.add(hubUrl(hub));
  }
  return [...urls];
}

const key = findIndexNowKey();
const beforeSha = (process.env.INDEXNOW_BEFORE_SHA || "").trim();
const hasBefore = /^[0-9a-f]{40}$/.test(beforeSha) && !/^0+$/.test(beforeSha);

let urlList;
if (hasBefore) {
  try {
    urlList = await buildChangedUrlList(beforeSha);
    console.log(`Changed since ${beforeSha.slice(0, 7)}: ${urlList.length} URL(s).`);
  } catch (error) {
    console.warn(`Could not compare with ${beforeSha.slice(0, 7)} (${error.message}); sending the full list.`);
  }
}
if (!urlList) {
  urlList = [...buildUrlList(), ...HUBS.map(hubUrl)];
  console.log(`Full submission: ${urlList.length} URLs (${jobs.length} live positions, ${HUBS.length} job hub pages, the rest hidden positions).`);
}

if (!urlList.length) {
  console.log("No posting changes to report; nothing submitted.");
  process.exit(0);
}

console.log(urlList.join("\n"));

if (process.env.INDEXNOW_DRY_RUN) {
  console.log("Dry run: nothing submitted.");
  process.exit(0);
}

const response = await submit(urlList, key);

// IndexNow returns 200 (or 202) on success; a plain 200 with an empty body
// is normal and does not mean nothing happened.
if (response.ok) {
  console.log(`IndexNow accepted the submission (HTTP ${response.status}).`);
  process.exit(0);
} else {
  const text = await response.text().catch(() => "");
  console.error(`IndexNow submission failed: HTTP ${response.status} ${response.statusText}\n${text}`);
  process.exit(1);
}
