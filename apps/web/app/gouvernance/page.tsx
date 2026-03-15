import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Shield, FileText, Users, BookOpen, ChevronRight } from 'lucide-react'
import { getDocuments, getEvenements } from '@/lib/directus-queries'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Gouvernance & Transparence — A.GA.CI',
  description: "Documents officiels, agenda et informations de gouvernance de l'A.GA.CI.",
}

const docTypeConfig = {
  rapport: { label: 'Rapport', variant: 'info' as const },
  cr_reunion: { label: 'Compte-rendu', variant: 'success' as const },
  budget: { label: 'Budget', variant: 'warning' as const },
  code_ethique: { label: "Code d'éthique", variant: 'secondary' as const },
  autre: { label: 'Document', variant: 'default' as const },
}

const sections = [
  { icon: FileText, title: 'Documents officiels', description: 'Rapports, comptes rendus, budgets et documents institutionnels.', href: '/gouvernance/documents', color: 'text-gabon-blue', bg: 'bg-gabon-blue/10' },
  { icon: BookOpen, title: "Code d'éthique", description: "Les valeurs, principes et règles de conduite de l'AGACI.", href: '/gouvernance/code-ethique', color: 'text-gabon-green', bg: 'bg-gabon-green/10' },
  { icon: Users, title: 'Équipe dirigeante', description: "Bureau exécutif et organigramme de l'association.", href: '/equipe', color: 'text-ci-orange', bg: 'bg-ci-orange/10' },
]

export default async function GouvernancePage() {
  const [documents, { data: evenements }] = await Promise.all([
    getDocuments(),
    getEvenements({ a_venir: true, limit: 5 }),
  ])

  return (
    <>
      {/* BANNIÈRE */}
      <section className="relative h-[280px] overflow-hidden bg-gabon-blue">
        <Image
          src="/evenements/10-septembre-2024/473708048_122161464320303209_2708571684011477927_n.jpg"
          alt="Membres A.GA.CI — Gouvernance"
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
            <Shield className="h-3.5 w-3.5" />
            Gouvernance
          </div>
          <h1 className="text-3xl font-bold text-white md:text-4xl">Gouvernance & Transparence</h1>
          <p className="text-white/80 mt-3 max-w-md">
            L&apos;A.GA.CI s&apos;engage à une gestion transparente et responsable au service de tous ses membres.
          </p>
        </div>
      </section>

    <div className="py-12">
      <div className="container max-w-5xl">

        {/* Sections */}
        <div className="mb-10 grid gap-4 sm:grid-cols-3">
          {sections.map((s) => {
            const Icon = s.icon
            return (
              <Link key={s.href} href={s.href}
                className="group rounded-xl border bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                <div className={`mb-3 inline-flex rounded-lg p-2.5 ${s.bg}`}>
                  <Icon className={`h-5 w-5 ${s.color}`} />
                </div>
                <h3 className="mb-1 font-semibold group-hover:text-gabon-green transition-colors">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.description}</p>
                <div className="mt-3 flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Accéder <ChevronRight className="h-3 w-3" />
                </div>
              </Link>
            )
          })}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Documents récents */}
          <div className="rounded-xl border bg-white shadow-sm">
            <div className="border-b p-4 flex items-center justify-between">
              <h2 className="font-semibold">Documents récents</h2>
              <Link href="/gouvernance/documents" className="text-xs text-primary hover:underline">Voir tout</Link>
            </div>
            <div className="divide-y">
              {documents.slice(0, 5).map((doc) => {
                const cfg = docTypeConfig[doc.type] ?? docTypeConfig.autre
                return (
                  <a key={doc.id} href={doc.fichier_url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 hover:bg-muted/30 transition-colors">
                    <FileText className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{doc.titre}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(doc.date_publication)}</p>
                    </div>
                    <Badge variant={cfg.variant} className="text-[10px] flex-shrink-0">{cfg.label}</Badge>
                  </a>
                )
              })}
              {documents.length === 0 && (
                <p className="p-6 text-sm text-center text-muted-foreground">Aucun document disponible.</p>
              )}
            </div>
          </div>

          {/* Prochains événements */}
          <div className="rounded-xl border bg-white shadow-sm">
            <div className="border-b p-4 flex items-center justify-between">
              <h2 className="font-semibold">Prochains événements</h2>
              <Link href="/evenements" className="text-xs text-primary hover:underline">Voir tout</Link>
            </div>
            <div className="divide-y">
              {evenements.slice(0, 5).map((ev) => (
                <Link key={ev.id} href={`/evenements/${ev.id}`}
                  className="flex items-center gap-3 p-4 hover:bg-muted/30 transition-colors">
                  <div className="flex h-10 w-10 flex-shrink-0 flex-col items-center justify-center rounded-lg bg-gabon-blue/10 text-gabon-blue text-center">
                    <span className="text-sm font-bold leading-none">{new Date(ev.date_debut).getDate()}</span>
                    <span className="text-[9px] uppercase">{new Date(ev.date_debut).toLocaleDateString('fr-FR', { month: 'short' })}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{ev.titre}</p>
                    <p className="text-xs text-muted-foreground">{ev.lieu}</p>
                  </div>
                </Link>
              ))}
              {evenements.length === 0 && (
                <p className="p-6 text-sm text-center text-muted-foreground">Aucun événement à venir.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
