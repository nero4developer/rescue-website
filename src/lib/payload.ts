const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export type Animal = {
  id: string
  name: string
  type: 'dog' | 'cat' | 'other'
  breed: string
  age: number
  sex: 'male' | 'female'
  status: 'available' | 'on-hold' | 'in-review' | 'adopted'
  traits?: { trait: string; id?: string }[]
  slug: string
  description?: unknown
  photo?: { url: string; alt: string }
}

type PayloadList<T> = {
  docs: T[]
  totalDocs: number
  totalPages: number
  page: number
  hasPrevPage: boolean
  hasNextPage: boolean
}

async function payloadFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    next: { revalidate: 60 },
    ...options,
  })
  if (!res.ok) throw new Error(`Payload API error: ${res.status} ${path}`)
  return res.json() as Promise<T>
}

export type AnimalsQuery = {
  type?: string
  sex?: string
  status?: string
  search?: string
  traits?: string[]
  special?: string[]
  page?: number
  limit?: number
}

export async function getAnimals(query: AnimalsQuery = {}): Promise<PayloadList<Animal>> {
  const params = new URLSearchParams()
  params.set('depth', '1')

  const urgent = query.special?.includes('urgent')
  const senior = query.special?.includes('senior')
  const quirky = query.special?.includes('quirky')

  // Merge trait-based filters: sidebar trait checkboxes + quirky special
  const traitFilters = [...(query.traits ?? [])]
  if (quirky) traitFilters.push('quirk')

  const hasSearch = Boolean(query.search)
  const hasTraits = traitFilters.length > 0

  // Use where[and][N] wrapper so we can nest OR groups inside each AND condition
  let ai = 0

  // Status
  if (urgent) {
    params.set(`where[and][${ai}][or][0][status][equals]`, 'on-hold')
    params.set(`where[and][${ai}][or][1][status][equals]`, 'in-review')
  } else if (query.status) {
    params.set(`where[and][${ai}][status][equals]`, query.status)
  } else {
    params.set(`where[and][${ai}][status][not_equals]`, 'adopted')
  }
  ai++

  if (query.type) {
    params.set(`where[and][${ai}][type][equals]`, query.type)
    ai++
  }

  if (query.sex) {
    params.set(`where[and][${ai}][sex][equals]`, query.sex)
    ai++
  }

  // Senior: 7+ years = 84+ months
  if (senior) {
    params.set(`where[and][${ai}][age][greater_than_or_equal]`, '84')
    ai++
  }

  // Search: name OR breed
  if (hasSearch) {
    params.set(`where[and][${ai}][or][0][name][like]`, query.search!)
    params.set(`where[and][${ai}][or][1][breed][like]`, query.search!)
    ai++
  }

  // Trait filters: any of the selected trait keywords (OR across them)
  if (hasTraits) {
    traitFilters.forEach((t, i) => {
      params.set(`where[and][${ai}][or][${i}][traits.trait][like]`, t)
    })
    ai++
  }

  if (query.page) params.set('page', String(query.page))
  params.set('limit', String(query.limit ?? 12))

  return payloadFetch<PayloadList<Animal>>(`/api/animals?${params}`)
}

export async function getAnimalBySlug(slug: string): Promise<Animal | null> {
  const params = new URLSearchParams()
  params.set('where[slug][equals]', slug)
  params.set('depth', '1')
  params.set('limit', '1')

  const result = await payloadFetch<PayloadList<Animal>>(`/api/animals?${params}`)
  return result.docs[0] ?? null
}

export async function getAllAnimalSlugs(): Promise<string[]> {
  const params = new URLSearchParams()
  params.set('limit', '200')
  params.set('depth', '0')
  const result = await payloadFetch<PayloadList<Animal>>(`/api/animals?${params}`)
  return result.docs.map((a) => a.slug).filter(Boolean)
}

export type Story = {
  id: string
  adopterFirstName: string
  animalName: string
  country: string
  quote: string
  photo?: { url: string; alt: string }
  featured?: boolean
  publishedDate?: string
}

export async function getSuccessStories(featuredOnly = false): Promise<Story[]> {
  const params = new URLSearchParams()
  params.set('depth', '1')
  params.set('limit', '50')
  if (featuredOnly) params.set('where[featured][equals]', 'true')
  params.set('sort', '-publishedDate')
  const result = await payloadFetch<PayloadList<Story>>(`/api/success-stories?${params}`)
  return result.docs
}
