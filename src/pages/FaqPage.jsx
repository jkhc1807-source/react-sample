import { useId, useState } from 'react'
import { GEO_FAQ_ITEMS } from '../data/geoFaq.js'
import { getRandomFaqTip } from '../data/homeDailyTips.js'
import './FaqPage.css'

export default function FaqPage() {
  const baseId = useId()
  const [openIndex, setOpenIndex] = useState(null)
  const [randomTip, setRandomTip] = useState(() => getRandomFaqTip())

  function shuffleTip() {
    setRandomTip((prev) => getRandomFaqTip(prev))
  }

  return (
    <article className="faq-page">
      <header className="faq-page__head">
        <p className="faq-page__eyebrow">도움말</p>
        <h1 className="faq-page__title">자주 묻는 질문</h1>
        <p className="faq-page__lead">허브를 쓰다가 자주 나오는 질문만 모았습니다.</p>
      </header>

      <div className="faq-page__accordion">
        {GEO_FAQ_ITEMS.map((item, i) => {
          const panelId = `${baseId}-panel-${i}`
          const btnId = `${baseId}-btn-${i}`
          const isOpen = openIndex === i
          return (
            <div key={item.question} className="faq-page__item">
              <h3 className="faq-page__item-heading">
                <button
                  type="button"
                  id={btnId}
                  className="faq-page__trigger"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  <span className="faq-page__trigger-text">{item.question}</span>
                  <span
                    className={`faq-page__trigger-icon${isOpen ? ' faq-page__trigger-icon--open' : ''}`}
                    aria-hidden
                  />
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={btnId}
                className="faq-page__panel"
                hidden={!isOpen}
              >
                <div className="faq-page__panel-inner">{item.answer}</div>
              </div>
            </div>
          )
        })}
      </div>

      <section className="faq-page__tip" aria-labelledby="faq-random-tip">
        <div className="faq-page__tip-head">
          <h2 id="faq-random-tip" className="faq-page__tip-title">
            무작위 팁
          </h2>
          <button type="button" className="faq-page__tip-shuffle" onClick={shuffleTip}>
            다른 팁
          </button>
        </div>
        <p className="faq-page__tip-body">{randomTip}</p>
      </section>

      <section className="faq-page__extra" aria-labelledby="faq-llms">
        <h2 id="faq-llms" className="faq-page__extra-title">
          /llms.txt
        </h2>
        <p className="faq-page__extra-p">
          사이트 요약을 <strong>마크다운 텍스트</strong>로 적어 둔 파일입니다. 브라우저로 열면{' '}
          <code className="faq-page__code">#</code>·<code className="faq-page__code">**</code> 같은 기호가
          그대로 보일 수 있습니다.{' '}
          <a href="/llms.txt" className="faq-page__link" target="_blank" rel="noreferrer">
            열기
          </a>
        </p>
      </section>
    </article>
  )
}
