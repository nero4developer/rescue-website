'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { getAnimals } from '@/lib/payload'
import type { Animal } from '@/lib/payload'

type FormData = {
  animalId: string
  animalName: string
  applicantName: string
  applicantEmail: string
  applicantPhone: string
  address: string
  homeType: string
  hasGarden: boolean
  hasChildren: boolean
  hasOtherPets: boolean
  lifestyleAnswers: string
}

const INITIAL: FormData = {
  animalId: '',
  animalName: '',
  applicantName: '',
  applicantEmail: '',
  applicantPhone: '',
  address: '',
  homeType: '',
  hasGarden: false,
  hasChildren: false,
  hasOtherPets: false,
  lifestyleAnswers: '',
}

const STEPS = ['Animal', 'Your details', 'Your home', 'About you']

function Stepper({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-0 mb-12">
      {STEPS.map((label, i) => (
        <div key={label} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-medium transition-colors ${
                i < current
                  ? 'bg-amber text-warm-dark'
                  : i === current
                  ? 'bg-warm-dark text-off-white'
                  : 'bg-cream text-text-muted border border-border'
              }`}
            >
              {i < current ? '✓' : i + 1}
            </div>
            <span className={`mt-2 text-[11px] whitespace-nowrap ${i === current ? 'text-warm-dark font-medium' : 'text-text-muted'}`}>
              {label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`flex-1 h-px mx-3 mb-5 ${i < current ? 'bg-amber' : 'bg-border'}`} />
          )}
        </div>
      ))}
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-[13px] font-medium text-text-body mb-1.5">{children}</label>
}

function Input({
  value,
  onChange,
  placeholder,
  type = 'text',
  error,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
  error?: string
}) {
  return (
    <div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-[11px] border rounded-[12px] bg-cream text-[14px] text-text-body outline-none transition-colors ${
          error ? 'border-clay focus:border-clay' : 'border-border focus:border-amber'
        }`}
      />
      {error && <p className="text-[12px] text-clay mt-1">{error}</p>}
    </div>
  )
}

function Textarea({
  value,
  onChange,
  placeholder,
  rows = 5,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  rows?: number
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full px-4 py-[11px] border border-border rounded-[12px] bg-cream text-[14px] text-text-body outline-none focus:border-amber transition-colors resize-none"
    />
  )
}

function CheckToggle({
  label,
  checked,
  onChange,
  description,
}: {
  label: string
  checked: boolean
  onChange: (v: boolean) => void
  description?: string
}) {
  return (
    <label className="flex items-start gap-4 cursor-pointer p-4 border border-border rounded-[14px] bg-cream hover:border-amber transition-colors">
      <div className="relative mt-0.5">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div
          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
            checked ? 'bg-amber border-amber' : 'border-border bg-off-white'
          }`}
        >
          {checked && <span className="text-[10px] text-warm-dark font-bold">✓</span>}
        </div>
      </div>
      <div>
        <div className="text-[14px] font-medium text-text-body">{label}</div>
        {description && <div className="text-[12px] text-text-muted mt-0.5">{description}</div>}
      </div>
    </label>
  )
}

function Step1Animal({
  data,
  setData,
  errors,
}: {
  data: FormData
  setData: (d: Partial<FormData>) => void
  errors: Partial<Record<keyof FormData, string>>
}) {
  const [animals, setAnimals] = useState<Animal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAnimals({ status: 'available', limit: 50 })
      .then((r) => setAnimals(r.docs))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <h2 className="font-display text-[28px] font-bold text-warm-dark mb-2">Which animal?</h2>
      <p className="text-[14px] text-text-muted mb-8">Select the animal you&apos;d like to adopt. Only currently available animals are shown.</p>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-[72px] bg-cream border border-border rounded-[14px] animate-pulse" />
          ))}
        </div>
      ) : animals.length === 0 ? (
        <p className="text-[14px] text-text-muted py-10 text-center">No animals are currently available for adoption.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {animals.map((a) => (
            <label
              key={a.id}
              className={`flex items-center gap-4 p-4 border rounded-[14px] cursor-pointer transition-all ${
                data.animalId === a.id
                  ? 'border-amber bg-amber-pale'
                  : 'border-border bg-cream hover:border-amber'
              }`}
            >
              <input
                type="radio"
                name="animal"
                value={a.id}
                checked={data.animalId === a.id}
                onChange={() => setData({ animalId: a.id, animalName: a.name })}
                className="sr-only"
              />
              <div className="text-[28px]">{a.type === 'cat' ? '🐈' : '🐕'}</div>
              <div>
                <div className="text-[14px] font-medium text-warm-dark">{a.name}</div>
                <div className="text-[12px] text-text-muted">{a.breed}</div>
              </div>
            </label>
          ))}
        </div>
      )}
      {errors.animalId && <p className="text-[12px] text-clay mt-3">{errors.animalId}</p>}
    </div>
  )
}

function Step2Personal({
  data,
  setData,
  errors,
}: {
  data: FormData
  setData: (d: Partial<FormData>) => void
  errors: Partial<Record<keyof FormData, string>>
}) {
  return (
    <div>
      <h2 className="font-display text-[28px] font-bold text-warm-dark mb-2">Your details</h2>
      <p className="text-[14px] text-text-muted mb-8">We&apos;ll use these to contact you about your application.</p>

      <div className="flex flex-col gap-5">
        <div>
          <Label>Full name *</Label>
          <Input
            value={data.applicantName}
            onChange={(v) => setData({ applicantName: v })}
            placeholder="Jane Smith"
            error={errors.applicantName}
          />
        </div>
        <div>
          <Label>Email address *</Label>
          <Input
            type="email"
            value={data.applicantEmail}
            onChange={(v) => setData({ applicantEmail: v })}
            placeholder="jane@example.com"
            error={errors.applicantEmail}
          />
        </div>
        <div>
          <Label>Phone number</Label>
          <Input
            type="tel"
            value={data.applicantPhone}
            onChange={(v) => setData({ applicantPhone: v })}
            placeholder="+1 555 000 0000"
          />
        </div>
        <div>
          <Label>Home address *</Label>
          <Textarea
            value={data.address}
            onChange={(v) => setData({ address: v })}
            placeholder="Street, city, country"
            rows={3}
          />
          {errors.address && <p className="text-[12px] text-clay mt-1">{errors.address}</p>}
        </div>
      </div>
    </div>
  )
}

function Step3Home({
  data,
  setData,
  errors,
}: {
  data: FormData
  setData: (d: Partial<FormData>) => void
  errors: Partial<Record<keyof FormData, string>>
}) {
  const homeTypes = ['Apartment', 'House', 'Townhouse', 'Farm / rural property', 'Other']

  return (
    <div>
      <h2 className="font-display text-[28px] font-bold text-warm-dark mb-2">Your home</h2>
      <p className="text-[14px] text-text-muted mb-8">Help us understand the environment the animal will be living in.</p>

      <div className="flex flex-col gap-6">
        <div>
          <Label>Type of home *</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {homeTypes.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setData({ homeType: t })}
                className={`px-4 py-2 rounded-full border text-[13px] transition-all ${
                  data.homeType === t
                    ? 'bg-amber border-amber text-warm-dark font-medium'
                    : 'border-border text-text-muted hover:border-amber hover:text-amber'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          {errors.homeType && <p className="text-[12px] text-clay mt-2">{errors.homeType}</p>}
        </div>

        <div className="flex flex-col gap-3">
          <CheckToggle
            label="We have a garden or outdoor space"
            checked={data.hasGarden}
            onChange={(v) => setData({ hasGarden: v })}
            description="A secure outdoor area where the animal can play"
          />
          <CheckToggle
            label="Children live in the home"
            checked={data.hasChildren}
            onChange={(v) => setData({ hasChildren: v })}
          />
          <CheckToggle
            label="Other pets already in the home"
            checked={data.hasOtherPets}
            onChange={(v) => setData({ hasOtherPets: v })}
          />
        </div>
      </div>
    </div>
  )
}

function Step4Lifestyle({
  data,
  setData,
}: {
  data: FormData
  setData: (d: Partial<FormData>) => void
}) {
  return (
    <div>
      <h2 className="font-display text-[28px] font-bold text-warm-dark mb-2">About you</h2>
      <p className="text-[14px] text-text-muted mb-8">A little about your lifestyle helps us ensure a great match.</p>

      <div>
        <Label>Tell us about yourself and why you&apos;d like to adopt *</Label>
        <p className="text-[12px] text-text-muted mb-3">
          Your work schedule, activity level, previous pet experience, reasons for adopting — anything that feels relevant.
        </p>
        <Textarea
          value={data.lifestyleAnswers}
          onChange={(v) => setData({ lifestyleAnswers: v })}
          placeholder="I live alone and work from home most days. I've had dogs growing up and I'm looking for a calm companion to join morning walks…"
          rows={8}
        />
      </div>
    </div>
  )
}

function ApplyFormInner() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [step, setStep] = useState(0)
  const [data, setDataState] = useState<FormData>({ ...INITIAL })
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const animalParam = searchParams.get('animal') || ''
  useEffect(() => {
    if (!animalParam) return
    getAnimals({ status: 'available', limit: 50 }).then((r) => {
      const match = r.docs.find((a) => a.slug === animalParam)
      if (match) setDataState((prev) => ({ ...prev, animalId: match.id, animalName: match.name }))
    }).catch(() => {})
  }, [animalParam])

  function setData(patch: Partial<FormData>) {
    setDataState((prev) => ({ ...prev, ...patch }))
    const keys = Object.keys(patch) as (keyof FormData)[]
    setErrors((prev) => {
      const next = { ...prev }
      keys.forEach((k) => delete next[k])
      return next
    })
  }

  function validate(): boolean {
    const e: Partial<Record<keyof FormData, string>> = {}
    if (step === 0 && !data.animalId) e.animalId = 'Please select an animal.'
    if (step === 1) {
      if (!data.applicantName.trim()) e.applicantName = 'Name is required.'
      if (!data.applicantEmail.trim()) e.applicantEmail = 'Email is required.'
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.applicantEmail)) e.applicantEmail = 'Enter a valid email address.'
      if (!data.address.trim()) e.address = 'Address is required.'
    }
    if (step === 2 && !data.homeType) e.homeType = 'Please select a home type.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function next() {
    if (!validate()) return
    setStep((s) => s + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function back() {
    setStep((s) => s - 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function submit() {
    if (!validate()) return
    if (!data.lifestyleAnswers.trim()) {
      setErrors({ lifestyleAnswers: 'Please tell us a little about yourself.' })
      return
    }
    setSubmitting(true)
    setSubmitError('')
    try {
      const res = await fetch('/api/adoptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          animal: data.animalId,
          applicantName: data.applicantName,
          applicantEmail: data.applicantEmail,
          applicantPhone: data.applicantPhone || undefined,
          address: data.address,
          homeType: data.homeType,
          hasGarden: data.hasGarden,
          hasChildren: data.hasChildren,
          hasOtherPets: data.hasOtherPets,
          lifestyleAnswers: data.lifestyleAnswers,
          status: 'pending',
        }),
      })
      if (!res.ok) throw new Error(`${res.status}`)
      setSubmitted(true)
    } catch {
      setSubmitError('Something went wrong. Please try again or email us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <span className="text-[72px] block mb-6">🐾</span>
        <h1 className="font-display text-[36px] font-black text-warm-dark mb-4 tracking-[-1px]">
          Application submitted!
        </h1>
        <p className="text-[16px] text-text-muted leading-[1.75] mb-8 max-w-[440px] mx-auto">
          Thank you for applying to adopt <strong className="text-text-body">{data.animalName}</strong>.
          We&apos;ll review your application and get in touch at <strong className="text-text-body">{data.applicantEmail}</strong> within 2–3 business days.
        </p>
        <button
          onClick={() => router.push('/adopt')}
          className="px-8 py-3 bg-amber text-warm-dark rounded-full font-medium hover:bg-warm-dark hover:text-amber-light transition-colors"
        >
          Browse more animals
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <nav className="text-[13px] text-text-muted mb-10 flex items-center gap-2">
        <button onClick={() => router.push('/adopt')} className="hover:text-amber transition-colors">← Back to animals</button>
      </nav>

      <h1 className="font-display text-[42px] font-black text-warm-dark leading-none tracking-[-1.5px] mb-2">
        Adoption application
      </h1>
      <p className="text-[15px] text-text-muted mb-10">
        Takes about 5 minutes. We read every application carefully.
      </p>

      <Stepper current={step} />

      <div className="min-h-[400px]">
        {step === 0 && <Step1Animal data={data} setData={setData} errors={errors} />}
        {step === 1 && <Step2Personal data={data} setData={setData} errors={errors} />}
        {step === 2 && <Step3Home data={data} setData={setData} errors={errors} />}
        {step === 3 && <Step4Lifestyle data={data} setData={setData} />}
      </div>

      {submitError && (
        <p className="text-[13px] text-clay bg-[#fdf0ec] border border-[#f5c9b9] rounded-[12px] px-4 py-3 mt-6">
          {submitError}
        </p>
      )}

      <div className="flex gap-3 mt-10 pt-8 border-t border-border">
        {step > 0 && (
          <button
            onClick={back}
            className="px-6 py-[13px] border border-border rounded-full text-[14px] text-text-muted hover:border-text-body hover:text-text-body transition-colors"
          >
            ← Back
          </button>
        )}
        <div className="flex-1" />
        {step < STEPS.length - 1 ? (
          <button
            onClick={next}
            className="px-8 py-[13px] bg-amber text-warm-dark font-medium rounded-full hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(212,131,42,0.35)] transition-all"
          >
            Continue →
          </button>
        ) : (
          <button
            onClick={submit}
            disabled={submitting}
            className="px-8 py-[13px] bg-amber text-warm-dark font-medium rounded-full hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(212,131,42,0.35)] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none"
          >
            {submitting ? 'Submitting…' : 'Submit application ♡'}
          </button>
        )}
      </div>
    </div>
  )
}

export default function ApplyPage() {
  return (
    <Suspense>
      <ApplyFormInner />
    </Suspense>
  )
}
