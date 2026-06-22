import useScrollAnimation from '../hooks/useScrollAnimation.js'

const TESTIMONIALS = [
  {
    quote: 'We send stitched jeans from our unit — they return with perfect wash, whiskers, and color. Piece count always matches.',
    author: 'Rajesh M.',
    role: 'Production Manager, Kolkata Garment Exporter',
    rating: 5,
  },
  {
    quote: 'Fast turnaround on enzyme washes and competitive pricing. We have been working with them for 4 years.',
    author: 'Priya S.',
    role: 'Merchandiser, Denim Brand',
    rating: 5,
  },
  {
    quote: 'They handled our acid wash and laser finishing combo perfectly. Professional team and clear communication.',
    author: 'Amit K.',
    role: 'Owner, Boutique Denim Label',
    rating: 5,
  },
]

export default function Testimonials() {
  const ref = useScrollAnimation()

  return (
    <section id="testimonials" className="testimonials" ref={ref}>
      <div className="container">
        <div className="section__header animate-on-scroll">
          <span className="section__eyebrow">Client Trust</span>
          <h2>What Our Partners Say</h2>
          <p>Trusted by garment exporters, brands, and boutique labels across Eastern India.</p>
        </div>

        <div className="testimonials__grid">
          {TESTIMONIALS.map((t, i) => (
            <blockquote key={i} className="testimonial-card animate-on-scroll">
              <div className="testimonial-card__stars" aria-label={`${t.rating} out of 5 stars`}>
                {'★'.repeat(t.rating)}
              </div>
              <p>"{t.quote}"</p>
              <footer>
                <strong>{t.author}</strong>
                <span>{t.role}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
