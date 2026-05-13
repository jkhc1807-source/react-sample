import { Link, Outlet } from 'react-router-dom'
import SiteNav from '../components/site/SiteNav.jsx'
import SiteAuthBar from '../components/site/SiteAuthBar.jsx'
import './AppLayout.css'

export default function AppLayout() {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        본문으로 건너뛰기
      </a>
      <header className="app-shell__header">
        <div className="app-shell__header-inner">
          <Link to="/" className="app-shell__brand">
            React 학습
          </Link>
          <div className="app-shell__header-tools">
            <SiteAuthBar />
            <SiteNav />
          </div>
        </div>
      </header>
      <main id="main-content" className="app-shell__main" tabIndex={-1}>
        <Outlet />
      </main>
    </div>
  )
}
