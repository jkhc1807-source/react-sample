import { useState } from 'react'

const initial = { title: '', note: '' }

export default function FormCycleDemo() {
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(null)

  function validate(next) {
    const e = {}
    if (!next.title.trim()) e.title = '제목을 입력해 주세요.'
    else if (next.title.trim().length < 2) e.title = '제목은 2글자 이상이어야 합니다.'
    if (next.note.length > 120) e.note = '메모는 120자 이하로 적어 주세요.'
    return e
  }

  function handleChange(field) {
    return (ev) => {
      const next = { ...values, [field]: ev.target.value }
      setValues(next)
      setSubmitted(null)
      setErrors(validate(next))
    }
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    const e = validate(values)
    setErrors(e)
    if (Object.keys(e).length) return
    setSubmitted({ ...values })
  }

  function handleReset() {
    setValues(initial)
    setErrors({})
    setSubmitted(null)
  }

  return (
    <div className="extended-demo">
      <form className="extended-demo__form" onSubmit={handleSubmit} noValidate>
        <div className="extended-demo__field">
          <label htmlFor="ext-title">제목 (필수)</label>
          <input
            id="ext-title"
            name="title"
            value={values.title}
            onChange={handleChange('title')}
            autoComplete="off"
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? 'ext-title-err' : undefined}
          />
          {errors.title ? (
            <p id="ext-title-err" className="extended-demo__error" role="alert">
              {errors.title}
            </p>
          ) : null}
        </div>
        <div className="extended-demo__field">
          <label htmlFor="ext-note">메모</label>
          <textarea
            id="ext-note"
            name="note"
            value={values.note}
            onChange={handleChange('note')}
            rows={3}
            aria-invalid={Boolean(errors.note)}
            aria-describedby={errors.note ? 'ext-note-err' : undefined}
          />
          {errors.note ? (
            <p id="ext-note-err" className="extended-demo__error" role="alert">
              {errors.note}
            </p>
          ) : null}
        </div>
        <div className="extended-demo__actions">
          <button type="submit">제출</button>
          <button type="button" onClick={handleReset}>
            초기화
          </button>
        </div>
      </form>
      {submitted ? (
        <p className="extended-demo__ok">
          제출 완료: <strong>{submitted.title}</strong> — {submitted.note || '(메모 없음)'}
        </p>
      ) : null}
    </div>
  )
}
