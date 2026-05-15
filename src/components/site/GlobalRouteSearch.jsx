import { useMemo, useState, useRef, useId, useEffect, useCallback } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { HOME_SEARCH_ROUTES, getPopularHomeRoutes } from '../../data/homeSearchRoutes.js'
import { useFavorites } from '../../hooks/useFavorites.js'
import { isTypingOrDialogContext } from '../../lib/isTypingOrDialogContext.js'
import './GlobalRouteSearch.css'

function routeMatches(route, normalizedQuery) {
  if (!normalizedQuery) return true
  const blob = `${route.title} ${route.subtitle ?? ''} ${(route.keywords ?? []).join(' ')}`.toLowerCase()
  return blob.includes(normalizedQuery)
}

function routeListItem(r, idx, listId, activeIdx, setHighlightIdx, onPick, extraClass) {
  const active = idx === activeIdx
  return (
    <li
      key={`${r.path}-${idx}`}
      id={`${listId}-opt-${idx}`}
      className={`gnb-search__item${active ? ' gnb-search__item--active' : ''}${extraClass ? ` ${extraClass}` : ''}`}
      role="option"
      aria-selected={active}
    >
      <Link
        to={r.path}
        className="gnb-search__link"
        onMouseEnter={() => setHighlightIdx(idx)}
        onClick={onPick}
      >
        <span className="gnb-search__link-path">{r.path}</span>
        <span className="gnb-search__link-title">{r.title}</span>
        <span className="gnb-search__link-desc">{r.subtitle}</span>
      </Link>
    </li>
  )
}

