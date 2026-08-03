import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Chatbot from '@/components/Chatbot'
import BackToTop from '@/components/BackToTop'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.waikatoequi.co.nz'),
  title: {
    default: 'Waikato Equitherapy | Therapeutic riding in Hamilton',
    template: '%s | Waikato Equitherapy',
  },
  applicationName: 'Waikato Equitherapy',
  description:
    'Therapeutic horse riding and horse-interaction programmes for children and adults with special needs, in Newstead, Hamilton. A Waikato charity since 1972.',
  keywords: [
    'equitherapy', 'therapeutic riding Hamilton', 'riding for the disabled Waikato',
    'horse therapy New Zealand', 'special needs riding Hamilton',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_NZ',
    siteName: 'Waikato Equitherapy',
    title: 'Waikato Equitherapy | Horses helping humans',
    description:
      'Therapeutic riding for children and adults with special needs in Newstead, Hamilton. Riding in the Waikato since 1972.',
    images: ['/images/hero-horse-bond.jpg'],
  },
  robots: { index: true, follow: true },
}

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'NGO',
  name: site.name,
  alternateName: 'Waikato Equitherapy',
  url: 'https://www.waikatoequi.co.nz',
  logo: 'https://www.waikatoequi.co.nz/logo.png',
  description:
    'Therapeutic riding and horse-interaction programmes for children and adults with special needs in the Waikato.',
  foundingDate: '1972',
  email: site.emailGeneral,
  telephone: '+64 21 378 030',
  sameAs: [site.facebook, site.givealittle],
  address: {
    '@type': 'PostalAddress',
    streetAddress: '68 Vaile Road',
    addressLocality: 'Newstead, Hamilton',
    addressRegion: 'Waikato',
    postalCode: '3286',
    addressCountry: 'NZ',
  },
  areaServed: 'Waikato, New Zealand',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NZ">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Karla:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Chatbot />
        <BackToTop />
      </body>
    </html>
  )
}
