import Image from 'next/image'

type Story = {
  id: string
  adopterFirstName: string
  animalName: string
  country: string
  quote: string
  photo?: { url: string; alt: string }
  featured?: boolean
}

export default function StoryCard({ story }: { story: Story }) {
  return (
    <article className="bg-cream border border-border rounded-[24px] overflow-hidden flex flex-col">
      <div className="relative h-[220px] bg-off-white">
        {story.photo?.url ? (
          <Image
            src={story.photo.url}
            alt={story.photo.alt || `${story.animalName} with ${story.adopterFirstName}`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[72px]">🐾</div>
        )}
        {story.featured && (
          <div className="absolute top-4 left-4 bg-amber text-warm-dark text-[11px] font-medium px-3 py-1 rounded-full">
            Featured story
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <blockquote className="text-[15px] text-text-body leading-[1.75] mb-5 flex-1">
          &ldquo;{story.quote}&rdquo;
        </blockquote>
        <div className="border-t border-border pt-4">
          <div className="text-[14px] font-medium text-warm-dark">{story.adopterFirstName} & {story.animalName}</div>
          <div className="text-[12px] text-text-muted mt-0.5">{story.country}</div>
        </div>
      </div>
    </article>
  )
}
