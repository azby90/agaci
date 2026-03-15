import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { User, Mail, Phone, MapPin, Edit, Eye } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

async function getMembre(id: string) {
  try {
    const res = await fetch(
      `${process.env.DIRECTUS_URL}/items/membres/${id}?fields=id,prenom,nom,email,telephone,ville_ci,ville_gabon_origine,biographie,visibilite_profil,date_adhesion,statut,photo`,
      {
        headers: { Authorization: `Bearer ${process.env.DIRECTUS_ADMIN_TOKEN}` },
        next: { revalidate: 60 },
      }
    )
    if (!res.ok) return null
    const data = await res.json()
    return data.data
  } catch {
    return null
  }
}

function ProfilCompletude({ membre }: { membre: any }) {
  const champs = [
    { label: 'Prénom', value: membre.prenom },
    { label: 'Nom', value: membre.nom },
    { label: 'Email', value: membre.email },
    { label: 'Téléphone', value: membre.telephone },
    { label: 'Ville en CI', value: membre.ville_ci },
    { label: 'Biographie', value: membre.biographie },
    { label: 'Photo', value: membre.photo },
  ]
  const remplis = champs.filter((c) => c.value).length
  const pct = Math.round((remplis / champs.length) * 100)

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Complétude du profil</span>
        <span className="font-medium text-gabon-green">{pct}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-muted">
        <div
          className="h-2 rounded-full bg-gabon-green transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      {pct < 100 && (
        <p className="text-xs text-muted-foreground">
          Complétez votre profil pour augmenter votre visibilité dans la communauté.
        </p>
      )}
    </div>
  )
}

export default async function ProfilPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/connexion')

  const membre = await getMembre(session.user.id)

  if (!membre) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Impossible de charger votre profil. Veuillez réessayer.
      </div>
    )
  }

  const visibiliteLabel = {
    public: 'Public (visible par tous)',
    membres: 'Membres uniquement',
    prive: 'Privé',
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mon profil</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/membres/profil/vue-publique">
              <Eye className="mr-1.5 h-4 w-4" />
              Vue publique
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/membres/profil/modifier">
              <Edit className="mr-1.5 h-4 w-4" />
              Modifier
            </Link>
          </Button>
        </div>
      </div>

      {/* Carte principale */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gabon-green/10 text-gabon-green flex-shrink-0">
              {membre.photo ? (
                <img src={membre.photo} alt="" className="h-20 w-20 rounded-full object-cover" />
              ) : (
                <User className="h-10 w-10" />
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">{membre.prenom} {membre.nom}</h2>
              <p className="text-sm text-muted-foreground">
                Membre AGACI · {visibiliteLabel[membre.visibilite_profil as keyof typeof visibiliteLabel]}
              </p>
              {membre.biographie && (
                <p className="mt-2 text-sm text-foreground/80">{membre.biographie}</p>
              )}
            </div>
          </div>

          <div className="mt-6 grid gap-3 border-t pt-4 sm:grid-cols-2">
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
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{membre.ville_ci}, Côte d'Ivoire</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{membre.ville_gabon_origine}, Gabon</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Complétude */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Complétude du profil</CardTitle>
        </CardHeader>
        <CardContent>
          <ProfilCompletude membre={membre} />
        </CardContent>
      </Card>

      {/* Statut */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Informations du compte</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Statut</span>
            <span className={`font-medium ${membre.statut === 'actif' ? 'text-gabon-green' : 'text-amber-600'}`}>
              {membre.statut === 'actif' ? 'Actif' : 'En attente'}
            </span>
          </div>
          {membre.date_adhesion && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Membre depuis</span>
              <span>{new Date(membre.date_adhesion).toLocaleDateString('fr-FR')}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
