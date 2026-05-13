import { NavLink, Outlet } from 'react-router-dom'
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
  return (
    <div className="pr-layout">
      <header className="pr-layout__head">
        <h1 className="pr-layout__title">실무·심화</h1>
        <p className="pr-layout__lead">
          예전의 <strong>실무 패턴</strong> 페이지와 <strong>다음 단계(심화)</strong> 예제를 한 허브로
          모았습니다. 탭마다 한 가지 업무 흐름에 가깝게 구성했습니다.
        </p>
      </header>
      <nav className="pr-layout__tabs" aria-label="실무·심화 탭">
        <div className="pr-layout__tabs-scroll">
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
        </div>
      </nav>
      <div className="pr-layout__body">
        <Outlet />
      </div>
    </div>
  )
}
