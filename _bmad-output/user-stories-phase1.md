# AGACI — User Stories Phase 1 (MVP)
**Version : 1.0 | Date : 2026-03-10 | Statut : DRAFT**
*Produit par l'agent PM BMAD*

---

## CONVENTIONS

- **Format :** En tant que `[rôle]`, je veux `[action]` afin de `[bénéfice]`
- **Priorité :** 🔴 Critique · 🟠 Haute · 🟡 Moyenne · 🟢 Basse
- **Estimation :** Points de complexité (1 = trivial, 2 = simple, 3 = moyen, 5 = complexe, 8 = très complexe)
- **Statut :** ⬜ À faire · 🔵 En cours · ✅ Terminé

---

## EPIC 1 — INFRASTRUCTURE & SETUP

### US-001 — Initialisation du projet
> 🔴 Critique | 3 pts | ⬜ À faire

**En tant que** développeur,
**je veux** initialiser le monorepo avec Next.js, Directus et Docker,
**afin de** disposer d'un environnement de développement fonctionnel en local.

**Critères d'acceptation :**
- [ ] Monorepo pnpm workspaces initialisé (`apps/web`, `apps/directus`)
- [ ] `docker-compose.yml` lance PostgreSQL + Redis + Directus en une commande
- [ ] Next.js 14 App Router démarre sur `localhost:3000`
- [ ] Directus démarre sur `localhost:8055` avec compte admin
- [ ] TypeScript configuré avec paths aliases (`@/components`, `@/lib`, etc.)
- [ ] ESLint + Prettier configurés
- [ ] `.env.example` documenté avec toutes les variables requises

---

### US-002 — Pipeline CI/CD
> 🟠 Haute | 3 pts | ⬜ À faire

**En tant que** développeur,
**je veux** un pipeline CI/CD automatisé via GitHub Actions + Vercel,
**afin de** déployer automatiquement à chaque push et garantir la qualité.

**Critères d'acceptation :**
- [ ] GitHub Actions : lint + typecheck à chaque push
- [ ] Vercel : preview automatique sur chaque Pull Request
- [ ] Vercel : déploiement production sur merge vers `main`
- [ ] Variables d'environnement configurées dans Vercel Dashboard
- [ ] Railway : Directus + PostgreSQL déployés en staging

---

### US-003 — Modèle de données Directus
> 🔴 Critique | 5 pts | ⬜ À faire

**En tant que** développeur,
**je veux** créer toutes les collections Directus avec leurs champs et relations,
**afin que** le CMS soit prêt à recevoir les données métier.

**Critères d'acceptation :**
- [ ] Collections créées : `membres`, `profils_influents`, `opportunites`, `evenements`, `actualites`, `documents_gouvernance`, `prix_agaci`
- [ ] Rôles et permissions configurés (visiteur / membre / webmaster / admin)
- [ ] Snapshot du schéma versionné dans `apps/directus/snapshots/`
- [ ] Données de test (seeds) créées pour chaque collection

---

## EPIC 2 — IDENTITÉ VISUELLE & DESIGN SYSTEM

### US-010 — Design system AGACI
> 🔴 Critique | 3 pts | ⬜ À faire

**En tant que** visiteur,
**je veux** que la plateforme reflète l'identité visuelle AGACI (couleurs Gabon + CI),
**afin de** ressentir immédiatement l'ancrage culturel et la crédibilité de l'association.

**Critères d'acceptation :**
- [ ] Palette de couleurs configurée dans `tailwind.config.ts` :
  - Primary : vert Gabon `#009e60`
  - Accent : jaune Gabon `#fcd116`
  - Secondary : bleu institutionnel `#003189`
  - Warm : orange CI `#f77f00`
- [ ] Typographie définie (police moderne, lisible, professionnelle)
- [ ] Composants shadcn/ui personnalisés aux couleurs AGACI
- [ ] Logo AGACI intégré (SVG + PNG)
- [ ] Favicon et icônes PWA générés

---

### US-011 — Layout principal (Header / Footer / Navigation)
> 🔴 Critique | 3 pts | ⬜ À faire

**En tant que** visiteur,
**je veux** un header clair avec la navigation principale et un footer institutionnel,
**afin de** me repérer facilement sur la plateforme.

