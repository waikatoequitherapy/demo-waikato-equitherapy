'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { faqs } from '@/lib/faq'
import { site, fees } from '@/lib/site'

type Msg = { from: 'bot' | 'user'; text: string; links?: { label: string; href: string }[] }

const GREETING: Msg = {
  from: 'bot',
  text: `Kia ora. I'm the paddock guide. I can answer the questions we get asked most. Pick one below, or type your own.`,
}

const QUICK = [
  'How do I get started?',
  'How much does it cost?',
  'Can I use my disability funding?',
  'How do I volunteer?',
  'Where are you?',
  'Can I sponsor a horse?',
]

// Short-circuit answers that are not a straight FAQ lookup.
const SHORTCUTS: { match: RegExp; reply: Msg }[] = [
  {
    match: /^(hi|hey|hello|kia ora|gidday|g'day|morena)\b/i,
    reply: { from: 'bot', text: 'Kia ora. What would you like to know about riding, volunteering or supporting us?' },
  },
  {
    match: /\b(thanks|thank you|ta|cheers|choice)\b/i,
    reply: { from: 'bot', text: 'No trouble at all. Anything else I can help with?' },
  },
  {
    match: /\b(phone|call|text|number|contact|email|reach)\b/i,
    reply: {
      from: 'bot',
      text: `Call or text Nickie on ${site.phone}. Texts are welcome, voice messages less so. General enquiries go to ${site.emailGeneral}, and billing questions to ${site.emailBilling}.`,
      links: [{ label: 'Contact page', href: '/contact' }],
    },
  },
  {
    match: /\b(form|paperwork|download|police|vetting|handbook)\b/i,
    reply: {
      from: 'bot',
      text: 'All our current forms are on the services and volunteer pages: rider and medical consent for the Therapy Programme, one Hoofbeats form for Sunday riding and holiday programmes, and the volunteer form.',
      links: [
        { label: 'Rider forms', href: '/services#forms' },
        { label: 'Volunteer form', href: '/volunteer#forms' },
      ],
    },
  },
  {
    match: /\b(book|booking|register|enrol|enroll|apply)\b/i,
    reply: {
      from: 'bot',
      text: `The first step is always a chat and a free assessment ride. Text or ring ${site.phone}, or send an enquiry through the contact form and Nickie will come back to you.`,
      links: [{ label: 'Send an enquiry', href: '/contact' }],
    },
  },
]

const LINKS_BY_CATEGORY: Record<string, { label: string; href: string }> = {
  'Riding with us': { label: 'Our services', href: '/services' },
  'Costs & funding': { label: 'Fees and programmes', href: '/services' },
  'On the day': { label: 'Find us', href: '/contact' },
  Volunteering: { label: 'Volunteer with us', href: '/volunteer' },
  'Supporting us': { label: 'Ways to help', href: '/support' },
}

function normalise(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9$ ]/g, ' ').replace(/\s+/g, ' ').trim()
}

