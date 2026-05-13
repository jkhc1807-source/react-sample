/** 심화 학습 페이지 — 복붙용 (일부는 여러 파일을 이어 붙였습니다) */

export const EXT_FORM = `// src/components/extended/FormCycleDemo.jsx
import { useState } from 'react'

const initial = { title: '', note: '' }

export default function FormCycleDemo() {
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(null)

  function validate(next) {
    const e = {}
    if (!next.title.trim()) e.title = '제목을 입력해 주세요.'
    else if (next.title.trim().length < 2) e.title = '제목은 2글자 이상이어야 합니다.'
    if (next.note.length > 120) e.note = '메모는 120자 이하로 적어 주세요.'
    return e
  }

  function handleChange(field) {
    return (ev) => {
      const next = { ...values, [field]: ev.target.value }
      setValues(next)
      setSubmitted(null)
      setErrors(validate(next))
    }
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    const e = validate(values)
    setErrors(e)
    if (Object.keys(e).length) return
    setSubmitted({ ...values })
  }

  function handleReset() {
    setValues(initial)
    setErrors({})
    setSubmitted(null)
  }

  return (
    <div className="extended-demo">
      <form className="extended-demo__form" onSubmit={handleSubmit} noValidate>
        <div className="extended-demo__field">
          <label htmlFor="ext-title">제목 (필수)</label>
          <input
            id="ext-title"
            name="title"
            value={values.title}
            onChange={handleChange('title')}
            autoComplete="off"
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? 'ext-title-err' : undefined}
          />
          {errors.title ? (
            <p id="ext-title-err" className="extended-demo__error" role="alert">
              {errors.title}
            </p>
          ) : null}
        </div>
        <div className="extended-demo__field">
          <label htmlFor="ext-note">메모</label>
          <textarea
            id="ext-note"
            name="note"
            value={values.note}
            onChange={handleChange('note')}
            rows={3}
            aria-invalid={Boolean(errors.note)}
            aria-describedby={errors.note ? 'ext-note-err' : undefined}
          />
          {errors.note ? (
            <p id="ext-note-err" className="extended-demo__error" role="alert">
              {errors.note}
            </p>
          ) : null}
        </div>
        <div className="extended-demo__actions">
          <button type="submit">제출</button>
          <button type="button" onClick={handleReset}>
            초기화
          </button>
        </div>
      </form>
      {submitted ? (
        <p className="extended-demo__ok">
          제출 완료: <strong>{submitted.title}</strong> — {submitted.note || '(메모 없음)'}
        </p>
      ) : null}
    </div>
  )
}
`

export const EXT_LIST = `// src/components/extended/ListKeyDemo.jsx
import { useState } from 'react'

function createItem(label) {
  return { id: crypto.randomUUID(), label }
}

export default function ListKeyDemo() {
  const [items, setItems] = useState(() => [
    createItem('첫 항목'),
    createItem('둘째 항목'),
  ])

  function add() {
    setItems((prev) => [...prev, createItem(\`항목 \${prev.length + 1}\`)])
  }

  function remove(id) {
    setItems((prev) => prev.filter((x) => x.id !== id))
  }

  function move(id, dir) {
    setItems((prev) => {
      const i = prev.findIndex((x) => x.id === id)
      if (i < 0) return prev
      const j = i + dir
      if (j < 0 || j >= prev.length) return prev
      const next = [...prev]
      ;[next[i], next[j]] = [next[j], next[i]]
      return next
    })
  }

  return (
    <div className="extended-demo">
      <p className="extended-demo__hint">
        <code>key</code>는 배열 인덱스가 아니라 안정적인 <code>id</code>를 쓰는 편이 안전합니다.
      </p>
      <ul className="extended-demo__list">
        {items.map((item) => (
          <li key={item.id} className="extended-demo__list-row">
            <span>{item.label}</span>
            <span className="extended-demo__mono">id: {item.id.slice(0, 8)}…</span>
            <span className="extended-demo__list-actions">
              <button type="button" onClick={() => move(item.id, -1)} aria-label="위로">
                ↑
              </button>
              <button type="button" onClick={() => move(item.id, 1)} aria-label="아래로">
                ↓
              </button>
              <button type="button" onClick={() => remove(item.id)}>
                삭제
              </button>
            </span>
          </li>
        ))}
      </ul>
      <button type="button" onClick={add}>
        항목 추가
      </button>
    </div>
  )
}
`

export const EXT_EFFECT_CLEANUP = `// src/components/extended/EffectCleanupDemo.jsx
import { useEffect, useRef, useState } from 'react'

export default function EffectCleanupDemo() {
  const [ticks, setTicks] = useState(0)
  const [posts, setPosts] = useState(null)
  const [fetchStatus, setFetchStatus] = useState('idle')
  const abortRef = useRef(null)

  useEffect(() => {
    const id = window.setInterval(() => setTicks((t) => t + 1), 1000)
    return () => window.clearInterval(id)
  }, [])

  async function loadPosts() {
    abortRef.current?.abort()
    const ac = new AbortController()
    abortRef.current = ac
    setFetchStatus('loading')
    setPosts(null)
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3', {
        signal: ac.signal,
      })
      if (!res.ok) throw new Error(String(res.status))
      const data = await res.json()
      setPosts(data)
      setFetchStatus('done')
    } catch (e) {
      if (e.name === 'AbortError') {
        setFetchStatus('aborted')
        return
      }
      setFetchStatus('error')
    }
  }

  function cancelFetch() {
    abortRef.current?.abort()
  }

  return (
    <div className="extended-demo">
      <p>
        인터벌 카운트: <strong>{ticks}</strong> (언마운트 시 정리되어 멈춥니다)
      </p>
      <div className="extended-demo__row">
        <button type="button" onClick={loadPosts} disabled={fetchStatus === 'loading'}>
          글 목록 불러오기
        </button>
        <button type="button" onClick={cancelFetch}>
          요청 취소
        </button>
      </div>
      <p className="extended-demo__muted">fetch 상태: {fetchStatus}</p>
      {posts?.length ? (
        <ul className="extended-demo__list">
          {posts.map((p) => (
            <li key={p.id}>
              #{p.id} {p.title}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
`

