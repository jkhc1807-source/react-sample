import { useContext } from 'react'
import { FavoritesContext } from '../contexts/favorites-context.js'

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) {
    throw new Error('useFavorites must be used within FavoritesProvider')
  }
  return ctx
}
