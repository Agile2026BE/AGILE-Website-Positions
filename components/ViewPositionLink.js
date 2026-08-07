import Link from "next/link";
import styles from "./ViewPositionLink.module.css";

export default function ViewPositionLink({ href, label = "View Position" }) {
  return (
    <Link className={styles.link} href={href}>
      {label}
    </Link>
  );
}
