import { createDirectus, rest, staticToken } from '@directus/sdk'

const directusUrl = process.env.DIRECTUS_URL || 'http://localhost:8055'
const directusToken = process.env.DIRECTUS_ADMIN_TOKEN || ''

export const directus = createDirectus(directusUrl)
  .with(rest())
  .with(staticToken(directusToken))

export default directus
