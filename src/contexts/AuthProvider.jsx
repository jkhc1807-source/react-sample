import { useCallback, useMemo, useState, useEffect } from 'react'
import { AuthContext } from './auth-context.js'
import * as authApi from '../api/authClient.js'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let cancelled = false
    // 개발(StrictMode)에서 부모 commit 직후 동기 setState와 겹치는 경고를 줄이기 위해 한 틱 미룸
    queueMicrotask(() => {
      void (async () => {
        try {
          const u = await authApi.fetchMe()
          if (cancelled) return
          setUser(u)
          setStatus(u ? 'user' : 'anon')
        } catch {
          if (cancelled) return
          setUser(null)
          setStatus('anon')
        }
      })()
    })
    return () => {
      cancelled = true
    }
  }, [])

  const login = useCallback(async (email, password) => {
    const u = await authApi.loginRequest(email, password)
    setUser(u)
    setStatus('user')
    return u
  }, [])

  const register = useCallback(async (email, password) => {
    const u = await authApi.registerRequest(email, password)
    setUser(u)
    setStatus('user')
    return u
  }, [])

  const logout = useCallback(async () => {
    await authApi.logoutRequest()
    setUser(null)
    setStatus('anon')
  }, [])

  const value = useMemo(
    () => ({
      user,
      status,
      login,
      register,
      logout,
      isAuthenticated: Boolean(user),
    }),
    [user, status, login, register, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
