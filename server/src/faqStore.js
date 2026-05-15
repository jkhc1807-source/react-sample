import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { DEFAULT_FAQ_ITEMS } from './defaultFaq.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function storePath() {
  return process.env.FAQ_STORE_PATH || path.join(__dirname, '..', 'data', 'faq.json')
}

function normalizeItems(items) {
  if (!Array.isArray(items)) return [...DEFAULT_FAQ_ITEMS]
  const out = items
    .map((item) => ({
      question: typeof item?.question === 'string' ? item.question.trim() : '',
      answer: typeof item?.answer === 'string' ? item.answer.trim() : '',
    }))
    .filter((item) => item.question && item.answer)
  return out.length > 0 ? out : [...DEFAULT_FAQ_ITEMS]
}

export function getFaqItems() {
  const p = storePath()
  try {
    const raw = JSON.parse(fs.readFileSync(p, 'utf8'))
    return normalizeItems(raw.items ?? raw)
  } catch (e) {
    if (e && e.code === 'ENOENT') {
      const items = normalizeItems(DEFAULT_FAQ_ITEMS)
      persistFaqItems(items)
      return items
    }
    throw e
  }
}

export function persistFaqItems(items) {
  const normalized = normalizeItems(items)
  const p = storePath()
  fs.mkdirSync(path.dirname(p), { recursive: true })
  fs.writeFileSync(p, JSON.stringify({ items: normalized }, null, 2), 'utf8')
  return normalized
}
