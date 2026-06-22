import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import useActiveSection from '../../hooks/useActiveSection.js'

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'process', label: 'Process' },
  { id: 'why-us', label: 'Why Us' },
  { id: 'factory', label: 'Factory' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useActiveSection(LINKS.map((l) => l.id))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-sm border-b border-navy/5 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container-wide flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-navy rounded-lg flex items-center justify-center group-hover:bg-gold transition-colors duration-300">
              <span className="text-gold group-hover:text-navy font-bold text-sm tracking-tight transition-colors">DG</span>
            </div>
            <div>
              <span className={`block font-bold text-sm tracking-tight ${scrolled ? 'text-navy' : 'text-white'}`}>
                Denim Gartex
              </span>
              <span className={`block text-[10px] uppercase tracking-widest ${scrolled ? 'text-navy/50' : 'text-white/50'}`}>
                Garment Washing
              </span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`relative text-sm font-medium transition-colors duration-300 ${
                  scrolled ? 'text-navy/70 hover:text-navy' : 'text-white/70 hover:text-white'
                } ${active === link.id ? (scrolled ? 'text-navy' : 'text-white') : ''}`}
              >
                {link.label}
                {active === link.id && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold rounded-full"
                  />
                )}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className={`hidden sm:inline-flex btn-primary !py-2.5 !px-5 !text-xs ${
                !scrolled ? '!bg-white !text-navy hover:!bg-gold' : ''
              }`}
            >
              Get Quote
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className={`lg:hidden p-2 rounded-lg ${scrolled ? 'text-navy' : 'text-white'}`}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <div className="absolute inset-0 bg-navy-dark/80 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white p-8 flex flex-col"
            >
              <div className="flex justify-between items-center mb-10">
                <span className="font-bold text-navy">Menu</span>
                <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu">
                  <X size={24} className="text-navy" />
                </button>
              </div>
              <nav className="flex flex-col gap-1 flex-1">
                {LINKS.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={() => setMenuOpen(false)}
                    className="py-3 text-lg font-medium text-navy border-b border-navy/5"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <a href="#contact" onClick={() => setMenuOpen(false)} className="btn-primary w-full text-center mt-6">
                Request Production Quote
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
