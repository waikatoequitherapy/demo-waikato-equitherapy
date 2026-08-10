import Link from 'next/link'
import Image from 'next/image'
// import { getEvents } from '@/lib/api'
import { site, fees, impact } from '@/lib/site'
import { horses } from '@/lib/horses'
import Reveal from '@/components/Reveal'
import CountUp from '@/components/CountUp'
import Testimonials from '@/components/Testimonials'
import { assetPath } from '@/lib/path'

export const metadata = {
  title: 'Waikato Equitherapy | Therapeutic riding in Hamilton',
  description:
    'Therapeutic horse riding for children and adults with special needs in Newstead, Hamilton. Twenty sessions a week, ten horses, and about 85 volunteers.',
}

const benefits = [
  {
    title: 'Body and movement',
    body: 'The horse’s walk mirrors the human gait, so a rider builds core strength, balance, coordination and muscle tone without it ever feeling like exercise.',
    icon: 'M4 17c2.5-6 5-9 8-9s5.5 3 8 9M8 8V5m8 3V5',
  },
  {
    title: 'Mind and mood',
    body: 'Sessions settle the nervous system. Families tell us about calmer behaviour, less anxiety and better attention and memory in the days afterwards.',
    icon: 'M12 20a8 8 0 1 0-8-8c0 2.5 1 4 2 5.5V20h6Z',
  },
  {
    title: 'Confidence and connection',
    body: 'Being trusted with an animal much bigger than you changes how you see yourself. Riders make friends, hold conversations, and take that home with them.',
    icon: 'M8 13a4 4 0 1 1 8 0M5 20c1-3 3.5-4.5 7-4.5S18 17 19 20',
  },
]

const programmes = [
  {
    tag: 'Four terms a year',
    title: 'Therapy Programme',
    body: 'Our core programme. Around ten weeks a term, up to four riders per slot, always with an experienced coach and trained volunteers.',
    price: fees.therapyTerm,
    href: '/services',
  },
  {
    tag: '46 Sundays a year',
    title: 'Sunday riding',
    body: 'Group lessons on Sunday mornings, open to children with or without special needs. One Hoofbeats form covers you.',
    price: fees.sundayRide,
    href: '/hoofbeats',
  },
  {
    tag: 'School holidays',
    title: 'Hoofbeats holiday programme',
    body: 'Eight three-day programmes a year for around 90 children. Riding, horse care, and a proper day out at the centre.',
    price: fees.holidayProgramme,
    href: '/hoofbeats',
  },
]

