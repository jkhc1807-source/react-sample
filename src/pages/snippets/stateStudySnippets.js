/** state 학습 페이지 — 복붙용 전체 예제 */

export const STATE_SNIPPET_1 = `// src/components/CounterDemo.jsx
import { useState } from 'react'

export default function CounterDemo() {
  const [count, setCount] = useState(0)

  return (
    <section>
      <p>count = {count}</p>
      <button type="button" onClick={() => setCount((c) => c + 1)}>
        +1 (함수형 업데이트)
      </button>
      <button type="button" onClick={() => setCount(0)}>
        리셋
      </button>
    </section>
  )
}
`

export const STATE_SNIPPET_2 = `// src/components/UserObjectDemo.jsx
import { useState } from 'react'

export default function UserObjectDemo() {
  const [user, setUser] = useState({ name: 'Kim', role: 'guest' })

  return (
    <section>
      <p>
        {user.name} / {user.role}
      </p>
      <button
        type="button"
        onClick={() =>
          setUser((u) => ({
            ...u,
            name: u.name === 'Kim' ? 'Lee' : 'Kim',
          }))
        }
      >
        이름 토글 (스프레드로 불변 갱신)
      </button>
    </section>
  )
}
`

export const STATE_SNIPPET_3 = `// src/components/FruitListDemo.jsx
import { useState } from 'react'

export default function FruitListDemo() {
  const [items, setItems] = useState(['사과', '바나나'])

  return (
    <section>
      <ul>
        {items.map((x, i) => (
          <li key={\`\${x}-\${i}\`}>{x}</li>
        ))}
      </ul>
      <button type="button" onClick={() => setItems((prev) => [...prev, '오렌지'])}>
        오렌지 추가
      </button>
    </section>
  )
}
`

export const STATE_SNIPPET_4 = `// src/components/IdListRemoveDemo.jsx
import { useState } from 'react'

export default function IdListRemoveDemo() {
  const [ids, setIds] = useState(['a', 'b', 'c'])

  return (
    <section>
      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {ids.map((id) => (
          <li key={id}>
            <button type="button" onClick={() => setIds((prev) => prev.filter((x) => x !== id))}>
              {id} 삭제
            </button>
          </li>
        ))}
      </ul>
      {ids.length === 0 && <p>비었습니다.</p>}
    </section>
  )
}
`

export const STATE_SNIPPET_5 = `// src/components/TaskToggleDemo.jsx
import { useState } from 'react'

export default function TaskToggleDemo() {
  const [tasks, setTasks] = useState([
    { id: 1, text: '공부', done: false },
    { id: 2, text: '운동', done: true },
  ])

  return (
    <section>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map((t) => (
          <li key={t.id} style={{ marginBottom: '0.35rem' }}>
            <button
              type="button"
              onClick={() =>
                setTasks((prev) =>
                  prev.map((x) => (x.id === t.id ? { ...x, done: !x.done } : x))
                )
              }
            >
              {t.done ? '✓ ' : ''}
              {t.text}
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
`

export const STATE_SNIPPET_6 = `// src/components/SplitAndFormDemo.jsx
import { useState } from 'react'

export default function SplitAndFormDemo() {
  const [name, setName] = useState('')
  const [age, setAge] = useState(0)
  const [form, setForm] = useState({ title: '', body: '' })

  return (
    <div>
      <section style={{ marginBottom: '1.5rem' }}>
        <h3>별도 state (서로 독립)</h3>
        <label>
          name
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          age
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(Number(e.target.value) || 0)}
          />
        </label>
        <p>
          → {name || '(이름 없음)'}, age {age}
        </p>
      </section>

      <section>
        <h3>객체 하나로 묶은 폼</h3>
        <label>
          title
          <input
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          />
        </label>
        <label>
          body
          <input
            value={form.body}
            onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
          />
        </label>
        <p>
          → title: {form.title || '—'} / body: {form.body || '—'}
        </p>
      </section>
    </div>
  )
}
`

export const STATE_SNIPPET_7 = `import { useState } from 'react'

// 초기값 계산이 무거우면 함수로 넘겨 "첫 렌더 때 한 번만" 실행됩니다
function readCount() {
  const raw = localStorage.getItem('count')
  return raw ? Number(raw) : 0
}

export default function LazyInitDemo() {
  const [count, setCount] = useState(() => readCount())
  return <button type="button" onClick={() => setCount((c) => c + 1)}>{count}</button>
}
`

export const STATE_SNIPPET_8 = `import { useState } from 'react'

// 같은 값을 토글할 때도 함수형 업데이트가 안전합니다
export default function ToggleDemo() {
  const [open, setOpen] = useState(false)
  return (
    <button type="button" onClick={() => setOpen((v) => !v)}>
      {open ? '닫기' : '열기'}
    </button>
  )
}
`
