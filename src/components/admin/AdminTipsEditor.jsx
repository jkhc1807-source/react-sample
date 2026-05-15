import { useEffect, useState } from 'react'
import { fetchAdminTips, saveAdminTips } from '../../api/adminClient.js'
import './AdminTipsEditor.css'

function emptyRow() {
  return ''
}

export default function AdminTipsEditor() {
  const [daily, setDaily] = useState([])
  const [faqBonus, setFaqBonus] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [savedAt, setSavedAt] = useState(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        setLoading(true)
        setError('')
        const tips = await fetchAdminTips()
        if (cancelled) return
        setDaily(tips.daily?.length ? [...tips.daily] : [emptyRow()])
        setFaqBonus(tips.faqBonus?.length ? [...tips.faqBonus] : [])
      } catch (e) {
        if (cancelled) return
        setError(e.message === 'forbidden' ? '관리자만 수정할 수 있습니다.' : '팁 목록을 불러오지 못했습니다.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  function updateDaily(index, value) {
    setDaily((prev) => prev.map((t, i) => (i === index ? value : t)))
  }

  function updateFaq(index, value) {
    setFaqBonus((prev) => prev.map((t, i) => (i === index ? value : t)))
  }

  function addDaily() {
    setDaily((prev) => [...prev, emptyRow()])
  }

  function removeDaily(index) {
    setDaily((prev) => (prev.length <= 1 ? prev : prev.filter((_, i) => i !== index)))
  }

  function addFaq() {
    setFaqBonus((prev) => [...prev, emptyRow()])
  }

  function removeFaq(index) {
    setFaqBonus((prev) => prev.filter((_, i) => i !== index))
  }

  async function handleSave(e) {
    e.preventDefault()
    const trimmedDaily = daily.map((t) => t.trim()).filter(Boolean)
    if (trimmedDaily.length === 0) {
      setError('홈「오늘의 한 줄」용 팁은 최소 1개가 필요합니다.')
      return
    }
    const trimmedFaq = faqBonus.map((t) => t.trim()).filter(Boolean)
    try {
      setSaving(true)
      setError('')
      const tips = await saveAdminTips({ daily: trimmedDaily, faqBonus: trimmedFaq })
      setDaily([...tips.daily])
      setFaqBonus([...tips.faqBonus])
      setSavedAt(new Date())
    } catch (err) {
      setError(err.details ? '입력 형식을 확인해 주세요.' : '저장에 실패했습니다. API 서버가 켜져 있는지 확인하세요.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <p className="admin-tips__status">팁 목록 불러오는 중…</p>
  }

  return (
    <form className="admin-tips" onSubmit={handleSave}>
      {error ? (
        <p className="admin-tips__error" role="alert">
          {error}
        </p>
      ) : null}
      {savedAt ? (
        <p className="admin-tips__ok" role="status">
          저장됨 ({savedAt.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })})
        </p>
      ) : null}

      <section className="admin-tips__section" aria-labelledby="admin-tips-daily">
        <div className="admin-tips__section-head">
          <h2 id="admin-tips-daily" className="admin-tips__heading">
            홈 · 오늘의 한 줄
          </h2>
          <p className="admin-tips__hint">날짜마다 목록에서 하나가 고정으로 보입니다. ({daily.length}개)</p>
        </div>
        <ul className="admin-tips__list">
          {daily.map((text, i) => (
            <li key={`d-${i}`} className="admin-tips__row">
              <label className="admin-tips__label" htmlFor={`admin-tip-d-${i}`}>
                #{i + 1}
              </label>
              <textarea
                id={`admin-tip-d-${i}`}
                className="admin-tips__input"
                rows={2}
                maxLength={500}
                value={text}
                onChange={(e) => updateDaily(i, e.target.value)}
              />
              <button
                type="button"
                className="admin-tips__remove"
                disabled={daily.length <= 1}
                aria-label={`홈 팁 ${i + 1} 삭제`}
                onClick={() => removeDaily(i)}
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
        <button type="button" className="admin-tips__add" onClick={addDaily}>
          + 홈 팁 추가
        </button>
      </section>

      <section className="admin-tips__section" aria-labelledby="admin-tips-faq">
        <div className="admin-tips__section-head">
          <h2 id="admin-tips-faq" className="admin-tips__heading">
            FAQ · 무작위 팁
          </h2>
          <p className="admin-tips__hint">FAQ 페이지「다른 팁」에서 섞여 나옵니다. ({faqBonus.length}개)</p>
        </div>
        {faqBonus.length === 0 ? (
          <p className="admin-tips__empty">FAQ 보너스 팁이 없습니다. 필요하면 추가하세요.</p>
        ) : (
          <ul className="admin-tips__list">
            {faqBonus.map((text, i) => (
              <li key={`f-${i}`} className="admin-tips__row">
                <label className="admin-tips__label" htmlFor={`admin-tip-f-${i}`}>
                  #{i + 1}
                </label>
                <textarea
                  id={`admin-tip-f-${i}`}
                  className="admin-tips__input"
                  rows={2}
                  maxLength={500}
                  value={text}
                  onChange={(e) => updateFaq(i, e.target.value)}
                />
                <button
                  type="button"
                  className="admin-tips__remove"
                  aria-label={`FAQ 팁 ${i + 1} 삭제`}
                  onClick={() => removeFaq(i)}
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        )}
        <button type="button" className="admin-tips__add" onClick={addFaq}>
          + FAQ 팁 추가
        </button>
      </section>

      <div className="admin-tips__actions">
        <button type="submit" className="admin-tips__save" disabled={saving}>
          {saving ? '저장 중…' : '전체 저장'}
        </button>
      </div>
    </form>
  )
}
