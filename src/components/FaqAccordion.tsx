'use client'
import { useMemo, useState } from 'react'
import { faqs, faqCategories } from '@/lib/faq'

export default function FaqAccordion() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<string>('All')
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const results = useMemo(() => {
    const q = query.toLowerCase().trim()
    return faqs.filter(f => {
      const inCategory = category === 'All' || f.category === category
      if (!inCategory) return false
      if (!q) return true
      return (
        f.q.toLowerCase().includes(q) ||
        f.a.toLowerCase().includes(q) ||
        f.keywords.some(k => k.includes(q))
      )
    })
  }, [query, category])

  return (
    <div>
      <div style={{ position: 'relative', marginBottom: 16 }}>
        <svg
          width="17" height="17" viewBox="0 0 20 20" fill="none" aria-hidden="true"
          style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--stone)' }}
        >
          <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.8" />
          <path d="M13.5 13.5 17 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <input
          className="input"
          style={{ paddingLeft: 42, borderRadius: 999 }}
          placeholder="Search the questions: fees, helmets, funding"
          value={query}
          onChange={e => { setQuery(e.target.value); setOpenIndex(null) }}
          aria-label="Search frequently asked questions"
        />
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
        {['All', ...faqCategories].map(cat => (
          <button
            key={cat}
            onClick={() => { setCategory(cat); setOpenIndex(null) }}
            className="filter-chip"
            aria-pressed={category === cat}
            style={{
              background: category === cat ? 'var(--clay)' : '#fff',
              color: category === cat ? '#fff' : 'var(--body-text)',
              borderColor: category === cat ? 'var(--clay)' : 'var(--rule)',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {results.length === 0 ? (
        <div className="card center" style={{ padding: 40 }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, marginBottom: 8 }}>Nothing matched that.</p>
          <p className="muted small">Try a different word, or ask us directly on 021 378 030.</p>
        </div>
      ) : (
        <div style={{ borderTop: '1px solid var(--rule)' }}>
          {results.map((f, i) => {
            const isOpen = openIndex === i
            return (
              <div key={f.q} style={{ borderBottom: '1px solid var(--rule)' }}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  style={{
                    width: '100%', display: 'flex', gap: 16, alignItems: 'center', justifyContent: 'space-between',
                    background: 'none', border: 0, padding: '22px 4px', cursor: 'pointer', textAlign: 'left',
                    fontFamily: 'var(--font-display)', fontSize: 18, color: isOpen ? 'var(--clay)' : 'var(--ink)',
                    transition: 'color .18s ease',
                  }}
                >
                  <span>{f.q}</span>
                  <span
                    aria-hidden="true"
                    style={{
                      flexShrink: 0, width: 28, height: 28, borderRadius: '50%',
                      border: '1.5px solid var(--rule)', display: 'grid', placeItems: 'center',
                      transform: isOpen ? 'rotate(45deg)' : 'none', transition: 'transform .25s ease, border-color .2s ease',
                      borderColor: isOpen ? 'var(--clay)' : 'var(--rule)',
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                    transition: 'grid-template-rows .3s cubic-bezier(.2,.7,.3,1)',
                  }}
                >
                  <div style={{ overflow: 'hidden' }}>
                    <p className="body" style={{ padding: '0 4px 22px', maxWidth: 640 }}>{f.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <p className="muted small" style={{ marginTop: 18 }}>
        Showing {results.length} of {faqs.length} questions.
      </p>

      <style>{`
        .filter-chip {
          border: 1.5px solid var(--rule); border-radius: 999px; padding: 8px 15px;
          font-family: var(--font-body); font-size: 13px; font-weight: 600; cursor: pointer;
          transition: background .18s ease, color .18s ease, border-color .18s ease;
        }
      `}</style>
    </div>
  )
}
