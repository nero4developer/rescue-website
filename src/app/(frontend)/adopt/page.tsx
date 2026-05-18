'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { getAnimals } from '@/lib/payload'
import type { Animal } from '@/lib/payload'
import AnimalCard from '@/app/components/AnimalCard'
import FilterSidebar from './FilterSidebar'

export default function AdoptPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [animals, setAnimals] = useState<Animal[]>([])
  const [totalDocs, setTotalDocs] = useState(0)
  const [page, setPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(false)
  const [loading, setLoading] = useState(true)

  const type = searchParams.get('type') || ''
  const sex = searchParams.get('sex') || ''
  const search = searchParams.get('q') || ''

  const fetchAnimals = useCallback(async (resetPage = true) => {
    setLoading(true)
    const currentPage = resetPage ? 1 : page
    if (resetPage) setPage(1)
    try {
      const result = await getAnimals({ type, sex, search, page: currentPage, limit: 12 })
      if (resetPage) {
        setAnimals(result.docs)
      } else {
        setAnimals((prev) => [...prev, ...result.docs])
      }
      setTotalDocs(result.totalDocs)
      setHasNextPage(result.hasNextPage)
    } finally {
      setLoading(false)
    }
  }, [type, sex, search, page])

  useEffect(() => { fetchAnimals(true) }, [type, sex, search]) // eslint-disable-line react-hooks/exhaustive-deps

  function setParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value) params.set(key, value)
    else params.delete(key)
    router.push(`/adopt?${params}`, { scroll: false })
  }

  function clearFilters() {
    router.push('/adopt', { scroll: false })
  }

  return (
    <>
      <div className="bg-warm-dark px-6 md:px-16 py-16 relative overflow-hidden">
        <div className="absolute right-[-20px] bottom-[-40px] text-[320px] opacity-[0.03] select-none leading-none">🐾</div>
        <div className="max-w-xl">
          <div className="text-[11px] font-medium uppercase tracking-[2px] text-amber-light mb-4">Find your match</div>
          <h1 className="font-display text-[clamp(40px,5vw,60px)] font-black text-off-white leading-[1.05] tracking-[-1.5px] mb-4">
            Meet the animals<br />looking for <em className="italic text-amber">you.</em>
          </h1>
          <p className="text-[16px] text-[rgba(255,253,249,0.55)] leading-[1.7] max-w-[480px]">
            Every dog and cat here has been rescued off the streets of Sri Lanka, treated, and loved back to health.
          </p>
        </div>
        <div className="flex gap-0 border-t border-[rgba(255,253,249,0.08)] mt-10">
          {[
            { num: totalDocs || '—', label: 'Available now' },
            { num: '100%', label: 'Vaccinated' },
            { num: '4', label: 'Countries' },
            { num: '800+', label: 'Happy homes' },
          ].map((s) => (
            <div key={s.label} className="pr-10 pt-6">
              <div className="font-display text-[28px] font-bold text-amber-light">{s.num}</div>
              <div className="text-[11px] text-[rgba(255,253,249,0.4)] uppercase tracking-[0.5px] mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-off-white border-b border-border px-4 md:px-12 py-5 flex gap-4 items-center flex-wrap sticky top-[73px] z-40">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[16px] text-text-muted pointer-events-none">🔍</span>
          <input
            type="text"
            defaultValue={search}
            placeholder="Search by name or breed…"
            onChange={(e) => setParam('q', e.target.value)}
            className="w-full pl-10 pr-4 py-[10px] border border-border rounded-full bg-cream text-[14px] text-text-body outline-none focus:border-amber transition-colors"
          />
        </div>
        <div className="w-px h-7 bg-border" />
        <div className="flex gap-2 flex-wrap">
          {[
            { label: 'All animals', value: '' },
            { label: '🐕 Dogs', value: 'dog' },
            { label: '🐈 Cats', value: 'cat' },
            { label: '🐶 Puppies', value: 'puppy' },
            { label: '🐱 Kittens', value: 'kitten' },
          ].map((p) => (
            <button
              key={p.value}
              onClick={() => setParam('type', p.value)}
              className={`px-[18px] py-2 rounded-full border text-[13px] font-medium transition-all whitespace-nowrap ${
                type === p.value ? 'bg-amber border-amber text-warm-dark' : 'border-border text-text-muted hover:border-amber hover:text-amber'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
        <select
          value={sex}
          onChange={(e) => setParam('sex', e.target.value)}
          className="ml-auto px-4 py-[9px] border border-border rounded-full bg-cream text-[13px] text-text-muted outline-none cursor-pointer"
        >
          <option value="">Any sex</option>
          <option value="male">♂ Male</option>
          <option value="female">♀ Female</option>
        </select>
      </div>

      <div className="flex min-h-[80vh]">
        <FilterSidebar onClear={clearFilters} />
        <div className="flex-1 p-10">
          <div className="flex items-center justify-between mb-7">
            <div className="text-[14px] text-text-muted">
              <strong className="text-text-body font-medium">{totalDocs}</strong> animals found
            </div>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-off-white border border-border rounded-[20px] overflow-hidden animate-pulse">
                  <div className="h-[200px] bg-cream" />
                  <div className="p-5 flex flex-col gap-3">
                    <div className="h-5 bg-cream rounded-full w-2/3" />
                    <div className="h-4 bg-cream rounded-full w-1/2" />
                    <div className="flex gap-2"><div className="h-6 bg-cream rounded-full w-16" /><div className="h-6 bg-cream rounded-full w-16" /></div>
                  </div>
                </div>
              ))}
            </div>
          ) : animals.length === 0 ? (
            <div className="text-center py-20">
              <span className="text-[64px] block mb-5">🐾</span>
              <h3 className="font-display text-[28px] text-warm-dark mb-2">No matches found</h3>
              <p className="text-[15px] text-text-muted mb-6">Try adjusting your search or filters</p>
              <button onClick={clearFilters} className="px-8 py-3 bg-amber text-warm-dark rounded-full font-medium hover:bg-warm-dark hover:text-amber-light transition-colors">
                Reset filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {animals.map((a) => <AnimalCard key={a.id} animal={a} />)}
              </div>
              {hasNextPage && (
                <button
                  onClick={() => { setPage((p) => p + 1); fetchAnimals(false) }}
                  className="block mx-auto mt-10 px-10 py-[14px] border border-border rounded-full text-[14px] font-medium text-text-muted hover:border-amber hover:text-amber transition-colors"
                >
                  Load more animals →
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}
