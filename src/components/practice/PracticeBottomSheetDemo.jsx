import { useEffect, useId, useState } from 'react'
import './PracticeBottomSheetDemo.css'

export default function PracticeBottomSheetDemo() {
  const sheetId = useId().replace(/:/g, '')
  const titleId = `${sheetId}-title`
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <div className="pr-sheet">
      <button
        type="button"
        className="pr-sheet__trigger"
        aria-expanded={open}
        aria-controls={`${sheetId}-panel`}
        onClick={() => setOpen(true)}
      >
        하단 시트 열기
      </button>

      <div
        className={`pr-sheet__scrim${open ? ' pr-sheet__scrim--visible' : ''}`}
        aria-hidden={!open}
        onClick={() => setOpen(false)}
      />

      <div
        id={`${sheetId}-panel`}
        className={`pr-sheet__panel${open ? ' pr-sheet__panel--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-hidden={!open}
      >
        <div className="pr-sheet__handle" aria-hidden="true" />
        <h3 id={titleId} className="pr-sheet__title">
          슬라이드 레이어
        </h3>
        <p className="pr-sheet__body">
          <code>transform: translateY</code>와 열림 state만으로 모바일 시트·메뉴 패턴을 흉내 낼 수
          있습니다.
        </p>
        <button type="button" className="pr-sheet__close" onClick={() => setOpen(false)}>
          닫기
        </button>
      </div>
    </div>
  )
}
