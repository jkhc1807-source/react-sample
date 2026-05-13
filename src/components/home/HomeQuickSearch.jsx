import { useMemo, useState, useRef, useId } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HOME_SEARCH_ROUTES, getPopularHomeRoutes } from '../../data/homeSearchRoutes.js'
import './HomeQuickSearch.css'

function routeMatches(route, normalizedQuery) {
  if (!normalizedQuery) return true
  const blob = `${route.title} ${route.subtitle ?? ''} ${(route.keywords ?? []).join(' ')}`.toLowerCase()
  return blob.includes(normalizedQuery)
}

export default function HomeQuickSearch({ describedById }) {
  const navigate = useNavigate()
  const inputRef = useRef(null)
  const [query, setQuery] = useState('')
  const [highlightIdx, setHighlightIdx] = useState(0)

  const inputId = useId()
  const listId = useId()

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const pool = q ? HOME_SEARCH_ROUTES : getPopularHomeRoutes()
    const out = pool.filter((r) => routeMatches(r, q))
    return q ? out.slice(0, 22) : out
  }, [query])

  const activeIdx =
    filtered.length === 0 ? 0 : Math.min(highlightIdx, Math.max(0, filtered.length - 1))

  function go(idx) {
    const r = filtered[idx]
    if (!r) return
    navigate(r.path)
    setQuery('')
    inputRef.current?.blur()
  }

  function onKeyDown(e) {
    if (!filtered.length) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightIdx(activeIdx >= filtered.length - 1 ? 0 : activeIdx + 1)
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightIdx(activeIdx <= 0 ? filtered.length - 1 : activeIdx - 1)
    }
    if (e.key === 'Enter') {
      e.preventDefault()
      go(activeIdx)
    }
    if (e.key === 'Escape') {
      setQuery('')
      inputRef.current?.blur()
    }
  }

  return (
    <div className="home-quick-search">
      <label className="home-quick-search__label" htmlFor={inputId}>
        페이지 검색
      </label>
      <div className="home-quick-search__field">
        <span className="home-quick-search__icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.2-3.2" strokeLinecap="round" />
          </svg>
        </span>
        <input
          ref={inputRef}
          id={inputId}
          type="search"
          name="home-route-search"
          className="home-quick-search__input"
          placeholder="예: map · 비동기 · 모달 · filter"
          value={query}
          autoComplete="off"
          spellCheck={false}
          aria-describedby={describedById}
          aria-controls={listId}
          aria-expanded="true"
          aria-haspopup="listbox"
          aria-autocomplete="list"
          aria-activedescendant={filtered[activeIdx] ? `${listId}-opt-${activeIdx}` : undefined}
          role="combobox"
          onChange={(e) => {
            setQuery(e.target.value)
            setHighlightIdx(0)
          }}
          onKeyDown={onKeyDown}
        />
      </div>

      <div className="home-quick-search__panel">
        <p className="home-quick-search__panel-cap" aria-hidden="true">
          {query.trim() ? `일치하는 페이지 (${filtered.length})` : '자주 찾는 페이지'}
        </p>
        <ul id={listId} className="home-quick-search__list" role="listbox" aria-label="페이지 검색 결과">
          {filtered.length === 0 ? (
            <li className="home-quick-search__empty" role="status">
              검색 결과가 없습니다. 다른 단어를 입력해 보세요.
            </li>
          ) : (
            filtered.map((r, idx) => {
              const active = idx === activeIdx
              return (
                <li
                  key={r.path}
                  id={`${listId}-opt-${idx}`}
                  className={`home-quick-search__item${active ? ' home-quick-search__item--active' : ''}`}
                  role="option"
                  aria-selected={active}
                >
                  <Link
                    to={r.path}
                    className="home-quick-search__link"
                    onMouseEnter={() => setHighlightIdx(idx)}
                    onClick={() => setQuery('')}
                  >
                    <span className="home-quick-search__link-path">{r.path}</span>
                    <span className="home-quick-search__link-title">{r.title}</span>
                    <span className="home-quick-search__link-desc">{r.subtitle}</span>
                  </Link>
                </li>
              )
            })
          )}
        </ul>
      </div>
      <p className="home-quick-search__hint">
        방향키로 선택 · Enter로 이동 · 또는 항목을 클릭 · Esc로 검색어만 지우기
      </p>
    </div>
  )
}
