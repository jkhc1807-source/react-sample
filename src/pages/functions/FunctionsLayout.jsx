import { NavLink, Outlet } from 'react-router-dom'
import ScrollableTabList from '../../components/ScrollableTabList.jsx'
import { usePageHeader } from '../../hooks/usePageHeader.js'
import './FunctionsLayout.css'

const TABS = [
  { path: '/functions/map', label: 'map' },
  { path: '/functions/state', label: 'useState' },
  { path: '/functions/filter', label: 'filter' },
  { path: '/functions/reduce', label: 'reduce' },
  { path: '/functions/find', label: 'find' },
  { path: '/functions/some-every', label: 'some · every' },
  { path: '/functions/sort', label: 'sort' },
  { path: '/functions/flatMap', label: 'flatMap' },
  { path: '/functions/includes', label: 'includes' },
  { path: '/functions/slice', label: 'slice' },
  { path: '/functions/object', label: 'Object' },
  { path: '/functions/set', label: 'Set' },
  { path: '/functions/coverage', label: '점검표' },
]

export default function FunctionsLayout() {
  const header = usePageHeader('functions')

  return (
    <div className="fn-layout">
      <header className="fn-layout__head">
        <h1 className="fn-layout__title">{header.title}</h1>
        <p className="fn-layout__lead">{header.lead}</p>
      </header>
      <nav className="fn-layout__tabs" aria-label="함수별 탭">
        <ScrollableTabList trackClassName="fn-layout__tabs-scroll">
          {TABS.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `fn-layout__tab${isActive ? ' fn-layout__tab--active' : ''}`
              }
            >
              {label}
            </NavLink>
          ))}
        </ScrollableTabList>
      </nav>
      <div className="fn-layout__body">
        <Outlet />
      </div>
    </div>
  )
}
