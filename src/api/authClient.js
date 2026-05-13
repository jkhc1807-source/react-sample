import { apiUrl } from './apiBase.js'

const JSON_HEADERS = { 'Content-Type': 'application/json' }

export async function fetchMe() {
  const res = await fetch(apiUrl('/api/auth/me'), { credentials: 'include' })
  if (!res.ok) return null
  const data = await res.json()
  return data.user ?? null
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
