import { Router } from 'express'
import { getTips, pickRandomTip, pickTipForDate } from '../tipsStore.js'

export const tipsRouter = Router()

tipsRouter.get('/today', (_req, res) => {
  const { daily, faqBonus } = getTips()
  const today = pickTipForDate(daily)
  res.json({ today, dailyCount: daily.length, faqBonusCount: faqBonus.length })
})

tipsRouter.get('/random', (req, res) => {
  const { daily, faqBonus } = getTips()
  const merged = [...daily, ...faqBonus]
  const exclude = typeof req.query.exclude === 'string' ? req.query.exclude : null
  const tip = pickRandomTip(merged, exclude || null)
  res.json({ tip })
})
