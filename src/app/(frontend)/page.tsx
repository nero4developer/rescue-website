import Link from 'next/link'
import Image from 'next/image'
import { getAnimals, getSuccessStories } from '@/lib/payload-server'
import HomepageAnimals from './HomepageAnimals'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const timeout = new Promise<{ docs: [] }>((r) => setTimeout(() => r({ docs: [] }), 25000))

  const [featured, dbStories] = await Promise.all([
    Promise.race([getAnimals({ status: 'available', limit: 6 }), timeout]).catch(() => ({ docs: [] })),
    getSuccessStories(true).catch(() => []),
  ])

  return (
    <>
      <HeroSection />
      <TrustBar />
      <HowItWorksSection />
      <HomepageAnimals initial={featured.docs} />
      <ImpactSection />
      <StoriesPreview stories={dbStories} />
      <CtaSection />
    </>
  )
}

function HeroSection() {
  return (
    <section className="min-h-[calc(100vh-73px)] grid md:grid-cols-2 relative overflow-hidden">
      {/* LEFT */}
      <div className="flex flex-col justify-center px-6 md:px-16 py-16 md:py-20 relative z-10">
        <div className="inline-flex items-center gap-2 bg-amber-pale border border-amber-light text-clay text-[12px] font-medium px-4 py-[7px] rounded-full mb-8 w-fit">
          <span className="text-[8px] text-amber animate-pulse">●</span>
          2,500+ animals ready for homes
        </div>

        <h1 className="font-display text-[clamp(48px,5vw,72px)] font-black leading-[1.05] text-warm-dark tracking-[-1.5px] mb-7">
          Every rescue<br />deserves a{' '}
          <em className="italic text-amber block">forever home.</em>
        </h1>

        <p className="text-[17px] leading-[1.7] text-text-muted max-w-[420px] mb-12">
          We connect Sri Lankan street dogs and cats with loving families across Sri Lanka,
          the EU, UK and Canada. Your home saves a life.
        </p>

        <div className="flex flex-wrap gap-4 items-center">
          <Link
            href="/adopt"
            className="inline-flex items-center gap-2 bg-amber text-warm-dark font-medium px-8 py-4 rounded-full hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(212,131,42,0.35)] transition-all"
          >
            Meet our animals <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-text-body font-medium px-4 py-4 hover:text-amber transition-colors"
          >
            ▶ Our story
          </Link>
        </div>

        <div className="flex gap-10 mt-16 pt-10 border-t border-black/8">
          {[
            { num: '2,500+', label: 'Animals in care' },
            { num: '800+', label: 'Successful adoptions' },
            { num: '4', label: 'Countries served' },
          ].map(({ num, label }) => (
            <div key={label}>
              <div className="font-display text-[32px] font-bold text-warm-dark">{num}</div>
              <div className="text-[12px] text-text-muted mt-0.5 uppercase tracking-[0.5px]">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT — dark panel with photo + floating cards */}
      <div className="relative bg-warm-dark overflow-hidden hidden md:block">
        <Image
          src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=900&q=80&fit=crop"
          alt=""
          fill
          className="object-cover opacity-[0.18]"
          priority
          sizes="50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#2C1F14] to-[#1C1510] opacity-80" />
        <div className="absolute top-10 right-10 text-[220px] opacity-[0.04] select-none leading-none z-[1]">🐾</div>
        <div className="absolute top-[260px] left-[60px] text-[140px] opacity-[0.05] select-none leading-none -rotate-[20deg] z-[1]">🐾</div>

        <div className="absolute top-20 left-1/2 right-0 grid grid-cols-2 gap-4 p-5 z-[2]">
          {[
            { emoji: '🐕', name: 'Biscuit', meta: 'Sinhala Hound · 2y' },
            { emoji: '🐈', name: 'Luna', meta: 'Mixed · 1y' },
            { emoji: '🐶', name: 'Mango', meta: 'Puppy · 4m' },
            { emoji: '🐱', name: 'Coco', meta: 'Kitten · 3m' },
          ].map((a) => (
            <div
              key={a.name}
              className="bg-[rgba(255,253,249,0.08)] border border-[rgba(255,253,249,0.1)] rounded-[16px] p-5 text-center hover:-translate-y-1 transition-transform cursor-pointer"
            >
              <span className="text-[40px] block mb-2">{a.emoji}</span>
              <div className="text-off-white font-medium text-[14px]">{a.name}</div>
              <div className="text-[rgba(255,253,249,0.5)] text-[12px] mt-0.5">{a.meta}</div>
              <span className="inline-block mt-2 bg-[rgba(74,103,65,0.4)] text-[#A8CC9E] text-[10px] px-[10px] py-0.5 rounded-full border border-[rgba(74,103,65,0.5)]">
                ✓ Available
              </span>
            </div>
          ))}
        </div>

        <div className="absolute bottom-12 left-12 right-12 z-[2] bg-[rgba(255,253,249,0.06)] backdrop-blur-xl border border-[rgba(255,253,249,0.12)] rounded-[20px] p-6 flex items-center gap-5">
          <div className="w-14 h-14 rounded-full bg-amber flex items-center justify-center text-[28px] shrink-0">🐕</div>
          <div className="flex-1">
            <div className="text-off-white font-medium text-[16px] mb-1">Featured: Biscuit</div>
            <div className="text-[rgba(255,253,249,0.6)] text-[13px]">Gentle 2-year-old Sinhala Hound · Loves cuddles</div>
          </div>
          <Link
            href="/adopt/biscuit"
            className="bg-[rgba(212,131,42,0.2)] text-amber-light border border-[rgba(212,131,42,0.3)] text-[11px] font-medium px-3 py-1.5 rounded-full shrink-0 hover:bg-amber hover:text-warm-dark transition-colors"
          >
            Adopt now
          </Link>
        </div>
      </div>
    </section>
  )
}

function TrustBar() {
  return (
    <div className="bg-warm-dark px-6 md:px-16 py-5 flex items-center justify-center gap-12 flex-wrap border-t border-[rgba(255,253,249,0.06)]">
      {[
        { text: 'UK Charity', bold: 'No. 1119902' },
        null,
        { text: 'Adopting to', bold: 'Sri Lanka · EU · UK · Canada' },
        null,
        { text: 'Part of', bold: 'Animal SOS Sri Lanka' },
        null,
        { text: '', bold: 'Zero profit · 100% welfare' },
      ].map((item, i) =>
        item === null ? (
          <div key={i} className="w-px h-5 bg-[rgba(255,253,249,0.1)] hidden md:block" />
        ) : (
          <div key={i} className="text-[rgba(255,253,249,0.5)] text-[12px] font-medium uppercase tracking-[1px] flex items-center gap-2">
            {item.text && <span>{item.text}</span>}
            <strong className="text-amber-light">{item.bold}</strong>
          </div>
        )
      )}
    </div>
  )
}

function HowItWorksSection() {
  const steps = [
    {
      num: '01', icon: '🔍', title: 'Browse & connect',
      desc: 'Explore our animals by type, age, and temperament. Find your match and reach out to us via email or social media.',
    },
    {
      num: '02', icon: '📋', title: 'Apply & get approved',
      desc: "We'll get to know you and your home. It's a conversation, not an interrogation — we want every match to thrive.",
    },
    {
      num: '03', icon: '🏠', title: 'Welcome them home',
      desc: 'We guide you through the travel paperwork and handover. Your new family member arrives safe, healthy and vaccinated.',
    },
  ]

  return (
    <section className="px-6 md:px-16 py-24">
      <div className="text-[11px] font-medium uppercase tracking-[2px] text-amber mb-5">Simple process</div>
      <h2 className="font-display text-[clamp(36px,4vw,52px)] font-black text-warm-dark leading-[1.1] tracking-[-1px] mb-4">
        Adopting from Sri Lanka<br />is easier than you think
      </h2>
      <p className="text-[17px] text-text-muted leading-[1.7] max-w-[500px] mb-16">
        We handle the complexity. You just open your heart and your home.
      </p>
      <div className="grid md:grid-cols-3 gap-0.5">
        {steps.map((s, i) => (
          <div
            key={s.num}
            className={`bg-off-white px-9 py-11 relative overflow-hidden hover:bg-amber-pale transition-colors ${
              i === 0 ? 'rounded-t-[20px] md:rounded-l-[20px] md:rounded-tr-none' :
              i === 2 ? 'rounded-b-[20px] md:rounded-r-[20px] md:rounded-bl-none' : ''
            }`}
          >
            <div className="font-display text-[80px] font-black text-amber/12 absolute top-5 right-6 leading-none select-none">{s.num}</div>
            <span className="text-[36px] block mb-5">{s.icon}</span>
            <div className="text-[18px] font-medium text-warm-dark mb-3">{s.title}</div>
            <p className="text-[14px] leading-[1.7] text-text-muted">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function StoriesPreview({ stories }: { stories: import('@/lib/payload').Story[] }) {
  if (stories.length === 0) return null

  return (
    <section className="px-6 md:px-16 py-24 bg-amber-pale">
      <div className="text-[11px] font-medium uppercase tracking-[2px] text-amber mb-5">Success stories</div>
      <h2 className="font-display text-[clamp(36px,4vw,52px)] font-black text-warm-dark leading-[1.1] tracking-[-1px] mb-16">
        They found their<br />golden basket
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {stories.slice(0, 3).map((s) => (
          <div key={s.id} className="bg-off-white border border-[rgba(212,131,42,0.12)] rounded-[20px] p-8 flex flex-col gap-5 hover:-translate-y-1 transition-transform">
            <div className="text-amber text-[14px] tracking-[2px]">★★★★★</div>
            <p className="text-[15px] leading-[1.75] text-text-body flex-1 italic">&ldquo;{s.quote}&rdquo;</p>
            <div className="flex items-center gap-4 pt-4 border-t border-[rgba(212,131,42,0.1)]">
              <div className="w-11 h-11 rounded-full bg-amber-pale border-2 border-amber-light overflow-hidden shrink-0 flex items-center justify-center text-[20px]">
                {s.photo?.url ? (
                  <Image src={s.photo.url} alt={s.adopterFirstName} width={44} height={44} className="w-full h-full object-cover" />
                ) : (
                  <span>🐾</span>
                )}
              </div>
              <div>
                <div className="font-medium text-warm-dark text-[14px]">{s.adopterFirstName}</div>
                <div className="text-text-muted text-[12px] mt-0.5">{s.country} · Adopted {s.animalName}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-12">
        <Link
          href="/success-stories"
          className="inline-flex items-center gap-2 border border-[rgba(212,131,42,0.3)] text-text-body font-medium px-8 py-4 rounded-full hover:border-amber hover:text-amber transition-colors"
        >
          Read all stories →
        </Link>
      </div>
    </section>
  )
}

function ImpactSection() {
  const metrics = [
    { icon: '🏥', val: '2,500+', label: 'Animals currently in care' },
    { icon: '🏠', val: '800+', label: 'Successful forever homes found' },
    { icon: '💉', val: '100%', label: 'Vaccinated & vet-checked on adoption' },
    { icon: '🌍', val: '4', label: 'Countries we rehome to' },
  ]

  return (
    <section className="px-6 md:px-16 py-24 grid md:grid-cols-2 gap-20 items-center">
      <div>
        <div className="text-[11px] font-medium uppercase tracking-[2px] text-amber mb-5">Why it matters</div>
        <h2 className="font-display text-[clamp(36px,4vw,52px)] font-black text-warm-dark leading-[1.1] tracking-[-1px] mb-4">
          Every adoption<br />frees a space for<br />another rescue
        </h2>
        <p className="text-[17px] text-text-muted leading-[1.7] max-w-[480px] mb-8">
          Animal SOS Sri Lanka is the island&apos;s largest sanctuary — but space is critically
          limited. When you adopt, you don&apos;t just change one life. You start a chain.
        </p>
        <Link
          href="/volunteer#donate"
          className="inline-flex items-center gap-2 bg-warm-dark text-amber-light font-medium px-8 py-4 rounded-full hover:bg-amber hover:text-warm-dark transition-colors"
        >
          Support the sanctuary →
        </Link>
      </div>
      <div className="bg-warm-dark rounded-[24px] p-10 md:p-12 flex flex-col gap-5">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="flex items-center gap-5 bg-[rgba(255,253,249,0.05)] border border-[rgba(255,253,249,0.08)] rounded-[14px] px-6 py-5"
          >
            <span className="text-[32px]">{m.icon}</span>
            <div>
              <div className="font-display text-[28px] font-bold text-amber-light">{m.val}</div>
              <div className="text-[12px] text-[rgba(255,253,249,0.5)] mt-0.5 uppercase tracking-[0.5px]">{m.label}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function CtaSection() {
  return (
    <section className="relative bg-warm-dark px-6 md:px-16 py-24 text-center overflow-hidden">
      <div className="absolute text-[400px] opacity-[0.03] top-[-60px] left-[-80px] select-none leading-none">🐾</div>
      <div className="absolute text-[300px] opacity-[0.03] bottom-[-40px] right-[-60px] select-none leading-none">🐾</div>
      <div className="relative z-10">
        <div className="text-[11px] font-medium uppercase tracking-[2px] text-amber-light mb-5">Open your home</div>
        <h2 className="font-display text-[clamp(36px,4vw,52px)] font-black text-off-white leading-[1.1] tracking-[-1px] mb-4">
          Ready to change<br />two lives at once?
        </h2>
        <p className="text-[17px] text-[rgba(255,253,249,0.55)] mb-12">Yours and theirs.</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/adopt"
            className="inline-flex items-center gap-2 bg-amber text-warm-dark font-medium px-8 py-4 rounded-full hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(212,131,42,0.35)] transition-all"
          >
            Browse animals →
          </Link>
          <Link
            href="/volunteer#donate"
            className="inline-flex items-center gap-2 border border-[rgba(255,253,249,0.2)] text-[rgba(255,253,249,0.7)] font-medium px-8 py-4 rounded-full hover:border-amber-light hover:text-amber-light transition-colors"
          >
            Donate to the sanctuary
          </Link>
        </div>
      </div>
    </section>
  )
}
