import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

const DIRECTUS_URL = process.env.DIRECTUS_URL || 'http://localhost:8055'
const DIRECTUS_TOKEN = process.env.DIRECTUS_ADMIN_TOKEN || ''

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { titre, secteur, biographie, expertise, linkedin_url, disponible_mentorat } = body

    if (!titre || !secteur || !biographie) {
      return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 })
    }

    // Vérifier si une candidature existe déjà pour ce membre
    const check = await fetch(
      `${DIRECTUS_URL}/items/profils_influents?filter[membre_id][_eq]=${session.user.id}&fields=id`,
      { headers: { Authorization: `Bearer ${DIRECTUS_TOKEN}` } }
    )
    const checkData = await check.json()
    if (checkData?.data?.length > 0) {
      return NextResponse.json(
        { error: 'Vous avez déjà soumis une candidature pour l\'annuaire.' },
        { status: 409 }
      )
    }

    // Créer le profil influent (en attente de validation)
    const res = await fetch(`${DIRECTUS_URL}/items/profils_influents`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${DIRECTUS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        membre_id: session.user.id,
        titre,
        secteur,
        biographie,
        expertise: Array.isArray(expertise) ? expertise : [expertise],
        linkedin_url: linkedin_url || null,
        disponible_mentorat: disponible_mentorat || false,
        valide_par_admin: false,
      }),
    })

    if (!res.ok) {
      return NextResponse.json({ error: 'Erreur lors de la soumission.' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Candidature soumise avec succès. En attente de validation.',
    })
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
