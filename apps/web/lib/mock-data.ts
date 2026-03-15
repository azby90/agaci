/**
 * Données de démonstration AGACI
 * Utilisées quand Directus n'est pas connecté (mode démo/développement)
 */

import type { ProfilInfluent, Opportunite, Article, Evenement, DocumentGouvernance } from './directus-queries'

// ─── ANNUAIRE ─────────────────────────────────────────────────────────────────

export const MOCK_PROFILS: ProfilInfluent[] = [
  {
    id: '1',
    membre_id: { id: 'm1', prenom: 'Jean-Baptiste', nom: 'Ndong Mba', photo: null, visibilite_profil: 'public' },
    titre: 'Directeur Général — Groupe Financier Atlantique CI',
    biographie: 'Cadre supérieur avec 18 ans d\'expérience dans la finance d\'entreprise et la banque d\'investissement en Afrique subsaharienne. Diplômé de HEC Paris, il pilote aujourd\'hui le développement stratégique d\'un groupe présent dans 6 pays.',
    secteur: 'Finance & Banque',
    expertise: ['Finance d\'entreprise', 'Investissement', 'Gestion des risques', 'Fusion-acquisition'],
    disponible_mentorat: true,
    linkedin_url: 'https://linkedin.com',
    photo_url: null,
  },
  {
    id: '2',
    membre_id: { id: 'm2', prenom: 'Marie-Claire', nom: 'Obame Nguema', photo: null, visibilite_profil: 'public' },
    titre: 'Avocate associée — Cabinet Juridique Panafrican & Partners',
    biographie: 'Spécialiste en droit des affaires, droit OHADA et arbitrage commercial international. Après Paris et Bruxelles, elle s\'est installée à Abidjan en 2018 pour accompagner les entreprises gabonaises dans leur expansion en CI.',
    secteur: 'Droit & Justice',
    expertise: ['Droit OHADA', 'Arbitrage commercial', 'Droit des sociétés', 'Contrats internationaux'],
    disponible_mentorat: true,
    linkedin_url: 'https://linkedin.com',
    photo_url: null,
  },
  {
    id: '3',
    membre_id: { id: 'm3', prenom: 'Christian', nom: 'Mba Akué', photo: null, visibilite_profil: 'public' },
    titre: 'CEO & Co-fondateur — PayGab Technologies',
    biographie: 'Entrepreneur tech ayant lancé une fintech de paiement mobile ciblant les diasporas africaines. Ex-ingénieur chez MTN Group, il a levé 2M$ en seed funding en 2024. Lauréat Prix AGACI Entrepreneur 2024.',
    secteur: 'Technologies & Numérique',
    expertise: ['Fintech', 'Paiement mobile', 'Startup', 'Levée de fonds'],
    disponible_mentorat: true,
    linkedin_url: 'https://linkedin.com',
    photo_url: null,
  },
  {
    id: '4',
    membre_id: { id: 'm4', prenom: 'Dr. Sylvie', nom: 'Nzeng Ondo', photo: null, visibilite_profil: 'public' },
    titre: 'Médecin Chef — Clinique Sainte-Famille, Cocody',
    biographie: 'Spécialiste en médecine interne et maladies infectieuses, formée à Libreville puis à l\'Université de Bordeaux. Elle dirige aujourd\'hui l\'une des cliniques privées les plus réputées d\'Abidjan, avec une équipe de 45 professionnels de santé.',
    secteur: 'Santé & Médecine',
    expertise: ['Médecine interne', 'Maladies infectieuses', 'Management médical', 'Santé publique'],
    disponible_mentorat: false,
    linkedin_url: null,
    photo_url: null,
  },
  {
    id: '5',
    membre_id: { id: 'm5', prenom: 'Paul', nom: 'Nguema Essone', photo: null, visibilite_profil: 'public' },
    titre: 'Consultant en Relations Internationales — Ancien Diplomate',
    biographie: 'Après 20 ans au service de la diplomatie gabonaise, dont des postes en Côte d\'Ivoire, en France et à l\'ONU, il conseille aujourd\'hui des gouvernements et organisations africaines sur les enjeux de gouvernance et de coopération régionale.',
    secteur: 'Diplomatie & Relations Internationales',
    expertise: ['Diplomatie', 'Gouvernance', 'Coopération régionale', 'Négociation'],
    disponible_mentorat: true,
    linkedin_url: 'https://linkedin.com',
    photo_url: null,
  },
  {
    id: '6',
    membre_id: { id: 'm6', prenom: 'Fatou', nom: 'Mengue Nkoghe', photo: null, visibilite_profil: 'public' },
    titre: 'Fondatrice & Directrice — Chaîne de restauration "Saveurs du Gabon"',
    biographie: 'Entrepreneuse passionnée, elle a fondé en 2019 la première chaîne de restauration gabonaise à Abidjan, aujourd\'hui avec 3 enseignes et 60 employés. Ambassadrice de la gastronomie gabonaise, elle anime des ateliers culinaires réguliers.',
    secteur: 'Entrepreneuriat & Business',
    expertise: ['Restauration', 'Franchise', 'RH & Management', 'Gastronomie africaine'],
    disponible_mentorat: true,
    linkedin_url: 'https://linkedin.com',
    photo_url: null,
  },
  {
    id: '7',
    membre_id: { id: 'm7', prenom: 'Henri', nom: 'Ondo Mintsa', photo: null, visibilite_profil: 'public' },
    titre: 'Directeur des Études — Lycée International Saint-Exupéry, Abidjan',
    biographie: 'Enseignant-chercheur et pédagogue reconnu, docteur en sciences de l\'éducation de l\'Université de Lyon. Il anime des formations pour les enseignants et défend l\'accès à une éducation de qualité pour les enfants gabonais en CI.',
    secteur: 'Éducation & Formation',
    expertise: ['Pédagogie', 'Sciences de l\'éducation', 'Orientation scolaire', 'Formation continue'],
    disponible_mentorat: true,
    linkedin_url: null,
    photo_url: null,
  },
  {
    id: '8',
    membre_id: { id: 'm8', prenom: 'Alice', nom: 'Moussavou Biyoghe', photo: null, visibilite_profil: 'public' },
    titre: 'Journaliste & Directrice de la Rédaction — Radio Afrique Plurielle',
    biographie: 'Journaliste avec 15 ans d\'expérience dans les médias africains francophones. Spécialisée dans les questions économiques et sociales, elle dirige la rédaction d\'une radio présente en CI, au Gabon et au Cameroun.',
    secteur: 'Médias & Communication',
    expertise: ['Journalisme économique', 'Direction de rédaction', 'Médias numériques', 'Communication institutionnelle'],
    disponible_mentorat: false,
    linkedin_url: 'https://linkedin.com',
    photo_url: null,
  },
]

