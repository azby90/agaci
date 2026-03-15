import { Suspense } from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import { Newspaper } from 'lucide-react'
import { getArticles } from '@/lib/directus-queries'
import { ArticleCard } from '@/components/actualites/article-card'
import { Skeleton } from '@/components/ui/skeleton'

export const metadata: Metadata = {
  title: 'Actualités',
  description: "Les dernières nouvelles de la communauté gabonaise en Côte d'Ivoire.",
}

interface PageProps {
  searchParams: { categorie?: string; page?: string }
}

const categories = [
  { value: '', label: 'Toutes' },
  { value: 'communaute', label: '🤝 Communauté' },
  { value: 'institutionnel', label: '🏛 Institutionnel' },
  { value: 'partenariat', label: '🌐 Partenariat' },
]

async function ActualitesContent({ searchParams }: PageProps) {
  const page = Number(searchParams.page) || 1
  const { data: articles, total } = await getArticles({
    categorie: searchParams.categorie,
    page,
    limit: 9,
  })
  const totalPages = Math.ceil(total / 9)
  const [featured, ...rest] = articles
  const showFeatured = page === 1 && !searchParams.categorie

  if (articles.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-12 text-center">
        <Newspaper className="mx-auto mb-3 h-10 w-10 text-muted-foreground/40" />
        <p className="font-medium">Aucun article disponible</p>
        <p className="text-sm text-muted-foreground">Revenez prochainement.</p>
      </div>
    )
  }

  return (
    <div>
      {showFeatured && featured && (
        <div className="mb-6">
          <ArticleCard article={featured} featured />
        </div>
      )}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {(showFeatured ? rest : articles).map((a) => (
          <ArticleCard key={a.id} article={a} />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="mt-10 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <a key={p}
              href={`/actualites?${new URLSearchParams({ ...searchParams, page: String(p) })}`}
              className={`h-9 w-9 flex items-center justify-center rounded-md text-sm transition-colors ${p === page ? 'bg-gabon-green text-white' : 'border bg-white hover:bg-muted'}`}>
              {p}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

function Skeleton6() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-xl border bg-white overflow-hidden">
          <Skeleton className="h-40 w-full rounded-none" />
          <div className="p-4 space-y-2">
            <Skeleton className="h-4 w-20 rounded-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function ActualitesPage({ searchParams }: PageProps) {
  return (
    <>
      {/* BANNIÈRE */}
      <section className="relative h-[280px] overflow-hidden bg-gabon-blue">
        <Image
          src="/evenements/10-mars-2025/482016900_122170060946303209_917048036729286606_n.jpg"
          alt="Retrouvailles de l'Unité A.GA.CI 2025"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gabon-blue/95 via-gabon-blue/85 to-gabon-blue/50" />
        <div className="absolute inset-0 pattern-dots opacity-20" />
        <div className="absolute left-0 top-0 bottom-0 w-1.5 flex flex-col">
          <div className="flex-1 bg-gabon-green" />
          <div className="flex-1 bg-gabon-yellow" />
          <div className="flex-1 bg-[#003189]" />
        </div>
        <div className="container relative h-full flex flex-col justify-center pl-8">
          <div className="inline-flex items-center gap-2 bg-gabon-yellow/20 border border-gabon-yellow/30 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-gabon-yellow mb-4">
            <Newspaper className="h-3.5 w-3.5" />
            Actualités
          </div>
          <h1 className="text-3xl font-bold text-white md:text-4xl">Actualités A.GA.CI</h1>
          <p className="text-white/80 mt-3 max-w-md">
            Les dernières nouvelles de la communauté gabonaise en Côte d&apos;Ivoire.
          </p>
        </div>
      </section>

    <div className="py-12">
      <div className="container">
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {categories.map(({ value, label }) => (
            <a key={value || 'all'}
              href={value ? `/actualites?categorie=${value}` : '/actualites'}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors
                ${(searchParams.categorie || '') === value ? 'bg-gabon-green text-white' : 'bg-white border hover:bg-muted'}`}>
              {label}
            </a>
          ))}
        </div>
        <Suspense fallback={<Skeleton6 />}>
          <ActualitesContent searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
    </>
  )
}
