import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './NotFoundPage.css'

const TITLE = '페이지를 찾을 수 없음 | React 학습 허브'

export default function NotFoundPage() {
  const { pathname } = useLocation()

  useEffect(() => {
    const prev = document.title
    document.title = TITLE
    return () => {
      document.title = prev
    }
  }, [])

  return (
    <article className="not-found">
      <header className="not-found__head">
        <p className="not-found__eyebrow">404</p>
        <h1 className="not-found__title">페이지를 찾을 수 없습니다</h1>
        <p className="not-found__lead">
          주소가 바뀌었거나, 잘못 입력했을 수 있습니다. 검색으로 이동하거나 홈에서 다시 찾아보세요.
        </p>
        <p className="not-found__path" aria-label="요청한 경로">
          <code>{pathname}</code>
        </p>
      </header>
      <p className="not-found__actions">
        <Link to="/" className="not-found__link">
          홈으로
        </Link>
      </p>
    </article>
  )
}
