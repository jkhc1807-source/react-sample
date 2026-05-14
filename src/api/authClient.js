import { apiUrl } from './apiBase.js'

const JSON_HEADERS = { 'Content-Type': 'application/json' }

/** 동시에 여러 번 호출돼도 /me 요청은 하나로 합침(StrictMode 이중 effect 등) */
let fetchMePromise = null

export async function fetchMe() {
  if (!fetchMePromise) {
    fetchMePromise = (async () => {
      try {
        const res = await fetch(apiUrl('/api/auth/me'), { credentials: 'include' })
        if (!res.ok) return null
        const data = await res.json()
        return data.user ?? null
      } finally {
        fetchMePromise = null
      }
    })()
  }
  return fetchMePromise
}

export async function loginRequest(email, password) {
  const res = await fetch(apiUrl('/api/auth/login'), {
    method: 'POST',
    headers: JSON_HEADERS,
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const err = new Error(data.error || 'request_failed')
    err.code = data.error
    err.details = data.details
    throw err
  }
  return data.user
}

export async function registerRequest(email, password) {
  const res = await fetch(apiUrl('/api/auth/register'), {
    method: 'POST',
    headers: JSON_HEADERS,
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const err = new Error(data.error || 'request_failed')
    err.code = data.error
    err.details = data.details
    throw err
  }
  return data.user
}

export async function logoutRequest() {
  await fetch(apiUrl('/api/auth/logout'), {
    method: 'POST',
    credentials: 'include',
  })
}
