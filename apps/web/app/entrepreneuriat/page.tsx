import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { TrendingUp, Lightbulb, Handshake, BarChart3, ArrowRight, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Entrepreneuriat — A.GA.CI',
  description: "Soutien aux entrepreneurs gabonais en Côte d'Ivoire : vitrine de projets, mise en réseau et accompagnement.",
}

const services = [
  {
    Icon: Lightbulb,
    title: 'Vitrine de projets',
    description: 'Présentez votre projet ou entreprise à toute la communauté gabonaise et aux partenaires ivoiriens.',
    points: ['Fiche projet détaillée', 'Visibilité communautaire', 'Mise en avant sur la plateforme'],
    color: 'bg-gabon-yellow',
  },
  {
    Icon: Handshake,
    title: 'Mise en réseau',
    description: "Rencontrez des entrepreneurs, investisseurs potentiels et partenaires commerciaux via l'annuaire.",
    points: ['Annuaire des membres', 'Événements networking', 'Mise en relation directe'],
    color: 'bg-gabon-green',
  },
  {
    Icon: BarChart3,
    title: 'Ateliers & formation',
    description: 'Sessions sur la création d\'entreprise, gestion financière, marketing digital et réglementation locale.',
    points: ['Création d\'entreprise en CI', 'Gestion & comptabilité', 'Marketing digital'],
    color: 'bg-gabon-blue',
  },
  {
    Icon: TrendingUp,
    title: 'Accès au financement',
    description: 'Information sur les opportunités de financement, fonds d\'amorçage et partenariats bancaires.',
    points: ['Appels à projets', 'Fonds d\'amorçage', 'Partenaires bancaires'],
    color: 'bg-ci-orange',
  },
]

const sectors = [
  'Commerce & Distribution', 'Technologies & Numérique', 'Agro-alimentaire',
  'BTP & Immobilier', 'Services aux entreprises', 'Santé & Bien-être',
  'Éducation & Formation', 'Culture & Médias',
]

export default function EntrepreneuriatPage() {
  return (
    <>
      {/* BANNIÈRE */}
      <section className="relative h-[420px] overflow-hidden bg-gabon-blue">
        <Image
          src="/evenements/10-septembre-2024/473804304_122161464506303209_2255924072202462083_n.jpg"
          alt="Membres A.GA.CI — Entrepreneurs gabonais"
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
              <TrendingUp className="h-3.5 w-3.5" />
              Entrepreneuriat
            </div>
            <h1 className="text-4xl font-bold text-white leading-tight mb-4 md:text-5xl">
              L&apos;A.GA.CI,{' '}
              <span className="text-gabon-yellow">incubateur</span>{' '}
              communautaire
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              Porteurs de projets et chefs d&apos;entreprise gabonais : l&apos;association
              vous accompagne pour réussir votre aventure entrepreneuriale en Côte d&apos;Ivoire.
            </p>
          </div>
        </div>
      </section>

      {/* ACCOMPAGNEMENT */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <div className="mb-12 text-center">
            <div className="section-label section-overline mb-3">Accompagnement</div>
            <h2 className="text-3xl font-bold md:text-4xl">Notre soutien aux entrepreneurs</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {services.map((svc) => {
              const Icon = svc.Icon
              return (
                <div key={svc.title} className="bg-white p-8 shadow-sm hover:shadow-md transition-all group">
                  <div className="flex items-start gap-5">
                    <div className={`flex-shrink-0 ${svc.color} p-3 text-white transition-transform group-hover:scale-110`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2">{svc.title}</h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed text-sm">{svc.description}</p>
                      <ul className="space-y-1.5">
                        {svc.points.map((pt) => (
                          <li key={pt} className="flex items-center gap-2 text-sm text-gabon-green font-medium">
                            <CheckCircle className="h-3.5 w-3.5 flex-shrink-0" />
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* SECTEURS */}
      <section className="py-16 bg-white border-y">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="section-label section-overline mb-4">Secteurs</div>
            <h2 className="text-3xl font-bold mb-8">Secteurs représentés dans la communauté</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {sectors.map((sector) => (
                <span key={sector} className="border border-gabon-green/30 bg-gabon-green/5 px-5 py-2 text-sm font-medium text-gabon-green">
                  {sector}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PHOTO + TEXTE */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] overflow-hidden shadow-xl">
              <Image
                src="/evenements/10-septembre-2024/472912966_122161464380303209_4375934389254208052_n.jpg"
                alt="Membres A.GA.CI — Fête indépendance"
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
              <div className="section-label section-overline mb-4">Le réseau fait la force</div>
              <h2 className="text-3xl font-bold mb-5">Entreprendre ensemble au sein de la communauté</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                L&apos;annuaire des membres A.GA.CI recense des professionnels dans tous les secteurs.
                Trouvez des collaborateurs, des mentors ou vos premiers clients au sein de la communauté
                gabonaise d&apos;Abidjan.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/annuaire"
                  className="inline-flex items-center gap-2 bg-gabon-green px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Explorer l&apos;annuaire <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/opportunites"
                  className="inline-flex items-center gap-2 border border-gabon-green px-6 py-3 text-sm font-bold uppercase tracking-wider text-gabon-green transition-all hover:bg-gabon-green hover:text-white"
                >
                  Voir les opportunités <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-agaci py-16 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Faites partie de l&apos;écosystème A.GA.CI</h2>
          <p className="text-white/75 max-w-lg mx-auto mb-8 text-lg">
            Inscrivez-vous pour présenter vos projets, accéder au réseau et bénéficier
            de l&apos;accompagnement de la communauté gabonaise d&apos;Abidjan.
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
