import { NavLink, Outlet } from 'react-router-dom'
import ScrollableTabList from '../../components/ScrollableTabList.jsx'
import { usePageHeader } from '../../hooks/usePageHeader.js'
import './PracticeLayout.css'

const TABS = [
  { path: '/practice/overview', label: '개요·점검' },
  { path: '/practice/ui', label: 'UI·이벤트' },
  { path: '/practice/data', label: '데이터·검색' },
  { path: '/practice/workshop', label: '폼·목록·큐' },
  { path: '/practice/async', label: 'effect·비동기' },
  { path: '/practice/quality', label: '에러·접근성' },
]

export default function PracticeLayout() {
  const header = usePageHeader('practice')

  return (
    <div className="pr-layout">
      <header className="pr-layout__head">
        <h1 className="pr-layout__title">{header.title}</h1>
        <p className="pr-layout__lead">{header.lead}</p>
      </header>
      <nav className="pr-layout__tabs" aria-label="실무·심화 탭">
        <ScrollableTabList trackClassName="pr-layout__tabs-scroll">
          {TABS.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `pr-layout__tab${isActive ? ' pr-layout__tab--active' : ''}`
              }
            >
              {label}
            </NavLink>
          ))}
        </ScrollableTabList>
      </nav>
      <div className="pr-layout__body">
        <Outlet />
      </div>
    </div>
  )
}
