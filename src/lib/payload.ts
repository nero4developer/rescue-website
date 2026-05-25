const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export type Animal = {
  id: string
  name: string
  type: 'dog' | 'cat' | 'puppy' | 'kitten' | 'other'
  breed: string
  age: number
  sex: 'male' | 'female'
  status: 'available' | 'on-hold' | 'in-review' | 'adopted'
  traits?: { trait: string; id?: string }[]
  temperament?: string[]
  goodWith?: string[]
  special?: string[]
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
  temperament?: string[]
  goodWith?: string[]
  special?: string[]
  page?: number
  limit?: number
}

export async function getAnimals(query: AnimalsQuery = {}): Promise<PayloadList<Animal>> {
  const params = new URLSearchParams()
  params.set('depth', '1')

  // Use where[and][N] throughout so OR sub-groups can nest cleanly inside each condition
  let ai = 0

  // Status
  if (query.status) {
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

  // Search: name OR breed
  if (query.search) {
    params.set(`where[and][${ai}][or][0][name][like]`, query.search)
    params.set(`where[and][${ai}][or][1][breed][like]`, query.search)
    ai++
  }

  // Temperament: animal must have at least one of the selected values
  if (query.temperament?.length) {
    query.temperament.forEach((t, i) => {
      params.set(`where[and][${ai}][or][${i}][temperament][equals]`, t)
    })
    ai++
  }

  // Good with: animal must have at least one of the selected values
  if (query.goodWith?.length) {
    query.goodWith.forEach((g, i) => {
      params.set(`where[and][${ai}][or][${i}][goodWith][equals]`, g)
    })
    ai++
  }

  // Special: animal must have at least one of the selected values
  if (query.special?.length) {
    query.special.forEach((s, i) => {
      params.set(`where[and][${ai}][or][${i}][special][equals]`, s)
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
