"use client";

import { useMemo, useState } from "react";
import JobCard from "./JobCard";
import { jobBoardConfig } from "../data/jobBoardConfig";
import { buildFilterOptions, filterJobs } from "../lib/jobFilters";

const initialFilters = {
  state: "",
  discipline: "",
  minimumSalary: "",
  workplace: "",
  market: "",
  query: "",
};

export default function JobBoard({ jobs = [] }) {
  const [filters, setFilters] = useState(initialFilters);
  const [shortlistedJobs, setShortlistedJobs] = useState([]);
  const [visibleCount, setVisibleCount] = useState(
    jobBoardConfig.results.initialVisibleCount,
  );

  const options = useMemo(() => buildFilterOptions(jobs), [jobs]);
  const filteredJobs = useMemo(() => filterJobs(jobs, filters), [jobs, filters]);
  const visibleJobs = filteredJobs.slice(0, visibleCount);

  function updateFilter(key, value) {
    setFilters((current) => ({ ...current, [key]: value }));
    setVisibleCount(jobBoardConfig.results.initialVisibleCount);
  }

  function resetFilters() {
    setFilters(initialFilters);
    setVisibleCount(jobBoardConfig.results.initialVisibleCount);
  }

  function toggleShortlist(job) {
    const key = job.id ?? job.slug;

    setShortlistedJobs((current) => {
      const exists = current.some((item) => (item.id ?? item.slug) === key);

      if (exists) {
        return current.filter((item) => (item.id ?? item.slug) !== key);
      }

      return [...current, job];
    });
  }

  return (
    <section className="section" id="positions">
      <div className="container">
        <p>{jobBoardConfig.eyebrow}</p>
        <h2 className="section-title">{jobBoardConfig.heading}</h2>
        <p className="section-copy">{jobBoardConfig.intro}</p>

        <div className="job-board-controls" aria-label="Position filters">
          <select
            value={filters.state}
            onChange={(event) => updateFilter("state", event.target.value)}
            aria-label="State"
          >
            <option value="">State</option>
            {options.state.map((value) => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>

          <select
            value={filters.discipline}
            onChange={(event) => updateFilter("discipline", event.target.value)}
            aria-label="Discipline"
          >
            <option value="">Discipline</option>
            {options.discipline.map((value) => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>

          <select
            value={filters.minimumSalary}
            onChange={(event) => updateFilter("minimumSalary", event.target.value)}
            aria-label="Minimum Salary"
          >
            <option value="">Minimum Salary</option>
            <option value="75000">$75K+</option>
            <option value="100000">$100K+</option>
            <option value="125000">$125K+</option>
            <option value="150000">$150K+</option>
            <option value="175000">$175K+</option>
            <option value="200000">$200K+</option>
          </select>

          <select
            value={filters.workplace}
            onChange={(event) => updateFilter("workplace", event.target.value)}
            aria-label="Workplace"
          >
            <option value="">Workplace</option>
            {options.workplace.map((value) => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>

          <select
            value={filters.market}
            onChange={(event) => updateFilter("market", event.target.value)}
            aria-label="Market"
          >
            <option value="">Market</option>
            {options.market.map((value) => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
        </div>

        <div className="job-search-row">
          <input
            type="search"
            value={filters.query}
            onChange={(event) => updateFilter("query", event.target.value)}
            placeholder={jobBoardConfig.search.placeholder}
            aria-label={jobBoardConfig.search.label}
          />
          <button type="button" onClick={resetFilters}>
            {jobBoardConfig.search.resetLabel}
          </button>
        </div>

        <div className="job-results-summary">
          <strong>{filteredJobs.length}</strong> {jobBoardConfig.results.availableLabel}
          {shortlistedJobs.length ? (
            <span className="shortlist-count"> · {shortlistedJobs.length} shortlisted</span>
          ) : null}
        </div>

        <div className="job-grid">
          {visibleJobs.map((job) => (
            <JobCard
              key={job.id ?? job.slug}
              job={job}
              onShortlist={toggleShortlist}
            />
          ))}
        </div>

        {visibleCount < filteredJobs.length ? (
          <button
            type="button"
            onClick={() => setVisibleCount((count) => count + 24)}
          >
            {jobBoardConfig.results.showMoreLabel}
          </button>
        ) : null}
      </div>
    </section>
  );
}
