import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Users, ArrowRight, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Équipe dirigeante — A.GA.CI',
  description: "Bureau exécutif et commissions de l'Association des Gabonais de Côte d'Ivoire.",
}

const bureau = [
  { prenom: 'Jean-Pierre', nom: 'MOUBAMBA', poste: 'Président', message: "Ensemble, faisons rayonner l'excellence gabonaise en Côte d'Ivoire." },
  { prenom: 'Marie-Claire', nom: 'OBAME', poste: 'Vice-Présidente', message: 'Notre force réside dans notre unité et notre solidarité.' },
  { prenom: 'Patrick', nom: 'NZENGUE', poste: 'Secrétaire Général', message: 'La transparence et la rigueur sont nos boussoles.' },
  { prenom: 'Arlette', nom: 'MBOUMBA', poste: 'Trésorière', message: "Chaque franc investi dans l'A.GA.CI est un investissement dans notre avenir commun." },
  { prenom: 'Roger', nom: 'IDIATA', poste: 'Relations Extérieures', message: "Tisser des ponts entre la communauté et le monde." },
  { prenom: 'Sylvie', nom: 'ONDO', poste: 'Commission Sociale', message: 'Personne ne doit être laissée pour compte.' },
]

const commissions = [
  { nom: 'Commission Sociale & Humanitaire', icon: '🤝', description: 'Solidarité et accompagnement des membres en difficulté' },
  { nom: 'Commission Entrepreneuriat & Projets', icon: '🚀', description: 'Soutien aux entrepreneurs et porteurs de projets' },
  { nom: 'Commission Jeunesse & Éducation', icon: '🎓', description: 'Orientation et insertion des étudiants gabonais' },
  { nom: 'Commission Communication & Numérique', icon: '📱', description: 'Visibilité et présence digitale de l\'association' },
  { nom: 'Commission Culture & Arts', icon: '🎨', description: 'Promotion de la culture et de l\'identité gabonaise' },
  { nom: 'Commission Sport & Loisirs', icon: '⚽', description: 'Journées sportives et activités de cohésion' },
]

const colors = [
  'bg-gabon-green', 'bg-gabon-blue', 'bg-ci-orange',
  'bg-gabon-yellow', 'bg-gabon-green', 'bg-gabon-blue',
]

function Avatar({ prenom, nom, colorClass }: { prenom: string; nom: string; colorClass: string }) {
  return (
    <div className={`mx-auto flex h-20 w-20 items-center justify-center ${colorClass} text-white text-xl font-bold`}>
      {prenom[0]}{nom[0]}
    </div>
  )
}

export default function EquipePage() {
  return (
    <>
      {/* BANNIÈRE */}
      <section className="relative h-[360px] overflow-hidden bg-gabon-blue">
        <Image
          src="/evenements/10-septembre-2024/473830782_122161464374303209_41422428172566188_n.jpg"
          alt="Membres A.GA.CI — Bureau"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gabon-blue/95 via-gabon-blue/85 to-gabon-blue/50" />
        <div className="absolute inset-0 pattern-dots opacity-20" />
        <div className="absolute left-0 top-0 bottom-0 w-1.5 flex flex-col">
          <div className="flex-1 bg-gabon-green" />
          <div className="flex-1 bg-gabon-yellow" />
          <div className="flex-1 bg-[#003189]" />
        </div>
        <div className="container relative h-full flex flex-col justify-center pl-8">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-gabon-yellow/20 border border-gabon-yellow/30 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-gabon-yellow mb-5">
              <Users className="h-3.5 w-3.5" />
              Équipe dirigeante
            </div>
            <h1 className="text-4xl font-bold text-white leading-tight mb-4">
              Des femmes et des hommes{' '}
              <span className="text-gabon-yellow">engagés</span>
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              Le bureau exécutif et les commissions de l&apos;A.GA.CI — au service
              de toute la communauté gabonaise d&apos;Abidjan.
            </p>
          </div>
        </div>
      </section>

      {/* BUREAU EXÉCUTIF */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <div className="mb-12 text-center">
            <div className="section-label section-overline mb-3">Gouvernance</div>
            <h2 className="text-3xl font-bold md:text-4xl">Bureau exécutif</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {bureau.map((m, i) => (
              <div key={`${m.prenom}-${m.nom}`} className="bg-white p-8 shadow-sm hover:shadow-md transition-all group text-center">
                <Avatar prenom={m.prenom} nom={m.nom} colorClass={colors[i]} />
                <h3 className="mt-4 font-bold text-lg">{m.prenom} {m.nom}</h3>
                <p className="text-sm font-semibold text-gabon-green uppercase tracking-wide mb-3">{m.poste}</p>
                <div className="w-8 h-0.5 bg-gabon-yellow mx-auto mb-3" />
                <p className="text-xs text-muted-foreground italic leading-relaxed">
                  &ldquo;{m.message}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMISSIONS */}
      <section className="py-16 bg-white border-y">
        <div className="container">
          <div className="mb-12 text-center">
            <div className="section-label section-overline mb-3">Organisation</div>
            <h2 className="text-3xl font-bold">Nos commissions thématiques</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {commissions.map((c, i) => (
              <div key={c.nom} className="bg-slate-50 p-6 hover:shadow-md transition-all group">
                <div className="text-3xl mb-4">{c.icon}</div>
                <h3 className="font-bold mb-2">{c.nom}</h3>
                <p className="text-sm text-muted-foreground">{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ORGANIGRAMME simplifié */}
      <section className="py-16 bg-slate-50">
        <div className="container max-w-3xl">
          <div className="mb-10 text-center">
            <div className="section-label section-overline mb-3">Structure</div>
            <h2 className="text-3xl font-bold">Organigramme</h2>
          </div>
          <div className="flex flex-col items-center gap-0">
            <div className="bg-gabon-blue px-8 py-3 text-white text-sm font-bold uppercase tracking-wider shadow">
              Président
            </div>
            <div className="w-px h-6 bg-border" />
            <div className="bg-gabon-green px-8 py-3 text-white text-sm font-bold uppercase tracking-wider shadow">
              Vice-Présidente
            </div>
            <div className="w-px h-6 bg-border" />
            <div className="flex gap-4 flex-wrap justify-center">
              <div className="border-2 border-gabon-blue bg-white px-5 py-2.5 text-gabon-blue text-sm font-semibold">
                Secrétaire Général
              </div>
              <div className="border-2 border-gabon-green bg-white px-5 py-2.5 text-gabon-green text-sm font-semibold">
                Trésorière
              </div>
              <div className="border-2 border-ci-orange bg-white px-5 py-2.5 text-ci-orange text-sm font-semibold">
                Relations Extérieures
              </div>
            </div>
            <div className="w-px h-6 bg-border" />
            <div className="text-xs text-muted-foreground font-bold uppercase tracking-widest mb-4">
              6 Commissions thématiques
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {commissions.map((c) => (
                <div key={c.nom} className="border bg-white px-3 py-1.5 text-xs font-medium">
                  {c.icon} {c.nom.split('&')[0].trim()}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-agaci py-16 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Rejoignez l&apos;équipe bénévole</h2>
          <p className="text-white/75 max-w-lg mx-auto mb-8 text-lg">
            L&apos;A.GA.CI est portée par des bénévoles engagés. Si vous souhaitez
            contribuer à une commission, contactez-nous.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-gabon-yellow px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-gabon-blue transition-all hover:bg-white"
            >
              Nous contacter <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/gouvernance"
              className="inline-flex items-center gap-2 border border-white/30 px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:border-white/60 hover:bg-white/10"
            >
              Documents officiels
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
