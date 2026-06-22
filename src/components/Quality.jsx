import useScrollAnimation from '../hooks/useScrollAnimation.js'

const STANDARDS = [
  {
    icon: '🌿',
    title: 'Eco-Conscious Washing',
    description: 'Enzyme-based washes and reduced water programs on garments — sustainable chemistry without compromising the wash look.',
  },
  {
    icon: '🔍',
    title: 'Piece-by-Piece QC',
    description: 'Every garment checked at intake, after washing, and before dispatch — counted and matched to your order quantity.',
  },
  {
    icon: '📋',
    title: 'Lot Traceability',
    description: 'Full tracking from garment intake to finished dispatch — piece counts, wash recipes, and delivery documentation.',
  },
  {
    icon: '🎯',
    title: 'Wash Consistency',
    description: 'Sample garment approval before bulk — ensuring every piece in the lot matches your approved wash standard.',
  },
]

const CERTS = ['Piece-level QC', 'Wash sample approval', 'Buyer audit support', 'GST compliant billing']

export default function Quality() {
  const ref = useScrollAnimation()

  return (
    <section id="quality" className="quality" ref={ref}>
      <div className="container">
        <div className="quality__layout">
          <div className="quality__intro animate-on-scroll">
            <span className="section__eyebrow">Quality & Standards</span>
            <h2>Every Piece Checked Before It Leaves</h2>
            <p>
              Garment washing demands precision — one bad piece can ruin a brand's reputation.
              We treat every jeans, jacket, and short as if it carries your label on it.
            </p>
            <div className="quality__badges">
              {CERTS.map((cert, i) => (
                <span key={i} className="quality__badge">{cert}</span>
              ))}
            </div>
          </div>

          <div className="quality__grid">
            {STANDARDS.map((item, i) => (
              <div key={i} className="quality-card animate-on-scroll">
                <div className="quality-card__icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
