'use client'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { submitContactForm } from '@/lib/api'

const types = [
  'Riding, Therapy Programme',
  'Hoofbeats, Sunday riding or holiday programme',
  'Volunteering',
  'Donations and sponsorship',
  'Events',
  'Billing or invoices',
  'Something else',
]

export default function ContactForm() {
  const params = useSearchParams()
  const prefill = params.get('subject') ?? ''
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const get = (n: string) =>
      (form.elements.namedItem(n) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement)?.value.trim() ?? ''

    // Honeypot. Real people leave this empty.
    if (get('company')) return

    const data = {
      name: get('name'),
      email: get('email'),
      phone: get('phone'),
      enquiryType: get('enquiryType'),
      message: get('message'),
    }

    const next: Record<string, string> = {}
    if (!data.name) next.name = 'Please tell us your name.'
    if (!data.email) next.email = 'We need an email address to reply to.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) next.email = 'That email address looks incomplete.'
    if (!data.message) next.message = 'Tell us a little about what you need.'
    setErrors(next)
    if (Object.keys(next).length) return

    setStatus('sending')
    try {
      await submitContactForm(data)
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="card" style={{ background: 'var(--clay-tint)', border: 'none' }}>
        <span style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--clay)', display: 'grid', placeItems: 'center', marginBottom: 16 }}>
          <svg width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M4 9l3.5 3.5 6.5-7" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h2 style={{ fontSize: 24, marginBottom: 8 }}>Message sent</h2>
        <p className="body small">
          Thanks for getting in touch. Nickie will come back to you, usually within a couple of days.
          If it is urgent, a text to 021 378 030 is the fastest way to reach her.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label className="label" htmlFor="name">Your name</label>
        <input id="name" name="name" className="input" autoComplete="name" aria-invalid={!!errors.name} />
        {errors.name && <FieldError>{errors.name}</FieldError>}
      </div>

      <div className="field-row">
        <div className="field">
          <label className="label" htmlFor="email">Email</label>
          <input id="email" name="email" type="email" className="input" autoComplete="email" aria-invalid={!!errors.email} />
          {errors.email && <FieldError>{errors.email}</FieldError>}
        </div>
        <div className="field">
          <label className="label" htmlFor="phone">Phone (optional)</label>
          <input id="phone" name="phone" type="tel" className="input" autoComplete="tel" />
        </div>
      </div>

      <div className="field">
        <label className="label" htmlFor="enquiryType">What is this about?</label>
        <select id="enquiryType" name="enquiryType" className="select" defaultValue="">
          <option value="">Please choose…</option>
          {types.map(t => <option key={t}>{t}</option>)}
        </select>
      </div>

      <div className="field">
        <label className="label" htmlFor="message">Your message</label>
        <textarea
          id="message"
          name="message"
          className="textarea"
          defaultValue={prefill ? `${prefill}: ` : ''}
          placeholder="Tell us about the rider, or what you would like to help with."
          aria-invalid={!!errors.message}
        />
        {errors.message && <FieldError>{errors.message}</FieldError>}
      </div>

      {/* Honeypot */}
      <input
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
      />

      {status === 'error' && (
        <p style={{ color: 'var(--clay)', fontSize: 14, marginBottom: 14 }}>
          That did not send. Please try again, or email secretary@waikatoequi.co.nz directly.
        </p>
      )}

      <button type="submit" className="btn btn-primary" disabled={status === 'sending'} style={{ opacity: status === 'sending' ? .6 : 1 }}>
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>

      <style>{`
        .field-row { display: grid; gap: 0 18px; grid-template-columns: 1fr; }
        @media (min-width: 620px) { .field-row { grid-template-columns: 1fr 1fr; } }
      `}</style>
    </form>
  )
}

function FieldError({ children }: { children: React.ReactNode }) {
  return <p style={{ color: 'var(--clay)', fontSize: 13, marginTop: 6 }}>{children}</p>
}
