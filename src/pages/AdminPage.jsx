import { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { fetchAdminUsers } from '../api/adminClient.js'
import { useAuth } from '../hooks/useAuth.js'
import AdminTipsEditor from '../components/admin/AdminTipsEditor.jsx'
import AdminFaqEditor from '../components/admin/AdminFaqEditor.jsx'
import AdminHomeEditor from '../components/admin/AdminHomeEditor.jsx'
import AdminPageHeadersEditor from '../components/admin/AdminPageHeadersEditor.jsx'
import './AdminPage.css'

function AdminUsersTable() {
  const [rows, setRows] = useState([])
  const [error, setError] = useState('')
  const [listLoading, setListLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        setListLoading(true)
        const users = await fetchAdminUsers()
        if (cancelled) return
        setRows(users)
        setError('')
      } catch (e) {
        if (cancelled) return
        setError(e.message === 'forbidden' ? '권한이 없습니다.' : '회원 목록을 불러오지 못했습니다.')
        setRows([])
      } finally {
        if (!cancelled) setListLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <>
      {error ? (
        <p className="admin-page__error" role="alert">
          {error}
        </p>
      ) : null}

      <div className="admin-page__card">
        <div className="admin-page__card-head">
          <p className="admin-page__count">
            총 <strong>{rows.length}</strong> 명
          </p>
          {listLoading && <p className="admin-page__status">불러오는 중…</p>}
        </div>
        <div className="admin-page__table-wrap">
          <table className="admin-page__table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">이메일</th>
                <th scope="col">권한</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((u) => (
                <tr key={u.id}>
                  <td className="admin-page__cell-id">{u.id}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                </tr>
              ))}
              {!listLoading && rows.length === 0 && (
                <tr>
                  <td colSpan={3} className="admin-page__empty">
                    아직 가입된 사용자가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default function AdminPage() {
  const { user, status, isAuthenticated } = useAuth()
  const location = useLocation()
  const [tab, setTab] = useState('home')
  const isAdmin = user?.role === 'admin'

  if (status === 'loading') {
    return (
      <article className="admin-page">
        <p className="admin-page__status">세션 확인 중…</p>
      </article>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />
  }

  if (!isAdmin) {
    return (
      <article className="admin-page">
        <header className="admin-page__head">
          <p className="admin-page__eyebrow">Admin</p>
          <h1 className="admin-page__title">접근 권한 없음</h1>
          <p className="admin-page__lead">관리자 계정으로만 볼 수 있는 영역입니다.</p>
        </header>
      </article>
    )
  }

  return (
    <article className="admin-page">
      <header className="admin-page__head">
        <p className="admin-page__eyebrow">Admin</p>
        <h1 className="admin-page__title">관리</h1>
        <p className="admin-page__lead">
          개발 환경에서는 <code>admin</code> / <code>admin</code> 으로 로그인할 수 있습니다. 콘텐츠는{' '}
          <code>server/data/*.json</code>에 저장됩니다.
        </p>
      </header>

      <nav className="admin-page__tabs" aria-label="관리 메뉴">
        <button
          type="button"
          className={`admin-page__tab${tab === 'home' ? ' admin-page__tab--active' : ''}`}
          onClick={() => setTab('home')}
        >
          홈
        </button>
        <button
          type="button"
          className={`admin-page__tab${tab === 'faq' ? ' admin-page__tab--active' : ''}`}
          onClick={() => setTab('faq')}
        >
          FAQ
        </button>
        <button
          type="button"
          className={`admin-page__tab${tab === 'learn' ? ' admin-page__tab--active' : ''}`}
          onClick={() => setTab('learn')}
        >
          학습 헤더
        </button>
        <button
          type="button"
          className={`admin-page__tab${tab === 'tips' ? ' admin-page__tab--active' : ''}`}
          onClick={() => setTab('tips')}
        >
          팁
        </button>
        <button
          type="button"
          className={`admin-page__tab${tab === 'users' ? ' admin-page__tab--active' : ''}`}
          onClick={() => setTab('users')}
        >
          회원
        </button>
      </nav>

      {tab === 'home' && <AdminHomeEditor />}
      {tab === 'faq' && <AdminFaqEditor />}
      {tab === 'learn' && <AdminPageHeadersEditor />}
      {tab === 'tips' && <AdminTipsEditor />}
      {tab === 'users' && (
        <>
          <h2 className="admin-page__section-title">회원 목록</h2>
          <AdminUsersTable />
        </>
      )}
    </article>
  )
}