export default async function HomePage() {
  // const events = await getEvents().catch(() => [])
   const events: any[] = []
  const upcoming = events.slice(0, 2)

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section style={{ background: 'var(--oat)', paddingTop: 56, paddingBottom: 72, overflow: 'hidden' }}>
        <div className="wrap">
          <div className="hero-grid">
            <div>
              <Reveal>
                <span className="eyebrow">Newstead, Hamilton · since {site.established}</span>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="display-xl" style={{ margin: '20px 0 22px' }}>
                  Horses helping humans,<br />
                  <span style={{ color: 'var(--clay)', fontStyle: 'italic', fontWeight: 500 }}>one walk at a time</span>
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="lede" style={{ maxWidth: 520 }}>
                  We provide therapeutic riding to children and adults with a wide range of special needs,
                  building physical strength, calmer days and real friendships, in a place where nobody has to explain themselves.
                </p>
              </Reveal>
              <Reveal delay={240}>
                <div className="row" style={{ marginTop: 32 }}>
                  <Link href="/services" className="btn btn-primary">Start riding with us</Link>
                  <Link href="/volunteer" className="btn btn-ghost">Volunteer</Link>
                </div>
              </Reveal>

              {upcoming.length > 0 && (
                <Reveal delay={320}>
                  <Link href="/events" className="event-teaser">
                    <span className="date-chip">
                      <strong>{new Date(upcoming[0].eventDate).getDate()}</strong>
                      <small>{new Date(upcoming[0].eventDate).toLocaleString('en-NZ', { month: 'short' })}</small>
                    </span>
                    <span>
                      <strong style={{ display: 'block', fontSize: 15 }}>{upcoming[0].name}</strong>
                      <span className="muted small">{upcoming[0].location}</span>
                    </span>
                    <span style={{ marginLeft: 'auto', color: 'var(--clay)' }}>→</span>
                  </Link>
                </Reveal>
              )}
            </div>

            <Reveal delay={120}>
              <div className="hero-art">
                <div className="arch frame" style={{ aspectRatio: '4 / 5', position: 'relative' }}>
                  <Image
                    src={assetPath("/images/hero-horse-bond.jpg")}
                    alt="A young rider resting her head against her horse during a quiet moment at the centre"
                    fill
                    sizes="(max-width: 900px) 90vw, 480px"
                    style={{ objectFit: 'cover' }}
                    priority
                  />
                </div>
                <div className="hero-badge">
                  <strong>50+</strong>
                  <span>years in the<br />Waikato</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Impact ---------- */}
      <section className="bg-sand section-sm">
        <div className="wrap">
          <div className="grid grid-4">
            {impact.map((s, i) => (
              <Reveal key={s.label} delay={i * 90}>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.4rem, 5vw, 3.4rem)', color: 'var(--clay)', lineHeight: 1 }}>
                    <CountUp to={s.number} />
                  </p>
                  <p className="small muted" style={{ marginTop: 8 }}>{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={360}>
            <p className="small muted center" style={{ marginTop: 28 }}>
              Twenty riding sessions a week, up to four riders in each slot, every one supervised by a coach and trained volunteers.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- What riding does ---------- */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">What time on a horse does</span>
            <h2 className="display-lg" style={{ margin: '18px 0 12px', maxWidth: 620 }}>
              The therapy happens while everyone is just having a good time
            </h2>
            <p className="lede" style={{ maxWidth: 620 }}>
              Riders come to us with cerebral palsy, autism, Down syndrome, brain injury and much else besides.
              What they have in common is that thirty minutes in the saddle does things a clinic room cannot.
            </p>
          </Reveal>

          <div className="grid grid-3" style={{ marginTop: 44 }}>
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 110}>
                <article className="card card-hover" style={{ height: '100%' }}>
                  <span style={{
                    width: 44, height: 44, borderRadius: 14, background: 'var(--clay-tint)',
                    display: 'grid', placeItems: 'center', marginBottom: 18,
                  }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d={b.icon} stroke="var(--clay)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <h3 style={{ fontSize: 21, marginBottom: 10 }}>{b.title}</h3>
                  <p className="body small">{b.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Programmes ---------- */}
      <section className="bg-sand section">
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">Our services</span>
            <h2 className="display-lg" style={{ margin: '18px 0 0' }}>Three ways to ride with us</h2>
          </Reveal>

          <div className="grid grid-3" style={{ marginTop: 40 }}>
            {programmes.map((p, i) => (
              <Reveal key={p.title} delay={i * 110}>
                <Link href={p.href} className="card card-hover" style={{ height: '100%', display: 'block', textDecoration: 'none' }}>
                  <span className="pill">{p.tag}</span>
                  <h3 style={{ fontSize: 23, margin: '16px 0 10px' }}>{p.title}</h3>
                  <p className="body small" style={{ marginBottom: 20 }}>{p.body}</p>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--clay)' }}>{p.price}</p>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={340}>
            <div className="row" style={{ marginTop: 36 }}>
              <Link href="/services" className="btn btn-primary">See fees, times and forms</Link>
              <Link href="/faq" className="btn btn-ghost">Read the FAQ</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Meet the herd ---------- */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
              <div>
                <span className="eyebrow">The herd</span>
                <h2 className="display-lg" style={{ margin: '18px 0 10px' }}>Ten horses and ponies do the real work</h2>
                <p className="lede" style={{ maxWidth: 560 }}>
                  Feed, farrier and vet bills do not stop between terms. Sponsoring a horse is the most direct way to keep a rider in the saddle.
                </p>
              </div>
              <Link href="/horses" className="btn btn-ghost">Meet them all</Link>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="herd-strip">
              {horses.map(h => (
                <Link key={h.name} href="/horses" className="herd-card">
                  <span className="arch" style={{ display: 'block', position: 'relative', aspectRatio: '3 / 4', background: 'var(--sand)' }}>
                    <Image
                      src={assetPath(h.image)}
                      alt={`${h.name}, one of our therapy horses`}
                      fill
                      sizes="180px"
                      style={{ objectFit: 'cover' }}
                    />
                  </span>
                  <span className="herd-name">{h.name}</span>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Testimonials ---------- */}
      <section className="bg-dark section">
        <div className="wrap">
          <span className="eyebrow">Our stories</span>
          <div style={{ marginTop: 26 }}>
            <Testimonials />
          </div>
        </div>
      </section>

      {/* ---------- Volunteers ---------- */}
      <section className="section">
        <div className="wrap">
          <div className="split">
            <Reveal>
              <div className="arch frame" style={{ position: 'relative', aspectRatio: '6 / 5' }}>
                <Image
                  src={assetPath("/images/volunteer-team.jpg")}
                  alt="Volunteers standing together with one of the therapy horses"
                  fill
                  sizes="(max-width: 900px) 90vw, 500px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </Reveal>
            <Reveal delay={120}>
              <span className="eyebrow">Volunteers</span>
              <h2 className="display-lg" style={{ margin: '18px 0 14px' }}>
                About 6,000 hours a year, given freely
              </h2>
              <p className="body" style={{ marginBottom: 22 }}>
                Around 85 people volunteer with us across a year, and about 25 are on the roster in a typical week,
                each giving roughly six hours. They lead horses, walk beside riders, run the office, fix fences and
                bake for fundraisers. Most had no horse experience when they started.
              </p>
              <div className="row">
                <Link href="/volunteer" className="btn btn-primary">Volunteer with us</Link>
                <a href={assetPath("/forms/volunteer-form-2026.pdf")} className="btn btn-ghost" target="_blank" rel="noopener noreferrer">
                  Download the form
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Support CTA ---------- */}
      <section style={{ background: 'var(--clay)', color: '#fff' }} className="section-sm">
        <div className="wrap" style={{ display: 'flex', flexWrap: 'wrap', gap: 28, alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ maxWidth: 560 }}>
            <h2 className="display-md" style={{ color: '#fff', marginBottom: 10 }}>We get no government funding</h2>
            <p style={{ color: 'rgba(255,255,255,.85)' }}>
              Fees cover a fraction of what it costs to run the centre. The rest comes from grants, events
              and people in the Waikato deciding this matters.
            </p>
          </div>
          <div className="row">
            <Link href="/support" className="btn btn-light">Ways to give</Link>
            <a href={site.givealittle} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light">Givealittle ↗</a>
          </div>
        </div>
      </section>

      {/* ---------- Events ---------- */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">What’s on</span>
            <h2 className="display-lg" style={{ margin: '18px 0 32px' }}>Upcoming events</h2>
          </Reveal>

          {events.length === 0 ? (
            <Reveal>
              <div className="card" style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: 21, marginBottom: 6 }}>Nothing on the calendar right now</h3>
                  <p className="muted small">Our quiz night and open days are announced on Facebook first.</p>
                </div>
                <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Follow us on Facebook</a>
              </div>
            </Reveal>
          ) : (
            <div className="grid grid-2">
              {upcoming.map((e: any, i: number) => {
                const d = new Date(e.eventDate)
                return (
                  <Reveal key={e.id} delay={i * 110}>
                    <article className="card card-hover" style={{ display: 'flex', gap: 18 }}>
                      <span className="date-chip">
                        <strong>{d.getDate()}</strong>
                        <small>{d.toLocaleString('en-NZ', { month: 'short' })}</small>
                      </span>
                      <div>
                        <h3 style={{ fontSize: 20, marginBottom: 4 }}>{e.name}</h3>
                        <p className="muted small" style={{ marginBottom: 8 }}>{e.location}</p>
                        <p className="body small">{e.description}</p>
                      </div>
                    </article>
                  </Reveal>
                )
              })}
            </div>
          )}

          <Reveal delay={220}>
            <Link href="/events" className="btn btn-ghost" style={{ marginTop: 28 }}>All events</Link>
          </Reveal>
        </div>
      </section>

      <style>{`
        .hero-grid {
          display: grid; gap: 56px; align-items: center;
          grid-template-columns: 1fr;
        }
        @media (min-width: 940px) { .hero-grid { grid-template-columns: 1.05fr .95fr; } }

        .hero-art { position: relative; max-width: 480px; margin: 0 auto; }
        .hero-badge {
          position: absolute; left: -14px; bottom: 34px; background: var(--black); color: #fff;
          border-radius: 18px; padding: 16px 20px; box-shadow: var(--shadow-lg); text-align: center;
        }
        .hero-badge strong { display: block; font-family: var(--font-display); font-size: 30px; line-height: 1; }
        .hero-badge span { font-size: 11px; letter-spacing: .1em; text-transform: uppercase; color: var(--red-bright); }

        .event-teaser {
          display: inline-flex; align-items: center; gap: 16px; margin-top: 36px;
          background: #fff; border: 1px solid var(--rule); border-radius: 16px;
          padding: 12px 18px 12px 12px; text-decoration: none; box-shadow: var(--shadow-sm);
          transition: transform .2s ease, box-shadow .2s ease;
        }
        .event-teaser:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }

        .date-chip {
          display: grid; place-items: center; background: var(--red-tint); color: var(--red-deep);
          border-radius: 12px; padding: 10px 14px; min-width: 58px; flex-shrink: 0; line-height: 1.1;
        }
        .date-chip strong { font-family: var(--font-display); font-size: 24px; }
        .date-chip small { font-size: 11px; text-transform: uppercase; letter-spacing: .08em; }

        .herd-strip {
          display: grid; grid-auto-flow: column; grid-auto-columns: 168px; gap: 16px;
          overflow-x: auto; padding-bottom: 14px; scroll-snap-type: x mandatory;
          scrollbar-width: thin;
        }
        .herd-card { scroll-snap-align: start; text-decoration: none; display: block; }
        .herd-card .arch { transition: transform .3s cubic-bezier(.2,.7,.3,1), box-shadow .3s ease; }
        .herd-card:hover .arch { transform: translateY(-6px); box-shadow: var(--shadow-md); }
        .herd-name {
          display: block; text-align: center; margin-top: 10px; font-family: var(--font-display);
          font-size: 17px; color: var(--ink);
        }

        .split { display: grid; gap: 48px; align-items: center; grid-template-columns: 1fr; }
        @media (min-width: 900px) { .split { grid-template-columns: 1fr 1fr; } }
      `}</style>
    </>
  )
}
