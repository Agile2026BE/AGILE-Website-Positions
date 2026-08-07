import styles from "./JobResultsSummary.module.css";

export default function JobResultsSummary({
  resultCount,
  availableLabel,
  allOpportunitiesLabel,
  shortlistedCount = 0,
}) {
  return (
    <div className={styles.row}>
      <div className={styles.summary}>
        <strong>{resultCount}</strong> {availableLabel}
        {shortlistedCount ? (
          <span className={styles.shortlist}> · {shortlistedCount} shortlisted</span>
        ) : null}
      </div>
      <div className={styles.scope}>{allOpportunitiesLabel}</div>
    </div>
  );
}
