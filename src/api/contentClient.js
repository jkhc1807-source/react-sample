import { apiUrl } from './apiBase.js'
import { DEFAULT_HOME_CONTENT } from '../data/defaultHome.js'
import { DEFAULT_PAGE_HEADERS } from '../data/defaultPageHeaders.js'
import { GEO_FAQ_ITEMS } from '../data/geoFaq.js'

export async function fetchFaqItems() {
  try {
    const res = await fetch(apiUrl('/api/content/faq'))
    if (!res.ok) throw new Error('faq_failed')
    const data = await res.json()
    if (Array.isArray(data.items) && data.items.length > 0) return data.items
  } catch {
    /* 폴백 */
  }
  return GEO_FAQ_ITEMS
}

export async function fetchHomeContent() {
  try {
    const res = await fetch(apiUrl('/api/content/home'))
    if (!res.ok) throw new Error('home_failed')
    const data = await res.json()
    if (data.home) return data.home
  } catch {
    /* 폴백 */
  }
  return DEFAULT_HOME_CONTENT
}

export async function fetchPageHeaders() {
  try {
    const res = await fetch(apiUrl('/api/content/page-headers'))
    if (!res.ok) throw new Error('page_headers_failed')
    const data = await res.json()
    if (data.pageHeaders) return data.pageHeaders
  } catch {
    /* 폴백 */
  }
  return DEFAULT_PAGE_HEADERS
}
