'use client'
import { useEffect, useRef, useState } from 'react'

type State = 'idle' | 'in' | 'out'

/**
 * Fades content up as it scrolls into view, and resets once it leaves,
 * so the reveal plays again on the way back rather than only on first load.
 */
export default function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className = '',
  style,
}: {
  children: React.ReactNode
  delay?: number
  as?: any
  className?: string
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLElement | null>(null)
  const [state, setState] = useState<State>('idle')

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduced || typeof IntersectionObserver === 'undefined') {
      setState('in')
      return
    }

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setState('in')
          // Only reset once the element is well clear of the viewport, so a
          // small scroll nudge near the edge doesn't make things flicker.
          else if (e.boundingClientRect.top > window.innerHeight * 0.9 ||
                   e.boundingClientRect.bottom < -80) setState('out')
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal ${state === 'in' ? 'is-in' : ''} ${state === 'out' ? 'is-out' : ''} ${className}`.trim()}
      style={{ ['--reveal-delay' as any]: `${delay}ms`, ...style }}
    >
      {children}
    </Tag>
  )
}
