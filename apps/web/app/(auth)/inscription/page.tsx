'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { inscriptionSchema, type InscriptionFormData } from '@/lib/schemas/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function InscriptionPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InscriptionFormData>({
    resolver: zodResolver(inscriptionSchema),
    defaultValues: { acceptTerms: false },
  })

  const onSubmit = async (data: InscriptionFormData) => {
    setIsLoading(true)
    setServerError(null)

    const res = await fetch('/api/auth/inscription', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    const result = await res.json()
    setIsLoading(false)

    if (!res.ok) {
      setServerError(result.error || 'Une erreur est survenue.')
    } else {
      setSuccess(true)
    }
  }

  if (success) {
    return (
      <Card className="w-full max-w-md shadow-lg text-center">
        <CardContent className="pt-8 pb-8">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-8 w-8 text-gabon-green" />
          </div>
          <h2 className="mb-2 text-xl font-bold">Inscription réussie !</h2>
          <p className="text-muted-foreground text-sm mb-6">
            Un email de confirmation vous a été envoyé. Cliquez sur le lien dans l'email pour
            activer votre compte.
          </p>
          <Button asChild variant="outline">
            <Link href="/connexion">Aller à la connexion</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-lg shadow-lg">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl">Rejoindre l'AGACI</CardTitle>
        <CardDescription>Créez votre compte membre gratuitement</CardDescription>
      </CardHeader>
      <CardContent>
        {serverError && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{serverError}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="prenom">Prénom *</Label>
              <Input id="prenom" placeholder="Jean" {...register('prenom')} />
              {errors.prenom && <p className="text-xs text-destructive">{errors.prenom.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="nom">Nom *</Label>
              <Input id="nom" placeholder="Dupont" {...register('nom')} />
              {errors.nom && <p className="text-xs text-destructive">{errors.nom.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Adresse email *</Label>
            <Input id="email" type="email" placeholder="vous@exemple.com" {...register('email')} />
            {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="telephone">Téléphone (WhatsApp)</Label>
            <Input id="telephone" type="tel" placeholder="+225 07 00 00 00 00" {...register('telephone')} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ville_ci">Ville en CI *</Label>
              <Input id="ville_ci" placeholder="Abidjan" {...register('ville_ci')} />
              {errors.ville_ci && <p className="text-xs text-destructive">{errors.ville_ci.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="ville_gabon_origine">Ville d'origine (Gabon) *</Label>
              <Input id="ville_gabon_origine" placeholder="Libreville" {...register('ville_gabon_origine')} />
              {errors.ville_gabon_origine && (
                <p className="text-xs text-destructive">{errors.ville_gabon_origine.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe *</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="8+ caractères, 1 majuscule, 1 chiffre"
                {...register('password')}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmer le mot de passe *</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirm ? 'text' : 'password'}
                {...register('confirmPassword')}
              />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
            )}
          </div>

          <div className="flex items-start gap-2">
            <input type="checkbox" id="acceptTerms" className="mt-0.5 h-4 w-4 rounded" {...register('acceptTerms')} />
            <Label htmlFor="acceptTerms" className="font-normal cursor-pointer text-sm leading-relaxed">
              J'accepte les{' '}
              <Link href="/mentions-legales" className="text-primary hover:underline">
                conditions d'utilisation
              </Link>{' '}
              et la{' '}
              <Link href="/confidentialite" className="text-primary hover:underline">
                politique de confidentialité
              </Link>
            </Label>
          </div>
          {errors.acceptTerms && (
            <p className="text-xs text-destructive">{errors.acceptTerms.message}</p>
          )}

          <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
            {isLoading ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Création en cours...</>
            ) : (
              'Créer mon compte'
            )}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          Déjà membre ?{' '}
          <Link href="/connexion" className="font-medium text-primary hover:underline">
            Se connecter
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}
