import { Skeleton } from '@/components/ui/skeleton'

export default function ArticleLoading() {
  return (
    <div className="py-12">
      <div className="container max-w-3xl">
        <Skeleton className="mb-4 h-6 w-24 rounded-full" />
        <Skeleton className="mb-4 h-10 w-4/5" />
        <Skeleton className="mb-2 h-4 w-full" />
        <div className="mb-8 flex items-center gap-4">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="mb-8 h-64 w-full rounded-xl" />
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </div>
  )
}