export const MOCK_SECTEURS = [
  'Finance & Banque',
  'Droit & Justice',
  'Technologies & Numérique',
  'Santé & Médecine',
  'Diplomatie & Relations Internationales',
  'Entrepreneuriat & Business',
  'Éducation & Formation',
  'Médias & Communication',
]

// ─── OPPORTUNITÉS ─────────────────────────────────────────────────────────────

export const MOCK_OPPORTUNITES: Opportunite[] = [
  {
    id: '1',
    type: 'emploi',
    titre: 'Responsable Administratif et Financier (RAF)',
    description: `<p>Orange Côte d'Ivoire recrute un Responsable Administratif et Financier pour renforcer son équipe finance à Abidjan-Plateau.</p>
<p><strong>Missions principales :</strong></p>
<ul>
<li>Supervision de la comptabilité générale et analytique</li>
<li>Élaboration des reportings financiers mensuels et annuels</li>
<li>Gestion de la trésorerie et des relations bancaires</li>
<li>Encadrement d'une équipe de 8 personnes</li>
</ul>
<p><strong>Profil recherché :</strong></p>
<ul>
<li>Bac+5 Finance, Comptabilité ou Audit</li>
<li>5 ans d'expérience minimum en gestion financière</li>
<li>Maîtrise SAP ou Oracle Finance</li>
<li>Excellentes capacités d'analyse et de synthèse</li>
</ul>`,
    entreprise: 'Orange Côte d\'Ivoire',
    localisation: 'Abidjan, Plateau',
    date_limite: '2026-04-30',
    lien_candidature: 'mailto:recrutement@orange.ci',
    date_created: '2026-03-01',
    statut: 'actif',
    publie_par: { prenom: 'Bureau', nom: 'AGACI' },
  },
  {
    id: '2',
    type: 'stage',
    titre: 'Stage — Analyste Data & Business Intelligence',
    description: `<p>La BOAD (Banque Ouest-Africaine de Développement) offre un stage de 6 mois dans son département Études et Stratégie.</p>
<p><strong>Missions :</strong></p>
<ul>
<li>Collecte et analyse de données économiques régionales</li>
<li>Création de tableaux de bord Power BI</li>
<li>Contribution aux rapports d'analyse sectorielle</li>
</ul>
<p><strong>Profil :</strong> Étudiant Bac+4/5 en Data Science, Économie ou Statistiques. Maîtrise Python ou R appréciée.</p>
<p><strong>Indemnité :</strong> 250 000 FCFA/mois</p>`,
    entreprise: 'BOAD — Banque Ouest-Africaine de Développement',
    localisation: 'Abidjan, Cocody',
    date_limite: '2026-04-15',
    lien_candidature: 'mailto:stages@boad.org',
    date_created: '2026-03-05',
    statut: 'actif',
    publie_par: { prenom: 'Bureau', nom: 'AGACI' },
  },
  {
    id: '3',
    type: 'emploi',
    titre: 'Chef de Projet IT — Infrastructure & Cloud',
    description: `<p>Bolloré Transport & Logistics Côte d'Ivoire recrute un Chef de Projet IT pour piloter la migration cloud de ses systèmes d'information.</p>
<p><strong>Missions :</strong></p>
<ul>
<li>Pilotage de la migration vers Azure/AWS</li>
<li>Coordination des équipes techniques locales et du siège</li>
<li>Gestion des prestataires et du budget projet (500M FCFA)</li>
<li>Formation des utilisateurs finaux</li>
</ul>
<p><strong>Profil :</strong> Bac+5 Informatique, 7 ans d'expérience, certifications cloud appréciées.</p>`,
    entreprise: 'Bolloré Transport & Logistics CI',
    localisation: 'Abidjan, Yopougon (Zone Industrielle)',
    date_limite: '2026-04-20',
    lien_candidature: 'mailto:rh.ci@bollore.com',
    date_created: '2026-03-03',
    statut: 'actif',
    publie_par: { prenom: 'Bureau', nom: 'AGACI' },
  },
  {
    id: '4',
    type: 'atelier',
    titre: 'Atelier : Leadership Féminin en Entreprise',
    description: `<p>L'AGACI et son partenaire Women in Business Africa organisent un atelier intensif d'une journée dédié au leadership féminin.</p>
<p><strong>Programme :</strong></p>
<ul>
<li>Matinée : Affirmer son leadership — techniques et posture</li>
<li>Déjeuner networking</li>
<li>Après-midi : Négociation salariale et évolution de carrière</li>
<li>Table ronde avec 3 dirigeantes gabonaises</li>
</ul>
<p><strong>Date :</strong> Samedi 28 mars 2026 | 8h30–17h30<br>
<strong>Lieu :</strong> Hôtel Sofitel Abidjan<br>
<strong>Participation :</strong> Gratuite pour les membres AGACI | 15 000 FCFA non-membres</p>`,
    entreprise: 'AGACI & Women in Business Africa',
    localisation: 'Hôtel Sofitel, Abidjan Plateau',
    date_limite: '2026-03-25',
    lien_candidature: 'mailto:contact@agaci.org',
    date_created: '2026-03-02',
    statut: 'actif',
    publie_par: { prenom: 'Bureau', nom: 'AGACI' },
  },
  {
    id: '5',
    type: 'emploi',
    titre: 'Juriste d\'Entreprise — Droit OHADA & Contrats',
    description: `<p>Cabinet international d'avocats recherche un juriste d'entreprise expérimenté pour son bureau d'Abidjan.</p>
<p><strong>Missions :</strong></p>
<ul>
<li>Conseil juridique aux clients entreprises (droit OHADA)</li>
<li>Rédaction et négociation de contrats commerciaux</li>
<li>Accompagnement dans les opérations de M&A</li>
<li>Veille juridique et réglementaire</li>
</ul>
<p><strong>Profil :</strong> Master 2 Droit des affaires, 3-5 ans d'expérience, bilingue français/anglais.</p>
<p><strong>Package :</strong> Attractif selon profil + avantages</p>`,
    entreprise: 'Cabinet Legance Avocats (Bureau Abidjan)',
    localisation: 'Abidjan, Plateau',
    date_limite: '2026-05-01',
    lien_candidature: 'mailto:recrutement@legance-africa.com',
    date_created: '2026-03-06',
    statut: 'actif',
    publie_par: { prenom: 'Bureau', nom: 'AGACI' },
  },
  {
    id: '6',
    type: 'appel_projets',
    titre: 'Appel à Projets — Fonds Innovation Diaspora Gabonaise 2026',
    description: `<p>L'Ambassade du Gabon en Côte d'Ivoire, en partenariat avec l'AGACI, lance le Fonds Innovation Diaspora Gabonaise 2026.</p>
<p><strong>Objectif :</strong> Soutenir des projets innovants portés par des Gabonais résidant en CI dans les secteurs de l'agriculture, la tech, la santé et l'éducation.</p>
<p><strong>Dotation :</strong> Jusqu'à 10 000 000 FCFA par projet sélectionné</p>
<p><strong>Critères d'éligibilité :</strong></p>
<ul>
<li>Porteur de nationalité ou d'origine gabonaise</li>
<li>Projet en phase d'amorçage ou de démarrage</li>
<li>Impact social ou économique démontrable</li>
<li>Membre AGACI à jour de cotisation</li>
</ul>
<p><strong>Dossier à soumettre avant le 30 avril 2026</strong></p>`,
    entreprise: 'Ambassade du Gabon en CI & AGACI',
    localisation: 'Abidjan (dépôt de dossier)',
    date_limite: '2026-04-30',
    lien_candidature: 'mailto:contact@agaci.org',
    date_created: '2026-03-01',
    statut: 'actif',
    publie_par: { prenom: 'Bureau', nom: 'AGACI' },
  },
  {
    id: '7',
    type: 'stage',
    titre: 'Stage — Community Manager & Marketing Digital',
    description: `<p>StartupCI, incubateur de startups basé à Abidjan, recrute un stagiaire en marketing digital pour 4 mois.</p>
<p><strong>Missions :</strong></p>
<ul>
<li>Gestion des réseaux sociaux (Instagram, LinkedIn, Twitter)</li>
<li>Création de contenu (textes, visuels, vidéos courtes)</li>
<li>Suivi des KPIs et reporting mensuel</li>
<li>Participation aux événements de l'écosystème startup</li>
</ul>
<p><strong>Profil :</strong> BTS/Licence Communication, maîtrise Canva/Adobe, passionné par les réseaux sociaux. Créatif et autonome.</p>
<p><strong>Indemnité :</strong> 150 000 FCFA/mois + remboursement transport</p>`,
    entreprise: 'StartupCI — Incubateur d\'Innovation',
    localisation: 'Abidjan, Marcory',
    date_limite: '2026-03-31',
    lien_candidature: 'mailto:jobs@startupci.com',
    date_created: '2026-03-08',
    statut: 'actif',
    publie_par: { prenom: 'Bureau', nom: 'AGACI' },
  },
  {
    id: '8',
    type: 'mentorat',
    titre: 'Programme de Mentorat AGACI — Promotion 2026',
    description: `<p>L'AGACI lance la 3e édition de son programme de mentorat annuel. 15 mentors issus de l'annuaire des personnalités accompagneront 15 jeunes membres pendant 6 mois.</p>
<p><strong>Pour les mentorés :</strong></p>
<ul>
<li>2 séances mensuelles avec votre mentor (1h chacune)</li>
<li>Accès au réseau AGACI et aux événements exclusifs</li>
<li>Ateliers collectifs trimestriels</li>
</ul>
<p><strong>Profil mentorés :</strong></p>
<ul>
<li>Membre AGACI, 18–35 ans</li>
<li>En études supérieures ou en début de carrière (0–5 ans d'expérience)</li>
<li>Motivé(e) et disponible pour les rendez-vous</li>
</ul>
<p><strong>Candidature avant le 15 avril 2026 — 15 places disponibles</strong></p>`,
    entreprise: 'AGACI — Programme Mentorat',
    localisation: 'Abidjan (séances en présentiel ou visio)',
    date_limite: '2026-04-15',
    lien_candidature: 'mailto:jeunes@agaci.org',
    date_created: '2026-03-10',
    statut: 'actif',
    publie_par: { prenom: 'Bureau', nom: 'AGACI' },
  },
]

