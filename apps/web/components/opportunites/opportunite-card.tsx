import Link from 'next/link'
import { MapPin, Calendar, ExternalLink, Clock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'
import type { Opportunite } from '@/lib/directus-queries'

const typeConfig = {
  emploi: { label: 'Emploi', variant: 'info' as const },
  stage: { label: 'Stage', variant: 'success' as const },
  appel_projets: { label: 'Appel à projets', variant: 'orange' as const },
  atelier: { label: 'Atelier', variant: 'warning' as const },
  mentorat: { label: 'Mentorat', variant: 'secondary' as const },
}

function isExpiringSoon(dateLimite: string): boolean {
  const diff = new Date(dateLimite).getTime() - Date.now()
  return diff > 0 && diff < 7 * 24 * 60 * 60 * 1000
}

function isNew(dateCreated: string): boolean {
  return Date.now() - new Date(dateCreated).getTime() < 3 * 24 * 60 * 60 * 1000
}

interface OpportuniteCardProps {
  opportunite: Opportunite
}

export function OpportuniteCard({ opportunite: opp }: OpportuniteCardProps) {
  const config = typeConfig[opp.type] || { label: opp.type, variant: 'default' as const }
  const expiringSoon = opp.date_limite && isExpiringSoon(opp.date_limite)
  const recent = isNew(opp.date_created)

  return (
    <Link
      href={`/opportunites/${opp.id}`}
      className="group block rounded-xl border bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Badge variant={config.variant}>{config.label}</Badge>
            {recent && <Badge variant="success" className="text-[10px]">✦ Nouveau</Badge>}
            {expiringSoon && (
              <Badge variant="warning" className="text-[10px]">
                <Clock className="mr-1 h-2.5 w-2.5" />
                Expire bientôt
              </Badge>
            )}
          </div>
          <h3 className="font-semibold leading-tight group-hover:text-gabon-green transition-colors line-clamp-2">
            {opp.titre}
          </h3>
          {opp.entreprise && (
            <p className="mt-1 text-sm font-medium text-muted-foreground">{opp.entreprise}</p>
          )}
        </div>
        <ExternalLink className="h-4 w-4 flex-shrink-0 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
      </div>

      {opp.description && (
        <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{opp.description}</p>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
        {opp.localisation && (
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {opp.localisation}
          </span>
        )}
        {opp.date_limite && (
          <span className={`flex items-center gap-1 ${expiringSoon ? 'text-amber-600 font-medium' : ''}`}>
            <Calendar className="h-3 w-3" />
            Limite : {formatDate(opp.date_limite)}
          </span>
        )}
        <span className="ml-auto">Publié le {formatDate(opp.date_created)}</span>
      </div>
    </Link>
  )
}
