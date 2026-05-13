import { useCallback, useMemo, useState, useEffect } from 'react'
import { AuthContext } from './auth-context.js'
import * as authApi from '../api/authClient.js'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [status, setStatus] = useState('loading')

  const refresh = useCallback(async () => {
    try {
      const u = await authApi.fetchMe()
      setUser(u)
      setStatus(u ? 'user' : 'anon')
    } catch {
      setUser(null)
      setStatus('anon')
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    queueMicrotask(() => {
      ;(async () => {
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
      refresh,
      login,
      register,
      logout,
      isAuthenticated: Boolean(user),
    }),
    [user, status, refresh, login, register, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
