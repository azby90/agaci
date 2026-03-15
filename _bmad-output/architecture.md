# AGACI — Document d'Architecture Technique
**Version : 1.0 | Date : 2026-03-10 | Statut : DRAFT**
*Produit par l'agent Architect BMAD*

---

## 1. VUE D'ENSEMBLE

### Décision architecturale principale

> **Architecture choisie : Monorepo fullstack avec Next.js (frontend/API) + Directus (CMS headless) + PostgreSQL**

Justification du choix :
- **Next.js** : SSR/SSG natif pour SEO, App Router, API Routes intégrées → un seul déploiement
- **Directus** : CMS headless open-source, interface admin no-code parfaite pour un webmaster bénévole, supporte le français, REST + GraphQL auto-générés
- **PostgreSQL** : Robuste, relationnel, supporté nativement par Directus, hébergeable partout
- **CinetPay** : API paiement ivoirienne unique couvrant MTN MoMo, Orange Money, Visa/MC, virement

---

## 2. SCHÉMA D'ARCHITECTURE GLOBAL

```
┌─────────────────────────────────────────────────────────────┐
│                     UTILISATEURS                            │
│         Membres  │  Visiteurs  │  Webmaster Admin           │
└──────────┬────────┴──────┬──────┴──────┬───────────────────┘
           │               │             │
           ▼               ▼             ▼
┌─────────────────────────────────────────────────────────────┐
│              FRONTEND — Next.js 14 (App Router)             │
│  • Pages publiques (SSG/ISR)                                │
│  • Espace membres (SSR protégé)                             │
│  • PWA (Service Worker + Manifest)                          │
│  • Internationalisation FR uniquement                       │
└──────────────────────┬──────────────────────────────────────┘
                       │ API Routes / Server Actions
           ┌───────────┼───────────┐
           ▼           ▼           ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────────────────┐
│  Directus    │ │  Auth        │ │  Services Externes        │
│  CMS API     │ │  (NextAuth)  │ │  • CinetPay (paiements)  │
│  REST/GQL    │ │  + JWT       │ │  • Resend (emails)        │
│  Collections │ │  + Sessions  │ │  • Cloudinary (images)    │
└──────┬───────┘ └──────────────┘ └──────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────────────────────────┐
│                 PostgreSQL (Base de données)                 │
│         Données métier + Assets metadata                    │
└─────────────────────────────────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────────────────────────┐
│               Stockage Fichiers                             │
│         Cloudinary (images) ou MinIO (self-hosted)          │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. STACK TECHNIQUE DÉFINITIF

### Frontend
| Technologie | Version | Rôle |
|-------------|---------|------|
| **Next.js** | 14+ (App Router) | Framework React SSR/SSG |
| **TypeScript** | 5+ | Typage statique |
| **Tailwind CSS** | 3+ | Styling utilitaire |
| **shadcn/ui** | latest | Composants UI accessibles |
| **React Query** (TanStack) | 5+ | Data fetching & cache côté client |
| **next-auth** | 5+ | Authentification |
| **React Hook Form** | 7+ | Gestion formulaires |
| **Zod** | 3+ | Validation schemas |

### Backend / CMS
| Technologie | Version | Rôle |
|-------------|---------|------|
| **Directus** | 10+ | CMS headless + Admin UI |
| **Node.js** | 20 LTS | Runtime Directus |
| **PostgreSQL** | 15+ | Base de données principale |
| **Redis** | 7+ | Cache sessions + rate limiting |

### Infrastructure
| Service | Rôle |
|---------|------|
| **Vercel** | Hébergement Next.js (déploiement auto depuis Git) |
| **Railway / Render** | Hébergement Directus + PostgreSQL + Redis |
| **Cloudinary** | CDN images + optimisation automatique |
| **Resend** | Transactionnel email (notifications, welcome, mdp) |
| **CinetPay** | Paiements (MTN MoMo, Orange Money, Visa, Virement) |

### DevOps & Qualité
| Outil | Rôle |
|-------|------|
| **GitHub** | Versioning + CI/CD |
| **GitHub Actions** | Pipeline CI (tests, lint, build) |
| **Vercel** | CD automatique (preview branches + prod) |
| **Sentry** | Monitoring erreurs production |

---

## 4. MODÈLE DE DONNÉES

### Collections Directus (tables principales)

#### `membres`
```
id, created_at, updated_at
email (unique), mot_de_passe_hash
prenom, nom, photo
telephone, date_naissance
ville_ci, ville_gabon_origine
statut: enum(actif, inactif, suspendu)
role: enum(membre, admin, webmaster)
visibilite_profil: enum(public, membres, prive)
date_adhesion, numero_membre
parrain_id → membres.id (nullable, Phase 2)
```

#### `profils_influents`
```
id, membre_id → membres.id
titre, biographie, secteur
expertise[] (array tags)
disponible_mentorat: boolean
linkedin_url, photo_url
valide_par_admin: boolean
```

#### `opportunites`
```
id, created_at
type: enum(emploi, stage, appel_projets, atelier, mentorat)
titre, description, entreprise
localisation, date_limite, lien_candidature
publie_par → membres.id
statut: enum(actif, expiré, archivé)
```

#### `projets_entrepreneuriaux`
```
id, porteur_id → membres.id
nom, description, secteur, stade
besoin: enum(financement, mentorat, partenariat, visibilité)
montant_cible (nullable), montant_collecte
photo_url, lien_externe
valide_par_admin: boolean
```

#### `evenements`
```
id, titre, description
date_debut, date_fin
lieu, type: enum(reunion, ceremonie, atelier, autre)
public: boolean
photo_url
```

#### `actualites`
```
id, titre, contenu (rich text), photo_url
categorie: enum(communauté, institutionnel, partenariat)
publie_par → membres.id, publie_le
```

#### `prix_agaci`
```
id, annee, categorie: enum(etudiant, entrepreneur, leader)
laureat_id → membres.id
description_merite, photo_ceremonie
```

#### `paiements`
```
id, created_at
membre_id → membres.id
type: enum(cotisation, don_projet, collecte_fonds)
montant, devise: default(XOF)
methode: enum(mtn_momo, orange_money, visa, virement)
statut: enum(en_attente, confirme, echoue, rembourse)
cinetpay_transaction_id
reference_projet (nullable)
```

#### `documents_gouvernance`
```
id, titre, type: enum(rapport, cr_reunion, budget, code_ethique, autre)
fichier_url, date_publication
publie_par → membres.id
```

---

## 5. ARCHITECTURE D'AUTHENTIFICATION

```
Visiteur ──→ Pages publiques (accueil, annuaire partiel, opportunités)
                    │
                    ▼
              Inscription/Connexion (NextAuth)
                    │
                    ▼
