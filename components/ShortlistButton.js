import styles from "./ShortlistButton.module.css";

export default function ShortlistButton({ isShortlisted = false, onClick }) {
  return (
    <button
      className={styles.button}
      type="button"
      onClick={onClick}
      aria-pressed={isShortlisted}
      aria-label={isShortlisted ? "Remove saved position" : "Save position for later"}
    >
      {isShortlisted ? "Saved" : "+ Save"}
    </button>
  );
}
