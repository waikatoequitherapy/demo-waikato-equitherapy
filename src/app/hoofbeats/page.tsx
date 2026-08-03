import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Reveal from '@/components/Reveal'
import { fees, site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Hoofbeats',
  description:
    'Hoofbeats Sunday riding ($35 a lesson) and three-day school holiday programmes ($250) at Waikato Equitherapy, open to all children.',
}

export default function HoofbeatsPage() {
  return (
    <>
      <section style={{ background: 'var(--oat)', paddingTop: 56, paddingBottom: 64 }}>
        <div className="wrap">
          <div className="hb-hero">
            <Reveal>
              <div className="arch frame" style={{ position: 'relative', aspectRatio: '9 / 10', maxWidth: 420 }}>
                <Image
                  src="/images/hoofbeats-family.jpg"
                  alt="A family together with a young rider during a Sunday session"
                  fill
                  sizes="(max-width: 900px) 90vw, 420px"
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>
            </Reveal>
            <Reveal delay={100}>
              <span className="eyebrow">Riding for everyone</span>
              <h1 className="display-xl" style={{ margin: '20px 0 20px' }}>Hoofbeats</h1>
              <p className="lede">
                Sunday group rides and school-holiday programmes, open to all children, with or without special needs.
                Siblings ride together, friends come along, and nobody is treated as a special case.
              </p>
              <div className="row" style={{ marginTop: 28 }}>
                <a href="/forms/hoofbeats-consent-form-2026.pdf" className="btn btn-primary" download>Download the Hoofbeats form</a>
                <Link href="/contact" className="btn btn-ghost">Ask about a spot</Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="grid grid-2">
            {[
              {
                tag: 'About 46 Sundays a year',
                title: 'Sunday riding',
                body: 'Group riding lessons on Sunday mornings, taught by our coaches with volunteers leading and side-walking. Riders build skills week by week at their own pace.',
                price: fees.sundayRide,
                rows: [['Open to', 'All children, 3 and over'], ['Runs', 'Sunday mornings, about 46 weeks a year'], ['Form', 'One Hoofbeats form']],
              },
              {
                tag: 'Eight programmes a year',
                title: 'Holiday programme',
                body: 'Three days in the school holidays, catering for around 90 children a year. Riding, grooming, feeding out and learning how a stable actually works.',
                price: fees.holidayProgramme,
                rows: [['Open to', 'All children'], ['Runs', 'Eight three-day programmes a year'], ['Form', 'Same Hoofbeats form']],
              },
            ].map((p, i) => (
              <Reveal key={p.title} delay={i * 120}>
                <article className="card card-hover" style={{ height: '100%' }}>
                  <span className="pill">{p.tag}</span>
                  <h2 style={{ fontSize: 26, margin: '16px 0 12px' }}>{p.title}</h2>
                  <p className="body small" style={{ marginBottom: 20 }}>{p.body}</p>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--clay)', marginBottom: 20 }}>{p.price}</p>
                  <div style={{ borderTop: '1px solid var(--rule)', paddingTop: 16 }}>
                    {p.rows.map(([l, v]) => (
                      <div key={l} style={{ display: 'flex', justifyContent: 'space-between', gap: 14, fontSize: 14, marginBottom: 7 }}>
                        <span className="muted">{l}</span>
                        <span style={{ fontWeight: 600, textAlign: 'right' }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sand section-sm">
        <div className="wrap">
          <Reveal>
            <div className="card" style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ maxWidth: 520 }}>
                <h2 style={{ fontSize: 24, marginBottom: 8 }}>One form covers both</h2>
                <p className="body small">
                  You only need the Hoofbeats consent form to register for Sunday riding or a holiday programme.
                  Send it to {site.emailGeneral}, or bring it with you on the day.
                </p>
              </div>
              <a href="/forms/hoofbeats-consent-form-2026.pdf" className="btn btn-primary" download>Hoofbeats form (PDF)</a>
            </div>
          </Reveal>
        </div>
      </section>

      <style>{`
        .hb-hero { display: grid; gap: 48px; align-items: center; grid-template-columns: 1fr; }
        @media (min-width: 940px) { .hb-hero { grid-template-columns: .85fr 1.15fr; } }
      `}</style>
    </>
  )
}
