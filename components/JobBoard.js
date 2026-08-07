"use client";

import { useMemo, useState } from "react";
import styles from "./JobBoard.module.css";
import EmptyJobsState from "./EmptyJobsState";
import FilterSelect from "./FilterSelect";
import JobCard from "./JobCard";
import JobResultsSummary from "./JobResultsSummary";
import PositionModal from "./PositionModal";
import ResetFiltersButton from "./ResetFiltersButton";
import SearchInput from "./SearchInput";
import ShowMorePositionsButton from "./ShowMorePositionsButton";
import { disciplineOptions, minimumSalaryOptions, stateOptions, workplaceOptions } from "../data/filterOptions";
import { jobBoardConfig } from "../data/jobBoardConfig";
import { buildFilterOptions, filterJobs } from "../lib/jobFilters";

const initialFilters = { state:"", discipline:"", minimumSalary:"", workplace:"", market:"", query:"" };
const MAX_SHORTLISTED_JOBS = 3;

export default function JobBoard({ jobs = [] }) {
  const [filters,setFilters] = useState(initialFilters);
  const [shortlistedJobs,setShortlistedJobs] = useState([]);
  const [visibleCount,setVisibleCount] = useState(jobBoardConfig.results.initialVisibleCount);
  const [selectedJob,setSelectedJob] = useState(null);
  const options = useMemo(() => buildFilterOptions(jobs),[jobs]);
  const filteredJobs = useMemo(() => filterJobs(jobs,filters),[jobs,filters]);
  const visibleJobs = filteredJobs.slice(0,visibleCount);
  const hasActiveFilters = Object.values(filters).some(Boolean);

  function updateFilter(key,value){ setFilters(current=>({...current,[key]:value})); setVisibleCount(jobBoardConfig.results.initialVisibleCount); }
  function resetFilters(){ setFilters(initialFilters); setVisibleCount(jobBoardConfig.results.initialVisibleCount); }
  function isJobShortlisted(job){ const key=job.id??job.slug; return shortlistedJobs.some(item=>(item.id??item.slug)===key); }
  function toggleShortlist(job){ const key=job.id??job.slug; setShortlistedJobs(current=>{ const exists=current.some(item=>(item.id??item.slug)===key); if(exists)return current.filter(item=>(item.id??item.slug)!==key); if(current.length>=MAX_SHORTLISTED_JOBS)return current; return [...current,job]; }); }

  return (
    <section className={`section ${styles.board}`} id="positions">
      <div className="container">
        <div className={styles.headingRow}>
          <div>
            <p className={styles.slogan}>WHAT’S <span>Your Next</span> MOVE?℠</p>
            <h2 className="section-title">{jobBoardConfig.heading}</h2>
          </div>
          <p className={`section-copy ${styles.intro}`}>{jobBoardConfig.intro}</p>
        </div>

        <div className={styles.filterPanel}>
          <div className={`job-board-controls ${styles.controls}`} aria-label="Position filters">
            <div><label>State</label><FilterSelect label="All States" value={filters.state} options={stateOptions} onChange={value=>updateFilter("state",value)} /></div>
            <div><label>Discipline</label><FilterSelect label="All Disciplines" value={filters.discipline} options={disciplineOptions} onChange={value=>updateFilter("discipline",value)} /></div>
            <div><label>Minimum Salary</label><FilterSelect label="Any Salary" value={filters.minimumSalary} options={minimumSalaryOptions} onChange={value=>updateFilter("minimumSalary",value)} /></div>
            <div><label>Workplace</label><FilterSelect label="All Types" value={filters.workplace} options={workplaceOptions} onChange={value=>updateFilter("workplace",value)} /></div>
            <div><label>Market</label><FilterSelect label="All Markets" value={filters.market} options={options.market} onChange={value=>updateFilter("market",value)} /></div>
          </div>
          <div className={styles.searchLabel}>Title, specialty, skill, city or commute area</div>
          <div className={`job-search-row ${styles.searchRow}`}>
            <SearchInput value={filters.query} onChange={value=>updateFilter("query",value)} placeholder={jobBoardConfig.search.placeholder} />
            <ResetFiltersButton label={jobBoardConfig.search.resetLabel} onClick={resetFilters} />
          </div>
        </div>

        <JobResultsSummary resultCount={filteredJobs.length} availableLabel={jobBoardConfig.results.availableLabel} allOpportunitiesLabel={jobBoardConfig.results.allOpportunitiesLabel} shortlistedCount={shortlistedJobs.length} />
        {visibleJobs.length ? <div className={`job-grid ${styles.grid}`}>{visibleJobs.map(job=><JobCard key={job.id??job.slug} job={job} isShortlisted={isJobShortlisted(job)} onShortlist={toggleShortlist} onViewPosition={setSelectedJob} />)}</div> : <EmptyJobsState hasActiveFilters={hasActiveFilters} onReset={resetFilters} />}
        {visibleCount<filteredJobs.length ? <ShowMorePositionsButton label={jobBoardConfig.results.showMoreLabel} onClick={()=>setVisibleCount(count=>count+24)} /> : null}
      </div>

      <PositionModal
        job={selectedJob}
        jobs={jobs}
        onClose={()=>setSelectedJob(null)}
        onSelectJob={setSelectedJob}
        isShortlisted={selectedJob ? isJobShortlisted(selectedJob) : false}
        onShortlist={toggleShortlist}
      />
    </section>
  );
}
