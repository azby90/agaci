const RESEND_API_KEY = process.env.RESEND_API_KEY
const FROM_EMAIL = `${process.env.EMAIL_FROM_NAME || 'AGACI'} <${process.env.EMAIL_FROM || 'noreply@agaci.org'}>`
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

async function sendEmail(to: string, subject: string, html: string) {
  if (!RESEND_API_KEY) {
    console.log(`[DEV EMAIL] To: ${to}\nSubject: ${subject}\n${html}`)
    return { success: true }
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: FROM_EMAIL, to, subject, html }),
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(`Email error: ${JSON.stringify(error)}`)
  }

  return { success: true }
}

export async function sendConfirmationEmail(
  email: string,
  prenom: string,
  token: string
) {
  const confirmUrl = `${APP_URL}/api/auth/confirmer-email?token=${token}`
  return sendEmail(
    email,
    'Confirmez votre inscription à l\'AGACI',
    `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #003189; padding: 24px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px;">AGACI</h1>
        <p style="color: rgba(255,255,255,0.7); margin: 4px 0 0;">Ressortissants Gabonais en Côte d'Ivoire</p>
      </div>
      <div style="padding: 32px; background: #f9fafb;">
        <h2 style="color: #003189;">Bienvenue, ${prenom} !</h2>
        <p style="color: #374151; line-height: 1.6;">
          Merci pour votre inscription à la plateforme AGACI. Pour activer votre compte,
          veuillez cliquer sur le bouton ci-dessous dans les <strong>24 heures</strong>.
        </p>
        <div style="text-align: center; margin: 32px 0;">
          <a href="${confirmUrl}"
             style="background: #009e60; color: white; padding: 14px 32px; border-radius: 6px;
                    text-decoration: none; font-weight: 600; display: inline-block;">
            Confirmer mon inscription
          </a>
        </div>
        <p style="color: #6b7280; font-size: 14px;">
          Si le bouton ne fonctionne pas, copiez ce lien dans votre navigateur :<br/>
          <a href="${confirmUrl}" style="color: #009e60;">${confirmUrl}</a>
        </p>
      </div>
      <div style="padding: 16px; text-align: center; color: #9ca3af; font-size: 12px;">
        © ${new Date().getFullYear()} AGACI — Abidjan, Côte d'Ivoire
      </div>
    </div>
    `
  )
}

export async function sendPasswordResetEmail(
  email: string,
  prenom: string,
  token: string
) {
  const resetUrl = `${APP_URL}/reinitialiser-mot-de-passe?token=${token}`
  return sendEmail(
    email,
    'Réinitialisation de votre mot de passe AGACI',
    `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #003189; padding: 24px; text-align: center;">
        <h1 style="color: white; margin: 0;">AGACI</h1>
      </div>
      <div style="padding: 32px; background: #f9fafb;">
        <h2 style="color: #003189;">Réinitialisation de mot de passe</h2>
        <p style="color: #374151; line-height: 1.6;">
          Bonjour ${prenom}, vous avez demandé la réinitialisation de votre mot de passe.
          Ce lien est valable <strong>1 heure</strong>.
        </p>
        <div style="text-align: center; margin: 32px 0;">
          <a href="${resetUrl}"
             style="background: #009e60; color: white; padding: 14px 32px; border-radius: 6px;
                    text-decoration: none; font-weight: 600; display: inline-block;">
            Réinitialiser mon mot de passe
          </a>
        </div>
        <p style="color: #6b7280; font-size: 13px;">
          Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.
        </p>
      </div>
    </div>
    `
  )
}

export async function sendWelcomeEmail(email: string, prenom: string) {
  return sendEmail(
    email,
    `Bienvenue dans la communauté AGACI, ${prenom} !`,
    `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #009e60, #003189); padding: 32px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Bienvenue, ${prenom} !</h1>
        <p style="color: rgba(255,255,255,0.85); margin-top: 8px;">Votre compte AGACI est maintenant actif.</p>
      </div>
      <div style="padding: 32px; background: #f9fafb;">
        <p style="color: #374151; line-height: 1.6;">
          Vous faites désormais partie de la communauté des Ressortissants Gabonais en Côte d'Ivoire.
          Voici ce que vous pouvez faire dès maintenant :
        </p>
        <ul style="color: #374151; line-height: 2;">
          <li>📋 Compléter votre profil</li>
          <li>🌐 Parcourir l'annuaire des personnalités</li>
          <li>💼 Consulter les opportunités d'emploi et de stage</li>
          <li>🤝 Rejoindre les prochains événements</li>
        </ul>
        <div style="text-align: center; margin-top: 24px;">
          <a href="${APP_URL}/membres/profil"
             style="background: #009e60; color: white; padding: 14px 32px; border-radius: 6px;
                    text-decoration: none; font-weight: 600;">
            Accéder à mon espace
          </a>
        </div>
      </div>
    </div>
    `
  )
}
