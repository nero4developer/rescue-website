export default function SkeletonCard() {
  return (
    <div className="bg-off-white border border-border rounded-[20px] overflow-hidden animate-pulse">
      <div className="h-[200px] bg-cream" />
      <div className="p-5 flex flex-col gap-3">
        <div className="h-5 bg-cream rounded-full w-2/3" />
        <div className="h-4 bg-cream rounded-full w-1/2" />
        <div className="flex gap-2">
          <div className="h-6 bg-cream rounded-full w-16" />
          <div className="h-6 bg-cream rounded-full w-16" />
        </div>
      </div>
    </div>
  )
}
