import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentions légales — AGACI',
  description: "Mentions légales de la plateforme numérique de l'AGACI.",
}

export default function MentionsLegalesPage() {
  return (
    <div className="py-12">
      <div className="container max-w-3xl">
        <h1 className="mb-8 text-3xl font-bold">Mentions légales</h1>

        <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="mb-3 text-base font-semibold text-foreground">1. Éditeur du site</h2>
            <p>
              <strong className="text-foreground">Dénomination sociale :</strong> Association des Ressortissants Gabonais en Côte d&apos;Ivoire (AGACI)<br />
              <strong className="text-foreground">Siège social :</strong> Abidjan, Côte d&apos;Ivoire<br />
              <strong className="text-foreground">Email :</strong>{' '}
              <a href="mailto:contact@agaci.org" className="text-primary hover:underline">contact@agaci.org</a>
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-foreground">2. Directeur de la publication</h2>
            <p>
              Le Président de l&apos;AGACI est responsable de la publication du contenu diffusé sur ce site.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-foreground">3. Hébergement</h2>
            <p>
              Ce site est hébergé par des prestataires techniques tiers. Les informations relatives à l&apos;hébergeur
              sont disponibles sur demande auprès de l&apos;éditeur.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-foreground">4. Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble du contenu de ce site (textes, images, logos, graphismes) est la propriété exclusive
              de l&apos;AGACI ou de ses membres contributeurs, et est protégé par les lois applicables en matière
              de propriété intellectuelle. Toute reproduction, représentation, modification ou utilisation,
              totale ou partielle, est interdite sans l&apos;autorisation écrite préalable de l&apos;AGACI.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-foreground">5. Responsabilité</h2>
            <p>
              L&apos;AGACI s&apos;efforce d&apos;assurer l&apos;exactitude des informations publiées sur ce site.
              Cependant, elle ne peut garantir l&apos;exhaustivité ou l&apos;exactitude de ces informations
              et décline toute responsabilité pour tout dommage résultant de l&apos;utilisation de ce site.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-foreground">6. Liens hypertextes</h2>
            <p>
              Ce site peut contenir des liens vers des sites tiers. L&apos;AGACI n&apos;est pas responsable
              du contenu de ces sites et ne saurait être tenue pour responsable de tout dommage
              résultant de leur consultation.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-foreground">7. Données personnelles</h2>
            <p>
              Pour toute information relative au traitement de vos données personnelles, consultez notre{' '}
              <a href="/confidentialite" className="text-primary hover:underline">Politique de confidentialité</a>.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-foreground">8. Droit applicable</h2>
            <p>
              Le présent site et ses mentions légales sont soumis au droit ivoirien.
              Tout litige relatif à l&apos;utilisation de ce site sera soumis à la compétence
              des tribunaux d&apos;Abidjan, Côte d&apos;Ivoire.
            </p>
          </section>

          <p className="text-xs">
            Dernière mise à jour : mars 2025
          </p>
        </div>
      </div>
    </div>
  )
}
