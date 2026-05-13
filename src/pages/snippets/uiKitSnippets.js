/** UI 키트 학습 페이지용 복붙 예제 (프로젝트 src/components/ui 와 동일 구조) */

export const UI_KIT_BUTTON = `// src/components/ui/Button.jsx
import './Button.css'

const VARIANT = {
  primary: 'ui-btn--primary',
  secondary: 'ui-btn--secondary',
  ghost: 'ui-btn--ghost',
}

export default function Button({
  children,
  variant = 'primary',
  size,
  className = '',
  type = 'button',
  disabled,
  onClick,
  ...rest
}) {
  const classes = [
    'ui-btn',
    VARIANT[variant] || VARIANT.primary,
    size === 'sm' && 'ui-btn--sm',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick} {...rest}>
      {children}
    </button>
  )
}

// 스타일: src/components/ui/Button.css (같은 폴더에 두세요)
`

export const UI_KIT_TEXTFIELD = `// src/components/ui/TextField.jsx
import { useId } from 'react'
import './TextField.css'

export default function TextField({
  id,
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  hint,
  error,
  disabled,
  required,
  autoComplete,
}) {
  const uid = useId()
  const inputId = id ?? \`ui-field-\${uid.replace(/:/g, '')}\`

  return (
    <div className="ui-field">
      {label && (
        <label className="ui-field__label" htmlFor={inputId}>
          {label}
          {required && <span className="ui-field__required" aria-hidden="true">*</span>}
        </label>
      )}
      <input
        id={inputId}
        className={\`ui-field__input\${error ? ' ui-field__input--error' : ''}\`}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={
          error ? \`\${inputId}-err\` : hint ? \`\${inputId}-hint\` : undefined
        }
      />
      {hint && !error && (
        <p id={\`\${inputId}-hint\`} className="ui-field__hint">
          {hint}
        </p>
      )}
      {error && (
        <p id={\`\${inputId}-err\`} className="ui-field__error" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

// 스타일: src/components/ui/TextField.css
`

export const UI_KIT_SELECT = `// src/components/ui/Select.jsx
import { useId } from 'react'
import './TextField.css'
import './Select.css'

/**
 * @param {{ value: string, label: string, disabled?: boolean }[]} options
 */
export default function Select({
  id,
  label,
  value,
  onChange,
  options,
  placeholder,
  hint,
  error,
  disabled,
  required,
}) {
  const uid = useId()
  const sid = id ?? \`ui-select-\${uid.replace(/:/g, '')}\`

  const mergedOptions =
    placeholder != null
      ? [{ value: '', label: placeholder, disabled: true }, ...options]
      : options

  return (
    <div className="ui-field">
      {label && (
        <label className="ui-field__label" htmlFor={sid}>
          {label}
          {required && (
            <span className="ui-field__required" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}
      <select
        id={sid}
        className={\`ui-field__input ui-field__select\${error ? ' ui-field__input--error' : ''}\`}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={
          error ? \`\${sid}-err\` : hint ? \`\${sid}-hint\` : undefined
        }
      >
        {mergedOptions.map((o) => (
          <option key={\`\${sid}-\${o.value}\`} value={o.value} disabled={o.disabled}>
            {o.label}
          </option>
        ))}
      </select>
      {hint && !error && (
        <p id={\`\${sid}-hint\`} className="ui-field__hint">
          {hint}
        </p>
      )}
      {error && (
        <p id={\`\${sid}-err\`} className="ui-field__error" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

// 스타일: TextField.css + Select.css
`

export const UI_KIT_CHECKBOX = `// src/components/ui/Checkbox.jsx
import { useId } from 'react'
import './Checkbox.css'

export default function Checkbox({
  id,
  label,
  checked,
  onChange,
  description,
  disabled,
}) {
  const uid = useId()
  const cid = id ?? \`ui-check-\${uid.replace(/:/g, '')}\`

  return (
    <div className="ui-check">
      <input
        id={cid}
        type="checkbox"
        className="ui-check__input"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <div className="ui-check__body">
        <label className="ui-check__label" htmlFor={cid}>
          {label}
        </label>
        {description ? <p className="ui-check__desc">{description}</p> : null}
      </div>
    </div>
  )
}

// 스타일: Checkbox.css
`

