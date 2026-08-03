import Link from 'next/link'
import Logo from '@/components/Logo'
import { site } from '@/lib/site'

const explore: [string, string][] = [
  ['/about', 'About us'],
  ['/services', 'Our services'],
  ['/hoofbeats', 'Hoofbeats'],
  ['/horses', 'Our horses'],
  ['/gallery', 'Gallery'],
  ['/faq', 'FAQ'],
]

const involved: [string, string][] = [
  ['/volunteer', 'Volunteer'],
  ['/support', 'Support us'],
  ['/events', 'Events'],
  ['/contact', 'Contact'],
]

const formLinks: [string, string][] = [
  ['/forms/rider-consent-form-2026.pdf', 'Rider consent form'],
  ['/forms/medical-consent-form-2026.pdf', 'Medical consent form'],
  ['/forms/hoofbeats-consent-form-2026.pdf', 'Hoofbeats form'],
  ['/forms/volunteer-form-2026.pdf', 'Volunteer form'],
]

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <div className="footer-brand">
          <Logo variant="light" markHeight={50} />
          <p className="footer-blurb">
            Therapeutic riding for children and adults with special needs, in Newstead, Hamilton.
            Running in the Waikato since {site.established}.
          </p>
          <div className="hoof-trail footer-hooves">
            <span /><span /><span /><span />
          </div>
        </div>

        <nav className="footer-col" aria-label="Explore">
          <p className="foot-heading">Explore</p>
          {explore.map(([href, label]) => (
            <Link key={href} href={href} className="foot-link">{label}</Link>
          ))}
        </nav>

        <nav className="footer-col" aria-label="Get involved">
          <p className="foot-heading">Get involved</p>
          {involved.map(([href, label]) => (
            <Link key={href} href={href} className="foot-link">{label}</Link>
          ))}
          <a href={site.givealittle} target="_blank" rel="noopener noreferrer" className="foot-link">
            Givealittle ↗
          </a>
        </nav>

        <nav className="footer-col" aria-label="Forms">
          <p className="foot-heading">Forms</p>
          {formLinks.map(([href, label]) => (
            <a key={href} href={href} className="foot-link">{label}</a>
          ))}
        </nav>

        <div className="footer-col footer-contact">
          <p className="foot-heading">Contact</p>
          <p className="foot-address">{site.address}</p>
          <a href={site.phoneHref} className="foot-link">{site.phone} (call or text)</a>
          <a href={`mailto:${site.emailGeneral}`} className="foot-link">{site.emailGeneral}</a>
          <a href={`mailto:${site.emailBilling}`} className="foot-link">{site.emailBilling} (billing)</a>
          <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="foot-link">Facebook ↗</a>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="wrap footer-bottom-inner">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span>Registered charity {site.charityNumber}</span>
        </div>
      </div>
    </footer>
  )
}
