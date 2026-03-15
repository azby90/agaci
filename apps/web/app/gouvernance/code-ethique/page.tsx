import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, BookOpen, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: "Code d'éthique — AGACI",
  description: "Les valeurs, principes et règles de conduite qui guident l'AGACI.",
}

const valeurs = [
  { titre: 'Fraternité', description: "Nous nous considérons comme une famille. Chaque membre est un frère ou une sœur que nous devons soutenir, respecter et accompagner." },
  { titre: 'Intégrité', description: "Nous agissons avec honnêteté, droiture et transparence dans toutes nos actions et décisions." },
  { titre: 'Excellence', description: "Nous encourageons et valorisons l'effort, le mérite et la réussite. Chaque Gabonais en CI est un ambassadeur de l'excellence gabonaise." },
  { titre: 'Solidarité', description: "Nous ne laissons personne derrière. Face aux difficultés, la communauté AGACI se mobilise pour soutenir ses membres vulnérables." },
  { titre: 'Respect', description: "Nous respectons la dignité, les opinions et les différences de chacun. La diversité est une richesse." },
  { titre: 'Engagement', description: "Nous nous impliquons activement dans la vie de l'association et de la communauté gabonaise en Côte d'Ivoire." },
]

const regles = [
  "Respecter les statuts et le règlement intérieur de l'AGACI",
  "Préserver l'image et la réputation de l'association dans tout acte public",
  "Participer aux activités et réunions dans un esprit constructif",
  "Refuser toute forme de discrimination, de harcèlement ou de violence",
  "Protéger les données personnelles des membres",
  "Déclarer tout conflit d'intérêts avant de participer à une décision",
  "Utiliser les ressources de l'association à bon escient et avec honnêteté",
  "Signaler tout comportement contraire à ce code au bureau de l'AGACI",
]

export default function CodeEthiquePage() {
  return (
    <div className="py-10">
      <div className="container max-w-3xl">
        <Link href="/gouvernance" className="mb-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />Gouvernance
        </Link>
        <div className="mb-8 rounded-xl bg-gradient-to-r from-gabon-blue to-gabon-green p-8 text-white text-center">
          <BookOpen className="mx-auto mb-3 h-10 w-10" />
          <h1 className="text-2xl font-bold">Code d&apos;éthique AGACI</h1>
          <p className="mt-2 text-white/80 text-sm">Les valeurs et principes qui guident chaque membre de notre communauté</p>
        </div>
        <div className="mb-8 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold">Préambule</h2>
          <p className="text-muted-foreground leading-relaxed">
            L&apos;AGACI est fondée sur des valeurs humaines fortes. Ce code exprime les engagements que chaque membre
            prend envers la communauté en adhérant à l&apos;association. Il constitue le socle de confiance qui nous unit.
          </p>
        </div>
        <div className="mb-8">
          <h2 className="mb-4 text-xl font-bold">Nos valeurs fondamentales</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {valeurs.map((v) => (
              <div key={v.titre} className="rounded-xl border bg-white p-5 shadow-sm">
                <h3 className="mb-2 font-semibold text-gabon-green">{v.titre}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold">Règles de conduite</h2>
          <p className="mb-4 text-sm text-muted-foreground">En tant que membre de l&apos;AGACI, je m&apos;engage à :</p>
          <ul className="space-y-3">
            {regles.map((r, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-gabon-green" />
                <span className="text-sm text-foreground/80">{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
