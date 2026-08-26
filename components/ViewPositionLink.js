import Link from "next/link";
import styles from "./ViewPositionLink.module.css";

export default function ViewPositionLink({ href, onClick, label = "View Position" }) {
  return (
    <Link
      href={href}
      className={styles.link}
      onClick={(event) => {
        event.preventDefault();
        onClick?.();
      }}
    >
      {label}
    </Link>
  );
}
