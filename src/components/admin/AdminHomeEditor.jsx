import { useEffect, useState } from 'react'
import { fetchAdminHome, saveAdminHome } from '../../api/adminClient.js'
import { DEFAULT_HOME_CONTENT } from '../../data/defaultHome.js'
import './AdminTipsEditor.css'

function cloneHome(h = DEFAULT_HOME_CONTENT) {
  return {
    hero: { ...h.hero, ctaPrimary: { ...h.hero.ctaPrimary }, ctaSecondary: { ...h.hero.ctaSecondary } },
    benefits: { title: h.benefits.title, cards: h.benefits.cards.map((c) => ({ ...c })) },
    footer: { ...h.footer },
  }
}

export default function AdminHomeEditor() {
  const [home, setHome] = useState(() => cloneHome())
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [savedAt, setSavedAt] = useState(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        setLoading(true)
        const data = await fetchAdminHome()
        if (cancelled) return
        setHome(cloneHome(data))
      } catch {
        if (!cancelled) setError('홈 내용을 불러오지 못했습니다.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  function setHero(field, value) {
    setHome((prev) => ({ ...prev, hero: { ...prev.hero, [field]: value } }))
  }

  function setCta(which, field, value) {
    setHome((prev) => ({
      ...prev,
      hero: { ...prev.hero, [which]: { ...prev.hero[which], [field]: value } },
    }))
  }

  function setFooter(field, value) {
    setHome((prev) => ({ ...prev, footer: { ...prev.footer, [field]: value } }))
  }

  function updateCard(index, field, value) {
    setHome((prev) => ({
      ...prev,
      benefits: {
        ...prev.benefits,
        cards: prev.benefits.cards.map((c, i) => (i === index ? { ...c, [field]: value } : c)),
      },
    }))
  }

  async function handleSave(e) {
    e.preventDefault()
    try {
      setSaving(true)
      setError('')
      const saved = await saveAdminHome(home)
      setHome(cloneHome(saved))
      setSavedAt(new Date())
    } catch {
      setError('저장에 실패했습니다.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className="admin-tips__status">홈 내용 불러오는 중…</p>

  const { hero, benefits, footer } = home

  return (
    <form className="admin-tips" onSubmit={handleSave}>
      {error ? (
        <p className="admin-tips__error" role="alert">
          {error}
        </p>
      ) : null}
      {savedAt ? (
        <p className="admin-tips__ok" role="status">
          저장됨 — / 홈에 반영됩니다.
        </p>
      ) : null}

      <section className="admin-tips__section" aria-labelledby="admin-home-hero">
        <div className="admin-tips__section-head">
          <h2 id="admin-home-hero" className="admin-tips__heading">
            홈 · 히어로
          </h2>
        </div>
        <div className="admin-tips__field-grid">
          <label className="admin-tips__field">
            <span className="admin-tips__field-label">Eyebrow</span>
            <input
              className="admin-tips__input admin-tips__input--single"
              value={hero.eyebrow}
              onChange={(e) => setHero('eyebrow', e.target.value)}
            />
          </label>
          <label className="admin-tips__field">
            <span className="admin-tips__field-label">제목 (H1)</span>
            <input
              className="admin-tips__input admin-tips__input--single"
              value={hero.title}
              onChange={(e) => setHero('title', e.target.value)}
            />
          </label>
          <label className="admin-tips__field">
            <span className="admin-tips__field-label">리드 (앞)</span>
            <input
              className="admin-tips__input admin-tips__input--single"
              value={hero.leadBefore}
              onChange={(e) => setHero('leadBefore', e.target.value)}
            />
          </label>
          <label className="admin-tips__field">
            <span className="admin-tips__field-label">리드 (강조)</span>
            <input
              className="admin-tips__input admin-tips__input--single"
              value={hero.leadEmphasis}
              onChange={(e) => setHero('leadEmphasis', e.target.value)}
            />
          </label>
          <label className="admin-tips__field">
            <span className="admin-tips__field-label">리드 (뒤)</span>
            <input
              className="admin-tips__input admin-tips__input--single"
              value={hero.leadAfter}
              onChange={(e) => setHero('leadAfter', e.target.value)}
            />
          </label>
          <label className="admin-tips__field">
            <span className="admin-tips__field-label">Primary CTA</span>
            <div className="admin-tips__inline-2">
              <input
                className="admin-tips__input admin-tips__input--single"
                placeholder="라벨"
                value={hero.ctaPrimary.label}
                onChange={(e) => setCta('ctaPrimary', 'label', e.target.value)}
              />
              <input
                className="admin-tips__input admin-tips__input--single"
                placeholder="/path"
                value={hero.ctaPrimary.path}
                onChange={(e) => setCta('ctaPrimary', 'path', e.target.value)}
              />
            </div>
          </label>
          <label className="admin-tips__field">
            <span className="admin-tips__field-label">Secondary CTA</span>
            <div className="admin-tips__inline-2">
              <input
                className="admin-tips__input admin-tips__input--single"
                placeholder="라벨"
                value={hero.ctaSecondary.label}
                onChange={(e) => setCta('ctaSecondary', 'label', e.target.value)}
              />
              <input
                className="admin-tips__input admin-tips__input--single"
                placeholder="/path"
                value={hero.ctaSecondary.path}
                onChange={(e) => setCta('ctaSecondary', 'path', e.target.value)}
              />
            </div>
          </label>
        </div>
      </section>

      <section className="admin-tips__section" aria-labelledby="admin-home-benefits">
        <div className="admin-tips__section-head">
          <h2 id="admin-home-benefits" className="admin-tips__heading">
            홈 · 이득 3칸
          </h2>
          <label className="admin-tips__field admin-tips__field--inline">
            <span className="admin-tips__field-label">섹션 제목</span>
            <input
              className="admin-tips__input admin-tips__input--single"
              value={benefits.title}
              onChange={(e) =>
                setHome((prev) => ({ ...prev, benefits: { ...prev.benefits, title: e.target.value } }))
              }
            />
          </label>
        </div>
        <ul className="admin-tips__list">
          {benefits.cards.map((card, i) => (
            <li key={`card-${i}`} className="admin-tips__row admin-tips__row--faq">
              <span className="admin-tips__label">{card.icon}</span>
              <div className="admin-tips__faq-fields">
                <input
                  className="admin-tips__input admin-tips__input--single"
                  maxLength={4}
                  value={card.icon}
                  onChange={(e) => updateCard(i, 'icon', e.target.value)}
                  aria-label={`카드 ${i + 1} 아이콘`}
                />
                <input
                  className="admin-tips__input admin-tips__input--single"
                  placeholder="카드 제목"
                  value={card.title}
                  onChange={(e) => updateCard(i, 'title', e.target.value)}
                />
                <textarea
                  className="admin-tips__input"
                  rows={2}
                  placeholder="설명"
                  value={card.text}
                  onChange={(e) => updateCard(i, 'text', e.target.value)}
                />
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="admin-tips__section" aria-labelledby="admin-home-foot">
        <h2 id="admin-home-foot" className="admin-tips__heading">
          홈 · 푸터
        </h2>
        <div className="admin-tips__field-grid">
          <label className="admin-tips__field">
            <span className="admin-tips__field-label">문장</span>
            <input
              className="admin-tips__input admin-tips__input--single"
              value={footer.textBefore}
              onChange={(e) => setFooter('textBefore', e.target.value)}
            />
          </label>
          <label className="admin-tips__field">
            <span className="admin-tips__field-label">링크 라벨 / 경로</span>
            <div className="admin-tips__inline-2">
              <input
                className="admin-tips__input admin-tips__input--single"
                value={footer.linkLabel}
                onChange={(e) => setFooter('linkLabel', e.target.value)}
              />
              <input
                className="admin-tips__input admin-tips__input--single"
                value={footer.linkPath}
                onChange={(e) => setFooter('linkPath', e.target.value)}
              />
            </div>
          </label>
        </div>
      </section>

      <div className="admin-tips__actions">
        <button type="submit" className="admin-tips__save" disabled={saving}>
          {saving ? '저장 중…' : '홈 저장'}
        </button>
      </div>
    </form>
  )
}
