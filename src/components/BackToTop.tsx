'use client'
import { useEffect, useState } from 'react'

export default function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      style={{
        position: 'fixed', left: 20, bottom: 24, zIndex: 60,
        width: 44, height: 44, borderRadius: '50%', border: '1px solid var(--rule)',
        background: '#fff', color: 'var(--ink)', cursor: 'pointer',
        boxShadow: 'var(--shadow-md)', display: 'grid', placeItems: 'center',
        opacity: show ? 1 : 0, pointerEvents: show ? 'auto' : 'none',
        transform: show ? 'translateY(0)' : 'translateY(12px)',
        transition: 'opacity .25s ease, transform .25s ease',
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M8 13V3M8 3L3.5 7.5M8 3l4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  )
}
