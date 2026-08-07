import Link from "next/link";
import styles from "./SiteHeader.module.css";

export default function SiteHeader() {
  return (
    <header className={`site-header ${styles.header}`}>
      <div className={`container site-header-inner ${styles.inner}`}>
        <Link className={`brand ${styles.brand}`} href="/#top" aria-label="AGILE Careers home">AGILE</Link>
        <nav className={`site-nav ${styles.nav}`} aria-label="Primary navigation">
          <Link href="/#positions">Positions</Link>
          <Link href="/#why-agile">Why AGILE</Link>
          <Link href="/#reviews">Reviews</Link>
          <Link href="/#contact">Contact</Link>
          <a className={styles.searchCareers} href="#positions">Search Careers</a>
        </nav>
      </div>
    </header>
  );
}
