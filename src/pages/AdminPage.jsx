import { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { apiUrl } from '../api/apiBase.js'
import { useAuth } from '../hooks/useAuth.js'
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
        const res = await fetch(apiUrl('/api/auth/admin/users'), { credentials: 'include' })
        const data = await res.json().catch(() => ({}))
        if (cancelled) return
        if (!res.ok) {
          setError(data.error || '요청 실패')
          setRows([])
          return
        }
        setRows(Array.isArray(data.users) ? data.users : [])
        setError('')
      } catch {
        if (cancelled) return
        setError('API 요청 중 오류가 발생했습니다.')
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
        <h1 className="admin-page__title">회원 목록</h1>
        <p className="admin-page__lead">
          메모리 데모라 새로고침이나 서버 재시작 후에는 목록이 비어 있을 수 있습니다.
        </p>
      </header>

      <AdminUsersTable />
    </article>
  )
}
