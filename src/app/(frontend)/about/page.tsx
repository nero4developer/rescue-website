import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us — Animal SOS Adoptions',
  description: 'Learn about Animal SOS Sri Lanka — our mission, our team, and the story behind the rescues.',
}

export default function AboutPage() {
  return (
    <>
      <HeroSection />
      <MissionSection />
      <TimelineSection />
      <SanctuarySection />
      <TeamSection />
      <CredentialsSection />
      <CtaSection />
    </>
  )
}

/* ─── 1. HERO ─────────────────────────────────────────────────────────────── */

function HeroSection() {
  const stats = [
    { icon: '🏥', num: '2,500+', label: 'Animals in care' },
    { icon: '🏠', num: '800+', label: 'Homes found' },
    { icon: '🌍', num: '4', label: 'Countries we serve' },
    { icon: '📅', num: '17+', label: 'Years of rescues' },
  ]

  return (
    <section className="min-h-[90vh] bg-warm-dark grid md:grid-cols-2 overflow-hidden">
      {/* Left */}
      <div className="px-8 md:px-16 py-24 md:py-28 flex flex-col justify-center relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-px bg-amber shrink-0" />
          <span className="text-[11px] font-medium uppercase tracking-[2px] text-amber-light">Who we are</span>
        </div>
        <h1 className="font-display text-[clamp(44px,5vw,72px)] font-black text-off-white leading-[1.02] tracking-[-2px] mb-7">
          Built on love.<br />Driven by<br /><em className="italic text-amber">purpose.</em>
        </h1>
        <p className="text-[17px] text-[rgba(255,253,249,0.55)] leading-[1.8] max-w-[460px] mb-12">
          Animal SOS Adoptions is the international arm of Animal SOS Sri Lanka — the island&apos;s largest animal sanctuary. We exist to connect rescued street animals with families who&apos;ll love them for life.
        </p>
        <div className="inline-flex items-center gap-3 px-5 py-3 bg-[rgba(255,253,249,0.06)] border border-[rgba(255,253,249,0.1)] rounded-[12px] text-[13px] text-[rgba(255,253,249,0.6)] w-fit">
          🏛 <strong className="text-amber-light">UK Registered Charity</strong> · No. 1119902 · Est. 2007
        </div>
      </div>

      {/* Right — stat cards */}
      <div className="relative hidden md:flex flex-col justify-end p-12 bg-gradient-to-br from-[#2C1F14] to-[#1C1510] overflow-hidden">
        <div className="absolute text-[400px] opacity-[0.03] top-[-80px] right-[-80px] select-none leading-none">🐾</div>
        <div className="grid grid-cols-2 gap-3 relative z-10">
          {stats.map((s) => (
            <div key={s.label} className="bg-[rgba(255,253,249,0.05)] border border-[rgba(255,253,249,0.08)] rounded-[16px] p-6">
              <span className="text-[28px] block mb-3">{s.icon}</span>
              <div className="font-display text-[32px] font-black text-amber-light leading-none">{s.num}</div>
              <div className="text-[12px] text-[rgba(255,253,249,0.4)] mt-2 uppercase tracking-[0.5px]">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── 2. MISSION ──────────────────────────────────────────────────────────── */

function MissionSection() {
  return (
    <section className="px-8 md:px-16 py-24 grid md:grid-cols-2 gap-16 md:gap-20 items-center">
      <div>
        <div className="text-[11px] font-medium uppercase tracking-[2px] text-amber mb-4">Our mission</div>
        <h2 className="font-display text-[clamp(36px,4vw,52px)] font-black text-warm-dark leading-[1.08] tracking-[-1px] mb-6">
          Every animal deserves a name, not a number
        </h2>
        <div className="text-[16px] leading-[1.85] text-text-muted flex flex-col gap-5">
          <p>Sri Lanka&apos;s streets are home to hundreds of thousands of dogs and cats. Most live short, brutal lives. Animal SOS Sri Lanka was founded to change that — one animal at a time, with love, medicine, and patience.</p>
          <p>Animal SOS Adoptions was created to extend that mission internationally. By finding forever homes in Sri Lanka, the EU, UK, and Canada, we do two things at once: give an individual animal the life they deserve, and free up critical space in the sanctuary for the next rescue.</p>
        </div>
        <blockquote className="font-display text-[22px] italic text-warm-dark leading-[1.4] border-l-[3px] border-amber pl-7 my-9">
          &ldquo;We don&apos;t run a shelter. We run a family — a very large, very loud, very loving family.&rdquo;
        </blockquote>
        <p className="text-[16px] leading-[1.85] text-text-muted">
          Every animal in our care has a name, a personality profile, a health record, and a dedicated team member looking out for them. We match with intention, not urgency. And we stay in touch long after the adoption is complete.
        </p>
      </div>

      <div className="relative mt-8 md:mt-0">
        <div className="bg-warm-dark rounded-[24px] p-10 text-center relative overflow-hidden">
          <div className="relative z-10">
            <div className="h-[140px] rounded-[12px] overflow-hidden mb-5">
              <Image
                src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500&q=80&fit=crop"
                alt="Dog at Animal SOS sanctuary"
                width={500}
                height={140}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="font-display text-[22px] font-bold text-off-white mb-2">Home is where they belong</div>
            <div className="text-[14px] text-[rgba(255,253,249,0.5)] leading-[1.6] max-w-[280px] mx-auto">
              From the streets of Colombo to living rooms across the world — every rescue is a life transformed.
            </div>
          </div>
          <div className="absolute text-[200px] opacity-[0.04] bottom-[-40px] right-[-30px] select-none leading-none">🐾</div>
        </div>
        <div className="absolute -bottom-5 -left-5 bg-off-white border border-border rounded-[16px] px-5 py-4 flex items-center gap-3 shadow-[0_8px_32px_rgba(28,21,16,0.1)]">
          <span className="text-[24px]">❤️</span>
          <div>
            <div className="font-display text-[20px] font-bold text-warm-dark leading-none">Zero profit</div>
            <div className="text-[11px] text-text-muted uppercase tracking-[0.5px] mt-1">100% welfare-driven</div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── 3. HISTORY TIMELINE ─────────────────────────────────────────────────── */

const TIMELINE = [
  { year: '2007', title: 'The sanctuary is founded', desc: 'A small team of volunteers begin rescuing injured street dogs in Colombo with a borrowed van and no funding. The first 12 dogs are treated in a rented house.' },
  { year: '2009', title: 'First international adoption', desc: 'Bella, a two-year-old mixed breed, travels to London — the first Animal SOS international adoption. She proves the model works and inspires the team to think bigger.' },
  { year: '2011', title: 'UK charity registration', desc: 'Animal SOS Sri Lanka registers as a UK charity (No. 1119902), opening international fundraising and giving the adoption programme legal standing across Europe.' },
  { year: '2014', title: 'New sanctuary opens', desc: 'A purpose-built sanctuary opens outside Colombo, with dedicated medical facilities, kennels, and outdoor runs. Capacity grows from 200 to 800 animals.' },
  { year: '2017', title: '500th adoption milestone', desc: 'Koda, a three-legged Sinhala Hound, becomes the 500th animal adopted internationally. He travels to Amsterdam and is still living his best life.' },
  { year: '2024–now', title: '800+ homes and growing', desc: 'Animal SOS Adoptions expands to Canada and launches this new website to serve the next generation of adopters. 2,500+ animals in care. The mission continues.' },
]

function TimelineCard({ year, title, desc }: { year: string; title: string; desc: string }) {
  return (
    <div className="bg-cream rounded-[14px] p-5">
      <div className="text-[11px] font-medium uppercase tracking-[1.5px] text-amber mb-2">{year}</div>
      <div className="text-[15px] font-medium text-warm-dark mb-1.5">{title}</div>
      <p className="text-[13px] text-text-muted leading-[1.65]">{desc}</p>
    </div>
  )
}

function TimelineSection() {
  return (
    <section className="bg-off-white px-8 md:px-16 py-24 border-t border-b border-border">
      <div className="text-[11px] font-medium uppercase tracking-[2px] text-amber mb-4">Our history</div>
      <h2 className="font-display text-[clamp(32px,4vw,48px)] font-black text-warm-dark leading-[1.1] tracking-[-1px] mb-16">
        How Animal SOS came to be
      </h2>

      {/* Desktop alternating timeline */}
      <div className="hidden md:block">
        <div className="relative" style={{ display: 'grid', gridTemplateColumns: '1fr 48px 1fr' }}>
          {/* Vertical amber line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-amber via-amber/40 to-amber/10" />

          {/* Left column */}
          <div className="pr-8 flex flex-col gap-0">
            {TIMELINE.filter((_, i) => i % 2 === 0).map((e) => (
              <div key={e.year} className="pb-12">
                <TimelineCard {...e} />
              </div>
            ))}
          </div>

          {/* Center dots */}
          <div className="flex flex-col items-center gap-0 relative z-10">
            <div className="flex flex-col" style={{ gap: '96px', marginTop: '20px' }}>
              {TIMELINE.map((e) => (
                <div key={e.year} className="w-3.5 h-3.5 rounded-full bg-amber border-[3px] border-off-white" />
              ))}
            </div>
          </div>

          {/* Right column — offset by ~80px to stagger */}
          <div className="pl-8 flex flex-col gap-0" style={{ marginTop: '80px' }}>
            {TIMELINE.filter((_, i) => i % 2 === 1).map((e) => (
              <div key={e.year} className="pb-12">
                <TimelineCard {...e} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile simple vertical timeline */}
      <div className="md:hidden relative">
        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber to-amber/10" />
        <div className="flex flex-col gap-6 pl-14">
          {TIMELINE.map((e) => (
            <div key={e.year} className="relative">
              <div className="absolute -left-[36px] top-4 w-3 h-3 rounded-full bg-amber border-2 border-off-white" />
              <TimelineCard {...e} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── 4. SANCTUARY ────────────────────────────────────────────────────────── */

const SANCTUARY_CARDS = [
  {
    img: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=600&q=80&fit=crop',
    title: 'Medical centre',
    desc: 'Every animal receives a full vet check, vaccinations, neutering, and treatment on arrival. Our on-site clinic handles everything from mange to surgery.',
    stat: '100%',
    statLabel: 'Vaccinated before adoption',
  },
  {
    img: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&q=80&fit=crop',
    title: 'Kennels & socialisation',
    desc: 'Animals aren\'t kept in cages — they live in run-based kennels with daily enrichment, socialisation sessions, and human contact from our volunteer teams.',
    stat: '2,500+',
    statLabel: 'Animals in residence',
  },
  {
    img: 'https://images.unsplash.com/photo-1444212477490-ca407925329e?w=600&q=80&fit=crop',
    title: 'Outdoor grounds',
    desc: 'Acres of grounds allow dogs to run freely in supervised groups. Cats have indoor/outdoor spaces, climbing structures, and quiet rooms for shy arrivals.',
    stat: '50+',
    statLabel: 'Full-time staff & volunteers',
  },
]

function SanctuarySection() {
  return (
    <section className="px-8 md:px-16 py-24 bg-cream">
      <div className="text-center mb-16">
        <div className="text-[11px] font-medium uppercase tracking-[2px] text-amber mb-4">Behind the scenes</div>
        <h2 className="font-display text-[clamp(32px,4vw,48px)] font-black text-warm-dark leading-[1.1] tracking-[-1px] mb-4">
          Life at the sanctuary
        </h2>
        <p className="text-[16px] text-text-muted leading-[1.7] max-w-[560px] mx-auto">
          Our sanctuary outside Colombo is home to over 2,500 animals at any one time. Here&apos;s what a day looks like.
        </p>
      </div>

      {/* 3 sanctuary cards */}
      <div className="grid md:grid-cols-3 gap-5 mb-12">
        {SANCTUARY_CARDS.map((c) => (
          <div key={c.title} className="bg-off-white border border-border rounded-[20px] overflow-hidden hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(28,21,16,0.07)] transition-all duration-250">
            <div className="h-[160px] overflow-hidden">
              <Image
                src={c.img}
                alt={c.title}
                width={600}
                height={160}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5 md:p-[20px_22px]">
              <div className="text-[15px] font-medium text-warm-dark mb-2">{c.title}</div>
              <p className="text-[13px] text-text-muted leading-[1.65] mb-4">{c.desc}</p>
              <div className="font-display text-[22px] font-bold text-amber">{c.stat}</div>
              <div className="text-[11px] text-text-muted uppercase tracking-[0.5px] mt-0.5">{c.statLabel}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Dark feature panel */}
      <div className="bg-warm-dark rounded-[24px] p-10 md:p-14 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="text-[11px] font-medium uppercase tracking-[2px] text-amber-light mb-4">The bigger picture</div>
          <h3 className="font-display text-[28px] md:text-[32px] font-black text-off-white leading-[1.1] tracking-[-0.5px] mb-4">
            We&apos;re not just a rescue — we&apos;re a movement
          </h3>
          <p className="text-[15px] text-[rgba(255,253,249,0.55)] leading-[1.8]">
            Animal SOS Sri Lanka runs island-wide TNVR (Trap–Neuter–Vaccinate–Return) programmes, school education drives, and community feeding stations across Colombo and beyond. Adoptions fund this work directly.
          </p>
          <div className="grid grid-cols-2 gap-3 mt-8">
            {[
              { num: '15,000+', label: 'Animals TNVR\'d' },
              { num: '200+', label: 'Schools reached' },
              { num: '30+', label: 'Feeding stations' },
              { num: '0', label: 'Profit taken' },
            ].map((s) => (
              <div key={s.label} className="bg-[rgba(255,253,249,0.05)] border border-[rgba(255,253,249,0.08)] rounded-[12px] px-5 py-4">
                <div className="font-display text-[26px] font-bold text-amber-light">{s.num}</div>
                <div className="text-[11px] text-[rgba(255,253,249,0.4)] uppercase tracking-[0.5px] mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { emoji: '🐕', label: 'Dogs rescued daily' },
            { emoji: '🐈', label: 'Cats in care' },
            { emoji: '💉', label: 'Vet clinic on-site' },
            { emoji: '🌍', label: 'Global adoptions' },
          ].map((v) => (
            <div key={v.label} className="bg-[rgba(255,253,249,0.05)] border border-[rgba(255,253,249,0.08)] rounded-[16px] p-6 text-center">
              <span className="text-[40px] block mb-3">{v.emoji}</span>
              <div className="text-[13px] text-[rgba(255,253,249,0.6)]">{v.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── 5. TEAM ─────────────────────────────────────────────────────────────── */

const TEAM = [
  {
    name: 'Vanessa Herron',
    role: 'Founder & Director',
    bio: 'Vanessa founded Animal SOS Sri Lanka in 2007 after moving to Colombo and witnessing the scale of street animal suffering. She leads the sanctuary and international adoptions.',
    location: '🇱🇰 Colombo',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80&fit=crop&crop=face',
  },
  {
    name: 'Dr. Sanjay Perera',
    role: 'Head Veterinarian',
    bio: 'Sanjay oversees all medical care at the sanctuary, from emergency rescues to pre-adoption health checks. 12 years with Animal SOS.',
    location: '🇱🇰 Colombo',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&q=80&fit=crop&crop=face',
  },
  {
    name: 'Claire Thompson',
    role: 'UK Adoptions Lead',
    bio: 'Claire manages all UK and European adoptions, from application review through to the animal\'s arrival. She\'s personally overseen 300+ international placements.',
    location: '🇬🇧 London',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80&fit=crop&crop=face',
  },
  {
    name: 'Rohan Silva',
    role: 'Sanctuary Manager',
    bio: 'Rohan runs day-to-day sanctuary operations, managing a team of 50+ staff and volunteers who care for over 2,500 animals every single day.',
    location: '🇱🇰 Colombo',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80&fit=crop&crop=face',
  },
]

function TeamSection() {
  return (
    <section className="px-8 md:px-16 py-24 bg-off-white border-t border-border">
      <div className="mb-14">
        <div className="text-[11px] font-medium uppercase tracking-[2px] text-amber mb-4">The people</div>
        <h2 className="font-display text-[clamp(32px,4vw,48px)] font-black text-warm-dark leading-[1.1] tracking-[-1px]">
          Meet the team behind every adoption
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {TEAM.map((p) => (
          <div
            key={p.name}
            className="text-center bg-cream border border-border rounded-[20px] px-5 py-8 hover:-translate-y-1 hover:border-[rgba(212,131,42,0.3)] transition-all duration-250"
          >
            <div className="w-[72px] h-[72px] rounded-full bg-amber-pale border-[3px] border-amber-light overflow-hidden mx-auto mb-4">
              <Image
                src={p.avatar}
                alt={p.name}
                width={72}
                height={72}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-[16px] font-medium text-warm-dark mb-1">{p.name}</div>
            <div className="text-[12px] uppercase tracking-[0.5px] text-amber mb-3">{p.role}</div>
            <p className="text-[13px] text-text-muted leading-[1.65] mb-4">{p.bio}</p>
            <span className="inline-block text-[11px] text-text-muted bg-off-white border border-border px-3 py-1 rounded-full">
              {p.location}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── 6. CREDENTIALS ──────────────────────────────────────────────────────── */

const CREDENTIALS = [
  {
    icon: '🏛',
    title: 'UK Registered Charity',
    desc: 'Registered with the Charity Commission for England & Wales. Fully audited accounts published annually.',
    badge: 'No. 1119902',
  },
  {
    icon: '💰',
    title: 'Zero profit model',
    desc: 'Every penny from adoption fees and donations goes directly to animal care, medical treatment, and sanctuary operations.',
    badge: '100% welfare',
  },
  {
    icon: '🐾',
    title: 'Ethical matching',
    desc: "We never rush adoptions. Every match is reviewed carefully to ensure long-term compatibility — we'd rather wait than place wrong.",
    badge: 'Since 2007',
  },
  {
    icon: '📋',
    title: 'Full transparency',
    desc: 'Our adoption process, costs, and animal health records are fully disclosed. No hidden fees. No surprises. Just honesty.',
    badge: 'Open records',
  },
]

function CredentialsSection() {
  return (
    <section className="px-8 md:px-16 py-20 bg-amber-pale border-t border-[rgba(212,131,42,0.15)]">
      <div className="text-center mb-12">
        <div className="text-[11px] font-medium uppercase tracking-[2px] text-amber mb-4">Trust & transparency</div>
        <h2 className="font-display text-[clamp(28px,3vw,40px)] font-black text-warm-dark tracking-[-0.5px]">
          Why you can trust us with this
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {CREDENTIALS.map((c) => (
          <div key={c.title} className="bg-off-white border border-border rounded-[16px] px-6 py-7 text-center">
            <span className="text-[36px] block mb-4">{c.icon}</span>
            <div className="text-[14px] font-medium text-warm-dark mb-2">{c.title}</div>
            <p className="text-[12px] text-text-muted leading-[1.6] mb-4">{c.desc}</p>
            <span className="inline-block text-[11px] font-medium px-3 py-1 rounded-full bg-[#EAF3DE] text-[#4A6741] border border-[rgba(74,103,65,0.2)]">
              {c.badge}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── 7. CTA ──────────────────────────────────────────────────────────────── */

function CtaSection() {
  return (
    <section className="relative bg-warm-dark px-8 md:px-16 py-24 text-center overflow-hidden">
      <div className="absolute text-[400px] opacity-[0.03] top-[-80px] left-[-80px] select-none leading-none">🐾</div>
      <div className="absolute text-[300px] opacity-[0.03] bottom-[-60px] right-[-60px] select-none leading-none">🐾</div>
      <div className="relative z-10">
        <div className="text-[11px] font-medium uppercase tracking-[2px] text-amber-light mb-5">Join the family</div>
        <h2 className="font-display text-[clamp(36px,5vw,60px)] font-black text-off-white leading-[1.05] tracking-[-1.5px] mb-4">
          Ready to be part<br />of the story?
        </h2>
        <p className="text-[17px] text-[rgba(255,253,249,0.5)] leading-[1.7] max-w-[440px] mx-auto mb-12">
          Whether you adopt, volunteer, donate, or simply share — you&apos;re part of what makes this work.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/adopt"
            className="inline-flex items-center gap-2 bg-amber text-warm-dark font-medium px-8 py-4 rounded-full hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(212,131,42,0.35)] transition-all"
          >
            Meet the animals →
          </Link>
          <Link
            href="/volunteer#donate"
            className="inline-flex items-center gap-2 border border-[rgba(255,253,249,0.2)] text-[rgba(255,253,249,0.8)] font-medium px-8 py-4 rounded-full hover:border-[rgba(255,253,249,0.5)] hover:text-off-white transition-colors"
          >
            Donate to the sanctuary
          </Link>
        </div>
      </div>
    </section>
  )
}
