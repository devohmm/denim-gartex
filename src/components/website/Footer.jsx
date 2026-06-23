import SectionLink from './SectionLink.jsx'

export default function Footer() {
  const links = [
    { section: 'about', label: 'About' },
    { section: 'services', label: 'Services' },
    { section: 'process', label: 'Process' },
    { section: 'factory', label: 'Factory' },
    { section: 'gallery', label: 'Gallery' },
    { section: 'contact', label: 'Contact' },
  ]

  return (
    <footer className="bg-navy-dark text-white py-12 sm:py-16 pb-24 sm:pb-16">
      <div className="container-wide">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center">
                <span className="text-navy-dark font-bold text-sm">DG</span>
              </div>
              <div>
                <span className="font-bold">Denim Gartex</span>
                <span className="block text-[10px] uppercase tracking-widest text-white/40">Garment Washing</span>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-4">
              Premium garment washing and finishing for apparel brands, export houses, and manufacturers across India.
            </p>
            <a href="tel:+917980433091" className="text-gold text-sm hover:text-gold-light transition-colors">
              +91 79804 33091
            </a>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-gold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {links.map((l) => (
                <li key={l.section}>
                  <SectionLink section={l.section} className="text-white/50 text-sm hover:text-white transition-colors">
                    {l.label}
                  </SectionLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-gold mb-4">Location</h4>
            <p className="text-white/50 text-sm leading-relaxed">
              Mishra Pada, Dotalla, Bankra,<br />
              Near Rail Line, Howrah – 711403<br />
              West Bengal, India
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between gap-2 text-white/30 text-xs">
          <span>© {new Date().getFullYear()} Denim Gartex. All rights reserved.</span>
          <span className="text-center sm:text-left">Garment Washing · Denim Finishing · Export-Grade QC</span>
        </div>
      </div>
    </footer>
  )
}
