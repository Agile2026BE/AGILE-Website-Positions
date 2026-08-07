export default function HeroSection() {
  return (
    <section className="hero" id="top">
      <div className="container hero-inner">
        <p className="hero-eyebrow">SPECIALIZED AEC RECRUITING</p>
        <h1 className="hero-title">
          The details professionals need.
          <br />
          <em>Before</em> they apply.
        </h1>
        <p className="hero-copy">
          Explore career opportunities across MEP Consulting and Building Systems,
          Civil Infrastructure, Water and Wastewater, Transportation, Aviation, Rail
          and Transit, Commissioning, Mission Critical, and Data Centers.
        </p>
        <div className="hero-actions">
          <a className="hero-primary" href="#positions">Explore Positions</a>
          <a className="hero-secondary" href="#contact">Start a Conversation</a>
        </div>
        <div className="hero-badges" aria-label="Career search details">
          <span>✓ Salary disclosed</span>
          <span>✓ Location disclosed</span>
          <span>✓ Work schedule disclosed</span>
          <span>✓ No account required</span>
        </div>
      </div>
    </section>
  );
}
