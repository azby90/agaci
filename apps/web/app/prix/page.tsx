import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Award, GraduationCap, TrendingUp, Star, ArrowRight, CheckCircle, Calendar, Trophy } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Prix A.GA.CI — Excellence gabonaise',
  description: "Les Prix A.GA.CI récompensent chaque année les membres les plus remarquables : meilleur étudiant, entrepreneur, leader communautaire.",
}

const categories = [
  {
    Icon: GraduationCap,
    title: 'Prix Meilleur Étudiant',
    description: "Récompense l'étudiant gabonais ayant obtenu les meilleures performances académiques en Côte d'Ivoire durant l'année.",
    criterias: ['Résultats académiques (mention très bien)', 'Engagement associatif', 'Parcours exemplaire'],
    color: 'bg-gabon-blue',
    accent: 'text-gabon-blue',
  },
  {
    Icon: TrendingUp,
    title: 'Prix Meilleur Entrepreneur',
    description: "Distingue l'entrepreneur gabonais dont le projet ou l'entreprise a eu le plus grand impact économique ou social cette année.",
    criterias: ["Impact économique mesurable", "Innovation dans le secteur", "Création d'emplois"],
    color: 'bg-gabon-green',
    accent: 'text-gabon-green',
  },
  {
    Icon: Star,
    title: 'Prix Leader Communautaire',
    description: "Honore le membre qui s'est le plus illustré dans l'animation et le rayonnement de la communauté gabonaise en CI.",
    criterias: ['Engagement bénévole', 'Rayonnement positif', 'Contribution à la cohésion'],
    color: 'bg-ci-orange',
    accent: 'text-ci-orange',
  },
]

const steps = [
  "Ouverture des candidatures (auto-candidature ou nomination par un tiers membre)",
  "Examen des dossiers par un jury composé de membres du bureau et de personnalités extérieures",
  "Sélection des finalistes et vote des membres",
  "Cérémonie annuelle de remise des Prix A.GA.CI",
]

