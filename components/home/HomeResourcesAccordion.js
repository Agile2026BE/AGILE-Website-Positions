"use client";

import { useEffect, useState } from "react";
import styles from "../../app/page.module.css";
import PlayAgileChess from "./PlayAgileChess";
import FilterSelect from "../FilterSelect";
import MultiSelectFilter from "../MultiSelectFilter";
import { formatSalaryDisplay } from "../../lib/jobFilters";

// The careers engine now lives at /careers within this same unified deployment,
// so this fetches live numbers at runtime from its public endpoint
// (/api/jobs-summary). The constants below are only a fallback, used if that fetch
// ever fails — a real, verified snapshot of live AGILE postings captured August 2026,
// not invented data. The "View All" and "Explore Additional Opportunities" links always
// go straight to the live, up-to-the-minute search either way.
const JOBS_SUMMARY_URL = "/api/jobs-summary";

const FALLBACK_STATS = { count: 183, min: 65000, max: 250000 };

const FALLBACK_SAMPLE_JOBS = [
  { id: "1001", title: "Associate Electrical Engineer- Technical", location: "NYC, NY", salaryDisplay: "$110,000 – $145,000+", slug: "1001-associate-electrical-engineer-technical" },
  { id: "1002", title: "Associate Electrical Engineer – Power Systems and Modeling", location: "NYC, NY", salaryDisplay: "$122,000 – $140,000+", slug: "1002-associate-electrical-engineer-power-systems-and-modeling" },
  { id: "1003", title: "Associate, Electrical", location: "NYC, NY", salaryDisplay: "$130,000 – $155,000", slug: "1003-associate-electrical" },
  { id: "1004", title: "Associate, Building Management Systems (BMS)", location: "NYC, NY", salaryDisplay: "$122,000 – $140,000", slug: "1004-associate-building-management-systems-bms" },
  { id: "1005", title: "Electrical Engineer", location: "NYC, NY", salaryDisplay: "$80,000 – $85,000", slug: "1005-electrical-engineer" },
];

const FALLBACK_FEATURED_JOBS = [
  { id: "1010", title: "Senior Electrical Commissioning Engineer", location: "NYC, NY", salaryDisplay: "$150,000 – $200,000", slug: "1010-senior-electrical-commissioning-engineer" },
  { id: "1040", title: "Associate Mechanical Engineer –Data Centers (HVAC)", location: "NYC, NY", salaryDisplay: "$125,000 – $150,000+", slug: "1040-associate-mechanical-engineer-data-centers-hvac" },
  { id: "1075", title: "Director, Healthcare/Sciences Department: Health/Sciences", location: "Voorhees, NJ and NYC, NY", salaryDisplay: "$200,000 – $250,000", slug: "1075-director-healthcare-sciences-department-health-sciences" },
  { id: "1129", title: "Senior Electrical Engineer – Water/Wastewater", location: "NYC, NY", salaryDisplay: "$135,000 – $190,000", slug: "1129-senior-electrical-engineer-water-wastewater" },
  { id: "1181", title: "Assistant Chief Engineer, Structural (Bridge)", location: "Wall Township, NJ", salaryDisplay: "$150,000 – $200,000", slug: "1181-assistant-chief-engineer-structural-bridge" },
];

const PORTFOLIO_SLICES = [
  { label: "Top 500 Design Firms", pct: 39, color: "#1E88E5" },
  { label: "MEP Giants Firms", pct: 22, color: "#FF6A3D" },
  { label: "Notable Mid-Size Firms", pct: 18, color: "#0FB981" },
  { label: "ENR Top 100 Firms", pct: 11, color: "#8B3FE8" },
  { label: "BEST Places to Work Firms", pct: 10, color: "#FBBF24" },
];

function money(n) {
  return `$${n.toLocaleString()}`;
}

function buildConicGradient(slices) {
  let cursor = 0;
  const stops = slices.map((slice) => {
    const start = cursor;
    cursor += slice.pct;
    return `${slice.color} ${start}% ${cursor}%`;
  });
  return `conic-gradient(${stops.join(", ")})`;
}

