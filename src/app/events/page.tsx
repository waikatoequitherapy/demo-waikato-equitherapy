import type { Metadata } from 'next'
import Reveal from '@/components/Reveal'
import EventsList from '@/components/EventsList'

export const metadata: Metadata = {
  title: 'Events',
  description: 'Fundraisers, open days and community events at Waikato Equitherapy.',
}

export default function EventsPage() {
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

      <section className="section">
        <div className="wrap">
          <Reveal>
            <h2 className="display-lg" style={{ marginBottom: 32 }}>Coming up</h2>
          </Reveal>

          <EventsList />
        </div>
      </section>

      <style>{`
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
