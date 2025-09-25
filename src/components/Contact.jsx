export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="contact__content">
          <div className="contact__info">
            <div className="section__header">
              <h2>Get In Touch</h2>
              <p>Ready to discuss your denim processing needs? Contact us today for a consultation</p>
            </div>
            
            <div className="contact__details">
              <div className="contact__item">
                <div className="contact__icon">👤</div>
                <div className="contact__text">
                  <h3>Contact Person</h3>
                  <p>Amiyachandra Pandey</p>
                </div>
              </div>
              
              <div className="contact__item">
                <div className="contact__icon">📞</div>
                <div className="contact__text">
                  <h3>Phone</h3>
                  <p><a href="tel:+919088334850">+91 90883 34850</a></p>
                </div>
              </div>
              
              <div className="contact__item">
                <div className="contact__icon">✉️</div>
                <div className="contact__text">
                  <h3>Email</h3>
                  <p><a href="mailto:amiya.acp1376@gmail.com">amiya.acp1376@gmail.com</a></p>
                </div>
              </div>
              
              <div className="contact__item">
                <div className="contact__icon">💬</div>
                <div className="contact__text">
                  <h3>WhatsApp</h3>
                  <p><a href="https://wa.me/919088334850" target="_blank" rel="noopener noreferrer">+91 90883 34850</a></p>
                </div>
              </div>
              
              <div className="contact__item">
                <div className="contact__icon">📍</div>
                <div className="contact__text">
                  <h3>Address</h3>
                  <p>
                    Mishra Pada, Dotalla, Bankra,<br />
                    Near Rail Line, Howrah – 711403
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="contact__cta">
            <div className="cta__card">
              <h3>Ready to Start Your Project?</h3>
              <p>Get a free quote for your denim processing requirements</p>
              <div className="cta__actions">
                <a href="tel:+919088334850" className="btn btn--primary">Call Now</a>
                <a href="https://wa.me/919088334850?text=Hi%20Denim%20Gartex,%20I%20would%20like%20to%20know%20more%20about%20your%20denim%20processing%20services." target="_blank" rel="noopener noreferrer" className="btn btn--whatsapp">WhatsApp</a>
                <a href="mailto:amiya.acp1376@gmail.com" className="btn btn--secondary">Email Us</a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Interactive Map */}
        <div className="contact__map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.1234567890!2d88.1234567890!3d22.1234567890!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDA3JzI0LjQiTiA4OMKwMDcnMjQuNCJF!5e0!3m2!1sen!2sin!4v1234567890!5m2!1sen!2sin"
            title="Denim Gartex Location"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          <div className="map__overlay">
            <h4>📍 Our Location</h4>
            <p>Mishra Pada, Dotalla, Bankra<br />Near Rail Line, Howrah – 711403</p>
          </div>
        </div>
      </div>
    </section>
  )
}