export default function PrixPage() {
  return (
    <>
      {/* BANNIÈRE */}
      <section className="relative h-[420px] overflow-hidden bg-gabon-blue">
        <Image
          src="/evenements/10-septembre-2024/474095692_122161466390303209_805723501387174482_n.jpg"
          alt="Cérémonie A.GA.CI — Membres en tenue"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gabon-blue/95 via-gabon-blue/80 to-gabon-blue/40" />
        <div className="absolute inset-0 pattern-dots opacity-20" />
        <div className="absolute left-0 top-0 bottom-0 w-1.5 flex flex-col">
          <div className="flex-1 bg-gabon-green" />
          <div className="flex-1 bg-gabon-yellow" />
          <div className="flex-1 bg-[#003189]" />
        </div>
        <div className="container relative h-full flex flex-col justify-center pl-8">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-gabon-yellow/20 border border-gabon-yellow/30 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-gabon-yellow mb-5">
              <Award className="h-3.5 w-3.5" />
              Prix A.GA.CI
            </div>
            <h1 className="text-4xl font-bold text-white leading-tight mb-4 md:text-5xl">
              L&apos;A.GA.CI célèbre{' '}
              <span className="text-gabon-yellow">l&apos;excellence</span>{' '}
              gabonaise
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              Chaque année, l&apos;association récompense les membres les plus méritants
              lors d&apos;une cérémonie qui réunit toute la communauté gabonaise d&apos;Abidjan.
            </p>
          </div>
        </div>
      </section>

      {/* ALERTE ÉDITION */}
      <section className="bg-gabon-yellow/10 border-b border-gabon-yellow/30 py-4">
        <div className="container flex items-center gap-4">
          <div className="flex-shrink-0 bg-gabon-yellow/20 p-2.5">
            <Calendar className="h-5 w-5 text-gabon-yellow" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm">Prochaine édition des Prix A.GA.CI</p>
            <p className="text-xs text-muted-foreground">Les candidatures pour l&apos;édition 2025 seront ouvertes prochainement. Restez connectés.</p>
          </div>
          <span className="flex-shrink-0 bg-gabon-yellow text-gabon-blue text-xs font-bold uppercase tracking-wider px-3 py-1">
            À venir
          </span>
        </div>
      </section>

      {/* CATÉGORIES */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <div className="mb-12 text-center">
            <div className="section-label section-overline mb-3">Catégories</div>
            <h2 className="text-3xl font-bold md:text-4xl">Les 3 prix de l&apos;excellence</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {categories.map((cat) => {
              const Icon = cat.Icon
              return (
                <div key={cat.title} className="bg-white p-8 shadow-sm hover:shadow-md transition-all group text-center">
                  <div className={`inline-flex items-center justify-center ${cat.color} p-4 text-white mb-6 transition-transform group-hover:scale-110`}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-bold text-lg mb-3">{cat.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">{cat.description}</p>
                  <ul className="space-y-2 text-left">
                    {cat.criterias.map((c) => (
                      <li key={c} className={`flex items-center gap-2 text-sm font-medium ${cat.accent}`}>
                        <CheckCircle className="h-3.5 w-3.5 flex-shrink-0" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* PHOTO + PROCESSUS */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] overflow-hidden shadow-xl">
              <Image
                src="/evenements/10-septembre-2024/473729648_122161464698303209_6768768865968420815_n.jpg"
                alt="Membres A.GA.CI en tenue traditionnelle — Fête indépendance"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gabon-blue/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="text-xs text-white/60 uppercase tracking-widest mb-1">A.GA.CI</div>
                <div className="text-white font-bold">Fête de l&apos;Indépendance du Gabon — Abidjan 2024</div>
              </div>
            </div>
            <div>
              <div className="section-label section-overline mb-4">Comment ça fonctionne</div>
              <h2 className="text-3xl font-bold mb-6">Le processus de sélection</h2>
              <ol className="space-y-5">
                {steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="flex-shrink-0 flex h-8 w-8 items-center justify-center bg-gabon-green text-white text-sm font-bold">
                      {i + 1}
                    </span>
                    <p className="text-muted-foreground leading-relaxed pt-1">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* GALERIE — membres en tenue */}
      <section className="py-16 bg-slate-50 border-y">
        <div className="container">
          <div className="mb-10 text-center">
            <div className="section-label section-overline mb-3">Communauté</div>
            <h2 className="text-3xl font-bold">La communauté A.GA.CI en fête</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { src: '/evenements/10-septembre-2024/473788972_122161464554303209_8494411412001588456_n.jpg', alt: 'Membres A.GA.CI' },
              { src: '/evenements/10-septembre-2024/473830782_122161464374303209_41422428172566188_n.jpg', alt: 'Membres A.GA.CI — Fête indépendance' },
              { src: '/evenements/10-septembre-2024/473708048_122161464320303209_2708571684011477927_n.jpg', alt: 'Membres A.GA.CI en tenue' },
              { src: '/evenements/10-septembre-2024/474043951_122161464266303209_40395405686457083_n.jpg', alt: 'Membres A.GA.CI — Gabon' },
            ].map((img, i) => (
              <div key={i} className={`relative overflow-hidden shadow-md ${i % 2 === 1 ? 'mt-6' : ''}`} style={{ aspectRatio: '1' }}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="25vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-agaci py-16 text-white">
        <div className="container text-center">
          <Trophy className="h-10 w-10 text-gabon-yellow mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Vous méritez d&apos;être reconnu(e)</h2>
          <p className="text-white/75 max-w-lg mx-auto mb-8 text-lg">
            Devenez membre de l&apos;A.GA.CI pour pouvoir candidater aux Prix de l&apos;excellence
            et faire partie de notre communauté.
          </p>
          <Link
            href="/inscription"
            className="inline-flex items-center gap-2 bg-gabon-yellow px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-gabon-blue transition-all hover:bg-white"
          >
            Rejoindre l&apos;A.GA.CI <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
