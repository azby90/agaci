import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, MapPin, Clock, Calendar, Download } from 'lucide-react'
import { getEvenementById } from '@/lib/directus-queries'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { formatDate } from '@/lib/utils'

const typeConfig = {
  reunion: { label: 'Réunion', variant: 'info' as const },
  ceremonie: { label: 'Cérémonie', variant: 'orange' as const },
  atelier: { label: 'Atelier', variant: 'warning' as const },
  autre: { label: 'Événement', variant: 'default' as const },
}

interface PageProps { params: { id: string } }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const ev = await getEvenementById(params.id)
  if (!ev) return { title: 'Événement introuvable' }
  return { title: `${ev.titre} — Événements AGACI`, description: ev.description?.slice(0, 160) }
}

function toIcal(ev: { id: string; titre: string; date_debut: string; date_fin: string | null; lieu: string; description: string }): string {
  const fmt = (d: string) => new Date(d).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  return [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//AGACI//FR',
    'BEGIN:VEVENT',
    `UID:${ev.id}@agaci.org`,
    `DTSTART:${fmt(ev.date_debut)}`,
    `DTEND:${ev.date_fin ? fmt(ev.date_fin) : fmt(ev.date_debut)}`,
    `SUMMARY:${ev.titre}`,
    `DESCRIPTION:${ev.description?.replace(/\n/g, '\\n') || ''}`,
    `LOCATION:${ev.lieu || ''}`,
    'END:VEVENT', 'END:VCALENDAR',
  ].join('\r\n')
}

export default async function EvenementPage({ params }: PageProps) {
  const ev = await getEvenementById(params.id)
  if (!ev) notFound()

  const config = typeConfig[ev.type] ?? typeConfig.autre
  const dateDebut = new Date(ev.date_debut)
  const dateFin = ev.date_fin ? new Date(ev.date_fin) : null
  const isPast = dateDebut < new Date()

  return (
    <div className="py-10">
      <div className="container max-w-3xl">
        <Link href="/evenements" className="mb-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />Retour à l&apos;agenda
        </Link>

        <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
          {ev.photo_url && (
            <div className="h-56 overflow-hidden">
              <img src={ev.photo_url} alt={ev.titre} className="h-full w-full object-cover" />
            </div>
          )}
          <div className="border-b bg-gradient-to-r from-ci-orange/5 to-gabon-green/5 p-6">
            <div className="mb-3 flex flex-wrap gap-2">
              <Badge variant={config.variant}>{config.label}</Badge>
              {isPast && <Badge variant="outline" className="text-muted-foreground">Passé</Badge>}
            </div>
            <h1 className="text-2xl font-bold">{ev.titre}</h1>
          </div>

          <div className="grid gap-3 border-b bg-muted/20 p-6 sm:grid-cols-3">
            <div className="flex items-start gap-2.5">
              <Calendar className="mt-0.5 h-4 w-4 flex-shrink-0 text-gabon-green" />
              <div>
                <p className="text-xs text-muted-foreground">Date</p>
                <p className="text-sm font-medium">{formatDate(ev.date_debut)}</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-gabon-green" />
              <div>
                <p className="text-xs text-muted-foreground">Heure</p>
                <p className="text-sm font-medium">
                  {dateDebut.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                  {dateFin && ` — ${dateFin.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`}
                </p>
              </div>
            </div>
            {ev.lieu && (
              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-gabon-green" />
                <div>
                  <p className="text-xs text-muted-foreground">Lieu</p>
                  <p className="text-sm font-medium">{ev.lieu}</p>
                </div>
              </div>
            )}
          </div>

          <div className="p-6">
            {ev.description && (
              <>
                <h2 className="mb-3 font-semibold">Description</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{ev.description}</p>
                <Separator className="my-6" />
              </>
            )}
            <div className="flex flex-wrap gap-3">
              {!isPast && (
                <a href={`data:text/calendar;charset=utf-8,${encodeURIComponent(toIcal(ev))}`}
                  download={`agaci-${ev.id}.ics`}>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Ajouter à mon calendrier (.ics)
                  </Button>
                </a>
              )}
              <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`📅 ${ev.titre}\n${formatDate(ev.date_debut)}\n📍 ${ev.lieu || 'AGACI'}`)}`}
                target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm">Partager sur WhatsApp</Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
