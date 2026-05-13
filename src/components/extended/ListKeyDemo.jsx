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
    setItems((prev) => [...prev, createItem(`항목 ${prev.length + 1}`)])
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
