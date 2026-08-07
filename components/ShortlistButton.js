import styles from "./ShortlistButton.module.css";

export default function ShortlistButton({ isShortlisted = false, onClick }) {
  return (
    <button
      className={styles.button}
      type="button"
      onClick={onClick}
      aria-pressed={isShortlisted}
    >
      {isShortlisted ? "Shortlisted" : "+ Shortlist"}
    </button>
  );
}
