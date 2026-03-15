import { Skeleton } from '@/components/ui/skeleton'

export default function AnnuaireLoading() {
  return (
    <div className="py-12">
      <div className="container">
        <div className="mb-10 text-center">
          <Skeleton className="mx-auto mb-4 h-14 w-14 rounded-full" />
          <Skeleton className="mx-auto mb-3 h-9 w-72" />
          <Skeleton className="mx-auto h-5 w-96" />
        </div>
        <div className="mb-8 flex gap-3">
          <Skeleton className="h-10 flex-1 max-w-sm rounded-lg" />
          <div className="flex gap-2">
            {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-9 w-20 rounded-full" />)}
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-xl border bg-white p-6">
              <div className="mb-4 flex gap-4">
                <Skeleton className="h-14 w-14 rounded-full flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
              </div>
              <Skeleton className="mb-1.5 h-3 w-full" />
              <Skeleton className="h-3 w-4/5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
