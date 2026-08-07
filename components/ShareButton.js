import styles from "./ShareButton.module.css";

export default function ShareButton({ label = "Share", onClick }) {
  return (
    <button className={styles.button} type="button" onClick={onClick}>
      {label}
    </button>
  );
}
