import { useState } from 'react'
import './PracticeInlineFieldDemo.css'

export default function PracticeInlineFieldDemo() {
  const [value, setValue] = useState('')
  const [touched, setTouched] = useState(false)
  const tooShort = touched && value.length > 0 && value.length < 3

  return (
    <div className="pr-field">
      <label className="pr-field__label" htmlFor="pr-field-nick">
        닉네임 (3자 이상)
      </label>
      <input
        id="pr-field-nick"
        className={`pr-field__input${tooShort ? ' pr-field__input--invalid' : ''}`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => setTouched(true)}
        autoComplete="off"
      />
      {tooShort ? (
        <p className="pr-field__error" role="alert">
          3자 이상 입력해 주세요.
        </p>
      ) : null}
    </div>
  )
}
