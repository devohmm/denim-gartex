import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { slideInLeft, slideInRight } from '../../lib/animations.js'
import { IMAGES } from '../../lib/images.js'

const TIMELINE = [
  { step: '01', title: 'Garments Received', desc: 'Stitched pieces counted and inspected at intake' },
  { step: '02', title: 'Wash Development', desc: 'Sample wash approved before bulk processing' },
  { step: '03', title: 'Finishing & Design Effects', desc: 'Whiskers, laser, hand-sand, and color applied' },
  { step: '04', title: 'Quality Inspection', desc: 'Piece-by-piece QC against approved standard' },
  { step: '05', title: 'Packing & Dispatch', desc: 'Counted, tagged, and shipped back to you' },
]

function TimelineItem({ item, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="flex gap-6 group"
    >
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-navy text-gold flex items-center justify-center font-bold text-sm group-hover:bg-gold group-hover:text-navy transition-colors duration-300">
          {item.step}
        </div>
        {index < TIMELINE.length - 1 && (
          <div className="w-px flex-1 bg-navy/10 my-2 min-h-[40px]" />
        )}
      </div>
      <div className="pb-10">
        <h4 className="font-semibold text-navy text-lg mb-1">{item.title}</h4>
        <p className="text-navy/60 text-sm leading-relaxed">{item.desc}</p>
      </div>
    </motion.div>
  )
}

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="section-padding bg-white" ref={ref}>
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-premium">
              <img src={IMAGES.about} alt="Stacked jeans ready for washing and finishing" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/60 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-white/80 text-sm uppercase tracking-widest mb-2">Howrah, West Bengal</p>
                <p className="text-white font-display text-2xl">Jeans Washing & Finishing</p>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-6 -right-6 bg-gold text-navy-dark p-6 rounded-2xl shadow-elevated hidden md:block"
            >
              <div className="text-3xl font-bold">50K+</div>
              <div className="text-sm font-medium opacity-80">Pieces / Month</div>
            </motion.div>
          </motion.div>

          <motion.div variants={slideInRight} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <span className="eyebrow">About Us</span>
            <h2 className="heading-section mb-6">
              Your Manufacturing Partner After Stitching
            </h2>
            <p className="text-navy/60 text-lg leading-relaxed mb-4">
              You stitch the garments.
            </p>
            <p className="text-navy text-xl font-medium leading-relaxed mb-12">
              We transform them into retail-ready products.
            </p>

            <div className="space-y-0">
              {TIMELINE.map((item, i) => (
                <TimelineItem key={item.step} item={item} index={i} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
