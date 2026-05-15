import { useState } from 'react'
import './PracticeFilterChipsDemo.css'

const FILTERS = [
  { id: 'all', label: '전체' },
  { id: 'draft', label: '초안' },
  { id: 'pub', label: '게시됨' },
]

export default function PracticeFilterChipsDemo() {
  const [active, setActive] = useState('all')

  return (
    <div className="pr-chips">
      <div className="pr-chips__row" role="group" aria-label="문서 상태 필터">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            className={`pr-chips__chip${active === f.id ? ' pr-chips__chip--active' : ''}`}
            aria-pressed={active === f.id}
            onClick={() => setActive(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>
      <p className="pr-chips__readout" aria-live="polite">
        선택: <strong>{FILTERS.find((x) => x.id === active)?.label}</strong> — 실제 목록은{' '}
        <code>filter</code>로 이 값에 맞춥니다.
      </p>
    </div>
  )
}
