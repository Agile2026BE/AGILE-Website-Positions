export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <a className="brand" href="#top" aria-label="AGILE Careers home">
          AGILE
        </a>
        <nav className="site-nav" aria-label="Primary navigation">
          <a href="#positions">Positions</a>
          <a href="#reviews">Reviews</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  );
}
