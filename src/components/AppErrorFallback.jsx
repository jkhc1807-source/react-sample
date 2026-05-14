import { Link } from 'react-router-dom'
import './AppErrorFallback.css'

export default function AppErrorFallback({ error, reset }) {
  return (
    <article className="app-error-fallback">
      <header className="app-error-fallback__head">
        <p className="app-error-fallback__eyebrow">오류</p>
        <h1 className="app-error-fallback__title">문제가 발생했습니다</h1>
        <p className="app-error-fallback__lead" role="alert">
          화면을 그리는 중 예기치 않은 오류가 났습니다. 홈으로 이동하거나 새로고침해 보세요.
        </p>
        {import.meta.env.DEV && error?.message ? (
          <pre className="app-error-fallback__detail" tabIndex={0}>
            {error.message}
          </pre>
        ) : null}
      </header>
      <div className="app-error-fallback__actions">
        <Link className="app-error-fallback__btn app-error-fallback__btn--primary" to="/" onClick={() => reset()}>
          홈으로
        </Link>
        <button
          type="button"
          className="app-error-fallback__btn app-error-fallback__btn--ghost"
          onClick={() => window.location.reload()}
        >
          새로고침
        </button>
      </div>
    </article>
  )
}
