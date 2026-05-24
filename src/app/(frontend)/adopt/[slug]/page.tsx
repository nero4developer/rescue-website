import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getAnimalBySlug, getAllAnimalSlugs } from '@/lib/payload-server'

export async function generateStaticParams() {
  const slugs = await getAllAnimalSlugs().catch(() => [])
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const animal = await getAnimalBySlug(slug).catch(() => null)
  if (!animal) return {}
  return {
    title: `${animal.name} — Animal SOS Adoptions`,
    description: `${animal.name} is a ${animal.breed} looking for a forever home. Apply to adopt today.`,
  }
}

export default async function AnimalDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const animal = await getAnimalBySlug(slug).catch(() => null)
  if (!animal) notFound()

  const { name, breed, age, sex, status, traits, photo, description } = animal

  const ageLabel = age < 12
    ? `${age} month${age === 1 ? '' : 's'}`
    : `${Math.floor(age / 12)} year${Math.floor(age / 12) === 1 ? '' : 's'}`

  const statusColour: Record<string, string> = {
    available: 'bg-[#EAF3DE] text-[#27500A]',
    'on-hold': 'bg-amber-pale text-clay',
    'in-review': 'bg-[#FDF3E3] text-[#633806]',
    adopted: 'bg-cream text-text-muted',
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <nav className="text-[13px] text-text-muted mb-8 flex items-center gap-2">
        <Link href="/adopt" className="hover:text-amber transition-colors">← All animals</Link>
        <span>/</span>
        <span className="text-text-body">{name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="relative aspect-square rounded-[24px] overflow-hidden bg-cream flex items-center justify-center text-[120px]">
          {photo?.url ? (
            <Image src={photo.url} alt={photo.alt || name} fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 50vw" />
          ) : (
            <span>{animal.type === 'cat' ? '🐈' : '🐕'}</span>
          )}
        </div>

        <div>
          <span className={`inline-block text-[12px] font-medium px-3 py-1 rounded-full mb-4 ${statusColour[status] ?? 'bg-cream text-text-muted'}`}>
            {status === 'available' ? '✓ Available for adoption' : status.replace('-', ' ')}
          </span>

          <h1 className="font-display text-[48px] font-black text-warm-dark leading-none tracking-[-1.5px] mb-2">{name}</h1>
          <p className="text-[16px] text-text-muted mb-8">{breed}</p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            {(
              [
                { label: 'Age', value: ageLabel },
                { label: 'Sex', value: sex === 'male' ? '♂ Male' : '♀ Female' },
                { label: 'Type', value: String(animal.type.charAt(0).toUpperCase() + animal.type.slice(1)) },
                { label: 'Status', value: String(status.replace('-', ' ')) },
              ] satisfies Array<{ label: string; value: string }>
            ).map(({ label, value }) => (
              <div key={label} className="bg-cream rounded-[14px] px-5 py-4">
                <div className="text-[11px] uppercase tracking-[1px] text-text-muted mb-1">{label}</div>
                <div className="text-[15px] font-medium text-warm-dark capitalize">{value}</div>
              </div>
            ))}
          </div>

          {traits && traits.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {traits.map((t) => (
                <span key={t.trait} className="text-[13px] px-[14px] py-1.5 rounded-full bg-amber-pale text-clay border border-amber/20">
                  {t.trait}
                </span>
              ))}
            </div>
          )}

          {Boolean(description) && (
            <div
              className="text-[15px] leading-[1.75] text-text-body mb-8 prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: richTextToHtml(description) }}
            />
          )}

          <div className="flex gap-3">
            {status === 'available' ? (
              <Link
                href={`/adopt/apply?animal=${slug}`}
                className="flex-1 text-center bg-amber text-warm-dark font-medium px-6 py-4 rounded-full hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(212,131,42,0.35)] transition-all"
              >
                Apply to adopt {name} ♡
              </Link>
            ) : (
              <div className="flex-1 text-center bg-cream text-text-muted font-medium px-6 py-4 rounded-full border border-border">
                Currently {status.replace('-', ' ')}
              </div>
            )}
            <Link href="/contact" className="px-6 py-4 border border-border rounded-full text-text-muted hover:border-text-body hover:text-text-body transition-colors">
              Ask a question
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function richTextToHtml(content: unknown): string {
  if (!content || typeof content !== 'object') return ''
  const root = (content as { root?: { children?: unknown[] } }).root
  if (!root?.children) return ''

  return root.children
    .map((node: unknown) => {
      const n = node as { type?: string; children?: unknown[]; text?: string; format?: number }
      if (n.type === 'paragraph') {
        const inner = (n.children ?? [])
          .map((c: unknown) => {
            const child = c as { text?: string; format?: number }
            let t = child.text ?? ''
            if (child.format && child.format & 1) t = `<strong>${t}</strong>`
            if (child.format && child.format & 2) t = `<em>${t}</em>`
            return t
          })
          .join('')
        return `<p>${inner}</p>`
      }
      return ''
    })
    .join('')
}
