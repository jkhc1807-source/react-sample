import { useState } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js'
import './PracticeOrbitDotsDemo.css'

export default function PracticeOrbitDotsDemo() {
  const reduceMotion = usePrefersReducedMotion()
  const [orbitOn, setOrbitOn] = useState(true)

  return (
    <div className="pr-orbit">
      <div className={`pr-orbit__dots${orbitOn && !reduceMotion ? ' pr-orbit__dots--on' : ''}`}>
        <span className="pr-orbit__dot" />
        <span className="pr-orbit__dot" />
        <span className="pr-orbit__dot" />
      </div>
      <button
        type="button"
        className="pr-orbit__toggle"
        aria-pressed={orbitOn}
        onClick={() => setOrbitOn((v) => !v)}
      >
        {orbitOn ? '애니 끄기' : '애니 켜기'}
      </button>
      <p className="pr-orbit__hint">
        CSS <code>@keyframes</code>와 클래스 토글로 반복 모션을 켜고 끕니다.
      </p>
    </div>
  )
}
