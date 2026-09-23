'use client'
import { useEffect, useState } from 'react'
import Reveal from '@/components/Reveal'
import { getEvents } from '@/lib/api'
import { site } from '@/lib/site'

export default function EventsList() {
  const [events, setEvents] = useState<any[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    getEvents()
      .then(setEvents)
      .catch(() => {})
      .finally(() => setLoaded(true))
  }, [])

  if (!loaded) return null

  if (events.length === 0) {
    return (
      <Reveal>
        <div className="card center" style={{ padding: '56px 28px' }}>
          <div className="hoof-trail" style={{ justifyContent: 'center', marginBottom: 20 }}>
            <span /><span /><span /><span />
          </div>
          <h3 style={{ fontSize: 22, marginBottom: 8 }}>Nothing scheduled at the moment</h3>
          <p className="muted small" style={{ marginBottom: 24 }}>
            New dates go up here first, and on Facebook shortly after.
          </p>
          <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Follow us on Facebook</a>
        </div>
      </Reveal>
    )
  }

  return (
    <div style={{ display: 'grid', gap: 20 }}>
      {events.map((e: any, i: number) => {
        const d = new Date(e.eventDate)
        const spotsLeft = e.capacity ? e.capacity - (e.registeredCount ?? 0) : null
        return (
          <Reveal key={e.id} delay={i * 80}>
            <article className="card card-hover" style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              <span className="date-chip-lg">
                <strong>{d.getDate()}</strong>
                <small>{d.toLocaleString('en-NZ', { month: 'short' })}</small>
              </span>
              <div style={{ flex: 1, minWidth: 240 }}>
                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 6 }}>
                  <h3 style={{ fontSize: 23 }}>{e.name}</h3>
                  {spotsLeft !== null && (
                    <span className="pill" style={{ flexShrink: 0 }}>
                      {spotsLeft > 0 ? `${spotsLeft} spots left` : 'Fully booked'}
                    </span>
                  )}
                </div>
                <p className="muted small" style={{ marginBottom: 12 }}>
                  {d.toLocaleString('en-NZ', { hour: 'numeric', minute: '2-digit', hour12: true })} · {e.location}
                </p>
                <p className="body small" style={{ marginBottom: 12 }}>{e.description}</p>
                {e.price > 0 && (
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 19, color: 'var(--clay)' }}>${e.price} per person</p>
                )}
              </div>
            </article>
          </Reveal>
        )
      })}
    </div>
  )
}
