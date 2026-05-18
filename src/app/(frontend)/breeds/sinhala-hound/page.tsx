import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sinhala Hound — Animal SOS Adoptions',
  description: 'Learn about the Sinhala Hound — Sri Lanka\'s ancient native dog breed, known for loyalty, intelligence, and adaptability.',
}

const TRAITS = [
  { label: 'Temperament', value: 'Loyal, alert, curious' },
  { label: 'Size', value: 'Medium (12–25 kg)' },
  { label: 'Energy level', value: 'Moderate to high' },
  { label: 'Good with children', value: 'Yes, with socialisation' },
  { label: 'Good with other dogs', value: 'Usually, early intro helps' },
  { label: 'Coat', value: 'Short, low maintenance' },
  { label: 'Lifespan', value: '12–15 years' },
  { label: 'Origin', value: 'Sri Lanka (ancient breed)' },
]

const FAQS = [
  {
    q: 'Are Sinhala Hounds suitable for first-time owners?',
    a: 'Yes — they are adaptable and eager to please, though they benefit from clear, consistent training. Their intelligence means they get bored without mental stimulation.',
  },
  {
    q: 'Can they live in apartments?',
    a: 'They can adapt to apartment life if given adequate daily exercise — at least 45–60 minutes of walking and play. A garden is a bonus but not a requirement.',
  },
  {
    q: 'How do they handle cold climates?',
    a: 'Their short coats mean they feel the cold. Adopters in colder countries often provide a coat during winter walks. They adapt well once settled.',
  },
  {
    q: 'Are they vocal or noisy?',
    a: 'They bark to alert, but are not typically nuisance barkers. Early training around alert barking keeps things manageable.',
  },
]

export default function SinhalaHoundPage() {
  return (
    <>
      <div className="bg-warm-dark px-10 py-16 relative overflow-hidden">
        <div className="absolute right-0 top-0 text-[320px] opacity-[0.04] select-none leading-none">🐕</div>
        <div className="max-w-2xl">
          <nav className="text-[12px] text-[rgba(255,253,249,0.4)] mb-6 flex items-center gap-2">
            <Link href="/" className="hover:text-amber-light transition-colors">Home</Link>
            <span>/</span>
            <span>Sinhala Hound</span>
          </nav>
          <div className="text-[11px] font-medium uppercase tracking-[2px] text-amber-light mb-4">Breed guide</div>
          <h1 className="font-display text-[clamp(40px,5vw,60px)] font-black text-off-white leading-[1.05] tracking-[-1.5px] mb-4">
            The Sinhala Hound<br /><em className="italic text-amber">Sri Lanka&apos;s native dog.</em>
          </h1>
          <p className="text-[16px] text-[rgba(255,253,249,0.55)] leading-[1.7] max-w-[480px]">
            One of the oldest and most adaptable dog breeds in Asia, the Sinhala Hound has been a loyal companion on the island of Sri Lanka for over two thousand years.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-[1fr_300px] gap-16 mb-20">
          <div>
            <h2 className="font-display text-[28px] font-bold text-warm-dark mb-6 tracking-[-0.5px]">About the breed</h2>
            <div className="flex flex-col gap-4 text-[15px] text-text-muted leading-[1.8]">
              <p>
                The Sinhala Hound (also called the Lanka Dog or Sri Lankan street dog) is a medium-sized, naturally athletic dog that developed over millennia on the streets and villages of Sri Lanka. Without selective breeding pressure, they are exceptionally healthy, robust animals with diverse and charming looks.
              </p>
              <p>
                Most have a lean build, pointed muzzle, large upright ears, and a whip-like tail that curls when happy. Coat colours range from golden and tan to black, brown, and brindle — sometimes with white markings. No two look exactly alike.
              </p>
              <p>
                In temperament, they are alert and curious — they were survivors before they were companions — but once they bond with a person or family, that loyalty is unwavering. Many adopters describe them as their most intelligent and characterful dog ever.
              </p>
            </div>
          </div>

          <div className="bg-cream border border-border rounded-[20px] p-6 self-start">
            <h3 className="text-[12px] uppercase tracking-[1.5px] text-text-muted mb-5">Breed at a glance</h3>
            <div className="flex flex-col gap-4">
              {TRAITS.map((t) => (
                <div key={t.label} className="flex flex-col gap-0.5">
                  <div className="text-[11px] uppercase tracking-[1px] text-text-muted">{t.label}</div>
                  <div className="text-[14px] font-medium text-text-body">{t.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="font-display text-[28px] font-bold text-warm-dark mb-8 tracking-[-0.5px]">What to expect</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                icon: '🧠',
                title: 'Highly intelligent',
                body: 'Sinhala Hounds learn quickly and thrive on problem-solving. Enrichment toys, training games, and variety keep them happy and out of mischief.',
              },
              {
                icon: '🏃',
                title: 'Active but not demanding',
                body: 'They enjoy daily walks and play sessions but are not working dogs. An hour of activity a day satisfies most. They then love to nap on a soft bed.',
              },
              {
                icon: '💛',
                title: 'Deeply loyal',
                body: 'Once they trust you, they follow you everywhere. Many become one-person or one-family dogs who express strong preference for their chosen humans.',
              },
              {
                icon: '🐾',
                title: 'Street-smart, home-adaptable',
                body: 'Their street background means they are alert to their environment, but most settle beautifully into home life within weeks of adoption.',
              },
            ].map((c) => (
              <div key={c.title} className="flex gap-4 p-5 bg-cream border border-border rounded-[20px]">
                <div className="text-[28px] shrink-0">{c.icon}</div>
                <div>
                  <div className="text-[15px] font-medium text-warm-dark mb-1.5">{c.title}</div>
                  <p className="text-[13px] text-text-muted leading-[1.65]">{c.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <h2 className="font-display text-[28px] font-bold text-warm-dark mb-8 tracking-[-0.5px]">Frequently asked questions</h2>
          <div className="flex flex-col gap-5">
            {FAQS.map((f) => (
              <div key={f.q} className="bg-cream border border-border rounded-[20px] px-6 py-5">
                <div className="text-[15px] font-medium text-warm-dark mb-2">{f.q}</div>
                <p className="text-[14px] text-text-muted leading-[1.7]">{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-warm-dark rounded-[28px] px-10 py-12 text-center">
          <h2 className="font-display text-[30px] font-black text-off-white tracking-[-1px] mb-4">
            Meet a Sinhala Hound
          </h2>
          <p className="text-[15px] text-[rgba(255,253,249,0.55)] mb-8 max-w-[360px] mx-auto leading-[1.7]">
            Browse our available dogs — most are Sinhala Hounds or Sinhala Hound mixes looking for their forever home.
          </p>
          <Link
            href="/adopt?type=dog"
            className="inline-block px-8 py-[14px] bg-amber text-warm-dark font-medium rounded-full hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(212,131,42,0.35)] transition-all"
          >
            Browse dogs →
          </Link>
        </div>
      </div>
    </>
  )
}
