import { useCallback, useMemo, useState, useEffect } from 'react'
import { FavoritesContext } from './favorites-context.js'
import { getRouteByPath } from '../data/homeSearchRoutes.js'

const STORAGE_KEY = 'react-study-hub-favorites-v1'
const MAX_FAVORITES = 24

function readStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed
      .filter((x) => x && typeof x.path === 'string' && typeof x.title === 'string')
      .map((x) => ({
        path: x.path,
        title: x.title,
        subtitle: typeof x.subtitle === 'string' ? x.subtitle : '',
      }))
      .slice(0, MAX_FAVORITES)
  } catch {
    return []
  }
}

function metaForPath(pathname) {
  const hit = getRouteByPath(pathname)
  if (hit) return { path: hit.path, title: hit.title, subtitle: hit.subtitle ?? '' }
  return { path: pathname, title: pathname, subtitle: '' }
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() =>
    typeof window === 'undefined' ? [] : readStored(),
  )

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
    } catch {
      /* ignore quota */
    }
  }, [favorites])

  const toggleFavorite = useCallback((pathname) => {
    if (!pathname) return
    const normalized = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname
    setFavorites((prev) => {
      const idx = prev.findIndex((f) => f.path === normalized)
      if (idx >= 0) {
        return prev.filter((_, i) => i !== idx)
      }
      const meta = metaForPath(normalized)
      const next = [{ ...meta, path: normalized }, ...prev.filter((f) => f.path !== normalized)]
      return next.slice(0, MAX_FAVORITES)
    })
  }, [])

  const isFavorite = useCallback(
    (pathname) => {
      if (!pathname) return false
      const normalized = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname
      return favorites.some((f) => f.path === normalized)
    },
    [favorites],
  )

  const value = useMemo(
    () => ({
      favorites,
      toggleFavorite,
      isFavorite,
    }),
    [favorites, toggleFavorite, isFavorite],
  )

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}
