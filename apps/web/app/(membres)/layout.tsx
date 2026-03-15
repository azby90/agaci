import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { User, Settings, LogOut, LayoutDashboard } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default async function MembresLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (!session?.user) {
    redirect('/connexion')
  }

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Barre membres */}
      <div className="border-b bg-white shadow-sm">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/membres/tableau-de-bord" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
              <LayoutDashboard className="h-4 w-4" />
              Tableau de bord
            </Link>
            <Link href="/membres/profil" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
              <User className="h-4 w-4" />
              Mon profil
            </Link>
            <Link href="/membres/parametres" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
              <Settings className="h-4 w-4" />
              Paramètres
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              {session.user.name}
            </span>
            <form action={async () => {
              'use server'
              const { signOut } = await import('@/lib/auth')
              await signOut({ redirectTo: '/' })
            }}>
              <Button type="submit" variant="ghost" size="sm">
                <LogOut className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div className="container py-8">{children}</div>
    </div>
  )
}
