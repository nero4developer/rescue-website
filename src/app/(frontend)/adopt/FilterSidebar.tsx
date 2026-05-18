export default function FilterSidebar({ onClear }: { onClear: () => void }) {
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
        ].map((o) => <CheckItem key={o.value} label={o.label} />)}
      </FilterGroup>

      <FilterGroup title="Temperament">
        {['Calm & gentle', 'Playful & energetic', 'Shy, needs patience', 'Social butterfly', 'Independent'].map((l) => (
          <CheckItem key={l} label={l} />
        ))}
      </FilterGroup>

      <FilterGroup title="Good with">
        {['Children', 'Other dogs', 'Cats', 'First-time owners'].map((l) => (
          <CheckItem key={l} label={l} />
        ))}
      </FilterGroup>

      <FilterGroup title="Special">
        {['Urgent cases', 'Lovely little quirks', 'Senior animals'].map((l) => (
          <CheckItem key={l} label={l} />
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

function CheckItem({ label }: { label: string }) {
  return (
    <label className="flex items-center gap-[10px] cursor-pointer text-[14px] text-text-body">
      <input type="checkbox" className="w-4 h-4 accent-amber cursor-pointer" aria-label={label} />
      {label}
    </label>
  )
}
