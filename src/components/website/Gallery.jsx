import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'
import { GALLERY } from '../../lib/images.js'

const CATEGORIES = ['All', 'Factory', 'Washing', 'Laser', 'Finishing', 'Quality Control', 'Packaging']

export default function Gallery() {
  const [filter, setFilter] = useState('All')
  const [lightbox, setLightbox] = useState(null)

  const filtered = filter === 'All' ? GALLERY : GALLERY.filter((img) => img.cat === filter)

  return (
    <section id="gallery" className="section-padding bg-white">
      <div className="container-wide">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="eyebrow">Gallery</span>
          <h2 className="heading-section mb-4">Inside Our Operations</h2>
          <p className="text-navy/60 text-lg">A look at our wash floor, finishing processes, and quality standards.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === cat
                  ? 'bg-navy text-white shadow-md'
                  : 'bg-surface text-navy/60 hover:bg-navy/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((img) => (
              <motion.div
                key={`${img.cat}-${img.title}`}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="break-inside-avoid group relative rounded-xl overflow-hidden cursor-pointer"
                onClick={() => setLightbox(img)}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-navy-dark/0 group-hover:bg-navy-dark/60 transition-all duration-300 flex items-end p-5">
                  <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 w-full flex justify-between items-end">
                    <div>
                      <p className="text-gold text-xs uppercase tracking-widest mb-1">{img.cat}</p>
                      <p className="text-white font-semibold">{img.title}</p>
                    </div>
                    <ZoomIn className="text-white/70" size={20} />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-navy-dark/95 backdrop-blur-sm flex items-center justify-center p-5"
            onClick={() => setLightbox(null)}
          >
            <button
              type="button"
              className="absolute top-6 right-6 text-white/70 hover:text-white"
              onClick={() => setLightbox(null)}
              aria-label="Close"
            >
              <X size={28} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={lightbox.src}
              alt={lightbox.title}
              className="max-w-full max-h-[85vh] rounded-xl object-contain shadow-premium"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
              <p className="text-gold text-sm uppercase tracking-widest">{lightbox.cat}</p>
              <p className="text-white font-semibold text-lg">{lightbox.title}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
