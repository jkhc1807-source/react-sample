import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { DEFAULT_PAGE_HEADERS } from './defaultPageHeaders.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function storePath() {
  return process.env.PAGE_HEADERS_STORE_PATH || path.join(__dirname, '..', 'data', 'pageHeaders.json')
}

function normalizeSimple(raw, fallback) {
  const title = typeof raw?.title === 'string' ? raw.title.trim() : ''
  const lead = typeof raw?.lead === 'string' ? raw.lead.trim() : ''
  return {
    title: title || fallback.title,
    lead: lead || fallback.lead,
  }
}

function normalizePlayground(raw, fallback) {
  const title = typeof raw?.title === 'string' ? raw.title.trim() : ''
  const leadBefore = typeof raw?.leadBefore === 'string' ? raw.leadBefore : fallback.leadBefore
  const leadAfter = typeof raw?.leadAfter === 'string' ? raw.leadAfter : fallback.leadAfter
  const link = raw?.externalLink ?? {}
  const label = typeof link.label === 'string' ? link.label.trim() : ''
  const url = typeof link.url === 'string' ? link.url.trim() : ''
  let externalLink = fallback.externalLink
  try {
    if (label && url) {
      const parsed = new URL(url)
      if (parsed.protocol === 'https:' || parsed.protocol === 'http:') {
        externalLink = { label, url: parsed.href }
      }
    }
  } catch {
    /* fallback */
  }
  return {
    title: title || fallback.title,
    leadBefore,
    externalLink,
    leadAfter,
  }
}

export function normalizePageHeaders(raw) {
  const def = DEFAULT_PAGE_HEADERS
  return {
    playground: normalizePlayground(raw?.playground, def.playground),
    uiKit: normalizeSimple(raw?.uiKit, def.uiKit),
    functions: normalizeSimple(raw?.functions, def.functions),
    practice: normalizeSimple(raw?.practice, def.practice),
  }
}

export function getPageHeaders() {
  const p = storePath()
  try {
    const raw = JSON.parse(fs.readFileSync(p, 'utf8'))
    return normalizePageHeaders(raw)
  } catch (e) {
    if (e && e.code === 'ENOENT') {
      const headers = normalizePageHeaders(DEFAULT_PAGE_HEADERS)
      persistPageHeaders(headers)
      return headers
    }
    throw e
  }
}

export function persistPageHeaders(headers) {
  const normalized = normalizePageHeaders(headers)
  const p = storePath()
  fs.mkdirSync(path.dirname(p), { recursive: true })
  fs.writeFileSync(p, JSON.stringify(normalized, null, 2), 'utf8')
  return normalized
}