export default function GlobalRouteSearch() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isHome = pathname === '/' || pathname === ''
  const { favorites, toggleFavorite } = useFavorites()
  const rootRef = useRef(null)
  const inputRef = useRef(null)
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [highlightIdx, setHighlightIdx] = useState(0)

  const inputId = useId()
  const listId = useId()
  const searchHelpId = useId()

  const favoritePaths = useMemo(() => new Set(favorites.map((f) => f.path)), [favorites])

  const recommendedWhenEmpty = useMemo(() => {
    return getPopularHomeRoutes().filter((r) => !favoritePaths.has(r.path))
  }, [favoritePaths])

  const searchFiltered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return HOME_SEARCH_ROUTES.filter((r) => routeMatches(r, q)).slice(0, 22)
  }, [query])

  const combinedEmptyList = useMemo(() => {
    const q = query.trim()
    if (q) return null
    const fav = favorites.map((f) => ({
      path: f.path,
      title: f.title,
      subtitle: f.subtitle || '즐겨찾기',
      keywords: [],
    }))
    const rec = recommendedWhenEmpty
    return { favorites: fav, recommended: rec }
  }, [query, favorites, recommendedWhenEmpty])

  const flatList = useMemo(() => {
    if (query.trim()) return searchFiltered
    if (!combinedEmptyList) return []
    return [...combinedEmptyList.favorites, ...combinedEmptyList.recommended]
  }, [query, searchFiltered, combinedEmptyList])

  const activeIdx =
    flatList.length === 0 ? 0 : Math.min(highlightIdx, Math.max(0, flatList.length - 1))

  function closePanel() {
    setOpen(false)
    setHighlightIdx(0)
  }

  function go(idx) {
    const r = flatList[idx]
    if (!r) return
    navigate(r.path)
    setQuery('')
    closePanel()
    inputRef.current?.blur()
  }

  function onKeyDown(e) {
    if (!open && (e.key === 'ArrowDown' || e.key === 'Enter')) {
      setOpen(true)
    }
    if (!flatList.length) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightIdx(activeIdx >= flatList.length - 1 ? 0 : activeIdx + 1)
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightIdx(activeIdx <= 0 ? flatList.length - 1 : activeIdx - 1)
    }
    if (e.key === 'Enter') {
      e.preventDefault()
      go(activeIdx)
    }
    if (e.key === 'Escape') {
      setQuery('')
      closePanel()
      inputRef.current?.blur()
    }
  }

  useEffect(() => {
    if (!open) return
    function onDocMouseDown(e) {
      if (!rootRef.current?.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onDocMouseDown)
    return () => document.removeEventListener('mousedown', onDocMouseDown)
  }, [open])

  const shortcutHint = useMemo(() => {
    if (typeof navigator === 'undefined') return { modK: 'Ctrl K', slash: '/' }
    const mac = /Mac|iPhone|iPod|iPad/i.test(navigator.userAgent)
    return { modK: mac ? '⌘K' : 'Ctrl+K', slash: '/' }
  }, [])

  const focusSearchPalette = useCallback(() => {
    inputRef.current?.focus()
    setOpen(true)
  }, [])

  useEffect(() => {
    function onDocKey(e) {
      if (e.defaultPrevented || e.repeat) return
      const mod = e.metaKey || e.ctrlKey
      const isPalette = mod && (e.key === 'k' || e.key === 'K')
      const isSlash = e.key === '/' && !mod && !e.altKey
      if (!isPalette && !isSlash) return
      if (isTypingOrDialogContext(e.target)) return
      e.preventDefault()
      focusSearchPalette()
    }
    document.addEventListener('keydown', onDocKey)
    return () => document.removeEventListener('keydown', onDocKey)
  }, [focusSearchPalette])

  const favCount = combinedEmptyList?.favorites.length ?? 0
  const recOffset = favCount

  return (
    <div ref={rootRef} className="gnb-search">
      <label className="gnb-search__label visually-hidden" htmlFor={inputId}>
        페이지 검색
      </label>
      <p id={searchHelpId} className="visually-hidden">
        {shortcutHint.modK} 또는 {shortcutHint.slash} 로 검색창에 포커스할 수 있습니다. 방향키로 목록을
        탐색하고 Enter로 이동합니다. Escape로 닫습니다.
      </p>
      <div className="gnb-search__field">
        <span className="gnb-search__icon" aria-hidden="true">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.2-3.2" strokeLinecap="round" />
          </svg>
        </span>
        <input
          ref={inputRef}
          id={inputId}
          type="search"
          name="gnb-route-search"
          className="gnb-search__input gnb-search__input--with-hint"
          placeholder="페이지 검색…"
          value={query}
          autoComplete="off"
          spellCheck={false}
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-controls={open ? listId : undefined}
          aria-autocomplete="list"
          aria-activedescendant={
            open && flatList[activeIdx] ? `${listId}-opt-${activeIdx}` : undefined
          }
          aria-describedby={searchHelpId}
          role="combobox"
          onChange={(e) => {
            setQuery(e.target.value)
            setHighlightIdx(0)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
        />
        <span className="gnb-search__shortcut-hint" aria-hidden="true">
          <kbd className="gnb-search__kbd">{shortcutHint.modK}</kbd>
          <kbd className="gnb-search__kbd">{shortcutHint.slash}</kbd>
        </span>
      </div>

      {open ? (
        <div className="gnb-search__panel" role="presentation">
          <p className="gnb-search__panel-cap" aria-hidden="true">
            {query.trim() ? `검색 결과 (${searchFiltered.length})` : '즐겨찾기 · 추천'}
          </p>
          <ul id={listId} className="gnb-search__list" role="listbox" aria-label="페이지 검색 결과">
            {!query.trim() && combinedEmptyList ? (
              <>
                {combinedEmptyList.favorites.length > 0 ? (
                  <>
                    <li className="gnb-search__group" role="presentation">
                      즐겨찾기
                    </li>
                    {combinedEmptyList.favorites.map((r, i) => (
                      <li
                        key={r.path}
                        id={`${listId}-opt-${i}`}
                        className={`gnb-search__item${i === activeIdx ? ' gnb-search__item--active' : ''}`}
                        role="option"
                        aria-selected={i === activeIdx}
                      >
                        <div className="gnb-search__row">
                          <Link
                            to={r.path}
                            className="gnb-search__link gnb-search__link--grow"
                            onMouseEnter={() => setHighlightIdx(i)}
                            onClick={() => {
                              setQuery('')
                              closePanel()
                            }}
                          >
                            <span className="gnb-search__link-path">{r.path}</span>
                            <span className="gnb-search__link-title">{r.title}</span>
                            <span className="gnb-search__link-desc">{r.subtitle}</span>
                          </Link>
                          <button
                            type="button"
                            className="gnb-search__unstar"
                            aria-label={`${r.title} 즐겨찾기 해제`}
                            onClick={(e) => {
                              e.preventDefault()
                              toggleFavorite(r.path)
                            }}
                          >
                            ×
                          </button>
                        </div>
                      </li>
                    ))}
                  </>
                ) : null}
                {combinedEmptyList.recommended.length > 0 ? (
                  <>
                    <li className="gnb-search__group" role="presentation">
                      추천
                    </li>
                    {combinedEmptyList.recommended.map((r, j) => {
                      const idx = recOffset + j
                      return routeListItem(r, idx, listId, activeIdx, setHighlightIdx, () => closePanel(), '')
                    })}
                  </>
                ) : null}
                {combinedEmptyList.favorites.length === 0 &&
                combinedEmptyList.recommended.length === 0 ? (
                  <li className="gnb-search__empty" role="status">
                    {isHome
                      ? '즐겨찾기·추천이 없습니다. 아래 카드로 페이지에 들어간 뒤, 상단의 즐겨찾기 버튼(별)으로 추가할 수 있습니다.'
                      : '즐겨찾기·추천이 없습니다. 이 페이지 상단의 즐겨찾기 버튼으로 추가할 수 있습니다.'}
                  </li>
                ) : null}
              </>
            ) : searchFiltered.length === 0 ? (
              <li className="gnb-search__empty" role="status">
                검색 결과가 없습니다.
              </li>
            ) : (
              searchFiltered.map((r, idx) =>
                routeListItem(r, idx, listId, activeIdx, setHighlightIdx, () => closePanel(), ''),
              )
            )}
          </ul>
        </div>
      ) : null}
    </div>
  )
}
