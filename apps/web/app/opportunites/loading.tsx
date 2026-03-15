import { Skeleton } from '@/components/ui/skeleton'

export default function OpportunitesLoading() {
  return (
    <div className="py-12">
      <div className="container max-w-3xl">
        <div className="mb-10 text-center">
          <Skeleton className="mx-auto mb-4 h-14 w-14 rounded-full" />
          <Skeleton className="mx-auto mb-3 h-9 w-64" />
          <Skeleton className="mx-auto h-5 w-80" />
        </div>
        <div className="mb-6 space-y-4">
          <Skeleton className="h-10 max-w-lg rounded-lg" />
          <div className="flex gap-2">
            {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-9 w-24 rounded-full" />)}
          </div>
        </div>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="rounded-xl border bg-white p-5">
              <div className="flex gap-2 mb-2">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-14 rounded-full" />
              </div>
              <Skeleton className="mb-1.5 h-5 w-64" />
              <Skeleton className="mb-3 h-4 w-32" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="mt-1 h-4 w-3/4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
