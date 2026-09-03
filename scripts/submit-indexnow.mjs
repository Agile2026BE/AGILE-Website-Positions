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

import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

import { jobs, coreJobs } from "../data/jobs.js";
import { terminatedPositionIds } from "../data/terminatedPositionIds.js";
import { dormantPositionIds } from "../data/dormantPositionIds.js";

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

const key = findIndexNowKey();
const urlList = buildUrlList();

console.log(`Submitting ${urlList.length} URLs to IndexNow (${jobs.length} live, ${urlList.length - jobs.length} retired)...`);

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
