import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'
import './AuthPage.css'

function flattenFieldErrors(details) {
  if (!details?.fieldErrors) return []
  const out = []
  for (const [, msgs] of Object.entries(details.fieldErrors)) {
    if (Array.isArray(msgs)) out.push(...msgs)
  }
  return out
}

export default function AuthPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, register } = useAuth()
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  const from = location.state?.from?.pathname || '/'

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setPending(true)
    try {
      if (mode === 'register') {
        if (password !== password2) {
          setError('비밀번호 확인이 일치하지 않습니다.')
          setPending(false)
          return
        }
        await register(email, password)
      } else {
        await login(email, password)
      }
      navigate(from, { replace: true })
    } catch (err) {
      if (err.code === 'invalid_credentials') {
        setError('이메일 또는 비밀번호가 올바르지 않습니다.')
      } else if (err.code === 'email_taken') {
        setError('이미 가입된 이메일입니다.')
      } else if (err.details) {
        const msgs = flattenFieldErrors(err.details)
        setError(msgs.length ? msgs.join(' ') : '입력 값을 확인해 주세요.')
      } else {
        setError('요청에 실패했습니다. API 서버가 실행 중인지 확인해 주세요.')
      }
    } finally {
      setPending(false)
    }
  }

  return (
    <article className="auth-page">
      <header className="auth-page__head">
        <p className="auth-page__eyebrow">계정</p>
        <h1 className="auth-page__title">로그인 · 회원가입</h1>
        <p className="auth-page__lead">
          세션은 <strong>httpOnly 쿠키</strong>로만 유지됩니다. 비밀번호는 브라우저 저장소에 넣지 않습니다.
        </p>
      </header>

      <div className="auth-page__tabs" role="tablist" aria-label="인증 방식">
        <button
          type="button"
          role="tab"
          id="tab-login"
          aria-selected={mode === 'login'}
          aria-controls="auth-panel"
          className={`auth-page__tab${mode === 'login' ? ' auth-page__tab--active' : ''}`}
          onClick={() => {
            setMode('login')
            setError('')
          }}
        >
          로그인
        </button>
        <button
          type="button"
          role="tab"
          id="tab-register"
          aria-selected={mode === 'register'}
          aria-controls="auth-panel"
          className={`auth-page__tab${mode === 'register' ? ' auth-page__tab--active' : ''}`}
          onClick={() => {
            setMode('register')
            setError('')
          }}
        >
          회원가입
        </button>
      </div>

      <form
        id="auth-panel"
        role="tabpanel"
        aria-labelledby={mode === 'login' ? 'tab-login' : 'tab-register'}
        className="auth-page__form"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="auth-page__field">
          <label htmlFor="auth-email">이메일</label>
          <input
            id="auth-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="auth-page__field">
          <label htmlFor="auth-password">비밀번호</label>
          <input
            id="auth-password"
            name="password"
            type="password"
            autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={mode === 'register' ? 12 : undefined}
          />
          {mode === 'register' ? (
            <p className="auth-page__hint" id="auth-password-hint">
              12자 이상, 영문과 숫자를 포함해야 합니다.
            </p>
          ) : null}
        </div>

        {mode === 'register' ? (
          <div className="auth-page__field">
            <label htmlFor="auth-password2">비밀번호 확인</label>
            <input
              id="auth-password2"
              name="password2"
              type="password"
              autoComplete="new-password"
              required
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              aria-describedby="auth-password-hint"
            />
          </div>
        ) : null}

        {error ? (
          <p className="auth-page__error" role="alert">
            {error}
          </p>
        ) : null}

        <button type="submit" className="auth-page__submit" disabled={pending}>
          {pending ? '처리 중…' : mode === 'register' ? '회원가입' : '로그인'}
        </button>
      </form>

      <p className="auth-page__api-note">
        개발용 API는 <code>server</code> 폴더에서 실행해야 합니다. (
        <Link to="/">홈으로</Link>)
      </p>
    </article>
  )
}
