'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronDown, Volume2, VolumeX } from 'lucide-react'

export function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const [muted, setMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80)
    return () => clearTimeout(t)
  }, [])

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted
      setMuted(!muted)
    }
  }

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-gabon-blue">

      {/* ── Vidéo de fond — Événement 3 décembre 2025 ── */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster="/evenements/10-mars-2025/482016900_122170060946303209_917048036729286606_n.jpg"
          className="h-full w-full object-cover object-center"
        >
          <source src="/evenements/3-decembre-2025/v1.mp4" type="video/mp4" />
        </video>

        {/* Overlay — vidéo visible en fond, écritures lisibles au premier plan */}
        <div className="absolute inset-0 bg-gabon-blue/75" />
      </div>

      {/* Motif décoratif */}
      <div className="absolute inset-0 z-[1] pattern-dots opacity-20" />

      {/* Barre drapeau Gabon — verticale gauche */}
      <div className="absolute left-0 top-0 bottom-0 z-10 flex flex-col w-1.5">
        <div className="flex-1 bg-gabon-green" />
        <div className="flex-1 bg-gabon-yellow" />
        <div className="flex-1 bg-[#003189]" />
      </div>

      {/* ── Contenu centré ── */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">

        {/* Logo + Nom de l'association — AU-DESSUS, bien visible */}
        <div
          className={`mb-10 flex flex-col items-center gap-5 transition-all duration-700 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}
        >
          {/* Logo officiel */}
          <div className="relative h-24 w-24 overflow-hidden rounded-full ring-4 ring-gabon-yellow shadow-2xl bg-white">
            <Image
              src="/logo-agaci.jpg"
              alt="Logo A.GA.CI"
              fill
              className="object-cover"
              priority
              sizes="96px"
            />
          </div>

          {/* Nom complet de l'association */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-gabon-yellow mb-2">
              Plateforme officielle
            </p>
            <h2 className="text-lg font-bold uppercase tracking-widest text-white/90 leading-snug md:text-xl">
              Association des Gabonais
            </h2>
            <h2 className="text-lg font-bold uppercase tracking-widest text-white/90 leading-snug md:text-xl">
              de Côte d&apos;Ivoire
            </h2>
            {/* Sigle stylisé */}
            <div className="mt-3 inline-block border border-gabon-yellow/40 bg-gabon-yellow/10 px-5 py-1">
              <span className="font-brand text-2xl text-gabon-yellow tracking-widest">A.GA.CI</span>
            </div>
          </div>

          {/* Séparateur */}
          <div className="flex items-center gap-3">
            <div className="h-px w-12 bg-gabon-yellow/40" />
            <div className="h-1.5 w-1.5 rounded-full bg-gabon-yellow" />
            <div className="h-px w-12 bg-gabon-yellow/40" />
          </div>
        </div>

        {/* Titre accrocheur */}
        <h1
          className={`mb-5 max-w-3xl text-4xl font-bold text-white leading-tight md:text-6xl transition-all duration-700 delay-200 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          La communauté{' '}
          <span className="text-gabon-yellow">gabonaise</span>
          {' '}unie en CI
        </h1>

        {/* Sous-titre */}
        <p
          className={`mb-10 max-w-xl text-base text-white font-medium leading-relaxed md:text-lg transition-all duration-700 delay-300 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          Promouvoir l&apos;excellence, outiller chaque membre, unir notre diaspora.
          L&apos;A.GA.CI est votre maison loin du Gabon.
        </p>

        {/* CTAs */}
        <div
          className={`flex flex-wrap justify-center gap-4 transition-all duration-700 delay-400 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <Link
            href="/inscription"
            className="inline-flex items-center gap-2 bg-gabon-yellow px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-gabon-blue transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-xl"
          >
            Rejoindre l&apos;A.GA.CI
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/a-propos"
            className="inline-flex items-center gap-2 border border-white/30 px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:border-white/60 hover:bg-white/10"
          >
            Notre mission
          </Link>
        </div>

        {/* Mini stats */}
        <div
          className={`mt-14 flex flex-wrap justify-center items-center gap-8 transition-all duration-700 delay-500 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {[
            { value: '200+', label: 'Membres actifs' },
            { value: '2024', label: 'Année de fondation' },
            { value: '50+', label: 'Événements' },
          ].map((s, i) => (
            <div key={s.label} className="flex items-center gap-5">
              {i > 0 && <div className="h-8 w-px bg-white/15" />}
              <div className="text-center">
                <div className="text-2xl font-bold text-white leading-none mb-1">{s.value}</div>
                <div className="text-xs text-white/45 uppercase tracking-wider">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Bouton son */}
      <button
        onClick={toggleMute}
        aria-label={muted ? 'Activer le son' : 'Couper le son'}
        className="absolute bottom-20 right-6 z-20 flex items-center gap-2 border border-white/20 bg-black/30 px-3 py-2 text-xs text-white/60 backdrop-blur transition-all hover:border-white/40 hover:text-white"
      >
        {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        <span className="hidden sm:inline">{muted ? 'Son désactivé' : 'Son activé'}</span>
      </button>

      {/* Crédit vidéo */}
      <div className="absolute bottom-20 left-6 z-20 text-[10px] text-white/25 uppercase tracking-wider hidden sm:block">
        Événement 3 déc. 2025 · Mobilisation présidentielle · Abidjan
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
        <div className="flex flex-col items-center gap-1 text-white/30 animate-bounce">
          <ChevronDown className="h-5 w-5" />
        </div>
      </div>

      {/* Transition bas */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 40L1440 0V40H0Z" fill="white" />
        </svg>
      </div>
    </section>
  )
}
