import Link from 'next/link'

const ADOPT_LINKS = [
  { href: '/adopt?type=dog', label: 'Adult dogs' },
  { href: '/adopt?type=dog&age=puppy', label: 'Puppies' },
  { href: '/adopt?type=cat', label: 'Cats' },
  { href: '/adopt?type=cat&age=kitten', label: 'Kittens' },
  { href: '/adopt?special=true', label: 'Special needs' },
]

const HELP_LINKS = [
  { href: '/volunteer#donate', label: 'Donate' },
  { href: '/volunteer', label: 'Volunteer' },
  { href: '/volunteer#ambassador', label: 'Become ambassador' },
  { href: '/contact', label: 'Rescue support' },
]

const INFO_LINKS = [
  { href: '/about', label: 'About us' },
  { href: '/breeds/sinhala-hound', label: 'Sinhala Hound breed' },
  { href: '/success-stories', label: 'Success stories' },
  { href: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="bg-footer-bg text-[rgba(255,253,249,0.4)] text-[13px]" style={{ padding: '60px 64px 40px' }}>
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-12 pb-12 border-b border-[rgba(255,253,249,0.06)]">
        <div>
          <div className="font-display text-[22px] font-bold text-off-white mb-4">
            Animal<span className="text-amber">SOS</span> Adoptions
          </div>
          <p className="leading-[1.7] mb-6">
            Connecting rescued Sri Lankan street animals with loving families worldwide.
            Every adoption creates space for another rescue.
          </p>
          <div className="inline-flex items-center gap-2 bg-[rgba(255,253,249,0.04)] border border-[rgba(255,253,249,0.08)] rounded-lg px-4 py-2 text-[12px]">
            🏛 UK Registered Charity · No. 1119902
          </div>
        </div>
        <FooterCol title="Adopt" links={ADOPT_LINKS} />
        <FooterCol title="Help" links={HELP_LINKS} />
        <FooterCol title="Info" links={INFO_LINKS} />
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <span>© 2026 Animal SOS Adoptions · asosadoptions@gmail.com</span>
        <div className="flex gap-3">
          {(['🇱🇰 Sri Lanka', '🇪🇺 EU', '🇬🇧 UK', '🇨🇦 Canada'] as const).map((r) => (
            <span
              key={r}
              className="bg-[rgba(212,131,42,0.1)] text-amber-light border border-[rgba(212,131,42,0.2)] rounded-full px-3 py-1 text-[11px] font-medium"
            >
              {r}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-6 text-center text-[11px] text-[rgba(255,253,249,0.2)]">
        Website donated by <a href="https://github.com/nerovoxx" className="hover:text-amber-light transition-colors">Neroshana Gunasekara</a>
      </div>
    </footer>
  )
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <div className="font-medium text-[rgba(255,253,249,0.7)] mb-4 text-[12px] uppercase tracking-[1px]">
        {title}
      </div>
      <ul className="flex flex-col gap-[10px] list-none">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link href={href} className="text-[rgba(255,253,249,0.4)] hover:text-amber-light transition-colors">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
