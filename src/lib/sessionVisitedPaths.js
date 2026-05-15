const STORAGE_KEY = 'hub-session-paths-v1'

/**
 * 이번 브라우저 탭(session)에서 한 번이라도 연 경로를 누적합니다.
 * @param {string} pathname
 */
export function recordVisitedPath(pathname) {
  if (typeof sessionStorage === 'undefined') return
  const path = pathname && pathname.length ? pathname : '/'
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    const list = raw ? JSON.parse(raw) : []
    if (!Array.isArray(list)) return
    if (!list.includes(path)) {
      list.push(path)
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(list))
    }
  } catch {
    /* ignore */
  }
}

/** @returns {number} */
export function getVisitedPathCount() {
  if (typeof sessionStorage === 'undefined') return 0
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    const list = raw ? JSON.parse(raw) : []
    return Array.isArray(list) ? list.length : 0
  } catch {
    return 0
  }
}
