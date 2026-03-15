import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Users, Target, Heart, MapPin, ArrowRight, CheckCircle, Globe, Handshake } from 'lucide-react'

export const metadata: Metadata = {
  title: "À propos — A.GA.CI",
  description: "Découvrez l'Association des Gabonais de Côte d'Ivoire : sa mission, ses valeurs et son engagement pour la communauté gabonaise à Abidjan.",
}

const values = [
  {
    Icon: Users,
    title: 'Fraternité',
    description: "Nous cultivons des liens solides entre tous les Gabonais établis en Côte d'Ivoire, quelle que soit leur région d'origine ou leur parcours.",
    color: 'bg-gabon-green',
  },
  {
    Icon: Target,
    title: 'Excellence',
    description: "Nous encourageons chaque membre à donner le meilleur de lui-même et à rayonner positivement dans sa sphère professionnelle et sociale.",
    color: 'bg-gabon-blue',
  },
  {
    Icon: Heart,
    title: 'Solidarité',
    description: "Face aux difficultés, nous n'abandonnons personne. Notre commission sociale veille à l'accompagnement des membres en situation de vulnérabilité.",
    color: 'bg-ci-orange',
  },
]

const pilliers = [
  { label: 'Entraide & solidarité communautaire' },
  { label: 'Soutien aux étudiants et jeunes professionnels' },
  { label: 'Accompagnement des entrepreneurs gabonais' },
  { label: 'Célébration de la culture et de l\'identité gabonaise' },
  { label: 'Défense des intérêts de la diaspora gabonaise en CI' },
  { label: 'Renforcement des liens Gabon – Côte d\'Ivoire' },
]

export default function AProposPage() {
  return (
    <>
      {/* BANNIÈRE */}
      <section className="relative h-[420px] overflow-hidden bg-gabon-blue">
        <Image
          src="/evenements/10-septembre-2024/474095692_122161466390303209_805723501387174482_n.jpg"
          alt="Membres A.GA.CI — Fête de l'Indépendance"
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
              <Globe className="h-3.5 w-3.5" />
              À propos
            </div>
            <h1 className="text-4xl font-bold text-white leading-tight mb-4 md:text-5xl">
              L&apos;A.GA.CI,{' '}
              <span className="text-gabon-yellow">votre maison</span>{' '}
              loin du Gabon
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              Association des Gabonais de Côte d&apos;Ivoire — rassembler, outiller
              et faire rayonner la communauté gabonaise d&apos;Abidjan depuis 2024.
            </p>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="section-label section-overline mb-4">Notre mission</div>
              <h2 className="text-3xl font-bold mb-5">Un pont entre deux nations amies</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                L&apos;A.GA.CI a pour vocation de <strong>promouvoir l&apos;excellence gabonaise</strong>,
                d&apos;outiller ses membres pour réussir leur projet de vie en Côte d&apos;Ivoire, et de
                maintenir des liens forts avec le Gabon. Nous sommes un pont entre deux nations amies,
                au service de chaque Gabonais en Côte d&apos;Ivoire.
              </p>
              <ul className="space-y-2.5">
                {pilliers.map((p) => (
                  <li key={p.label} className="flex items-start gap-2.5 text-sm text-gabon-green font-medium">
                    <CheckCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                    {p.label}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden shadow-xl">
              <Image
                src="/evenements/10-septembre-2024/473804304_122161464506303209_2255924072202462083_n.jpg"
                alt="Membres A.GA.CI — Fête indépendance Gabon 2024"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gabon-blue/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="text-xs text-white/60 uppercase tracking-widest mb-1">A.GA.CI · Abidjan</div>
                <div className="text-white font-bold">10 Août 2024 — Fête de l&apos;Indépendance du Gabon</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALEURS */}
      <section className="py-16 bg-white border-y">
        <div className="container">
          <div className="mb-12 text-center">
            <div className="section-label section-overline mb-3">Valeurs</div>
            <h2 className="text-3xl font-bold">Ce qui nous unit</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {values.map((v) => {
              const Icon = v.Icon
              return (
                <div key={v.title} className="bg-white p-8 shadow-sm hover:shadow-md transition-all group border border-slate-100 text-center">
                  <div className={`inline-flex items-center justify-center ${v.color} p-4 text-white mb-5 transition-transform group-hover:scale-110`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-xl mb-3">{v.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{v.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* IMPLANTATION + PHOTO */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-2 gap-3">
              <div className="relative overflow-hidden shadow-lg" style={{ aspectRatio: '1' }}>
                <Image
                  src="/evenements/10-septembre-2024/472912966_122161464380303209_4375934389254208052_n.jpg"
                  alt="Membres A.GA.CI"
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
              <div className="relative overflow-hidden shadow-lg mt-6" style={{ aspectRatio: '1' }}>
                <Image
                  src="/evenements/17-aout-2024/472717463_122160085514303209_4765024096880510408_n.jpg"
                  alt="Journée sportive A.GA.CI"
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
              <div className="relative overflow-hidden shadow-lg -mt-6" style={{ aspectRatio: '1' }}>
                <Image
                  src="/evenements/10-septembre-2024/473800438_122161465148303209_3963001426986636991_n.jpg"
                  alt="Membres A.GA.CI — Gabon"
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
              <div className="relative overflow-hidden shadow-lg" style={{ aspectRatio: '1' }}>
                <Image
                  src="/evenements/10-mars-2025/482016900_122170060946303209_917048036729286606_n.jpg"
                  alt="Retrouvailles de l'Unité 2025"
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
            </div>
            <div>
              <div className="section-label section-overline mb-4">Abidjan, Côte d&apos;Ivoire</div>
              <h2 className="text-3xl font-bold mb-5">Une association reconnue, active depuis 2024</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Fondée à Abidjan en 2024, l&apos;A.GA.CI est officiellement reconnue et opère
                à travers des réunions régulières, des événements communautaires et cette plateforme
                numérique. En moins de 2 ans, l&apos;association compte déjà plus de 200 membres actifs
                et a organisé plus de 50 événements.
              </p>
              <div className="flex items-center gap-3 mb-6 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-ci-orange flex-shrink-0" />
                <span>Siège social : Abidjan, Côte d&apos;Ivoire</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Handshake className="h-4 w-4 text-gabon-green flex-shrink-0" />
                <span>Partenaire officiel de l&apos;Ambassade du Gabon à Abidjan</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-agaci py-16 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Rejoignez la communauté A.GA.CI</h2>
          <p className="text-white/75 max-w-lg mx-auto mb-8 text-lg">
            Vous êtes Gabonais en Côte d&apos;Ivoire ? L&apos;A.GA.CI est votre maison.
            Inscrivez-vous et faites partie de notre réseau.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/inscription"
              className="inline-flex items-center gap-2 bg-gabon-yellow px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-gabon-blue transition-all hover:bg-white"
            >
              Créer mon compte <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/equipe"
              className="inline-flex items-center gap-2 border border-white/30 px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:border-white/60 hover:bg-white/10"
            >
              Rencontrer l&apos;équipe
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
