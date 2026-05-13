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
  const inputId = id ?? `ui-field-${uid.replace(/:/g, '')}`

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
        className={`ui-field__input${error ? ' ui-field__input--error' : ''}`}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${inputId}-err` : hint ? `${inputId}-hint` : undefined}
      />
      {hint && !error && (
        <p id={`${inputId}-hint`} className="ui-field__hint">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${inputId}-err`} className="ui-field__error" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
