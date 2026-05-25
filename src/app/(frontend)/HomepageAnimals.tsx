'use client'

import { useState } from 'react'
import Link from 'next/link'
import { getAnimals } from '@/lib/payload'
import type { Animal } from '@/lib/payload'
import AnimalCard from '@/app/components/AnimalCard'

const TABS = [
  { label: 'All animals', type: undefined as string | undefined, typeIn: undefined as string[] | undefined, specialAny: false },
  { label: 'Adult dogs', type: 'dog', typeIn: undefined, specialAny: false },
  { label: 'Puppies', type: 'puppy', typeIn: undefined, specialAny: false },
  { label: 'Cats & kittens', type: undefined, typeIn: ['cat', 'kitten'], specialAny: false },
  { label: 'Special needs ♡', type: undefined, typeIn: undefined, specialAny: true },
]

export default function HomepageAnimals({ initial }: { initial: Animal[] }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [animals, setAnimals] = useState<Animal[]>(initial)
  const [loading, setLoading] = useState(false)

  async function handleTab(idx: number) {
    if (idx === activeIdx) return
    setActiveIdx(idx)
    setLoading(true)
    const tab = TABS[idx]
    try {
      const result = await getAnimals({
        type: tab.type,
        typeIn: tab.typeIn,
        special: tab.specialAny ? ['urgent', 'quirky', 'senior'] : undefined,
        limit: 6,
      })
      setAnimals(result.docs)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="bg-warm-dark px-6 md:px-16 py-24">
      <div className="text-[11px] font-medium uppercase tracking-[2px] text-amber-light mb-5">Find your match</div>
      <h2 className="font-display text-[clamp(36px,4vw,52px)] font-black text-off-white leading-[1.1] tracking-[-1px] mb-4">
        Meet the animals<br />waiting for you
      </h2>
      <p className="text-[17px] text-[rgba(255,253,249,0.55)] max-w-[500px] mb-12">
        Every single one has been rescued, loved, and rehabilitated. Now they need you.
      </p>

      <div className="flex flex-wrap gap-1 mb-12">
        {TABS.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => handleTab(i)}
            className={`px-[22px] py-[10px] rounded-full border text-[13px] font-medium transition-all ${
              activeIdx === i
                ? 'bg-amber border-amber text-warm-dark'
                : 'border-[rgba(255,253,249,0.1)] text-[rgba(255,253,249,0.5)] hover:border-[rgba(255,253,249,0.3)] hover:text-[rgba(255,253,249,0.8)]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-[rgba(255,253,249,0.05)] border border-[rgba(255,253,249,0.08)] rounded-[20px] overflow-hidden animate-pulse">
              <div className="h-[200px]" />
              <div className="p-5 flex flex-col gap-3">
                <div className="h-5 bg-[rgba(255,253,249,0.08)] rounded-full w-2/3" />
                <div className="h-4 bg-[rgba(255,253,249,0.06)] rounded-full w-1/2" />
                <div className="flex gap-2 mt-1">
                  <div className="h-6 bg-[rgba(255,253,249,0.06)] rounded-full w-16" />
                  <div className="h-6 bg-[rgba(255,253,249,0.06)] rounded-full w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : animals.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-[rgba(255,253,249,0.4)] text-[15px]">No animals in this category right now.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {animals.map((a) => (
            <AnimalCard key={a.id} animal={a} />
          ))}
        </div>
      )}

      <div className="text-center mt-12">
        <Link
          href="/adopt"
          className="inline-flex items-center gap-2 bg-amber text-warm-dark font-medium px-8 py-4 rounded-full hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(212,131,42,0.35)] transition-all"
        >
          See all animals →
        </Link>
      </div>
    </section>
  )
}
