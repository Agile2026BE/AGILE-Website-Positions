import styles from "./SiteHeader.module.css";

const BASE_URL = "https://careers.agileconsultingsolutions.com";

export default function SiteHeader() {
  return (
    <header className={`site-header ${styles.header}`}>
      <div className={`container site-header-inner ${styles.inner}`}>
        <a className={`brand ${styles.brand}`} href={`${BASE_URL}/`} aria-label="AGILE Careers home">
          <span className={styles.wordmark}>AGILE</span>
        </a>
        <nav className={`site-nav ${styles.nav}`} aria-label="Primary navigation">
          <a href={`${BASE_URL}/#agile-insights`}>AGILE Insights</a>
          <a href={`${BASE_URL}/#positions`}>Positions</a>
          <a href={`${BASE_URL}/#reviews`}>Reviews</a>
          <a href={`${BASE_URL}/#contact`}>Contact</a>
          <a href={`${BASE_URL}/#top`}>Top</a>
          <a className={styles.searchCareers} href={`${BASE_URL}/#positions`}>Search Careers</a>
        </nav>
      </div>
    </header>
  );
}
