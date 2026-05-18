import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us — Animal SOS Adoptions',
  description: 'Learn about Animal SOS Sri Lanka — our mission, our team, and the story behind the rescues.',
}

const STATS = [
  { num: '2014', label: 'Founded' },
  { num: '800+', label: 'Animals rehomed' },
  { num: '4', label: 'Countries we adopt to' },
  { num: '60+', label: 'Volunteers worldwide' },
]

const TEAM = [
  {
    name: 'Heather',
    role: 'Founder & rescue lead',
    bio: "Heather started Animal SOS after encountering the scale of Sri Lanka's street animal crisis first-hand. She coordinates rescues, vet care, and international placements from Colombo.",
  },
  {
    name: 'Nadia',
    role: 'Adoptions coordinator',
    bio: 'Nadia manages every step of the adoption journey — from matching applications to organising flight nannies for dogs travelling to their new homes in Europe and North America.',
  },
  {
    name: 'Priya',
    role: 'Veterinary liaison',
    bio: 'Priya works with our partner vets across Sri Lanka to ensure every animal is healthy, vaccinated, and microchipped before joining the adoption programme.',
  },
]

const MILESTONES = [
  { year: '2014', text: 'Animal SOS founded after witnessing the scale of street dog suffering in Colombo.' },
  { year: '2016', text: 'First international adoption — a three-legged terrier mix found her forever home in Germany.' },
  { year: '2019', text: 'Launched the foster programme, placing animals with carers while awaiting adoption.' },
  { year: '2022', text: 'Reached 500 successful adoptions across four continents.' },
  { year: '2024', text: 'Opened a dedicated intake centre in Colombo with full veterinary facilities on site.' },
]

export default function AboutPage() {
  return (
    <>
      <div className="bg-warm-dark px-10 py-20 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-[500px] h-full opacity-[0.04] select-none text-[400px] leading-none overflow-hidden">🐾</div>
        <div className="max-w-2xl">
          <div className="text-[11px] font-medium uppercase tracking-[2px] text-amber-light mb-4">Our story</div>
          <h1 className="font-display text-[clamp(40px,5vw,60px)] font-black text-off-white leading-[1.05] tracking-[-1.5px] mb-6">
            Built on the streets<br />of <em className="italic text-amber">Sri Lanka.</em>
          </h1>
          <p className="text-[17px] text-[rgba(255,253,249,0.6)] leading-[1.75] max-w-[520px]">
            Animal SOS began with one person, one dog, and the belief that a rescued street animal is just as worthy of a loving home as any pedigree. A decade later, 800+ animals agree.
          </p>
        </div>
        <div className="flex flex-wrap gap-0 border-t border-[rgba(255,253,249,0.08)] mt-12">
          {STATS.map((s) => (
            <div key={s.label} className="pr-12 pt-6">
              <div className="font-display text-[32px] font-bold text-amber-light">{s.num}</div>
              <div className="text-[11px] text-[rgba(255,253,249,0.4)] uppercase tracking-[0.5px] mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <div className="text-[11px] font-medium uppercase tracking-[2px] text-amber mb-4">Our mission</div>
            <h2 className="font-display text-[36px] font-bold text-warm-dark leading-[1.15] tracking-[-1px] mb-6">
              Every street animal deserves a second chance.
            </h2>
            <div className="flex flex-col gap-4 text-[15px] text-text-muted leading-[1.75]">
              <p>Sri Lanka has hundreds of thousands of street dogs and cats. Animal SOS rescues, rehabilitates, and rehomes these animals — giving them the veterinary care, love, and patience they need to trust humans again.</p>
              <p>We work with international adopters across the UK, USA, Canada, Germany, the Netherlands, and beyond. Every animal travels with full vaccinations, microchip, health certificate, and a flight nanny if needed.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: '🏥', title: 'Veterinary care', body: 'Full check-ups, vaccinations, neutering, and treatment before any animal enters the adoption programme.' },
              { icon: '✈️', title: 'International transport', body: 'We coordinate every leg of the journey, including cargo or cabin travel with experienced flight nannies.' },
              { icon: '🏠', title: 'Foster network', body: 'Animals live in caring homes — not kennels — while they wait for their forever family.' },
              { icon: '💛', title: 'Lifetime support', body: 'We stay in touch after adoption and are always here if circumstances change.' },
            ].map((c) => (
              <div key={c.title} className="bg-cream border border-border rounded-[20px] p-5">
                <div className="text-[28px] mb-3">{c.icon}</div>
                <div className="text-[14px] font-medium text-warm-dark mb-2">{c.title}</div>
                <div className="text-[13px] text-text-muted leading-[1.6]">{c.body}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-24">
          <div className="text-[11px] font-medium uppercase tracking-[2px] text-amber mb-4">Timeline</div>
          <h2 className="font-display text-[32px] font-bold text-warm-dark mb-10 tracking-[-0.5px]">A decade of rescues</h2>
          <div className="relative">
            <div className="absolute left-[56px] top-0 bottom-0 w-px bg-border" />
            <div className="flex flex-col gap-8">
              {MILESTONES.map((m) => (
                <div key={m.year} className="flex gap-6 items-start">
                  <div className="w-[44px] shrink-0 text-right">
                    <span className="text-[13px] font-medium text-amber">{m.year}</span>
                  </div>
                  <div className="w-3 h-3 rounded-full bg-amber mt-1 shrink-0 relative z-10" />
                  <p className="text-[14px] text-text-muted leading-[1.65] pt-0.5">{m.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-24">
          <div className="text-[11px] font-medium uppercase tracking-[2px] text-amber mb-4">The team</div>
          <h2 className="font-display text-[32px] font-bold text-warm-dark mb-10 tracking-[-0.5px]">The people behind the rescues</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {TEAM.map((p) => (
              <div key={p.name} className="bg-cream border border-border rounded-[20px] p-6">
                <div className="w-12 h-12 rounded-full bg-amber-pale flex items-center justify-center text-[22px] mb-4">🐾</div>
                <div className="text-[16px] font-medium text-warm-dark mb-0.5">{p.name}</div>
                <div className="text-[12px] uppercase tracking-[1px] text-amber mb-3">{p.role}</div>
                <p className="text-[13px] text-text-muted leading-[1.65]">{p.bio}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-warm-dark rounded-[28px] px-10 py-12 text-center">
          <h2 className="font-display text-[32px] font-black text-off-white tracking-[-1px] mb-4">Ready to give an animal a home?</h2>
          <p className="text-[15px] text-[rgba(255,253,249,0.55)] mb-8 max-w-[400px] mx-auto leading-[1.7]">
            Browse our available animals and start an adoption application today.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/adopt" className="px-8 py-[14px] bg-amber text-warm-dark font-medium rounded-full hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(212,131,42,0.35)] transition-all">
              Meet the animals →
            </Link>
            <Link href="/volunteer" className="px-8 py-[14px] border border-[rgba(255,253,249,0.2)] text-off-white rounded-full hover:border-amber hover:text-amber transition-colors">
              Volunteer with us
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
