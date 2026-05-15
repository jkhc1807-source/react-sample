import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { DEFAULT_HOME } from './defaultHome.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function storePath() {
  return process.env.HOME_STORE_PATH || path.join(__dirname, '..', 'data', 'home.json')
}

function normalizeCta(cta, fallback) {
  const label = typeof cta?.label === 'string' ? cta.label.trim() : fallback.label
  const pathVal = typeof cta?.path === 'string' ? cta.path.trim() : fallback.path
  return { label: label || fallback.label, path: pathVal.startsWith('/') ? pathVal : fallback.path }
}

function normalizeHome(raw) {
  const h = raw?.hero ?? {}
  const b = raw?.benefits ?? {}
  const f = raw?.footer ?? {}
  const def = DEFAULT_HOME

  const cards = Array.isArray(b.cards)
    ? b.cards
        .map((c, i) => ({
          icon: typeof c?.icon === 'string' && c.icon.trim() ? c.icon.trim() : def.benefits.cards[i]?.icon ?? '•',
          title: typeof c?.title === 'string' ? c.title.trim() : '',
          text: typeof c?.text === 'string' ? c.text.trim() : '',
        }))
        .filter((c) => c.title && c.text)
    : []

  return {
    hero: {
      eyebrow: typeof h.eyebrow === 'string' && h.eyebrow.trim() ? h.eyebrow.trim() : def.hero.eyebrow,
      title: typeof h.title === 'string' && h.title.trim() ? h.title.trim() : def.hero.title,
      leadBefore: typeof h.leadBefore === 'string' ? h.leadBefore : def.hero.leadBefore,
      leadEmphasis:
        typeof h.leadEmphasis === 'string' && h.leadEmphasis.trim() ? h.leadEmphasis.trim() : def.hero.leadEmphasis,
      leadAfter: typeof h.leadAfter === 'string' ? h.leadAfter : def.hero.leadAfter,
      ctaPrimary: normalizeCta(h.ctaPrimary, def.hero.ctaPrimary),
      ctaSecondary: normalizeCta(h.ctaSecondary, def.hero.ctaSecondary),
    },
    benefits: {
      title: typeof b.title === 'string' && b.title.trim() ? b.title.trim() : def.benefits.title,
      cards: cards.length > 0 ? cards : def.benefits.cards,
    },
    footer: {
      textBefore:
        typeof f.textBefore === 'string' && f.textBefore.trim() ? f.textBefore.trim() : def.footer.textBefore,
      linkLabel: typeof f.linkLabel === 'string' && f.linkLabel.trim() ? f.linkLabel.trim() : def.footer.linkLabel,
      linkPath:
        typeof f.linkPath === 'string' && f.linkPath.trim().startsWith('/')
          ? f.linkPath.trim()
          : def.footer.linkPath,
    },
  }
}

export function getHomeContent() {
  const p = storePath()
  try {
    const raw = JSON.parse(fs.readFileSync(p, 'utf8'))
    return normalizeHome(raw)
  } catch (e) {
    if (e && e.code === 'ENOENT') {
      const home = normalizeHome(DEFAULT_HOME)
      persistHomeContent(home)
      return home
    }
    throw e
  }
}

export function persistHomeContent(home) {
  const normalized = normalizeHome(home)
  const p = storePath()
  fs.mkdirSync(path.dirname(p), { recursive: true })
  fs.writeFileSync(p, JSON.stringify(normalized, null, 2), 'utf8')
  return normalized
}
