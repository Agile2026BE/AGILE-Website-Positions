import BrandLogo from "./BrandLogo";
import styles from "./SiteHeader.module.css";

const BASE_URL = "https://careers.agileconsultingsolutions.com";

export default function SiteHeader() {
  return (
    <header className={`site-header ${styles.header}`}>
      <div className={`container site-header-inner ${styles.inner}`}>
        <a className={`brand ${styles.brand}`} href={`${BASE_URL}/`} aria-label="AGILE Careers home">
          <BrandLogo className={styles.logoImage} />
        </a>
        <nav className={`site-nav ${styles.nav}`} aria-label="Primary navigation">
          <a href={`${BASE_URL}/`}>Home</a>
          <a href={`${BASE_URL}/#positions`}>Positions</a>
          <a href={`${BASE_URL}/#why-agile`}>Why AGILE</a>
          <a href={`${BASE_URL}/#reviews`}>Reviews</a>
          <a href={`${BASE_URL}/#contact-guide`}>Contact</a>
          <a className={styles.searchCareers} href={`${BASE_URL}/#positions`}>Search Careers</a>
        </nav>
      </div>
    </header>
  );
}
