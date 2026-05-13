import { useEffect, useState } from 'react'

/** 입력값을 delayMs 후에만 반영 — 검색·API 호출에 흔한 패턴 */
export function useDebouncedValue(value, delayMs) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(value), delayMs)
    return () => window.clearTimeout(id)
  }, [value, delayMs])

  return debounced
}