// ─── ACTUALITÉS ───────────────────────────────────────────────────────────────

export const MOCK_ARTICLES: Article[] = [
  {
    id: '1',
    slug: 'assemblee-generale-2026-bilan-perspectives',
    titre: 'Assemblée Générale 2026 : bilan d\'une année dynamique et cap sur l\'avenir',
    contenu: `<p>L'Assemblée Générale Ordinaire de l'AGACI s'est tenue le 8 mars 2026 à l'Hôtel Ivoire d'Abidjan, en présence de plus de 180 membres. Une édition marquante qui a permis de dresser un bilan positif de l'année écoulée et de dessiner les grandes orientations 2026–2028.</p>

<h2>Un bilan 2025 encourageant</h2>
<p>Le Président de l'AGACI, dans son allocution d'ouverture, a souligné la progression significative des activités de l'association : <strong>+34% de nouveaux membres</strong>, 12 événements organisés, 85 opportunités publiées sur la plateforme et le lancement réussi du volet entrepreneuriat.</p>
<p>Le trésorier a présenté les comptes de l'exercice 2025, affichant un excédent de gestion de 4,2 millions de FCFA, permettant de renforcer le fonds de solidarité sociale.</p>

<h2>Les grandes décisions votées</h2>
<ul>
<li>Reconduction du Bureau exécutif pour un mandat de 2 ans</li>
<li>Adoption du budget 2026 (48 millions FCFA)</li>
<li>Lancement officiel de la plateforme numérique AGACI</li>
<li>Création d'une commission "Relations avec le Gabon"</li>
</ul>

<h2>Cap sur 2026–2028</h2>
<p>Le plan stratégique triennal adopté prévoit notamment : l'atteinte de 500 membres actifs, l'organisation du premier Prix AGACI avec cérémonie officielle, et l'établissement de partenariats formels avec 5 entreprises ivoiriennes pour l'insertion professionnelle des membres.</p>`,
    photo_url: null,
    categorie: 'institutionnel',
    publie_par: { prenom: 'Bureau', nom: 'AGACI' },
    publie_le: '2026-03-09',
    date_created: '2026-03-09',
  },
  {
    id: '2',
    slug: 'partenariat-ambassade-gabon-ci',
    titre: 'L\'AGACI signe un accord de partenariat avec l\'Ambassade du Gabon en CI',
    contenu: `<p>Une étape majeure dans l'histoire de l'AGACI : l'association a signé le 15 février 2026 un accord-cadre de partenariat avec l'Ambassade de la République Gabonaise en Côte d'Ivoire. Cette convention renforce les liens institutionnels entre la communauté gabonaise d'Abidjan et ses représentants diplomatiques.</p>

<h2>Contenu de l'accord</h2>
<p>Cet accord-cadre prévoit une collaboration sur plusieurs axes stratégiques :</p>
<ul>
<li><strong>Appui consulaire :</strong> facilitation des démarches administratives pour les membres AGACI</li>
<li><strong>Fonds Innovation Diaspora :</strong> co-financement de projets entrepreneuriaux (voir notre appel à projets)</li>
<li><strong>Échanges culturels :</strong> organisation conjointe d'événements valorisant la culture gabonaise</li>
<li><strong>Information :</strong> accès privilégié aux informations concernant le Gabon pour les membres</li>
</ul>

<h2>La parole aux signataires</h2>
<p><em>"Ce partenariat traduit la reconnaissance officielle du rôle que joue l'AGACI auprès de nos ressortissants. Nous travaillerons ensemble pour que chaque Gabonais en Côte d'Ivoire se sente soutenu et accompagné."</em><br>— S.E. l'Ambassadeur du Gabon en CI</p>
<p><em>"C'est une fierté et une responsabilité. L'AGACI devient un interlocuteur reconnu. Nous allons tenir cette confiance."</em><br>— Le Président de l'AGACI</p>`,
    photo_url: null,
    categorie: 'partenariat',
    publie_par: { prenom: 'Bureau', nom: 'AGACI' },
    publie_le: '2026-02-16',
    date_created: '2026-02-16',
  },
  {
    id: '3',
    slug: 'portrait-christian-mba-entrepreneur-mois',
    titre: 'Portrait : Christian Mba Akué, l\'entrepreneur gabonais qui révolutionne le paiement mobile',
    contenu: `<p>Il a 34 ans, un diplôme d'ingénieur de l'École Polytechnique de Thiès et une ambition : simplifier les transferts d'argent pour les diasporas africaines. Christian Mba Akué, lauréat du Prix AGACI Entrepreneur 2024, nous raconte son parcours.</p>

<h2>De MTN à la création de PayGab</h2>
<p>Après 6 ans chez MTN Group, d'abord à Libreville puis à Abidjan, Christian identifie un problème récurrent : les frais exorbitants et les délais des transferts entre diasporas africaines. "Ma famille au Gabon perdait 15% de chaque virement que j'envoyais. C'était inacceptable."</p>
<p>En 2022, il quitte MTN et co-fonde PayGab Technologies avec deux associés. En deux ans, la startup compte 45 000 utilisateurs actifs et traite plus de 2 milliards de FCFA de transactions mensuelles.</p>

<h2>La levée de fonds historique</h2>
<p>En octobre 2024, PayGab Technologies boucle un tour de table de 2 millions de dollars auprès d'investisseurs panafricains. "L'AGACI m'a ouvert des portes. Le réseau, c'est tout."</p>

<h2>Sa vision pour la communauté</h2>
<p>Mentor actif dans l'annuaire AGACI, Christian accompagne aujourd'hui 3 jeunes entrepreneurs. "Je dois rendre ce que j'ai reçu. Si ma réussite ne profite pas à d'autres Gabonais, elle n'a pas de sens."</p>`,
    photo_url: null,
    categorie: 'communaute',
    publie_par: { prenom: 'Rédaction', nom: 'AGACI' },
    publie_le: '2026-02-28',
    date_created: '2026-02-28',
  },
  {
    id: '4',
    slug: 'lancement-plateforme-numerique-agaci',
    titre: 'La plateforme numérique AGACI est officiellement lancée !',
    contenu: `<p>Après plusieurs mois de développement, l'AGACI est fière d'annoncer le lancement officiel de sa plateforme numérique. Un outil moderne au service des 300+ membres de l'association.</p>

<h2>Pourquoi cette plateforme ?</h2>
<p>L'AGACI a longtemps fonctionné sur des groupes WhatsApp et des listes email. Efficaces, mais limités. La plateforme répond à un besoin concret : centraliser, professionnaliser et amplifier les services que nous offrons à nos membres.</p>

<h2>Ce que vous pouvez faire dès maintenant</h2>
<ul>
<li><strong>Annuaire :</strong> Découvrez et contactez les 40+ personnalités répertoriées dans l'annuaire</li>
<li><strong>Opportunités :</strong> Consultez les offres d'emploi, stages et ateliers publiés chaque semaine</li>
<li><strong>Actualités :</strong> Restez informé de la vie de l'association</li>
<li><strong>Événements :</strong> Consultez l'agenda et inscrivez-vous aux événements</li>
<li><strong>Espace membre :</strong> Gérez votre profil et vos préférences</li>
</ul>

<h2>Et la suite ?</h2>
<p>La plateforme évoluera avec vos besoins : paiement de cotisation en ligne, forum communautaire, notifications push... Vos retours sont précieux. Écrivez-nous à contact@agaci.org</p>`,
    photo_url: null,
    categorie: 'institutionnel',
    publie_par: { prenom: 'Bureau', nom: 'AGACI' },
    publie_le: '2026-03-01',
    date_created: '2026-03-01',
  },
  {
    id: '5',
    slug: 'gala-excellence-gabonaise-2025-retour',
    titre: 'Retour sur le Gala de l\'Excellence Gabonaise 2025 — une soirée mémorable',
    contenu: `<p>Le Gala de l'Excellence Gabonaise AGACI 2025 restera dans les mémoires. Plus de 250 personnes réunies le 26 avril au Grand Bassam Resort pour célébrer les réussites de notre communauté. Retour sur cette soirée d'exception.</p>

<h2>La cérémonie des Prix AGACI</h2>
<p>Moment fort de la soirée, la remise des premiers Prix AGACI a récompensé trois membres d'exception :</p>
<ul>
<li><strong>Prix Meilleur Étudiant :</strong> Ornella Bongo (Major de promotion — ESCA Abidjan)</li>
<li><strong>Prix Meilleur Entrepreneur :</strong> Christian Mba Akué (PayGab Technologies)</li>
<li><strong>Prix Leader Communautaire :</strong> Dr. Sylvie Nzeng Ondo (25 ans d'engagement)</li>
</ul>

<h2>Une soirée riche en émotions</h2>
<p>Entre les discours inspirants, les témoignages des lauréats, les danses traditionnelles gabonaises et le dîner gastronomique orchestré par Fatou Mengue, la soirée a tenu toutes ses promesses. L'Ambassadeur du Gabon en CI a honoré l'événement de sa présence.</p>

<h2>Rendez-vous en 2026</h2>
<p>Le prochain Gala est prévu pour avril 2026. Les candidatures pour les Prix AGACI 2026 ouvriront en janvier. Préparez vos dossiers !</p>`,
    photo_url: null,
    categorie: 'communaute',
    publie_par: { prenom: 'Rédaction', nom: 'AGACI' },
    publie_le: '2026-04-30',
    date_created: '2025-04-30',
  },
  {
    id: '6',
    slug: 'nouveaux-membres-q1-2026',
    titre: '42 nouveaux membres rejoignent l\'AGACI au premier trimestre 2026',
    contenu: `<p>Le premier trimestre 2026 confirme l'élan de l'AGACI : 42 nouveaux membres ont rejoint l'association entre janvier et mars, portant les effectifs à plus de 320 membres actifs. Un record historique qui reflète la vitalité de la communauté gabonaise à Abidjan.</p>

<h2>Qui sont ces nouveaux membres ?</h2>
<p>Une belle diversité de profils : 40% d'étudiants et jeunes diplômés, 45% de professionnels en activité, 15% d'entrepreneurs. Ils viennent de tous les secteurs : santé, droit, ingénierie, commerce, communication...</p>
<p>Géographiquement, ils sont majoritairement basés à Cocody, Plateau et Marcory, avec quelques membres à Bouaké et San-Pédro.</p>

<h2>Le mot du Secrétaire Général</h2>
<p><em>"Chaque nouveau membre est une richesse pour notre communauté. Nous mettons tout en œuvre pour que chacun trouve dans l'AGACI un vrai chez-soi, loin de chez soi."</em></p>

<h2>Rejoignez-nous</h2>
<p>L'adhésion à l'AGACI est ouverte à toute personne de nationalité ou d'origine gabonaise résidant en Côte d'Ivoire. Inscription gratuite sur cette plateforme.</p>`,
    photo_url: null,
    categorie: 'communaute',
    publie_par: { prenom: 'Bureau', nom: 'AGACI' },
    publie_le: '2026-03-10',
    date_created: '2026-03-10',
  },
]

