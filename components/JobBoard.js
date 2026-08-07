"use client";

import { useMemo, useState } from "react";
import styles from "./JobBoard.module.css";
import EmptyJobsState from "./EmptyJobsState";
import FilterSelect from "./FilterSelect";
import JobCard from "./JobCard";
import JobResultsSummary from "./JobResultsSummary";
import ResetFiltersButton from "./ResetFiltersButton";
import SearchInput from "./SearchInput";
import ShowMorePositionsButton from "./ShowMorePositionsButton";
import { minimumSalaryOptions } from "../data/filterOptions";
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

const MAX_SHORTLISTED_JOBS = 3;

export default function JobBoard({ jobs = [] }) {
  const [filters, setFilters] = useState(initialFilters);
  const [shortlistedJobs, setShortlistedJobs] = useState([]);
  const [visibleCount, setVisibleCount] = useState(
    jobBoardConfig.results.initialVisibleCount,
  );

  const options = useMemo(() => buildFilterOptions(jobs), [jobs]);
  const filteredJobs = useMemo(() => filterJobs(jobs, filters), [jobs, filters]);
  const visibleJobs = filteredJobs.slice(0, visibleCount);
  const hasActiveFilters = Object.values(filters).some(Boolean);

  function updateFilter(key, value) {
    setFilters((current) => ({ ...current, [key]: value }));
    setVisibleCount(jobBoardConfig.results.initialVisibleCount);
  }

  function resetFilters() {
    setFilters(initialFilters);
    setVisibleCount(jobBoardConfig.results.initialVisibleCount);
  }

  function isJobShortlisted(job) {
    const key = job.id ?? job.slug;
    return shortlistedJobs.some((item) => (item.id ?? item.slug) === key);
  }

  function toggleShortlist(job) {
    const key = job.id ?? job.slug;

    setShortlistedJobs((current) => {
      const exists = current.some((item) => (item.id ?? item.slug) === key);

      if (exists) {
        return current.filter((item) => (item.id ?? item.slug) !== key);
      }

      if (current.length >= MAX_SHORTLISTED_JOBS) {
        return current;
      }

      return [...current, job];
    });
  }

  return (
    <section className={`section ${styles.board}`} id="positions">
      <div className="container">
        <p>{jobBoardConfig.eyebrow}</p>
        <h2 className="section-title">{jobBoardConfig.heading}</h2>
        <p className="section-copy">{jobBoardConfig.intro}</p>

        <div
          className={`job-board-controls ${styles.controls}`}
          aria-label="Position filters"
        >
          <FilterSelect
            label="State"
            value={filters.state}
            options={options.state}
            onChange={(value) => updateFilter("state", value)}
          />

          <FilterSelect
            label="Discipline"
            value={filters.discipline}
            options={options.discipline}
            onChange={(value) => updateFilter("discipline", value)}
          />

          <FilterSelect
            label="Minimum Salary"
            value={filters.minimumSalary}
            options={minimumSalaryOptions}
            onChange={(value) => updateFilter("minimumSalary", value)}
          />

          <FilterSelect
            label="Workplace"
            value={filters.workplace}
            options={options.workplace}
            onChange={(value) => updateFilter("workplace", value)}
          />

          <FilterSelect
            label="Market"
            value={filters.market}
            options={options.market}
            onChange={(value) => updateFilter("market", value)}
          />
        </div>

        <div className={`job-search-row ${styles.searchRow}`}>
          <SearchInput
            value={filters.query}
            onChange={(value) => updateFilter("query", value)}
            placeholder={jobBoardConfig.search.placeholder}
          />
          <ResetFiltersButton
            label={jobBoardConfig.search.resetLabel}
            onClick={resetFilters}
          />
        </div>

        <JobResultsSummary
          resultCount={filteredJobs.length}
          availableLabel={jobBoardConfig.results.availableLabel}
          allOpportunitiesLabel={jobBoardConfig.results.allOpportunitiesLabel}
          shortlistedCount={shortlistedJobs.length}
        />

        {visibleJobs.length ? (
          <div className={`job-grid ${styles.grid}`}>
            {visibleJobs.map((job) => (
              <JobCard
                key={job.id ?? job.slug}
                job={job}
                isShortlisted={isJobShortlisted(job)}
                onShortlist={toggleShortlist}
              />
            ))}
          </div>
        ) : (
          <EmptyJobsState
            hasActiveFilters={hasActiveFilters}
            onReset={resetFilters}
          />
        )}

        {visibleCount < filteredJobs.length ? (
          <ShowMorePositionsButton
            label={jobBoardConfig.results.showMoreLabel}
            onClick={() => setVisibleCount((count) => count + 24)}
          />
        ) : null}
      </div>
    </section>
  );
}
