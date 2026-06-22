import useScrollAnimation from '../hooks/useScrollAnimation.js'

export default function Hero() {
  const ref = useScrollAnimation()

  return (
    <header className="hero" ref={ref}>
      <div className="hero__background">
        <div className="hero__image">
          <div className="hero__overlay" />
        </div>
        <div className="hero__pattern" />
        <div className="hero__glow hero__glow--1" />
        <div className="hero__glow hero__glow--2" />
      </div>
      <div className="container">
        <div className="hero__layout">
          <div className="hero__content">
            <div className="hero__badge animate-on-scroll">
              <span className="badge__dot" />
              Garment Washing & Finishing Specialists
            </div>
            <h1 className="hero__title animate-on-scroll">
              <span className="hero__title--main">Denim Gartex</span>
              <span className="hero__title--sub">We Turn Stitched Jeans Into Finished Brands</span>
            </h1>
            <p className="hero__description animate-on-scroll">
              Send us your stitched denim garments — we handle washing, color, whiskers, distressing,
              laser effects, and every design finish. Like Levi's after stitching, before the store shelf.
            </p>
            <div className="hero__actions animate-on-scroll">
              <a href="#contact" className="btn btn--primary btn--lg">
                Send Garments for Processing
              </a>
              <a href="#workflow" className="btn btn--secondary btn--lg">
                See How It Works
              </a>
            </div>
            <div className="hero__stats animate-on-scroll">
              <div className="hero__stat">
                <span className="hero__stat--number">50K+</span>
                <span className="hero__stat--label">Pieces / Month</span>
              </div>
              <div className="hero__stat">
                <span className="hero__stat--number">10+</span>
                <span className="hero__stat--label">Years Experience</span>
              </div>
              <div className="hero__stat">
                <span className="hero__stat--number">50+</span>
                <span className="hero__stat--label">Brand Partners</span>
              </div>
              <div className="hero__stat">
                <span className="hero__stat--number">12+</span>
                <span className="hero__stat--label">Wash Types</span>
              </div>
            </div>
          </div>

          <div className="hero__visual animate-on-scroll" aria-hidden="true">
            <div className="hero__card-stack">
              <div className="hero__process-card hero__process-card--1">
                <span className="hero__process-icon">👖</span>
                <div>
                  <strong>Stitched Garments In</strong>
                  <small>From your brand or stitching unit</small>
                </div>
              </div>
              <div className="hero__process-arrow">↓</div>
              <div className="hero__process-card hero__process-card--2">
                <span className="hero__process-icon">🎨</span>
                <div>
                  <strong>Wash · Color · Design</strong>
                  <small>Acid, enzyme, laser, whiskers & more</small>
                </div>
              </div>
              <div className="hero__process-arrow">↓</div>
              <div className="hero__process-card hero__process-card--3">
                <span className="hero__process-icon">🏷️</span>
                <div>
                  <strong>Finished Pieces Out</strong>
                  <small>QC passed, ready for retail</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a href="#about" className="hero__scroll" aria-label="Scroll to content">
        <span>Scroll</span>
        <span className="hero__scroll-arrow">↓</span>
      </a>
    </header>
  )
}
