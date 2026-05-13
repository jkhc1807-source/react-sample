import { useId, useState } from 'react'

export default function A11yFieldsetDemo() {
  const id = useId()
  const [plan, setPlan] = useState('basic')
  const [agree, setAgree] = useState(false)

  return (
    <div className="extended-demo">
      <fieldset className="extended-demo__fieldset">
        <legend>플랜 선택</legend>
        <div className="extended-demo__radio-row">
          <input
            type="radio"
            id={`${id}-basic`}
            name={`${id}-plan`}
            checked={plan === 'basic'}
            onChange={() => setPlan('basic')}
          />
          <label htmlFor={`${id}-basic`}>Basic</label>
        </div>
        <div className="extended-demo__radio-row">
          <input
            type="radio"
            id={`${id}-pro`}
            name={`${id}-plan`}
            checked={plan === 'pro'}
            onChange={() => setPlan('pro')}
          />
          <label htmlFor={`${id}-pro`}>Pro</label>
        </div>
      </fieldset>
      <div className="extended-demo__checkbox">
        <input
          type="checkbox"
          id={`${id}-agree`}
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
        />
        <label htmlFor={`${id}-agree`}>약관에 동의합니다</label>
      </div>
      <p className="extended-demo__muted" aria-live="polite">
        선택: {plan} / 동의: {agree ? '예' : '아니오'}
      </p>
    </div>
  )
}