function findAnswer(input: string): Msg {
  const text = normalise(input)

  for (const s of SHORTCUTS) if (s.match.test(input)) return s.reply

  let best: { score: number; faq: (typeof faqs)[number] | null } = { score: 0, faq: null }

  for (const faq of faqs) {
    let score = 0
    for (const kw of faq.keywords) if (text.includes(normalise(kw))) score += 3
    const qWords = normalise(faq.q).split(' ').filter(w => w.length > 3)
    for (const w of qWords) if (text.includes(w)) score += 1
    if (score > best.score) best = { score, faq }
  }

  if (best.faq && best.score >= 3) {
    const link = LINKS_BY_CATEGORY[best.faq.category]
    return { from: 'bot', text: best.faq.a, links: link ? [link] : undefined }
  }

  return {
    from: 'bot',
    text: `I'm not certain about that one, and I would rather not guess. Nickie will know, so call or text ${site.phone}, or email ${site.emailGeneral}. In the meantime: Therapy Programme riding is ${fees.therapyTerm}, Sunday riding is ${fees.sundayRide}.`,
    links: [
      { label: 'All FAQs', href: '/faq' },
      { label: 'Contact us', href: '/contact' },
    ],
  }
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState<Msg[]>([GREETING])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' })
  }, [msgs, typing, open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const send = (text: string) => {
    const clean = text.trim()
    if (!clean) return
    setMsgs(m => [...m, { from: 'user', text: clean }])
    setInput('')
    setTyping(true)
    window.setTimeout(() => {
      setTyping(false)
      setMsgs(m => [...m, findAnswer(clean)])
    }, 520)
  }

  return (
    <>
      <button
        onClick={() => setOpen(v => !v)}
        aria-label={open ? 'Close the help assistant' : 'Open the help assistant'}
        aria-expanded={open}
        className="chat-fab"
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <>
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M21 11.5a8.5 8.5 0 0 1-12.3 7.6L3.5 20.5l1.4-5A8.5 8.5 0 1 1 21 11.5Z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
            </svg>
            <span className="chat-fab-label">Ask a question</span>
          </>
        )}
      </button>

      <div
        className="chat-panel"
        role="dialog"
        aria-label="Waikato Equitherapy help assistant"
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transform: open ? 'translateY(0) scale(1)' : 'translateY(14px) scale(.97)',
        }}
      >
        <div className="chat-head">
          <span className="chat-avatar" aria-hidden="true">
            <Image src="/logo-mark.png" alt="" width={380} height={230} />
          </span>
          <div>
            <strong style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 16 }}>Paddock guide</strong>
            <span style={{ fontSize: 12, color: 'var(--stone)' }}>Answers from our FAQ, any time</span>
          </div>
          <button onClick={() => setOpen(false)} aria-label="Close" className="chat-close">×</button>
        </div>

        <div className="chat-body" ref={bodyRef}>
          {msgs.map((m, i) => (
            <div key={i} className={`bubble ${m.from}`}>
              <p style={{ margin: 0 }}>{m.text}</p>
              {m.links && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
                  {m.links.map(l => (
                    <a key={l.href} href={l.href} className="bubble-link">{l.label} →</a>
                  ))}
                </div>
              )}
            </div>
          ))}

          {typing && (
            <div className="bubble bot" aria-live="polite">
              <span className="dots"><i /><i /><i /></span>
            </div>
          )}

          {msgs.length <= 1 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
              {QUICK.map(q => (
                <button key={q} onClick={() => send(q)} className="chip">{q}</button>
              ))}
            </div>
          )}
        </div>

        <form
          className="chat-foot"
          onSubmit={e => { e.preventDefault(); send(input) }}
        >
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type your question…"
            aria-label="Type your question"
          />
          <button type="submit" aria-label="Send">
            <svg width="17" height="17" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M3 10h13M11 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </form>

        <p className="chat-note">
          This is an automated helper. For anything specific to your rider, please talk to Nickie on {site.phone}.
        </p>
      </div>

      <style>{`
        .chat-fab {
          position: fixed; right: 20px; bottom: 24px; z-index: 60;
          display: inline-flex; align-items: center; gap: 9px;
          padding: 13px 20px; border: 0; border-radius: 999px; cursor: pointer;
          background: var(--clay); color: #fff; font-family: var(--font-body);
          font-weight: 700; font-size: 14px; box-shadow: var(--shadow-lg);
          transition: transform .2s ease, background .2s ease;
        }
        .chat-fab:hover { transform: translateY(-2px); background: var(--clay-deep); }

        .chat-panel {
          position: fixed; right: 20px; bottom: 88px; z-index: 61;
          width: min(380px, calc(100vw - 32px)); max-height: min(74vh, 620px);
          display: flex; flex-direction: column;
          background: var(--oat); border: 1px solid var(--rule); border-radius: 20px;
          box-shadow: var(--shadow-lg); overflow: hidden;
          transition: opacity .22s ease, transform .22s cubic-bezier(.2,.7,.3,1);
        }
        .chat-head {
          display: flex; align-items: center; gap: 11px; padding: 15px 16px;
          background: #fff; border-bottom: 1px solid var(--rule);
        }
        .chat-avatar {
          width: 38px; height: 38px; border-radius: 50%; background: var(--white);
          border: 1px solid var(--line); display: grid; place-items: center;
          flex-shrink: 0; overflow: hidden;
        }
        .chat-avatar img { width: 30px; height: auto; display: block; }
        .chat-close {
          margin-left: auto; background: none; border: 0; font-size: 24px; line-height: 1;
          color: var(--stone); cursor: pointer; padding: 0 4px;
        }
        .chat-body {
          flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 10px;
        }
        .bubble {
          max-width: 88%; padding: 11px 14px; border-radius: 16px; font-size: 14px; line-height: 1.6;
          animation: pop .28s cubic-bezier(.2,.7,.3,1);
        }
        .bubble.bot { background: #fff; border: 1px solid var(--rule); border-bottom-left-radius: 5px; align-self: flex-start; color: var(--body-text); }
        .bubble.user { background: var(--clay); color: #fff; border-bottom-right-radius: 5px; align-self: flex-end; }
        .bubble-link {
          display: inline-block; font-size: 12px; font-weight: 700; text-decoration: none;
          color: var(--clay); background: var(--clay-tint); padding: 5px 10px; border-radius: 999px;
        }
        @keyframes pop { from { opacity: 0; transform: translateY(6px) } to { opacity: 1; transform: none } }

        .chip {
          background: #fff; border: 1px solid var(--rule); border-radius: 999px;
          padding: 7px 12px; font-size: 12.5px; font-family: var(--font-body); color: var(--body-text);
          cursor: pointer; transition: border-color .18s ease, color .18s ease;
        }
        .chip:hover { border-color: var(--clay); color: var(--clay); }

        .dots { display: inline-flex; gap: 4px; padding: 2px 0; }
        .dots i {
          width: 6px; height: 6px; border-radius: 50%; background: var(--stone);
          animation: blink 1.2s infinite;
        }
        .dots i:nth-child(2) { animation-delay: .16s }
        .dots i:nth-child(3) { animation-delay: .32s }
        @keyframes blink { 0%,100% { opacity: .25 } 40% { opacity: 1 } }

        .chat-foot { display: flex; gap: 8px; padding: 12px 14px 6px; border-top: 1px solid var(--rule); background: #fff; }
        .chat-foot input {
          flex: 1; border: 1.5px solid var(--rule); border-radius: 999px; padding: 10px 15px;
          font-family: var(--font-body); font-size: 14px; background: var(--oat); color: var(--ink);
        }
        .chat-foot input:focus { outline: none; border-color: var(--clay); }
        .chat-foot button {
          width: 40px; height: 40px; border: 0; border-radius: 50%; background: var(--clay);
          color: #fff; cursor: pointer; display: grid; place-items: center; flex-shrink: 0;
        }
        .chat-note { margin: 0; padding: 6px 16px 12px; font-size: 11px; color: var(--stone); background: #fff; }

        @media (max-width: 460px) {
          .chat-fab-label { display: none; }
          .chat-fab { padding: 15px; }
        }
      `}</style>
    </>
  )
}
