export default function Process() {
  const processes = [
    {
      step: "01",
      title: "Raw Material Inspection",
      description: "Thorough quality assessment of incoming denim fabric to ensure only premium materials enter our production line."
    },
    {
      step: "02", 
      title: "Pre-treatment",
      description: "Careful preparation including desizing, scouring, and bleaching to prepare fabric for optimal processing."
    },
    {
      step: "03",
      title: "Dyeing & Treatment",
      description: "Advanced dyeing techniques using acid, enzyme, and specialized treatments to achieve desired color and texture."
    },
    {
      step: "04",
      title: "Value Addition",
      description: "Custom finishing processes including stone washing, sandblasting, and other value-added treatments."
    },
    {
      step: "05",
      title: "Quality Control",
      description: "Comprehensive testing and inspection to ensure every piece meets our high standards before delivery."
    },
    {
      step: "06",
      title: "Packaging & Delivery",
      description: "Professional packaging and timely delivery to ensure your products arrive in perfect condition."
    }
  ]

  return (
    <section id="process" className="process">
      <div className="container">
        <div className="section__header">
          <h2>Our Manufacturing Process</h2>
          <p>From raw denim to finished product - our systematic approach ensures consistent quality and superior results</p>
        </div>
        <div className="process__grid">
          {processes.map((process, index) => (
            <div key={index} className="process__item">
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

