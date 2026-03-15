import Link from 'next/link'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gabon-blue/5 via-white to-gabon-green/5">
      <div className="container flex min-h-screen flex-col items-center justify-center py-12">
        {/* Logo */}
        <Link href="/" className="mb-8 flex items-center gap-3">
          <div className="flex items-center gap-1">
            <div className="h-7 w-2 rounded-full bg-gabon-green" />
            <div className="h-7 w-2 rounded-full bg-gabon-yellow" />
            <div className="h-7 w-2 rounded-full bg-gabon-blue" />
          </div>
          <span className="font-heading text-2xl font-bold text-gabon-blue">AGACI</span>
        </Link>
        {children}
        <p className="mt-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} AGACI — Association des Ressortissants Gabonais en CI
        </p>
      </div>
    </div>
  )
}
