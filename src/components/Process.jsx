import useScrollAnimation from '../hooks/useScrollAnimation.js'

const PROCESSES = [
  {
    step: '01',
    title: 'Garment Intake & Counting',
    description: 'Stitched pieces received, counted, and inspected for stitching defects before washing begins.',
  },
  {
    step: '02',
    title: 'Wash Recipe Setup',
    description: 'Wash program selected based on your approved sample — acid, enzyme, dye, or combination recipe.',
  },
  {
    step: '03',
    title: 'Washing & Color Application',
    description: 'Garments processed in industrial washers — dyeing, tinting, bleaching, and chemical treatments applied.',
  },
  {
    step: '04',
    title: 'Design & Hand Finishing',
    description: 'Whiskers, hand-sand, laser distressing, ozone effects, and all design details added piece by piece.',
  },
  {
    step: '05',
    title: 'Drying & Piece-Level QC',
    description: 'Each garment dried, inspected for wash consistency, color match, and design accuracy.',
  },
  {
    step: '06',
    title: 'Count, Pack & Dispatch',
    description: 'Final piece count verified, tagged, boxed, and dispatched back to your unit with delivery challan.',
  },
]

export default function Process() {
  const ref = useScrollAnimation()

  return (
    <section id="process" className="process" ref={ref}>
      <div className="container">
        <div className="section__header animate-on-scroll">
          <span className="section__eyebrow">How We Work</span>
          <h2>From Stitched Garment to Retail-Ready Piece</h2>
          <p>Our step-by-step garment washing workflow — traceable, counted, and quality-checked at every stage.</p>
        </div>
        <div className="process__timeline">
          {PROCESSES.map((process, index) => (
            <div key={index} className="process__item animate-on-scroll">
              <div className="process__step">{process.step}</div>
              <div className="process__content">
                <h3>{process.title}</h3>
                <p>{process.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
