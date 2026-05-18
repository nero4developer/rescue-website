import Image from 'next/image'
import Link from 'next/link'
import type { Animal } from '@/lib/payload'

function ageLabel(months: number): string {
  if (months < 12) return `${months}${months === 1 ? ' month' : ' months'}`
  const y = Math.floor(months / 12)
  return `${y}${y === 1 ? ' year' : ' years'}`
}

export default function AnimalCard({ animal }: { animal: Animal }) {
  const { name, breed, age, sex, status, traits, photo, slug } = animal

  return (
    <Link href={`/adopt/${slug}`} className="block group">
    <article className="bg-off-white border border-border rounded-[20px] overflow-hidden transition-all duration-250 group-hover:-translate-y-[5px] group-hover:border-amber/40 group-hover:shadow-[0_16px_40px_rgba(28,21,16,0.08)]">
      <div className="relative h-[200px] bg-cream flex items-center justify-center text-[90px]">
        {photo?.url ? (
          <Image
            src={photo.url}
            alt={photo.alt || name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <span>{animal.type === 'cat' ? '🐈' : '🐕'}</span>
        )}
        <StatusBadge status={status} />
      </div>
      <div className="p-[18px_20px_20px]">
        <div className="font-display text-[20px] font-bold text-warm-dark mb-1">{name}</div>
        <div className="text-[13px] text-text-muted mb-3">{breed}</div>
        <div className="flex flex-wrap gap-[6px] mb-4">
          {traits?.slice(0, 3).map((t) => (
            <span key={t.trait} className="text-[11px] px-[10px] py-1 rounded-full bg-cream text-text-muted border border-border">
              {t.trait}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between pt-[14px] border-t border-border">
          <div className="text-[13px] text-text-muted">
            🕐 {ageLabel(age)} · {sex === 'male' ? '♂ Male' : '♀ Female'}
          </div>
        </div>
      </div>
    </article>
    </Link>
  )
}

function StatusBadge({ status }: { status: Animal['status'] }) {
  const map: Record<Animal['status'], { label: string; className: string }> = {
    available: { label: '✓ Available', className: 'bg-[#EAF3DE] text-[#27500A]' },
    'on-hold': { label: 'On hold', className: 'bg-amber-pale text-clay' },
    'in-review': { label: 'In review', className: 'bg-[#FDF3E3] text-[#633806]' },
    adopted: { label: 'Adopted ♡', className: 'bg-cream text-text-muted' },
  }
  const { label, className } = map[status]
  return (
    <span className={`absolute top-[14px] left-[14px] text-[10px] font-medium px-[11px] py-1 rounded-full tracking-[0.3px] ${className}`}>
      {label}
    </span>
  )
}
