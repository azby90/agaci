import { Suspense } from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import { CalendarDays } from 'lucide-react'
import { getEvenements } from '@/lib/directus-queries'
import { EvenementCard } from '@/components/evenements/evenement-card'
import { Skeleton } from '@/components/ui/skeleton'

export const metadata: Metadata = {
  title: 'Événements',
  description: "Agenda des événements de l'AGACI — réunions, cérémonies et ateliers.",
}

interface PageProps {
  searchParams: { type?: string; archive?: string }
}

const types = [
  { value: '', label: 'Tous' },
  { value: 'reunion', label: '🗣 Réunions' },
  { value: 'ceremonie', label: '🎖 Cérémonies' },
  { value: 'atelier', label: '🛠 Ateliers' },
  { value: 'autre', label: '📌 Autres' },
]

async function EvenementsContent({ searchParams }: PageProps) {
  const archive = searchParams.archive === '1'
  const { data: evenements } = await getEvenements({
    type: searchParams.type,
    a_venir: !archive,
    limit: 20,
  })

  if (evenements.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-12 text-center">
        <CalendarDays className="mx-auto mb-3 h-10 w-10 text-muted-foreground/40" />
        <p className="font-medium">Aucun événement {archive ? 'passé' : 'à venir'}</p>
        <p className="text-sm text-muted-foreground">
          {archive ? 'Aucun historique disponible.' : 'Revenez bientôt pour les prochains événements.'}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {evenements.map((ev) => <EvenementCard key={ev.id} evenement={ev} />)}
    </div>
  )
}

function EvenementsSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex gap-4 rounded-xl border bg-white p-4">
          <Skeleton className="h-14 w-14 flex-shrink-0 rounded-lg" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-16 rounded-full" />
            <Skeleton className="h-5 w-56" />
            <div className="flex gap-4">
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function EvenementsPage({ searchParams }: PageProps) {
  const archive = searchParams.archive === '1'
  const typeParam = searchParams.type ? `&type=${searchParams.type}` : ''

  return (
    <>
      {/* BANNIÈRE */}
      <section className="relative h-[280px] overflow-hidden bg-gabon-blue">
        <Image
          src="/evenements/10-septembre-2024/473788972_122161464554303209_8494411412001588456_n.jpg"
          alt="Événements A.GA.CI — Abidjan"
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
            <CalendarDays className="h-3.5 w-3.5" />
            Agenda
          </div>
          <h1 className="text-3xl font-bold text-white md:text-4xl">Événements A.GA.CI</h1>
          <p className="text-white/80 mt-3 max-w-md">
            Réunions, cérémonies, ateliers — restez connectés à la vie de la communauté.
          </p>
        </div>
      </section>

    <div className="py-12">
      <div className="container max-w-3xl">

        <div className="mb-6 space-y-3">
          <div className="flex flex-wrap gap-2">
            {types.map(({ value, label }) => (
              <a key={value || 'all'}
                href={value ? `/evenements?type=${value}${archive ? '&archive=1' : ''}` : `/evenements${archive ? '?archive=1' : ''}`}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors
                  ${(searchParams.type || '') === value ? 'bg-ci-orange text-white' : 'bg-white border hover:bg-muted'}`}>
                {label}
              </a>
            ))}
          </div>
          <div className="flex gap-4 text-sm">
            <a href={`/evenements${typeParam ? `?${typeParam.slice(1)}` : ''}`}
              className={`font-medium ${!archive ? 'text-gabon-green' : 'text-muted-foreground hover:text-foreground'}`}>
              À venir
            </a>
            <span className="text-muted-foreground">·</span>
            <a href={`/evenements?archive=1${typeParam}`}
              className={`font-medium ${archive ? 'text-gabon-green' : 'text-muted-foreground hover:text-foreground'}`}>
              Événements passés
            </a>
          </div>
        </div>

        <Suspense fallback={<EvenementsSkeleton />}>
          <EvenementsContent searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
    </>
  )
}
