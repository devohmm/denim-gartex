import { motion } from 'framer-motion'
import { ArrowRight, Phone } from 'lucide-react'

export default function FinalCTA() {
  return (
    <section className="relative py-28 md:py-36 overflow-hidden">
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
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl text-white leading-tight mb-6 max-w-3xl mx-auto">
            Ready to Scale Your Garment Production?
          </h2>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Send us your stitched garments and receive retail-ready products
            with world-class washing and finishing.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#contact" className="btn-primary group">
              Get Production Quote
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="tel:+917980433091" className="btn-outline group">
              <Phone size={16} />
              Contact Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