Membre connecté ──→ Profil complet, messagerie, candidatures, vote Prix
                    │
              [role: webmaster/admin]
                    │
                    ▼
Admin ──────→ Dashboard Directus (gestion contenu, validation, stats)
```

### Flux d'inscription membre
1. Formulaire Next.js → validation Zod
2. Création compte via API Directus
3. Email de confirmation (Resend)
4. Activation manuelle OU automatique (configurable)
5. Import CSV : script d'import one-shot avec matching email

### Gestion des rôles
| Rôle | Capacités |
|------|-----------|
| `visiteur` | Lecture pages publiques, annuaire public |
| `membre` | Profil, opportunités, projets, vote Prix AGACI |
| `webmaster` | + Directus Admin (contenu, validation, modération) |
| `admin` | + Gestion membres, exports, configuration |

---

## 6. ARCHITECTURE PWA

```
next.config.js
  └── next-pwa plugin
       ├── manifest.json (icônes AGACI, couleurs brand)
       ├── Service Worker (cache assets statiques)
       └── Offline page (page hors-ligne élégante)
```

Capacités PWA activées :
- Installation sur écran d'accueil (Android/iOS)
- Cache pages visitées récemment
- Notifications push (Phase 2 — nouvelles opportunités)
- Fonctionne sur connexion lente (3G Abidjan)

---

## 7. INTÉGRATION CINETPAY

```
Frontend (formulaire don/cotisation)
  └── POST /api/payments/initiate
        ├── Création transaction CinetPay
        ├── Redirection vers page paiement CinetPay
        └── Webhook CinetPay → /api/payments/webhook
              ├── Vérification signature HMAC
              ├── Mise à jour statut paiement (PostgreSQL)
              └── Email confirmation (Resend)
