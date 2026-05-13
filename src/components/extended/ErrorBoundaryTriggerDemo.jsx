import { useState } from 'react'

export default function ErrorBoundaryTriggerDemo() {
  const [boom, setBoom] = useState(false)
  if (boom) throw new Error('데모용 일부러 발생한 오류')
  return (
    <div className="extended-demo">
      <button type="button" onClick={() => setBoom(true)}>
        렌더 중 에러 내기
      </button>
    </div>
  )
}
