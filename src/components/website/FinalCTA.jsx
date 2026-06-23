import { motion } from 'framer-motion'
import { ArrowRight, Phone } from 'lucide-react'
import SectionLink from './SectionLink.jsx'

export default function FinalCTA() {
  return (
    <section className="relative py-20 sm:py-28 md:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-navy-dark" />
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl" />

      <div className="container-wide relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-display text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-white leading-tight mb-6 max-w-3xl mx-auto px-2">
            Ready to Scale Your Garment Production?
          </h2>
          <p className="text-white/60 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2">
            Send us your stitched garments and receive retail-ready products
            with world-class washing and finishing.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 px-4 sm:px-0">
            <SectionLink section="contact" className="btn-primary group w-full sm:w-auto">
              Get Production Quote
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </SectionLink>
            <a href="tel:+917980433091" className="btn-outline group w-full sm:w-auto">
              <Phone size={16} />
              Contact Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
