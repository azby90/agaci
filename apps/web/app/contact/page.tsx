import type { Metadata } from 'next'
import Image from 'next/image'
import { Mail, MapPin, Phone, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact — A.GA.CI',
  description: "Contactez l'A.GA.CI : bureau exécutif, commission sociale, partenariats.",
}

const contacts = [
  {
    icon: Mail,
    label: 'Email général',
    value: 'contact@agaci.org',
    href: 'mailto:contact@agaci.org',
    color: 'text-gabon-green',
    bg: 'bg-gabon-green/10',
  },
  {
    icon: Phone,
    label: 'Téléphone',
    value: '+225 07 XX XX XX XX',
    href: 'tel:+22507XXXXXXXX',
    color: 'text-gabon-blue',
    bg: 'bg-gabon-blue/10',
  },
  {
    icon: MapPin,
    label: 'Siège',
    value: 'Abidjan, Côte d\'Ivoire',
    href: null,
    color: 'text-ci-orange',
    bg: 'bg-ci-orange/10',
  },
  {
    icon: Clock,
    label: 'Disponibilité',
    value: 'Lun–Ven, 9h–17h',
    href: null,
    color: 'text-muted-foreground',
    bg: 'bg-muted',
  },
]

const departments = [
  { name: 'Bureau exécutif', email: 'bureau@agaci.org', desc: 'Questions institutionnelles, partenariats, presse.' },
  { name: 'Commission sociale', email: 'social@agaci.org', desc: 'Accompagnement, urgences, solidarité.' },
  { name: 'Commission jeunes', email: 'jeunes@agaci.org', desc: 'Étudiants, orientation, mentorat.' },
  { name: 'Communication', email: 'communication@agaci.org', desc: 'Médias, événements, publications.' },
]

export default function ContactPage() {
  return (
    <>
      {/* BANNIÈRE */}
      <section className="relative h-[280px] overflow-hidden bg-gabon-blue">
        <Image
          src="/evenements/10-septembre-2024/474047420_122161464740303209_2114099297711092478_n.jpg"
          alt="Membres A.GA.CI"
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
          <div className="inline-flex items-center gap-2 bg-gabon-yellow/20 border border-gabon-yellow/30 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-gabon-yellow mb-4">
            <Mail className="h-3.5 w-3.5" />
            Contact
          </div>
          <h1 className="text-3xl font-bold text-white md:text-4xl">Nous contacter</h1>
          <p className="text-white/80 mt-3 max-w-md">
            Une question, un besoin, une collaboration ? Nous sommes là pour vous répondre.
          </p>
        </div>
      </section>

    <div className="py-12">
      <div className="container max-w-4xl">

        {/* Coordonnées */}
        <section className="mb-10">
          <div className="grid gap-4 sm:grid-cols-2">
            {contacts.map((c) => {
              const Icon = c.icon
              const inner = (
                <div className="flex items-center gap-4 rounded-xl border bg-white p-4 shadow-sm">
                  <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${c.bg}`}>
                    <Icon className={`h-5 w-5 ${c.color}`} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{c.label}</p>
                    <p className="font-medium">{c.value}</p>
                  </div>
                </div>
              )
              return c.href ? (
                <a key={c.label} href={c.href} className="transition-opacity hover:opacity-80">{inner}</a>
              ) : (
                <div key={c.label}>{inner}</div>
              )
            })}
          </div>
        </section>

        {/* Départements */}
        <section className="mb-10">
          <h2 className="mb-5 text-2xl font-bold">Contacts par département</h2>
          <div className="divide-y rounded-xl border bg-white shadow-sm">
            {departments.map((dept) => (
              <div key={dept.name} className="flex items-start gap-4 p-4">
                <div className="flex-1">
                  <p className="font-medium">{dept.name}</p>
                  <p className="text-sm text-muted-foreground">{dept.desc}</p>
                </div>
                <a href={`mailto:${dept.email}`} className="text-sm font-medium text-primary hover:underline flex-shrink-0">
                  {dept.email}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Note */}
        <p className="text-center text-sm text-muted-foreground">
          Pour les urgences sociales, contactez directement{' '}
          <a href="mailto:social@agaci.org" className="text-primary hover:underline">social@agaci.org</a>.
          Nous traitons toutes les demandes avec confidentialité.
        </p>
      </div>
    </div>
    </>
  )
}
