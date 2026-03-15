/**
 * IMAGES : À remplacer par les photos officielles AGACI dès qu'elles sont disponibles.
 * Toutes les URLs sont regroupées ici pour faciliter la mise à jour.
 * Source actuelle : Pexels (licence libre, personnes africaines / diaspora)
 */

import Image from 'next/image'
import Link from 'next/link'
import {
  Users,
  Briefcase,
  GraduationCap,
  TrendingUp,
  Award,
  Heart,
  ArrowRight,
  CheckCircle,
  BookOpen,
  Calendar,
  FileText,
  Shield,
} from 'lucide-react'
import { HeroSection } from '@/components/home/hero-section'
import { StatsSection } from '@/components/home/stats-section'
import { ScrollReveal } from '@/components/home/scroll-reveal'

// ── Catalogue des images ─────────────────────────────────────────────────
// Remplacer chaque URL par la photo AGACI correspondante
const IMAGES = {
  // Section Mission — membres A.GA.CI (non utilisé visuellement, conservé pour référence)
  missionPrincipale:
    '/evenements/10-septembre-2024/472912966_122161464380303209_4375934389254208052_n.jpg',
  missionPortrait:
    '/evenements/10-septembre-2024/473804304_122161464506303209_2255924072202462083_n.jpg',

  // Section Citation — décor officiel A.GA.CI (fête indépendance Gabon, sept. 2024)
  communaute:
    '/evenements/10-septembre-2024/474095692_122161466390303209_805723501387174482_n.jpg',

  // Actualités — photos d'événements associatifs africains
  actu1:
    'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2',
  actu2:
    'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2',
  actu3:
    'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2',

  // CTA final — membres A.GA.CI en tenues traditionnelles gabonaises
  ctaBackground:
    '/evenements/10-septembre-2024/473729648_122161464698303209_6768768865968420815_n.jpg',
}

/* ─── Données ─────────────────────────────────────────────────────────── */

const pillars = [
  {
    number: '01',
    title: 'Promouvoir',
    description:
      "Faire rayonner l'excellence gabonaise en Côte d'Ivoire et au-delà. Valoriser les talents et les succès.",
    bg: 'bg-gabon-green',
    checks: ['Annuaire des personnalités', 'Prix AGACI', 'Visibilité communautaire'],
  },
  {
    number: '02',
    title: 'Outiller',
    description:
      "Donner les moyens concrets à chaque membre pour réussir son projet de vie en Côte d'Ivoire.",
    bg: 'bg-gabon-blue',
    checks: ['Espace opportunités', 'Volet jeunes', 'Réseau entrepreneurial'],
  },
  {
    number: '03',
    title: 'Unir',
    description:
      'Structurer la fraternité et renforcer la confiance au sein de notre communauté diasporique.',
    bg: 'bg-ci-orange',
    checks: ['Gouvernance transparente', 'Événements culturels', 'Inclusion sociale'],
  },
]

const modules = [
  {
    Icon: Users,
    title: 'Annuaire des Personnalités',
    description: 'Découvrez le réseau des membres influents. Expertise, mentorat, mise en relation.',
    href: '/annuaire',
    gradient: 'from-gabon-green to-gabon-green/70',
    tag: 'Réseau',
  },
  {
    Icon: Briefcase,
    title: 'Espace Opportunités',
    description: 'Emplois, stages, ateliers et appels à projets pour vos ambitions professionnelles.',
    href: '/opportunites',
    gradient: 'from-gabon-blue to-gabon-blue/70',
    tag: 'Carrière',
  },
  {
    Icon: GraduationCap,
    title: 'Volet Jeunes',
    description: 'Accompagnement structuré des étudiants et jeunes professionnels gabonais en CI.',
    href: '/jeunes',
    gradient: 'from-ci-orange to-ci-orange/70',
    tag: 'Jeunesse',
  },
  {
    Icon: TrendingUp,
    title: 'Entrepreneuriat',
    description: "Vitrine des projets membres et soutien aux porteurs d'initiatives innovantes.",
    href: '/entrepreneuriat',
    gradient: 'from-gabon-green/80 to-ci-green/60',
    tag: 'Business',
  },
  {
    Icon: Award,
    title: 'Prix AGACI',
    description: "Reconnaître l'excellence : meilleur étudiant, entrepreneur, leader communautaire.",
    href: '/prix',
    gradient: 'from-[#7c5c00] to-gabon-yellow/80',
    tag: 'Excellence',
  },
  {
    Icon: Heart,
    title: 'Inclusion Sociale',
    description: 'Accompagnement des membres vulnérables et commission sociale active et visible.',
    href: '/inclusion',
    gradient: 'from-rose-700 to-rose-500/70',
    tag: 'Solidarité',
  },
]

