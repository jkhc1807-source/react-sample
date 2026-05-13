/** 실무·심화 허브 — 복붙용 요약 */

export const PRACTICE_POST_EXPLORER = `// 흐름: 1) fetch로 목록 적재  2) 검색어는 useDebouncedValue
// 3) useMemo + filter로 클라이언트 필터  4) slice로 화면에 보여 줄 개수 제한

import { useDebouncedValue } from './hooks/useDebouncedValue.js'

// load() 안에서
const ac = new AbortController()
const res = await fetch(url, { signal: ac.signal })

// 표시 목록
const filtered = useMemo(
  () => items.filter((p) => p.title.toLowerCase().includes(query.toLowerCase())),
  [items, query],
)
const page = filtered.slice(0, 40)
`
