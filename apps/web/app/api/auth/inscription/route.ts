import { NextRequest, NextResponse } from 'next/server'
import { inscriptionSchema } from '@/lib/schemas/auth'
import { hashPassword, generateToken } from '@/lib/crypto'
import { sendConfirmationEmail } from '@/lib/email'

const DIRECTUS_URL = process.env.DIRECTUS_URL || 'http://localhost:8055'
const DIRECTUS_TOKEN = process.env.DIRECTUS_ADMIN_TOKEN || ''

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = inscriptionSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Données invalides', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { prenom, nom, email, telephone, ville_ci, ville_gabon_origine, password } = parsed.data

    // Vérifier si l'email existe déjà
    const checkRes = await fetch(
      `${DIRECTUS_URL}/items/membres?filter[email][_eq]=${encodeURIComponent(email)}&fields=id`,
      { headers: { Authorization: `Bearer ${DIRECTUS_TOKEN}` } }
    )
    const checkData = await checkRes.json()
    if (checkData?.data?.length > 0) {
      return NextResponse.json(
        { error: 'Un compte avec cet email existe déjà.' },
        { status: 409 }
      )
    }

    // Hash du mot de passe
    const password_hash = await hashPassword(password)

    // Token de confirmation
    const confirmation_token = generateToken()
    const token_expiry = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()

    // Créer le membre dans Directus
    const createRes = await fetch(`${DIRECTUS_URL}/items/membres`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${DIRECTUS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prenom,
        nom,
        email,
        telephone: telephone || null,
        ville_ci,
        ville_gabon_origine,
        password_hash,
        statut: 'en_attente',
        role: 'membre',
        visibilite_profil: 'membres',
        confirmation_token,
        token_expiry,
      }),
    })

    if (!createRes.ok) {
      const err = await createRes.json()
      console.error('Directus create error:', err)
      return NextResponse.json({ error: 'Erreur lors de la création du compte.' }, { status: 500 })
    }

    // Envoyer l'email de confirmation
    await sendConfirmationEmail(email, prenom, confirmation_token)

    return NextResponse.json({
      success: true,
      message: 'Compte créé ! Vérifiez votre email pour confirmer votre inscription.',
    })
  } catch (error) {
    console.error('Inscription error:', error)
    return NextResponse.json({ error: 'Erreur serveur. Veuillez réessayer.' }, { status: 500 })
  }
}
