import { Router } from 'express'
import { getFaqItems } from '../faqStore.js'
import { getHomeContent } from '../homeStore.js'
import { getPageHeaders } from '../pageHeadersStore.js'

export const contentRouter = Router()

contentRouter.get('/faq', (_req, res) => {
  res.json({ items: getFaqItems() })
})

contentRouter.get('/home', (_req, res) => {
  res.json({ home: getHomeContent() })
})

contentRouter.get('/page-headers', (_req, res) => {
  res.json({ pageHeaders: getPageHeaders() })
})
