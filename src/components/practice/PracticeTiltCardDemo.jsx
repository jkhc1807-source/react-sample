import { useCallback, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js'
import './PracticeTiltCardDemo.css'

export default function PracticeTiltCardDemo() {
  const reduceMotion = usePrefersReducedMotion()
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })

  const onCardMove = useCallback(
    (e) => {
      if (reduceMotion) return
      const el = cardRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const nx = (e.clientX - r.left) / r.width - 0.5
      const ny = (e.clientY - r.top) / r.height - 0.5
      setTilt({ rx: ny * -14, ry: nx * 16 })
    },
    [reduceMotion],
  )

  const resetTilt = useCallback(() => {
    setTilt({ rx: 0, ry: 0 })
  }, [])

  const cardStyle = reduceMotion
    ? undefined
    : {
        transform: `perspective(880px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
      }

  return (
    <div className="pr-tilt">
      <div
        ref={cardRef}
        className="pr-tilt__wrap"
        onMouseMove={onCardMove}
        onMouseLeave={resetTilt}
      >
        <div className="pr-tilt__glow" aria-hidden="true" />
        <div className="pr-tilt__card" style={cardStyle}>
          <p className="pr-tilt__kicker">포인터 기반</p>
          <p className="pr-tilt__title">마우스에 반응하는 카드</p>
          <p className="pr-tilt__desc">
            <code>onMouseMove</code>로 카드 안 상대 좌표를 구한 뒤, <code>rotateX</code>·
            <code>rotateY</code>만 state에 넣습니다.
          </p>
        </div>
      </div>
    </div>
  )
}
