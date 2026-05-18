'use client'

import { useState } from 'react'
import { useToast } from '@/hooks/useToast'
import { ToastContainer } from '@/app/components/Toast'

type FormState = {
  name: string
  email: string
  topic: string
  message: string
}

type Errors = Partial<FormState>

const INITIAL: FormState = { name: '', email: '', topic: '', message: '' }

const TOPICS = [
  { value: 'adoption', label: 'Adoption enquiry' },
  { value: 'volunteer', label: 'Volunteering' },
  { value: 'donate', label: 'Donation / sponsorship' },
  { value: 'other', label: 'Something else' },
]

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(INITIAL)
  const [errors, setErrors] = useState<Errors>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const { toasts, show: showToast, dismiss } = useToast()

  function set(key: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => { const n = { ...prev }; delete n[key]; return n })
  }

  function validate(): boolean {
    const e: Errors = {}
    if (!form.name.trim()) e.name = 'Name is required.'
    if (!form.email.trim()) e.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address.'
    if (!form.topic) e.topic = 'Please select a topic.'
    if (!form.message.trim()) e.message = 'Message is required.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    setSubmitError('')
    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error(`${res.status}`)
      setSubmitted(true)
      showToast("Message sent! We'll reply within 2 business days.", 'success')
    } catch {
      setSubmitError('Something went wrong. Please try again or email us directly at hello@animalsos.lk')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
      <div className="bg-warm-dark px-10 py-16">
        <div className="max-w-2xl">
          <div className="text-[11px] font-medium uppercase tracking-[2px] text-amber-light mb-4">Get in touch</div>
          <h1 className="font-display text-[clamp(36px,5vw,52px)] font-black text-off-white leading-[1.05] tracking-[-1.5px] mb-4">
            We&apos;d love to<br />hear from you.
          </h1>
          <p className="text-[16px] text-[rgba(255,253,249,0.55)] leading-[1.7]">
            Questions about adopting, volunteering, or supporting our work — we&apos;ll get back to you within 2 business days.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-[1fr_420px] gap-16 items-start">
        <div>
          <h2 className="font-display text-[24px] font-bold text-warm-dark mb-6">Other ways to reach us</h2>
          <div className="flex flex-col gap-6">
            {[
              { icon: '📧', label: 'Email', value: 'hello@animalsos.lk', sub: 'We reply within 2 business days' },
              { icon: '📍', label: 'Based in', value: 'Colombo, Sri Lanka', sub: 'International adoptions welcome' },
              { icon: '📞', label: 'WhatsApp', value: 'Available on request', sub: 'Ask us in your message for our number' },
            ].map((item) => (
              <div key={item.label} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-pale flex items-center justify-center text-[18px] shrink-0">{item.icon}</div>
                <div>
                  <div className="text-[11px] uppercase tracking-[1px] text-text-muted mb-0.5">{item.label}</div>
                  <div className="text-[15px] font-medium text-text-body">{item.value}</div>
                  <div className="text-[12px] text-text-muted">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 p-6 bg-cream border border-border rounded-[20px]">
            <div className="text-[13px] font-medium text-text-body mb-2">Emergency animal cases</div>
            <p className="text-[13px] text-text-muted leading-[1.6]">
              If you&apos;ve found an injured or abandoned animal in Sri Lanka and need immediate help, please select &ldquo;Something else&rdquo; as the topic and describe the situation. We&apos;ll respond as quickly as possible.
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="bg-cream border border-border rounded-[24px] p-8 text-center">
            <span className="text-[48px] block mb-4">✉️</span>
            <h3 className="font-display text-[22px] font-bold text-warm-dark mb-2">Message sent!</h3>
            <p className="text-[14px] text-text-muted">
              Thanks for reaching out. We&apos;ll reply to <strong className="text-text-body">{form.email}</strong> within 2 business days.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="bg-cream border border-border rounded-[24px] p-8 flex flex-col gap-5">
            <div>
              <label className="block text-[13px] font-medium text-text-body mb-1.5">Your name *</label>
              <input type="text" value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Jane Smith" className={`w-full px-4 py-[11px] border rounded-[12px] bg-off-white text-[14px] text-text-body outline-none transition-colors ${errors.name ? 'border-clay' : 'border-border focus:border-amber'}`} />
              {errors.name && <p className="text-[12px] text-clay mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-[13px] font-medium text-text-body mb-1.5">Email address *</label>
              <input type="email" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="jane@example.com" className={`w-full px-4 py-[11px] border rounded-[12px] bg-off-white text-[14px] text-text-body outline-none transition-colors ${errors.email ? 'border-clay' : 'border-border focus:border-amber'}`} />
              {errors.email && <p className="text-[12px] text-clay mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-[13px] font-medium text-text-body mb-1.5">Topic *</label>
              <select value={form.topic} onChange={(e) => set('topic', e.target.value)} className={`w-full px-4 py-[11px] border rounded-[12px] bg-off-white text-[14px] text-text-body outline-none transition-colors cursor-pointer ${errors.topic ? 'border-clay' : 'border-border focus:border-amber'}`}>
                <option value="">Select a topic…</option>
                {TOPICS.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
              {errors.topic && <p className="text-[12px] text-clay mt-1">{errors.topic}</p>}
            </div>
            <div>
              <label className="block text-[13px] font-medium text-text-body mb-1.5">Message *</label>
              <textarea value={form.message} onChange={(e) => set('message', e.target.value)} placeholder="Tell us what's on your mind…" rows={6} className={`w-full px-4 py-[11px] border rounded-[12px] bg-off-white text-[14px] text-text-body outline-none transition-colors resize-none ${errors.message ? 'border-clay' : 'border-border focus:border-amber'}`} />
              {errors.message && <p className="text-[12px] text-clay mt-1">{errors.message}</p>}
            </div>
            {submitError && <p className="text-[12px] text-clay bg-[#fdf0ec] border border-[#f5c9b9] rounded-[10px] px-4 py-3">{submitError}</p>}
            <button type="submit" disabled={submitting} className="w-full py-[14px] bg-amber text-warm-dark font-medium rounded-full hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(212,131,42,0.35)] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none">
              {submitting ? 'Sending…' : 'Send message →'}
            </button>
          </form>
        )}
      </div>
    </>
  )
}
