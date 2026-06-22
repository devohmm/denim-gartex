import { useEffect, useRef, useCallback } from 'react'

export default function useScrollAnimation(threshold = 0.08) {
  const ref = useRef(null)

  const observeElements = useCallback(() => {
    const container = ref.current
    if (!container) return () => {}

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold, rootMargin: '0px 0px -30px 0px' }
    )

    const elements = container.querySelectorAll('.animate-on-scroll:not(.animate-in)')
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
        el.classList.add('animate-in')
      } else {
        observer.observe(el)
      }
    })

    return () => observer.disconnect()
  }, [threshold])

  useEffect(() => {
    const cleanup = observeElements()
    const timer = setTimeout(observeElements, 100)
    return () => {
      cleanup()
      clearTimeout(timer)
    }
  }, [observeElements])

  return ref
}
