import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Package, Beaker, Droplets, Palette, ShieldCheck, Box, Truck } from 'lucide-react'

const STEPS = [
  { icon: Package, title: 'Garments Received', desc: 'Stitched pieces logged and inspected' },
  { icon: Beaker, title: 'Sampling', desc: 'Wash recipe developed on sample garment' },
  { icon: Droplets, title: 'Washing', desc: 'Bulk processing in industrial washers' },
  { icon: Palette, title: 'Color Development', desc: 'Dyeing, tinting, and shade matching' },
  { icon: ShieldCheck, title: 'Quality Check', desc: 'Piece-level inspection and approval' },
  { icon: Box, title: 'Packing', desc: 'Counted, tagged, and boxed' },
  { icon: Truck, title: 'Dispatch', desc: 'On-time delivery with documentation' },
]

function MobileStep({ step, index, inView, isLast }) {
  const Icon = step.icon

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
      className="flex gap-4"
    >
      <div className="flex flex-col items-center">
        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
          <Icon className="text-gold" size={22} />
        </div>
        {!isLast && <div className="w-px flex-1 bg-white/10 my-2 min-h-[24px]" />}
      </div>
      <div className={`flex-1 ${isLast ? 'pb-0' : 'pb-6'}`}>
        <h4 className="text-white font-semibold text-base mb-1">{step.title}</h4>
        <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
      </div>
    </motion.div>
  )
}

function DesktopStep({ step, index, inView }) {
  const Icon = step.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
      className="text-center group"
    >
      <div className="relative mx-auto w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:bg-gold group-hover:border-gold transition-all duration-300">
        <Icon className="text-gold group-hover:text-navy-dark transition-colors" size={24} />
      </div>
      <h4 className="text-white font-semibold text-sm mb-1">{step.title}</h4>
      <p className="text-white/40 text-xs leading-relaxed">{step.desc}</p>
    </motion.div>
  )
}

export default function Process() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="process" className="section-padding bg-navy-dark overflow-hidden" ref={ref}>
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-12 md:mb-20"
        >
          <span className="eyebrow">Our Process</span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-4">
            From Stitched Garment to Retail Shelf
          </h2>
          <p className="text-white/50 text-base sm:text-lg">
            A traceable, systematic workflow built for apparel brands who demand consistency at scale.
          </p>
        </motion.div>

        {/* Mobile & tablet: vertical timeline */}
        <div className="lg:hidden max-w-md mx-auto">
          {STEPS.map((step, i) => (
            <MobileStep
              key={step.title}
              step={step}
              index={i}
              inView={inView}
              isLast={i === STEPS.length - 1}
            />
          ))}
        </div>

        {/* Desktop: horizontal flow */}
        <div className="relative hidden lg:block">
          <div className="absolute top-10 left-[7%] right-[7%] h-px bg-white/10">
            <motion.div
              className="h-full bg-gold origin-left"
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          <div className="grid grid-cols-7 gap-4">
            {STEPS.map((step, i) => (
              <DesktopStep key={step.title} step={step} index={i} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
