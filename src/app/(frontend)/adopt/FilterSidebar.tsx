'use client'

interface Props {
  activeType: string
  onTypeChange: (value: string) => void
  activeTraits: string[]
  onTraitToggle: (value: string) => void
  activeSpecial: string[]
  onSpecialToggle: (value: string) => void
  onClear: () => void
}

export default function FilterSidebar({
  activeType,
  onTypeChange,
  activeTraits,
  onTraitToggle,
  activeSpecial,
  onSpecialToggle,
  onClear,
}: Props) {
  return (
    <aside
      aria-label="Filter animals"
      className="hidden lg:block w-[260px] shrink-0 bg-off-white border-r border-border px-7 py-8 sticky top-[130px] self-start max-h-[calc(100vh-130px)] overflow-y-auto"
    >
      <FilterGroup title="Type">
        {[
          { label: 'Dogs', value: 'dog' },
          { label: 'Cats', value: 'cat' },
          { label: 'Puppies', value: 'puppy' },
          { label: 'Kittens', value: 'kitten' },
        ].map((o) => (
          <CheckItem
            key={o.value}
            label={o.label}
            checked={activeType === o.value}
            onChange={() => onTypeChange(activeType === o.value ? '' : o.value)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Temperament">
        {[
          { label: 'Calm & gentle', value: 'calm' },
          { label: 'Playful & energetic', value: 'playful' },
          { label: 'Shy, needs patience', value: 'shy' },
          { label: 'Social butterfly', value: 'social' },
          { label: 'Independent', value: 'independent' },
        ].map((o) => (
          <CheckItem
            key={o.value}
            label={o.label}
            checked={activeTraits.includes(o.value)}
            onChange={() => onTraitToggle(o.value)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Good with">
        {[
          { label: 'Children', value: 'children' },
          { label: 'Other dogs', value: 'dogs' },
          { label: 'Cats', value: 'cat-friendly' },
          { label: 'First-time owners', value: 'first-time' },
        ].map((o) => (
          <CheckItem
            key={o.value}
            label={o.label}
            checked={activeTraits.includes(o.value)}
            onChange={() => onTraitToggle(o.value)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Special">
        {[
          { label: 'Urgent cases', value: 'urgent' },
          { label: 'Lovely little quirks', value: 'quirky' },
          { label: 'Senior animals', value: 'senior' },
        ].map((o) => (
          <CheckItem
            key={o.value}
            label={o.label}
            checked={activeSpecial.includes(o.value)}
            onChange={() => onSpecialToggle(o.value)}
          />
        ))}
      </FilterGroup>

      <button
        onClick={onClear}
        aria-label="Clear all filters"
        className="w-full mt-2 py-[10px] border border-border rounded-full text-[13px] text-text-muted hover:border-clay hover:text-clay transition-colors"
      >
        Clear all filters
      </button>
    </aside>
  )
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <div className="text-[11px] font-medium uppercase tracking-[1.5px] text-text-muted mb-4">{title}</div>
      <div className="flex flex-col gap-[10px]">{children}</div>
    </div>
  )
}

function CheckItem({
  label,
  checked = false,
  onChange,
}: {
  label: string
  checked?: boolean
  onChange?: () => void
}) {
  return (
    <label className="flex items-center gap-[10px] cursor-pointer text-[14px] text-text-body">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange ?? (() => {})}
        className="w-4 h-4 accent-amber cursor-pointer"
        aria-label={label}
      />
      {label}
    </label>
  )
}
