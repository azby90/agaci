import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'
import { profilSchema } from '@/lib/schemas/auth'

const DIRECTUS_URL = process.env.DIRECTUS_URL!
const DIRECTUS_TOKEN = process.env.DIRECTUS_ADMIN_TOKEN!

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
  }

  try {
    const res = await fetch(
      `${DIRECTUS_URL}/items/membres/${session.user.id}?fields=prenom,nom,telephone,ville_ci,biographie,visibilite_profil`,
      { headers: { Authorization: `Bearer ${DIRECTUS_TOKEN}` }, cache: 'no-store' }
    )
    if (!res.ok) throw new Error()
    const data = await res.json()
    return NextResponse.json(data.data)
  } catch {
    return NextResponse.json({ error: 'Erreur lors du chargement du profil' }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
  }

  const body = await request.json()
  const parsed = profilSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Données invalides' }, { status: 400 })
  }

  try {
    const res = await fetch(
      `${DIRECTUS_URL}/items/membres/${session.user.id}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${DIRECTUS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsed.data),
      }
    )
    if (!res.ok) throw new Error()
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Erreur lors de la mise à jour' }, { status: 500 })
  }
}
