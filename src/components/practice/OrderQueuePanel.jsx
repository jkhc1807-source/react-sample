import { useMemo, useState } from 'react'
import './OrderQueuePanel.css'

const STATUSES = ['접수', '배송중', '완료']

function createOrder(title) {
  return {
    id: crypto.randomUUID(),
    title,
    status: 0,
  }
}

/** 간단 주문 큐: 상태 전이 + filter + reduce로 집계 */
export default function OrderQueuePanel() {
  const [orders, setOrders] = useState(() => [
    createOrder('USB-C 케이블'),
    createOrder('모니터 암'),
    createOrder('키보드 청소용품'),
  ])
  const [filterIdx, setFilterIdx] = useState(-1)

  const counts = useMemo(
    () =>
      orders.reduce(
        (acc, o) => {
          acc[o.status] = (acc[o.status] ?? 0) + 1
          return acc
        },
        { 0: 0, 1: 0, 2: 0 },
      ),
    [orders],
  )

  const visible = useMemo(() => {
    if (filterIdx < 0) return orders
    return orders.filter((o) => o.status === filterIdx)
  }, [orders, filterIdx])

  function advance(id) {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: Math.min(2, o.status + 1) } : o)),
    )
  }

  function remove(id) {
    setOrders((prev) => prev.filter((o) => o.id !== id))
  }

  return (
    <div className="order-queue">
      <div className="order-queue__stats">
        {STATUSES.map((label, i) => (
          <button
            key={label}
            type="button"
            className={filterIdx === i ? 'order-queue__stat order-queue__stat--on' : 'order-queue__stat'}
            onClick={() => setFilterIdx((f) => (f === i ? -1 : i))}
          >
            {label} {counts[i] ?? 0}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="order-queue__add"
        onClick={() => setOrders((prev) => [...prev, createOrder(`추가 주문 ${prev.length + 1}`)])}
      >
        새 주문 넣기
      </button>
      <ul className="order-queue__list">
        {visible.map((o) => (
          <li key={o.id} className="order-queue__row">
            <div>
              <strong>{o.title}</strong>
              <span className="order-queue__pill">{STATUSES[o.status]}</span>
            </div>
            <div className="order-queue__actions">
              <button type="button" onClick={() => advance(o.id)} disabled={o.status >= 2}>
                다음 단계
              </button>
              <button type="button" className="order-queue__del" onClick={() => remove(o.id)}>
                삭제
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
