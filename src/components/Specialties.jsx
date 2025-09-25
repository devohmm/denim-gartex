export default function Specialties() {
  const specialties = [
    {
      icon: '🎨',
      title: 'Advanced Dyeing',
      description: 'State-of-the-art dyeing techniques using premium dyes and eco-friendly processes to achieve vibrant, long-lasting colors.'
    },
    {
      icon: '⚗️',
      title: 'Acid Treatment',
      description: 'Specialized acid washing processes that create unique textures and vintage effects on denim fabric.'
    },
    {
      icon: '🧬',
      title: 'Enzyme Processing',
      description: 'Biological enzyme treatments for sustainable and effective fabric finishing with reduced environmental impact.'
    },
    {
      icon: '✨',
      title: 'Value-Added Processes',
      description: 'Custom finishing services including stone washing, sandblasting, and other specialized treatments.'
    }
  ]

  return (
    <section id="specialties" className="specialties">
      <div className="container">
        <div className="section__header">
          <h2>Our Specialties</h2>
          <p>Comprehensive denim processing solutions tailored to meet your specific requirements</p>
        </div>
        <div className="specialties__grid">
          {specialties.map((specialty, index) => (
            <div key={index} className="specialty__card">
              <div className="specialty__icon">{specialty.icon}</div>
              <h3 className="specialty__title">{specialty.title}</h3>
              <p className="specialty__description">{specialty.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
