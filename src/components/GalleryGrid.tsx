'use client'
import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { assetPath } from '@/lib/path';

export type GalleryItem = { id: string; imageUrl: string; title: string; category?: string }

export default function GalleryGrid({ images }: { images: GalleryItem[] }) {
  const [filter, setFilter] = useState('All')
  const [active, setActive] = useState<number | null>(null)

  const categories = ['All', ...Array.from(new Set(images.map(i => i.category).filter(Boolean) as string[]))]
  const shown = filter === 'All' ? images : images.filter(i => i.category === filter)

  const step = useCallback((dir: number) => {
    setActive(cur => {
      if (cur === null) return cur
      return (cur + dir + shown.length) % shown.length
    })
  }, [shown.length])

  useEffect(() => {
    if (active === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null)
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [active, step])

  return (
    <>
      {categories.length > 2 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              aria-pressed={filter === cat}
              style={{
                border: '1.5px solid', borderRadius: 999, padding: '8px 16px', cursor: 'pointer',
                fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600,
                background: filter === cat ? 'var(--clay)' : '#fff',
                color: filter === cat ? '#fff' : 'var(--body-text)',
                borderColor: filter === cat ? 'var(--clay)' : 'var(--rule)',
                transition: 'all .18s ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="masonry">
        {shown.map((img, i) => (
          <button
            key={img.id}
            className="tile"
            onClick={() => setActive(i)}
            aria-label={`Open photo: ${img.title}`}
          >
            <Image
              src={assetPath(img.imageUrl)}
              alt={img.title}
              width={600}
              height={800}
              sizes="(max-width: 640px) 50vw, (max-width: 1000px) 33vw, 260px"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
            <span className="tile-caption">{img.title}</span>
          </button>
        ))}
      </div>

      {active !== null && shown[active] && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={shown[active].title} onClick={() => setActive(null)}>
          <button className="lb-close" onClick={() => setActive(null)} aria-label="Close">×</button>
          <button className="lb-nav lb-prev" onClick={e => { e.stopPropagation(); step(-1) }} aria-label="Previous photo">‹</button>
          <figure onClick={e => e.stopPropagation()}>
            <Image
              // src={shown[active].imageUrl}
              src={assetPath(shown[active].imageUrl)}
              alt={shown[active].title}
              width={1200}
              height={1200}
              sizes="90vw"
              style={{ width: 'auto', height: 'auto', maxWidth: '90vw', maxHeight: '78vh', objectFit: 'contain', borderRadius: 12 }}
            />
            <figcaption>{shown[active].title}<span> · {active + 1} of {shown.length}</span></figcaption>
          </figure>
          <button className="lb-nav lb-next" onClick={e => { e.stopPropagation(); step(1) }} aria-label="Next photo">›</button>
        </div>
      )}

      <style>{`
        .masonry { columns: 4 240px; column-gap: 16px; }
        .tile {
          display: block; width: 100%; padding: 0; border: 1px solid var(--rule); background: var(--sand);
          border-radius: 14px; overflow: hidden; margin: 0 0 16px; break-inside: avoid; cursor: zoom-in;
          position: relative; transition: transform .28s cubic-bezier(.2,.7,.3,1), box-shadow .28s ease;
        }
        .tile:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }
        .tile img { transition: transform .5s cubic-bezier(.2,.7,.3,1); }
        .tile:hover img { transform: scale(1.045); }
        .tile-caption {
          position: absolute; left: 0; right: 0; bottom: 0; padding: 26px 14px 12px;
          background: linear-gradient(to top, rgba(36,30,26,.82), transparent);
          color: #fff; font-size: 12.5px; text-align: left; opacity: 0; transition: opacity .25s ease;
        }
        .tile:hover .tile-caption, .tile:focus-visible .tile-caption { opacity: 1; }

        .lightbox {
          position: fixed; inset: 0; z-index: 80; background: rgba(20,16,14,.93);
          display: grid; place-items: center; padding: 24px;
          animation: fade .2s ease;
        }
        @keyframes fade { from { opacity: 0 } to { opacity: 1 } }
        .lightbox figure { margin: 0; text-align: center; animation: rise .28s cubic-bezier(.2,.7,.3,1); }
        @keyframes rise { from { opacity: 0; transform: scale(.97) } to { opacity: 1; transform: none } }
        .lightbox figcaption { color: rgba(255,255,255,.78); font-size: 13px; margin-top: 14px; }
        .lightbox figcaption span { color: rgba(255,255,255,.45); }
        .lb-close {
          position: absolute; top: 18px; right: 22px; background: none; border: 0; color: #fff;
          font-size: 34px; line-height: 1; cursor: pointer; opacity: .8;
        }
        .lb-nav {
          position: absolute; top: 50%; transform: translateY(-50%); background: rgba(255,255,255,.1);
          border: 0; color: #fff; font-size: 34px; width: 48px; height: 48px; border-radius: 50%;
          cursor: pointer; line-height: 1; transition: background .18s ease;
        }
        .lb-nav:hover { background: rgba(255,255,255,.22); }
        .lb-prev { left: 16px; } .lb-next { right: 16px; }
        @media (max-width: 640px) { .lb-nav { width: 40px; height: 40px; font-size: 26px; } }
      `}</style>
    </>
  )
}
