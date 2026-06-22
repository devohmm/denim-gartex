import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#capabilities', label: 'Capabilities' },
  { href: '#specialties', label: 'Services' },
  { href: '#process', label: 'Process' },
  { href: '#quality', label: 'Quality' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} aria-hidden="true" />
      <nav className={`nav ${isScrolled ? 'nav--scrolled' : ''}`}>
        <div className="container nav__inner">
          <a href="#" className="nav__brand" onClick={closeMenu}>
            <span className="nav__brand-icon">DG</span>
            <span className="nav__brand-text">
              Denim Gartex
              <small>Garment Washing</small>
            </span>
          </a>

          <div className="nav__links nav__links--desktop">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="nav__link">{link.label}</a>
            ))}
          </div>

          <div className="nav__actions">
            <a href="#contact" className="nav__cta">Get Quote</a>
            <button
              type="button"
              className={`nav__toggle ${menuOpen ? 'nav__toggle--open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      <div className={`nav__mobile ${menuOpen ? 'nav__mobile--open' : ''}`}>
        <div className="nav__mobile-backdrop" onClick={closeMenu} aria-hidden="true" />
        <div className="nav__mobile-panel">
          <div className="nav__mobile-header">
            <span className="nav__brand-text">Menu</span>
            <button type="button" className="nav__close" onClick={closeMenu} aria-label="Close menu">×</button>
          </div>
          <div className="nav__mobile-links">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="nav__mobile-link" onClick={closeMenu}>
                {link.label}
              </a>
            ))}
          </div>
          <a href="#contact" className="btn btn--primary nav__mobile-cta" onClick={closeMenu}>
            Request a Quote
          </a>
        </div>
      </div>
    </>
  )
}
