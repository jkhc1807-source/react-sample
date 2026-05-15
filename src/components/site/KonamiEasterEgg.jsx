import { useCallback, useEffect, useRef, useState } from 'react'
import { isTypingOrDialogContext } from '../../lib/isTypingOrDialogContext.js'
import { logKonamiUnlock } from '../../bootConsoleFun.js'
import './KonamiEasterEgg.css'

const KONAMI = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
]

/** @param {KeyboardEvent} e */
function normalizeKonamiKey(e) {
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) return e.key
  if (e.key.length === 1 && /[a-z]/i.test(e.key)) return e.key.toLowerCase()
  return null
}

function endsWithKonami(buf) {
  if (buf.length < KONAMI.length) return false
  const tail = buf.slice(-KONAMI.length)
  return tail.every((v, i) => v === KONAMI[i])
}

export default function KonamiEasterEgg() {
  const [open, setOpen] = useState(false)
  const bufRef = useRef([])
  const idleRef = useRef(null)
  const autoCloseRef = useRef(null)

  const close = useCallback(() => {
    setOpen(false)
    if (autoCloseRef.current) {
      clearTimeout(autoCloseRef.current)
      autoCloseRef.current = null
    }
  }, [])

  useEffect(() => {
    function clearIdle() {
      if (idleRef.current) {
        clearTimeout(idleRef.current)
        idleRef.current = null
      }
    }

    function scheduleIdleClear() {
      clearIdle()
      idleRef.current = window.setTimeout(() => {
        bufRef.current = []
        idleRef.current = null
      }, 2800)
    }

    function onKeyDown(e) {
      if (isTypingOrDialogContext(e.target)) return
      const k = normalizeKonamiKey(e)
      if (k === null) {
        bufRef.current = []
        return
      }
      const buf = bufRef.current
      buf.push(k)
      if (buf.length > KONAMI.length) buf.shift()
      scheduleIdleClear()
      if (endsWithKonami(buf)) {
        buf.length = 0
        clearIdle()
        logKonamiUnlock()
        setOpen(true)
        if (autoCloseRef.current) clearTimeout(autoCloseRef.current)
        autoCloseRef.current = window.setTimeout(() => {
          setOpen(false)
          autoCloseRef.current = null
        }, 6500)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      clearIdle()
      if (autoCloseRef.current) {
        clearTimeout(autoCloseRef.current)
        autoCloseRef.current = null
      }
    }
  }, [])

  if (!open) return null

  return (
    <div
      className="konami-toast"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="konami-toast__inner">
        <p id="konami-title" className="konami-toast__title">
          ↑↑↓↓←→←→BA
        </p>
        <p className="konami-toast__body">
          코드는 짜셨고, 이스터 에그는 찾으셨습니다. 오늘도 렌더는 행복하길.
        </p>
        <button type="button" className="konami-toast__close" onClick={close}>
          닫기
        </button>
      </div>
    </div>
  )
}
