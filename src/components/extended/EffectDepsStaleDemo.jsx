import { useEffect, useState } from 'react'

/** 의도적으로 []만 두어 클로저에 count가 갇히는 예시 — 고치려면 deps에 count를 넣거나 ref를 씁니다 */
export default function EffectDepsStaleDemo() {
  const [count, setCount] = useState(0)
  const [staleRead, setStaleRead] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setStaleRead(count)
    }, 800)
    return () => window.clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- 데모: count를 deps에 넣지 않아 오래된 값이 찍힙니다
  }, [])

  return (
    <div className="extended-demo">
      <p>
        실제 <code>count</code>: <strong>{count}</strong>
      </p>
      <p>
        인터벌이 읽는 값(고착): <strong>{staleRead}</strong>
      </p>
      <button type="button" onClick={() => setCount((c) => c + 1)}>
        count +1
      </button>
      <p className="extended-demo__hint">
        effect 의존성 배열에 <code>count</code>를 넣거나, 갱신할 값을 <code>useRef</code>로
        옮기면 인터벌과 동기화됩니다.
      </p>
    </div>
  )
}
