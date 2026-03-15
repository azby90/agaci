import Link from 'next/link'
import { MapPin, Clock, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { Evenement } from '@/lib/directus-queries'

const typeConfig = {
  reunion: { label: 'Réunion', variant: 'info' as const },
  ceremonie: { label: 'Cérémonie', variant: 'orange' as const },
  atelier: { label: 'Atelier', variant: 'warning' as const },
  autre: { label: 'Événement', variant: 'default' as const },
}

function isToday(d: string) {
  return new Date(d).toDateString() === new Date().toDateString()
}
function isPast(d: string) {
  return new Date(d) < new Date()
}

export function EvenementCard({ evenement: ev }: { evenement: Evenement }) {
  const config = typeConfig[ev.type] ?? typeConfig.autre
  const past = isPast(ev.date_debut)
  const today = isToday(ev.date_debut)
  const dateDebut = new Date(ev.date_debut)

  return (
    <Link href={`/evenements/${ev.id}`}
      className={`group flex gap-4 rounded-xl border bg-white p-4 shadow-sm transition-all hover:shadow-md ${past ? 'opacity-70' : 'hover:-translate-y-0.5'}`}>
      {/* Bloc date */}
      <div className={`flex h-14 w-14 flex-shrink-0 flex-col items-center justify-center rounded-lg text-center
        ${today ? 'bg-gabon-green text-white' : past ? 'bg-muted text-muted-foreground' : 'bg-gabon-blue/10 text-gabon-blue'}`}>
        <span className="text-lg font-bold leading-none">{dateDebut.getDate()}</span>
        <span className="text-[10px] uppercase tracking-wide">
          {dateDebut.toLocaleDateString('fr-FR', { month: 'short' })}
        </span>
      </div>
      {/* Contenu */}
      <div className="flex-1 min-w-0">
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <Badge variant={config.variant} className="text-[10px]">{config.label}</Badge>
          {today && <Badge variant="success" className="text-[10px]">Aujourd&apos;hui !</Badge>}
          {past && <span className="text-[10px] text-muted-foreground italic">Passé</span>}
        </div>
        <h3 className="font-semibold leading-tight line-clamp-1 group-hover:text-gabon-green transition-colors">
          {ev.titre}
        </h3>
        <div className="mt-1.5 flex flex-wrap gap-3 text-xs text-muted-foreground">
          {ev.lieu && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{ev.lieu}</span>}
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {dateDebut.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
      <ArrowRight className="h-4 w-4 flex-shrink-0 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity self-center" />
    </Link>
  )
}
