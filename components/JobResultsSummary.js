import styles from "./JobResultsSummary.module.css";
import { POSITION_REVIEW_LABEL } from "../lib/positionFreshness";

export default function JobResultsSummary({
  resultCount,
  availableLabel,
  allOpportunitiesLabel,
  shortlistedCount = 0,
}) {
  const noun = resultCount === 1 ? "position" : "positions";
  return (
    <div className={styles.row} id="position-results" tabIndex="-1">
      <div>
        <div className={styles.summary}>
          <strong>{resultCount} {noun} available</strong>
          {shortlistedCount ? (
            <span className={styles.shortlist}> · {shortlistedCount} shortlisted</span>
          ) : null}
        </div>
        <p className={styles.guidance}>
          {POSITION_REVIEW_LABEL} · Positions current. Shortlist up to 3 to compare and share by link, email, or text.
        </p>
      </div>
      <div className={styles.scope}>{allOpportunitiesLabel}</div>
    </div>
  );
}
