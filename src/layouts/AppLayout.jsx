import { Link, Outlet, useLocation } from 'react-router-dom'
import SiteNav from '../components/site/SiteNav.jsx'
import SiteAuthBar from '../components/site/SiteAuthBar.jsx'
import GlobalRouteSearch from '../components/site/GlobalRouteSearch.jsx'
import PageFavoriteButton from '../components/site/PageFavoriteButton.jsx'
import DocumentMeta from '../components/site/DocumentMeta.jsx'
import './AppLayout.css'

export default function AppLayout() {
  const { pathname } = useLocation()
  const isHome = pathname === '/' || pathname === ''

  return (
    <div className="app-shell">
      <DocumentMeta />
      <a className="skip-link" href="#main-content">
        본문으로 건너뛰기
      </a>
      <header className="app-shell__header">
        <div className="app-shell__header-inner">
          <div className="app-shell__header-row app-shell__header-row--top">
            <Link to="/" className="app-shell__brand">
              React 학습
            </Link>
            <div className="app-shell__header-center">
              <GlobalRouteSearch />
            </div>
            <div className="app-shell__header-auth">
              <SiteAuthBar />
            </div>
          </div>
          <div className="app-shell__header-row app-shell__header-row--nav">
            <SiteNav />
          </div>
        </div>
      </header>
      {!isHome && (
        <div className="app-shell__page-tools" aria-label="현재 페이지 도구">
          <PageFavoriteButton />
        </div>
      )}
      <main id="main-content" className="app-shell__main" tabIndex={-1}>
        <Outlet />
      </main>
    </div>
  )
}
