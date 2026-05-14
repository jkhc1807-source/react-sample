/** 프로덕션에서 canonical·OG URL용. 예: https://example.com (끝 슬래시 없이) */
export function getSiteOrigin() {
  const raw = import.meta.env.VITE_SITE_URL
  if (typeof raw === 'string' && raw.trim()) {
    return raw.trim().replace(/\/$/, '')
  }
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin
  }
  return ''
}

export function absoluteUrl(pathname) {
  const origin = getSiteOrigin()
  if (!pathname.startsWith('/')) return `${origin}/${pathname}`
  return `${origin}${pathname}`
}