export const UI_KIT_RADIO = `// src/components/ui/RadioGroup.jsx
import { useId } from 'react'
import './RadioGroup.css'

/**
 * @param {{ value: string, label: string }[]} options
 * @param {(value: string) => void} onChange
 */
export default function RadioGroup({
  name,
  label,
  value,
  onChange,
  options,
  hint,
  error,
  disabled,
}) {
  const uid = useId()
  const groupName = name ?? \`ui-radio-\${uid.replace(/:/g, '')}\`
  const legendId = \`\${groupName}-legend\`
  const errId = \`\${groupName}-err\`
  const hintId = \`\${groupName}-hint\`

  return (
    <fieldset
      className={\`ui-radio-group\${error ? ' ui-radio-group--error' : ''}\`}
      disabled={disabled}
      aria-labelledby={label ? legendId : undefined}
      aria-describedby={
        [error ? errId : null, hint && !error ? hintId : null].filter(Boolean).join(' ') || undefined
      }
    >
      {label ? (
        <legend id={legendId} className="ui-radio-group__legend">
          {label}
        </legend>
      ) : null}
      <div className="ui-radio-group__options" role="presentation">
        {options.map((o) => {
          const rid = \`\${groupName}-\${o.value}\`
          return (
            <label key={o.value} className="ui-radio">
              <input
                type="radio"
                name={groupName}
                id={rid}
                value={o.value}
                checked={value === o.value}
                onChange={() => onChange?.(o.value)}
                disabled={disabled}
              />
              <span className="ui-radio__text">{o.label}</span>
            </label>
          )
        })}
      </div>
      {hint && !error ? (
        <p id={hintId} className="ui-radio-group__hint">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errId} className="ui-radio-group__error" role="alert">
          {error}
        </p>
      ) : null}
    </fieldset>
  )
}

// 스타일: RadioGroup.css
`

export const UI_KIT_MODAL = `// src/components/ui/Modal.jsx
import { useEffect } from 'react'
import './Modal.css'

export default function Modal({ open, title, onClose, children, footer }) {
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
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="ui-modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="ui-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ui-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="ui-modal__head">
          <h2 id="ui-modal-title" className="ui-modal__title">
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

// 스타일: src/components/ui/Modal.css
`

export const UI_KIT_TOAST = `// src/components/ui/useToasts.js — 훅만 분리 (Fast Refresh 호환)
import { useState, useCallback } from 'react'

function makeId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return \`\${Date.now()}-\${Math.random().toString(16).slice(2)}\`
}

export function useToasts() {
  const [toasts, setToasts] = useState([])
  const showToast = useCallback((message, duration = 2800) => {
    const id = makeId()
    setToasts((prev) => [...prev, { id, message }])
    if (duration > 0) {
      window.setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), duration)
    }
    return id
  }, [])
  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])
  return { toasts, showToast, dismissToast }
}

// src/components/ui/ToastHost.jsx — UI만
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

// 스타일: src/components/ui/ToastHost.css
`

export const UI_KIT_PAGE_EXAMPLE = `// 예: App.jsx 안에서
import { useState } from 'react'
import {
  Button,
  TextField,
  Select,
  Checkbox,
  RadioGroup,
  Modal,
  ToastHost,
  useToasts,
} from './components/ui'

export default function App() {
  const [name, setName] = useState('')
  const [plan, setPlan] = useState('')
  const [role, setRole] = useState('viewer')
  const [agree, setAgree] = useState(false)
  const [error, setError] = useState('')
  const [open, setOpen] = useState(false)
  const { toasts, showToast, dismissToast } = useToasts()

  return (
    <>
      <TextField
        label="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={error}
        hint="실명으로 입력해 주세요"
      />
      <Select
        label="플랜"
        value={plan}
        onChange={(e) => setPlan(e.target.value)}
        placeholder="선택하세요"
        options={[
          { value: 'basic', label: 'Basic' },
          { value: 'pro', label: 'Pro' },
        ]}
        hint="요금제는 언제든 변경할 수 있습니다."
      />
      <Checkbox
        label="약관에 동의합니다"
        description="필수입니다."
        checked={agree}
        onChange={(e) => setAgree(e.target.checked)}
      />
      <RadioGroup
        label="역할"
        value={role}
        onChange={setRole}
        options={[
          { value: 'viewer', label: '뷰어' },
          { value: 'editor', label: '에디터' },
        ]}
      />
      <Button
        variant="primary"
        onClick={() => {
          if (!name.trim()) {
            setError('이름을 입력해 주세요')
            showToast('입력을 확인해 주세요')
            return
          }
          setError('')
          showToast('저장되었습니다')
        }}
      >
        저장
      </Button>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        약관 보기
      </Button>

      <Modal open={open} title="약관" onClose={() => setOpen(false)}>
        <p>여기에 약관 내용이 들어갑니다.</p>
      </Modal>

      <ToastHost toasts={toasts} onDismiss={dismissToast} />
    </>
  )
}
`
