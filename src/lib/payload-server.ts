import { getPayload } from 'payload'
import type { Where } from 'payload'
import config from '@payload-config'
import type { Animal, AnimalsQuery, Story } from './payload'

type PayloadList<T> = {
  docs: T[]
  totalDocs: number
  totalPages: number
  page: number
  hasPrevPage: boolean
  hasNextPage: boolean
}

async function client() {
  return getPayload({ config })
}

export async function getAnimals(query: AnimalsQuery = {}): Promise<PayloadList<Animal>> {
  const payload = await client()

  const where: Where = {}
  if (query.status) {
    where.status = { equals: query.status }
  } else {
    where.status = { not_equals: 'adopted' }
  }
  if (query.type) where.type = { equals: query.type }
  if (query.sex) where.sex = { equals: query.sex }
  if (query.search) {
    where.or = [{ name: { like: query.search } }, { breed: { like: query.search } }]
  }

  const result = await payload.find({
    collection: 'animals',
    where,
    page: query.page,
    limit: query.limit ?? 12,
    depth: 1,
  })

  return result as unknown as PayloadList<Animal>
}

export async function getAnimalBySlug(slug: string): Promise<Animal | null> {
  const payload = await client()

  const result = await payload.find({
    collection: 'animals',
    where: { slug: { equals: slug } },
    depth: 1,
    limit: 1,
  })

  return (result.docs[0] as unknown as Animal) ?? null
}

export async function getAllAnimalSlugs(): Promise<string[]> {
  const payload = await client()

  const result = await payload.find({
    collection: 'animals',
    limit: 200,
    depth: 0,
  })

  return result.docs.map((a) => (a as unknown as Animal).slug).filter(Boolean)
}

export async function getSuccessStories(featuredOnly = false): Promise<Story[]> {
  const payload = await client()

  const where: Where = {}
  if (featuredOnly) where.featured = { equals: true }

  const result = await payload.find({
    collection: 'success-stories',
    where,
    depth: 1,
    limit: 50,
    sort: '-publishedDate',
  })

  return result.docs as unknown as Story[]
}
