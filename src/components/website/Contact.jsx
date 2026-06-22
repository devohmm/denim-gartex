import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, MessageCircle, Clock } from 'lucide-react'

const SERVICE_OPTIONS = [
  'Laser Finishing', 'Whisker Effects', 'Ozone Wash', 'Acid Wash',
  'Enzyme Wash', 'Hand Finishing', 'Multiple Services', 'Consultation',
]

const QUANTITY_OPTIONS = [
  'Sample (50–200 pieces)', 'Small lot (200–500 pieces)',
  'Medium lot (500–2000 pieces)', 'Bulk (2000+ pieces)',
]

export default function Contact() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '', service: '', quantity: '', message: '',
  })
  const [status, setStatus] = useState({ type: null, message: '' })
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setStatus({ type: null, message: '' })

    const KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '0bbedbb1-1f31-4ac5-8ce8-85643c469b28'
    const fullMessage = [
      form.message,
      form.company && `Company: ${form.company}`,
      form.service && `Service: ${form.service}`,
      form.quantity && `Quantity: ${form.quantity}`,
    ].filter(Boolean).join('\n')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: KEY,
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: fullMessage,
          subject: `Production Quote: ${form.service || 'General'} — ${form.name}`,
          from_name: 'Denim Gartex Website',
        }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus({ type: 'success', message: 'Thank you! We will respond within 24 hours.' })
        setForm({ name: '', email: '', phone: '', company: '', service: '', quantity: '', message: '' })
      } else {
        setStatus({ type: 'error', message: 'Something went wrong. Please call +91 79804 33091.' })
      }
    } catch {
      setStatus({ type: 'error', message: 'Failed to send. Please call +91 79804 33091.' })
    }
    setSubmitting(false)
  }

  return (
    <section id="contact" className="section-padding bg-surface">
      <div className="container-wide">
        <div className="grid lg:grid-cols-5 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <span className="eyebrow">Contact</span>
            <h2 className="heading-section mb-6">Start Your Production Order</h2>
            <p className="text-navy/60 mb-10 leading-relaxed">
              Tell us your garment type, piece count, and desired wash. Our team responds within 24 hours.
            </p>

            <div className="space-y-5">
              {[
                { icon: Phone, label: 'Phone', value: '+91 79804 33091', href: 'tel:+917980433091' },
                { icon: Mail, label: 'Email', value: 'hariompandey157@gmail.com', href: 'mailto:hariompandey157@gmail.com' },
                { icon: MessageCircle, label: 'WhatsApp', value: 'Message us instantly', href: 'https://wa.me/917980433091' },
                { icon: MapPin, label: 'Factory', value: 'Mishra Pada, Dotalla, Bankra, Howrah – 711403', href: null },
                { icon: Clock, label: 'Hours', value: 'Mon–Sat: 9 AM – 7 PM', href: null },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-navy flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-navy/40 mb-0.5">{label}</p>
                    {href ? (
                      <a href={href} className="text-navy font-medium hover:text-gold-dark transition-colors text-sm">
                        {value}
                      </a>
                    ) : (
                      <p className="text-navy font-medium text-sm">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 md:p-10 shadow-elevated border border-navy/5">
              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-sm font-medium text-navy mb-1.5">Full Name *</label>
                  <input required name="name" value={form.name} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-navy/10 bg-surface focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-1.5">Company</label>
                  <input name="company" value={form.company} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-navy/10 bg-surface focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-1.5">Email *</label>
                  <input required type="email" name="email" value={form.email} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-navy/10 bg-surface focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-1.5">Phone *</label>
                  <input required type="tel" name="phone" value={form.phone} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-navy/10 bg-surface focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-1.5">Service *</label>
                  <select required name="service" value={form.service} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-navy/10 bg-surface focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all text-sm">
                    <option value="">Select service</option>
                    {SERVICE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-1.5">Quantity *</label>
                  <select required name="quantity" value={form.quantity} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-navy/10 bg-surface focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all text-sm">
                    <option value="">Select quantity</option>
                    {QUANTITY_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              </div>
              <div className="mb-5">
                <label className="block text-sm font-medium text-navy mb-1.5">Project Details *</label>
                <textarea required name="message" value={form.message} onChange={handleChange} rows={4}
                  placeholder="Garment type, piece count, desired wash, timeline..."
                  className="w-full px-4 py-3 rounded-lg border border-navy/10 bg-surface focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all text-sm resize-none" />
              </div>
              {status.message && (
                <div className={`mb-5 p-4 rounded-lg text-sm font-medium ${
                  status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                }`}>
                  {status.message}
                </div>
              )}
              <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-60">
                {submitting ? 'Sending...' : 'Submit Production Inquiry'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
