import {
  MOCK_PROFILS,
  MOCK_SECTEURS,
  MOCK_OPPORTUNITES,
  MOCK_ARTICLES,
  MOCK_EVENEMENTS,
  MOCK_DOCUMENTS,
} from './mock-data'

const DIRECTUS_URL = process.env.DIRECTUS_URL || 'http://localhost:8055'
const DIRECTUS_TOKEN = process.env.DIRECTUS_ADMIN_TOKEN || ''

const headers = {
  Authorization: `Bearer ${DIRECTUS_TOKEN}`,
  'Content-Type': 'application/json',
}

// ─── ANNUAIRE ─────────────────────────────────────────────────────────────────

export interface ProfilInfluent {
  id: string
  membre_id: {
    id: string
    prenom: string
    nom: string
    photo: string | null
    visibilite_profil: string
  }
  titre: string
  biographie: string
  secteur: string
  expertise: string[]
  disponible_mentorat: boolean
  linkedin_url: string | null
  photo_url: string | null
}

export async function getProfilsInfluents(params?: {
  secteur?: string
  mentorat?: boolean
  search?: string
  page?: number
  limit?: number
}) {
  const limit = params?.limit || 12
  const page = params?.page || 1
  const offset = (page - 1) * limit

  try {
    let filter = 'filter[valide_par_admin][_eq]=true'
    if (params?.secteur) filter += `&filter[secteur][_eq]=${encodeURIComponent(params.secteur)}`
    if (params?.mentorat) filter += `&filter[disponible_mentorat][_eq]=true`
    if (params?.search) filter += `&search=${encodeURIComponent(params.search)}`

    const res = await fetch(
      `${DIRECTUS_URL}/items/profils_influents?${filter}&fields=id,titre,biographie,secteur,expertise,disponible_mentorat,linkedin_url,photo_url,membre_id.id,membre_id.prenom,membre_id.nom,membre_id.photo,membre_id.visibilite_profil&limit=${limit}&offset=${offset}&meta=total_count`,
      { headers, next: { revalidate: 300 } }
    )
    if (!res.ok) throw new Error()
    const json = await res.json()
    return { data: json.data as ProfilInfluent[], total: json.meta?.total_count || 0 }
  } catch {
    // Données de démonstration
    let data = [...MOCK_PROFILS]
    if (params?.secteur) data = data.filter((p) => p.secteur === params.secteur)
    if (params?.mentorat) data = data.filter((p) => p.disponible_mentorat)
    if (params?.search) {
      const q = params.search.toLowerCase()
      data = data.filter(
        (p) =>
          `${p.membre_id.prenom} ${p.membre_id.nom}`.toLowerCase().includes(q) ||
          p.titre.toLowerCase().includes(q) ||
          p.expertise.some((e) => e.toLowerCase().includes(q))
      )
    }
    const total = data.length
    const sliced = data.slice(offset, offset + limit)
    return { data: sliced, total }
  }
}

export async function getProfilInfluentById(id: string) {
  try {
    const res = await fetch(
      `${DIRECTUS_URL}/items/profils_influents/${id}?fields=id,titre,biographie,secteur,expertise,disponible_mentorat,linkedin_url,photo_url,membre_id.id,membre_id.prenom,membre_id.nom,membre_id.photo&filter[valide_par_admin][_eq]=true`,
      { headers, next: { revalidate: 300 } }
    )
    if (!res.ok) throw new Error()
    const json = await res.json()
    return json.data as ProfilInfluent
  } catch {
    return MOCK_PROFILS.find((p) => p.id === id) ?? MOCK_PROFILS[0]
  }
}

export async function getSecteurs(): Promise<string[]> {
  try {
    const res = await fetch(
      `${DIRECTUS_URL}/items/profils_influents?fields=secteur&groupBy[]=secteur&filter[valide_par_admin][_eq]=true&limit=-1`,
      { headers, next: { revalidate: 3600 } }
    )
    if (!res.ok) throw new Error()
    const json = await res.json()
    const secteurs = json.data?.map((d: any) => d.secteur).filter(Boolean) as string[]
    return Array.from(new Set(secteurs))
  } catch {
    return MOCK_SECTEURS
  }
}

