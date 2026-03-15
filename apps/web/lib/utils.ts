import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length) + '...'
}

export function isExpiringSoon(dateStr: string, days = 7): boolean {
  const diff = new Date(dateStr).getTime() - Date.now()
  return diff > 0 && diff < days * 24 * 60 * 60 * 1000
}

export function isExpired(dateStr: string): boolean {
  return new Date(dateStr).getTime() < Date.now()
}
