import { useEffect, useState } from 'react'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function useCounter(end, duration = 2000, suffix = '') {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const numericEnd = parseInt(String(end).replace(/[^0-9]/g, ''), 10)
    if (isNaN(numericEnd)) return

    let start = 0
    const startTime = performance.now()

    const animate = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * numericEnd))
      if (progress < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [isInView, end, duration])

  const prefix = String(end).match(/^[^0-9]*/)?.[0] || ''
  const displaySuffix = suffix || String(end).match(/[^0-9]*$/)?.[0] || ''

  return { ref, display: `${prefix}${count.toLocaleString()}${displaySuffix}` }
}
