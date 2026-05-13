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
  const cid = id ?? `ui-check-${uid.replace(/:/g, '')}`

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
