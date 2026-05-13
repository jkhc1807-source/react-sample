import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'
import { authRouter } from './routes/auth.js'

const app = express()
const PORT = Number(process.env.PORT) || 3001
const frontendOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:5173'

app.set('trust proxy', 1)

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  }),
)

app.use(
  cors({
    origin: frontendOrigin,
    credentials: true,
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

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.use('/api/auth', authRouter(strictAuthLimiter))

app.use((_req, res) => {
  res.status(404).json({ error: 'not_found' })
})

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`)
})
