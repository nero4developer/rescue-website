import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 — Page Not Found — Animal SOS Adoptions',
}

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center px-6 py-24">
      <div className="text-center max-w-md">
        <span className="text-[80px] block mb-6">🐾</span>
        <h1 className="font-display text-[48px] font-black text-warm-dark leading-none tracking-[-2px] mb-4">
          404
        </h1>
        <h2 className="font-display text-[22px] font-bold text-warm-dark mb-3">
          We lost the trail.
        </h2>
        <p className="text-[15px] text-text-muted leading-[1.7] mb-8">
          That page doesn&apos;t seem to exist. Maybe the animal got adopted, or the link has moved. Let&apos;s get you back on track.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link
            href="/adopt"
            className="px-7 py-[13px] bg-amber text-warm-dark font-medium rounded-full hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(212,131,42,0.35)] transition-all"
          >
            Browse animals →
          </Link>
          <Link
            href="/"
            className="px-7 py-[13px] border border-border text-text-muted rounded-full hover:border-text-body hover:text-text-body transition-colors"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  )
}
