import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { X, Check } from 'lucide-react'

const TYPICAL = [
  'Delayed Delivery',
  'Inconsistent Shades',
  'Weak QC',
  'Limited Wash Options',
  'No Piece Tracking',
  'Poor Communication',
]

const GARTEX = [
  'Piece-Level QC',
  'Consistent Color Matching',
  'Fast Turnaround',
  'Advanced Finishing',
  'Dedicated Team',
  'Export-Grade Standards',
]

export default function WhyChooseUs() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="why-us" className="section-padding bg-white" ref={ref}>
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="eyebrow">Why Choose Us</span>
          <h2 className="heading-section">The Denim Gartex Difference</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="p-8 rounded-2xl border border-navy/10 bg-surface"
          >
            <h3 className="text-navy/40 font-semibold text-sm uppercase tracking-widest mb-8">
              Typical Washing Vendor
            </h3>
            <ul className="space-y-4">
              {TYPICAL.map((item) => (
                <li key={item} className="flex items-center gap-3 text-navy/50">
                  <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                    <X size={14} className="text-red-400" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="p-8 rounded-2xl bg-navy text-white shadow-premium relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-gold/10 rounded-full blur-3xl" />
            <h3 className="text-gold font-semibold text-sm uppercase tracking-widest mb-8 relative">
              Denim Gartex
            </h3>
            <ul className="space-y-4 relative">
              {GARTEX.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                    <Check size={14} className="text-gold" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
