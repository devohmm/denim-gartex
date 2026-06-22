import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

// Placeholder testimonials — replace with real client feedback later
const TESTIMONIALS = [
  {
    quote: 'Consistent wash quality across every bulk lot. Piece counts match and shade consistency is excellent batch after batch.',
    name: 'Test Client A',
    company: 'Sample Apparel Co.',
    role: 'Production Manager',
  },
  {
    quote: 'We send stitched jeans from our unit — they return with perfect wash, whiskers, and color. Reliable turnaround every season.',
    name: 'Test Client B',
    company: 'Demo Denim Labels',
    role: 'Merchandising Head',
  },
  {
    quote: 'Acid wash and laser finishing done exactly to our sample. Professional team and clear communication throughout the order.',
    name: 'Test Client C',
    company: 'Example Garments Pvt. Ltd.',
    role: 'Operations Director',
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % TESTIMONIALS.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const t = TESTIMONIALS[current]

  return (
    <section className="section-padding bg-surface">
      <div className="container-wide max-w-4xl">
        <div className="text-center mb-16">
          <span className="eyebrow">Client Trust</span>
          <h2 className="heading-section">What Our Partners Say</h2>
          <p className="text-navy/40 text-sm mt-3">Sample feedback — real client testimonials coming soon</p>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-10 md:p-14 shadow-elevated border border-navy/5 text-center relative"
            >
              <Quote className="text-gold/30 mx-auto mb-8" size={48} />
              <p className="text-navy text-xl md:text-2xl leading-relaxed font-display mb-10">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <p className="font-semibold text-navy">{t.name}</p>
                <p className="text-navy/50 text-sm mt-1">{t.role}, {t.company}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              type="button"
              onClick={() => setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
              className="w-10 h-10 rounded-full border border-navy/10 flex items-center justify-center hover:bg-navy hover:text-white transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === current ? 'bg-gold w-6' : 'bg-navy/20'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setCurrent((c) => (c + 1) % TESTIMONIALS.length)}
              className="w-10 h-10 rounded-full border border-navy/10 flex items-center justify-center hover:bg-navy hover:text-white transition-colors"
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
