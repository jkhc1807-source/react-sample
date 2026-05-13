import { NavLink, Outlet } from 'react-router-dom'
import ScrollableTabList from '../../components/ScrollableTabList.jsx'
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
  return (
    <div className="fn-layout">
      <header className="fn-layout__head">
        <h1 className="fn-layout__title">함수 학습</h1>
        <p className="fn-layout__lead">
          <code>map</code>·<code>useState</code>·배열·객체 메서드를 탭으로 나눠 두었습니다. 맨 끝{' '}
          <strong>점검표</strong>에서 이 허브에 있는 주제를 한눈에 확인할 수 있습니다.
        </p>
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
