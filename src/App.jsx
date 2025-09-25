import { useState, useEffect } from 'react'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Specialties from './components/Specialties.jsx'
import Process from './components/Process.jsx'
import Contact from './components/Contact.jsx'

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav className={`nav ${isScrolled ? 'nav--scrolled' : ''}`}>
        <div className="container">
          <div className="nav__brand">Denim Gartex</div>
          <div className="nav__links">
            <a href="#about" className="nav__link">About</a>
            <a href="#specialties" className="nav__link">Specialties</a>
            <a href="#process" className="nav__link">Process</a>
            <a href="#contact" className="nav__link">Contact</a>
          </div>
        </div>
      </nav>
      
      <Hero />
      
      <main>
        <About />
        <Specialties />
        <Process />
        <Contact />
      </main>
      
      <footer className="footer">
        <div className="container">
          <div className="footer__content">
            <div className="footer__brand">
              <h3>Denim Gartex</h3>
              <p>Premium denim processing solutions for the modern textile industry</p>
            </div>
            <div className="footer__links">
              <div className="footer__section">
                <h4>Services</h4>
                <ul>
                  <li>Dyeing</li>
                  <li>Acid Treatment</li>
                  <li>Enzyme Processing</li>
                  <li>Value-added Processes</li>
                </ul>
              </div>
              <div className="footer__section">
                <h4>Contact Info</h4>
                <p>+91 90883 34850</p>
                <p>amiya.acp1376@gmail.com</p>
              </div>
            </div>
          </div>
          <div className="footer__bottom">
            <small>© {new Date().getFullYear()} Denim Gartex. All rights reserved.</small>
          </div>
        </div>
      </footer>
      
      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/919088334850?text=Hi%20Denim%20Gartex,%20I%20would%20like%20to%20know%20more%20about%20your%20denim%20processing%20services." 
        target="_blank" 
        rel="noopener noreferrer" 
        className="whatsapp-float"
        aria-label="Chat with us on WhatsApp"
      >
        <div className="whatsapp-icon">💬</div>
        <div className="whatsapp-tooltip">Chat with us!</div>
      </a>
    </>
  )
}
