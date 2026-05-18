import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lovely Little Quirks — Animal SOS Adoptions',
  description: 'Meet our animals with special needs or little quirks — three-legged dogs, one-eyed cats, and other wonderfully imperfect animals who deserve a home.',
}

const QUIRK_TYPES = [
  {
    icon: '🐾',
    title: 'Three-legged dogs',
    shortName: 'Tripods',
    body: 'Dogs who have lost a limb through injury or surgery adapt remarkably fast. Within weeks most are running, playing, and stealing socks like any four-legged dog. Their zest for life is contagious.',
    fact: 'Tripod dogs live the same lifespan as four-legged dogs when kept at a healthy weight.',
  },
  {
    icon: '👁️',
    title: 'One-eyed animals',
    shortName: 'One-eyed wonders',
    body: 'Vision loss in one eye rarely slows an animal down. They compensate quickly and lead completely normal lives. Many adopters say their one-eyed dog or cat has the most soulful, expressive face.',
    fact: 'Animals have better low-light vision than humans and adapt to monocular vision more rapidly than people expect.',
  },
  {
    icon: '🦻',
    title: 'Deaf dogs',
    shortName: 'Silent pups',
    body: 'Deaf dogs are trained with hand signals instead of voice commands — and they learn just as quickly. They are often described as exceptionally attentive because they watch your every move.',
    fact: 'Deaf dogs can enjoy a full quality of life. They just need a securely fenced garden and extra attention to visual cues.',
  },
  {
    icon: '🐢',
    title: 'Shy and timid animals',
    shortName: 'Wallflowers',
    body: 'Some of our rescues experienced trauma before we found them. They need patient, quiet adopters who understand that trust is earned slowly — and that it\'s absolutely worth the wait.',
    fact: 'With the right home, most shy animals blossom into confident, deeply devoted companions within months.',
  },
  {
    icon: '🧓',
    title: 'Senior animals',
    shortName: 'Golden oldies',
    body: 'Older dogs and cats are often overlooked, but they make wonderful companions. They are calmer, trained, and deeply appreciative of comfort. Adopting a senior is one of the most rewarding things you can do.',
    fact: 'Senior pets typically require less exercise and adapt to routines faster than puppies or kittens.',
  },
  {
    icon: '🍀',
    title: 'Animals with chronic conditions',
    shortName: 'Special care',
    body: 'Some animals have managed conditions like skin allergies, epilepsy, or heart murmurs. We are transparent about all health needs — and we match these animals with experienced, prepared adopters.',
    fact: 'Many chronic conditions are well-managed with simple routines and budget-friendly medication.',
  },
]

export default function QuirkyDogsPage() {
  return (
    <>
      <div className="bg-warm-dark px-10 py-16 relative overflow-hidden">
        <div className="absolute right-0 bottom-0 text-[300px] opacity-[0.04] select-none leading-none">🐾</div>
        <div className="max-w-2xl">
          <div className="text-[11px] font-medium uppercase tracking-[2px] text-amber-light mb-4">Imperfectly perfect</div>
          <h1 className="font-display text-[clamp(40px,5vw,58px)] font-black text-off-white leading-[1.05] tracking-[-1.5px] mb-4">
            Lovely little<br /><em className="italic text-amber">quirks.</em>
          </h1>
          <p className="text-[16px] text-[rgba(255,253,249,0.55)] leading-[1.7] max-w-[480px]">
            Not every rescue comes with a clean bill of health. Some of our most special animals have three legs, one eye, a shy heart, or a medical condition. They are no less loving — they just need someone willing to look a little closer.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">

        <div className="max-w-2xl mb-16">
          <h2 className="font-display text-[28px] font-bold text-warm-dark mb-5 tracking-[-0.5px]">Why adopt a quirky animal?</h2>
          <div className="flex flex-col gap-4 text-[15px] text-text-muted leading-[1.8]">
            <p>
              Animals with special needs or traumatic histories are often the last to be adopted — and the first to be overlooked on listing pages. But the people who do adopt them almost universally say the same thing: <em className="text-text-body not-italic font-medium">they got so much more than they expected.</em>
            </p>
            <p>
              The bond that forms when an animal has needed to trust again, and chosen to trust <em>you</em>, is unlike anything else. We think that&apos;s worth talking about.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {QUIRK_TYPES.map((q) => (
            <div key={q.title} className="bg-cream border border-border rounded-[24px] p-7">
              <div className="flex items-start gap-4 mb-4">
                <div className="text-[36px] leading-none">{q.icon}</div>
                <div>
                  <div className="text-[16px] font-medium text-warm-dark">{q.title}</div>
                  <div className="text-[12px] text-amber uppercase tracking-[1px] mt-0.5">{q.shortName}</div>
                </div>
              </div>
              <p className="text-[14px] text-text-muted leading-[1.7] mb-4">{q.body}</p>
              <div className="bg-amber-pale border border-amber/20 rounded-[12px] px-4 py-3">
                <div className="text-[11px] uppercase tracking-[1px] text-clay mb-1">Did you know</div>
                <p className="text-[13px] text-text-body leading-[1.6]">{q.fact}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-cream border border-border rounded-[28px] p-10 mb-16">
          <h2 className="font-display text-[26px] font-bold text-warm-dark mb-5 tracking-[-0.5px]">Our commitment to you</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: '📋', title: 'Full transparency', body: 'Every animal\'s known medical history, temperament notes, and needs are disclosed before you apply.' },
              { icon: '🤝', title: 'Ongoing support', body: 'We stay available after adoption. If you have questions or challenges, our team is always here.' },
              { icon: '💊', title: 'Guidance on care', body: 'We provide written guides for any ongoing conditions and connect you with vet contacts who know the animal.' },
            ].map((c) => (
              <div key={c.title} className="flex gap-4">
                <div className="text-[24px] shrink-0">{c.icon}</div>
                <div>
                  <div className="text-[14px] font-medium text-warm-dark mb-1">{c.title}</div>
                  <p className="text-[13px] text-text-muted leading-[1.6]">{c.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-warm-dark rounded-[28px] px-10 py-12 text-center">
          <h2 className="font-display text-[30px] font-black text-off-white tracking-[-1px] mb-4">
            Ready to meet a quirky animal?
          </h2>
          <p className="text-[15px] text-[rgba(255,253,249,0.55)] mb-8 max-w-[380px] mx-auto leading-[1.7]">
            Browse all our available animals — look for the &ldquo;Lovely little quirks&rdquo; tag to find our special cases.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/adopt"
              className="px-8 py-[14px] bg-amber text-warm-dark font-medium rounded-full hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(212,131,42,0.35)] transition-all"
            >
              Browse animals →
            </Link>
            <Link
              href="/contact"
              className="px-8 py-[14px] border border-[rgba(255,253,249,0.2)] text-off-white rounded-full hover:border-amber hover:text-amber transition-colors"
            >
              Ask us a question
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