// Actualités basées sur les vrais événements A.GA.CI
const actualites = [
  {
    id: 1,
    categorie: 'Communauté',
    titre: "Les Retrouvailles de l'Unité — 15 mars 2025",
    extrait:
      "La Présidente de l'A.GA.CI invite tous les Gabonais résidant en Côte d'Ivoire à une grande journée de retrouvailles placée sous le signe de l'unité et du partage. Nourriture et boisson offertes.",
    date: '10 mars 2025',
    image: '/evenements/10-mars-2025/482016900_122170060946303209_917048036729286606_n.jpg',
    slug: 'retrouvailles-unite-2025',
  },
  {
    id: 2,
    categorie: 'Institutionnel',
    titre: "Fête de l'Indépendance du Gabon en Côte d'Ivoire 🇬🇦",
    extrait:
      "Retour en images sur la célébration de la fête nationale gabonaise organisée par l'A.GA.CI à Abidjan. Un moment de fierté et de fraternité pour tous les Gabonais de Côte d'Ivoire.",
    date: '10 septembre 2024',
    image: '/evenements/10-septembre-2024/472912966_122161464380303209_4375934389254208052_n.jpg',
    slug: 'fete-independance-gabon-2024',
  },
  {
    id: 3,
    categorie: 'Institutionnel',
    titre: "Mobilisation pour l'arrivée du Président Oligui Nguema à Abidjan",
    extrait:
      "L'Ambassade du Gabon en Côte d'Ivoire invite solennellement la communauté gabonaise à se mobiliser pour réserver un accueil digne au Président de la République Gabonaise lors de la cérémonie d'investiture du Président Ouattara.",
    date: '3 décembre 2025',
    image: '/logo-agaci.jpg',
    slug: 'mobilisation-presidente-oligui-2025',
  },
]

