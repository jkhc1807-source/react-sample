import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { DEFAULT_TIPS } from './defaultTips.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function storePath() {
  return process.env.TIPS_STORE_PATH || path.join(__dirname, '..', 'data', 'tips.json')
}

function normalizeList(arr) {
  if (!Array.isArray(arr)) return []
  return arr
    .map((t) => (typeof t === 'string' ? t.trim() : ''))
    .filter((t) => t.length > 0)
}

function normalizeTips(raw) {
  const daily = normalizeList(raw?.daily)
  const faqBonus = normalizeList(raw?.faqBonus)
  return {
    daily: daily.length > 0 ? daily : [...DEFAULT_TIPS.daily],
    faqBonus: faqBonus.length > 0 ? faqBonus : [...DEFAULT_TIPS.faqBonus],
  }
}

export function getTips() {
  const p = storePath()
  try {
    const raw = JSON.parse(fs.readFileSync(p, 'utf8'))
    return normalizeTips(raw)
  } catch (e) {
    if (e && e.code === 'ENOENT') {
      const seeded = normalizeTips(DEFAULT_TIPS)
      persistTips(seeded)
      return seeded
    }
    throw e
  }
}

export function persistTips(tips) {
  const normalized = normalizeTips(tips)
  const p = storePath()
  fs.mkdirSync(path.dirname(p), { recursive: true })
  fs.writeFileSync(p, JSON.stringify(normalized, null, 2), 'utf8')
  return normalized
}

/** @param {Date} [d] */
export function pickTipForDate(daily, d = new Date()) {
  const list = normalizeList(daily)
  if (list.length === 0) return DEFAULT_TIPS.daily[0]
  const key = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
  let hash = 0
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) | 0
  }
  return list[Math.abs(hash) % list.length]
}

export function pickRandomTip(merged, exclude = null) {
  const pool = exclude ? merged.filter((t) => t !== exclude) : [...merged]
  if (pool.length === 0) return merged[0] ?? ''
  return pool[Math.floor(Math.random() * pool.length)]
}
