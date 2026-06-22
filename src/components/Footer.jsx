const FOOTER_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#capabilities', label: 'Capabilities' },
  { href: '#specialties', label: 'Services' },
  { href: '#process', label: 'Process' },
  { href: '#quality', label: 'Quality' },
  { href: '#contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__brand">
            <div className="footer__logo">
              <span className="nav__brand-icon">DG</span>
              <h3>Denim Gartex</h3>
            </div>
            <p>Premium garment washing & finishing for brands, exporters, and stitching units across India.</p>
            <div className="footer__contact-quick">
              <a href="tel:+917980433091">+91 79804 33091</a>
              <a href="mailto:hariompandey157@gmail.com">hariompandey157@gmail.com</a>
            </div>
          </div>

          <div className="footer__links">
            <div className="footer__section">
              <h4>Quick Links</h4>
              <ul>
                {FOOTER_LINKS.map((link) => (
                  <li key={link.href}><a href={link.href}>{link.label}</a></li>
                ))}
              </ul>
            </div>
            <div className="footer__section">
              <h4>Services</h4>
              <ul>
                <li>Dyeing & Overdye</li>
                <li>Acid & Enzyme Wash</li>
                <li>Laser & Ozone Finishing</li>
                <li>Stone Wash & Hand Sand</li>
              </ul>
            </div>
            <div className="footer__section">
              <h4>Location</h4>
              <p>
                Mishra Pada, Dotalla, Bankra,<br />
                Near Rail Line, Howrah – 711403<br />
                West Bengal, India
              </p>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <small>© {new Date().getFullYear()} Denim Gartex. All rights reserved.</small>
          <small>Specialists in denim dyeing, acid, enzyme & value-added processing</small>
        </div>
      </div>
    </footer>
  )
}
