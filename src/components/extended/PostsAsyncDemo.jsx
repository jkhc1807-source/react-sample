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
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
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
