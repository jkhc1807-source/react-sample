import { useState } from 'react'

export default function CounterPinSection() {
  const [count, setCount] = useState(0)
  const [isPinned, setPinned] = useState(false)

  return (
    <div>
      <h2>Count: {count}</h2>
      <div className="playground-section__row">
        <button type="button" onClick={() => setCount((c) => c + 1)}>
          +
        </button>
        <button type="button" onClick={() => setCount((c) => c - 1)}>
          -
        </button>
      </div>
      <button type="button" onClick={() => setPinned((p) => !p)}>
        {isPinned && '📌'} 핀 토글
      </button>
    </div>
  )
}
