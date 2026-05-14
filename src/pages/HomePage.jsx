import { Link } from 'react-router-dom'
import { getPopularHomeRoutes } from '../data/homeSearchRoutes.js'
import './HomePage.css'

export default function HomePage() {
  const recommended = getPopularHomeRoutes()

  return (
    <article className="home">
      <header className="home__hero">
        <p className="home__eyebrow">React · Vite · 예제 허브</p>
        <h1 className="home__title">React 학습 허브</h1>
        <p className="home__lead">
          주제별 예제를 한곳에서 보는 <strong>개인 학습용 허브</strong>입니다. 검색으로 이동하거나 아래{' '}
          <strong>권장 순서</strong>를 따라가도 됩니다.
        </p>
      </header>

      <section className="home__section" aria-labelledby="home-track-title">
        <div className="home__section-head">
          <h2 id="home-track-title" className="home__section-title">
            권장 학습 순서
          </h2>
          <p className="home__section-desc home__section-desc--tight">
            React를 처음 맞출 때는 <strong>짧은 예제 → 리스트·데이터 사고 → UI 조립 → 실무 패턴</strong> 순이
            읽기 편합니다. 순서는 편한 대로 바꿔도 됩니다.
          </p>
        </div>
        <div className="home__track">
          <ol className="home__track-list">
            <li>
              <Link to="/playground">샘플 모음</Link> — 컴포넌트·표현식·상태 맛보기
            </li>
            <li>
              <Link to="/functions/map">함수</Link> — map·filter 등 리스트·데이터 처리 (React에서 자주
              겹침)
            </li>
            <li>
              <Link to="/ui-kit">UI 키트</Link> — 샘플 모음과 같은 카드·폼·목록 패턴을 컴포넌트로 정리
            </li>
            <li>
              <Link to="/practice/overview">실무·심화</Link> — 패널·비동기·품질 등 한 단계 깊은 패턴
            </li>
          </ol>
        </div>
      </section>

      <section className="home__section" aria-labelledby="home-rec-title">
        <div className="home__section-head">
          <h2 id="home-rec-title" className="home__section-title">
            추천 페이지
          </h2>
          <p className="home__section-desc">
            상단 검색창을 비워 두면 나오는 목록과 같은 순서입니다. 권장 순서의 다음 단계(비동기·filter
            등)가 이어집니다.
          </p>
        </div>
        <ul className="home__rec-list">
          {recommended.map((r) => (
            <li key={r.path}>
              <Link to={r.path} className="home__rec-link">
                <span className="home__rec-title">{r.title}</span>
                <span className="home__rec-path">{r.path}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  )
}
