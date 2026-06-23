import { useState, useEffect } from 'react'
import { getSectionFromPath, syncPathToSection } from '../lib/sectionNav.js'

export default function useActiveSection(sectionIds) {
  const [active, setActive] = useState(() => getSectionFromPath() || '')

  useEffect(() => {
    const observers = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id)
        },
        { rootMargin: '-40% 0px -50% 0px' }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [sectionIds])

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY < 80) setActive('')
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (active) syncPathToSection(active)
    else syncPathToSection(null)
  }, [active])

  return active
}