/* ─── Page ─────────────────────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <>
      {/* 1. HERO */}
      <HeroSection />

      {/* 2. STATS ANIMÉES */}
      <StatsSection />

      {/* 3. MISSION — Pleine largeur */}
      <section className="py-24 bg-white">
        <div className="container">
          <ScrollReveal>
            <div className="mx-auto max-w-4xl">
              <div className="section-label section-overline mb-4">Notre mission</div>
              <h2 className="text-4xl font-bold leading-tight mb-4 md:text-5xl">
                Un écosystème au service{' '}
                <span className="text-gabon-green">de la communauté</span>
              </h2>
              <p className="text-muted-foreground mb-12 leading-relaxed max-w-2xl text-lg">
                L&apos;A.GA.CI n&apos;est pas un simple site. C&apos;est une plateforme vivante qui
                accompagne chaque Gabonais dans son projet de vie en Côte d&apos;Ivoire — de
                l&apos;arrivée à l&apos;épanouissement.
              </p>

              <div className="grid gap-8 md:grid-cols-3">
                {pillars.map((p) => (
                  <div key={p.title} className="flex flex-col gap-4 group">
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex-shrink-0 w-12 h-12 ${p.bg} flex items-center justify-center text-white font-bold text-sm transition-transform group-hover:scale-110`}
                      >
                        {p.number}
                      </div>
                      <h3 className="font-bold text-xl">{p.title}</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed pl-16">{p.description}</p>
                    <div className="flex flex-col gap-1.5 pl-16">
                      {p.checks.map((c) => (
                        <span key={c} className="inline-flex items-center gap-1.5 text-xs text-gabon-green font-medium">
                          <CheckCircle className="h-3 w-3 flex-shrink-0" />
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-border">
                <Link
                  href="/a-propos"
                  className="inline-flex items-center gap-2 border-b-2 border-gabon-green pb-0.5 text-sm font-bold uppercase tracking-wider text-gabon-green transition-all hover:gap-4"
                >
                  En savoir plus sur l&apos;A.GA.CI
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 4. MODULES — Nos services */}
      <section className="bg-slate-50 py-24">
        <div className="container">
          <ScrollReveal>
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <div className="section-label section-overline mb-4">Services</div>
              <h2 className="text-4xl font-bold mb-4 md:text-5xl">Ce que nous offrons</h2>
              <p className="text-muted-foreground text-lg">
                Une plateforme complète pour accompagner chaque étape du parcours des Gabonais en CI.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((mod, i) => {
              const Icon = mod.Icon
              return (
                <ScrollReveal key={mod.href} delay={i * 80}>
                  <Link
                    href={mod.href}
                    className="group flex flex-col bg-white shadow-sm overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                  >
                    {/* Header carte avec gradient */}
                    <div className={`relative h-36 bg-gradient-to-br ${mod.gradient} p-6 overflow-hidden`}>
                      {/* Pattern de fond */}
                      <div className="absolute inset-0 pattern-dots" />
                      {/* Cercle décoratif */}
                      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
                      <div className="absolute -right-2 -top-2 h-16 w-16 rounded-full bg-white/10" />
                      {/* Tag */}
                      <span className="relative inline-block bg-white/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white mb-3">
                        {mod.tag}
                      </span>
                      {/* Icône */}
                      <div className="relative">
                        <Icon className="h-9 w-9 text-white transition-transform duration-300 group-hover:scale-110" />
                      </div>
                    </div>

                    {/* Corps carte */}
                    <div className="flex flex-col flex-1 p-6">
                      <h3 className="font-bold text-lg mb-2 group-hover:text-gabon-green transition-colors">
                        {mod.title}
                      </h3>
                      <p className="text-sm text-muted-foreground flex-1 leading-relaxed">
                        {mod.description}
                      </p>
                      <div className="mt-5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gabon-green transition-all group-hover:gap-3">
                        Découvrir
                        <ArrowRight className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* 5. PHOTO STRIP — Citation communauté */}
      <section className="relative h-[420px] overflow-hidden">
        {/* Rassemblement communautaire — Gabonais d'Abidjan */}
        <Image
          src={IMAGES.communaute}
          alt="Rassemblement de la communauté AGACI"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-gabon-blue/95 via-gabon-blue/80 to-gabon-green/70" />
        {/* Motif */}
        <div className="absolute inset-0 pattern-dots" />

        <div className="relative container h-full flex items-center">
          <ScrollReveal className="max-w-2xl">
            <div className="h-1 w-16 bg-gabon-yellow mb-8" />
            <blockquote className="text-3xl font-bold text-white leading-tight mb-6 md:text-4xl">
              &ldquo;Ensemble, nous sommes plus forts que nos destins individuels.&rdquo;
            </blockquote>
            <cite className="not-italic text-gabon-yellow text-xs font-bold uppercase tracking-[0.2em]">
              — Bureau Exécutif AGACI
            </cite>
            <div className="mt-8">
              <Link
                href="/inscription"
                className="inline-flex items-center gap-2 bg-gabon-yellow px-7 py-3 text-sm font-bold uppercase tracking-wider text-gabon-blue transition-all hover:bg-white"
              >
                Rejoindre la communauté
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 6. ACTUALITÉS */}
      <section className="py-24 bg-white">
        <div className="container">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-12">
              <div>
                <div className="section-label section-overline mb-3">Actualités</div>
                <h2 className="text-4xl font-bold md:text-5xl">La vie de l&apos;AGACI</h2>
              </div>
              <Link
                href="/actualites"
                className="hidden sm:inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gabon-green border-b-2 border-gabon-green pb-0.5 transition-all hover:gap-4"
              >
                Toutes les actualités
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-3">
            {actualites.map((article, i) => (
              <ScrollReveal key={article.id} delay={i * 100}>
                <Link
                  href={`/actualites/${article.slug}`}
                  className="group flex flex-col bg-white border border-border overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                >
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.titre}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    {/* Overlay au hover */}
                    <div className="absolute inset-0 bg-gabon-blue/0 group-hover:bg-gabon-blue/20 transition-all duration-300" />
                    {/* Badge catégorie */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-gabon-green px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                        {article.categorie}
                      </span>
                    </div>
                  </div>

                  {/* Contenu */}
                  <div className="flex flex-col flex-1 p-6">
                    <time className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
                      {article.date}
                    </time>
                    <h3 className="font-bold text-base leading-snug mb-3 group-hover:text-gabon-green transition-colors line-clamp-2">
                      {article.titre}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-3">
                      {article.extrait}
                    </p>
                    <div className="mt-5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gabon-green transition-all group-hover:gap-3">
                      Lire l&apos;article
                      <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/actualites"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gabon-green"
            >
              Toutes les actualités <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. LIENS RAPIDES — Gouvernance */}
      <section className="bg-slate-50 py-16">
        <div className="container">
          <ScrollReveal>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                { Icon: Calendar, label: 'Événements', href: '/evenements', color: 'text-gabon-blue' },
                { Icon: BookOpen, label: 'Annuaire', href: '/annuaire', color: 'text-gabon-green' },
                { Icon: FileText, label: 'Documents', href: '/gouvernance/documents', color: 'text-ci-orange' },
                { Icon: Shield, label: 'Code éthique', href: '/gouvernance/code-ethique', color: 'text-gabon-blue' },
              ].map((item, i) => {
                const Icon = item.Icon
                return (
                  <ScrollReveal key={item.href} delay={i * 60}>
                    <Link
                      href={item.href}
                      className="group flex items-center gap-4 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <div className={`${item.color} transition-transform group-hover:scale-110`}>
                        <Icon className="h-7 w-7" />
                      </div>
                      <span className="font-semibold text-sm group-hover:text-gabon-green transition-colors">
                        {item.label}
                      </span>
                      <ArrowRight className="h-4 w-4 ml-auto text-muted-foreground opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                    </Link>
                  </ScrollReveal>
                )
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 8. CTA FINAL */}
      <section className="relative overflow-hidden py-24">
        {/* Image de fond — ambiance Abidjan / Afrique de l'Ouest */}
        <div className="absolute inset-0">
          <Image
            src={IMAGES.ctaBackground}
            alt="La communauté gabonaise à Abidjan"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gabon-green/95 to-gabon-blue/95" />
          <div className="absolute inset-0 pattern-grid" />
        </div>

        <div className="container relative text-center text-white">
          <ScrollReveal>
            <div className="mx-auto max-w-2xl">
              {/* Logo dans le CTA */}
              <div className="mb-6 flex justify-center">
                <div className="relative h-20 w-20 overflow-hidden rounded-full ring-4 ring-gabon-yellow/50 bg-white shadow-2xl">
                  <Image
                    src="/logo-agaci.jpg"
                    alt="Logo A.GA.CI"
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
              </div>
              <div className="mb-4 inline-block bg-gabon-yellow/20 border border-gabon-yellow/30 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-gabon-yellow">
                Rejoignez-nous
              </div>
              <h2 className="mb-6 text-4xl font-bold leading-tight md:text-5xl">
                Vous êtes Gabonais
                <br />
                en Côte d&apos;Ivoire ?
              </h2>
              <p className="mx-auto mb-10 max-w-lg text-lg text-white/70 leading-relaxed">
                Rejoignez la communauté AGACI et accédez à un réseau solide, des opportunités
                concrètes et un accompagnement pour réussir votre projet de vie.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/inscription"
                  className="inline-flex items-center gap-2 bg-gabon-yellow px-8 py-4 text-sm font-bold uppercase tracking-wider text-gabon-blue transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-xl"
                >
                  Créer mon compte gratuitement
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 border border-white/30 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-white/10"
                >
                  Nous contacter
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
