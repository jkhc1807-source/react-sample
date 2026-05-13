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
  const groupName = name ?? `ui-radio-${uid.replace(/:/g, '')}`
  const legendId = `${groupName}-legend`
  const errId = `${groupName}-err`
  const hintId = `${groupName}-hint`

  return (
    <fieldset
      className={`ui-radio-group${error ? ' ui-radio-group--error' : ''}`}
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
          const rid = `${groupName}-${o.value}`
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
