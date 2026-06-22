import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const FAQS = [
  {
    q: 'Do you process fabric rolls or stitched garments?',
    a: 'We process stitched garments only — jeans, jackets, shorts, and other denim pieces. You send stitched items from your stitching unit, and we return washed, finished garments ready for tagging and retail.',
  },
  {
    q: 'What is your minimum order quantity?',
    a: 'We accept sample lots from 50 pieces for wash development. Bulk orders typically start at 500 pieces. Contact us for your specific volume requirements.',
  },
  {
    q: 'How long does garment washing take?',
    a: 'Standard turnaround is 7–14 working days depending on wash type and piece count. Rush orders can be arranged for seasonal deadlines with prior notice.',
  },
  {
    q: 'Can you match a reference wash sample?',
    a: 'Yes. Send us a reference garment or wash swatch — we develop the exact look on your stitched pieces with sample approval before bulk processing begins.',
  },
  {
    q: 'What garment types can you wash?',
    a: 'Jeans, jackets, shirts, shorts, skirts — any stitched denim garment. We handle rigid, stretch, and blended denim in all standard weights.',
  },
  {
    q: 'How do I get a production quote?',
    a: 'Fill out our contact form with piece count, garment type, and desired wash — or WhatsApp us directly. We respond within 24 hours with a detailed quote.',
  },
]

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className="border-b border-navy/10 last:border-0">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-6 text-left group"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-navy group-hover:text-gold-dark transition-colors pr-4">
          {item.q}
        </span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
          isOpen ? 'bg-gold text-navy-dark' : 'bg-surface text-navy/40'
        }`}>
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-navy/60 leading-relaxed pr-12">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="section-padding bg-white">
      <div className="container-wide max-w-3xl">
        <div className="text-center mb-16">
          <span className="eyebrow">FAQ</span>
          <h2 className="heading-section">Frequently Asked Questions</h2>
        </div>

        <div className="bg-surface rounded-2xl px-8 md:px-10">
          {FAQS.map((item, i) => (
            <FaqItem
              key={i}
              item={item}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