// ─── ÉVÉNEMENTS ───────────────────────────────────────────────────────────────

export const MOCK_EVENEMENTS: Evenement[] = [
  {
    id: '1',
    titre: 'Gala de l\'Excellence Gabonaise 2026 — Prix AGACI',
    description: `<p>La soirée la plus attendue de la communauté gabonaise en Côte d'Ivoire revient pour une 2e édition encore plus grandiose.</p>
<p>Au programme : remise des Prix AGACI 2026 (Meilleur Étudiant, Meilleur Entrepreneur, Leader Communautaire), dîner gastronomique aux saveurs du Gabon, danses traditionnelles, networking et surprises.</p>
<p><strong>Tenue de soirée exigée.</strong></p>
<p>Billets disponibles auprès du bureau ou par email.</p>`,
    date_debut: '2026-04-25T18:30:00',
    date_fin: '2026-04-25T23:30:00',
    lieu: 'Hôtel Ivoire, Grand Ballroom — Abidjan, Cocody',
    type: 'ceremonie',
    public: true,
    photo_url: null,
  },
  {
    id: '2',
    titre: 'Assemblée Générale Ordinaire 2026',
    description: `<p>Conformément aux statuts de l'association, l'Assemblée Générale Ordinaire 2026 réunira l'ensemble des membres pour :</p>
<ul>
<li>Présentation et vote du bilan moral et financier 2025</li>
<li>Vote du budget 2026</li>
<li>Points divers</li>
<li>Moment convivial de clôture</li>
</ul>
<p>La présence de tous les membres est souhaitée. Procurations acceptées. Ordre du jour complet envoyé 15 jours avant la réunion.</p>`,
    date_debut: '2026-03-28T10:00:00',
    date_fin: '2026-03-28T13:00:00',
    lieu: 'Salle de conférence AGACI — Abidjan, Plateau',
    type: 'reunion',
    public: false,
    photo_url: null,
  },
  {
    id: '3',
    titre: 'Atelier : Créer et Financer sa Startup en Côte d\'Ivoire',
    description: `<p>La commission Entrepreneuriat AGACI organise un atelier pratique d'une journée pour les porteurs de projets et jeunes entrepreneurs.</p>
<p><strong>Intervenants :</strong></p>
<ul>
<li>Christian Mba Akué — CEO PayGab Technologies (parcours entrepreneur)</li>
<li>Marie-Claire Obame Nguema — Avocate (aspects juridiques de la création)</li>
<li>Représentant Banque Atlantique CI (financement et crédit)</li>
</ul>
<p><strong>Gratuit pour les membres AGACI.</strong> Inscription obligatoire (places limitées à 40).</p>`,
    date_debut: '2026-03-22T08:30:00',
    date_fin: '2026-03-22T17:00:00',
    lieu: 'ESCA Business School — Abidjan, Cocody',
    type: 'atelier',
    public: true,
    photo_url: null,
  },
  {
    id: '4',
    titre: 'Soirée Networking — Communauté Gabonaise & Partenaires Ivoiriens',
    description: `<p>L'AGACI organise sa soirée networking trimestrielle, ouverte aux membres et à leurs invités. Une occasion unique de tisser des liens professionnels et amicaux dans une ambiance détendue.</p>
<p>Cocktail, buffet gabono-ivoirien, musique d'ambiance. Espace de présentation de 3 minutes pour tout membre souhaitant partager un projet ou une opportunité.</p>
<p>Entrée : 5 000 FCFA (membres) / 10 000 FCFA (invités non-membres) — inclut le buffet.</p>`,
    date_debut: '2026-04-10T19:00:00',
    date_fin: '2026-04-10T22:30:00',
    lieu: 'Restaurant Le Jardin Tropical — Abidjan, Marcory',
    type: 'autre',
    public: true,
    photo_url: null,
  },
  {
    id: '5',
    titre: 'Formation : Droits des Expatriés Gabonais en CI',
    description: `<p>La commission juridique AGACI, en collaboration avec le cabinet Panafrican & Partners, organise une formation sur les droits et obligations des ressortissants gabonais résidant en Côte d'Ivoire.</p>
<p><strong>Thèmes abordés :</strong></p>
<ul>
<li>Titre de séjour et permis de travail : démarches et renouvellement</li>
<li>Droits en cas de litige avec un employeur</li>
<li>Accès aux soins et à l'éducation</li>
<li>Succession et propriété immobilière pour les étrangers</li>
</ul>
<p>Session de questions-réponses avec Me Marie-Claire Obame Nguema. Entrée libre pour les membres.</p>`,
    date_debut: '2026-03-29T14:00:00',
    date_fin: '2026-03-29T17:00:00',
    lieu: 'Bibliothèque Nationale de Côte d\'Ivoire — Abidjan, Plateau',
    type: 'atelier',
    public: true,
    photo_url: null,
  },
  {
    id: '6',
    titre: 'Journée Culturelle Gabonaise — Gabon en Fête !',
    description: `<p>Pour la première fois, l'AGACI organise une grande journée culturelle dédiée à la richesse et la diversité du Gabon. Une célébration ouverte à tous, membres et non-membres, Gabonais et Ivoiriens.</p>
<p><strong>Au programme :</strong></p>
<ul>
<li>Exposition artisanat et peinture gabonais</li>
<li>Démonstrations de danses traditionnelles</li>
<li>Marché de produits gabonais (gastronomie, artisanat, mode)</li>
<li>Tournoi de jeux traditionnels</li>
<li>Concert acoustique en soirée</li>
</ul>
<p>Entrée libre. Venez nombreux !</p>`,
    date_debut: '2026-05-16T10:00:00',
    date_fin: '2026-05-16T22:00:00',
    lieu: 'Parc des Sports d\'Abidjan — Treichville',
    type: 'ceremonie',
    public: true,
    photo_url: null,
  },
]

