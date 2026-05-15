import { useCallback, useEffect, useState } from 'react'
import './PracticeUndoSnackbarDemo.css'

export default function PracticeUndoSnackbarDemo() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  const hide = useCallback(() => {
    setVisible(false)
  }, [])

  useEffect(() => {
    if (!visible) return undefined
    const t = window.setTimeout(hide, 4200)
    return () => window.clearTimeout(t)
  }, [visible, hide])

  return (
    <div className="pr-snack">
      <button
        type="button"
        className="pr-snack__trigger"
        onClick={() => {
          setDismissed(false)
          setVisible(true)
        }}
      >
        “메모 삭제” 시뮬레이션
      </button>
      <div
        className={`pr-snack__wrap${visible && !dismissed ? ' pr-snack__wrap--show' : ''}`}
        aria-live="polite"
      >
        <div className="pr-snack__bar" role="status">
          <span>메모를 삭제했습니다.</span>
          <button
            type="button"
            className="pr-snack__undo"
            onClick={() => {
              setDismissed(true)
              hide()
            }}
          >
            실행 취소
          </button>
          <button type="button" className="pr-snack__x" aria-label="닫기" onClick={hide}>
            ×
          </button>
        </div>
      </div>
    </div>
  )
}
