'use client'

import { useEffect, useState } from 'react'
import { useIntersectionObserver } from '@/hooks/use-intersection-observer'
import { Users, Calendar, Briefcase, Globe } from 'lucide-react'

interface StatItem {
  value: number
  suffix: string
  label: string
  sublabel: string
  Icon: React.ElementType
  color: string
}

const stats: StatItem[] = [
  {
    value: 200,
    suffix: '+',
    label: 'Membres actifs',
    sublabel: 'Gabonais en Côte d\'Ivoire',
    Icon: Users,
    color: 'text-gabon-yellow',
  },
  {
    value: 2,
    suffix: ' ans',
    label: "D'existence",
    sublabel: 'Fondée à Abidjan en 2024',

    Icon: Globe,
    color: 'text-ci-orange',
  },
  {
    value: 50,
    suffix: '+',
    label: 'Événements',
    sublabel: 'Cérémonies, ateliers & réunions',
    Icon: Calendar,
    color: 'text-gabon-green',
  },
  {
    value: 100,
    suffix: '+',
    label: 'Opportunités',
    sublabel: 'Emplois, stages & appels projets',
    Icon: Briefcase,
    color: 'text-white',
  },
]

function AnimatedNumber({ value, suffix, isVisible }: { value: number; suffix: string; isVisible: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isVisible) return

    const duration = 1800
    const steps = 60
    const increment = value / steps
    let current = 0
    let step = 0

    const timer = setInterval(() => {
      step++
      current = Math.min(Math.round(increment * step), value)
      setCount(current)
      if (step >= steps) clearInterval(timer)
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isVisible, value])

  return (
    <span>
      {count}
      {suffix}
    </span>
  )
}

export function StatsSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 })

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="relative bg-gabon-blue py-16 overflow-hidden"
    >
      {/* Pattern de fond */}
      <div className="absolute inset-0 pattern-grid" />

      {/* Ligne décorative jaune en haut */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gabon-yellow to-transparent" />

      <div className="container relative">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = stat.Icon
            return (
              <div
                key={stat.label}
                className={`text-center transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                {/* Icône */}
                <div className="flex justify-center mb-4">
                  <div className={`inline-flex items-center justify-center h-12 w-12 border border-white/10 bg-white/5 ${stat.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                {/* Chiffre animé */}
                <div className={`text-4xl font-bold md:text-5xl ${stat.color} leading-none mb-2`}>
                  {isVisible ? (
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} isVisible={isVisible} />
                  ) : (
                    <span>0{stat.suffix}</span>
                  )}
                </div>

                {/* Labels */}
                <div className="text-white font-semibold uppercase tracking-wider text-sm mb-1">
                  {stat.label}
                </div>
                <div className="text-white/40 text-xs">{stat.sublabel}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Ligne décorative jaune en bas */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gabon-yellow to-transparent" />
    </section>
  )
}
