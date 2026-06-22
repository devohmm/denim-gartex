import useScrollAnimation from '../hooks/useScrollAnimation.js'

const SPECIALTIES = [
  {
    icon: '🎨',
    title: 'Garment Dyeing & Tinting',
    description: 'Indigo, sulphur black, overdye, and tinting applied directly on stitched jeans and jackets.',
    tags: ['Indigo', 'Tint', 'Overdye'],
    gradient: 'linear-gradient(135deg, #1a365d, #3d5a80)',
  },
  {
    icon: '⚗️',
    title: 'Acid Wash',
    description: 'Vintage acid washes on finished garments — marble effects, light washes, and worn-in looks.',
    tags: ['Vintage', 'Marble', 'Light wash'],
    gradient: 'linear-gradient(135deg, #2d4066, #4a6fa5)',
  },
  {
    icon: '🧬',
    title: 'Enzyme Wash',
    description: 'Soft, lived-in hand-feel on stitched pieces using sustainable cellulase bio-wash treatments.',
    tags: ['Bio-wash', 'Soft feel', 'Eco'],
    gradient: 'linear-gradient(135deg, #1c3a5f, #3d5a80)',
  },
  {
    icon: '💎',
    title: 'Stone & Sand Wash',
    description: 'Classic stone washing and sand blasting on jeans for authentic distressed character.',
    tags: ['Stone wash', 'Sand blast', 'Distress'],
    gradient: 'linear-gradient(135deg, #243352, #5b7c99)',
  },
  {
    icon: '✋',
    title: 'Whiskers & Hand Sand',
    description: 'Manual whisker patterns, knee abrasions, and hand-sanding for premium design details.',
    tags: ['Whiskers', 'Hand sand', 'Abrasion'],
    gradient: 'linear-gradient(135deg, #1a2744, #3d5a80)',
  },
  {
    icon: '⚡',
    title: 'Laser Finishing',
    description: 'Precision laser distressing on garments — consistent whiskers, holes, and abrasion patterns.',
    tags: ['Laser', 'Distress', 'Patterns'],
    gradient: 'linear-gradient(135deg, #2d4066, #6b8caf)',
  },
]

export default function Specialties() {
  const ref = useScrollAnimation()

  return (
    <section id="specialties" className="specialties" ref={ref}>
      <div className="container">
        <div className="section__header animate-on-scroll">
          <span className="section__eyebrow">Our Services</span>
          <h2>Every Wash & Design Effect on Your Garments</h2>
          <p>All treatments applied on stitched pieces — the finishing work that makes your brand recognizable.</p>
        </div>
        <div className="specialties__grid">
          {SPECIALTIES.map((specialty, index) => (
            <div key={index} className="specialty__card animate-on-scroll">
              <div className="specialty__card-top" style={{ background: specialty.gradient }} />
              <div className="specialty__card-body">
                <div className="specialty__icon">{specialty.icon}</div>
                <h3 className="specialty__title">{specialty.title}</h3>
                <p className="specialty__description">{specialty.description}</p>
                <div className="specialty__tags">
                  {specialty.tags.map((tag) => (
                    <span key={tag} className="specialty__tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