**Critères d'acceptation :**
- [ ] Header : Logo AGACI + navigation principale + bouton Connexion/Mon Compte
- [ ] Navigation mobile : menu hamburger responsive
- [ ] Footer : liens institutionnels, réseaux sociaux, copyright, mentions légales
- [ ] Navigation active state (page courante mise en évidence)
- [ ] Header sticky avec scroll
- [ ] Accessibilité : navigation au clavier, ARIA labels

---

## EPIC 3 — PAGE D'ACCUEIL

### US-020 — Hero section
> 🔴 Critique | 2 pts | ⬜ À faire

**En tant que** visiteur,
**je veux** voir une section hero impactante dès l'arrivée sur le site,
**afin de** comprendre immédiatement la mission de l'AGACI.

**Critères d'acceptation :**
- [ ] Titre accrocheur avec les 3 piliers (Promouvoir / Outiller / Unir)
- [ ] Sous-titre expliquant l'AGACI en une phrase
- [ ] CTA principal "Rejoindre l'AGACI" + CTA secondaire "En savoir plus"
- [ ] Image/illustration représentant la communauté gabonaise en CI
- [ ] Animations légères (fade-in au scroll)
- [ ] Responsive mobile parfait

---

### US-021 — Présentation des modules
> 🟠 Haute | 2 pts | ⬜ À faire

**En tant que** visiteur,
**je veux** voir un aperçu des services offerts par l'AGACI,
**afin de** comprendre comment la plateforme peut m'aider.

**Critères d'acceptation :**
- [ ] Section "Ce que nous offrons" avec 6 cartes de modules
- [ ] Chaque carte : icône, titre, description courte, lien vers la section
- [ ] Layout en grille responsive (3 colonnes desktop, 2 tablette, 1 mobile)

---

### US-022 — Chiffres clés & statistiques
> 🟡 Moyenne | 1 pt | ⬜ À faire

**En tant que** visiteur,
**je veux** voir les chiffres clés de l'association (membres, années, événements),
**afin de** mesurer l'importance et la crédibilité de l'AGACI.

**Critères d'acceptation :**
- [ ] Compteurs animés : nombre de membres, années d'existence, événements organisés, opportunités publiées
- [ ] Données alimentées depuis Directus (mis à jour par le webmaster)
- [ ] Animation au scroll (compteur démarre quand visible)

---

### US-023 — Actualités récentes en accueil
> 🟡 Moyenne | 2 pts | ⬜ À faire

**En tant que** visiteur,
**je veux** voir les 3 dernières actualités de l'AGACI sur la page d'accueil,
**afin de** rester informé de la vie de l'association sans chercher.

**Critères d'acceptation :**
- [ ] 3 cartes d'actualités récentes (photo, titre, date, extrait)
- [ ] Lien "Voir toutes les actualités"
- [ ] Données chargées depuis Directus via ISR (revalidation toutes les heures)

---

### US-024 — Événements à venir en accueil
> 🟡 Moyenne | 2 pts | ⬜ À faire

**En tant que** visiteur,
**je veux** voir les prochains événements de l'AGACI sur la page d'accueil,
**afin de** planifier ma participation.

**Critères d'acceptation :**
- [ ] Liste des 3 prochains événements (date, titre, lieu)
- [ ] Badge "Bientôt" pour les événements dans les 7 prochains jours
- [ ] Lien "Voir l'agenda complet"

---

## EPIC 4 — AUTHENTIFICATION & GESTION DES MEMBRES

### US-030 — Inscription membre
> 🔴 Critique | 5 pts | ⬜ À faire

**En tant que** ressortissant gabonais en CI,
**je veux** créer mon compte sur la plateforme AGACI,
**afin d'** accéder aux services réservés aux membres.

