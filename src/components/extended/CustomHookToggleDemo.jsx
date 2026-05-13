import { useToggle } from '../../hooks/useToggle.js'

export default function CustomHookToggleDemo() {
  const { on, toggle, setTrue, setFalse } = useToggle(false)

  return (
    <div className="extended-demo">
      <p>
        패널 상태: <strong>{on ? '열림' : '닫힘'}</strong>
      </p>
      <div className="extended-demo__row">
        <button type="button" onClick={toggle}>
          토글
        </button>
        <button type="button" onClick={setTrue}>
          열기
        </button>
        <button type="button" onClick={setFalse}>
          닫기
        </button>
      </div>
      <p className="extended-demo__muted">로직은 <code>useToggle</code> 훅에, 버튼은 이 컴포넌트에 둔 예시입니다.</p>
    </div>
  )
}
