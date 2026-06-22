import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Check } from 'lucide-react'
import { slideInLeft, slideInRight } from '../../lib/animations.js'
import { IMAGES } from '../../lib/images.js'

const FEATURES = [
  'Industrial Washing Machines',
  'Laser Technology',
  'Ozone Finishing',
  'Hydro Extractors',
  'Shade Matching Lab',
  'Quality Control Stations',
  'Hand Finishing Stations',
  'Garment Dyeing Units',
]

export default function Factory() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="factory" className="section-padding bg-surface" ref={ref}>
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div variants={slideInLeft} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <span className="eyebrow">Our Facility</span>
            <h2 className="heading-section mb-6">Industrial-Grade Wash Floor</h2>
            <p className="text-navy/60 text-lg leading-relaxed mb-10">
              Purpose-built for garment processing at scale. Our Howrah facility houses
              the equipment and expertise that leading apparel brands trust for their
              washing and finishing operations.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {FEATURES.map((feature, i) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white border border-navy/5 hover:border-gold/30 hover:shadow-sm transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded-lg bg-navy flex items-center justify-center flex-shrink-0">
                    <Check size={14} className="text-gold" />
                  </div>
                  <span className="text-navy text-sm font-medium">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-premium aspect-[4/3]">
              <img src={IMAGES.factory} alt="Denim jeans wash and finishing" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-navy text-white p-5 rounded-xl shadow-elevated hidden md:block">
              <div className="text-2xl font-bold text-gold">Howrah</div>
              <div className="text-sm text-white/60">West Bengal, India</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
