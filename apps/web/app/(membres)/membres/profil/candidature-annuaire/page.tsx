'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowLeft, Loader2, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

const secteurs = [
  'Droit & Justice', 'Finance & Banque', 'Santé & Médecine', 'Éducation & Formation',
  'Entrepreneuriat & Business', 'Technologies & Numérique', 'Arts & Culture',
  'Diplomatie & Relations Internationales', 'Ingénierie & BTP', 'Agriculture & Environnement',
  'Médias & Communication', 'Sport', 'Autre',
]

const candidatureSchema = z.object({
  titre: z.string().min(3, 'Titre requis').max(100),
  secteur: z.string().min(1, 'Secteur requis'),
  biographie: z.string().min(50, 'Biographie requise (50 caractères minimum)').max(1000),
  expertise: z.string().min(3, 'Renseignez au moins une expertise'),
  linkedin_url: z.string().url('URL LinkedIn invalide').optional().or(z.literal('')),
  disponible_mentorat: z.boolean().optional(),
})

type CandidatureFormData = z.infer<typeof candidatureSchema>

export default function CandidatureAnnuairePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors } } = useForm<CandidatureFormData>({
    resolver: zodResolver(candidatureSchema),
  })

  const onSubmit = async (data: CandidatureFormData) => {
    setIsLoading(true)
    setError(null)

    const payload = {
      ...data,
      expertise: data.expertise.split(',').map((e) => e.trim()).filter(Boolean),
    }

    const res = await fetch('/api/annuaire/candidature', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const result = await res.json()
    setIsLoading(false)

    if (!res.ok) { setError(result.error || 'Une erreur est survenue.') }
    else { setSuccess(true) }
  }

  if (success) {
    return (
      <div className="mx-auto max-w-lg text-center py-12">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-8 w-8 text-gabon-green" />
        </div>
        <h2 className="mb-2 text-xl font-bold">Candidature soumise !</h2>
        <p className="text-muted-foreground mb-6">
          Votre demande est en cours d&apos;examen par l&apos;équipe AGACI.
          Vous recevrez une réponse par email sous 5 jours ouvrables.
        </p>
        <Button asChild variant="outline">
          <Link href="/membres/profil"><ArrowLeft className="mr-2 h-4 w-4" />Retour au profil</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-xl">
      <Link href="/membres/profil" className="mb-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Retour au profil
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>Candidature — Annuaire des personnalités</CardTitle>
          <CardDescription>
            Partagez votre expertise avec la communauté AGACI. Votre profil sera examiné
            avant publication.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="titre">Titre professionnel *</Label>
              <Input id="titre" placeholder="ex: Directeur Général — Entreprise XYZ" {...register('titre')} />
              {errors.titre && <p className="text-xs text-destructive">{errors.titre.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="secteur">Secteur d&apos;activité *</Label>
              <select
                id="secteur"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                {...register('secteur')}
              >
                <option value="">Sélectionner un secteur</option>
                {secteurs.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              {errors.secteur && <p className="text-xs text-destructive">{errors.secteur.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="biographie">Biographie *</Label>
              <textarea
                id="biographie"
                rows={5}
                placeholder="Décrivez votre parcours, vos réalisations et ce que vous apportez à la communauté... (50 caractères minimum)"
                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                {...register('biographie')}
              />
              {errors.biographie && <p className="text-xs text-destructive">{errors.biographie.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="expertise">Domaines d&apos;expertise *</Label>
              <Input
                id="expertise"
                placeholder="Droit des affaires, Contentieux, Arbitrage (séparés par des virgules)"
                {...register('expertise')}
              />
              <p className="text-xs text-muted-foreground">Séparez chaque expertise par une virgule</p>
              {errors.expertise && <p className="text-xs text-destructive">{errors.expertise.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedin_url">URL LinkedIn</Label>
              <Input id="linkedin_url" type="url" placeholder="https://linkedin.com/in/votre-profil" {...register('linkedin_url')} />
              {errors.linkedin_url && <p className="text-xs text-destructive">{errors.linkedin_url.message}</p>}
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="disponible_mentorat" className="h-4 w-4 rounded" {...register('disponible_mentorat')} />
              <Label htmlFor="disponible_mentorat" className="font-normal cursor-pointer">
                Je suis disponible pour accompagner des jeunes en mentorat
              </Label>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Soumission...</> : 'Soumettre ma candidature'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
