'use client'

import { useState } from 'react'
import { useToast } from '@/hooks/useToast'
import { ToastContainer } from '@/app/components/Toast'

type FormState = {
  name: string
  email: string
  country: string
  roles: string[]
  message: string
}

type Errors = Partial<Record<keyof FormState, string>>

const INITIAL: FormState = { name: '', email: '', country: '', roles: [], message: '' }

const ROLE_OPTIONS = [
  { value: 'foster', label: 'Foster carer', description: 'Temporarily home an animal while we arrange transport' },
  { value: 'transport', label: 'Transport volunteer', description: 'Help coordinate international pet travel logistics' },
  { value: 'fundraise', label: 'Fundraising', description: 'Run events or campaigns to support our rescues' },
  { value: 'social-media', label: 'Social media', description: 'Create content to help animals find their homes faster' },
  { value: 'events', label: 'Events helper', description: 'Assist at adoption days and awareness events' },
]

const IMPACT_STATS = [
  { num: '60+', label: 'Active volunteers worldwide' },
  { num: '12', label: 'Countries represented' },
  { num: '800+', label: 'Animals helped' },
  { num: '100%', label: 'Volunteer-driven' },
]

export default function VolunteerPage() {
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

  function toggleRole(value: string) {
    setForm((prev) => ({
      ...prev,
      roles: prev.roles.includes(value)
        ? prev.roles.filter((r) => r !== value)
        : [...prev.roles, value],
    }))
    setErrors((prev) => { const n = { ...prev }; delete n.roles; return n })
  }

  function validate(): boolean {
    const e: Errors = {}
    if (!form.name.trim()) e.name = 'Name is required.'
    if (!form.email.trim()) e.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address.'
    if (!form.country.trim()) e.country = 'Country is required.'
    if (form.roles.length === 0) e.roles = 'Please select at least one role.'
    if (!form.message.trim()) e.message = 'Please tell us a little about yourself.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    setSubmitError('')
    try {
      const res = await fetch('/api/volunteers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error(`${res.status}`)
      setSubmitted(true)
      showToast('You\'re signed up! We\'ll be in touch shortly.', 'success')
    } catch {
      setSubmitError('Something went wrong. Please try again or email us at hello@animalsos.lk')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
      {/* Hero */}
      <div className="bg-warm-dark px-10 py-16 relative overflow-hidden">
        <div className="absolute right-[-20px] bottom-[-40px] text-[280px] opacity-[0.03] select-none leading-none">🤝</div>
        <div className="max-w-2xl">
          <div className="text-[11px] font-medium uppercase tracking-[2px] text-amber-light mb-4">Join the team</div>
          <h1 className="font-display text-[clamp(36px,5vw,52px)] font-black text-off-white leading-[1.05] tracking-[-1.5px] mb-4">
            Volunteer with<br /><em className="italic text-amber">Animal SOS.</em>
          </h1>
          <p className="text-[16px] text-[rgba(255,253,249,0.55)] leading-[1.7] max-w-[480px]">
            You don&apos;t need to be in Sri Lanka. Our volunteers help from all over the world — fostering, fundraising, transporting, and spreading the word.
          </p>
        </div>

        <div className="flex gap-0 border-t border-[rgba(255,253,249,0.08)] mt-10">
          {IMPACT_STATS.map((s) => (
            <div key={s.label} className="pr-10 pt-6">
              <div className="font-display text-[28px] font-bold text-amber-light">{s.num}</div>
              <div className="text-[11px] text-[rgba(255,253,249,0.4)] uppercase tracking-[0.5px] mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-[1fr_440px] gap-16 items-start">

        <div>
          <h2 className="font-display text-[28px] font-bold text-warm-dark mb-6">How you can help</h2>
          <div className="flex flex-col gap-5">
            {ROLE_OPTIONS.map((r) => (
              <div key={r.value} className="flex gap-4 p-5 bg-cream border border-border rounded-[16px]">
                <div className="w-2 h-2 rounded-full bg-amber mt-2 shrink-0" />
                <div>
                  <div className="text-[15px] font-medium text-warm-dark mb-1">{r.label}</div>
                  <div className="text-[13px] text-text-muted leading-[1.6]">{r.description}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 p-6 bg-amber-pale border border-amber/20 rounded-[20px]">
            <div className="text-[14px] font-medium text-warm-dark mb-2">Based in Sri Lanka?</div>
            <p className="text-[13px] text-text-muted leading-[1.6]">
              We also welcome hands-on volunteers for street rescue operations, veterinary support runs, and shelter care in the Colombo area. Mention this in your message.
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="bg-cream border border-border rounded-[24px] p-8 text-center">
            <span className="text-[48px] block mb-4">🐾</span>
            <h3 className="font-display text-[22px] font-bold text-warm-dark mb-2">You&apos;re in!</h3>
            <p className="text-[14px] text-text-muted leading-[1.6]">
              Thanks for signing up, <strong className="text-text-body">{form.name}</strong>. We&apos;ll be in touch at <strong className="text-text-body">{form.email}</strong> with next steps.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="bg-cream border border-border rounded-[24px] p-8 flex flex-col gap-5"
          >
            <h3 className="font-display text-[20px] font-bold text-warm-dark">Sign up to volunteer</h3>

            <div>
              <label className="block text-[13px] font-medium text-text-body mb-1.5">Full name *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
                placeholder="Jane Smith"
                className={`w-full px-4 py-[11px] border rounded-[12px] bg-off-white text-[14px] text-text-body outline-none transition-colors ${errors.name ? 'border-clay' : 'border-border focus:border-amber'}`}
              />
              {errors.name && <p className="text-[12px] text-clay mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-[13px] font-medium text-text-body mb-1.5">Email address *</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => set('email', e.target.value)}
                placeholder="jane@example.com"
                className={`w-full px-4 py-[11px] border rounded-[12px] bg-off-white text-[14px] text-text-body outline-none transition-colors ${errors.email ? 'border-clay' : 'border-border focus:border-amber'}`}
              />
              {errors.email && <p className="text-[12px] text-clay mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-[13px] font-medium text-text-body mb-1.5">Country *</label>
              <input
                type="text"
                value={form.country}
                onChange={(e) => set('country', e.target.value)}
                placeholder="United Kingdom"
                className={`w-full px-4 py-[11px] border rounded-[12px] bg-off-white text-[14px] text-text-body outline-none transition-colors ${errors.country ? 'border-clay' : 'border-border focus:border-amber'}`}
              />
              {errors.country && <p className="text-[12px] text-clay mt-1">{errors.country}</p>}
            </div>

            <div>
              <label className="block text-[13px] font-medium text-text-body mb-2">I can help with *</label>
              <div className="flex flex-col gap-2">
                {ROLE_OPTIONS.map((r) => (
                  <label
                    key={r.value}
                    className={`flex items-center gap-3 p-3 border rounded-[12px] cursor-pointer transition-all ${
                      form.roles.includes(r.value)
                        ? 'border-amber bg-amber-pale'
                        : 'border-border bg-off-white hover:border-amber'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                        form.roles.includes(r.value) ? 'bg-amber border-amber' : 'border-border'
                      }`}
                    >
                      {form.roles.includes(r.value) && (
                        <span className="text-[8px] text-warm-dark font-bold">✓</span>
                      )}
                    </div>
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={form.roles.includes(r.value)}
                      onChange={() => toggleRole(r.value)}
                    />
                    <span className="text-[13px] text-text-body">{r.label}</span>
                  </label>
                ))}
              </div>
              {errors.roles && <p className="text-[12px] text-clay mt-1">{errors.roles}</p>}
            </div>

            <div>
              <label className="block text-[13px] font-medium text-text-body mb-1.5">Tell us about yourself *</label>
              <textarea
                value={form.message}
                onChange={(e) => set('message', e.target.value)}
                placeholder="Your availability, experience with animals, why you want to volunteer…"
                rows={4}
                className={`w-full px-4 py-[11px] border rounded-[12px] bg-off-white text-[14px] text-text-body outline-none transition-colors resize-none ${errors.message ? 'border-clay' : 'border-border focus:border-amber'}`}
              />
              {errors.message && <p className="text-[12px] text-clay mt-1">{errors.message}</p>}
            </div>

            {submitError && (
              <p className="text-[12px] text-clay bg-[#fdf0ec] border border-[#f5c9b9] rounded-[10px] px-4 py-3">
                {submitError}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-[14px] bg-amber text-warm-dark font-medium rounded-full hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(212,131,42,0.35)] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none"
            >
              {submitting ? 'Submitting…' : 'Sign up to volunteer →'}
            </button>
          </form>
        )}
      </div>
    </>
  )
}
