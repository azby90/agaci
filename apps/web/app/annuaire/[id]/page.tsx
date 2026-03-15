import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { User, Linkedin, ArrowLeft, CheckCircle, Mail } from 'lucide-react'
import { getProfilInfluentById } from '@/lib/directus-queries'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { auth } from '@/lib/auth'

interface PageProps {
  params: { id: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const profil = await getProfilInfluentById(params.id)
  if (!profil) return { title: 'Profil introuvable' }
  const nom = `${profil.membre_id.prenom} ${profil.membre_id.nom}`
  return {
    title: `${nom} — Annuaire AGACI`,
    description: `${profil.titre} · ${profil.secteur}. ${profil.biographie?.slice(0, 120)}`,
  }
}

export default async function ProfilPage({ params }: PageProps) {
  const [profil, session] = await Promise.all([
    getProfilInfluentById(params.id),
    auth(),
  ])

  if (!profil) notFound()

  const nom = `${profil.membre_id.prenom} ${profil.membre_id.nom}`
  const photo = profil.photo_url || profil.membre_id.photo

  return (
    <div className="py-10">
      <div className="container max-w-4xl">
        {/* Retour */}
        <Link
          href="/annuaire"
          className="mb-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour à l&apos;annuaire
        </Link>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Colonne gauche — Carte identité */}
          <div className="md:col-span-1">
            <div className="rounded-xl border bg-white p-6 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gabon-green/10">
                {photo ? (
                  <img src={photo} alt={nom} className="h-24 w-24 rounded-full object-cover" />
                ) : (
                  <User className="h-12 w-12 text-gabon-green" />
                )}
              </div>
              <h1 className="text-xl font-bold">{nom}</h1>
              <p className="mt-1 text-sm text-muted-foreground">{profil.titre}</p>
              <Badge variant="info" className="mt-2">{profil.secteur}</Badge>

              {profil.disponible_mentorat && (
                <div className="mt-4 rounded-lg bg-gabon-green/5 p-3 border border-gabon-green/20">
                  <div className="flex items-center justify-center gap-1.5 text-sm font-medium text-gabon-green">
                    <CheckCircle className="h-4 w-4" />
                    Disponible pour mentorat
                  </div>
                </div>
              )}

              <div className="mt-4 space-y-2">
                {profil.linkedin_url && (
                  <a
                    href={profil.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
                  >
                    <Linkedin className="h-4 w-4 text-[#0077B5]" />
                    Voir sur LinkedIn
                  </a>
                )}
                {session?.user ? (
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href={`/membres/messages/nouveau?destinataire=${profil.membre_id.id}`}>
                      <Mail className="mr-2 h-4 w-4" />
                      Contacter
                    </Link>
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href="/connexion">
                      <Mail className="mr-2 h-4 w-4" />
                      Connectez-vous pour contacter
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Colonne droite — Détails */}
          <div className="md:col-span-2 space-y-6">
            {/* Biographie */}
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <h2 className="mb-3 font-semibold text-lg">Biographie</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {profil.biographie || 'Biographie non renseignée.'}
              </p>
            </div>

            {/* Expertises */}
            {profil.expertise?.length > 0 && (
              <div className="rounded-xl border bg-white p-6 shadow-sm">
                <h2 className="mb-3 font-semibold text-lg">Domaines d&apos;expertise</h2>
                <div className="flex flex-wrap gap-2">
                  {profil.expertise.map((tag) => (
                    <Link
                      key={tag}
                      href={`/annuaire?q=${encodeURIComponent(tag)}`}
                      className="rounded-full bg-gabon-green/10 px-3 py-1 text-sm text-gabon-green hover:bg-gabon-green/20 transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
