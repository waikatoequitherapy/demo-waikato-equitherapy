'use client'
import { useEffect, useState } from 'react'

const quotes = [
  {
    text: 'After riding for just a short time she showed significant improvement in balance and coordination.',
    who: 'Rider’s mum',
  },
  {
    text: 'Our daughter comes back calm and much happier. She has learned to build friendships and hold a conversation.',
    who: 'Rider’s parent',
  },
  {
    text: 'Waikato Equitherapy made a huge difference for our son. Without being asked, they give so much back.',
    who: 'Rider’s dad',
  },
  {
    text: 'I had never been near a horse before I started. Two years on, it is the best six hours of my week.',
    who: 'Volunteer',
  },
]

export default function Testimonials() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setI(v => (v + 1) % quotes.length), 6500)
    return () => clearInterval(t)
  }, [paused])

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div style={{ position: 'relative', minHeight: 210 }}>
        {quotes.map((q, idx) => (
          <blockquote
            key={idx}
            aria-hidden={idx !== i}
            style={{
              position: idx === i ? 'relative' : 'absolute',
              inset: idx === i ? 'auto' : 0,
              margin: 0,
              opacity: idx === i ? 1 : 0,
              transform: idx === i ? 'none' : 'translateY(10px)',
              transition: 'opacity .5s ease, transform .5s ease',
              pointerEvents: idx === i ? 'auto' : 'none',
            }}
          >
            <span aria-hidden="true" style={{ fontFamily: 'var(--font-display)', fontSize: 64, color: 'var(--clay)', lineHeight: .6, display: 'block', marginBottom: 12 }}>
              &ldquo;
            </span>
            <p style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(1.2rem, 2.4vw, 1.75rem)',
              lineHeight: 1.4, color: '#fff', marginBottom: 18, maxWidth: 760,
            }}>
              {q.text}
            </p>
            <cite style={{ fontStyle: 'normal', fontSize: 13, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--red-bright)' }}>
              {q.who}
            </cite>
          </blockquote>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 26 }}>
        {quotes.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Show quote ${idx + 1}`}
            aria-current={idx === i}
            style={{
              width: idx === i ? 34 : 10, height: 10, borderRadius: 999, border: 0, cursor: 'pointer',
              background: idx === i ? 'var(--red-bright)' : 'rgba(255,255,255,.28)',
              transition: 'width .3s ease, background .3s ease',
            }}
          />
        ))}
      </div>
    </div>
  )
}
