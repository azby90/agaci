import { z } from 'zod'

export const inscriptionSchema = z
  .object({
    prenom: z.string().min(2, 'Prénom requis (2 caractères minimum)').max(50),
    nom: z.string().min(2, 'Nom requis (2 caractères minimum)').max(50),
    email: z.string().email('Adresse email invalide'),
    telephone: z
      .string()
      .regex(/^\+?[0-9\s\-]{8,15}$/, 'Numéro de téléphone invalide')
      .optional()
      .or(z.literal('')),
    ville_ci: z.string().min(2, 'Ville en CI requise').max(100),
    ville_gabon_origine: z.string().min(2, 'Ville d\'origine au Gabon requise').max(100),
    password: z
      .string()
      .min(8, 'Mot de passe : 8 caractères minimum')
      .regex(/[A-Z]/, 'Doit contenir au moins une majuscule')
      .regex(/[0-9]/, 'Doit contenir au moins un chiffre'),
    confirmPassword: z.string(),
    acceptTerms: z.boolean().refine((v) => v === true, {
      message: 'Vous devez accepter les conditions d\'utilisation',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword'],
  })

export const connexionSchema = z.object({
  email: z.string().email('Adresse email invalide'),
  password: z.string().min(1, 'Mot de passe requis'),
  rememberMe: z.boolean().optional(),
})

export const motDePasseOublieSchema = z.object({
  email: z.string().email('Adresse email invalide'),
})

export const reinitialiserMotDePasseSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Mot de passe : 8 caractères minimum')
      .regex(/[A-Z]/, 'Doit contenir au moins une majuscule')
      .regex(/[0-9]/, 'Doit contenir au moins un chiffre'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword'],
  })

export const profilSchema = z.object({
  prenom: z.string().min(2).max(50),
  nom: z.string().min(2).max(50),
  telephone: z.string().optional().or(z.literal('')),
  ville_ci: z.string().min(2).max(100),
  biographie: z.string().max(500).optional().or(z.literal('')),
  visibilite_profil: z.enum(['public', 'membres', 'prive']),
})

export type InscriptionFormData = z.infer<typeof inscriptionSchema>
export type ConnexionFormData = z.infer<typeof connexionSchema>
export type MotDePasseOublieFormData = z.infer<typeof motDePasseOublieSchema>
export type ReinitialiserMotDePasseFormData = z.infer<typeof reinitialiserMotDePasseSchema>
export type ProfilFormData = z.infer<typeof profilSchema>
