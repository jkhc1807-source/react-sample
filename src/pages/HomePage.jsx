import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getTipForDate } from '../data/homeDailyTips.js'
import { DEFAULT_HOME_CONTENT } from '../data/defaultHome.js'
import { fetchTodayTip } from '../api/tipsClient.js'
import { fetchHomeContent } from '../api/contentClient.js'
import './HomePage.css'

export default function HomePage() {
  const [tip, setTip] = useState(() => getTipForDate())
  const [home, setHome] = useState(DEFAULT_HOME_CONTENT)

  useEffect(() => {
    let cancelled = false
    void fetchTodayTip().then((t) => {
      if (!cancelled) setTip(t)
    })
    void fetchHomeContent().then((h) => {
      if (!cancelled) setHome(h)
    })
    return () => {
      cancelled = true
    }
  }, [])

  const { hero, benefits, footer } = home

  return (
    <div className="home">
      <header className="home__hero">
        <div className="home__hero-blobs" aria-hidden="true" />
        <p className="home__eyebrow">{hero.eyebrow}</p>
        <h1 className="home__title">{hero.title}</h1>
        <p className="home__lead">
          {hero.leadBefore}
          <strong>{hero.leadEmphasis}</strong>
          {hero.leadAfter}
        </p>
        <div className="home__cta-row">
          <Link className="home__cta home__cta--primary" to={hero.ctaPrimary.path}>
            {hero.ctaPrimary.label}
          </Link>
          <Link className="home__cta home__cta--secondary" to={hero.ctaSecondary.path}>
            {hero.ctaSecondary.label}
          </Link>
        </div>
      </header>

      <aside className="home__fun-strip" aria-label="오늘의 한 줄 팁">
        <p className="home__daily-tip">
          <span className="home__daily-tip-label">오늘의 한 줄</span>
          <span className="home__daily-tip-text">{tip}</span>
        </p>
      </aside>

      <section className="home__benefits" aria-labelledby="home-benefits-title">
        <h2 id="home-benefits-title" className="home__section-title home__section-title--center">
          {benefits.title}
        </h2>
        <ul className="home__benefit-list">
          {benefits.cards.map((card) => (
            <li key={card.title} className="home__benefit-card">
              <span className="home__benefit-icon" aria-hidden="true">
                {card.icon}
              </span>
              <h3 className="home__benefit-title">{card.title}</h3>
              <p className="home__benefit-text">{card.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <footer className="home__foot">
        <p className="home__foot-text">
          {footer.textBefore}{' '}
          <Link className="home__foot-link" to={footer.linkPath}>
            {footer.linkLabel}
          </Link>
        </p>
      </footer>
    </div>
  )
}
