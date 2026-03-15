'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X, ChevronDown, Phone, Mail, Clock, Facebook, Linkedin, Youtube } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { label: 'Accueil', href: '/' },
  {
    label: "L'Association",
    href: '#',
    children: [
      { label: 'Notre vision', href: '/a-propos' },
      { label: 'Équipe dirigeante', href: '/equipe' },
      { label: 'Gouvernance', href: '/gouvernance' },
      { label: 'Code d\'éthique', href: '/gouvernance/code-ethique' },
    ],
  },
  { label: 'Annuaire', href: '/annuaire' },
  { label: 'Opportunités', href: '/opportunites' },
  {
    label: 'Nos actions',
    href: '#',
    children: [
      { label: 'Volet Jeunes', href: '/jeunes' },
      { label: 'Entrepreneuriat', href: '/entrepreneuriat' },
      { label: 'Prix AGACI', href: '/prix' },
      { label: 'Inclusion Sociale', href: '/inclusion' },
    ],
  },
  { label: 'Actualités', href: '/actualites' },
  { label: 'Événements', href: '/evenements' },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  return (
    <header>
      {/* ── TOPBAR ── */}
      <div className="hidden border-b-2 border-[#fcd116] bg-[#109e50] lg:block">
        <div className="container flex items-center justify-between py-2">
          <div className="flex items-center gap-6 text-xs text-white/90">
            <a href="tel:+22507XXXXXXXX" className="flex items-center gap-1.5 hover:text-white">
              <Phone className="h-3 w-3" /> +225 07 XX XX XX XX
            </a>
            <a href="mailto:contact@agaci.org" className="flex items-center gap-1.5 hover:text-white">
              <Mail className="h-3 w-3" /> contact@agaci.org
            </a>
            <span className="flex items-center gap-1.5 text-white/70">
              <Clock className="h-3 w-3" /> Lun–Ven, 9h–17h
            </span>
          </div>
          <div className="flex items-center gap-2">
            {[
              { Icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61559096281415' },
              { Icon: Linkedin, label: 'LinkedIn', href: '#' },
              { Icon: Youtube, label: 'YouTube', href: '#' },
            ].map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="rounded-full bg-white/10 p-1.5 text-white/80 transition-all hover:bg-white/20 hover:text-white"
              >
                <Icon className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── NAVBAR ── */}
      <div className="sticky top-0 z-50 bg-[#1e3c78] shadow-lg">
        <div className="container flex h-20 items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            {/* Logo officiel AGACI */}
            <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-gabon-yellow/40">
              <Image
                src="/logo-agaci.jpg"
                alt="Logo AGACI — Association des Gabonais de Côte d'Ivoire"
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
            <div>
              <span className="font-brand text-xl text-white tracking-wide">A.GA.CI</span>
              <p className="hidden text-[9px] uppercase tracking-widest text-[#fcd116] sm:block leading-tight">
                Gabonais de Côte d&apos;Ivoire
              </p>
            </div>
          </Link>

          {/* Navigation desktop */}
          <nav className="hidden items-center lg:flex">
            {navigation.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button className="flex items-center gap-1 px-3 py-6 text-xs font-semibold uppercase tracking-wider text-white/80 transition-colors hover:bg-white/10 hover:text-white">
                    {item.label}
                    <ChevronDown className="h-3 w-3" />
                  </button>
                  {openDropdown === item.label && (
                    <div className="absolute left-0 top-full w-52 border-t-2 border-[#fcd116] bg-white shadow-xl">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-3 text-sm text-gray-700 transition-colors hover:bg-gray-50 hover:text-[#1e3c78] hover:pl-5"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-6 text-xs font-semibold uppercase tracking-wider text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* CTA */}
          <div className="hidden items-center gap-2 lg:flex">
            <Link
              href="/connexion"
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white/80 transition-colors hover:text-white"
            >
              Connexion
            </Link>
            <Link
              href="/inscription"
              className="bg-[#fcd116] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#1e3c78] transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
            >
              Adhérer
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="rounded p-2 text-white lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="border-t border-white/10 bg-[#1e3c78] lg:hidden">
            <nav className="container py-4">
              {navigation.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    className="block py-3 text-sm font-semibold uppercase tracking-wider text-white/80 hover:text-white"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="ml-4 border-l border-white/20 pl-4 pb-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block py-2 text-sm text-white/60 hover:text-white"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="mt-4 flex gap-3 border-t border-white/10 pt-4">
                <Link href="/connexion" className="flex-1 border border-white/30 py-2.5 text-center text-sm font-semibold text-white hover:bg-white/10">
                  Connexion
                </Link>
                <Link href="/inscription" className="flex-1 bg-[#fcd116] py-2.5 text-center text-sm font-bold text-[#1e3c78] hover:bg-white">
                  Adhérer
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
