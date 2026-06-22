import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { fadeUp, staggerContainer } from '../../lib/animations.js'

import { IMAGES } from '../../lib/images.js'

const STATS = [
  { value: '50,000+', label: 'Pieces Per Month' },
  { value: '10+', label: 'Years Experience' },
  { value: '12+', label: 'Wash Types' },
  { value: '99%', label: 'QC Pass Rate' },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={IMAGES.hero} alt="Denim jeans garment washing factory" className="w-full h-full object-cover scale-105" />
        <div className="absolute inset-0 bg-gradient-to-br from-navy-dark/95 via-navy/90 to-navy-dark/85" />
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-40" />
        {/* Animated particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gold/30 rounded-full"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ opacity: [0.2, 0.8, 0.2], y: [0, -30, 0] }}
            transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 2 }}
          />
        ))}
      </div>

      <div className="relative z-10 container-wide w-full pt-28 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.span variants={fadeUp} className="eyebrow !text-gold-light">
              Trusted by Apparel Brands Across India
            </motion.span>

            <motion.h1 variants={fadeUp} custom={1} className="heading-display mb-6">
              WE DON&apos;T MAKE JEANS.
              <br />
              WE MAKE THEM{' '}
              <span className="text-gold relative">
                RETAIL READY.
                <motion.span
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gold/40 rounded"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                />
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} custom={2} className="text-white/70 text-lg leading-relaxed max-w-xl mb-10">
              Garment washing, denim finishing, laser effects, whiskers, ozone treatments,
              color development, and piece-level quality control for leading apparel manufacturers.
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-4">
              <a href="#contact" className="btn-primary group">
                Request Production Quote
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#process" className="btn-outline">
                Explore Our Process
              </a>
            </motion.div>
          </motion.div>

          {/* Floating glass stats */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:grid grid-cols-2 gap-4"
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.15 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`glass-card p-6 ${i === 0 ? 'col-span-2' : ''}`}
              >
                <div className="text-3xl font-bold text-gold mb-1">{stat.value}</div>
                <div className="text-white/60 text-sm font-medium uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Mobile stats */}
        <div className="lg:hidden grid grid-cols-2 gap-3 mt-12">
          {STATS.map((stat) => (
            <div key={stat.label} className="glass-card p-4 text-center">
              <div className="text-xl font-bold text-gold">{stat.value}</div>
              <div className="text-white/50 text-xs uppercase tracking-wider mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <motion.a
        href="#trust"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ChevronDown size={20} />
        </motion.div>
      </motion.a>
    </section>
  )
}