const EMPTY_CALC_FILTERS = { state: "", discipline: "", workplace: "", market: [], experience: "" };
const MAX_CALC_MARKET_SELECTIONS = 5;

// Real postings' "experience" field is free text; the live API (jobs-summary,
// backed by lib/jobFilters.js) pre-parses each one into experienceMin/experienceMax
// (null max = open-ended, e.g. "10+ years") and returns the same seven
// continuous, non-overlapping bands used by the real position search filters
// on careers.agileconsultingsolutions.com — sourced from filterOptions.experience
// below, not hardcoded here, so the two stay in sync automatically.
// A selected band is read as a ceiling on the candidate's own experience
// (picking "6-10 years" means up to 10), so they qualify for any posting
// whose stated minimum requirement is at or below that ceiling — matching the
// same "qualifies for" logic used by the live position search filters.
function experienceQualifies(job, bandValue, bands) {
  if (!bandValue) return true;
  const band = (bands || []).find((b) => b.value === bandValue);
  if (!band) return true;
  if (job.experienceMin == null) return true;
  return job.experienceMin <= band.max;
}

function jobMatchesCalcFilters(job, filters, experienceBands) {
  if (filters.state && !String(job.state || "").toLowerCase().includes(filters.state.toLowerCase())) return false;
  if (filters.discipline && String(job.discipline || "").toLowerCase() !== filters.discipline.toLowerCase()) return false;
  if (filters.workplace && !String(job.workplace || "").toLowerCase().includes(filters.workplace.toLowerCase())) return false;
  if (filters.market && filters.market.length) {
    const markets = String(job.market || "").split("|").map((m) => m.trim().toLowerCase());
    const selected = filters.market.map((m) => m.toLowerCase());
    if (!selected.some((m) => markets.includes(m))) return false;
  }
  if (!experienceQualifies(job, filters.experience, experienceBands)) return false;
  return true;
}

function buildCareersSearchUrl(filters) {
  const params = new URLSearchParams();
  if (filters.state) params.set("state", filters.state);
  if (filters.discipline) params.set("discipline", filters.discipline);
  if (filters.workplace) params.set("workplace", filters.workplace);
  if (filters.market) filters.market.forEach((m) => params.append("market", m));
  if (filters.experience) params.set("experience", filters.experience);
  const query = params.toString();
  return `/careers/${query ? `?${query}` : ""}#positions`;
}

