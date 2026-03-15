import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Linkedin, Youtube, Mail, Phone, MapPin, ArrowRight } from 'lucide-react'

const footerLinks = {
  association: {
    title: "L'Association",
    links: [
      { label: 'Notre vision', href: '/a-propos' },
      { label: 'Équipe dirigeante', href: '/equipe' },
      { label: 'Gouvernance', href: '/gouvernance' },
      { label: "Adhérer à l'A.GA.CI", href: '/inscription' },
    ],
  },
  services: {
    title: 'Nos Services',
    links: [
      { label: 'Annuaire des membres', href: '/annuaire' },
      { label: 'Espace Opportunités', href: '/opportunites' },
      { label: 'Volet Jeunes', href: '/jeunes' },
      { label: 'Entrepreneuriat', href: '/entrepreneuriat' },
      { label: 'Prix A.GA.CI', href: '/prix' },
    ],
  },
  ressources: {
    title: 'Ressources',
    links: [
      { label: 'Actualités', href: '/actualites' },
      { label: 'Événements', href: '/evenements' },
      { label: 'Documents officiels', href: '/gouvernance/documents' },
      { label: 'Inclusion Sociale', href: '/inclusion' },
    ],
  },
}

export function Footer() {
  return (
    <footer className="bg-[#1e3c78] text-white">
      {/* Bande couleurs drapeau Gabon */}
      <div className="flex h-1.5 w-full">
        <div className="flex-1 bg-[#009e60]" />
        <div className="flex-1 bg-[#fcd116]" />
        <div className="flex-1 bg-[#003189]" />
      </div>

      <div className="container py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">

          {/* Identité — 2 colonnes */}
          <div className="lg:col-span-2">
            <Link href="/" className="mb-6 flex items-center gap-4">
              {/* Logo officiel A.GA.CI */}
              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-gabon-yellow/30 bg-white">
                <Image
                  src="/logo-agaci.jpg"
                  alt="Logo A.GA.CI"
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div>
                <span className="font-brand text-2xl text-white tracking-wide block leading-none">
                  A.GA.CI
                </span>
                <p className="text-[9px] uppercase tracking-widest text-[#fcd116] mt-1">
                  Gabonais de Côte d&apos;Ivoire
                </p>
              </div>
            </Link>

            <p className="mb-6 max-w-xs text-sm leading-relaxed text-white/70">
              Association des Gabonais de Côte d&apos;Ivoire.
              Promouvoir l&apos;excellence, outiller chaque membre, unir notre communauté.
            </p>

            {/* Contact */}
            <ul className="mb-6 space-y-2 text-sm text-white/70">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 flex-shrink-0 text-[#fcd116]" />
                Abidjan, Côte d&apos;Ivoire
              </li>
              <li>
                <a href="mailto:contact@agaci.org" className="flex items-center gap-2 hover:text-white">
                  <Mail className="h-4 w-4 flex-shrink-0 text-[#fcd116]" />
                  contact@agaci.org
                </a>
              </li>
              <li>
                <a href="tel:+22507XXXXXXXX" className="flex items-center gap-2 hover:text-white">
                  <Phone className="h-4 w-4 flex-shrink-0 text-[#fcd116]" />
                  +225 07 XX XX XX XX
                </a>
              </li>
            </ul>

            {/* Réseaux sociaux */}
            <div className="flex gap-2">
              {[
                { Icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61559096281415' },
                { Icon: Linkedin, label: 'LinkedIn', href: '#' },
                { Icon: Youtube, label: 'YouTube', href: '#' },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href !== '#' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center bg-[#009e60] text-white transition-all hover:bg-[#fcd116] hover:text-[#1e3c78]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Liens — 3 colonnes */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h3 className="mb-4 border-b border-white/10 pb-2 text-xs font-bold uppercase tracking-widest text-[#fcd116]">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-1.5 text-sm text-white/65 transition-all hover:gap-2.5 hover:text-white"
                    >
                      <ArrowRight className="h-3 w-3 flex-shrink-0 text-[#fcd116] opacity-0 transition-opacity group-hover:opacity-100" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bas de footer */}
      <div className="border-t border-white/10 bg-[#172f62]">
        <div className="container flex flex-col items-center justify-between gap-3 py-5 text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} A.GA.CI — Association des Gabonais de Côte d&apos;Ivoire. Tous droits réservés.</p>
          <div className="flex gap-5">
            <Link href="/mentions-legales" className="hover:text-white">Mentions légales</Link>
            <Link href="/confidentialite" className="hover:text-white">Confidentialité</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
