import { apiUrl } from './apiBase.js'

const JSON_HEADERS = { 'Content-Type': 'application/json' }

export async function fetchAdminUsers() {
  const res = await fetch(apiUrl('/api/admin/users'), { credentials: 'include' })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const err = new Error(data.error || 'request_failed')
    err.status = res.status
    throw err
  }
  return Array.isArray(data.users) ? data.users : []
}

export async function fetchAdminTips() {
  const res = await fetch(apiUrl('/api/admin/tips'), { credentials: 'include' })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const err = new Error(data.error || 'request_failed')
    err.status = res.status
    throw err
  }
  return data.tips ?? { daily: [], faqBonus: [] }
}

/** @param {{ daily: string[], faqBonus: string[] }} tips */
export async function saveAdminTips(tips) {
  const res = await fetch(apiUrl('/api/admin/tips'), {
    method: 'PUT',
    headers: JSON_HEADERS,
    credentials: 'include',
    body: JSON.stringify(tips),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const err = new Error(data.error || 'request_failed')
    err.status = res.status
    err.details = data.details
    throw err
  }
  return data.tips
}

export async function fetchAdminFaq() {
  const res = await fetch(apiUrl('/api/admin/faq'), { credentials: 'include' })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const err = new Error(data.error || 'request_failed')
    err.status = res.status
    throw err
  }
  return Array.isArray(data.items) ? data.items : []
}

/** @param {{ question: string, answer: string }[]} items */
export async function saveAdminFaq(items) {
  const res = await fetch(apiUrl('/api/admin/faq'), {
    method: 'PUT',
    headers: JSON_HEADERS,
    credentials: 'include',
    body: JSON.stringify({ items }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const err = new Error(data.error || 'request_failed')
    err.status = res.status
    err.details = data.details
    throw err
  }
  return data.items
}

export async function fetchAdminHome() {
  const res = await fetch(apiUrl('/api/admin/home'), { credentials: 'include' })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const err = new Error(data.error || 'request_failed')
    err.status = res.status
    throw err
  }
  return data.home
}

/** @param {object} home */
export async function saveAdminHome(home) {
  const res = await fetch(apiUrl('/api/admin/home'), {
    method: 'PUT',
    headers: JSON_HEADERS,
    credentials: 'include',
    body: JSON.stringify(home),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const err = new Error(data.error || 'request_failed')
    err.status = res.status
    err.details = data.details
    throw err
  }
  return data.home
}

export async function fetchAdminPageHeaders() {
  const res = await fetch(apiUrl('/api/admin/page-headers'), { credentials: 'include' })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const err = new Error(data.error || 'request_failed')
    err.status = res.status
    throw err
  }
  return data.pageHeaders
}

/** @param {object} pageHeaders */
export async function saveAdminPageHeaders(pageHeaders) {
  const res = await fetch(apiUrl('/api/admin/page-headers'), {
    method: 'PUT',
    headers: JSON_HEADERS,
    credentials: 'include',
    body: JSON.stringify(pageHeaders),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const err = new Error(data.error || 'request_failed')
    err.status = res.status
    err.details = data.details
    throw err
  }
  return data.pageHeaders
}
