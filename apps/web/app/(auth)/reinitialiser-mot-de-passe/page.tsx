'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { reinitialiserMotDePasseSchema, type ReinitialiserMotDePasseFormData } from '@/lib/schemas/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

function ResetForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<ReinitialiserMotDePasseFormData>({
    resolver: zodResolver(reinitialiserMotDePasseSchema),
  })

  if (!token) {
    return (
      <Card className="w-full max-w-md shadow-lg text-center">
        <CardContent className="pt-8">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Lien invalide. Veuillez demander un nouveau lien.</AlertDescription>
          </Alert>
          <Button asChild className="mt-4"><Link href="/mot-de-passe-oublie">Demander un nouveau lien</Link></Button>
        </CardContent>
      </Card>
    )
  }

  const onSubmit = async (data: ReinitialiserMotDePasseFormData) => {
    setIsLoading(true)
    setError(null)
    const res = await fetch('/api/auth/reinitialiser-mot-de-passe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, token }),
    })
    const result = await res.json()
    setIsLoading(false)
    if (!res.ok) { setError(result.error) } else { setSuccess(true); setTimeout(() => router.push('/connexion?message=mdp-reinitialise'), 2000) }
  }

  if (success) {
    return (
      <Card className="w-full max-w-md shadow-lg text-center">
        <CardContent className="pt-8">
          <CheckCircle className="mx-auto mb-4 h-12 w-12 text-gabon-green" />
          <p className="font-medium">Mot de passe mis à jour ! Redirection...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="text-center">
        <CardTitle>Nouveau mot de passe</CardTitle>
        <CardDescription>Choisissez un nouveau mot de passe sécurisé</CardDescription>
      </CardHeader>
      <CardContent>
        {error && <Alert variant="destructive" className="mb-4"><AlertCircle className="h-4 w-4" /><AlertDescription>{error}</AlertDescription></Alert>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label>Nouveau mot de passe</Label>
            <div className="relative">
              <Input type={showPassword ? 'text' : 'password'} placeholder="8+ caractères, 1 majuscule, 1 chiffre" {...register('password')} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
          </div>
          <div className="space-y-2">
            <Label>Confirmer</Label>
            <Input type="password" {...register('confirmPassword')} />
            {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>}
          </div>
          <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
            {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Mise à jour...</> : 'Mettre à jour'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default function ReinitialiserPage() {
  return <Suspense><ResetForm /></Suspense>
}
