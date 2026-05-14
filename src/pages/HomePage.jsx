import { Link } from 'react-router-dom'
import { getPopularHomeRoutes } from '../data/homeSearchRoutes.js'
import './HomePage.css'

export default function HomePage() {
  const recommended = getPopularHomeRoutes()

  return (
    <div className="home">
      <header className="home__hero">
        <div className="home__hero-blobs" aria-hidden="true" />
        <p className="home__eyebrow">React · Vite · 학습 허브</p>
        <h1 className="home__title">React 학습 허브</h1>
        <p className="home__lead">
          주제별 예제를 한곳에서 보는 <strong>개인 학습용 허브</strong>입니다. 검색으로 이동하거나 아래{' '}
          <strong>권장 순서</strong>를 따라가도 됩니다.
        </p>
        <ul className="home__hero-pills" aria-label="허브 특징">
          <li className="home__hero-pill">개인 학습</li>
          <li className="home__hero-pill">한국어 UI</li>
          <li className="home__hero-pill">검색 · 즐겨찾기</li>
          <li className="home__hero-pill">라우트별 설명</li>
        </ul>
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
            <li className="home__track-item">
              <Link to="/playground" className="home__track-item-link">
                <span className="home__track-item-label">시작</span>
                <h3 className="home__track-item-title">샘플 모음</h3>
                <span className="home__track-item-desc">컴포넌트·표현식·상태 맛보기</span>
              </Link>
            </li>
            <li className="home__track-item">
              <Link to="/functions/map" className="home__track-item-link">
                <span className="home__track-item-label">데이터</span>
                <h3 className="home__track-item-title">함수</h3>
                <span className="home__track-item-desc">map·filter 등 리스트·데이터 처리</span>
              </Link>
            </li>
            <li className="home__track-item">
              <Link to="/ui-kit" className="home__track-item-link">
                <span className="home__track-item-label">UI</span>
                <h3 className="home__track-item-title">UI 키트</h3>
                <span className="home__track-item-desc">카드·폼·목록을 컴포넌트로 정리</span>
              </Link>
            </li>
            <li className="home__track-item">
              <Link to="/practice/overview" className="home__track-item-link">
                <span className="home__track-item-label">심화</span>
                <h3 className="home__track-item-title">실무·심화</h3>
                <span className="home__track-item-desc">패널·비동기·품질 패턴</span>
              </Link>
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
            상단 검색창을 비워 두면 나오는 패널과 같은 추천 데이터를 씁니다. 패널에는 즐겨찾기가 먼저 올 수
            있고, 추천 목록에서는 이미 즐겨찾기한 경로는 빼고 보여 줍니다. 권장 순서의 다음 단계(비동기·filter
            등)가 이어집니다.
          </p>
        </div>
        <div className="home__rec-panel">
          <ul className="home__rec-list">
            {recommended.map((r) => (
              <li key={r.path} className="home__rec-item">
                <Link to={r.path} className="home__rec-link">
                  <span className="home__rec-arrow" aria-hidden="true">
                    →
                  </span>
                  <span className="home__rec-body">
                    <h3 className="home__rec-title">{r.title}</h3>
                    <span className="home__rec-path">{r.path}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
