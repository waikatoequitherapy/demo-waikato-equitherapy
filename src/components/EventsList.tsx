'use client'
import { useEffect, useState } from 'react'
import Reveal from '@/components/Reveal'
import { getEvents, registerForEvent } from '@/lib/api'
import { site } from '@/lib/site'

export default function EventsList() {
  const [events, setEvents] = useState<any[]>([])
  const [loaded, setLoaded] = useState(false)
  const [registeringId, setRegisteringId] = useState<string | number | null>(null)
  const [regStatus, setRegStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

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

  async function handleRegister(e: React.FormEvent<HTMLFormElement>, eventId: string | number) {
    e.preventDefault()
    setRegStatus('sending')
    const form = e.currentTarget
    const get = (n: string) => (form.elements.namedItem(n) as HTMLInputElement)?.value ?? ''
    try {
      await registerForEvent(String(eventId), {
        name: get('name'),
        email: get('email'),
        phone: get('phone'),
        numberOfPeople: parseInt(get('numberOfPeople')) || 1,
      })
      const people = parseInt(get('numberOfPeople')) || 1
      setEvents(evts => evts.map(ev => ev.id === eventId
        ? { ...ev, registeredCount: (ev.registeredCount ?? 0) + people }
        : ev))
      setRegStatus('sent')
    } catch {
      setRegStatus('error')
    }
  }

  return (
    <div style={{ display: 'grid', gap: 20 }}>
      {events.map((e: any, i: number) => {
        const d = new Date(e.eventDate)
        const spotsLeft = e.capacity ? e.capacity - (e.registeredCount ?? 0) : null
        const fullyBooked = spotsLeft !== null && spotsLeft <= 0
        const isRegistering = registeringId === e.id
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
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 19, color: 'var(--clay)', marginBottom: 16 }}>${e.price} per person</p>
                )}

                {isRegistering ? (
                  regStatus === 'sent' ? (
                    <p className="body small" style={{ color: 'var(--clay)', fontWeight: 600 }}>
                      ✓ Registered! Check your email for confirmation.
                    </p>
                  ) : (
                    <form
                      onSubmit={ev => handleRegister(ev, e.id)}
                      style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 360, marginTop: 8 }}
                    >
                      <div className="field">
                        <label className="label" htmlFor={`name-${e.id}`}>Your name</label>
                        <input id={`name-${e.id}`} name="name" required className="input" />
                      </div>
                      <div className="field">
                        <label className="label" htmlFor={`email-${e.id}`}>Email</label>
                        <input id={`email-${e.id}`} name="email" type="email" required className="input" />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                        <div className="field">
                          <label className="label" htmlFor={`phone-${e.id}`}>Phone (optional)</label>
                          <input id={`phone-${e.id}`} name="phone" type="tel" className="input" />
                        </div>
                        <div className="field">
                          <label className="label" htmlFor={`people-${e.id}`}>People</label>
                          <input id={`people-${e.id}`} name="numberOfPeople" type="number" min={1} defaultValue={1} className="input" />
                        </div>
                      </div>
                      {regStatus === 'error' && (
                        <p className="small" style={{ color: 'var(--clay)' }}>That didn't go through. Please try again.</p>
                      )}
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button type="submit" className="btn btn-primary" disabled={regStatus === 'sending'}>
                          {regStatus === 'sending' ? 'Registering…' : 'Confirm registration'}
                        </button>
                        <button type="button" className="btn btn-ghost" onClick={() => { setRegisteringId(null); setRegStatus('idle') }}>Cancel</button>
                      </div>
                    </form>
                  )
                ) : (
                  <div className="row">
                    {!fullyBooked && (
                      <button className="btn btn-primary" onClick={() => { setRegisteringId(e.id); setRegStatus('idle') }}>Register</button>
                    )}
                    <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Details on Facebook ↗</a>
                  </div>
                )}
              </div>
            </article>
          </Reveal>
        )
      })}
    </div>
  )
}
