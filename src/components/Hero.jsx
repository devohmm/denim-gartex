export default function Hero() {
  return (
    <header className="hero">
      <div className="hero__background">
        <div className="hero__image">
          <div className="hero__overlay"></div>
        </div>
        <div className="hero__pattern"></div>
      </div>
      <div className="container">
        <div className="hero__content">
          <div className="hero__badge">
            <span className="badge__icon">🏭</span>
            Premium Denim Processing
          </div>
          <h1 className="hero__title">
            <span className="hero__title--main">Denim Gartex</span>
            <span className="hero__title--sub">Manufacturing Excellence</span>
          </h1>
          <p className="hero__description">
            Specialized denim processing unit delivering premium quality through advanced dyeing, 
            acid treatment, enzyme processing, and value-added finishing solutions.
          </p>
          <div className="hero__actions">
            <a href="#contact" className="btn btn--primary">
              <span className="btn__icon">📞</span>
              Get Quote
            </a>
            <a href="#process" className="btn btn--secondary">
              <span className="btn__icon">⚙️</span>
              Our Process
            </a>
          </div>
          <div className="hero__stats">
            <div className="hero__stat">
              <div className="stat__icon">📅</div>
              <span className="hero__stat--number">10+</span>
              <span className="hero__stat--label">Years</span>
            </div>
            <div className="hero__stat">
              <div className="stat__icon">🎯</div>
              <span className="hero__stat--number">1000+</span>
              <span className="hero__stat--label">Projects</span>
            </div>
            <div className="hero__stat">
              <div className="stat__icon">👥</div>
              <span className="hero__stat--number">50+</span>
              <span className="hero__stat--label">Clients</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
