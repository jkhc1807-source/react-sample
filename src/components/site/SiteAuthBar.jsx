import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.js'
import './SiteAuthBar.css'

export default function SiteAuthBar() {
  const { user, status, logout } = useAuth()
  const isAdmin = user?.role === 'admin'

  if (status === 'loading') {
    return (
      <div className="site-auth" aria-busy="true">
        <span className="site-auth__loading">계정 확인 중…</span>
      </div>
    )
  }

  if (user) {
    return (
      <div className="site-auth">
        <span className="site-auth__email" title={user.email}>
          {user.email}
        </span>
        {isAdmin && (
          <Link to="/admin" className="site-auth__admin">
            어드민
          </Link>
        )}
        <button type="button" className="site-auth__logout" onClick={() => logout()}>
          로그아웃
        </button>
      </div>
    )
  }

  return (
    <div className="site-auth">
      <Link to="/auth" className="site-auth__login">
        로그인
      </Link>
    </div>
  )
}