export default function HomeResourcesAccordion({ variant }) {
  const [open, setOpen] = useState(false);
  const [openTab, setOpenTab] = useState(null);
  const [live, setLive] = useState(null);
  const [calcFilters, setCalcFilters] = useState(EMPTY_CALC_FILTERS);
  const [chessOpen, setChessOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(JOBS_SUMMARY_URL)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("bad response"))))
      .then((data) => {
        if (!cancelled) setLive(data);
      })
      .catch(() => {
        // Silent fallback — the constants below already cover this.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const stats = live ?? FALLBACK_STATS;
  const sample = live?.sample ?? FALLBACK_SAMPLE_JOBS;
  const featured = live?.featured ?? FALLBACK_FEATURED_JOBS;
  const filterOptions = live?.filterOptions ?? null;

  const hasCalcFilters = Boolean(calcFilters.state || calcFilters.discipline || calcFilters.workplace || calcFilters.market.length || calcFilters.experience);
  const calcMatches = live?.jobs && hasCalcFilters ? live.jobs.filter((job) => jobMatchesCalcFilters(job, calcFilters, filterOptions?.experience)) : null;
  const calcMins = calcMatches ? calcMatches.map((j) => j.salaryMin).filter(Boolean) : [];
  const calcMaxs = calcMatches ? calcMatches.map((j) => j.salaryMax).filter(Boolean) : [];
  const calcStats = calcMatches
    ? { count: calcMatches.length, min: calcMins.length ? Math.min(...calcMins) : null, max: calcMaxs.length ? Math.max(...calcMaxs) : null }
    : stats;
  const calcSample = calcMatches ? calcMatches.slice(0, 3) : sample;

  function updateCalcFilter(key, value) {
    setCalcFilters((current) => ({ ...current, [key]: value }));
  }

  function resetCalcFilters() {
    setCalcFilters(EMPTY_CALC_FILTERS);
  }

  // Position detail pages reached via the Featured Positions list send visitors
  // back here with "#explore-resources-featured" (see PositionBackLink) — reopen
  // this same panel to the same tab so "Back" actually feels like going back.
  useEffect(() => {
    function openFromHash() {
      if (window.location.hash === "#explore-resources-featured") {
        setOpen(true);
        setOpenTab("featured");
      }
    }
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  function toggleTab(tab) {
    setOpenTab((current) => (current === tab ? null : tab));
  }

  function toggle() {
    setOpen((v) => !v);
    setOpenTab(null);
  }

  const wrapClass = variant === "mobile" ? styles.resourcesWrapMobile : styles.resourcesWrapDesktop;
  const triggerClass = variant === "mobile" ? styles.mobileExploreResources : styles.exploreResources;

  return (
    <div className={wrapClass}>
      {chessOpen ? (
        <div className={styles.chessModalBackdrop} onClick={() => setChessOpen(false)}>
          <div className={styles.chessModalCard} onClick={(e) => e.stopPropagation()}>
            <button type="button" className={styles.chessModalClose} aria-label="Close" onClick={() => setChessOpen(false)}>×</button>
            <PlayAgileChess />
          </div>
        </div>
      ) : null}

      <div className={`${styles.resourcesPanel} ${open ? styles.resourcesPanelOpen : ""}`}>
        <div className={styles.resourcesPanelScroll}>
          <div className={styles.accessPanelHead}>Explore Resources</div>

          <div className={`${styles.accessRow} ${openTab === "salary" ? styles.accessRowExpanded : ""}`}>
            <div className={styles.accessRowHead} onClick={() => toggleTab("salary")}>
              Salary Calculator <span className={styles.accessRowChev}></span>
            </div>
            <div className={styles.accessRowBody}>
              {filterOptions ? (
                <div className={styles.resourcesFilterGrid}>
                  <div className={styles.resourcesFilterField}>
                    <label>State</label>
                    <FilterSelect label="All States" value={calcFilters.state} options={filterOptions.state} onChange={(value) => updateCalcFilter("state", value)} />
                  </div>
                  <div className={styles.resourcesFilterField}>
                    <label>Discipline</label>
                    <FilterSelect label="All Disciplines" value={calcFilters.discipline} options={filterOptions.discipline} onChange={(value) => updateCalcFilter("discipline", value)} />
                  </div>
                  <div className={styles.resourcesFilterField}>
                    <label>Schedule</label>
                    <FilterSelect label="All Types" value={calcFilters.workplace} options={filterOptions.workplace} onChange={(value) => updateCalcFilter("workplace", value)} />
                  </div>
                  <div className={styles.resourcesFilterField}>
                    <label>Years of Experience</label>
                    <FilterSelect label="Any Experience" value={calcFilters.experience} options={filterOptions.experience || []} onChange={(value) => updateCalcFilter("experience", value)} />
                  </div>
                  <div className={styles.resourcesFilterField}>
                    <label>Market Sector · pick up to 5</label>
                    <MultiSelectFilter label="All Sectors" values={calcFilters.market} options={filterOptions.market} maxSelections={MAX_CALC_MARKET_SELECTIONS} onChange={(value) => updateCalcFilter("market", value)} />
                  </div>
                  {hasCalcFilters ? (
                    <button type="button" className={styles.resourcesFilterReset} onClick={resetCalcFilters}>Reset filters</button>
                  ) : null}
                </div>
              ) : null}

              <div className={styles.resourcesStatBox}>
                <span className={styles.resourcesStatLabel}>{hasCalcFilters ? "Salary range for this search" : "Current posted salary range"}</span>
                <strong className={styles.resourcesStatValue}>{calcStats.min != null && calcStats.max != null ? `${money(calcStats.min)} – ${money(calcStats.max)}` : "No matches yet"}</strong>
                <span className={styles.resourcesStatSub}>
                  {calcStats.count} {hasCalcFilters ? "matching postings" : "current postings"} · all current AGILE opportunities
                </span>
              </div>

              <div className={styles.resourcesPositionList}>
                {calcSample.map((job) => (
                  <a key={job.id} href={`/careers/positions/${job.slug}`} className={styles.resourcesPositionItem}>
                    <strong>{job.title}</strong>
                    <span className={styles.resourcesPositionMeta}>
                      <span>{job.location}</span>
                      <span className={styles.salaryValue}>{formatSalaryDisplay(job.salaryDisplay)}</span>
                    </span>
                  </a>
                ))}
              </div>

              <a href={buildCareersSearchUrl(calcFilters)} className={styles.resourcesCta}>
                {hasCalcFilters ? `View ${calcStats.count} Matching Position${calcStats.count === 1 ? "" : "s"}` : `View All ${stats.count} Positions`}
              </a>
              {hasCalcFilters ? (
                <a href="/careers/#positions" className={styles.resourcesCtaSecondary}>See All {stats.count} Positions</a>
              ) : null}
            </div>
          </div>

          <div className={`${styles.accessRow} ${openTab === "featured" ? styles.accessRowExpanded : ""}`}>
            <div className={styles.accessRowHead} onClick={() => toggleTab("featured")}>
              Featured Positions <span className={styles.accessRowChev}></span>
            </div>
            <div className={styles.accessRowBody}>
              <div className={styles.resourcesPositionList}>
                {featured.map((job) => (
                  <a key={job.id} href={`/careers/positions/${job.slug}?from=home-featured`} className={styles.resourcesPositionItem}>
                    <strong>{job.title}</strong>
                    <span className={styles.resourcesPositionMeta}>
                      <span>{job.location}</span>
                      <span className={styles.salaryValue}>{formatSalaryDisplay(job.salaryDisplay)}</span>
                    </span>
                  </a>
                ))}
              </div>
              <a href="/careers/#positions" className={styles.resourcesCta}>Explore Additional Opportunities</a>
            </div>
          </div>

          <div className={`${styles.accessRow} ${openTab === "portfolio" ? styles.accessRowExpanded : ""}`}>
            <div className={styles.accessRowHead} onClick={() => toggleTab("portfolio")}>
              Private Client Portfolio <span className={styles.accessRowChev}></span>
            </div>
            <div className={styles.accessRowBody}>
              <div className={styles.portfolioWrap}>
                <div className={styles.portfolioChart} style={{ background: buildConicGradient(PORTFOLIO_SLICES) }}>
                  <div className={styles.portfolioHole}>
                    <strong>40+</strong>
                    <span>Firms</span>
                  </div>
                </div>
                <ul className={styles.portfolioLegend}>
                  {PORTFOLIO_SLICES.map((slice) => (
                    <li key={slice.label}>
                      <span className={styles.portfolioDot} style={{ background: slice.color }}></span>
                      {slice.pct}% {slice.label}
                    </li>
                  ))}
                </ul>
              </div>
              <p className={styles.portfolioNote}>Across NY, NJ, PA, MA, CT, NC, FL, CA, CO</p>
              <p className={styles.portfolioFooterMark}>AGILE</p>
            </div>
          </div>

          <div className={styles.accessRowLink} onClick={() => { setChessOpen(true); setOpen(false); }} role="button" tabIndex={0}>
            Play AGILE
          </div>
        </div>
      </div>

      <button type="button" className={triggerClass} aria-expanded={open} onClick={toggle}>
        {open ? "Close" : "Explore Resources"}
      </button>
    </div>
  );
}
