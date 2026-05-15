import { useEffect, useState } from 'react'
import { fetchAdminFaq, saveAdminFaq } from '../../api/adminClient.js'
import './AdminTipsEditor.css'

const emptyItem = () => ({ question: '', answer: '' })

export default function AdminFaqEditor() {
  const [items, setItems] = useState([emptyItem()])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [savedAt, setSavedAt] = useState(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        setLoading(true)
        const list = await fetchAdminFaq()
        if (cancelled) return
        setItems(list.length ? list.map((x) => ({ ...x })) : [emptyItem()])
      } catch {
        if (!cancelled) setError('FAQ 목록을 불러오지 못했습니다.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  function update(index, field, value) {
    setItems((prev) => prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)))
  }

  async function handleSave(e) {
    e.preventDefault()
    const trimmed = items
      .map((item) => ({
        question: item.question.trim(),
        answer: item.answer.trim(),
      }))
      .filter((item) => item.question && item.answer)
    if (trimmed.length === 0) {
      setError('질문·답변이 있는 항목이 최소 1개 필요합니다.')
      return
    }
    try {
      setSaving(true)
      setError('')
      const saved = await saveAdminFaq(trimmed)
      setItems(saved.map((x) => ({ ...x })))
      setSavedAt(new Date())
    } catch {
      setError('저장에 실패했습니다.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className="admin-tips__status">FAQ 불러오는 중…</p>

  return (
    <form className="admin-tips" onSubmit={handleSave}>
      {error ? (
        <p className="admin-tips__error" role="alert">
          {error}
        </p>
      ) : null}
      {savedAt ? (
        <p className="admin-tips__ok" role="status">
          저장됨 — /faq 페이지에 반영됩니다.
        </p>
      ) : null}

      <section className="admin-tips__section" aria-labelledby="admin-faq-heading">
        <div className="admin-tips__section-head">
          <h2 id="admin-faq-heading" className="admin-tips__heading">
            FAQ 페이지 · 아코디언
          </h2>
          <p className="admin-tips__hint">자주 묻는 질문 본문과 검색용 JSON-LD에 쓰입니다.</p>
        </div>
        <ul className="admin-tips__list">
          {items.map((item, i) => (
            <li key={`faq-${i}`} className="admin-tips__row admin-tips__row--faq">
              <span className="admin-tips__label">#{i + 1}</span>
              <div className="admin-tips__faq-fields">
                <input
                  className="admin-tips__input admin-tips__input--single"
                  placeholder="질문"
                  maxLength={300}
                  value={item.question}
                  onChange={(e) => update(i, 'question', e.target.value)}
                />
                <textarea
                  className="admin-tips__input"
                  rows={3}
                  placeholder="답변"
                  maxLength={2000}
                  value={item.answer}
                  onChange={(e) => update(i, 'answer', e.target.value)}
                />
              </div>
              <button
                type="button"
                className="admin-tips__remove"
                disabled={items.length <= 1}
                onClick={() => setItems((prev) => (prev.length <= 1 ? prev : prev.filter((_, j) => j !== i)))}
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
        <button type="button" className="admin-tips__add" onClick={() => setItems((prev) => [...prev, emptyItem()])}>
          + 질문 추가
        </button>
      </section>

      <div className="admin-tips__actions">
        <button type="submit" className="admin-tips__save" disabled={saving}>
          {saving ? '저장 중…' : 'FAQ 저장'}
        </button>
      </div>
    </form>
  )
}
