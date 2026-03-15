'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, Loader2, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { profilSchema, type ProfilFormData } from '@/lib/schemas/auth'

export default function ModifierProfilPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProfilFormData>({
    resolver: zodResolver(profilSchema),
  })

  useEffect(() => {
    async function loadProfil() {
      try {
        const res = await fetch('/api/membres/profil')
        if (!res.ok) throw new Error()
        const data = await res.json()
        reset({
          prenom: data.prenom ?? '',
          nom: data.nom ?? '',
          telephone: data.telephone ?? '',
          ville_ci: data.ville_ci ?? '',
          biographie: data.biographie ?? '',
          visibilite_profil: data.visibilite_profil ?? 'membres',
        })
      } catch {
        setError('Impossible de charger votre profil.')
      } finally {
        setIsFetching(false)
      }
    }
    loadProfil()
  }, [reset])

  const onSubmit = async (data: ProfilFormData) => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/membres/profil', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await res.json()
      if (!res.ok) {
        setError(result.error || 'Une erreur est survenue.')
      } else {
        setSuccess(true)
        setTimeout(() => router.push('/membres/profil'), 1500)
      }
    } catch {
      setError('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isFetching) {
    return (
      <div className="mx-auto max-w-xl space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-16 animate-pulse rounded-lg bg-muted" />
        ))}
      </div>
    )
  }

  if (success) {
    return (
      <div className="mx-auto max-w-lg py-12 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-8 w-8 text-gabon-green" />
        </div>
        <h2 className="mb-2 text-xl font-bold">Profil mis à jour !</h2>
        <p className="text-muted-foreground">Redirection en cours...</p>
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
          <CardTitle>Modifier mon profil</CardTitle>
          <CardDescription>Ces informations sont visibles selon vos paramètres de confidentialité.</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="prenom">Prénom *</Label>
                <Input id="prenom" {...register('prenom')} />
                {errors.prenom && <p className="text-xs text-destructive">{errors.prenom.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="nom">Nom *</Label>
                <Input id="nom" {...register('nom')} />
                {errors.nom && <p className="text-xs text-destructive">{errors.nom.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="telephone">Téléphone</Label>
              <Input id="telephone" type="tel" placeholder="+225 07 XX XX XX XX" {...register('telephone')} />
              {errors.telephone && <p className="text-xs text-destructive">{errors.telephone.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="ville_ci">Ville en Côte d&apos;Ivoire *</Label>
              <Input id="ville_ci" placeholder="Abidjan, Bouaké..." {...register('ville_ci')} />
              {errors.ville_ci && <p className="text-xs text-destructive">{errors.ville_ci.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="biographie">Biographie</Label>
              <textarea
                id="biographie"
                rows={4}
                placeholder="Présentez-vous en quelques lignes... (500 caractères max)"
                className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                {...register('biographie')}
              />
              {errors.biographie && <p className="text-xs text-destructive">{errors.biographie.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="visibilite_profil">Visibilité du profil *</Label>
              <select
                id="visibilite_profil"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                {...register('visibilite_profil')}
              >
                <option value="public">Public — visible par tous</option>
                <option value="membres">Membres uniquement</option>
                <option value="prive">Privé — visible par moi seul</option>
              </select>
              {errors.visibilite_profil && <p className="text-xs text-destructive">{errors.visibilite_profil.message}</p>}
            </div>

            <div className="flex gap-3 pt-2">
              <Button type="submit" className="flex-1" disabled={isLoading}>
                {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Enregistrement...</> : 'Enregistrer les modifications'}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/membres/profil">Annuler</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
