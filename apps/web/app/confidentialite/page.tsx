import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politique de confidentialité — AGACI',
  description: "Comment l'AGACI collecte, utilise et protège vos données personnelles.",
}

export default function ConfidentialitePage() {
  return (
    <div className="py-12">
      <div className="container max-w-3xl">
        <h1 className="mb-8 text-3xl font-bold">Politique de confidentialité</h1>

        <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="mb-3 text-base font-semibold text-foreground">1. Responsable du traitement</h2>
            <p>
              L&apos;AGACI (Association des Ressortissants Gabonais en Côte d&apos;Ivoire),
              dont le siège est à Abidjan, Côte d&apos;Ivoire, est responsable du traitement
              de vos données personnelles collectées via cette plateforme.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-foreground">2. Données collectées</h2>
            <p className="mb-2">Dans le cadre de l&apos;utilisation de la plateforme, nous collectons :</p>
            <ul className="ml-4 list-disc space-y-1">
              <li>Données d&apos;identification : nom, prénom, adresse email, numéro de téléphone</li>
              <li>Données de profil : photo, biographie, secteur d&apos;activité, ville de résidence</li>
              <li>Données de connexion : logs d&apos;accès, adresse IP, données de navigation</li>
              <li>Données financières : uniquement en cas de paiement de cotisation (traitées par notre partenaire CinetPay)</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-foreground">3. Finalités du traitement</h2>
            <p className="mb-2">Vos données sont utilisées pour :</p>
            <ul className="ml-4 list-disc space-y-1">
              <li>Gérer votre compte membre et vous authentifier</li>
              <li>Alimenter l&apos;annuaire des membres (selon votre paramétrage de visibilité)</li>
              <li>Vous envoyer des communications associatives (avec votre accord)</li>
              <li>Traiter les paiements de cotisation</li>
              <li>Améliorer les services de la plateforme</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-foreground">4. Visibilité de votre profil</h2>
            <p>
              Vous contrôlez la visibilité de votre profil dans l&apos;annuaire. Vous pouvez choisir
              de rendre votre profil public, visible aux membres uniquement, ou privé. Ces paramètres
              sont modifiables à tout moment depuis votre espace membre.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-foreground">5. Conservation des données</h2>
            <p>
              Vos données sont conservées pendant toute la durée de votre adhésion à l&apos;AGACI,
              puis pendant 3 ans après la fin de votre adhésion, sauf obligation légale contraire.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-foreground">6. Partage des données</h2>
            <p>
              L&apos;AGACI ne vend ni ne loue vos données personnelles à des tiers. Vos données peuvent
              être partagées uniquement avec nos prestataires techniques (hébergement, paiement, email)
              dans le strict respect de la confidentialité.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-foreground">7. Vos droits</h2>
            <p className="mb-2">Conformément à la réglementation applicable, vous disposez des droits suivants :</p>
            <ul className="ml-4 list-disc space-y-1">
              <li>Droit d&apos;accès à vos données</li>
              <li>Droit de rectification</li>
              <li>Droit à l&apos;effacement (droit à l&apos;oubli)</li>
              <li>Droit à la portabilité</li>
              <li>Droit d&apos;opposition au traitement</li>
            </ul>
            <p className="mt-2">
              Pour exercer ces droits, contactez-nous à{' '}
              <a href="mailto:contact@agaci.org" className="text-primary hover:underline">contact@agaci.org</a>.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-foreground">8. Cookies</h2>
            <p>
              Ce site utilise des cookies strictement nécessaires à son fonctionnement (session d&apos;authentification).
              Aucun cookie de tracking publicitaire n&apos;est utilisé.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-foreground">9. Contact</h2>
            <p>
              Pour toute question relative à la protection de vos données :{' '}
              <a href="mailto:contact@agaci.org" className="text-primary hover:underline">contact@agaci.org</a>
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
