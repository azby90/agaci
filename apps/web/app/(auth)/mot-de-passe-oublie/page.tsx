'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Mail, ArrowLeft } from 'lucide-react'
import { motDePasseOublieSchema, type MotDePasseOublieFormData } from '@/lib/schemas/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function MotDePasseOubliePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<MotDePasseOublieFormData>({
    resolver: zodResolver(motDePasseOublieSchema),
  })

  const onSubmit = async (data: MotDePasseOublieFormData) => {
    setIsLoading(true)
    await fetch('/api/auth/mot-de-passe-oublie', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    setIsLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <Card className="w-full max-w-md shadow-lg text-center">
        <CardContent className="pt-8 pb-8">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
            <Mail className="h-8 w-8 text-gabon-blue" />
          </div>
          <h2 className="mb-2 text-xl font-bold">Email envoyé</h2>
          <p className="text-muted-foreground text-sm mb-6">
            Si cette adresse email est associée à un compte AGACI, vous recevrez un lien de
            réinitialisation dans quelques minutes. Vérifiez vos spams.
          </p>
          <Button asChild variant="outline">
            <Link href="/connexion"><ArrowLeft className="mr-2 h-4 w-4" />Retour à la connexion</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl">Mot de passe oublié</CardTitle>
        <CardDescription>
          Entrez votre email pour recevoir un lien de réinitialisation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Adresse email</Label>
            <Input id="email" type="email" placeholder="vous@exemple.com" {...register('email')} />
            {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
          </div>
          <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
            {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Envoi...</> : 'Envoyer le lien'}
          </Button>
        </form>
        <div className="mt-4 text-center">
          <Link href="/connexion" className="text-sm text-muted-foreground hover:text-foreground flex items-center justify-center gap-1">
            <ArrowLeft className="h-3 w-3" /> Retour à la connexion
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
