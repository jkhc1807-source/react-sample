import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { getTipForDate } from '../data/homeDailyTips.js'
import { getVisitedPathCount } from '../lib/sessionVisitedPaths.js'
import './HomePage.css'

export default function HomePage() {
  const tip = useMemo(() => getTipForDate(), [])
  const visitCount = getVisitedPathCount()

  return (
    <div className="home">
      <header className="home__hero">
        <div className="home__hero-blobs" aria-hidden="true" />
        <p className="home__eyebrow">React · 학습 허브</p>
        <h1 className="home__title">예제로 익히는 React, 한 화면에서</h1>
        <p className="home__lead">
          강의만 보다 말고 <strong>돌려볼 수 있는 샘플</strong>로 개념을 잡으세요. 함수형 유틸부터
          실무에 가까운 UI·데이터 흐름까지, 상단 메뉴로 바로 이동합니다.
        </p>
        <div className="home__cta-row">
          <Link className="home__cta home__cta--primary" to="/practice/overview">
            실무·심화 둘러보기
          </Link>
          <Link className="home__cta home__cta--secondary" to="/functions/map">
            함수(map)부터
          </Link>
        </div>
      </header>

      <aside className="home__fun-strip" aria-label="오늘의 팁과 이번 탭 방문 기록">
        <p className="home__daily-tip">
          <span className="home__daily-tip-label">오늘의 한 줄</span>
          <span className="home__daily-tip-text">{tip}</span>
        </p>
        {visitCount >= 2 ? (
          <p className="home__visit-nudge" role="status">
            이번 탭에서 <strong>{visitCount}</strong>개의 서로 다른 경로를 열었어요. 상단 검색으로 돌아오기
            빠릅니다.
          </p>
        ) : null}
      </aside>

      <section className="home__benefits" aria-labelledby="home-benefits-title">
        <h2 id="home-benefits-title" className="home__section-title home__section-title--center">
          왜 이 허브인가요
        </h2>
        <ul className="home__benefit-list">
          <li className="home__benefit-card">
            <span className="home__benefit-icon" aria-hidden="true">
              ◈
            </span>
            <h3 className="home__benefit-title">복붙 가능한 예제</h3>
            <p className="home__benefit-text">
              설명만이 아니라 소스 블록을 그대로 가져가 실험할 수 있습니다.
            </p>
          </li>
          <li className="home__benefit-card">
            <span className="home__benefit-icon" aria-hidden="true">
              ◇
            </span>
            <h3 className="home__benefit-title">주제별로 정리</h3>
            <p className="home__benefit-text">
              <strong>함수</strong> 탭의 메서드별 페이지와 <strong>실무·심화</strong> 탭이 역할을 나눕니다.
            </p>
          </li>
          <li className="home__benefit-card">
            <span className="home__benefit-icon" aria-hidden="true">
              ◆
            </span>
            <h3 className="home__benefit-title">실무에 가까운 흐름</h3>
            <p className="home__benefit-text">
              모션, 폼·검증, 비동기 등 화면 단위 패턴을 미리 만져 볼 수 있습니다.
            </p>
          </li>
        </ul>
      </section>

      <footer className="home__foot">
        <p className="home__foot-text">
          전체 라우트는 상단 검색으로도 찾을 수 있습니다.{' '}
          <Link className="home__foot-link" to="/faq">
            FAQ
          </Link>
        </p>
      </footer>
    </div>
  )
}
