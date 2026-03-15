import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { GraduationCap, Briefcase, Users, BookOpen, ArrowRight, CheckCircle, Trophy, Star } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Volet Jeunes — Étudiants & Jeunes Professionnels',
  description: "L'A.GA.CI accompagne les étudiants, stagiaires et jeunes fonctionnaires gabonais en Côte d'Ivoire.",
}

const programmes = [
  {
    Icon: BookOpen,
    title: 'Orientation académique',
    description: "Conseils pour choisir la bonne filière, s'inscrire dans les universités ivoiriennes et naviguer le système éducatif local.",
    points: ["Guide d'installation en CI", 'Universités & grandes écoles', 'Démarches administratives'],
    color: 'bg-gabon-green',
  },
  {
    Icon: Briefcase,
    title: 'Insertion professionnelle',
    description: 'Ateliers CV, préparation aux entretiens, mise en relation avec des entreprises partenaires pour stages et emplois.',
    points: ['Ateliers CV & entretiens', 'Offres de stages ciblées', 'Réseau employeurs partenaires'],
    color: 'bg-gabon-blue',
  },
  {
    Icon: Users,
    title: 'Mentorat personnalisé',
    description: "Chaque jeune membre peut être jumelé avec un aîné de l'annuaire des personnalités pour un suivi sur-mesure.",
    points: ['Matching jeunes ↔ mentors', 'Suivi personnalisé', 'Réseau de leaders gabonais'],
    color: 'bg-ci-orange',
  },
  {
    Icon: Trophy,
    title: 'Sport & culture',
    description: "Journées sportives, tournois de football et événements culturels pour renforcer les liens entre les jeunes Gabonais.",
    points: ['Tournois sportifs', 'Activités culturelles', 'Cohésion communautaire'],
    color: 'bg-gabon-green',
  },
]

export default function JeunesPage() {
  return (
    <>
      {/* BANNIÈRE */}
      <section className="relative h-[420px] overflow-hidden bg-gabon-blue">
        <Image
          src="/evenements/17-aout-2024/472717463_122160085514303209_4765024096880510408_n.jpg"
          alt="Journée sportive A.GA.CI — Jeunes gabonais"
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
              <GraduationCap className="h-3.5 w-3.5" />
              Volet Jeunes
            </div>
            <h1 className="text-4xl font-bold text-white leading-tight mb-4 md:text-5xl">
              L&apos;A.GA.CI,{' '}
              <span className="text-gabon-yellow">tremplin</span>{' '}
              pour la jeunesse gabonaise
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              Étudiants, stagiaires, jeunes fonctionnaires — accompagnement de l&apos;arrivée
              jusqu&apos;à l&apos;épanouissement en Côte d&apos;Ivoire.
            </p>
          </div>
        </div>
      </section>

      {/* PROGRAMMES */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <div className="mb-12 text-center">
            <div className="section-label section-overline mb-3">Programmes</div>
            <h2 className="text-3xl font-bold md:text-4xl">Ce que nous offrons aux jeunes</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {programmes.map((prog) => {
              const Icon = prog.Icon
              return (
                <div key={prog.title} className="bg-white p-8 shadow-sm hover:shadow-md transition-all group">
                  <div className="flex items-start gap-5">
                    <div className={`flex-shrink-0 ${prog.color} p-3 text-white transition-transform group-hover:scale-110`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2">{prog.title}</h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed text-sm">{prog.description}</p>
                      <ul className="space-y-1.5">
                        {prog.points.map((pt) => (
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

      {/* PHOTO — Journée sportive */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="section-label section-overline mb-4">En images</div>
              <h2 className="text-3xl font-bold mb-5">Journées sportives & culturelles</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                L&apos;A.GA.CI organise régulièrement des journées sportives et culturelles pour
                renforcer les liens entre les jeunes Gabonais d&apos;Abidjan. Tournois de football,
                remises de trophées — autant d&apos;occasions de tisser des liens durables.
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                <Star className="h-4 w-4 text-gabon-yellow flex-shrink-0" />
                Journée sportive et culturelle — Août 2024 · Abidjan
              </div>
              <Link
                href="/opportunites"
                className="inline-flex items-center gap-2 bg-gabon-green px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition-all hover:-translate-y-0.5 hover:bg-gabon-blue hover:shadow-lg"
              >
                Voir les opportunités jeunes
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-square overflow-hidden shadow-lg">
                <Image
                  src="/evenements/17-aout-2024/472684118_122160085316303209_2451921040733728269_n.jpg"
                  alt="Équipe A.GA.CI"
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
              <div className="relative aspect-square overflow-hidden shadow-lg mt-6">
                <Image
                  src="/evenements/17-aout-2024/472768386_122160085532303209_4559920364045506849_n.jpg"
                  alt="Journée sportive A.GA.CI"
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
              <div className="relative aspect-square overflow-hidden shadow-lg -mt-6">
                <Image
                  src="/evenements/17-aout-2024/472774485_122160085496303209_8100317597911165147_n.jpg"
                  alt="Journée sportive A.GA.CI"
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
              <div className="relative aspect-square overflow-hidden shadow-lg">
                <Image
                  src="/evenements/17-aout-2024/472854914_122160085490303209_8246897765133816280_n.jpg"
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

      {/* CTA */}
      <section className="gradient-agaci py-16 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Tu es jeune Gabonais en CI ?</h2>
          <p className="text-white/75 max-w-lg mx-auto mb-8 text-lg">
            Rejoins le réseau A.GA.CI et bénéficie de l&apos;accompagnement, du mentorat
            et du soutien de toute la communauté gabonaise d&apos;Abidjan.
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