**Critères d'acceptation :**
- [ ] Formulaire : prénom, nom, email, mot de passe, téléphone, ville en CI, ville d'origine au Gabon
- [ ] Validation Zod : email unique, mot de passe fort (8+ chars, 1 majuscule, 1 chiffre)
- [ ] Email de confirmation envoyé via Resend (lien d'activation 24h)
- [ ] Activation du compte après clic sur le lien
- [ ] Message de bienvenue personnalisé après activation
- [ ] Protection anti-spam (honeypot + rate limiting)

---

### US-031 — Connexion membre
> 🔴 Critique | 2 pts | ⬜ À faire

**En tant que** membre inscrit,
**je veux** me connecter à mon compte,
**afin d'** accéder à mon espace personnel.

**Critères d'acceptation :**
- [ ] Formulaire email + mot de passe
- [ ] Option "Se souvenir de moi" (session 30 jours)
- [ ] Lien "Mot de passe oublié"
- [ ] Redirection vers la page visitée avant connexion
- [ ] Erreur générique (ne pas révéler si l'email existe)
- [ ] Blocage après 5 tentatives échouées (15 minutes)

---

### US-032 — Réinitialisation mot de passe
> 🟠 Haute | 2 pts | ⬜ À faire

**En tant que** membre,
**je veux** réinitialiser mon mot de passe oublié,
**afin de** retrouver l'accès à mon compte.

**Critères d'acceptation :**
- [ ] Formulaire "Email" → envoi lien de réinitialisation (valide 1h)
- [ ] Email envoyé via Resend avec lien sécurisé (token unique)
- [ ] Formulaire nouveau mot de passe avec confirmation
- [ ] Invalidation du token après usage
- [ ] Message de confirmation après réinitialisation

---

### US-033 — Profil membre — Consultation
> 🔴 Critique | 3 pts | ⬜ À faire

**En tant que** membre connecté,
**je veux** consulter mon profil,
**afin de** voir comment je suis présenté sur la plateforme.

**Critères d'acceptation :**
- [ ] Page `/membres/profil` avec toutes les informations du compte
- [ ] Aperçu "Vue publique" (comment les autres me voient)
- [ ] Indicateur de complétude du profil (% rempli)
- [ ] Statut du compte (actif, en attente de validation)

---

### US-034 — Profil membre — Édition
> 🟠 Haute | 3 pts | ⬜ À faire

**En tant que** membre connecté,
**je veux** modifier les informations de mon profil,
**afin de** maintenir mes données à jour.

**Critères d'acceptation :**
- [ ] Modification : photo, prénom, nom, téléphone, biographie courte, ville
- [ ] Upload photo : max 5MB, formats JPG/PNG/WebP, crop carré
- [ ] Optimisation auto de l'image via Cloudinary
- [ ] Choix de visibilité du profil : public / membres uniquement / privé
- [ ] Sauvegarde avec feedback visuel (toast confirmation)

---

### US-035 — Import CSV des membres existants
> 🟠 Haute | 3 pts | ⬜ À faire

**En tant qu'** administrateur,
**je veux** importer la liste partielle des membres existants via CSV,
**afin de** prépeupler la base avant le lancement.

**Critères d'acceptation :**
- [ ] Script d'import `scripts/import-members.ts` exécutable en CLI
- [ ] Format CSV attendu documenté (colonnes requises / optionnelles)
- [ ] Import idempotent (pas de doublons si re-exécuté)
- [ ] Rapport d'import : X créés, Y mis à jour, Z erreurs (avec détails)
- [ ] Envoi email d'invitation aux membres importés (optionnel, flag CLI)

---

## EPIC 5 — ANNUAIRE DES PERSONNALITÉS

### US-040 — Liste de l'annuaire
> 🟠 Haute | 3 pts | ⬜ À faire

**En tant que** visiteur,
**je veux** parcourir l'annuaire des personnalités influentes de l'AGACI,
**afin de** découvrir le capital humain de la communauté gabonaise en CI.

**Critères d'acceptation :**
- [ ] Grille de cartes : photo, nom, titre, secteur d'expertise
- [ ] Filtres : secteur (dropdown), disponibilité mentorat (toggle)
- [ ] Recherche textuelle (nom, titre, expertise)
- [ ] Pagination (12 profils par page) ou scroll infini
- [ ] Seuls les profils validés par admin sont visibles
- [ ] Visibilité selon paramètre de confidentialité du membre

---

### US-041 — Fiche profil personnalité
> 🟠 Haute | 2 pts | ⬜ À faire

**En tant que** visiteur,
**je veux** consulter la fiche détaillée d'une personnalité,
**afin de** mieux connaître son parcours et ses domaines d'expertise.

**Critères d'acceptation :**
- [ ] Photo grande format, nom, titre, secteur
- [ ] Biographie complète
- [ ] Tags d'expertise (clickables → filtre annuaire)
- [ ] Badge "Disponible pour mentorat" si activé
- [ ] Lien LinkedIn (si renseigné)
- [ ] Bouton "Contacter" → redirige vers formulaire (pour membres connectés)

---

### US-042 — Demande de référencement annuaire
> 🟡 Moyenne | 2 pts | ⬜ À faire

**En tant que** membre connecté,
**je veux** soumettre ma candidature pour figurer dans l'annuaire des personnalités,
**afin de** partager mon expertise avec la communauté.

**Critères d'acceptation :**
- [ ] Formulaire : titre professionnel, biographie, secteur, expertise (tags), LinkedIn, disponibilité mentorat
- [ ] Soumission → statut "En attente de validation"
- [ ] Notification email au webmaster pour validation
- [ ] Email de confirmation au membre à la validation/refus

---

## EPIC 6 — ESPACE OPPORTUNITÉS

### US-050 — Liste des opportunités
> 🟠 Haute | 3 pts | ⬜ À faire

**En tant que** membre ou visiteur,
**je veux** consulter les opportunités disponibles (emploi, stages, ateliers),
**afin de** trouver des occasions de développement professionnel.

**Critères d'acceptation :**
- [ ] Liste avec cartes : type (badge coloré), titre, entreprise/org, date limite, localisation
- [ ] Filtres : type (emploi / stage / atelier / appel projets), secteur
- [ ] Tri : date de publication, date limite
- [ ] Badge "Expire bientôt" (< 7 jours)
- [ ] Badge "Nouveau" (< 3 jours)
- [ ] Opportunités expirées masquées automatiquement

---

### US-051 — Détail d'une opportunité
> 🟠 Haute | 2 pts | ⬜ À faire

**En tant que** visiteur,
**je veux** consulter le détail complet d'une opportunité,
**afin de** décider si elle me correspond et postuler.

**Critères d'acceptation :**
- [ ] Description complète, prérequis, rémunération (si applicable)
- [ ] Bouton "Postuler" → lien externe ou email de candidature
- [ ] Partage de l'opportunité (copier le lien)
- [ ] Date de publication et date limite clairement affichées

---

### US-052 — Publication d'une opportunité (Webmaster)
> 🟠 Haute | 2 pts | ⬜ À faire

**En tant que** webmaster,
**je veux** publier une nouvelle opportunité depuis Directus,
**afin d'** informer les membres des offres disponibles.

**Critères d'acceptation :**
- [ ] Création via interface Directus Admin (aucun code)
- [ ] Champs : type, titre, description (rich text), entreprise, localisation, date limite, lien candidature
- [ ] Publication immédiate ou programmée (date de publication future)
- [ ] Dépublication automatique à la date limite

---

## EPIC 7 — GOUVERNANCE & TRANSPARENCE

### US-060 — Page actualités
> 🟠 Haute | 2 pts | ⬜ À faire

**En tant que** visiteur,
**je veux** consulter les actualités de l'AGACI,
**afin de** rester informé de la vie de l'association.

**Critères d'acceptation :**
- [ ] Liste paginée des articles (photo, titre, date, extrait, catégorie)
- [ ] Filtres par catégorie (communauté / institutionnel / partenariat)
- [ ] Page détail article avec contenu rich text, image header
- [ ] Partage article (copier le lien, WhatsApp)
- [ ] SEO : meta title/description générés depuis Directus

---

### US-061 — Agenda des événements
> 🟠 Haute | 3 pts | ⬜ À faire

**En tant que** visiteur,
**je veux** consulter l'agenda des événements de l'AGACI,
**afin de** planifier ma participation aux activités de l'association.

**Critères d'acceptation :**
- [ ] Vue liste et vue calendrier (mensuel)
- [ ] Filtres : type d'événement, mois
- [ ] Détail événement : titre, description, date/heure, lieu, photo
- [ ] Indication "Événement passé" pour les événements archivés
- [ ] Export iCal (téléchargement fichier .ics)

---

### US-062 — Bibliothèque de documents
> 🟡 Moyenne | 2 pts | ⬜ À faire

**En tant que** visiteur,
**je veux** consulter et télécharger les documents officiels de l'AGACI,
**afin de** m'informer sur les décisions et la gouvernance de l'association.

**Critères d'acceptation :**
- [ ] Liste des documents : type (badge), titre, date de publication
- [ ] Filtres par type (rapport / CR réunion / budget / code éthique)
- [ ] Téléchargement direct (PDF, DOCX)
- [ ] Accès public pour le code d'éthique et les rapports annuels
- [ ] Fichiers hébergés sur Cloudinary ou stockage sécurisé

---

### US-063 — Organigramme & équipe dirigeante
> 🟡 Moyenne | 2 pts | ⬜ À faire

**En tant que** visiteur,
**je veux** voir qui dirige l'AGACI et son organigramme,
**afin de** connaître les responsables et leur rôle dans l'association.

**Critères d'acceptation :**
- [ ] Section "Notre équipe" avec fiches des membres du bureau
- [ ] Photo, nom, poste, message court
- [ ] Organigramme visuel des instances (Bureau / Commissions)
- [ ] Données gérées depuis Directus (mise à jour sans code)

---

## EPIC 8 — SEO & PERFORMANCE

### US-070 — SEO technique
> 🟠 Haute | 2 pts | ⬜ À faire

**En tant que** responsable de la plateforme,
**je veux** que le site soit bien référencé sur Google,
**afin d'** attirer de nouveaux membres gabonais cherchant des ressources en CI.

**Critères d'acceptation :**
- [ ] Metadata dynamiques (title, description, og:image) sur toutes les pages
- [ ] Sitemap XML généré automatiquement (`/sitemap.xml`)
- [ ] `robots.txt` correctement configuré
- [ ] Schema.org JSON-LD sur les pages clés (Organisation, Événements)
- [ ] Balises canonical sur les pages paginées
- [ ] Score Lighthouse Performance ≥ 85

---

### US-071 — Progressive Web App (PWA)
> 🟡 Moyenne | 2 pts | ⬜ À faire

**En tant que** membre utilisant un smartphone,
**je veux** installer l'application AGACI sur mon écran d'accueil,
**afin d'** accéder rapidement à la plateforme comme une vraie application.

**Critères d'acceptation :**
- [ ] `manifest.json` configuré (nom, icônes 192x192 + 512x512, couleurs AGACI)
- [ ] Service Worker actif (cache assets statiques)
- [ ] Page offline élégante
- [ ] Invite d'installation sur mobile (prompt natif navigateur)
- [ ] Fonctionne correctement sur connexion 3G

---

## RÉCAPITULATIF PHASE 1

### Par Epic

| Epic | Stories | Points Total | Priorité |
|------|---------|-------------|---------|
| Infrastructure & Setup | 3 | 11 pts | 🔴 |
| Design System & Layout | 2 | 6 pts | 🔴 |
| Page d'Accueil | 5 | 9 pts | 🔴/🟠 |
| Authentification & Membres | 6 | 18 pts | 🔴 |
| Annuaire Personnalités | 3 | 7 pts | 🟠 |
| Espace Opportunités | 3 | 7 pts | 🟠 |
| Gouvernance & Transparence | 4 | 9 pts | 🟠/🟡 |
| SEO & Performance | 2 | 4 pts | 🟠/🟡 |
| **TOTAL** | **28 stories** | **71 pts** | |

---

### Ordre de développement recommandé (sprints de 5 jours)

**Sprint 1 — Fondations** (US-001, US-002, US-003, US-010, US-011)
> Infrastructure + Design System + Layout

**Sprint 2 — Accueil & Auth** (US-020→024, US-030, US-031, US-032)
> Page d'accueil complète + Inscription/Connexion

**Sprint 3 — Membres & Annuaire** (US-033→035, US-040→042)
> Profils membres + Annuaire personnalités

**Sprint 4 — Opportunités & Gouvernance** (US-050→052, US-060→063)
> Espace Opportunités + Gouvernance

**Sprint 5 — Polish & Lancement** (US-070, US-071 + corrections + tests)
> SEO + PWA + Recette finale + Go live 🚀

---

*Document généré par l'agent PM BMAD — AGACI Digital Platform*
*Prochaine étape recommandée : Démarrer le Sprint 1 avec l'agent Developer*
