import { Skeleton } from '@/components/ui/skeleton'

export default function EvenementLoading() {
  return (
    <div className="py-12">
      <div className="container max-w-3xl">
        <Skeleton className="mb-4 h-6 w-24 rounded-full" />
        <Skeleton className="mb-3 h-9 w-3/4" />
        <div className="mb-6 flex gap-4">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-5 w-28" />
        </div>
        <Skeleton className="mb-8 h-56 w-full rounded-xl" />
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        <Skeleton className="mt-8 h-11 w-48 rounded-lg" />
      </div>
    </div>
  )
}
