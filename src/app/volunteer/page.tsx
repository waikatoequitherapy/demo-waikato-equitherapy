import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Reveal from '@/components/Reveal'
import { site, volunteerFacts, pendingForms } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Volunteer',
  description:
    'Volunteer with Waikato Equitherapy in Newstead, Hamilton. Around 85 volunteers give roughly 6,000 hours a year. No horse experience needed.',
}

const roles = [
  ['Horse leader', 'Lead the horse during a therapy session, keeping the pace steady and the rider settled.'],
  ['Side-walker', 'Walk beside the rider, offering support and encouragement through the session.'],
  ['Horse care', 'Grooming, feeding out, rugs, paddock rotation and general looking-after of the herd.'],
  ['Administration', 'Office support, phones, rosters, records and keeping the paperwork honest.'],
  ['Fundraising', 'Help run the quiz night, grant applications and community fundraising.'],
  ['Marketing', 'Photos, social posts and telling people in the Waikato what happens out here.'],
  ['Maintenance', 'Fences, gates, gardens, trades work and keeping the property tidy and safe.'],
  ['Event support', 'A pair of hands on event days: setup, registration and packdown.'],
]

export default function VolunteerPage() {
  return (
    <>
      <section style={{ background: 'var(--oat)', paddingTop: 56, paddingBottom: 64 }}>
        <div className="wrap">
          <div className="vol-hero">
            <Reveal>
              <span className="eyebrow">Get involved</span>
              <h1 className="display-xl" style={{ margin: '20px 0 20px' }}>Volunteer with us</h1>
              <p className="lede" style={{ maxWidth: 520 }}>
                Our volunteers are aged from 14 to 80-plus, and most had never handled a horse before they walked in.
                There is a role here that fits around your week.
              </p>
              <div className="row" style={{ marginTop: 28 }}>
                <a href="/forms/volunteer-form-2026.pdf" className="btn btn-primary" download>Download the volunteer form</a>
                <Link href="/contact" className="btn btn-ghost">Ask a question first</Link>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="arch frame" style={{ position: 'relative', aspectRatio: '6 / 5', maxWidth: 460, marginLeft: 'auto' }}>
                <Image
                  src="/images/volunteer-team.jpg"
                  alt="Volunteers standing together with one of the therapy horses"
                  fill
                  sizes="(max-width: 900px) 90vw, 460px"
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-sand section-sm">
        <div className="wrap">
          <div className="grid grid-4">
            {volunteerFacts.map(([n, l], i) => (
              <Reveal key={l} delay={i * 90}>
                <div>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 38, color: 'var(--clay)', lineHeight: 1 }}>{n}</p>
                  <p className="small muted" style={{ marginTop: 6 }}>{l}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">Roles</span>
            <h2 className="display-lg" style={{ margin: '18px 0 12px' }}>Where you might fit</h2>
            <p className="lede" style={{ maxWidth: 600 }}>
              Roughly half our roles never involve leading a horse. Tell us what you are good at and we will find the gap.
            </p>
          </Reveal>

          <div className="grid grid-3" style={{ marginTop: 40 }}>
            {roles.map(([title, desc], i) => (
              <Reveal key={title} delay={(i % 3) * 100}>
                <article className="card card-hover" style={{ height: '100%' }}>
                  <h3 style={{ fontSize: 19, marginBottom: 8 }}>{title}</h3>
                  <p className="body small">{desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-dark section" id="forms">
        <div className="wrap">
          <div className="grid grid-2" style={{ gap: 48, alignItems: 'center' }}>
            <div>
              <span className="eyebrow">How to join</span>
              <h2 className="display-lg" style={{ margin: '18px 0 16px' }}>Three steps and you are in</h2>
              <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 18 }}>
                {[
                  ['Send in the volunteer form', 'Tell us your availability and the roles that interest you.'],
                  ['Complete a police vetting form', 'Required for adult volunteers. We will send it through with your welcome pack.'],
                  ['Come for a session alongside someone experienced', 'You will be paired with a seasoned volunteer until you feel confident.'],
                ].map(([t, d], i) => (
                  <li key={t} style={{ display: 'flex', gap: 14 }}>
                    <span style={{
                      width: 28, height: 28, borderRadius: '50%', background: 'var(--red-bright)', color: 'var(--black)',
                      display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 13, flexShrink: 0,
                    }}>{i + 1}</span>
                    <div>
                      <strong style={{ display: 'block', color: '#fff' }}>{t}</strong>
                      <span style={{ color: 'rgba(255,255,255,.7)', fontSize: 14 }}>{d}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <div style={{ background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.16)', borderRadius: 18, padding: 28 }}>
                <h3 style={{ fontSize: 21, color: '#fff', marginBottom: 14 }}>Volunteer documents</h3>
                <a href="/forms/volunteer-form-2026.pdf" className="btn btn-light" style={{ width: '100%', marginBottom: 10 }} download>
                  Volunteer form 2026 (PDF)
                </a>
                <p style={{ color: 'rgba(255,255,255,.6)', fontSize: 13, marginTop: 14 }}>
                  Still to come online: {pendingForms.join(' and ')}. Ask at the office and we will hand you a copy.
                </p>
                <hr style={{ border: 0, borderTop: '1px solid rgba(255,255,255,.16)', margin: '20px 0' }} />
                <p style={{ color: 'rgba(255,255,255,.78)', fontSize: 14 }}>
                  Questions? Call or text Nickie on{' '}
                  <a href={site.phoneHref} style={{ color: 'var(--red-bright)', fontWeight: 700 }}>{site.phone}</a>.
                  Texts are welcome.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .vol-hero { display: grid; gap: 48px; align-items: center; grid-template-columns: 1fr; }
        @media (min-width: 940px) { .vol-hero { grid-template-columns: 1.05fr .95fr; } }
      `}</style>
    </>
  )
}
