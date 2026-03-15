import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, MapPin, Calendar, ExternalLink, Building2, User, Clock } from 'lucide-react'
import { getOpportuniteById } from '@/lib/directus-queries'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { formatDate } from '@/lib/utils'

const typeConfig = {
  emploi: { label: 'Emploi', variant: 'info' as const },
  stage: { label: 'Stage', variant: 'success' as const },
  appel_projets: { label: 'Appel à projets', variant: 'orange' as const },
  atelier: { label: 'Atelier', variant: 'warning' as const },
  mentorat: { label: 'Mentorat', variant: 'secondary' as const },
}

interface PageProps { params: { id: string } }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const opp = await getOpportuniteById(params.id)
  if (!opp) return { title: 'Opportunité introuvable' }
  return {
    title: `${opp.titre} — Opportunités AGACI`,
    description: opp.description?.slice(0, 160),
  }
}

function isExpiringSoon(dateLimite: string): boolean {
  const diff = new Date(dateLimite).getTime() - Date.now()
  return diff > 0 && diff < 7 * 24 * 60 * 60 * 1000
}

function isExpired(dateLimite: string): boolean {
  return new Date(dateLimite).getTime() < Date.now()
}

export default async function OpportuniteDetailPage({ params }: PageProps) {
  const opp = await getOpportuniteById(params.id)
  if (!opp) notFound()

  const config = typeConfig[opp.type] || { label: opp.type, variant: 'default' as const }
  const expired = opp.date_limite && isExpired(opp.date_limite)
  const expiringSoon = opp.date_limite && !expired && isExpiringSoon(opp.date_limite)

  return (
    <div className="py-10">
      <div className="container max-w-3xl">
        {/* Retour */}
        <Link href="/opportunites" className="mb-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Retour aux opportunités
        </Link>

        <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
          {/* Header */}
          <div className="border-b bg-gradient-to-r from-gabon-blue/5 to-gabon-green/5 p-6">
            <div className="mb-3 flex flex-wrap gap-2">
              <Badge variant={config.variant}>{config.label}</Badge>
              {expired && <Badge variant="destructive">Expirée</Badge>}
              {expiringSoon && (
                <Badge variant="warning">
                  <Clock className="mr-1 h-3 w-3" />
                  Expire bientôt
                </Badge>
              )}
            </div>
            <h1 className="text-2xl font-bold leading-tight">{opp.titre}</h1>
            {opp.entreprise && (
              <div className="mt-2 flex items-center gap-2 text-muted-foreground">
                <Building2 className="h-4 w-4" />
                <span className="font-medium">{opp.entreprise}</span>
              </div>
            )}
          </div>

          {/* Métadonnées */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 border-b bg-muted/30 px-6 py-3 text-sm text-muted-foreground">
            {opp.localisation && (
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                {opp.localisation}
              </span>
            )}
            {opp.date_limite && (
              <span className={`flex items-center gap-1.5 ${expiringSoon ? 'font-medium text-amber-600' : ''} ${expired ? 'line-through' : ''}`}>
                <Calendar className="h-3.5 w-3.5" />
                Date limite : {formatDate(opp.date_limite)}
              </span>
            )}
            <span className="flex items-center gap-1.5 ml-auto">
              Publié le {formatDate(opp.date_created)}
              {opp.publie_par && ` par ${opp.publie_par.prenom} ${opp.publie_par.nom}`}
            </span>
          </div>

          {/* Corps */}
          <div className="p-6 space-y-6">
            <div>
              <h2 className="mb-3 font-semibold">Description</h2>
              <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {opp.description}
              </div>
            </div>

            <Separator />

            {/* CTA */}
            <div className="flex flex-col items-center gap-3 sm:flex-row">
              {opp.lien_candidature && !expired ? (
                <Button size="lg" asChild className="w-full sm:w-auto">
                  <a href={opp.lien_candidature} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Postuler maintenant
                  </a>
                </Button>
              ) : expired ? (
                <p className="text-sm text-muted-foreground italic">Cette opportunité a expiré.</p>
              ) : null}

              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
                onClick={undefined}
                asChild
              >
                <button
                  type="button"
                  onClick={() => navigator.clipboard?.writeText(window.location.href)}
                >
                  Copier le lien
                </button>
              </Button>
            </div>
          </div>
        </div>

        {/* Voir plus */}
        <div className="mt-6 text-center">
          <Link href="/opportunites" className="text-sm text-muted-foreground hover:text-foreground">
            ← Voir toutes les opportunités
          </Link>
        </div>
      </div>
    </div>
  )
}
