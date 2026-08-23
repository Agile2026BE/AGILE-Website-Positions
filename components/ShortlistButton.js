import styles from "./ShortlistButton.module.css";

export default function ShortlistButton({ isShortlisted = false, onClick }) {
  return (
    <button
      className={styles.button}
      type="button"
      onClick={onClick}
      aria-pressed={isShortlisted}
      aria-label={isShortlisted ? "Remove position from shortlist" : "Add position to shortlist"}
    >
      <span className={styles.star} aria-hidden="true">{isShortlisted ? "★" : "☆"}</span>
      {isShortlisted ? "Shortlisted" : "Shortlist"}
    </button>
  );
}
