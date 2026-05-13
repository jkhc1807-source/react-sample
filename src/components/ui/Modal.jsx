import { useEffect, useId, useRef } from 'react'
import './Modal.css'

function getFocusable(root) {
  if (!root) return []
  const sel =
    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  return Array.from(root.querySelectorAll(sel))
}

export default function Modal({ open, title, onClose, children, footer }) {
  const titleId = useId()
  const panelRef = useRef(null)
  const previousActive = useRef(null)

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  useEffect(() => {
    if (!open) return

    previousActive.current = document.activeElement
    const panel = panelRef.current
    requestAnimationFrame(() => {
      panel?.focus({ preventScroll: true })
    })

    function onKeyDown(e) {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose()
        return
      }
      if (e.key !== 'Tab' || !panel) return

      const focusables = getFocusable(panel)
      if (focusables.length === 0) return

      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      const active = document.activeElement

      if (e.shiftKey) {
        if (active === first || active === panel) {
          e.preventDefault()
          last.focus()
        }
      } else if (active === panel && focusables.length > 0) {
        e.preventDefault()
        first.focus()
      } else if (active === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      const prevEl = previousActive.current
      if (prevEl && typeof prevEl.focus === 'function') {
        prevEl.focus({ preventScroll: true })
      }
      previousActive.current = null
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="ui-modal-backdrop" role="presentation" onClick={onClose}>
      <div
        ref={panelRef}
        className="ui-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="ui-modal__head">
          <h2 id={titleId} className="ui-modal__title">
            {title}
          </h2>
          <button type="button" className="ui-modal__close" onClick={onClose} aria-label="닫기">
            ×
          </button>
        </header>
        <div className="ui-modal__body">{children}</div>
        {footer && <div className="ui-modal__footer">{footer}</div>}
      </div>
    </div>
  )
}
