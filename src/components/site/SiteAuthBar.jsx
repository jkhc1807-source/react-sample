import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.js'
import { useFavorites } from '../../hooks/useFavorites.js'
import './SiteAuthBar.css'

function avatarInitial(email) {
  if (!email) return '?'
  const local = email.includes('@') ? email.split('@')[0] : email
  const ch = local.trim()[0]
  if (!ch) return '?'
  return ch.toLocaleUpperCase('ko-KR')
}

function FavoritesList({ favorites, toggleFavorite }) {
  if (favorites.length === 0) {
    return (
      <div className="site-auth__fav-empty">
        <p className="site-auth__fav-empty-line">즐겨찾기가 없습니다.</p>
        <p className="site-auth__fav-empty-hint">
          페이지로 이동한 뒤 상단의 <strong>즐겨찾기</strong> 버튼(별)을 눌러 추가할 수 있습니다. 홈에서는 아래
          권장·추천 링크로 들어가 보세요.
        </p>
      </div>
    )
  }
  return (
    <ul className="site-auth__fav-list">
      {favorites.map((f) => (
        <li key={f.path} className="site-auth__fav-item">
          <Link to={f.path} className="site-auth__fav-link">
            <span className="site-auth__fav-title">{f.title}</span>
            <span className="site-auth__fav-path">{f.path}</span>
          </Link>
          <button
            type="button"
            className="site-auth__fav-remove"
            aria-label={`${f.title} 즐겨찾기 해제`}
            onClick={() => toggleFavorite(f.path)}
          >
            제거
          </button>
        </li>
      ))}
    </ul>
  )
}

export default function SiteAuthBar() {
  const { pathname } = useLocation()
  const { user, status, logout } = useAuth()
  const { favorites, toggleFavorite } = useFavorites()
  const [menuOpen, setMenuOpen] = useState(false)
  const popoverRef = useRef(null)

  useEffect(() => {
    const id = window.setTimeout(() => setMenuOpen(false), 0)
    return () => window.clearTimeout(id)
  }, [user?.id, user?.email, pathname])

  useEffect(() => {
    if (!menuOpen) return
    const onPointerDown = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('pointerdown', onPointerDown, true)
    return () => document.removeEventListener('pointerdown', onPointerDown, true)
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        setMenuOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const isAdmin = user?.role === 'admin'

  if (user) {
    const initial = avatarInitial(user.email)
    return (
      <div className="site-auth site-auth--session">
        <div
          ref={popoverRef}
          className={`site-auth__popover${menuOpen ? ' site-auth__popover--open' : ''}`}
        >
          <button
            type="button"
            className="site-auth__avatar"
            aria-haspopup="true"
            aria-expanded={menuOpen}
            aria-controls="site-auth-account-panel"
            id="site-auth-account-trigger"
            title={`${user.email} — 계정·즐겨찾기`}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="site-auth__avatar-letter" aria-hidden>
              {initial}
            </span>
            <span className="visually-hidden">
              {menuOpen
                ? '계정·즐겨찾기 메뉴 닫기'
                : '계정·즐겨찾기 메뉴 열기'}
            </span>
          </button>

          <div
            id="site-auth-account-panel"
            className="site-auth__panel site-auth__panel--wide"
            role="region"
            aria-label="계정 및 즐겨찾기"
            inert={!menuOpen}
          >
            <div className="site-auth__panel-inner">
              <p className="site-auth__panel-email">{user.email}</p>
              <p className="site-auth__panel-meta">
                역할: <strong>{isAdmin ? '관리자' : '회원'}</strong>
              </p>

              <div className="site-auth__divider" />

              <p className="site-auth__fav-heading">즐겨찾기</p>
              <div className="site-auth__fav-scroll">
                <FavoritesList favorites={favorites} toggleFavorite={toggleFavorite} />
              </div>

              <div className="site-auth__divider" />

              <div className="site-auth__panel-actions">
                {isAdmin && (
                  <Link to="/admin" className="site-auth__panel-link">
                    어드민
                  </Link>
                )}
                <button type="button" className="site-auth__panel-logout" onClick={() => logout()}>
                  로그아웃
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="site-auth site-auth--guest"
      aria-busy={status === 'loading'}
      aria-live={status === 'loading' ? 'polite' : undefined}
    >
      <div
        ref={popoverRef}
        className={`site-auth__popover${menuOpen ? ' site-auth__popover--open' : ''}`}
      >
        <button
          type="button"
          className="site-auth__avatar site-auth__avatar--bookmark"
          aria-haspopup="true"
          aria-expanded={menuOpen}
          aria-controls="site-auth-guest-fav-panel"
          id="site-auth-guest-fav-trigger"
          title="즐겨찾기 목록"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="site-auth__avatar-star" aria-hidden>
            ★
          </span>
          <span className="visually-hidden">
            {menuOpen ? '즐겨찾기 목록 닫기' : '즐겨찾기 목록 열기'}
          </span>
        </button>
        <div
          id="site-auth-guest-fav-panel"
          className="site-auth__panel site-auth__panel--wide"
          role="region"
          aria-label="즐겨찾기"
          inert={!menuOpen}
        >
          <div className="site-auth__panel-inner">
            <p className="site-auth__fav-heading">즐겨찾기</p>
            <div className="site-auth__fav-scroll">
              <FavoritesList favorites={favorites} toggleFavorite={toggleFavorite} />
            </div>
          </div>
        </div>
      </div>
      <Link to="/auth" className="site-auth__login">
        로그인
      </Link>
    </div>
  )
}
