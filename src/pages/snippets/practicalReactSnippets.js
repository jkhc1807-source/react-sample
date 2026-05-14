/** 실무 패턴 학습 — 복붙용 전체 예제 (퍼블리셔·초보용) */

export const PRACT_EVENT = `// src/components/EventBasicsDemo.jsx
import { useState } from 'react'
import './EventBasicsDemo.css'

export default function EventBasicsDemo() {
  const [clicks, setClicks] = useState(0)
  const [message, setMessage] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    window.alert(\`보낸 내용: \${message}\`)
  }

  return (
    <section>
      <p className="event-basics-demo__toolbar">
        <button type="button" onClick={() => setClicks((c) => c + 1)}>
          +
        </button>
        <span>클릭: {clicks}</span>
        <button
          type="button"
          onClick={() => setClicks((c) => Math.max(0, c - 1))}
          disabled={clicks <= 0}
        >
          −
        </button>
      </p>
      <form onSubmit={handleSubmit}>
        <label>
          메모{' '}
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="타이핑해 보세요"
          />
        </label>
        <button type="submit">전송 (새로고침 막기)</button>
      </form>
    </section>
  )
}
`

export const PRACT_CONDITIONAL = `// src/components/TogglePanelDemo.jsx
import { useState } from 'react'

export default function TogglePanelDemo() {
  const [open, setOpen] = useState(false)

  return (
    <section>
      <button type="button" onClick={() => setOpen((v) => !v)}>
        패널 {open ? '닫기' : '열기'}
      </button>

      {/* && : 왼쪽이 true일 때만 오른쪽을 그립니다 */}
      {open && <p>열렸을 때만 보입니다.</p>}

      {/* 삼항 연산자 : 조건 ? 참일때 : 거짓일때 */}
      <p>{open ? '상태: 열림' : '상태: 닫힘'}</p>
    </section>
  )
}
`

export const PRACT_EFFECT = `// src/components/TimerEffectDemo.jsx
import { useState, useEffect } from 'react'

export default function TimerEffectDemo() {
  const [sec, setSec] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setSec((s) => s + 1)
    }, 1000)

    // 컴포넌트가 사라질 때 타이머를 꼭 정리합니다 (메모리 누수 방지)
    return () => window.clearInterval(id)
  }, [])

  return (
    <section>
      <p>경과 초: {sec}</p>
      <button type="button" onClick={() => setSec(0)}>
        리셋
      </button>
    </section>
  )
}
`

export const PRACT_FETCH = `// src/components/PostFetchDemo.jsx
import { useState } from 'react'
import './PostFetchDemo.css'

export default function PostFetchDemo() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [posts, setPosts] = useState([])
  const [fetchDone, setFetchDone] = useState(false)

  async function loadPosts() {
    setLoading(true)
    setFetchDone(false)
    setError(null)
    try {
      const res = await fetch(
        'https://jsonplaceholder.typicode.com/posts?_limit=4'
      )
      if (!res.ok) throw new Error('서버 응답이 올바르지 않아요')
      setPosts(await res.json())
      setFetchDone(true)
    } catch (e) {
      setError(e instanceof Error ? e.message : '알 수 없는 오류')
      setFetchDone(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section>
      <button type="button" onClick={loadPosts} disabled={loading}>
        {loading ? '불러오는 중…' : fetchDone && !error ? '불러오기 완료' : '글 불러오기'}
      </button>
      {error && <p className="post-fetch-demo__error">{error}</p>}
      <ul>
        {posts.map((p) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>
    </section>
  )
}
`

export const PRACT_PROPS = `// src/components/PropsCardDemo.jsx
import './PropsCardDemo.css'

function Card({ title, children }) {
  return (
    <article className="props-card-demo__card">
      <h3 className="props-card-demo__title">{title}</h3>
      <div>{children}</div>
    </article>
  )
}

export default function PropsCardDemo() {
  return (
    <section className="props-card-demo__stack">
      <Card title="공지">
        <p className="props-card-demo__body-text">부모가 넣은 내용이 children 으로 들어갑니다.</p>
      </Card>
      <Card title="이벤트">
        <button type="button">버튼도 children 안에 둘 수 있어요</button>
      </Card>
    </section>
  )
}
`

export const PRACT_REF = `// src/components/FocusInputRefDemo.jsx
import { useRef } from 'react'

export default function FocusInputRefDemo() {
  const inputRef = useRef(null)

  return (
    <section>
      <input ref={inputRef} type="text" placeholder="여기로 포커스" />
      <button type="button" onClick={() => inputRef.current?.focus()}>
        입력칸으로 포커스 이동
      </button>
    </section>
  )
}
`
