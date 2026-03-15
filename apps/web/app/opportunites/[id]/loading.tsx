import { Skeleton } from '@/components/ui/skeleton'

export default function OpportuniteLoading() {
  return (
    <div className="py-12">
      <div className="container max-w-3xl">
        <Skeleton className="mb-4 h-6 w-24 rounded-full" />
        <Skeleton className="mb-3 h-9 w-3/4" />
        <div className="mb-6 flex gap-3">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-28" />
        </div>
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
        <Skeleton className="mt-8 h-11 w-40 rounded-lg" />
      </div>
    </div>
  )
}
