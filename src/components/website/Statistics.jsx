import { motion } from 'framer-motion'
import useCounter from '../../hooks/useCounter.js'

const STATS = [
  { end: '50000', suffix: '+', label: 'Monthly Capacity', sub: 'Pieces' },
  { end: '12', suffix: '+', label: 'Wash Techniques', sub: 'Finishing Types' },
  { end: '10', suffix: '+', label: 'Years Experience', sub: 'In Business' },
  { end: '99', suffix: '%', label: 'QC Success Rate', sub: 'Pass Rate' },
  { end: '24', suffix: ' Hr', label: 'Quote Response', sub: 'Turnaround' },
]

function StatItem({ stat, index }) {
  const { ref, display } = useCounter(stat.end + stat.suffix, 2000)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="text-center"
    >
      <div className="text-4xl md:text-5xl font-bold text-gold mb-2">{display}</div>
      <div className="text-white font-medium mb-1">{stat.label}</div>
      <div className="text-white/40 text-sm">{stat.sub}</div>
    </motion.div>
  )
}

export default function Statistics() {
  return (
    <section className="section-padding bg-navy relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20" />
      <div className="container-wide relative">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
          {STATS.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
