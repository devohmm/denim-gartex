import useScrollAnimation from '../hooks/useScrollAnimation.js'

export default function About() {
  const ref = useScrollAnimation()

  return (
    <section id="about" className="about" ref={ref}>
      <div className="container">
        <div className="about__content">
          <div className="about__text">
            <span className="section__eyebrow animate-on-scroll">Who We Are</span>
            <h2 className="animate-on-scroll">Your Partner After Stitching — Before Retail</h2>
            <p className="about__lead animate-on-scroll">
              Denim Gartex is a garment washing and finishing factory in Howrah, West Bengal.
              Brands and manufacturers send us <strong>stitched denim pieces</strong> — jeans, jackets, shorts —
              and we apply every wash, color, and design effect to make them retail-ready.
              Think of us as the step between your stitching floor and the store shelf.
            </p>
            <div className="about__features">
              <div className="feature animate-on-scroll">
                <div className="feature__icon-wrap">🏭</div>
                <div>
                  <h3>Full Wash Floor</h3>
                  <p>Industrial washing, dyeing, laser, ozone & hand-finishing lines for garment processing</p>
                </div>
              </div>
              <div className="feature animate-on-scroll">
                <div className="feature__icon-wrap">🎨</div>
                <div>
                  <h3>Design & Color Team</h3>
                  <p>Whiskers, abrasions, tints, overdye — we recreate any wash look on your garments</p>
                </div>
              </div>
              <div className="feature animate-on-scroll">
                <div className="feature__icon-wrap">📦</div>
                <div>
                  <h3>Piece-by-Piece QC</h3>
                  <p>Every garment inspected, counted, and packed before dispatch back to you</p>
                </div>
              </div>
            </div>
          </div>
          <div className="about__visual animate-on-scroll">
            <div className="about__card about__card--primary">
              <span className="about__card-number">10+</span>
              <span className="about__card-label">Years in Business</span>
            </div>
            <div className="about__card about__card--secondary">
              <span className="about__card-number">50K+</span>
              <span className="about__card-label">Pieces / Month Capacity</span>
            </div>
            <div className="about__card about__card--accent">
              <span className="about__card-number">24hr</span>
              <span className="about__card-label">Quote Response Time</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
