import useScrollAnimation from '../hooks/useScrollAnimation.js'

const CAPABILITIES = [
  {
    icon: '👖',
    value: '50,000+',
    unit: 'pieces/month',
    label: 'Garment Capacity',
    detail: 'From sample lots of 100 pieces to bulk brand orders',
  },
  {
    icon: '⏱️',
    value: '7–14',
    unit: 'days',
    label: 'Typical Turnaround',
    detail: 'Fast-track available for urgent seasonal drops',
  },
  {
    icon: '🎨',
    value: '12+',
    unit: 'wash types',
    label: 'Finish Options',
    detail: 'Acid, enzyme, laser, ozone, whiskers & more',
  },
  {
    icon: '✅',
    value: '99%',
    unit: 'QC pass rate',
    label: 'Piece-Level QC',
    detail: 'Every garment checked before dispatch',
  },
]

const MACHINERY = [
  'Industrial garment washing machines',
  'Enzyme & acid wash tumblers',
  'Laser & ozone finishing units',
  'Hydro-extractors & garment dryers',
  'Hand-finishing & whisker stations',
  'Color matching & shade approval lab',
]

export default function Capabilities() {
  const ref = useScrollAnimation()

  return (
    <section id="capabilities" className="capabilities" ref={ref}>
      <div className="container">
        <div className="section__header animate-on-scroll">
          <span className="section__eyebrow">Factory Capabilities</span>
          <h2>Built for Garment Washing at Scale</h2>
          <p>
            Our Howrah wash floor processes stitched denim garments for brands, exporters,
            and stitching units across India — from sample development to full-season bulk runs.
          </p>
        </div>

        <div className="capabilities__grid">
          {CAPABILITIES.map((cap, i) => (
            <div key={i} className="capability-card animate-on-scroll">
              <div className="capability-card__icon">{cap.icon}</div>
              <div className="capability-card__value">
                {cap.value}
                <span>{cap.unit}</span>
              </div>
              <h3>{cap.label}</h3>
              <p>{cap.detail}</p>
            </div>
          ))}
        </div>

        <div className="capabilities__machinery animate-on-scroll">
          <div className="capabilities__machinery-text">
            <h3>Wash Floor Equipment</h3>
            <p>
              Purpose-built for garment processing — not fabric rolls. The same equipment
              standards used by leading denim brands for washing, finishing, and design effects.
            </p>
          </div>
          <ul className="capabilities__machinery-list">
            {MACHINERY.map((item, i) => (
              <li key={i}>
                <span className="check-icon">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
