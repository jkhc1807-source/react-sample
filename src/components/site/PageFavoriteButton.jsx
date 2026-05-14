import { useLocation } from 'react-router-dom'
import { getRouteByPath } from '../../data/homeSearchRoutes.js'
import { useFavorites } from '../../hooks/useFavorites.js'
import './PageFavoriteButton.css'

export default function PageFavoriteButton() {
  const { pathname } = useLocation()
  const { isFavorite, toggleFavorite } = useFavorites()
  const normalized = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname
  const meta = getRouteByPath(normalized)
  const label = meta?.title ?? normalized
  const on = isFavorite(normalized)

  return (
    <div className="page-fav">
      <button
        type="button"
        className={`page-fav__btn${on ? ' page-fav__btn--on' : ''}`}
        aria-pressed={on}
        aria-label={on ? `${label} 즐겨찾기 해제` : `${label} 즐겨찾기에 추가`}
        title={normalized}
        onClick={() => toggleFavorite(normalized)}
      >
        <span className="page-fav__icon" aria-hidden="true">
          {on ? '★' : '☆'}
        </span>
        <span className="page-fav__text">{on ? '즐겨찾기됨' : '즐겨찾기'}</span>
      </button>
    </div>
  )
}