// ─── DOCUMENTS GOUVERNANCE ────────────────────────────────────────────────────

export const MOCK_DOCUMENTS: DocumentGouvernance[] = [
  {
    id: '1',
    titre: 'Rapport Annuel AGACI 2025',
    type: 'rapport',
    fichier_url: '#',
    date_publication: '2026-01-20',
    publie_par: { prenom: 'Bureau', nom: 'AGACI' },
  },
  {
    id: '2',
    titre: 'Budget Prévisionnel 2026',
    type: 'budget',
    fichier_url: '#',
    date_publication: '2026-02-01',
    publie_par: { prenom: 'Trésorerie', nom: 'AGACI' },
  },
  {
    id: '3',
    titre: 'Compte-rendu AG Ordinaire — Octobre 2025',
    type: 'cr_reunion',
    fichier_url: '#',
    date_publication: '2025-10-20',
    publie_par: { prenom: 'Secrétariat', nom: 'AGACI' },
  },
  {
    id: '4',
    titre: 'Code d\'Éthique et de Conduite AGACI — Version 2024',
    type: 'code_ethique',
    fichier_url: '#',
    date_publication: '2024-03-01',
    publie_par: { prenom: 'Bureau', nom: 'AGACI' },
  },
  {
    id: '5',
    titre: 'Rapport d\'Activités — 1er Semestre 2025',
    type: 'rapport',
    fichier_url: '#',
    date_publication: '2025-07-15',
    publie_par: { prenom: 'Bureau', nom: 'AGACI' },
  },
  {
    id: '6',
    titre: 'Compte-rendu Réunion Bureau — Décembre 2025',
    type: 'cr_reunion',
    fichier_url: '#',
    date_publication: '2025-12-15',
    publie_par: { prenom: 'Secrétariat', nom: 'AGACI' },
  },
]
