import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, FileText, Download, File } from 'lucide-react'
import { getDocuments } from '@/lib/directus-queries'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = { title: 'Documents officiels — Gouvernance AGACI' }

const typeConfig = {
  rapport: { label: 'Rapport annuel', variant: 'info' as const },
  cr_reunion: { label: 'Compte-rendu', variant: 'success' as const },
  budget: { label: 'Budget', variant: 'warning' as const },
  code_ethique: { label: "Code d'éthique", variant: 'secondary' as const },
  autre: { label: 'Autre', variant: 'default' as const },
}

const types = [
  { value: '', label: 'Tous' },
  { value: 'rapport', label: 'Rapports' },
  { value: 'cr_reunion', label: 'Comptes-rendus' },
  { value: 'budget', label: 'Budgets' },
  { value: 'code_ethique', label: "Code d'éthique" },
]

interface PageProps { searchParams: { type?: string } }

export default async function DocumentsPage({ searchParams }: PageProps) {
  const documents = await getDocuments({ type: searchParams.type })

  return (
    <div className="py-10">
      <div className="container max-w-3xl">
        <Link href="/gouvernance" className="mb-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />Gouvernance
        </Link>
        <div className="mb-8">
          <h1 className="mb-2 text-2xl font-bold">Documents officiels</h1>
          <p className="text-muted-foreground">
            Tous les documents institutionnels de l&apos;AGACI publiés dans un souci de transparence.
          </p>
        </div>
        <div className="mb-6 flex flex-wrap gap-2">
          {types.map(({ value, label }) => (
            <a key={value || 'all'} href={value ? `/gouvernance/documents?type=${value}` : '/gouvernance/documents'}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors
                ${(searchParams.type || '') === value ? 'bg-gabon-blue text-white' : 'bg-white border hover:bg-muted'}`}>
              {label}
            </a>
          ))}
        </div>
        {documents.length === 0 ? (
          <div className="rounded-xl border bg-white p-10 text-center">
            <File className="mx-auto mb-3 h-10 w-10 text-muted-foreground/40" />
            <p className="text-muted-foreground">Aucun document disponible pour ce filtre.</p>
          </div>
        ) : (
          <div className="rounded-xl border bg-white shadow-sm divide-y overflow-hidden">
            {documents.map((doc) => {
              const cfg = typeConfig[doc.type] ?? typeConfig.autre
              return (
                <a key={doc.id} href={doc.fichier_url} target="_blank" rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gabon-blue/10">
                    <FileText className="h-5 w-5 text-gabon-blue" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{doc.titre}</p>
                    <p className="text-xs text-muted-foreground">
                      Publié le {formatDate(doc.date_publication)}
                      {doc.publie_par && ` · ${doc.publie_par.prenom} ${doc.publie_par.nom}`}
                    </p>
                  </div>
                  <Badge variant={cfg.variant} className="flex-shrink-0">{cfg.label}</Badge>
                  <Download className="h-4 w-4 flex-shrink-0 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
