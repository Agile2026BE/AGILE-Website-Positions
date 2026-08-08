import styles from "./ViewPositionLink.module.css";

export default function ViewPositionLink({ onClick, label = "View Position" }) {
  return (
    <button className={styles.link} type="button" onClick={onClick}>
      {label}
    </button>
  );
}
