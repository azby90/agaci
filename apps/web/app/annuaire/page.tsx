import { Suspense } from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import { Users, Search } from 'lucide-react'
import { getProfilsInfluents, getSecteurs } from '@/lib/directus-queries'
import { ProfilCard } from '@/components/annuaire/profil-card'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Annuaire des personnalités',
  description: 'Découvrez le réseau des membres influents de la communauté gabonaise en Côte d\'Ivoire.',
}

interface PageProps {
  searchParams: { secteur?: string; mentorat?: string; q?: string; page?: string }
}

async function AnnuaireContent({ searchParams }: PageProps) {
  const page = Number(searchParams.page) || 1
  const mentorat = searchParams.mentorat === '1'

  const [{ data: profils, total }, secteurs] = await Promise.all([
    getProfilsInfluents({
      secteur: searchParams.secteur,
      mentorat,
      search: searchParams.q,
      page,
      limit: 12,
    }),
    getSecteurs(),
  ])

  const totalPages = Math.ceil(total / 12)

  return (
    <div>
      {/* Filtres */}
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <form className="flex items-center gap-2 rounded-lg border bg-white px-3 py-2 shadow-sm flex-1 max-w-sm">
          <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <input
            name="q"
            defaultValue={searchParams.q}
            placeholder="Rechercher un nom, titre, expertise..."
            className="flex-1 text-sm outline-none bg-transparent"
          />
        </form>

        <div className="flex flex-wrap gap-2">
          <a
            href="/annuaire"
            className={`rounded-full px-3 py-1.5 text-sm transition-colors ${!searchParams.secteur && !mentorat ? 'bg-gabon-green text-white' : 'bg-white border hover:bg-muted'}`}
          >
            Tous
          </a>
          {secteurs.map((s) => (
            <a
              key={s}
              href={`/annuaire?secteur=${encodeURIComponent(s)}`}
              className={`rounded-full px-3 py-1.5 text-sm transition-colors ${searchParams.secteur === s ? 'bg-gabon-green text-white' : 'bg-white border hover:bg-muted'}`}
            >
              {s}
            </a>
          ))}
          <a
            href={`/annuaire?mentorat=1`}
            className={`rounded-full px-3 py-1.5 text-sm transition-colors ${mentorat ? 'bg-gabon-green text-white' : 'bg-white border hover:bg-muted'}`}
          >
            ✓ Mentors disponibles
          </a>
        </div>
      </div>

      {/* Résultats */}
      <div className="mb-4 text-sm text-muted-foreground">
        {total} personnalité{total > 1 ? 's' : ''} trouvée{total > 1 ? 's' : ''}
      </div>

      {profils.length === 0 ? (
        <div className="rounded-xl border bg-white p-12 text-center">
          <Users className="mx-auto mb-3 h-10 w-10 text-muted-foreground/40" />
          <p className="font-medium">Aucun profil trouvé</p>
          <p className="text-sm text-muted-foreground">Essayez d'autres filtres de recherche.</p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {profils.map((profil) => (
            <ProfilCard key={profil.id} profil={profil} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <a
              key={p}
              href={`/annuaire?${new URLSearchParams({ ...searchParams, page: String(p) })}`}
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

function AnnuaireSkeleton() {
  return (
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
          <Skeleton className="h-3 w-full mb-2" />
          <Skeleton className="h-3 w-4/5" />
        </div>
      ))}
    </div>
  )
}

export default function AnnuairePage({ searchParams }: PageProps) {
  return (
    <>
      {/* BANNIÈRE */}
      <section className="relative h-[280px] overflow-hidden bg-gabon-blue">
        <Image
          src="/evenements/10-septembre-2024/473729648_122161464698303209_6768768865968420815_n.jpg"
          alt="Membres A.GA.CI — Annuaire"
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
            <Users className="h-3.5 w-3.5" />
            Annuaire
          </div>
          <h1 className="text-3xl font-bold text-white md:text-4xl">Annuaire des personnalités</h1>
          <p className="text-white/80 mt-3 max-w-md">
            Découvrez le capital humain de la communauté gabonaise en Côte d&apos;Ivoire.
          </p>
        </div>
      </section>

    <div className="py-12">
      <div className="container">
        <div className="mb-6 text-right">
          <a
            href="/membres/profil/candidature-annuaire"
            className="text-sm font-medium text-gabon-green hover:underline"
          >
            Vous souhaitez figurer dans l&apos;annuaire ? →
          </a>
        </div>

        <Suspense fallback={<AnnuaireSkeleton />}>
          <AnnuaireContent searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
    </>
  )
}
