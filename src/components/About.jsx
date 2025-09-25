export default function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about__content">
          <div className="about__text">
            <h2>About Denim Gartex</h2>
            <p className="about__lead">
              We are a specialized denim processing unit with over a decade of expertise in transforming raw denim into premium finished products. Our state-of-the-art facility in Howrah is equipped with cutting-edge machinery and staffed by skilled professionals.
            </p>
            <div className="about__features">
              <div className="feature">
                <div className="feature__icon">🏭</div>
                <h3>Modern Facility</h3>
                <p>State-of-the-art processing equipment and quality control systems</p>
              </div>
              <div className="feature">
                <div className="feature__icon">👥</div>
                <h3>Expert Team</h3>
                <p>Experienced professionals with deep knowledge of denim processing</p>
              </div>
              <div className="feature">
                <div className="feature__icon">✨</div>
                <h3>Quality Focus</h3>
                <p>Rigorous quality control ensuring consistent, premium results</p>
              </div>
            </div>
          </div>
          <div className="about__stats">
            <div className="stat">
              <div className="stat__number">10+</div>
              <div className="stat__label">Years Experience</div>
            </div>
            <div className="stat">
              <div className="stat__number">1000+</div>
              <div className="stat__label">Projects Completed</div>
            </div>
            <div className="stat">
              <div className="stat__number">50+</div>
              <div className="stat__label">Happy Clients</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

