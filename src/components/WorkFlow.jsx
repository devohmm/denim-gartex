import useScrollAnimation from '../hooks/useScrollAnimation.js'

const STEPS = [
  {
    num: '01',
    icon: '👖',
    title: 'You Send Stitched Garments',
    description: 'Your brand ships stitched jeans, jackets, or denim pieces — just like Levi\'s before washing. No fabric rolls, only ready-to-process garments.',
    tag: 'From your stitching unit',
  },
  {
    num: '02',
    icon: '🎨',
    title: 'We Wash, Design & Color',
    description: 'Our team applies acid wash, enzyme treatment, dyeing, whiskers, hand-sand, laser distressing, and every finish your collection needs.',
    tag: 'Our core expertise',
  },
  {
    num: '03',
    icon: '✨',
    title: 'Retail-Ready Dispatch',
    description: 'QC-checked garments packed and returned — tagged, boxed, and ready for your brand label or direct retail shelves.',
    tag: 'Back to you',
  },
]

export default function WorkFlow() {
  const ref = useScrollAnimation()

  return (
    <section id="workflow" className="workflow" ref={ref}>
      <div className="container">
        <div className="workflow__banner animate-on-scroll">
          <div className="workflow__banner-text">
            <span className="section__eyebrow">What We Actually Do</span>
            <h2>Garment Washing & Finishing — Not Fabric Processing</h2>
            <p>
              Brands like Levi's stitch first, then send garments to us. We handle everything after stitching —
              washing, color, design effects, distressing, and final QC. You send <strong>pieces</strong>, we send back finished products.
            </p>
          </div>
          <div className="workflow__pipeline" aria-hidden="true">
            <div className="pipeline__step">
              <div className="pipeline__icon">🧵</div>
              <span>Stitched</span>
            </div>
            <div className="pipeline__arrow">→</div>
            <div className="pipeline__step pipeline__step--highlight">
              <div className="pipeline__icon">🏭</div>
              <span>Denim Gartex</span>
            </div>
            <div className="pipeline__arrow">→</div>
            <div className="pipeline__step">
              <div className="pipeline__icon">🏷️</div>
              <span>Retail Ready</span>
            </div>
          </div>
        </div>

        <div className="workflow__steps">
          {STEPS.map((step, i) => (
            <div key={i} className="workflow-card animate-on-scroll">
              <div className="workflow-card__num">{step.num}</div>
              <div className="workflow-card__icon">{step.icon}</div>
              <span className="workflow-card__tag">{step.tag}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
