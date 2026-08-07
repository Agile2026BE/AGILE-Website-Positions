export default function EmptyJobsState({ hasActiveFilters = false, onReset }) {
  return (
    <div className="empty-jobs-state" role="status">
      <h3>
        {hasActiveFilters
          ? "No positions match those filters."
          : "Verified position data has not been loaded yet."}
      </h3>
      <p>
        {hasActiveFilters
          ? "Adjust your search or reset the filters to view more current opportunities."
          : "The job board structure is ready. Position records will appear here only after they are verified against the AGILE source material."}
      </p>
      {hasActiveFilters && onReset ? (
        <button type="button" onClick={onReset}>
          Reset Filters
        </button>
      ) : null}
    </div>
  );
}
