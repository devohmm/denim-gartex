import { useState, useRef } from 'react'
import useScrollAnimation from '../hooks/useScrollAnimation.js'

const SERVICE_OPTIONS = [
  'Dyeing & Overdye',
  'Acid Wash',
  'Enzyme Processing',
  'Stone / Sand Wash',
  'Laser Finishing',
  'Ozone Treatment',
  'Multiple Services',
  'Not Sure — Need Consultation',
]

const QUANTITY_OPTIONS = [
  'Sample (50–200 pieces)',
  'Small lot (200–500 pieces)',
  'Medium lot (500–2000 pieces)',
  'Bulk (2000+ pieces)',
]

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    quantity: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState({ type: null, message: '' })
  const formRef = useRef(null)
  const sectionRef = useScrollAnimation()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '0bbedbb1-1f31-4ac5-8ce8-85643c469b28'

    const fullMessage = [
      formData.message,
      formData.company && `Company: ${formData.company}`,
      formData.service && `Service: ${formData.service}`,
      formData.quantity && `Quantity: ${formData.quantity}`,
    ].filter(Boolean).join('\n')

    if (WEB3FORMS_ACCESS_KEY && WEB3FORMS_ACCESS_KEY !== 'YOUR_ACCESS_KEY_HERE') {
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            name: formData.name,
            email: formData.email,
            phone: formData.phone || '',
            message: fullMessage,
            subject: `Quote Request: ${formData.service || 'General'} — ${formData.name}`,
            from_name: 'Denim Gartex Website',
          }),
        })

        const data = await response.json()

        if (data.success) {
          setSubmitStatus({
            type: 'success',
            message: 'Thank you! Your inquiry has been sent. We will respond within 24 hours.',
          })
          setFormData({ name: '', email: '', phone: '', company: '', service: '', quantity: '', message: '' })
          formRef.current?.reset()
        } else {
          setSubmitStatus({
            type: 'error',
            message: data.message || 'Something went wrong. Please call us at +91 7980433091.',
          })
        }
      } catch {
        setSubmitStatus({
          type: 'error',
          message: 'Failed to send. Please try again or call us at +91 7980433091.',
        })
      }
      setIsSubmitting(false)
    } else {
      setSubmitStatus({
        type: 'error',
        message: 'Please contact us directly at +91 7980433091 or hariompandey157@gmail.com',
      })
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="contact" ref={sectionRef}>
      <div className="container">
        <div className="section__header animate-on-scroll">
          <span className="section__eyebrow">Get Started</span>
          <h2>Request a Quote</h2>
          <p>Tell us your garment type, piece count, and desired wash — we respond within 24 hours.</p>
        </div>

        <div className="contact__content">
          <div className="contact__info animate-on-scroll">
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
                  <p><a href="tel:+917980433091">+91 79804 33091</a></p>
                </div>
              </div>
              <div className="contact__item">
                <div className="contact__icon">✉️</div>
                <div className="contact__text">
                  <h3>Email</h3>
                  <p><a href="mailto:hariompandey157@gmail.com">hariompandey157@gmail.com</a></p>
                </div>
              </div>
              <div className="contact__item">
                <div className="contact__icon">💬</div>
                <div className="contact__text">
                  <h3>WhatsApp</h3>
                  <p>
                    <a href="https://wa.me/917980433091" target="_blank" rel="noopener noreferrer">
                      Message us instantly
                    </a>
                  </p>
                </div>
              </div>
              <div className="contact__item">
                <div className="contact__icon">📍</div>
                <div className="contact__text">
                  <h3>Factory Address</h3>
                  <p>
                    Mishra Pada, Dotalla, Bankra,<br />
                    Near Rail Line, Howrah – 711403
                  </p>
                </div>
              </div>
            </div>

            <div className="contact__hours">
              <h4>Business Hours</h4>
              <p>Mon – Sat: 9:00 AM – 7:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>

          <div className="contact__form-wrapper animate-on-scroll">
            <div className="contact__form-card">
              <h3>Send Inquiry</h3>
              <form ref={formRef} onSubmit={handleSubmit} className="contact__form" name="contact">
                <div className="form__row">
                  <div className="form__group">
                    <label htmlFor="name">Full Name *</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="Your name" />
                  </div>
                  <div className="form__group">
                    <label htmlFor="company">Company / Brand</label>
                    <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} placeholder="Optional" />
                  </div>
                </div>

                <div className="form__row">
                  <div className="form__group">
                    <label htmlFor="email">Email *</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="you@company.com" />
                  </div>
                  <div className="form__group">
                    <label htmlFor="phone">Phone *</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+91 98765 43210" />
                  </div>
                </div>

                <div className="form__row">
                  <div className="form__group">
                    <label htmlFor="service">Service Needed *</label>
                    <select id="service" name="service" value={formData.service} onChange={handleChange} required>
                      <option value="">Select a service</option>
                      {SERVICE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form__group">
                    <label htmlFor="quantity">Estimated Quantity *</label>
                    <select id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} required>
                      <option value="">Select quantity range</option>
                      {QUANTITY_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form__group">
                  <label htmlFor="message">Project Details *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    placeholder="Garment type (jeans/jacket), piece count, desired wash, timeline, reference sample details..."
                  />
                </div>

                {submitStatus.message && (
                  <div className={`form__status form__status--${submitStatus.type}`}>
                    {submitStatus.message}
                  </div>
                )}

                <button type="submit" className="btn btn--primary btn--submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="contact__map animate-on-scroll">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.1234567890!2d88.3186!3d22.5769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0277b5e5e5e5e5%3A0x5e5e5e5e5e5e5e5e!2sMishra%20Pada%2C%20Dotalla%2C%20Bankra%2C%20Howrah%2C%20West%20Bengal%20711403!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin&q=Mishra+Pada,+Dotalla,+Bankra,+Howrah,+West+Bengal+711403"
            title="Denim Gartex Location"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="map__overlay">
            <h4>Visit Our Factory</h4>
            <p>Mishra Pada, Dotalla, Bankra<br />Near Rail Line, Howrah – 711403</p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Mishra+Pada,+Dotalla,+Bankra,+Howrah,+West+Bengal+711403"
              target="_blank"
              rel="noopener noreferrer"
              className="map__directions"
            >
              Get Directions →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
