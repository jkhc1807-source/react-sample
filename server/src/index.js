import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'
import { authRouter } from './routes/auth.js'
import { tipsRouter } from './routes/tips.js'
import { contentRouter } from './routes/content.js'
import { adminRouter } from './routes/admin.js'

const app = express()
const PORT = Number(process.env.PORT) || 3001

function parseFrontendOrigins() {
  const raw = process.env.FRONTEND_ORIGIN || 'http://localhost:5173'
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}

const allowedOrigins = parseFrontendOrigins()

const trustHops = process.env.TRUST_PROXY_HOPS
app.set('trust proxy', trustHops === '0' ? false : Number(trustHops) || 1)

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  }),
)

app.use(
  cors({
    credentials: true,
    origin(origin, callback) {
      if (!origin) {
        return callback(null, false)
      }
      if (allowedOrigins.includes(origin)) {
        return callback(null, origin)
      }
      return callback(new Error(`CORS: origin not allowed: ${origin}`))
    },
  }),
)

app.use(express.json({ limit: '32kb' }))
app.use(cookieParser())

const strictAuthLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 40,
  standardHeaders: true,
  legacyHeaders: false,
})

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
})

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.use('/api/auth', strictAuthLimiter, authRouter(loginLimiter))
app.use('/api/tips', tipsRouter)
app.use('/api/content', contentRouter)
app.use('/api/admin', strictAuthLimiter, adminRouter)

app.use((_req, res) => {
  res.status(404).json({ error: 'not_found' })
})

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`)
})
