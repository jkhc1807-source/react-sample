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
  const sid = id ?? `ui-select-${uid.replace(/:/g, '')}`

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
        className={`ui-field__input ui-field__select${error ? ' ui-field__input--error' : ''}`}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={
          error ? `${sid}-err` : hint ? `${sid}-hint` : undefined
        }
      >
        {mergedOptions.map((o) => (
          <option key={`${sid}-${o.value}`} value={o.value} disabled={o.disabled}>
            {o.label}
          </option>
        ))}
      </select>
      {hint && !error && (
        <p id={`${sid}-hint`} className="ui-field__hint">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${sid}-err`} className="ui-field__error" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
