import { useEffect, useState } from 'react'
import { fetchAdminPageHeaders, saveAdminPageHeaders } from '../../api/adminClient.js'
import { DEFAULT_PAGE_HEADERS } from '../../data/defaultPageHeaders.js'
import './AdminTipsEditor.css'

function cloneHeaders(h = DEFAULT_PAGE_HEADERS) {
  return {
    playground: {
      ...h.playground,
      externalLink: { ...h.playground.externalLink },
    },
    uiKit: { ...h.uiKit },
    functions: { ...h.functions },
    practice: { ...h.practice },
  }
}

function SimpleHeaderFields({ id, label, header, onChange }) {
  return (
    <section className="admin-tips__section" aria-labelledby={id}>
      <div className="admin-tips__section-head">
        <h2 id={id} className="admin-tips__heading">
          {label}
        </h2>
        <p className="admin-tips__hint">제목(H1)과 소개 문단만 수정합니다. 예제·코드 블록은 코드에서 관리합니다.</p>
      </div>
      <div className="admin-tips__field-grid">
        <label className="admin-tips__field">
          <span className="admin-tips__field-label">제목</span>
          <input
            className="admin-tips__input admin-tips__input--single"
            value={header.title}
            onChange={(e) => onChange('title', e.target.value)}
          />
        </label>
        <label className="admin-tips__field">
          <span className="admin-tips__field-label">소개</span>
          <textarea
            className="admin-tips__input"
            rows={3}
            value={header.lead}
            onChange={(e) => onChange('lead', e.target.value)}
          />
        </label>
      </div>
    </section>
  )
}

export default function AdminPageHeadersEditor() {
  const [headers, setHeaders] = useState(() => cloneHeaders())
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [savedAt, setSavedAt] = useState(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        setLoading(true)
        const data = await fetchAdminPageHeaders()
        if (cancelled) return
        setHeaders(cloneHeaders(data))
      } catch {
        if (!cancelled) setError('학습 페이지 헤더를 불러오지 못했습니다.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  function setPlayground(field, value) {
    setHeaders((prev) => ({
      ...prev,
      playground: { ...prev.playground, [field]: value },
    }))
  }

  function setPlaygroundLink(field, value) {
    setHeaders((prev) => ({
      ...prev,
      playground: {
        ...prev.playground,
        externalLink: { ...prev.playground.externalLink, [field]: value },
      },
    }))
  }

  function setSimple(key, field, value) {
    setHeaders((prev) => ({
      ...prev,
      [key]: { ...prev[key], [field]: value },
    }))
  }

  async function handleSave(e) {
    e.preventDefault()
    try {
      setSaving(true)
      setError('')
      const saved = await saveAdminPageHeaders(headers)
      setHeaders(cloneHeaders(saved))
      setSavedAt(new Date())
    } catch {
      setError('저장에 실패했습니다.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className="admin-tips__status">학습 페이지 헤더 불러오는 중…</p>

  const pg = headers.playground

  return (
    <form className="admin-tips" onSubmit={handleSave}>
      {error ? (
        <p className="admin-tips__error" role="alert">
          {error}
        </p>
      ) : null}
      {savedAt ? (
        <p className="admin-tips__ok" role="status">
          저장됨 — 샘플·UI 키트·함수·실무 허브 상단에 반영됩니다.
        </p>
      ) : null}

      <section className="admin-tips__section" aria-labelledby="admin-ph-playground">
        <div className="admin-tips__section-head">
          <h2 id="admin-ph-playground" className="admin-tips__heading">
            샘플 모음 (Playground)
          </h2>
        </div>
        <div className="admin-tips__field-grid">
          <label className="admin-tips__field">
            <span className="admin-tips__field-label">제목</span>
            <input
              className="admin-tips__input admin-tips__input--single"
              value={pg.title}
              onChange={(e) => setPlayground('title', e.target.value)}
            />
          </label>
          <label className="admin-tips__field">
            <span className="admin-tips__field-label">소개 (링크 앞)</span>
            <textarea
              className="admin-tips__input"
              rows={2}
              value={pg.leadBefore}
              onChange={(e) => setPlayground('leadBefore', e.target.value)}
            />
          </label>
          <label className="admin-tips__field">
            <span className="admin-tips__field-label">외부 링크</span>
            <div className="admin-tips__inline-2">
              <input
                className="admin-tips__input admin-tips__input--single"
                placeholder="라벨"
                value={pg.externalLink.label}
                onChange={(e) => setPlaygroundLink('label', e.target.value)}
              />
              <input
                className="admin-tips__input admin-tips__input--single"
                placeholder="https://"
                value={pg.externalLink.url}
                onChange={(e) => setPlaygroundLink('url', e.target.value)}
              />
            </div>
          </label>
          <label className="admin-tips__field">
            <span className="admin-tips__field-label">소개 (링크 뒤)</span>
            <input
              className="admin-tips__input admin-tips__input--single"
              value={pg.leadAfter}
              onChange={(e) => setPlayground('leadAfter', e.target.value)}
            />
          </label>
        </div>
      </section>

      <SimpleHeaderFields
        id="admin-ph-uikit"
        label="UI 컴포넌트 키트"
        header={headers.uiKit}
        onChange={(field, value) => setSimple('uiKit', field, value)}
      />
      <SimpleHeaderFields
        id="admin-ph-functions"
        label="함수 학습"
        header={headers.functions}
        onChange={(field, value) => setSimple('functions', field, value)}
      />
      <SimpleHeaderFields
        id="admin-ph-practice"
        label="실무·심화"
        header={headers.practice}
        onChange={(field, value) => setSimple('practice', field, value)}
      />

      <div className="admin-tips__actions">
        <button type="submit" className="admin-tips__save" disabled={saving}>
          {saving ? '저장 중…' : '저장'}
        </button>
      </div>
    </form>
  )
}
