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

export const UI_KIT_BADGE = `// src/components/ui/Badge.jsx
import './Badge.css'

const VARIANT = {
  neutral: 'ui-badge--neutral',
  accent: 'ui-badge--accent',
  success: 'ui-badge--success',
  warning: 'ui-badge--warning',
  danger: 'ui-badge--danger',
}

export default function Badge({ children, variant = 'neutral', className = '' }) {
  const v = VARIANT[variant] || VARIANT.neutral
  return <span className={['ui-badge', v, className].filter(Boolean).join(' ')}>{children}</span>
}

// 스타일: src/components/ui/Badge.css
`

export const UI_KIT_SURFACE_CARD = `// src/components/ui/SurfaceCard.jsx
import './SurfaceCard.css'

export default function SurfaceCard({ title, subtitle, meta, children, footer }) {
  return (
    <article className="ui-surface-card">
      {(title || subtitle || meta) && (
        <header className="ui-surface-card__head">
          <div className="ui-surface-card__titles">
            {title ? <h3 className="ui-surface-card__title">{title}</h3> : null}
            {subtitle ? <p className="ui-surface-card__subtitle">{subtitle}</p> : null}
          </div>
          {meta ? <div className="ui-surface-card__meta">{meta}</div> : null}
        </header>
      )}
      {children ? <div className="ui-surface-card__body">{children}</div> : null}
      {footer ? <footer className="ui-surface-card__footer">{footer}</footer> : null}
    </article>
  )
}

// 스타일: src/components/ui/SurfaceCard.css
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
  readOnly,
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
        className={\`ui-field__input\${error ? ' ui-field__input--error' : ''}\${readOnly ? ' ui-field__input--readonly' : ''}\`}
        type={type}
        value={value}
        onChange={readOnly ? undefined : onChange}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
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

export const UI_KIT_TYPE_SCALE = `// Typography 스케일 마크업 (학습·문서 페이지에서 재사용)
// 스타일: src/pages/UiKitPage.css — .ui-kit__type-scale, .ui-kit__type-sample, .ui-kit__type-meta

<div className="ui-kit__type-scale">
  <p className="ui-kit__type-sample ui-kit__type-sample--h1">
    <span className="ui-kit__type-meta">Heading 1</span>
    The Life of UI Kit
  </p>
  <p className="ui-kit__type-sample ui-kit__type-sample--h2">
    <span className="ui-kit__type-meta">Heading 2</span>
    Section title
  </p>
  <p className="ui-kit__type-sample ui-kit__type-sample--body">
    <span className="ui-kit__type-meta">Body</span>
    본문 문단입니다. <code>code</code>는 인라인만.
  </p>
</div>
`

export const UI_KIT_INLINE_ALERTS = `import './UiKitInlineAlerts.css'

<div className="ui-kit__alerts">
  <div className="ui-kit__alert ui-kit__alert--info" role="status">
    <strong>Info</strong>
    새 기능이 배포되었습니다.
  </div>
  <div className="ui-kit__alert ui-kit__alert--success" role="status">
    <strong>Success</strong>
    저장이 완료되었습니다.
  </div>
  <div className="ui-kit__alert ui-kit__alert--warning" role="alert">
    <strong>Warning</strong>
    되돌릴 수 없는 작업입니다.
  </div>
  <div className="ui-kit__alert ui-kit__alert--danger" role="alert">
    <strong>Danger</strong>
    결제 수단을 갱신해 주세요.
  </div>
</div>
`

export const UI_KIT_TEXT_LINKS = `// 본문 링크 톤 (앵커·강조·비활성 느낌)
// 스타일: src/pages/UiKitPage.css — .ui-kit__link-row, .ui-kit__link, .ui-kit__link--default 등

<p className="ui-kit__link-row">
  <a href="#section" className="ui-kit__link ui-kit__link--default">
    기본 링크
  </a>
</p>
<p className="ui-kit__link-row">
  <a href="/playground" className="ui-kit__link ui-kit__link--accent">
    강조 링크
  </a>
</p>
<p className="ui-kit__link-row">
  <span className="ui-kit__link ui-kit__link--muted">보조·비활성 느낌 텍스트</span>
