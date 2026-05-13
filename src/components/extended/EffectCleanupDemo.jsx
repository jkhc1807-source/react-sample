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
