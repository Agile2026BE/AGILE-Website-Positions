import styles from "./ResetFiltersButton.module.css";

export default function ResetFiltersButton({ label = "Reset", onClick }) {
  return (
    <button className={styles.button} type="button" onClick={onClick}>
      {label}
    </button>
  );
}
