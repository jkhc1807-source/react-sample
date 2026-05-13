import { useEffect, useMemo, useRef, useState } from 'react'
import { useDebouncedValue } from '../../hooks/useDebouncedValue.js'
import './PostExplorerPanel.css'

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts?_limit=80'

/**
 * 실무에 가까운 예: 한 번(또는 다시 불러오기)으로 목록을 받아 두고,
 * 검색어는 디바운스 후 클라이언트에서 filter.
 * 재요청 시 AbortController로 이전 fetch를 끊습니다.
 */
export default function PostExplorerPanel() {
  const [rawQuery, setRawQuery] = useState('')
  const query = useDebouncedValue(rawQuery.trim(), 400)
  const [userId, setUserId] = useState('all')
  const [items, setItems] = useState([])
  const [phase, setPhase] = useState('loading')
  const [message, setMessage] = useState('')
  const abortRef = useRef(null)

  function attachAbort() {
    abortRef.current?.abort()
    const ac = new AbortController()
    abortRef.current = ac
    return ac.signal
  }

  useEffect(() => {
    const signal = attachAbort()
    fetch(POSTS_URL, { signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => {
        setItems(Array.isArray(data) ? data : [])
        setPhase('ready')
        setMessage('')
      })
      .catch((e) => {
        if (e.name === 'AbortError') return
        setMessage(e instanceof Error ? e.message : '오류')
        setPhase('error')
      })
    return () => abortRef.current?.abort()
  }, [])

  async function load() {
    const signal = attachAbort()
    setPhase('loading')
    setMessage('')
    try {
      const res = await fetch(POSTS_URL, { signal })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setItems(Array.isArray(data) ? data : [])
      setPhase('ready')
    } catch (e) {
      if (e.name === 'AbortError') return
      setMessage(e instanceof Error ? e.message : '오류')
      setPhase('error')
    }
  }

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return items.filter((p) => {
      if (userId !== 'all' && p.userId !== Number(userId)) return false
      if (!q) return true
      return String(p.title).toLowerCase().includes(q) || String(p.body).toLowerCase().includes(q)
    })
  }, [items, query, userId])

  const stats = useMemo(() => ({ count: filtered.length }), [filtered])

  return (
    <div className="post-explorer">
      <div className="post-explorer__toolbar">
        <button type="button" className="post-explorer__btn" onClick={load} disabled={phase === 'loading'}>
          {phase === 'loading' ? '불러오는 중…' : '목록 다시 받기'}
        </button>
        <label className="post-explorer__field">
          작성자 userId
          <select
            className="post-explorer__select"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          >
            <option value="all">전체</option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
        <label className="post-explorer__field post-explorer__field--grow">
          제목·본문 검색 (400ms 디바운스 후 반영)
          <input
            className="post-explorer__input"
            value={rawQuery}
            onChange={(e) => setRawQuery(e.target.value)}
            placeholder="예: quia"
            autoComplete="off"
            spellCheck={false}
          />
        </label>
      </div>
      <p className="post-explorer__meta" aria-live="polite">
        전체 {items.length}건 중 표시 <strong>{stats.count}</strong>건 · 적용된 검색어:{' '}
        <code>{query || '(없음)'}</code>
      </p>
      {phase === 'error' ? (
        <p className="post-explorer__err" role="alert">
          {message}
        </p>
      ) : null}
      {phase === 'ready' && stats.count === 0 ? (
        <p className="post-explorer__empty">조건에 맞는 글이 없습니다. 검색어나 작성자를 바꿔 보세요.</p>
      ) : null}
      <ul className="post-explorer__list">
        {filtered.slice(0, 40).map((p) => (
          <li key={p.id} className="post-explorer__item">
            <span className="post-explorer__badge">user {p.userId}</span>
            <span className="post-explorer__title">{p.title}</span>
          </li>
        ))}
      </ul>
      {filtered.length > 40 ? (
        <p className="post-explorer__note">화면 부하를 위해 상위 40건만 표시합니다. filter·slice로 잘라 쓰는 패턴입니다.</p>
      ) : null}
    </div>
  )
}