// ─── OPPORTUNITÉS ─────────────────────────────────────────────────────────────

export interface Opportunite {
  id: string
  type: 'emploi' | 'stage' | 'appel_projets' | 'atelier' | 'mentorat'
  titre: string
  description: string
  entreprise: string
  localisation: string
  date_limite: string | null
  lien_candidature: string | null
  date_created: string
  statut: string
  publie_par: { prenom: string; nom: string } | null
}

export async function getOpportunites(params?: {
  type?: string
  search?: string
  page?: number
  limit?: number
}) {
  const limit = params?.limit || 10
  const page = params?.page || 1
  const offset = (page - 1) * limit

  try {
    let filter = 'filter[statut][_eq]=actif'
    if (params?.type) filter += `&filter[type][_eq]=${encodeURIComponent(params.type)}`
    if (params?.search) filter += `&search=${encodeURIComponent(params.search)}`

    const res = await fetch(
      `${DIRECTUS_URL}/items/opportunites?${filter}&fields=id,type,titre,description,entreprise,localisation,date_limite,lien_candidature,date_created,publie_par.prenom,publie_par.nom&sort=-date_created&limit=${limit}&offset=${offset}&meta=total_count`,
      { headers, next: { revalidate: 60 } }
    )
    if (!res.ok) throw new Error()
    const json = await res.json()
    return { data: json.data as Opportunite[], total: json.meta?.total_count || 0 }
  } catch {
    let data = [...MOCK_OPPORTUNITES]
    if (params?.type) data = data.filter((o) => o.type === params.type)
    if (params?.search) {
      const q = params.search.toLowerCase()
      data = data.filter(
        (o) => o.titre.toLowerCase().includes(q) || o.entreprise.toLowerCase().includes(q)
      )
    }
    const total = data.length
    return { data: data.slice(offset, offset + limit), total }
  }
}

export async function getOpportuniteById(id: string) {
  try {
    const res = await fetch(
      `${DIRECTUS_URL}/items/opportunites/${id}?filter[statut][_eq]=actif&fields=*,publie_par.prenom,publie_par.nom`,
      { headers, next: { revalidate: 60 } }
    )
    if (!res.ok) throw new Error()
    const json = await res.json()
    return json.data as Opportunite
  } catch {
    return MOCK_OPPORTUNITES.find((o) => o.id === id) ?? MOCK_OPPORTUNITES[0]
  }
}

// ─── ACTUALITÉS ───────────────────────────────────────────────────────────────

export interface Article {
  id: string
  titre: string
  contenu: string
  photo_url: string | null
  categorie: 'communaute' | 'institutionnel' | 'partenariat'
  publie_par: { prenom: string; nom: string } | null
  publie_le: string
  date_created: string
  slug: string
}

export async function getArticles(params?: {
  categorie?: string
  search?: string
  page?: number
  limit?: number
}) {
  const limit = params?.limit || 9
  const page = params?.page || 1
  const offset = (page - 1) * limit

  try {
    let filter = 'filter[status][_eq]=published'
    if (params?.categorie) filter += `&filter[categorie][_eq]=${encodeURIComponent(params.categorie)}`
    if (params?.search) filter += `&search=${encodeURIComponent(params.search)}`

    const res = await fetch(
      `${DIRECTUS_URL}/items/actualites?${filter}&fields=id,titre,contenu,photo_url,categorie,publie_le,date_created,slug,publie_par.prenom,publie_par.nom&sort=-publie_le&limit=${limit}&offset=${offset}&meta=total_count`,
      { headers, next: { revalidate: 300 } }
    )
    if (!res.ok) throw new Error()
    const json = await res.json()
    return { data: (json.data ?? []) as Article[], total: json.meta?.total_count || 0 }
  } catch {
    let data = [...MOCK_ARTICLES]
    if (params?.categorie) data = data.filter((a) => a.categorie === params.categorie)
    if (params?.search) {
      const q = params.search.toLowerCase()
      data = data.filter((a) => a.titre.toLowerCase().includes(q))
    }
    const total = data.length
    return { data: data.slice(offset, offset + limit), total }
  }
}

