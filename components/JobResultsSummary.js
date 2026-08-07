export default function JobResultsSummary({
  resultCount,
  availableLabel,
  allOpportunitiesLabel,
  shortlistedCount = 0,
}) {
  return (
    <div className="job-results-summary-row">
      <div className="job-results-summary">
        <strong>{resultCount}</strong> {availableLabel}
        {shortlistedCount ? (
          <span className="shortlist-count"> · {shortlistedCount} shortlisted</span>
        ) : null}
      </div>
      <div className="job-results-scope">{allOpportunitiesLabel}</div>
    </div>
  );
}
