import { NextRequest, NextResponse } from 'next/server'
import { motDePasseOublieSchema } from '@/lib/schemas/auth'
import { generateToken } from '@/lib/crypto'
import { sendPasswordResetEmail } from '@/lib/email'

const DIRECTUS_URL = process.env.DIRECTUS_URL || 'http://localhost:8055'
const DIRECTUS_TOKEN = process.env.DIRECTUS_ADMIN_TOKEN || ''

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = motDePasseOublieSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Email invalide' }, { status: 400 })
    }

    const { email } = parsed.data

    // Toujours répondre avec succès (sécurité : ne pas révéler si l'email existe)
    const res = await fetch(
      `${DIRECTUS_URL}/items/membres?filter[email][_eq]=${encodeURIComponent(email)}&fields=id,prenom`,
      { headers: { Authorization: `Bearer ${DIRECTUS_TOKEN}` } }
    )
    const data = await res.json()
    const membre = data?.data?.[0]

    if (membre) {
      const reset_token = generateToken()
      const token_expiry = new Date(Date.now() + 60 * 60 * 1000).toISOString() // 1h

      await fetch(`${DIRECTUS_URL}/items/membres/${membre.id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${DIRECTUS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reset_token, token_expiry }),
      })

      await sendPasswordResetEmail(email, membre.prenom, reset_token)
    }

    return NextResponse.json({
      success: true,
      message: 'Si cet email existe, un lien de réinitialisation vous a été envoyé.',
    })
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