export async function getArticleBySlug(slug: string) {
  try {
    const res = await fetch(
      `${DIRECTUS_URL}/items/actualites?filter[slug][_eq]=${encodeURIComponent(slug)}&filter[status][_eq]=published&fields=*,publie_par.prenom,publie_par.nom`,
      { headers, next: { revalidate: 300 } }
    )
    if (!res.ok) throw new Error()
    const json = await res.json()
    return (json.data?.[0] ?? null) as Article | null
  } catch {
    return MOCK_ARTICLES.find((a) => a.slug === slug) ?? MOCK_ARTICLES[0]
  }
}

// ─── ÉVÉNEMENTS ───────────────────────────────────────────────────────────────

export interface Evenement {
  id: string
  titre: string
  description: string
  date_debut: string
  date_fin: string | null
  lieu: string
  type: 'reunion' | 'ceremonie' | 'atelier' | 'autre'
  public: boolean
  photo_url: string | null
}

export async function getEvenements(params?: {
  type?: string
  a_venir?: boolean
  page?: number
  limit?: number
}) {
  const limit = params?.limit || 10
  const page = params?.page || 1
  const offset = (page - 1) * limit

  try {
    let filter = ''
    if (params?.a_venir) filter += `filter[date_debut][_gte]=${new Date().toISOString()}&`
    if (params?.type) filter += `filter[type][_eq]=${encodeURIComponent(params.type)}&`

    const res = await fetch(
      `${DIRECTUS_URL}/items/evenements?${filter}fields=id,titre,description,date_debut,date_fin,lieu,type,public,photo_url&sort=date_debut&limit=${limit}&offset=${offset}&meta=total_count`,
      { headers, next: { revalidate: 60 } }
    )
    if (!res.ok) throw new Error()
    const json = await res.json()
    return { data: (json.data ?? []) as Evenement[], total: json.meta?.total_count || 0 }
  } catch {
    let data = [...MOCK_EVENEMENTS]
    if (params?.type) data = data.filter((e) => e.type === params.type)
    if (params?.a_venir) {
      const now = new Date()
      data = data.filter((e) => new Date(e.date_debut) >= now)
    }
    const total = data.length
    return { data: data.slice(offset, offset + limit), total }
  }
}

export async function getEvenementById(id: string) {
  try {
    const res = await fetch(
      `${DIRECTUS_URL}/items/evenements/${id}?fields=*`,
      { headers, next: { revalidate: 60 } }
    )
    if (!res.ok) throw new Error()
    const json = await res.json()
    return json.data as Evenement
  } catch {
    return MOCK_EVENEMENTS.find((e) => e.id === id) ?? MOCK_EVENEMENTS[0]
  }
}

// ─── DOCUMENTS ────────────────────────────────────────────────────────────────

export interface DocumentGouvernance {
  id: string
  titre: string
  type: 'rapport' | 'cr_reunion' | 'budget' | 'code_ethique' | 'autre'
  fichier_url: string
  date_publication: string
  publie_par: { prenom: string; nom: string } | null
}

export async function getDocuments(params?: { type?: string }) {
  try {
    let filter = ''
    if (params?.type) filter = `filter[type][_eq]=${encodeURIComponent(params.type)}&`

    const res = await fetch(
      `${DIRECTUS_URL}/items/documents_gouvernance?${filter}fields=id,titre,type,fichier_url,date_publication,publie_par.prenom,publie_par.nom&sort=-date_publication&limit=-1`,
      { headers, next: { revalidate: 3600 } }
    )
    if (!res.ok) throw new Error()
    const json = await res.json()
    return (json.data ?? []) as DocumentGouvernance[]
  } catch {
    let data = [...MOCK_DOCUMENTS]
    if (params?.type) data = data.filter((d) => d.type === params.type)
    return data
  }
}
