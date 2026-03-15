import { NextRequest, NextResponse } from 'next/server'

const DIRECTUS_URL = process.env.DIRECTUS_URL || 'http://localhost:8055'
const DIRECTUS_TOKEN = process.env.DIRECTUS_ADMIN_TOKEN || ''
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')

  if (!token) {
    return NextResponse.redirect(`${APP_URL}/connexion?error=token-invalide`)
  }

  try {
    // Trouver le membre avec ce token
    const res = await fetch(
      `${DIRECTUS_URL}/items/membres?filter[confirmation_token][_eq]=${token}&fields=id,prenom,email,token_expiry,statut`,
      { headers: { Authorization: `Bearer ${DIRECTUS_TOKEN}` } }
    )
    const data = await res.json()
    const membre = data?.data?.[0]

    if (!membre) {
      return NextResponse.redirect(`${APP_URL}/connexion?error=token-invalide`)
    }

    if (membre.statut === 'actif') {
      return NextResponse.redirect(`${APP_URL}/connexion?message=deja-confirme`)
    }

    if (new Date(membre.token_expiry) < new Date()) {
      return NextResponse.redirect(`${APP_URL}/connexion?error=token-expire`)
    }

    // Activer le compte
    await fetch(`${DIRECTUS_URL}/items/membres/${membre.id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${DIRECTUS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        statut: 'actif',
        confirmation_token: null,
        token_expiry: null,
      }),
    })

    return NextResponse.redirect(`${APP_URL}/connexion?message=compte-active`)
  } catch {
    return NextResponse.redirect(`${APP_URL}/connexion?error=erreur-serveur`)
  }
}
