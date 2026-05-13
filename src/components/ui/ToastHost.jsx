import './ToastHost.css'

export function ToastHost({ toasts, onDismiss }) {
  if (toasts.length === 0) return null

  return (
    <div className="toast-host" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className="toast-host__item" role="status">
          <span className="toast-host__text">{t.message}</span>
          <button type="button" className="toast-host__close" onClick={() => onDismiss(t.id)} aria-label="닫기">
            ×
          </button>
        </div>
      ))}
    </div>
  )
}
