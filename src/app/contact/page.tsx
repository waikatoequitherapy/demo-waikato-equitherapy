import type { Metadata } from 'next'
import { Suspense } from 'react'
import Reveal from '@/components/Reveal'
import ContactForm from './ContactForm'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact Waikato Equitherapy. Call or text 021 378 030, email secretary@waikatoequi.co.nz, or visit 68 Vaile Road, Newstead, Hamilton.',
}

export default function ContactPage() {
  return (
    <>
      <section style={{ background: 'var(--oat)', paddingTop: 56, paddingBottom: 44 }}>
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">Contact</span>
            <h1 className="display-xl" style={{ margin: '20px 0 18px' }}>Get in touch</h1>
            <p className="lede" style={{ maxWidth: 560 }}>
              Questions about riding, volunteering or supporting us? A text is often the quickest way to reach Nickie.
            </p>
          </Reveal>
        </div>
      </section>

      <section style={{ paddingBottom: 20 }}>
        <div className="wrap">
          <div className="grid grid-3">
            <Reveal>
              <div className="card" style={{ height: '100%' }}>
                <h2 style={{ fontSize: 19, marginBottom: 10 }}>Call or text</h2>
                <a href={site.phoneHref} style={{ fontFamily: 'var(--font-display)', fontSize: 26, color: 'var(--clay)', textDecoration: 'none' }}>
                  {site.phone}
                </a>
                <p className="muted small" style={{ marginTop: 10 }}>
                  {site.manager}, Centre Manager. {site.phoneNote}
                </p>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="card" style={{ height: '100%' }}>
                <h2 style={{ fontSize: 19, marginBottom: 10 }}>Email</h2>
                <a href={`mailto:${site.emailGeneral}`} className="small" style={{ display: 'block', color: 'var(--clay)', fontWeight: 700, marginBottom: 6 }}>
                  {site.emailGeneral}
                </a>
                <p className="muted small" style={{ marginBottom: 14 }}>General enquiries</p>
                <a href={`mailto:${site.emailBilling}`} className="small" style={{ display: 'block', color: 'var(--clay)', fontWeight: 700, marginBottom: 6 }}>
                  {site.emailBilling}
                </a>
                <p className="muted small">Billing and invoices, {site.billingContact}</p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="card" style={{ height: '100%' }}>
                <h2 style={{ fontSize: 19, marginBottom: 10 }}>Visit or message</h2>
                <p className="small" style={{ marginBottom: 14 }}>{site.address}</p>
                <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
                  Message us on Facebook ↗
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="contact-split">
            <Reveal>
              <h2 className="display-md" style={{ marginBottom: 8 }}>Send us a message</h2>
              <p className="muted small" style={{ marginBottom: 26 }}>
                We read everything that comes through, and reply to most enquiries within a couple of days.
              </p>
              <Suspense fallback={<p className="muted small">Loading the form…</p>}>
                <ContactForm />
              </Suspense>
            </Reveal>

            <Reveal delay={120}>
              <div className="map-frame">
                <iframe
                  title="Map showing Waikato Equitherapy at 68 Vaile Road, Newstead, Hamilton"
                  src={`https://www.google.com/maps?q=${site.mapQuery}&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{ border: 0, width: '100%', height: '100%' }}
                />
              </div>
              <div className="card" style={{ marginTop: 20 }}>
                <h3 style={{ fontSize: 18, marginBottom: 8 }}>Finding us</h3>
                <p className="body small">
                  We are on Vaile Road in Newstead, a few minutes east of Hamilton off State Highway 26.
                  There is parking on site. If it is your first visit, ring ahead and we will meet you at the gate.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <style>{`
        .contact-split { display: grid; gap: 48px; grid-template-columns: 1fr; align-items: start; }
        @media (min-width: 940px) { .contact-split { grid-template-columns: 1fr 1fr; } }
        .map-frame {
          height: 340px; border-radius: 18px; overflow: hidden;
          border: 1px solid var(--rule); box-shadow: var(--shadow-md); background: var(--sand);
        }
      `}</style>
    </>
  )
}