export const EXT_POSTS = `// src/components/extended/PostsAsyncDemo.jsx
import { useState } from 'react'

const OK_URL = 'https://jsonplaceholder.typicode.com/posts?_limit=4'
const BAD_URL = 'https://jsonplaceholder.typicode.com/not-a-real-path'

export default function PostsAsyncDemo() {
  const [phase, setPhase] = useState('idle')
  const [posts, setPosts] = useState([])
  const [message, setMessage] = useState('')

  async function run(url) {
    setPhase('loading')
    setMessage('')
    setPosts([])
    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error(\`HTTP \${res.status}\`)
      const data = await res.json()
      setPosts(Array.isArray(data) ? data : [])
      setPhase('success')
    } catch (e) {
      setMessage(e.message || '요청 실패')
      setPhase('error')
    }
  }

  function showEmpty() {
    setPhase('success')
    setPosts([])
    setMessage('의도적으로 빈 목록입니다.')
  }

  return (
    <div className="extended-demo">
      <div className="extended-demo__row extended-demo__row--wrap">
        <button type="button" onClick={() => run(OK_URL)} disabled={phase === 'loading'}>
          성공 불러오기
        </button>
        <button type="button" onClick={() => run(BAD_URL)} disabled={phase === 'loading'}>
          실패 시뮬
        </button>
        <button type="button" onClick={showEmpty}>
          빈 목록
        </button>
      </div>
      {phase === 'loading' ? <p aria-live="polite">로딩 중…</p> : null}
      {phase === 'error' ? (
        <p className="extended-demo__error" role="alert">
          {message}
        </p>
      ) : null}
      {phase === 'success' && posts.length === 0 ? (
        <p className="extended-demo__muted">{message || '표시할 글이 없습니다.'}</p>
      ) : null}
      {posts.length > 0 ? (
        <ul className="extended-demo__list">
          {posts.map((p) => (
            <li key={p.id}>{p.title}</li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
`

export const EXT_ERROR = `// src/components/ErrorBoundary.jsx
import { Component } from 'react'

export default class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <p role="alert">문제가 발생했습니다.</p>
    }
    return this.props.children
  }
}

// src/components/extended/ErrorBoundaryTriggerDemo.jsx
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

// 사용 예: 경계를 key로 리마운트해야 "다시 시도"가 가능합니다
/*
const [errKey, setErrKey] = useState(0)

<ErrorBoundary
  key={errKey}
  fallback={
    <div>
      <p role="alert">자식에서 오류가 났습니다.</p>
      <button type="button" onClick={() => setErrKey((k) => k + 1)}>다시 시도</button>
    </div>
  }
>
  <ErrorBoundaryTriggerDemo />
</ErrorBoundary>
*/
`

export const EXT_HOOK = `// src/hooks/useToggle.js
import { useCallback, useState } from 'react'

export function useToggle(initial = false) {
  const [on, setOn] = useState(Boolean(initial))
  const toggle = useCallback(() => setOn((v) => !v), [])
  const setTrue = useCallback(() => setOn(true), [])
  const setFalse = useCallback(() => setOn(false), [])
  return { on, toggle, setTrue, setFalse }
}

// src/components/extended/CustomHookToggleDemo.jsx
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
      <p className="extended-demo__muted">
        로직은 <code>useToggle</code> 훅에, 버튼은 이 컴포넌트에 둔 예시입니다.
      </p>
    </div>
  )
}
`

export const EXT_A11Y = `// src/components/extended/A11yFieldsetDemo.jsx
import { useId, useState } from 'react'

export default function A11yFieldsetDemo() {
  const id = useId()
  const [plan, setPlan] = useState('basic')
  const [agree, setAgree] = useState(false)

  return (
    <div className="extended-demo">
      <fieldset className="extended-demo__fieldset">
        <legend>플랜 선택</legend>
        <div className="extended-demo__radio-row">
          <input
            type="radio"
            id={\`\${id}-basic\`}
            name={\`\${id}-plan\`}
            checked={plan === 'basic'}
            onChange={() => setPlan('basic')}
          />
          <label htmlFor={\`\${id}-basic\`}>Basic</label>
        </div>
        <div className="extended-demo__radio-row">
          <input
            type="radio"
            id={\`\${id}-pro\`}
            name={\`\${id}-plan\`}
            checked={plan === 'pro'}
            onChange={() => setPlan('pro')}
          />
          <label htmlFor={\`\${id}-pro\`}>Pro</label>
        </div>
      </fieldset>
      <div className="extended-demo__checkbox">
        <input
          type="checkbox"
          id={\`\${id}-agree\`}
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
        />
        <label htmlFor={\`\${id}-agree\`}>약관에 동의합니다</label>
      </div>
      <p className="extended-demo__muted" aria-live="polite">
        선택: {plan} / 동의: {agree ? '예' : '아니오'}
      </p>
    </div>
  )
}
`

export const EXT_DEPS_STALE = `// src/components/extended/EffectDepsStaleDemo.jsx
import { useEffect, useState } from 'react'

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
`
