import Link from 'next/link'
import { User, Linkedin } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { ProfilInfluent } from '@/lib/directus-queries'

interface ProfilCardProps {
  profil: ProfilInfluent
}

export function ProfilCard({ profil }: ProfilCardProps) {
  const nom = `${profil.membre_id.prenom} ${profil.membre_id.nom}`
  const photo = profil.photo_url || profil.membre_id.photo

  return (
    <Link
      href={`/annuaire/${profil.id}`}
      className="group flex flex-col rounded-xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
    >
      {/* Photo + Nom */}
      <div className="mb-4 flex items-start gap-4">
        <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-gabon-green/10">
          {photo ? (
            <img src={photo} alt={nom} className="h-14 w-14 rounded-full object-cover" />
          ) : (
            <User className="h-7 w-7 text-gabon-green" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold leading-tight group-hover:text-gabon-green transition-colors">
            {nom}
          </h3>
          <p className="mt-0.5 text-sm text-muted-foreground truncate">{profil.titre}</p>
          <Badge variant="info" className="mt-1.5 text-[10px]">{profil.secteur}</Badge>
        </div>
      </div>

      {/* Biographie */}
      {profil.biographie && (
        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground flex-1">
          {profil.biographie}
        </p>
      )}

      {/* Tags expertise */}
      {profil.expertise?.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1">
          {profil.expertise.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
              {tag}
            </span>
          ))}
          {profil.expertise.length > 3 && (
            <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
              +{profil.expertise.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between border-t pt-3 mt-auto">
        {profil.disponible_mentorat ? (
          <Badge variant="success" className="text-[10px]">
            ✓ Disponible pour mentorat
          </Badge>
        ) : (
          <span />
        )}
        {profil.linkedin_url && (
          <Linkedin className="h-4 w-4 text-muted-foreground" />
        )}
      </div>
    </Link>
  )
}