```

Variables d'environnement requises :
```
CINETPAY_API_KEY=
CINETPAY_SITE_ID=
CINETPAY_WEBHOOK_SECRET=
```

---

## 8. STRUCTURE DU PROJET (Monorepo)

```
agaci/
├── apps/
│   ├── web/                    # Next.js frontend
│   │   ├── app/
│   │   │   ├── (public)/       # Pages publiques
│   │   │   │   ├── page.tsx    # Accueil
│   │   │   │   ├── annuaire/
│   │   │   │   ├── opportunites/
│   │   │   │   ├── actualites/
│   │   │   │   └── gouvernance/
│   │   │   ├── (auth)/         # Connexion/inscription
│   │   │   ├── (membres)/      # Espace membres (protégé)
│   │   │   │   ├── profil/
│   │   │   │   ├── projets/
│   │   │   │   └── prix-agaci/
│   │   │   └── api/            # API Routes Next.js
│   │   │       ├── auth/
│   │   │       ├── payments/
│   │   │       └── webhooks/
│   │   ├── components/
│   │   │   ├── ui/             # shadcn/ui
│   │   │   ├── layout/         # Header, Footer, Nav
│   │   │   └── features/       # Composants métier
│   │   ├── lib/
│   │   │   ├── directus.ts     # Client Directus SDK
│   │   │   ├── auth.ts         # Config NextAuth
│   │   │   └── cinetpay.ts     # Client CinetPay
│   │   └── public/
│   │       └── pwa/            # Icons, manifest
│   └── directus/               # Config Directus custom
│       ├── extensions/         # Hooks, endpoints custom
│       └── snapshots/          # Schema DB versionnés
├── packages/
│   ├── types/                  # Types TypeScript partagés
│   └── config/                 # Config partagée (eslint, ts)
├── .github/
│   └── workflows/
│       ├── ci.yml              # Tests + lint
│       └── deploy.yml          # Déploiement Vercel
├── docker-compose.yml          # Dev local (PG + Redis + Directus)
└── package.json                # Monorepo (pnpm workspaces)
```

---

## 9. ENVIRONNEMENTS

| Env | Frontend | CMS | Base de données |
|-----|----------|-----|-----------------|
| **Local** | localhost:3000 | localhost:8055 | Docker PostgreSQL |
| **Preview** | Vercel (auto PR) | Railway staging | PG staging |
| **Production** | Vercel prod | Railway prod | PG prod |

---

## 10. PLAN DE DÉPLOIEMENT INITIAL

### Étape 1 — Environnement local (Jour 1)
```bash
# Prérequis : Node 20, pnpm, Docker Desktop
git clone https://github.com/[org]/agaci
pnpm install
docker-compose up -d          # Lance PG + Redis + Directus
pnpm dev                      # Lance Next.js
```

### Étape 2 — Configuration Directus (Jour 1-2)
1. Créer toutes les collections (modèle de données section 4)
2. Configurer les rôles et permissions
3. Paramétrer les langues (français)
4. Créer l'utilisateur webmaster

### Étape 3 — Déploiement staging (Semaine 1)
1. Créer projet Railway → Directus + PostgreSQL + Redis
2. Connecter repo GitHub → Vercel (auto-deploy)
3. Configurer variables d'environnement
4. Tester les flows critiques (inscription, paiement)

### Étape 4 — Déploiement production (Semaine MVP)
1. Pointer le domaine réservé vers Vercel
2. Activer SSL (automatique Vercel)
3. Configurer CinetPay en mode production
4. Import CSV des membres existants
5. Go live 🚀

---

## 11. ESTIMATIONS TECHNIQUES

### Complexité par module

| Module | Complexité | Durée estimée | Phase |
|--------|-----------|---------------|-------|
| Infrastructure & Setup | Moyenne | 3 jours | Pré-MVP |
| Accueil & pages statiques | Faible | 3 jours | 1 |
| Authentification membres | Moyenne | 4 jours | 1 |
| Annuaire personnalités | Faible | 2 jours | 1 |
| Espace Opportunités | Faible | 3 jours | 1 |
| Gouvernance & Transparence | Faible | 2 jours | 1 |
| Volet Jeunes | Faible | 2 jours | 2 |
| Entrepreneuriat & Projets | Moyenne | 4 jours | 2 |
| Prix AGACI | Faible | 2 jours | 2 |
| Paiements CinetPay | Élevée | 5 jours | 2 |
| Inclusion Sociale | Faible | 2 jours | 3 |
| PWA + Notifications | Moyenne | 3 jours | 3 |
| **TOTAL MVP (Phase 1)** | | **~17 jours** | |
| **TOTAL Phase 2** | | **~13 jours** | |

> *Estimations pour un développeur fullstack expérimenté. À ajuster selon disponibilité.*

---

## 12. DÉCISIONS ARCHITECTURALES RESTANTES

| Décision | Options | Recommandation | Priorité |
|----------|---------|---------------|----------|
| Gestionnaire de paquets | npm / pnpm / yarn | **pnpm** (monorepo, performance) | Haute |
| Stockage images | Cloudinary / MinIO / S3 | **Cloudinary** (gratuit 25GB, CDN intégré) | Haute |
| Email | Resend / SendGrid / Mailchimp | **Resend** (DX excellente, gratuit 3000/mois) | Haute |
| Forum membres | Discourse / custom / commentaires | **Reporté Phase 3** (complexité élevée) | Basse |
| Hébergement Directus | Railway / Render / VPS | **Railway** (simple, scalable, ~5$/mois) | Haute |

---

*Document généré par l'agent Architect BMAD — AGACI Digital Platform*
*Prochaine étape : Créer les user stories avec l'agent PM, ou démarrer le développement Phase 1*
