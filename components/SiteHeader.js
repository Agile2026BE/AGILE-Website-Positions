import Link from "next/link";
import BrandLogo from "./BrandLogo";
import styles from "./SiteHeader.module.css";

export default function SiteHeader() {
  return (
    <header className={`site-header ${styles.header}`}>
      <div className={`container site-header-inner ${styles.inner}`}>
        <Link className={`brand ${styles.brand}`} href="/#top" aria-label="AGILE Careers home">
          <BrandLogo className={styles.logoImage} />
        </Link>
        <nav className={`site-nav ${styles.nav}`} aria-label="Primary navigation">
          <Link href="/#positions">Positions</Link>
          <Link href="/#why-agile">Why AGILE</Link>
          <Link href="/#reviews">Reviews</Link>
          <Link href="/#contact-guide">Contact</Link>
          <Link className={styles.searchCareers} href="/#positions">Search Careers</Link>
        </nav>
      </div>
    </header>
  );
}
