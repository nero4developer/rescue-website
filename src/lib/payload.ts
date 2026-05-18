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
  page?: number
  limit?: number
}

export async function getAnimals(query: AnimalsQuery = {}): Promise<PayloadList<Animal>> {
  const params = new URLSearchParams()
  params.set('depth', '1')

  if (query.status) {
    params.set('where[status][equals]', query.status)
  } else {
    params.set('where[status][not_equals]', 'adopted')
  }
  if (query.type) params.set('where[type][equals]', query.type)
  if (query.sex) params.set('where[sex][equals]', query.sex)
  if (query.search) {
    params.set('where[or][0][name][like]', query.search)
    params.set('where[or][1][breed][like]', query.search)
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
