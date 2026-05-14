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
      <p className="site-auth__fav-empty">즐겨찾기가 없습니다.</p>
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
  const isHome = pathname === '/' || pathname === ''
  const { user, status, logout } = useAuth()
  const { favorites, toggleFavorite } = useFavorites()
  const [menuOpen, setMenuOpen] = useState(false)
  const popoverRef = useRef(null)

  useEffect(() => {
    setMenuOpen(false)
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

  if (status === 'loading') {
    return (
      <div className="site-auth" aria-busy="true">
        <span className="site-auth__loading">계정 확인 중…</span>
      </div>
    )
  }

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
            title={isHome ? `${user.email} — 계정` : `${user.email} — 계정·즐겨찾기`}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="site-auth__avatar-letter" aria-hidden>
              {initial}
            </span>
            <span className="visually-hidden">
              {menuOpen
                ? isHome
                  ? '계정 메뉴 닫기'
                  : '계정·즐겨찾기 메뉴 닫기'
                : isHome
                  ? '계정 메뉴 열기'
                  : '계정·즐겨찾기 메뉴 열기'}
            </span>
          </button>

          <div
            id="site-auth-account-panel"
            className={`site-auth__panel${isHome ? '' : ' site-auth__panel--wide'}`}
            role="region"
            aria-label={isHome ? '계정' : '계정 및 즐겨찾기'}
            inert={!menuOpen}
          >
            <div className="site-auth__panel-inner">
              <p className="site-auth__panel-email">{user.email}</p>
              <p className="site-auth__panel-meta">
                역할: <strong>{isAdmin ? '관리자' : '회원'}</strong>
              </p>

              {!isHome && (
                <>
                  <div className="site-auth__divider" />

                  <p className="site-auth__fav-heading">즐겨찾기</p>
                  <div className="site-auth__fav-scroll">
                    <FavoritesList favorites={favorites} toggleFavorite={toggleFavorite} />
                  </div>
                </>
              )}

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
    <div className="site-auth site-auth--guest">
      {!isHome && (
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
      )}
      <Link to="/auth" className="site-auth__login">
        로그인
      </Link>
    </div>
  )
}
