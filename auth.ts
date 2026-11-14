import crypto from 'crypto'

const ADMIN_SECRET = process.env.ADMIN_SECRET_KEY || 'timo-super-secret-jwt-key-2026-bordo-green'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'timo@portfolio.com'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'TimoBrand2026!Secure'

export function validateCredentials(email: string, pass: string): boolean {
  return email === ADMIN_EMAIL && pass === ADMIN_PASSWORD
}

export function createSessionToken(): string {
  const timestamp = Date.now()
  const payload = `${ADMIN_EMAIL}:${timestamp}`
  const signature = crypto.createHmac('sha256', ADMIN_SECRET).update(payload).digest('hex')
  return Buffer.from(`${payload}:${signature}`).toString('base64')
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8')
    const parts = decoded.split(':')
    if (parts.length !== 3) return false
    const [email, timestamp, signature] = parts
    if (email !== ADMIN_EMAIL) return false

    // Optional 7-day expiration
    const age = Date.now() - parseInt(timestamp, 10)
    if (age > 7 * 24 * 60 * 60 * 1000) return false

    const expectedSig = crypto
      .createHmac('sha256', ADMIN_SECRET)
      .update(`${email}:${timestamp}`)
      .digest('hex')

    return signature === expectedSig
  } catch {
    return false
  }
}
