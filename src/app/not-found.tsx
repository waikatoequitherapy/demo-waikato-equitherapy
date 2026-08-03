import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="section">
      <div className="wrap center" style={{ paddingTop: 40, paddingBottom: 40 }}>
        <div className="hoof-trail" style={{ justifyContent: 'center', marginBottom: 24 }}>
          <span /><span /><span /><span />
        </div>
        <h1 className="display-lg" style={{ marginBottom: 14 }}>That page has wandered off</h1>
        <p className="lede" style={{ maxWidth: 460, margin: '0 auto 30px' }}>
          The link may be old, or the page may have moved. Try the services page, or ask the paddock guide in the corner.
        </p>
        <div className="row" style={{ justifyContent: 'center' }}>
          <Link href="/" className="btn btn-primary">Back to the home page</Link>
          <Link href="/contact" className="btn btn-ghost">Contact us</Link>
        </div>
      </div>
    </section>
  )
}
