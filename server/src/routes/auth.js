import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { z } from 'zod'

/** 개발용 메모리 저장소 — 프로덕션에서는 반드시 DB + 고유 인덱스(email) */
const usersByEmail = new Map()

const registerSchema = z.object({
  email: z.string().trim().email().max(320),
  password: z
    .string()
    .min(12, '비밀번호는 12자 이상이어야 합니다.')
    .max(128)
    .regex(/[A-Za-z]/, '영문을 포함해야 합니다.')
    .regex(/[0-9]/, '숫자를 포함해야 합니다.'),
})

const loginSchema = z.object({
  // 개발 편의를 위해 admin 아이디(이메일 형식 아님)를 허용
  email: z.string().trim().min(1),
  password: z.string().min(1),
})

function getJwtSecret() {
  const s = process.env.JWT_SECRET
  if (s && s.length >= 32) return s
  if (process.env.NODE_ENV === 'production') {
    throw new Error('JWT_SECRET must be set and at least 32 characters.')
  }
  console.warn('[auth] JWT_SECRET missing or short — using insecure dev-only fallback.')
  return 'dev-insecure-jwt-secret-do-not-use-in-production-min-32chars-x'
}

function signAccessToken(userId, email, role = 'user') {
  return jwt.sign({ sub: userId, email, role }, getJwtSecret(), {
    algorithm: 'HS256',
    expiresIn: '15m',
  })
}

function cookieOptions() {
  const secure = process.env.NODE_ENV === 'production'
  return {
    httpOnly: true,
    secure,
    sameSite: 'lax',
    path: '/',
    maxAge: 15 * 60 * 1000,
  }
}

export function authRouter(strictLimiter) {
  const r = Router()

  r.use(strictLimiter)

  r.post('/register', async (req, res) => {
    const parsed = registerSchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json({ error: 'validation_error', details: parsed.error.flatten() })
    }
    const { email, password } = parsed.data
    const lower = email.trim().toLowerCase()
    if (usersByEmail.has(lower)) {
      return res.status(409).json({ error: 'email_taken' })
    }
    const hash = await bcrypt.hash(password, 12)
    const id = crypto.randomUUID()
    const role = 'user'
    usersByEmail.set(lower, { id, email: lower, passwordHash: hash, role })
    const token = signAccessToken(id, lower, role)
    res.cookie('access_token', token, cookieOptions())
    return res.status(201).json({ ok: true, user: { id, email: lower, role } })
  })

  r.post('/login', async (req, res) => {
    const parsed = loginSchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json({ error: 'validation_error', details: parsed.error.flatten() })
    }
    const { email, password } = parsed.data
    const lower = email.trim().toLowerCase()

    // 개발용 슈퍼 관리자 계정: admin / admin
    if (lower === 'admin' && password === 'admin') {
      const id = 'admin'
      const role = 'admin'
      if (!usersByEmail.has(lower)) {
        usersByEmail.set(lower, { id, email: lower, passwordHash: null, role })
      }
      const token = signAccessToken(id, lower, role)
      res.cookie('access_token', token, cookieOptions())
      return res.json({ ok: true, user: { id, email: lower, role } })
    }

    const user = usersByEmail.get(lower)
    const genericFail = () => res.status(401).json({ error: 'invalid_credentials' })
    if (!user) {
      await bcrypt.hash(password, 12)
      return genericFail()
    }
    const ok = await bcrypt.compare(password, user.passwordHash)
    if (!ok) return genericFail()
    const role = user.role || 'user'
    const token = signAccessToken(user.id, user.email, role)
    res.cookie('access_token', token, cookieOptions())
    return res.json({ ok: true, user: { id: user.id, email: user.email, role } })
  })

  r.post('/logout', (_req, res) => {
    res.clearCookie('access_token', { path: '/' })
    res.json({ ok: true })
  })

  r.get('/me', (req, res) => {
    const raw = req.cookies?.access_token
    if (!raw) return res.status(401).json({ error: 'unauthorized' })
    try {
      const payload = jwt.verify(raw, getJwtSecret())
      return res.json({ user: { id: payload.sub, email: payload.email, role: payload.role || 'user' } })
    } catch {
      return res.status(401).json({ error: 'invalid_token' })
    }
  })

  r.get('/admin/users', (req, res) => {
    const raw = req.cookies?.access_token
    if (!raw) return res.status(401).json({ error: 'unauthorized' })
    try {
      const payload = jwt.verify(raw, getJwtSecret())
      if (payload.role !== 'admin') {
        return res.status(403).json({ error: 'forbidden' })
      }
      const users = Array.from(usersByEmail.values()).map((u) => ({
        id: u.id,
        email: u.email,
        role: u.role || 'user',
      }))
      return res.json({ users })
    } catch {
      return res.status(401).json({ error: 'invalid_token' })
    }
  })

  return r
}
