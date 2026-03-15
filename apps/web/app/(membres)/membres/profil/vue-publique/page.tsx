import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, User, Mail, Phone, MapPin, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

async function getMembre(id: string) {
  try {
    const res = await fetch(
      `${process.env.DIRECTUS_URL}/items/membres/${id}?fields=id,prenom,nom,email,telephone,ville_ci,ville_gabon_origine,biographie,visibilite_profil,photo`,
      {
        headers: { Authorization: `Bearer ${process.env.DIRECTUS_ADMIN_TOKEN}` },
        cache: 'no-store',
      }
    )
    if (!res.ok) return null
    const data = await res.json()
    return data.data
  } catch {
    return null
  }
}

const visibiliteConfig = {
  public: { label: 'Public', variant: 'success' as const, desc: 'Votre profil est visible par tous les visiteurs.' },
  membres: { label: 'Membres', variant: 'info' as const, desc: 'Votre profil est visible uniquement par les membres connectés.' },
  prive: { label: 'Privé', variant: 'secondary' as const, desc: 'Votre profil n\'est visible par personne dans l\'annuaire.' },
}

export default async function VuePubliquePage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/connexion')

  const membre = await getMembre(session.user.id)

  if (!membre) {
    return (
      <div className="mx-auto max-w-xl py-12 text-center text-muted-foreground">
        Impossible de charger votre profil.
      </div>
    )
  }

  const cfg = visibiliteConfig[membre.visibilite_profil as keyof typeof visibiliteConfig] ?? visibiliteConfig.prive

  return (
    <div className="mx-auto max-w-xl">
      <Link href="/membres/profil" className="mb-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Retour au profil
      </Link>

      {/* Bandeau info visibilité */}
      <div className="mb-6 rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Eye className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
          <div className="flex-1">
            <div className="mb-1 flex items-center gap-2">
              <span className="text-sm font-medium">Paramètre de visibilité actuel :</span>
              <Badge variant={cfg.variant}>{cfg.label}</Badge>
            </div>
            <p className="text-xs text-muted-foreground">{cfg.desc}</p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/membres/profil/modifier">Modifier</Link>
          </Button>
        </div>
      </div>

      {/* Aperçu du profil public */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Aperçu de votre profil
        </h2>

        <div className="flex items-start gap-4 mb-6">
          <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-gabon-green/10 text-gabon-green">
            {membre.photo ? (
              <img src={membre.photo} alt="" className="h-20 w-20 rounded-full object-cover" />
            ) : (
              <User className="h-10 w-10" />
            )}
          </div>
          <div>
            <h1 className="text-xl font-bold">{membre.prenom} {membre.nom}</h1>
            <p className="text-sm text-muted-foreground">Membre AGACI</p>
            {membre.biographie && (
              <p className="mt-2 text-sm text-foreground/80 leading-relaxed">{membre.biographie}</p>
            )}
          </div>
        </div>

        <div className="space-y-2 border-t pt-4">
          {membre.visibilite_profil === 'public' && (
            <>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{membre.email}</span>
              </div>
              {membre.telephone && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{membre.telephone}</span>
                </div>
              )}
            </>
          )}
          {membre.ville_ci && (
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{membre.ville_ci}, Côte d&apos;Ivoire</span>
            </div>
          )}
          {membre.ville_gabon_origine && (
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>Originaire de {membre.ville_gabon_origine}, Gabon</span>
            </div>
          )}
        </div>

        {membre.visibilite_profil === 'prive' && (
          <p className="mt-4 rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">
            En mode privé, seuls votre prénom, nom et ville apparaissent dans l&apos;annuaire si vous y êtes référencé.
            Vos coordonnées restent masquées.
          </p>
        )}
      </div>
    </div>
  )
}
