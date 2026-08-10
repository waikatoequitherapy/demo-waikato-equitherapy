import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Reveal from '@/components/Reveal'
import { horses } from '@/lib/horses'
import { site } from '@/lib/site'
import { assetPath } from '@/lib/path'

export const metadata: Metadata = {
  title: 'Our horses',
  description:
    'Meet the ten horses and ponies of Waikato Equitherapy, and find out how horse sponsorship helps cover feed, farrier and vet costs.',
}

const costs: [string, string][] = [
  ['Hard feed and hay', 'Year round, and more of it through winter'],
  ['Farrier', 'Every six to eight weeks, per horse'],
  ['Vet and dentist', 'Routine care plus whatever the paddock throws up'],
  ['Tack and rugs', 'Repaired and replaced as they wear out'],
]

export default function HorsesPage() {
  return (
    <>
      <section style={{ background: 'var(--oat)', paddingTop: 56, paddingBottom: 56 }}>
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">The herd</span>
            <h1 className="display-xl" style={{ margin: '20px 0 20px', maxWidth: 760 }}>
              Ten horses and ponies, and every rider’s favourite
            </h1>
            <p className="lede" style={{ maxWidth: 620 }}>
              They are the reason any of this works. Sponsoring a horse helps cover feed, farrier and vet bills,
              and keeps them fit, sound and happy in their work.
            </p>
            <div className="row" style={{ marginTop: 28 }}>
              <Link href="/support" className="btn btn-primary">Sponsor a horse</Link>
              <a href={site.givealittle} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Donate on Givealittle ↗</a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="herd-grid">
            {horses.map((h, i) => (
              <Reveal key={h.name} delay={(i % 4) * 90}>
                <article className="stall">
                  <div className="arch stall-photo">
                    <Image
                      src={assetPath(h.image)}
                      alt={`${h.name}, one of the Waikato Equitherapy therapy horses`}
                      fill
                      sizes="(max-width: 640px) 45vw, (max-width: 1000px) 30vw, 250px"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <h2 className="stall-name">{h.name}</h2>
                  {h.bio && <p className="body small stall-bio">{h.bio}</p>}
                  {h.facts && (
                    <dl className="stall-facts">
                      {h.facts.map(([k, v]) => (
                        <div key={k}>
                          <dt>{k}</dt>
                          <dd>{v}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                  <Link href={`/contact?subject=Sponsoring ${h.name}`} className="btn btn-ghost btn-sm stall-cta">
                    Sponsor {h.name}
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-dark section">
        <div className="wrap">
          <div className="grid grid-2" style={{ gap: 48, alignItems: 'center' }}>
            <div>
              <span className="eyebrow">Where sponsorship goes</span>
              <h2 className="display-lg" style={{ margin: '18px 0 16px' }}>Keeping ten horses in work</h2>
              <p style={{ color: 'rgba(255,255,255,.78)' }}>
                A therapy horse needs to be calm, sound and well conditioned to carry riders who cannot always balance
                themselves. That takes steady, unglamorous spending, all year, whether or not a term is running.
              </p>
              <Link href="/contact" className="btn btn-light" style={{ marginTop: 26 }}>Talk to us about sponsoring</Link>
            </div>
            <div>
              {costs.map(([k, v]) => (
                <div key={k} style={{ borderTop: '1px solid rgba(255,255,255,.16)', padding: '16px 0' }}>
                  <strong style={{ display: 'block', color: '#fff', fontFamily: 'var(--font-display)', fontSize: 18 }}>{k}</strong>
                  <span style={{ color: 'rgba(255,255,255,.68)', fontSize: 14 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .herd-grid {
          display: grid; gap: 28px;
          grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
        }
        .stall { text-align: center; }
        .stall-photo {
          position: relative; aspect-ratio: 3 / 4; background: var(--sand);
          border: 1px solid var(--rule); box-shadow: var(--shadow-sm);
          transition: transform .3s cubic-bezier(.2,.7,.3,1), box-shadow .3s ease;
        }
        .stall:hover .stall-photo { transform: translateY(-6px); box-shadow: var(--shadow-md); }
        .stall-photo img { transition: transform .6s cubic-bezier(.2,.7,.3,1); }
        .stall:hover .stall-photo img { transform: scale(1.05); }
        .stall-name { font-size: 24px; margin: 16px 0 6px; }
        .stall-bio { margin-bottom: 12px; }
        .stall-facts { margin: 0 0 14px; font-size: 13px; color: var(--stone); }
        .stall-facts div { display: flex; justify-content: center; gap: 6px; }
        .stall-facts dt { font-weight: 600; }
        .stall-facts dd { margin: 0; }
        .stall-cta { margin-top: 4px; }
      `}</style>
    </>
  )
}
