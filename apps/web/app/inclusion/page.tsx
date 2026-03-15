import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, Phone, Shield, HandHeart, ArrowRight, CheckCircle, Users, AlertCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Inclusion Sociale — A.GA.CI',
  description: "La commission sociale de l'A.GA.CI accompagne les membres en situation de vulnérabilité et promeut l'inclusion de tous.",
}

const actions = [
  {
    Icon: Shield,
    title: "Accompagnement d'urgence",
    description: "En cas de situation difficile (accident, maladie, perte d'emploi), la commission sociale mobilise rapidement un soutien adapté.",
    points: ['Intervention rapide', 'Soutien moral & pratique', 'Réseau de solidarité activé'],
    color: 'bg-gabon-blue',
  },
  {
    Icon: HandHeart,
    title: 'Fonds de solidarité',
    description: "Un fonds alimenté par les cotisations et les dons des membres permet d'apporter une aide financière ponctuelle.",
    points: ['Aide financière ciblée', 'Transparence des comptes', 'Décision collégiale du bureau'],
    color: 'bg-gabon-green',
  },
  {
    Icon: Phone,
    title: 'Écoute & orientation',
    description: "Nos référents sociaux sont disponibles pour écouter, orienter vers les services compétents et accompagner les démarches.",
    points: ['Référents disponibles', 'Orientation administrative', 'Confidentialité garantie'],
    color: 'bg-ci-orange',
  },
  {
    Icon: Heart,
    title: 'Visites & présence',
    description: "Aucun membre ne doit faire face seul aux épreuves. Nos bénévoles organisent des visites pour les membres isolés ou malades.",
    points: ['Visites à domicile', 'Présence lors des épreuves', 'Bénévoles formés'],
    color: 'bg-gabon-yellow',
  },
]

const valeurs = [
  'Solidarité entre tous les membres',
  'Confidentialité des situations personnelles',
  'Non-jugement et bienveillance',
  'Égalité de traitement',
]

export default function InclusionPage() {
  return (
    <>
      {/* BANNIÈRE */}
      <section className="relative h-[420px] overflow-hidden bg-gabon-blue">
        <Image
          src="/evenements/10-septembre-2024/474209470_122161464914303209_4367315959090778141_n.jpg"
          alt="Communauté A.GA.CI — Solidarité"
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
              <Heart className="h-3.5 w-3.5" />
              Inclusion Sociale
            </div>
            <h1 className="text-4xl font-bold text-white leading-tight mb-4 md:text-5xl">
              L&apos;A.GA.CI,{' '}
              <span className="text-gabon-yellow">solidaire</span>{' '}
              de chaque membre
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              La commission sociale veille à ce que chaque membre, quelle que soit
              sa situation, puisse compter sur toute la communauté gabonaise d&apos;Abidjan.
            </p>
          </div>
        </div>
      </section>

      {/* ALERTE URGENCE */}
      <section className="bg-red-50 border-b border-red-200 py-4">
        <div className="container flex items-center gap-4">
          <div className="flex-shrink-0 bg-red-100 p-2.5">
            <AlertCircle className="h-5 w-5 text-red-500" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm text-red-700">Vous avez besoin d&apos;aide urgente ?</p>
            <p className="text-xs text-red-600">
              Contactez directement la commission sociale via la page contact ou signalez votre situation dans votre espace membre.
            </p>
          </div>
          <Link
            href="/contact"
            className="flex-shrink-0 border border-red-300 bg-white px-4 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors"
          >
            Contacter la commission
          </Link>
        </div>
      </section>

      {/* ACTIONS */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <div className="mb-12 text-center">
            <div className="section-label section-overline mb-3">Commission sociale</div>
            <h2 className="text-3xl font-bold md:text-4xl">Nos actions de solidarité</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {actions.map((action) => {
              const Icon = action.Icon
              return (
                <div key={action.title} className="bg-white p-8 shadow-sm hover:shadow-md transition-all group">
                  <div className="flex items-start gap-5">
                    <div className={`flex-shrink-0 ${action.color} p-3 text-white transition-transform group-hover:scale-110`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2">{action.title}</h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed text-sm">{action.description}</p>
                      <ul className="space-y-1.5">
                        {action.points.map((pt) => (
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

      {/* PHOTO + ENGAGEMENT */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="section-label section-overline mb-4">Notre engagement</div>
              <h2 className="text-3xl font-bold mb-5">Personne ne doit rester seul</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                L&apos;A.GA.CI croit en une communauté où personne n&apos;est laissé pour compte.
                Que vous traversiez une période difficile ou que vous souhaitiez aider un autre
                membre, la commission sociale est votre interlocuteur. La confidentialité des
                situations est garantie par notre charte éthique.
              </p>
              <ul className="space-y-3 mb-8">
                {valeurs.map((v) => (
                  <li key={v} className="flex items-center gap-3 text-sm font-medium text-gabon-green">
                    <CheckCircle className="h-4 w-4 flex-shrink-0" />
                    {v}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-gabon-green px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Contacter la commission <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/gouvernance/code-ethique"
                  className="inline-flex items-center gap-2 border border-gabon-green px-6 py-3 text-sm font-bold uppercase tracking-wider text-gabon-green transition-all hover:bg-gabon-green hover:text-white"
                >
                  Notre charte éthique
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative overflow-hidden shadow-lg" style={{ aspectRatio: '1' }}>
                <Image
                  src="/evenements/10-septembre-2024/474040154_122161465106303209_8537488286221398010_n.jpg"
                  alt="Membres A.GA.CI"
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
              <div className="relative overflow-hidden shadow-lg mt-6" style={{ aspectRatio: '1' }}>
                <Image
                  src="/evenements/10-septembre-2024/473800438_122161465148303209_3963001426986636991_n.jpg"
                  alt="Membres A.GA.CI — Communauté"
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
              <div className="relative overflow-hidden shadow-lg -mt-6" style={{ aspectRatio: '1' }}>
                <Image
                  src="/evenements/10-septembre-2024/474047420_122161464740303209_2114099297711092478_n.jpg"
                  alt="Membres A.GA.CI"
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
              <div className="relative overflow-hidden shadow-lg" style={{ aspectRatio: '1' }}>
                <Image
                  src="/evenements/17-aout-2024/473270493_122160085484303209_6521521079429020812_n.jpg"
                  alt="Journée sportive A.GA.CI"
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BÉNÉVOLAT */}
      <section className="py-16 bg-slate-50 border-y">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="section-label section-overline mb-4">Bénévolat</div>
            <h2 className="text-3xl font-bold mb-5">Rejoignez la commission sociale</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Vous souhaitez contribuer à l&apos;action sociale de l&apos;A.GA.CI ?
              Rejoignez la commission sociale en tant que bénévole. Votre temps et votre bienveillance
              font une différence réelle pour vos compatriotes en Côte d&apos;Ivoire.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-gabon-green px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <Users className="h-4 w-4" />
              Manifester mon intérêt
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-agaci py-16 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">La solidarité commence par l&apos;appartenance</h2>
          <p className="text-white/75 max-w-lg mx-auto mb-8 text-lg">
            Rejoignez l&apos;A.GA.CI pour bénéficier et contribuer au réseau de solidarité
            de la communauté gabonaise d&apos;Abidjan.
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
