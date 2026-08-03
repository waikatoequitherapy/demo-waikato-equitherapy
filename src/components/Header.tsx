'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from '@/components/Logo'
import { site } from '@/lib/site'

const links = [
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Our services' },
  { href: '/hoofbeats', label: 'Hoofbeats' },
  { href: '/horses', label: 'Our horses' },
  { href: '/volunteer', label: 'Volunteer' },
  { href: '/events', label: 'Events' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <>
      <header
        style={{
          position: 'sticky', top: 0, zIndex: 50,
          background: scrolled ? 'rgba(255,255,255,0.94)' : 'var(--white)',
          backdropFilter: scrolled ? 'saturate(180%) blur(12px)' : 'none',
          borderBottom: `1px solid ${scrolled ? 'var(--rule)' : 'transparent'}`,
          boxShadow: scrolled ? '0 6px 20px -18px rgba(36,30,26,.6)' : 'none',
          transition: 'background .25s ease, border-color .25s ease, box-shadow .25s ease',
        }}
      >
        <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 'var(--header-h)', gap: 16 }}>
          <Link href="/" className="brand" aria-label="Waikato Equitherapy, home">
            <Logo markHeight={42} priority />
          </Link>

          <nav className="nav-desktop" aria-label="Main">
            {links.map(l => (
              <Link key={l.href} href={l.href} className={`nav-link ${isActive(l.href) ? 'is-active' : ''}`}>
                {l.label}
              </Link>
            ))}
            <Link href="/support" className="btn btn-primary btn-sm" style={{ marginLeft: 8 }}>Donate</Link>
          </nav>

          <button
            className="nav-toggle"
            onClick={() => setOpen(v => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span style={{ transform: open ? 'translateY(6px) rotate(45deg)' : 'none' }} />
            <span style={{ opacity: open ? 0 : 1 }} />
            <span style={{ transform: open ? 'translateY(-6px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>
      </header>

      <div
        className="drawer"
        style={{ opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none' }}
        onClick={() => setOpen(false)}
      >
        <div
          className="drawer-panel"
          style={{ transform: open ? 'translateX(0)' : 'translateX(100%)' }}
          onClick={e => e.stopPropagation()}
        >
          <nav aria-label="Mobile">
            {links.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                className={`drawer-link ${isActive(l.href) ? 'is-active' : ''}`}
                style={{ transitionDelay: `${open ? 60 + i * 28 : 0}ms`, opacity: open ? 1 : 0, transform: open ? 'none' : 'translateX(14px)' }}
              >
                {l.label}
              </Link>
            ))}
            <Link href="/support" className="btn btn-primary" style={{ width: '100%', marginTop: 18 }}>Donate</Link>
            <a href={site.phoneHref} className="btn btn-ghost" style={{ width: '100%', marginTop: 10 }}>Call or text {site.phone}</a>
          </nav>
        </div>
      </div>

      <style>{`
        .brand { display: flex; align-items: center; text-decoration: none; flex-shrink: 0; }

        .nav-desktop { display: none; align-items: center; gap: 2px; }
        .nav-link {
          position: relative; padding: 8px 11px; border-radius: 8px; font-size: 14px;
          font-weight: 600; text-decoration: none; color: var(--muted-text); white-space: nowrap;
          transition: color .18s ease;
        }
        .nav-link::after {
          content: ''; position: absolute; left: 11px; right: 11px; bottom: 2px; height: 2px;
          background: var(--clay); border-radius: 2px; transform: scaleX(0); transform-origin: left;
          transition: transform .22s cubic-bezier(.2,.7,.3,1);
        }
        .nav-link:hover { color: var(--ink); }
        .nav-link:hover::after, .nav-link.is-active::after { transform: scaleX(1); }
        .nav-link.is-active { color: var(--clay); }

        .nav-toggle {
          display: grid; gap: 5px; width: 44px; height: 44px; padding: 12px 10px;
          background: none; border: 1px solid var(--rule); border-radius: 12px; cursor: pointer;
        }
        .nav-toggle span {
          display: block; height: 2px; width: 100%; background: var(--ink); border-radius: 2px;
          transition: transform .25s ease, opacity .2s ease;
        }

        .drawer {
          position: fixed; inset: 0; z-index: 55; background: rgba(36,30,26,.42);
          transition: opacity .25s ease;
        }
        .drawer-panel {
          position: absolute; top: 0; right: 0; height: 100%; width: min(340px, 86vw);
          background: var(--oat); padding: 88px 24px 32px; overflow-y: auto;
          box-shadow: var(--shadow-lg); transition: transform .32s cubic-bezier(.2,.7,.3,1);
        }
        .drawer-link {
          display: block; padding: 13px 12px; border-radius: 12px; text-decoration: none;
          font-family: var(--font-display); font-size: 20px; color: var(--ink);
          border-bottom: 1px solid var(--rule);
          transition: opacity .3s ease, transform .3s ease, background .18s ease;
        }
        .drawer-link.is-active { color: var(--clay); }

        @media (min-width: 1060px) {
          .nav-desktop { display: flex; }
          .nav-toggle { display: none; }
          .drawer { display: none; }
        }
      `}</style>
    </>
  )
}
