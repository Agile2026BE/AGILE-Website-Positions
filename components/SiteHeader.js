import styles from "./SiteHeader.module.css";

export default function SiteHeader() {
  return (
    <header className={`site-header ${styles.header}`}>
      <div className={`container site-header-inner ${styles.inner}`}>
        <a
          className={`brand ${styles.brand}`}
          href="#top"
          aria-label="AGILE Careers home"
        >
          AGILE
        </a>
        <nav className={`site-nav ${styles.nav}`} aria-label="Primary navigation">
          <a href="#positions">Positions</a>
          <a href="#reviews">Reviews</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  );
}
