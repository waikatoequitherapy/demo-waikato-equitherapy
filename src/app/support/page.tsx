import type { Metadata } from 'next'
import Link from 'next/link'
import Reveal from '@/components/Reveal'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Support us',
  description:
    'Donate, sponsor a horse or rider, give through payroll giving, or leave a gift in your will. Waikato Equitherapy receives no government funding.',
}

const ways = [
  {
    title: 'Give through Givealittle',
    body: 'The quickest way to make a one-off or regular donation. Donations of $5 or more to a registered charity qualify for a New Zealand tax credit.',
    cta: { label: 'Donate on Givealittle ↗', href: site.givealittle, external: true },
  },
  {
    title: 'Direct bank transfer',
    body: `Account ${site.bankAccount}, reference "${site.bankReference}". Email ${site.emailBilling} if you would like a receipt for your tax credit.`,
  },
  {
    title: 'Sponsor a horse',
    body: 'Cover feed, farrier and vet costs for one of the ten horses in our herd. We will tell you how your horse is getting on through the season.',
    cta: { label: 'Meet the horses', href: '/horses' },
  },
  {
    title: 'Sponsor a rider',
    body: 'Not every family can meet the term fee. Sponsoring a rider keeps a place open for someone who would otherwise miss out.',
    cta: { label: 'Talk to us', href: '/contact' },
  },
  {
    title: 'Payroll giving',
    body: 'If your employer offers payroll giving, donate $3 and roughly $1 comes back to you through the tax credit, automatically, every pay.',
    cta: { label: 'Ask us how', href: '/contact' },
  },
  {
    title: 'Corporate partnership',
    body: 'Sponsor the arena, an event or a season of sessions. Team volunteering days are welcome too, and they are genuinely useful.',
    cta: { label: 'Start a conversation', href: '/contact' },
  },
]

export default function SupportPage() {
  return (
    <>
      <section style={{ background: 'var(--oat)', paddingTop: 56, paddingBottom: 56 }}>
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">Give back</span>
            <h1 className="display-xl" style={{ margin: '20px 0 20px', maxWidth: 720 }}>
              We receive no government funding
            </h1>
            <p className="lede" style={{ maxWidth: 620 }}>
              Fees cover only a fraction of what it costs to run the centre. Everything else comes from grants,
              fundraising and people in the Waikato deciding this is worth keeping.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="grid grid-3">
            {ways.map((w, i) => (
              <Reveal key={w.title} delay={(i % 3) * 100}>
                <article className="card card-hover" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <h2 style={{ fontSize: 21, marginBottom: 10 }}>{w.title}</h2>
                  <p className="body small" style={{ flex: 1, marginBottom: 20 }}>{w.body}</p>
                  {w.cta && (
                    w.cta.external ? (
                      <a href={w.cta.href} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm" style={{ alignSelf: 'flex-start' }}>
                        {w.cta.label}
                      </a>
                    ) : (
                      <Link href={w.cta.href} className="btn btn-ghost btn-sm" style={{ alignSelf: 'flex-start' }}>
                        {w.cta.label}
                      </Link>
                    )
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sand section-sm">
        <div className="wrap">
          <Reveal>
            <div className="card" style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ maxWidth: 560 }}>
                <h2 style={{ fontSize: 24, marginBottom: 8 }}>A gift in your will</h2>
                <p className="body small">
                  A bequest keeps riders in the saddle long after the rest of us have hung up our boots.
                  Your solicitor will need our full name, {site.name}, and our charity number, {site.charityNumber}.
                </p>
              </div>
              <Link href="/contact" className="btn btn-primary">Get in touch</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
