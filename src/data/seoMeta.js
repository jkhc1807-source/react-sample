import { getRouteByPath } from './homeSearchRoutes.js'

const SITE_NAME = 'React 학습 허브'
const DEFAULT_DESCRIPTION =
  'React와 Vite로 만든 개인 학습용 예제 허브입니다. 샘플 모음, 배열·함수, UI 키트, 실무 패턴까지 한곳에서 탐색할 수 있습니다.'

const NOINDEX_PREFIXES = ['/auth', '/admin']

function normalizePath(pathname) {
  if (!pathname) return '/'
  const p = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname
  return p || '/'
}

function shouldNoIndex(pathname) {
  return NOINDEX_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))
}

/**
 * @returns {{ shortTitle: string, title: string, description: string, keywords: string, path: string, robots: string, noindex: boolean }}
 */
export function getSeoForPath(pathname) {
  const path = normalizePath(pathname)
  const route = getRouteByPath(path)
  const noindex = shouldNoIndex(path)
  const robots = noindex ? 'noindex, nofollow' : 'index, follow'

  if (route) {
    const kw = [...(route.keywords ?? []), 'React', 'Vite', 'JavaScript', '프론트엔드', '학습']
    const uniqueKw = [...new Set(kw.map((k) => String(k).trim()).filter(Boolean))]
    const description =
      route.subtitle && route.subtitle !== route.title
        ? `${route.title}. ${route.subtitle}. ${SITE_NAME}.`
        : `${route.title} — ${SITE_NAME}.`

    return {
      shortTitle: route.title,
      title: `${route.title} | ${SITE_NAME}`,
      description: description.slice(0, 320),
      keywords: uniqueKw.join(', '),
      path,
      robots,
      noindex,
    }
  }

  return {
    shortTitle: SITE_NAME,
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    keywords: 'React, Vite, JavaScript, TypeScript, 프론트엔드, 학습, 예제, SPA',
    path,
    robots,
    noindex,
  }
}
