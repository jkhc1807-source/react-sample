export default function UsernameReadonlyField() {
  const disableInput = false

  return (
    <div>
      <label htmlFor="username" className="playground-label">
        username:
      </label>
      <input
        type="text"
        id="username"
        name="username"
        disabled={disableInput}
        className="playground-input"
        autoComplete="off"
        maxLength={10}
        spellCheck={false}
        readOnly
        tabIndex={0}
        placeholder={disableInput ? '입력할 수 없습니다.' : 'Enter your username'}
      />
    </div>
  )
}
