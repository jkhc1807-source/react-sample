import { useCallback, useState } from 'react'

/** UI 토글 등 단순 불리언 로직을 커스텀 훅으로 분리한 예시 */
export function useToggle(initial = false) {
  const [on, setOn] = useState(Boolean(initial))
  const toggle = useCallback(() => setOn((v) => !v), [])
  const setTrue = useCallback(() => setOn(true), [])
  const setFalse = useCallback(() => setOn(false), [])
  return { on, toggle, setTrue, setFalse }
}
