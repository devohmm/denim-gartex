import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Zap, Sparkles, Wind, FlaskConical, Droplets, Hand } from 'lucide-react'
import { fadeUp, staggerContainer } from '../../lib/animations.js'
import { IMAGES } from '../../lib/images.js'

const SERVICES = [
  {
    icon: Zap,
    title: 'Laser Finishing',
    desc: 'Precision laser distressing for consistent whiskers, abrasions, and hole patterns at production scale.',
    image: IMAGES.jeansStack,
    color: 'from-navy to-navy-light',
  },
  {
    icon: Sparkles,
    title: 'Whisker Effects',
    desc: 'Hand-crafted whisker patterns and knee abrasions that give each garment authentic character.',
    image: IMAGES.jeansModel,
    color: 'from-navy-dark to-navy',
  },
  {
    icon: Wind,
    title: 'Ozone Wash',
    desc: 'Water-efficient ozone bleaching for eco-conscious brands seeking sustainable garment finishing.',
    image: IMAGES.denimWash,
    color: 'from-navy to-navy-light',
  },
  {
    icon: FlaskConical,
    title: 'Acid Wash',
    desc: 'Vintage acid treatments creating marble effects, light washes, and worn-in aesthetics on finished garments.',
    image: IMAGES.denimTexture,
    color: 'from-navy-dark to-navy',
  },
  {
    icon: Droplets,
    title: 'Enzyme Wash',
    desc: 'Soft, lived-in hand-feel on stitched pieces using sustainable cellulase bio-wash treatments.',
    image: IMAGES.denimStack,
    color: 'from-navy to-navy-light',
  },
  {
    icon: Hand,
    title: 'Hand Finishing',
    desc: 'Artisan hand-sanding, scraping, and detail work for premium boutique and export-grade finishes.',
    image: IMAGES.jeansFolded,
    color: 'from-navy-dark to-navy',
  },
]

function ServicePanel({ service, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const Icon = service.icon

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      custom={index}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className="group relative overflow-hidden rounded-2xl bg-navy-dark min-h-[260px] sm:min-h-[320px] cursor-default"
    >
      <img
        src={service.image}
        alt={service.title}
        className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
      />
      <div className={`absolute inset-0 bg-gradient-to-t ${service.color} via-navy-dark/80 to-navy-dark/60`} />

      <div className="relative z-10 p-6 sm:p-8 h-full flex flex-col justify-end">
        <div className="w-14 h-14 rounded-xl bg-gold/20 backdrop-blur-sm border border-gold/30 flex items-center justify-center mb-6 group-hover:bg-gold group-hover:scale-110 transition-all duration-300">
          <Icon className="text-gold group-hover:text-navy-dark transition-colors" size={24} />
        </div>
        <h3 className="text-white font-semibold text-xl mb-2">{service.title}</h3>
        <p className="text-white/60 text-sm leading-relaxed max-w-sm">{service.desc}</p>
      </div>
    </motion.div>
  )
}

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="services" className="section-padding bg-surface" ref={ref}>
      <div className="container-wide">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="max-w-2xl mb-16"
        >
          <span className="eyebrow">Our Expertise</span>
          <h2 className="heading-section mb-4">Premium Garment Finishing Services</h2>
          <p className="text-navy/60 text-lg">
            Every wash, design effect, and finish applied directly on your stitched garments —
            the craftsmanship that defines your brand.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {SERVICES.map((service, i) => (
            <ServicePanel key={service.title} service={service} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
