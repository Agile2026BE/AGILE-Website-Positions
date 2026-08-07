import styles from "./ShowMorePositionsButton.module.css";

export default function ShowMorePositionsButton({ label, onClick }) {
  return (
    <button className={styles.button} type="button" onClick={onClick}>
      {label}
    </button>
  );
}
