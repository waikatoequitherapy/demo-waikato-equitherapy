import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Reveal from '@/components/Reveal'
import { site, fees, forms, pendingForms } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Our services',
  description:
    'Therapy Programme, Sunday riding and Hoofbeats holiday programmes at Waikato Equitherapy. Fees, session times, forms and how to get started.',
}

const steps = [
  ['Get in touch', 'Ring or text Nickie on 021 378 030, or send an enquiry through the contact form. Tell us a little about the rider.'],
  ['Come for a free assessment ride', 'No cost, no commitment. We see how the rider goes and you see how the place feels.'],
  ['Talk through goals', 'We work out which programme fits, what a session would look like, and what to expect over a term.'],
  ['Sort funding if you need it', 'Most disability funders cover Equitherapy, including Enabling Good Lives. We will help you navigate it.'],
  ['Complete the forms', 'Therapy riders complete a rider form and a medical form. Hoofbeats has a single form for Sunday riding and holiday programmes.'],
]

export default function ServicesPage() {
  return (
    <>
      <section style={{ background: 'var(--oat)', paddingTop: 56, paddingBottom: 64 }}>
        <div className="wrap">
          <div className="svc-hero">
            <Reveal>
              <span className="eyebrow">What we offer</span>
              <h1 className="display-xl" style={{ margin: '20px 0 20px' }}>Our services</h1>
              <p className="lede" style={{ maxWidth: 520 }}>
                Three programmes, one arena. The Therapy Programme runs four terms a year, Sunday riding runs
                about 46 Sundays, and Hoofbeats holiday programmes fill the school breaks.
              </p>
              <div className="row" style={{ marginTop: 28 }}>
                <Link href="/contact" className="btn btn-primary">Book a free assessment ride</Link>
                <a href="#forms" className="btn btn-ghost">Jump to the forms</a>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="arch frame" style={{ position: 'relative', aspectRatio: '4 / 5', maxWidth: 420, marginLeft: 'auto' }}>
                <Image
                  src="/images/how-we-help-riding.jpg"
                  alt="A coach leading a horse while a young rider sits in the saddle"
                  fill
                  sizes="(max-width: 900px) 90vw, 420px"
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Therapy programme */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">Programme one</span>
            <h2 className="display-lg" style={{ margin: '18px 0 14px' }}>Therapy Programme</h2>
            <p className="lede" style={{ maxWidth: 640 }}>
              Our core programme, for children and adults with special needs. Four terms a year, each around ten weeks,
              with up to four riders in a time slot and an experienced coach plus trained volunteers on every session.
            </p>
          </Reveal>

          <div className="grid grid-2" style={{ marginTop: 40, alignItems: 'start' }}>
            <Reveal>
              <div className="spec">
                {[
                  ['Fee', fees.therapyTerm],
                  ['Session length', '30 minutes'],
                  ['Terms', 'Four a year, about 10 weeks each'],
                  ['Days', 'Wed, Thu, Sat 10am–12:30pm · Fri 1–3:30pm'],
                  ['Riders per slot', 'Up to 4'],
                  ['Minimum age', '2 years, case by case'],
                  ['Maximum rider weight', '75 kg'],
                  ['Helmets', 'Required, and available at the centre'],
                  ['Forms', 'Rider form and medical form'],
                ].map(([l, v], i) => (
                  <div key={l} className="spec-row" style={{ background: i % 2 ? 'var(--oat)' : '#fff' }}>
                    <span className="muted small">{l}</span>
                    <span style={{ fontWeight: 600 }}>{v}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="card" style={{ background: 'var(--clay-tint)', border: 'none' }}>
                <h3 style={{ fontSize: 22, marginBottom: 18 }}>Getting started</h3>
                <ol className="steps">
                  {steps.map(([t, d], i) => (
                    <li key={t}>
                      <span className="step-num">{i + 1}</span>
                      <div>
                        <strong style={{ display: 'block', fontSize: 15, marginBottom: 3 }}>{t}</strong>
                        <span className="small" style={{ color: 'var(--muted-text)' }}>{d}</span>
                      </div>
                    </li>
                  ))}
                </ol>
                <Link href="/contact" className="btn btn-primary" style={{ marginTop: 22 }}>Start with a chat</Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Hoofbeats */}
      <section className="bg-sand section">
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">Programmes two and three</span>
            <h2 className="display-lg" style={{ margin: '18px 0 14px' }}>Hoofbeats: Sunday riding and holiday programmes</h2>
            <p className="lede" style={{ maxWidth: 640 }}>
              Hoofbeats is open to all children, with or without special needs. One form covers both.
            </p>
          </Reveal>

          <div className="grid grid-2" style={{ marginTop: 36 }}>
            {[
              {
                tag: 'About 46 Sundays a year',
                title: 'Sunday riding',
                body: 'Group riding lessons on Sunday mornings. A good fit for siblings who want to ride too, and for children who are not on the Therapy Programme.',
                price: fees.sundayRide,
              },
              {
                tag: 'Eight programmes a year',
                title: 'Holiday programme',
                body: 'Three-day school holiday programmes for around 90 children a year. Riding, grooming, horse care, and a proper day out at the centre.',
                price: fees.holidayProgramme,
              },
            ].map((p, i) => (
              <Reveal key={p.title} delay={i * 120}>
                <article className="card card-hover" style={{ height: '100%' }}>
                  <span className="pill-mono pill">{p.tag}</span>
                  <h3 style={{ fontSize: 24, margin: '16px 0 10px' }}>{p.title}</h3>
                  <p className="body small" style={{ marginBottom: 18 }}>{p.body}</p>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 21, color: 'var(--clay)', marginBottom: 20 }}>{p.price}</p>
                  <a href="/forms/hoofbeats-consent-form-2026.pdf" className="btn btn-ghost btn-sm">Hoofbeats form (PDF)</a>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={260}>
            <Link href="/hoofbeats" className="btn btn-primary" style={{ marginTop: 32 }}>More about Hoofbeats</Link>
          </Reveal>
        </div>
      </section>

      {/* Forms */}
      <section className="section" id="forms">
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">Paperwork</span>
            <h2 className="display-lg" style={{ margin: '18px 0 14px' }}>Forms to download</h2>
            <p className="lede" style={{ maxWidth: 620 }}>
              Print, fill in and bring them along, or email them to {site.emailGeneral}.
            </p>
          </Reveal>

          <div className="grid grid-2" style={{ marginTop: 36 }}>
            {forms.map((f, i) => (
              <Reveal key={f.file} delay={i * 90}>
                <a href={f.file} className="card card-hover form-card" download>
                  <span className="form-icon" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M14 3v5h5M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8l-5-5Z" stroke="var(--clay)" strokeWidth="1.8" strokeLinejoin="round" />
                      <path d="M12 11v6m0 0-2.5-2.5M12 17l2.5-2.5" stroke="var(--clay)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div>
                    <span className="pill" style={{ marginBottom: 8, display: 'inline-block' }}>{f.who}</span>
                    <h3 style={{ fontSize: 19, marginBottom: 5 }}>{f.name}</h3>
                    <p className="muted small">{f.note}</p>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>

          {pendingForms.length > 0 && (
            <Reveal delay={260}>
              <p className="small muted" style={{ marginTop: 24 }}>
                Coming soon: {pendingForms.join(' · ')}. Ask at the office in the meantime.
              </p>
            </Reveal>
          )}
        </div>
      </section>

      <style>{`
        .svc-hero { display: grid; gap: 48px; align-items: center; grid-template-columns: 1fr; }
        @media (min-width: 940px) { .svc-hero { grid-template-columns: 1.1fr .9fr; } }

        .spec { border: 1px solid var(--rule); border-radius: 16px; overflow: hidden; }
        .spec-row {
          display: flex; gap: 16px; justify-content: space-between; align-items: baseline;
          padding: 13px 20px; font-size: 14px;
        }
        .spec-row span:last-child { text-align: right; }

        .steps { list-style: none; margin: 0; padding: 0; display: grid; gap: 16px; }
        .steps li { display: flex; gap: 13px; align-items: flex-start; }
        .step-num {
          width: 26px; height: 26px; border-radius: 50%; background: var(--clay); color: #fff;
          display: grid; place-items: center; font-size: 12px; font-weight: 700; flex-shrink: 0;
        }

        .form-card { display: flex; gap: 16px; align-items: flex-start; text-decoration: none; }
        .form-icon {
          width: 44px; height: 44px; border-radius: 12px; background: var(--clay-tint);
          display: grid; place-items: center; flex-shrink: 0;
        }
      `}</style>
    </>
  )
}
