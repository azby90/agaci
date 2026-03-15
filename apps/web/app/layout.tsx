import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { cn } from '@/lib/utils'

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://agaci-ci.org'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "A.GA.CI — Association des Gabonais de Côte d'Ivoire",
    template: '%s | A.GA.CI',
  },
  description:
    "Plateforme officielle de l'Association des Gabonais de Côte d'Ivoire. Promouvoir l'excellence gabonaise, outiller chaque membre et unir notre communauté à Abidjan.",
  keywords: [
    'AGACI', 'A.GA.CI', 'Gabon', "Côte d'Ivoire", 'Abidjan',
    'diaspora gabonaise', 'association gabonaise', 'Gabonais CI',
    'communauté gabonaise', 'entrepreneuriat gabon', 'étudiants gabonais',
  ],
  authors: [{ name: 'A.GA.CI' }],
  creator: 'A.GA.CI',
  publisher: 'A.GA.CI',
  themeColor: '#009e60',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_CI',
    url: BASE_URL,
    siteName: 'A.GA.CI',
    title: "A.GA.CI — Association des Gabonais de Côte d'Ivoire",
    description:
      "Promouvoir l'excellence gabonaise, outiller chaque membre et unir la communauté gabonaise d'Abidjan.",
    images: [
      {
        url: '/evenements/10-septembre-2024/474095692_122161466390303209_805723501387174482_n.jpg',
        width: 1200,
        height: 630,
        alt: "A.GA.CI — Association des Gabonais de Côte d'Ivoire",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "A.GA.CI — Association des Gabonais de Côte d'Ivoire",
    description: "Promouvoir l'excellence gabonaise, outiller chaque membre et unir la communauté.",
    images: ['/evenements/10-septembre-2024/474095692_122161466390303209_805723501387174482_n.jpg'],
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/logo-agaci.jpg',
    apple: '/logo-agaci.jpg',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background font-sans antialiased')}>
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
