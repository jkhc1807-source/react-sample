import { Router } from 'express'
import { z } from 'zod'
import { requireAdmin } from '../middleware/requireAdmin.js'
import { getTips, persistTips } from '../tipsStore.js'
import { getFaqItems, persistFaqItems } from '../faqStore.js'
import { getHomeContent, persistHomeContent } from '../homeStore.js'
import { getPageHeaders, persistPageHeaders } from '../pageHeadersStore.js'
import { usersByEmail } from '../userStore.js'

const tipItem = z.string().trim().min(1).max(500)
const tipsBodySchema = z.object({
  daily: z.array(tipItem).min(1).max(80),
  faqBonus: z.array(tipItem).max(40),
})

const faqItemSchema = z.object({
  question: z.string().trim().min(1).max(300),
  answer: z.string().trim().min(1).max(2000),
})
const faqBodySchema = z.object({
  items: z.array(faqItemSchema).min(1).max(40),
})

const ctaSchema = z.object({
  label: z.string().trim().min(1).max(80),
  path: z.string().trim().min(1).max(200).regex(/^\//),
})
const benefitCardSchema = z.object({
  icon: z.string().trim().min(1).max(4),
  title: z.string().trim().min(1).max(120),
  text: z.string().trim().min(1).max(500),
})
const simplePageHeaderSchema = z.object({
  title: z.string().trim().min(1).max(120),
  lead: z.string().trim().min(1).max(800),
})

const playgroundHeaderSchema = z.object({
  title: z.string().trim().min(1).max(120),
  leadBefore: z.string().max(500),
  externalLink: z.object({
    label: z.string().trim().min(1).max(80),
    url: z.string().trim().url().max(500),
  }),
  leadAfter: z.string().max(200),
})

const pageHeadersBodySchema = z.object({
  playground: playgroundHeaderSchema,
  uiKit: simplePageHeaderSchema,
  functions: simplePageHeaderSchema,
  practice: simplePageHeaderSchema,
})

const homeBodySchema = z.object({
  hero: z.object({
    eyebrow: z.string().trim().min(1).max(80),
    title: z.string().trim().min(1).max(200),
    leadBefore: z.string().max(300),
    leadEmphasis: z.string().trim().min(1).max(120),
    leadAfter: z.string().max(500),
    ctaPrimary: ctaSchema,
    ctaSecondary: ctaSchema,
  }),
  benefits: z.object({
    title: z.string().trim().min(1).max(120),
    cards: z.array(benefitCardSchema).min(1).max(6),
  }),
  footer: z.object({
    textBefore: z.string().trim().min(1).max(300),
    linkLabel: z.string().trim().min(1).max(40),
    linkPath: z.string().trim().min(1).max(200).regex(/^\//),
  }),
})

export const adminRouter = Router()

adminRouter.use(requireAdmin)

adminRouter.get('/tips', (_req, res) => {
  const tips = getTips()
  res.json({ tips })
})

adminRouter.put('/tips', (req, res) => {
  const parsed = tipsBodySchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({ error: 'validation_error', details: parsed.error.flatten() })
  }
  const tips = persistTips(parsed.data)
  res.json({ ok: true, tips })
})

adminRouter.get('/faq', (_req, res) => {
  res.json({ items: getFaqItems() })
})

adminRouter.put('/faq', (req, res) => {
  const parsed = faqBodySchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({ error: 'validation_error', details: parsed.error.flatten() })
  }
  const items = persistFaqItems(parsed.data.items)
  res.json({ ok: true, items })
})

adminRouter.get('/home', (_req, res) => {
  res.json({ home: getHomeContent() })
})

adminRouter.put('/home', (req, res) => {
  const parsed = homeBodySchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({ error: 'validation_error', details: parsed.error.flatten() })
  }
  const home = persistHomeContent(parsed.data)
  res.json({ ok: true, home })
})

adminRouter.get('/page-headers', (_req, res) => {
  res.json({ pageHeaders: getPageHeaders() })
})

adminRouter.put('/page-headers', (req, res) => {
  const parsed = pageHeadersBodySchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({ error: 'validation_error', details: parsed.error.flatten() })
  }
  const pageHeaders = persistPageHeaders(parsed.data)
  res.json({ ok: true, pageHeaders })
})

adminRouter.get('/users', (_req, res) => {
  const users = Array.from(usersByEmail.values()).map((u) => ({
    id: u.id,
    email: u.email,
    role: u.role || 'user',
  }))
  res.json({ users })
})
