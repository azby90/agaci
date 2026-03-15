import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Calendar, User } from 'lucide-react'
import { getArticleBySlug, getArticles } from '@/lib/directus-queries'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { formatDate } from '@/lib/utils'

const categorieConfig = {
  communaute: { label: 'Communauté', variant: 'success' as const },
  institutionnel: { label: 'Institutionnel', variant: 'info' as const },
  partenariat: { label: 'Partenariat', variant: 'orange' as const },
}

interface PageProps { params: { slug: string } }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug)
  if (!article) return { title: 'Article introuvable' }
  return {
    title: article.titre,
    description: article.contenu?.replace(/<[^>]*>/g, '').slice(0, 160),
    openGraph: { images: article.photo_url ? [article.photo_url] : [] },
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const [article, { data: recents }] = await Promise.all([
    getArticleBySlug(params.slug),
    getArticles({ limit: 4 }),
  ])
  if (!article) notFound()

  const config = categorieConfig[article.categorie] ?? { label: article.categorie, variant: 'default' as const }
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || ''
  const pageUrl = `${appUrl}/actualites/${params.slug}`

  return (
    <div className="py-10">
      <div className="container max-w-4xl">
        <Link href="/actualites" className="mb-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />Retour aux actualités
        </Link>

        <article className="rounded-xl border bg-white shadow-sm overflow-hidden">
          {article.photo_url && (
            <div className="h-72 overflow-hidden">
              <img src={article.photo_url} alt={article.titre} className="h-full w-full object-cover" />
            </div>
          )}
          <div className="p-6 md:p-8">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <Badge variant={config.variant}>{config.label}</Badge>
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                {formatDate(article.publie_le || article.date_created)}
              </span>
              {article.publie_par && (
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <User className="h-3.5 w-3.5" />
                  {article.publie_par.prenom} {article.publie_par.nom}
                </span>
              )}
            </div>
            <h1 className="mb-6 text-2xl font-bold leading-tight md:text-3xl">{article.titre}</h1>
            <Separator className="mb-6" />
            <div
              className="prose prose-sm max-w-none text-foreground/90 leading-relaxed [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-3 [&_p]:mb-4"
              dangerouslySetInnerHTML={{ __html: article.contenu || '' }}
            />
            <Separator className="mt-8 mb-6" />
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm font-medium text-muted-foreground">Partager :</span>
              <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(article.titre + ' — ' + pageUrl)}`}
                target="_blank" rel="noopener noreferrer"
                className="rounded-lg border px-3 py-1.5 text-sm font-medium hover:bg-muted transition-colors">
                WhatsApp
              </a>
              <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`}
                target="_blank" rel="noopener noreferrer"
                className="rounded-lg border px-3 py-1.5 text-sm font-medium hover:bg-muted transition-colors">
                LinkedIn
              </a>
            </div>
          </div>
        </article>

        {recents.filter(a => a.id !== article.id).length > 0 && (
          <div className="mt-10">
            <h2 className="mb-5 text-xl font-bold">Autres actualités</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {recents.filter(a => a.id !== article.id).slice(0, 3).map((a) => (
                <Link key={a.id} href={`/actualites/${a.slug || a.id}`}
                  className="group rounded-xl border bg-white p-4 hover:shadow-sm transition-all">
                  <p className="font-medium text-sm leading-snug line-clamp-2 group-hover:text-gabon-green transition-colors">
                    {a.titre}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{formatDate(a.publie_le || a.date_created)}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
