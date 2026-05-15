import { apiUrl } from './apiBase.js'
import { getTipForDate } from '../data/homeDailyTips.js'
import { getRandomFaqTip } from '../data/homeDailyTips.js'

export async function fetchTodayTip() {
  try {
    const res = await fetch(apiUrl('/api/tips/today'))
    if (!res.ok) throw new Error('tips_failed')
    const data = await res.json()
    if (typeof data.today === 'string' && data.today.length > 0) return data.today
  } catch {
    /* API 없으면 로컬 폴백 */
  }
  return getTipForDate()
}

export async function fetchRandomFaqTip(exclude = null) {
  try {
    const q = exclude ? `?exclude=${encodeURIComponent(exclude)}` : ''
    const res = await fetch(apiUrl(`/api/tips/random${q}`))
    if (!res.ok) throw new Error('tips_failed')
    const data = await res.json()
    if (typeof data.tip === 'string' && data.tip.length > 0) return data.tip
  } catch {
    /* 폴백 */
  }
  return getRandomFaqTip(exclude)
}
