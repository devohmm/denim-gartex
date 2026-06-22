import { useState } from 'react'
import useScrollAnimation from '../hooks/useScrollAnimation.js'

const FAQS = [
  {
    q: 'Do you process fabric rolls or stitched garments?',
    a: 'We process stitched garments only — jeans, jackets, shorts, and other denim pieces. You send stitched items (like after your stitching unit), and we return washed, finished garments ready for tagging and retail.',
  },
  {
    q: 'What is your minimum order quantity (MOQ)?',
    a: 'We accept sample lots from 50 pieces for wash development, and bulk orders typically start at 500 pieces. Contact us for your specific volume.',
  },
  {
    q: 'How long does garment washing take?',
    a: 'Standard turnaround is 7–14 working days depending on wash type and piece count. Rush orders can be arranged for seasonal deadlines.',
  },
  {
    q: 'Can you match a reference wash sample?',
    a: 'Yes. Send us a reference garment or wash swatch — we develop the exact look on your stitched pieces with sample approval before bulk processing.',
  },
  {
    q: 'What garment types can you wash?',
    a: 'Jeans, jackets, shirts, shorts, skirts — any stitched denim garment. We handle rigid, stretch, and blended denim in all standard weights.',
  },
  {
    q: 'How do I get a quote?',
    a: 'Fill out the contact form with piece count, garment type, and desired wash — or WhatsApp us directly. We respond within 24 hours.',
  },
]

export default function FAQ() {
  const ref = useScrollAnimation()
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="faq" ref={ref}>
      <div className="container">
        <div className="faq__layout">
          <div className="faq__intro animate-on-scroll">
            <span className="section__eyebrow">FAQ</span>
            <h2>Common Questions</h2>
            <p>Everything you need to know about sending garments for washing and finishing.</p>
            <a href="#contact" className="btn btn--primary">Still have questions?</a>
          </div>

          <div className="faq__list">
            {FAQS.map((item, i) => (
              <div
                key={i}
                className={`faq-item animate-on-scroll ${openIndex === i ? 'faq-item--open' : ''}`}
              >
                <button
                  type="button"
                  className="faq-item__question"
                  onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                  aria-expanded={openIndex === i}
                >
                  {item.q}
                  <span className="faq-item__icon">{openIndex === i ? '−' : '+'}</span>
                </button>
                <div className="faq-item__answer">
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
