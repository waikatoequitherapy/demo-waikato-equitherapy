import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Reveal from '@/components/Reveal'
import CountUp from '@/components/CountUp'
import { site, volunteerFacts } from '@/lib/site'

export const metadata: Metadata = {
  title: 'About us',
  description:
    'Waikato Equitherapy has been running therapeutic riding programmes in the Waikato since 1972, and has been at 68 Vaile Road, Newstead since 2006.',
}

const timeline: [string, string, string][] = [
  ['1972', 'We begin', 'Riding programmes start for the Hamilton community.'],
  ['1980', 'Foreman Park', 'We run out of Foreman Park, off Avalon Drive in Hamilton, and incorporate as the NZ Riding for the Disabled Association (Waikato Group) on 21 May.'],
  ['2006', 'Vaile Road', 'We move onto our current grounds at 68 Vaile Road, Newstead: the paddocks, arena and stables we still use today.'],
  ['2018', 'A new name', 'We become Waikato Equitherapy Incorporated, so we can cater to a wider range of clients than the old name suggested.'],
  ['Today', 'Twenty sessions a week', 'A registered charity running the Therapy Programme, Sunday riding and Hoofbeats holiday programmes, with 111 therapeutic riders in 2025.'],
]

export default function AboutPage() {
  return (
    <>
      <section style={{ background: 'var(--oat)', paddingTop: 56, paddingBottom: 64 }}>
        <div className="wrap">
          <div className="about-hero">
            <Reveal>
              <div className="arch frame" style={{ position: 'relative', aspectRatio: '4 / 5', maxWidth: 440 }}>
                <Image
                  src="/images/about-multigenerational.jpg"
                  alt="A volunteer walking beside a young rider on a pony in the arena"
                  fill
                  sizes="(max-width: 900px) 90vw, 440px"
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>
            </Reveal>
            <Reveal delay={100}>
              <span className="eyebrow">Who we are</span>
              <h1 className="display-xl" style={{ margin: '20px 0 20px' }}>
                Fifty years of the Waikato turning up for each other
              </h1>
              <p className="lede">
                Waikato Equitherapy Incorporated provides therapeutic riding to children and adults with a wide range
                of special needs. The overriding aim is to improve the physical, socio-emotional and cognitive
                wellbeing of our clients, in a supportive and fun environment.
              </p>
              <p className="body" style={{ marginTop: 18 }}>
                We deliver twenty riding sessions a week, with up to four riders in each time slot. Every session is
                supervised by an experienced coach and trained volunteers.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-sand section-sm">
        <div className="wrap">
          <div className="grid grid-4">
            {[
              [111, 'Therapeutic riders in 2025'],
              [160, 'Days of riding a year'],
              [46, 'Sundays of Hoofbeats riding'],
              [90, 'Children at holiday programmes'],
            ].map(([n, l], i) => (
              <Reveal key={l as string} delay={i * 90}>
                <div className="center">
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 4.5vw, 3rem)', color: 'var(--clay)', lineHeight: 1 }}>
                    <CountUp to={n as number} />
                  </p>
                  <p className="small muted" style={{ marginTop: 8 }}>{l as string}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">Our history</span>
            <h2 className="display-lg" style={{ margin: '18px 0 44px' }}>How we got here</h2>
          </Reveal>

          <ol className="timeline">
            {timeline.map(([year, title, text], i) => (
              <Reveal as="li" key={year} delay={i * 90} className="timeline-item">
                <span className="timeline-year">{year}</span>
                <div>
                  <h3 style={{ fontSize: 21, marginBottom: 6 }}>{title}</h3>
                  <p className="body small" style={{ maxWidth: 640 }}>{text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-dark section">
        <div className="wrap">
          <span className="eyebrow">Our volunteers</span>
          <h2 className="display-lg" style={{ margin: '18px 0 14px' }}>The centre runs on goodwill</h2>
          <p style={{ color: 'rgba(255,255,255,.78)', maxWidth: 620, marginBottom: 40 }}>
            Our team of volunteers is vital to our ability to run the centre and deliver our riding programmes.
          </p>
          <div className="grid grid-4">
            {volunteerFacts.map(([n, l], i) => (
              <Reveal key={l} delay={i * 90}>
                <div>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 40, color: 'var(--red-bright)', lineHeight: 1 }}>{n}</p>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,.72)', marginTop: 8 }}>{l}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap center">
          <Reveal>
            <div className="hoof-trail" style={{ justifyContent: 'center', marginBottom: 24 }}>
              <span /><span /><span /><span />
            </div>
            <h2 className="display-lg" style={{ marginBottom: 14 }}>Come and be part of our whānau</h2>
            <p className="lede" style={{ maxWidth: 540, margin: '0 auto 32px' }}>
              Riders, families, volunteers and horses. Most people find they feel part of it by the second visit.
            </p>
            <div className="row" style={{ justifyContent: 'center' }}>
              <Link href="/contact" className="btn btn-primary">Get in touch</Link>
              <Link href="/volunteer" className="btn btn-ghost">Volunteer with us</Link>
            </div>
            <p className="small muted" style={{ marginTop: 26 }}>
              Registered charity {site.charityNumber} · {site.address}
            </p>
          </Reveal>
        </div>
      </section>

      <style>{`
        .about-hero { display: grid; gap: 48px; align-items: center; grid-template-columns: 1fr; }
        @media (min-width: 940px) { .about-hero { grid-template-columns: .85fr 1.15fr; } }

        .timeline { list-style: none; margin: 0; padding: 0; position: relative; }
        .timeline::before {
          content: ''; position: absolute; left: 46px; top: 8px; bottom: 8px; width: 2px;
          background: linear-gradient(var(--rule), var(--clay-tint));
        }
        .timeline-item {
          display: grid; grid-template-columns: 96px 1fr; gap: 22px; align-items: start;
          padding-bottom: 34px; position: relative;
        }
        .timeline-year {
          font-family: var(--font-display); font-size: 15px; font-weight: 700; color: var(--clay);
          background: var(--clay-tint); border-radius: 999px; padding: 6px 0; text-align: center;
          position: relative; z-index: 1;
        }
        @media (max-width: 620px) {
          .timeline::before { left: 40px; }
          .timeline-item { grid-template-columns: 82px 1fr; gap: 16px; }
        }
      `}</style>
    </>
  )
}
