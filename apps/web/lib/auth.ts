import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { connexionSchema } from '@/lib/schemas/auth'
import { comparePassword } from '@/lib/crypto'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Mot de passe', type: 'password' },
      },
      async authorize(credentials) {
        const parsed = connexionSchema.safeParse(credentials)
        if (!parsed.success) return null

        const { email, password } = parsed.data

        try {
          const res = await fetch(
            `${process.env.DIRECTUS_URL}/items/membres?filter[email][_eq]=${encodeURIComponent(email)}&fields=id,email,prenom,nom,password_hash,statut,role,photo`,
            {
              headers: {
                Authorization: `Bearer ${process.env.DIRECTUS_ADMIN_TOKEN}`,
              },
            }
          )

          const data = await res.json()
          const membre = data?.data?.[0]

          if (!membre) return null
          if (membre.statut !== 'actif') return null

          const passwordValid = await comparePassword(password, membre.password_hash)
          if (!passwordValid) return null

          return {
            id: membre.id,
            email: membre.email,
            name: `${membre.prenom} ${membre.nom}`,
            image: membre.photo || null,
            role: membre.role,
          }
        } catch {
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as any).role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        ;(session.user as any).role = token.role
      }
      return session
    },
  },
  pages: {
    signIn: '/connexion',
    error: '/connexion',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 jours
  },
  secret: process.env.NEXTAUTH_SECRET,
})
