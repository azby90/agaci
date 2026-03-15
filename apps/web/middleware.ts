import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const isAuthPage = nextUrl.pathname.startsWith('/connexion') ||
    nextUrl.pathname.startsWith('/inscription') ||
    nextUrl.pathname.startsWith('/mot-de-passe-oublie') ||
    nextUrl.pathname.startsWith('/reinitialiser-mot-de-passe')

  const isProtectedPage = nextUrl.pathname.startsWith('/membres')

  // Rediriger les membres connectés hors des pages auth
  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL('/membres/profil', nextUrl))
  }

  // Protéger les pages membres
  if (!isLoggedIn && isProtectedPage) {
    const callbackUrl = encodeURIComponent(nextUrl.pathname)
    return NextResponse.redirect(new URL(`/connexion?callbackUrl=${callbackUrl}`, nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|manifest.json|icons).*)'],
}
