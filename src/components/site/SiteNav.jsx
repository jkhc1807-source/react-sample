import { NavLink, useLocation } from 'react-router-dom'
import './SiteNav.css'

const links = [
  { to: '/', label: '홈', end: true },
  { to: '/playground', label: '샘플 모음' },
  { to: '/functions/map', label: '함수', matchPrefix: '/functions' },
  { to: '/practice/overview', label: '실무·심화', matchPrefix: '/practice' },
  { to: '/ui-kit', label: 'UI 키트' },
]

export default function SiteNav() {
  const { pathname } = useLocation()

  return (
    <nav className="site-nav" aria-label="주요 페이지">
      <div className="site-nav__rail">
        <ul className="site-nav__list">
          {links.map(({ to, label, end, matchPrefix }) => (
            <li key={to} className="site-nav__item">
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) => {
                  const prefixActive = matchPrefix && pathname.startsWith(matchPrefix)
                  const active = isActive || prefixActive
                  return `site-nav__link${active ? ' site-nav__link--active' : ''}`
                }}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
