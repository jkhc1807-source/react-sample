import jwt from 'jsonwebtoken'

function getJwtSecret() {
  const s = process.env.JWT_SECRET
  if (s && s.length >= 32) return s
  if (process.env.NODE_ENV === 'production') {
    throw new Error('JWT_SECRET must be set and at least 32 characters.')
  }
  return 'dev-insecure-jwt-secret-do-not-use-in-production-min-32chars-x'
}

/** @returns {{ sub: string, email: string, role: string } | null} */
export function getAuthPayload(req) {
  const raw = req.cookies?.access_token
  if (!raw) return null
  try {
    const payload = jwt.verify(raw, getJwtSecret())
    return payload
  } catch {
    return null
  }
}

export function requireAdmin(req, res, next) {
  const payload = getAuthPayload(req)
  if (!payload) return res.status(401).json({ error: 'unauthorized' })
  if (payload.role !== 'admin') return res.status(403).json({ error: 'forbidden' })
  req.auth = payload
  next()
}
