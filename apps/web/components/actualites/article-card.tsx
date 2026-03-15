import Link from 'next/link'
import { Calendar, User } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { formatDate, truncate } from '@/lib/utils'
import type { Article } from '@/lib/directus-queries'

const categorieConfig = {
  communaute: { label: 'Communauté', variant: 'success' as const },
  institutionnel: { label: 'Institutionnel', variant: 'info' as const },
  partenariat: { label: 'Partenariat', variant: 'orange' as const },
}

interface ArticleCardProps {
  article: Article
  featured?: boolean
}

export function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const config = categorieConfig[article.categorie] ?? { label: article.categorie, variant: 'default' as const }
  const href = `/actualites/${article.slug || article.id}`

  if (featured) {
    return (
      <Link href={href} className="group relative flex min-h-[320px] flex-col justify-end overflow-hidden rounded-xl border shadow-sm">
        {article.photo_url ? (
          <img src={article.photo_url} alt={article.titre}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="absolute inset-0 gradient-agaci" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="relative p-6 text-white">
          <Badge variant={config.variant} className="mb-3">{config.label}</Badge>
          <h2 className="mb-2 text-xl font-bold leading-tight group-hover:text-gabon-yellow transition-colors">
            {article.titre}
          </h2>
          <div className="flex items-center gap-3 text-xs text-white/70">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(article.publie_le || article.date_created)}
            </span>
            {article.publie_par && (
              <span className="flex items-center gap-1">
                <User className="h-3 w-3" />
                {article.publie_par.prenom} {article.publie_par.nom}
              </span>
            )}
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={href}
      className="group flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative h-40 overflow-hidden bg-muted">
        {article.photo_url ? (
          <img src={article.photo_url} alt={article.titre}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
        ) : (
          <div className="h-full w-full gradient-agaci opacity-80" />
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <Badge variant={config.variant} className="mb-2 w-fit text-[10px]">{config.label}</Badge>
        <h3 className="mb-2 font-semibold leading-tight line-clamp-2 group-hover:text-gabon-green transition-colors">
          {article.titre}
        </h3>
        {article.contenu && (
          <p className="mb-3 text-xs text-muted-foreground line-clamp-2 flex-1">
            {truncate(article.contenu.replace(/<[^>]*>/g, ''), 120)}
          </p>
        )}
        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-auto border-t pt-3">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {formatDate(article.publie_le || article.date_created)}
          </span>
        </div>
      </div>
    </Link>
  )
}
