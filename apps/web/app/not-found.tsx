import Link from 'next/link'
import { Home, ArrowRight } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 bg-slate-50">
      <div className="font-heading text-[8rem] leading-none font-bold text-gabon-blue/10 mb-2 select-none">
        404
      </div>
      <h1 className="text-2xl font-bold mb-3">Page introuvable</h1>
      <p className="text-muted-foreground max-w-sm mx-auto mb-8">
        La page que vous cherchez n&apos;existe pas ou a été déplacée.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-gabon-green px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-gabon-blue"
        >
          <Home className="h-4 w-4" />
          Accueil
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 border border-gabon-green px-6 py-3 text-sm font-bold uppercase tracking-wider text-gabon-green transition-all hover:bg-gabon-green hover:text-white"
        >
          Contact <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
