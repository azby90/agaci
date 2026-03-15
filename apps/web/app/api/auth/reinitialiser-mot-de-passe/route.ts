import { NextRequest, NextResponse } from 'next/server'
import { reinitialiserMotDePasseSchema } from '@/lib/schemas/auth'
import { hashPassword } from '@/lib/crypto'

const DIRECTUS_URL = process.env.DIRECTUS_URL || 'http://localhost:8055'
const DIRECTUS_TOKEN = process.env.DIRECTUS_ADMIN_TOKEN || ''

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { token, ...rest } = body

    if (!token) {
      return NextResponse.json({ error: 'Token manquant' }, { status: 400 })
    }

    const parsed = reinitialiserMotDePasseSchema.safeParse(rest)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Données invalides', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const res = await fetch(
      `${DIRECTUS_URL}/items/membres?filter[reset_token][_eq]=${token}&fields=id,token_expiry`,
      { headers: { Authorization: `Bearer ${DIRECTUS_TOKEN}` } }
    )
    const data = await res.json()
    const membre = data?.data?.[0]

    if (!membre) {
      return NextResponse.json({ error: 'Token invalide ou expiré.' }, { status: 400 })
    }

    if (new Date(membre.token_expiry) < new Date()) {
      return NextResponse.json({ error: 'Ce lien a expiré. Veuillez en demander un nouveau.' }, { status: 400 })
    }

    const password_hash = await hashPassword(parsed.data.password)

    await fetch(`${DIRECTUS_URL}/items/membres/${membre.id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${DIRECTUS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password_hash, reset_token: null, token_expiry: null }),
    })

    return NextResponse.json({ success: true, message: 'Mot de passe mis à jour avec succès.' })
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
