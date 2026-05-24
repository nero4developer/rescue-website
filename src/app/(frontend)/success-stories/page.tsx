import Link from 'next/link'
import type { Metadata } from 'next'
import { getSuccessStories } from '@/lib/payload-server'
import StoryCard from './StoryCard'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Success Stories — Animal SOS Adoptions',
  description: 'Read stories from families who adopted rescued Sri Lankan street dogs and cats through Animal SOS.',
}

export default async function SuccessStoriesPage() {
  const stories = await getSuccessStories().catch(() => [])

  return (
    <>
      <div className="bg-warm-dark px-10 py-16 relative overflow-hidden">
        <div className="absolute right-[-20px] bottom-[-40px] text-[320px] opacity-[0.03] select-none leading-none">💛</div>
        <div className="max-w-2xl">
          <div className="text-[11px] font-medium uppercase tracking-[2px] text-amber-light mb-4">Happy endings</div>
          <h1 className="font-display text-[clamp(40px,5vw,56px)] font-black text-off-white leading-[1.05] tracking-[-1.5px] mb-4">
            800 animals.<br />800 <em className="italic text-amber">new beginnings.</em>
          </h1>
          <p className="text-[16px] text-[rgba(255,253,249,0.55)] leading-[1.7] max-w-[480px]">
            Every adoption is a story. Here are some of our favourites, shared by the families who opened their homes to a rescued street dog or cat from Sri Lanka.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {stories.length === 0 ? (
          <div className="text-center py-20">
            <span className="text-[64px] block mb-5">🐾</span>
            <h3 className="font-display text-[28px] text-warm-dark mb-2">Stories coming soon</h3>
            <p className="text-[15px] text-text-muted mb-8 max-w-[400px] mx-auto">
              We&apos;re collecting stories from our adopters. In the meantime, meet the animals looking for their happy ending.
            </p>
            <Link href="/adopt" className="px-8 py-3 bg-amber text-warm-dark rounded-full font-medium hover:bg-warm-dark hover:text-amber-light transition-colors">
              Browse animals
            </Link>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-[28px] font-bold text-warm-dark tracking-[-0.5px]">
                {stories.length} adoption {stories.length === 1 ? 'story' : 'stories'}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {stories.map((story) => <StoryCard key={story.id} story={story} />)}
            </div>
            <div className="text-center bg-cream border border-border rounded-[28px] px-10 py-12">
              <h3 className="font-display text-[28px] font-bold text-warm-dark mb-3">Your story could be next</h3>
              <p className="text-[15px] text-text-muted mb-6 max-w-[400px] mx-auto leading-[1.7]">
                Browse our animals and find the one who&apos;s been waiting for you.
              </p>
              <Link href="/adopt" className="px-8 py-[14px] bg-amber text-warm-dark font-medium rounded-full hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(212,131,42,0.35)] transition-all">
                Meet the animals →
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  )
}
