'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const NAV_LINKS = [
  { href: '/adopt', label: 'Adopt' },
  { href: '/about', label: 'About' },
  { href: '/volunteer', label: 'Help Us' },
  { href: '/success-stories', label: 'Stories' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-12 py-5 bg-cream/92 backdrop-blur-md border-b border-amber/15">
        <Link href="/" className="font-display text-xl font-bold text-warm-dark tracking-tight">
          Animal<span className="text-amber">SOS</span>
        </Link>

        <ul className="hidden md:flex items-center gap-9 list-none">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`text-[13px] font-medium uppercase tracking-[0.5px] transition-colors ${
                  isActive(href) ? 'text-amber' : 'text-text-muted hover:text-amber'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/adopt"
              className="text-[13px] font-medium uppercase tracking-[0.5px] bg-warm-dark text-amber-light px-[22px] py-[10px] rounded-full hover:bg-amber hover:text-warm-dark transition-colors"
            >
              Find your pet →
            </Link>
          </li>
        </ul>

        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden flex flex-col gap-[5px] p-2"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span className={`block w-6 h-[2px] bg-warm-dark transition-transform origin-center ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`block w-6 h-[2px] bg-warm-dark transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-[2px] bg-warm-dark transition-transform origin-center ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </button>
      </nav>

      <div className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${menuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}>
        <div className="absolute inset-0 bg-warm-dark/40" onClick={() => setMenuOpen(false)} />
        <div className={`absolute top-0 right-0 h-full w-72 bg-cream shadow-2xl flex flex-col pt-24 px-8 gap-2 transition-transform duration-300 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`py-3 text-base font-medium uppercase tracking-[0.5px] border-b border-border transition-colors ${
                isActive(href) ? 'text-amber' : 'text-text-body hover:text-amber'
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/adopt"
            className="mt-6 text-center text-[13px] font-medium uppercase tracking-[0.5px] bg-warm-dark text-amber-light px-6 py-3 rounded-full hover:bg-amber hover:text-warm-dark transition-colors"
          >
            Find your pet →
          </Link>
        </div>
      </div>
    </>
  )
}
