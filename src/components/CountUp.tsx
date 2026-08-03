'use client'
import { useEffect, useRef, useState } from 'react'

/** Counts up to `to` whenever the number scrolls into view. */
export default function CountUp({ to, duration = 1400 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const frame = useRef<number>()
  const [value, setValue] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduced || typeof IntersectionObserver === 'undefined') {
      setValue(to)
      return
    }

    const run = () => {
      const start = performance.now()
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - p, 3)
        setValue(Math.round(to * eased))
        if (p < 1) frame.current = requestAnimationFrame(tick)
      }
      frame.current = requestAnimationFrame(tick)
    }

    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) run()
        else {
          if (frame.current) cancelAnimationFrame(frame.current)
          setValue(0)
        }
      }),
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => {
      io.disconnect()
      if (frame.current) cancelAnimationFrame(frame.current)
    }
  }, [to, duration])

  return <span ref={ref}>{value.toLocaleString('en-NZ')}</span>
}
