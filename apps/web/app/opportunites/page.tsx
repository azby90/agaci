import { Suspense } from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import { Briefcase, Search } from 'lucide-react'
import { getOpportunites } from '@/lib/directus-queries'
import { OpportuniteCard } from '@/components/opportunites/opportunite-card'
import { Skeleton } from '@/components/ui/skeleton'

export const metadata: Metadata = {
  title: 'Espace Opportunités',
  description: 'Emplois, stages, ateliers et appels à projets pour la communauté gabonaise en CI.',
}

interface PageProps {
  searchParams: { type?: string; q?: string; page?: string }
}

const types = [
  { value: '', label: 'Tous' },
  { value: 'emploi', label: '💼 Emploi' },
  { value: 'stage', label: '🎓 Stage' },
  { value: 'appel_projets', label: '🚀 Appel à projets' },
  { value: 'atelier', label: '🛠 Atelier' },
  { value: 'mentorat', label: '🤝 Mentorat' },
]

async function OpportunitesContent({ searchParams }: PageProps) {
  const page = Number(searchParams.page) || 1
  const { data: opportunites, total } = await getOpportunites({
    type: searchParams.type,
    search: searchParams.q,
    page,
    limit: 10,
  })
  const totalPages = Math.ceil(total / 10)

  return (
    <div>
      {/* Filtres */}
      <div className="mb-6 space-y-4">
        <form className="flex items-center gap-2 rounded-lg border bg-white px-4 py-2.5 shadow-sm max-w-lg">
          <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <input
            name="q"
            defaultValue={searchParams.q}
            placeholder="Rechercher une opportunité..."
            className="flex-1 text-sm outline-none bg-transparent"
          />
        </form>

        <div className="flex flex-wrap gap-2">
          {types.map(({ value, label }) => (
            <a
              key={value || 'all'}
              href={value ? `/opportunites?type=${value}` : '/opportunites'}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${(searchParams.type || '') === value ? 'bg-gabon-green text-white shadow-sm' : 'bg-white border hover:bg-muted'}`}
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      <div className="mb-4 text-sm text-muted-foreground">
        {total} opportunité{total > 1 ? 's' : ''} disponible{total > 1 ? 's' : ''}
      </div>

      {opportunites.length === 0 ? (
        <div className="rounded-xl border bg-white p-12 text-center">
          <Briefcase className="mx-auto mb-3 h-10 w-10 text-muted-foreground/40" />
          <p className="font-medium">Aucune opportunité trouvée</p>
          <p className="text-sm text-muted-foreground">Revenez bientôt, de nouvelles offres sont publiées régulièrement.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {opportunites.map((opp) => (
            <OpportuniteCard key={opp.id} opportunite={opp} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <a
              key={p}
              href={`/opportunites?${new URLSearchParams({ ...searchParams, page: String(p) })}`}
              className={`h-9 w-9 flex items-center justify-center rounded-md text-sm transition-colors ${p === page ? 'bg-gabon-green text-white' : 'border bg-white hover:bg-muted'}`}
            >
              {p}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

function OpportunitesSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="rounded-xl border bg-white p-5">
          <div className="flex items-start justify-between">
            <div className="flex-1 space-y-2">
              <div className="flex gap-2">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-14 rounded-full" />
              </div>
              <Skeleton className="h-5 w-64" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
          <Skeleton className="mt-3 h-4 w-full" />
          <Skeleton className="mt-1 h-4 w-3/4" />
          <div className="mt-4 flex gap-4">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function OpportunitesPage({ searchParams }: PageProps) {
  return (
    <>
      {/* BANNIÈRE */}
      <section className="relative h-[280px] overflow-hidden bg-gabon-blue">
        <Image
          src="/evenements/10-septembre-2024/474040154_122161465106303209_8537488286221398010_n.jpg"
          alt="Membres A.GA.CI — Opportunités"
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
            <Briefcase className="h-3.5 w-3.5" />
            Opportunités
          </div>
          <h1 className="text-3xl font-bold text-white md:text-4xl">Espace Opportunités</h1>
          <p className="text-white/80 mt-3 max-w-md">
            Emplois, stages, ateliers et appels à projets pour la communauté gabonaise en CI.
          </p>
        </div>
      </section>

    <div className="py-12">
      <div className="container max-w-3xl">
        <Suspense fallback={<OpportunitesSkeleton />}>
          <OpportunitesContent searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
    </>
  )
}
