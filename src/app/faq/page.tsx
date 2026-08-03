import type { Metadata } from 'next'
import Link from 'next/link'
import Reveal from '@/components/Reveal'
import FaqAccordion from '@/components/FaqAccordion'
import { faqs } from '@/lib/faq'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Answers to the questions we get asked most about therapeutic riding at Waikato Equitherapy. Fees, funding, ages, helmets, volunteering and sponsorship.',
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function FaqPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section style={{ background: 'var(--oat)', paddingTop: 56, paddingBottom: 48 }}>
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">Questions</span>
            <h1 className="display-xl" style={{ margin: '20px 0 18px', maxWidth: 720 }}>
              Everything people ask us before their first visit
            </h1>
            <p className="lede" style={{ maxWidth: 600 }}>
              Search it, filter it, or open the paddock guide in the corner of your screen and just ask.
            </p>
          </Reveal>
        </div>
      </section>

      <section style={{ paddingBottom: 80 }}>
        <div className="wrap" style={{ maxWidth: 860 }}>
          <FaqAccordion />
        </div>
      </section>

      <section className="bg-sand section-sm">
        <div className="wrap center">
          <Reveal>
            <h2 className="display-md" style={{ marginBottom: 12 }}>Still not sure?</h2>
            <p className="lede" style={{ maxWidth: 520, margin: '0 auto 28px' }}>
              Every rider is different, so the honest answer to a lot of questions is “come and see”.
              Call or text Nickie on {site.phone}.
            </p>
            <div className="row" style={{ justifyContent: 'center' }}>
              <Link href="/contact" className="btn btn-primary">Send an enquiry</Link>
              <a href={site.phoneHref} className="btn btn-ghost">Call or text {site.phone}</a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
