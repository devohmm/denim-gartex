import { motion } from 'framer-motion'

const BRANDS = [
  'Leading Apparel Brands',
  'Export Houses',
  'Fashion Manufacturers',
  'Private Labels',
  'Denim Labels',
  'Garment Exporters',
  'Boutique Brands',
  'Stitching Units',
]

export default function TrustBar() {
  const items = [...BRANDS, ...BRANDS]

  return (
    <section id="trust" className="bg-white border-y border-navy/5 py-8 overflow-hidden">
      <div className="container-wide mb-6">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-navy/40">
          Trusted By
        </p>
      </div>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />
        <motion.div
          className="flex gap-16 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          {items.map((brand, i) => (
            <span
              key={`${brand}-${i}`}
              className="text-navy/30 font-semibold text-sm md:text-base uppercase tracking-widest flex-shrink-0"
            >
              {brand}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
