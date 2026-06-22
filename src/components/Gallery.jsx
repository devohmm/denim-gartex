import { useState } from 'react'
import useScrollAnimation from '../hooks/useScrollAnimation.js'

const FINISHES = [
  { name: 'Classic Indigo Wash', color: '#1a365d', light: '#2d4a7c', tag: 'Dyeing', icon: '💙' },
  { name: 'Vintage Acid Wash', color: '#3d5a80', light: '#5a7a9e', tag: 'Acid', icon: '⚗️' },
  { name: 'Enzyme Soft Wash', color: '#2d5a87', light: '#4a7aa8', tag: 'Enzyme', icon: '🧬' },
  { name: 'Stone Washed Look', color: '#4a6fa5', light: '#6b8caf', tag: 'Value-add', icon: '💎' },
  { name: 'Whisker & Hand Sand', color: '#1c3a5f', light: '#3a5a7f', tag: 'Finishing', icon: '✋' },
  { name: 'Laser Distressed', color: '#5b7c99', light: '#7a9bb5', tag: 'Laser', icon: '⚡' },
  { name: 'Ozone Bleach Effect', color: '#6b8caf', light: '#8fa9c4', tag: 'Ozone', icon: '🌬️' },
  { name: 'Overdye Black', color: '#0f1729', light: '#243352', tag: 'Dyeing', icon: '🖤' },
]

const FILTERS = ['All', 'Dyeing', 'Acid', 'Enzyme', 'Value-add', 'Finishing', 'Laser', 'Ozone']

export default function Gallery() {
  const ref = useScrollAnimation()
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = activeFilter === 'All'
    ? FINISHES
    : FINISHES.filter((f) => f.tag === activeFilter)

  return (
    <section id="gallery" className="gallery" ref={ref}>
      <div className="container">
        <div className="section__header animate-on-scroll">
          <span className="section__eyebrow">Finish Portfolio</span>
          <h2>Wash & Finish Looks We Create</h2>
          <p>
            Every wash, color, and design effect applied directly on your stitched garments —
            from classic indigo to modern distressed finishes.
          </p>
        </div>

        <div className="gallery__filters animate-on-scroll">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              className={`gallery__filter ${activeFilter === filter ? 'gallery__filter--active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="gallery__grid" key={activeFilter}>
          {filtered.map((finish, i) => (
            <article
              key={finish.name}
              className="gallery-card gallery-card--visible"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <div
                className="gallery-card__visual"
                style={{
                  background: `linear-gradient(160deg, ${finish.color} 0%, ${finish.light} 60%, ${finish.color} 100%)`,
                }}
              >
                <div className="gallery-card__denim-weave" />
                <div className="gallery-card__garment">
                  <svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 8 L35 8 L40 18 L45 8 L60 8 L65 25 L58 30 L58 95 L48 95 L48 55 L32 55 L32 95 L22 95 L22 30 L15 25 Z" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
                  </svg>
                </div>
                <span className="gallery-card__emoji">{finish.icon}</span>
                <span className="gallery-card__tag">{finish.tag}</span>
              </div>
              <div className="gallery-card__info">
                <h3>{finish.name}</h3>
                <span className="gallery-card__type">On stitched garments</span>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="gallery__empty">No finishes in this category yet.</p>
        )}

        <p className="gallery__note animate-on-scroll">
          Send us a reference garment or wash sample — we'll develop the exact look on your stitched pieces.
        </p>
      </div>
    </section>
  )
}
