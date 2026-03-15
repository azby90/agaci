import bcrypt from 'bcryptjs'
import { randomBytes } from 'crypto'

const SALT_ROUNDS = 12

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS)
}

export async function comparePassword(
  password: string,
  stored: string
): Promise<boolean> {
  return bcrypt.compare(password, stored)
}

export function generateToken(length = 32): string {
  return randomBytes(length).toString('hex')
}
