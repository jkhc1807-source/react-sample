import { Link } from 'react-router-dom'
import HomeQuickSearch from '../components/home/HomeQuickSearch.jsx'
import './HomePage.css'

export default function HomePage() {
  return (
    <article className="home">
      <header className="home__hero">
        <p className="home__eyebrow">React · Vite · 예제 허브</p>
        <h1 className="home__title">React 학습 허브</h1>
        <p className="home__lead">
          한 곳에서 주제별 예제를 돌아다니며 보는 <strong>개인 학습용 허브</strong>입니다.
          검색창으로 바로 이동하거나 아래 순서만 따라와도 됩니다.
        </p>
      </header>

      <section className="home__section" aria-labelledby="home-track-title">
        <div className="home__section-head">
          <h2 id="home-track-title" className="home__section-title">
            권장 학습 순서
          </h2>
        </div>
        <div className="home__track">
          <ol className="home__track-list">
            <li>
              <Link to="/playground">샘플 모음</Link> — 기초 예제·표현식
            </li>
            <li>
              <Link to="/functions/map">함수</Link> — map·state·배열 메서드
            </li>
            <li>
              <Link to="/practice/overview">실무·심화</Link> — 패널·비동기·품질
            </li>
            <li>
              <Link to="/ui-kit">UI 키트</Link> — 폼·모달 등 컴포넌트
            </li>
          </ol>
        </div>
      </section>

      <section className="home__section" aria-labelledby="home-search-title">
        <div className="home__section-head home__section-head--split">
          <div>
            <h2 id="home-search-title" className="home__section-title">
              페이지 검색
            </h2>
            <p id="home-search-desc" className="home__section-desc">
              제목·경로·키워드에서 찾습니다. 원하는 줄을 클릭하거나 선택 후 Enter 하면 해당 페이지로
              이동합니다.
            </p>
          </div>
        </div>

        <HomeQuickSearch describedById="home-search-desc" />
      </section>
    </article>
  )
}