</p>
`

export const UI_KIT_TEXTFIELD_READONLY = `// 읽기 전용 — TextField 컴포넌트 (src/components/ui/TextField.jsx)
import TextField from './TextField'

<TextField
  label="username"
  value="yalco.student"
  readOnly
  hint="서버에서 내려준 값을 그대로 보여 줄 때"
/>

// 스타일: TextField.css (.ui-field__input--readonly) + 동일 파일의 :read-only
`

export const UI_KIT_COUNTER_PATTERN = `// 카운터 + output + 핀 토글 (샘플 모음 «카운터와 핀»)
import { useState } from 'react'
import { Button } from './components/ui'

export function CounterPinDemo() {
  const [count, setCount] = useState(0)
  const [pinned, setPinned] = useState(false)

  return (
    <div className="ui-kit__counter-block">
      <div className="ui-kit__counter" aria-label="카운터">
        <Button variant="secondary" size="sm" type="button" onClick={() => setCount((c) => c - 1)}>
          −
        </Button>
        <output className="ui-kit__counter-value">{count}</output>
        <Button variant="secondary" size="sm" type="button" onClick={() => setCount((c) => c + 1)}>
          +
        </Button>
      </div>
      <Button
        variant={pinned ? 'primary' : 'secondary'}
        size="sm"
        type="button"
        onClick={() => setPinned((p) => !p)}
      >
        {pinned ? '📌 ' : ''}핀 {pinned ? '해제' : '고정'}
      </Button>
    </div>
  )
}

// 스타일: src/pages/UiKitPage.css — .ui-kit__counter-block, .ui-kit__counter, .ui-kit__counter-value, #root .ui-kit__counter > button.ui-btn
`

export const UI_KIT_TODO_PATTERN = `// 할 일 목록 + 입력 (샘플 모음 TodoListSection 과 같은 구조)
import { useState, useEffect } from 'react'
import { Button, TextField } from './components/ui'

export function TodoDemo() {
  const [todos, setTodos] = useState(['Learn React'])
  const [newTodo, setNewTodo] = useState('')
  const [notice, setNotice] = useState(null)

  useEffect(() => {
    if (!notice) return
    const t = setTimeout(() => setNotice(null), 2500)
    return () => clearTimeout(t)
  }, [notice])

  function add() {
    const v = newTodo.trim()
    if (!v) {
      setNotice('내용을 입력해 주세요.')
      return
    }
    setTodos((prev) => [...prev, v])
    setNewTodo('')
  }

  return (
    <>
      <h3 className="ui-kit__todo-heading">Todo List</h3>
      <ul className="ui-kit__todo-list">
        {todos.map((todo, i) => (
          <li key={\`\${todo}-\${i}\`} className="ui-kit__todo-item">
            <span className="ui-kit__todo-text">{todo}</span>
            <Button variant="ghost" size="sm" type="button" onClick={() => setTodos((t) => t.filter((_, j) => j !== i))}>
              Delete
            </Button>
          </li>
        ))}
      </ul>
      <div className="ui-kit__todo-form">
        <TextField label="새 할 일" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder="할 일" />
        <Button variant="primary" type="button" onClick={add}>
          Add task
        </Button>
      </div>
      {notice && (
        <div className="ui-kit__todo-notice" role="status">
          {notice}
        </div>
      )}
    </>
  )
}

// 스타일: src/pages/UiKitPage.css — .ui-kit__todo-heading, .ui-kit__todo-list, .ui-kit__todo-item 등
`

export const UI_KIT_SURFACE_CARD_USAGE = `// SurfaceCard + Badge 조합 (그리드는 페이지 쪽)
import Badge from './Badge'
import SurfaceCard from './SurfaceCard'

<div className="ui-kit__card-grid">
  <SurfaceCard
    title="Props in React"
    subtitle="한 컴포넌트에서 다른 컴포넌트로 데이터를 넘깁니다."
    meta={<Badge variant="accent">Topic</Badge>}
    footer="Author: Alice"
  >
    카드 본문
  </SurfaceCard>
</div>

// 그리드 스타일: src/pages/UiKitPage.css — .ui-kit__card-grid
// 카드·뱃지 단일 컴포넌트 소스: SurfaceCard.jsx / Badge.jsx (+ 각 .css)
`
