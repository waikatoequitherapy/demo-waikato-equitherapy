import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Reveal from '@/components/Reveal'
import { getEvents } from '@/lib/api'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Events',
  description: 'Fundraisers, open days and community events at Waikato Equitherapy, including our charity quiz night.',
}

export default async function EventsPage() {
  const events = await getEvents().catch(() => [])

  return (
    <>
      <section style={{ background: 'var(--oat)', paddingTop: 56, paddingBottom: 48 }}>
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">What’s on</span>
            <h1 className="display-xl" style={{ margin: '20px 0 18px' }}>Events</h1>
            <p className="lede" style={{ maxWidth: 580 }}>
              Fundraisers, holiday programmes and open days. Events are announced here and on our Facebook page.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Quiz night, our standing fundraiser */}
      <section style={{ paddingBottom: 24 }}>
        <div className="wrap">
          <Reveal>
            <div className="quiz">
              <div>
                <span className="pill">Fundraiser</span>
                <h2 className="display-md" style={{ margin: '16px 0 12px' }}>Charity quiz night</h2>
                <p className="body" style={{ marginBottom: 18, maxWidth: 520 }}>
                  Our biggest night of the year. Get a team together, bring your general knowledge and your worst guesses,
                  and help fund a term of riding. Scan the code to register, or ask us for a table.
                </p>
                <div className="row">
                  <Link href="/contact" className="btn btn-primary">Register a team</Link>
                  <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Details on Facebook ↗</a>
                </div>
              </div>
              <div className="quiz-qr">
                <Image
                  src="/images/quiz-night-qr.png"
                  alt="QR code linking to the quiz night registration page"
                  width={190}
                  height={190}
                  style={{ width: 190, height: 'auto', display: 'block' }}
                />
                <p className="small muted center" style={{ marginTop: 10 }}>Scan to register</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal>
            <h2 className="display-lg" style={{ marginBottom: 32 }}>Coming up</h2>
          </Reveal>

          {events.length === 0 ? (
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
          ) : (
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
          )}
        </div>
      </section>

      <style>{`
        .quiz {
          display: grid; gap: 32px; align-items: center; grid-template-columns: 1fr;
          background: var(--sand); border: 1px solid var(--rule); border-radius: 22px; padding: 36px;
        }
        @media (min-width: 820px) { .quiz { grid-template-columns: 1fr auto; } }
        .quiz-qr {
          background: #fff; border: 1px solid var(--rule); border-radius: 18px; padding: 18px;
          box-shadow: var(--shadow-md); justify-self: center;
        }
        .date-chip-lg {
          display: grid; place-items: center; background: var(--red-tint); color: var(--red-deep);
          border-radius: 14px; padding: 14px 18px; min-width: 76px; flex-shrink: 0; line-height: 1.1; height: fit-content;
        }
        .date-chip-lg strong { font-family: var(--font-display); font-size: 30px; }
        .date-chip-lg small { font-size: 11px; text-transform: uppercase; letter-spacing: .08em; }
      `}</style>
    </>
  )
}
