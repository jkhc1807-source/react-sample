import './HomePage.css'

export default function HomePage() {
  return (
    <div className="home">
      <header className="home__hero">
        <div className="home__hero-blobs" aria-hidden="true" />
        <p className="home__eyebrow">React · 학습 허브</p>
        <h1 className="home__title">React 학습 허브</h1>
        <p className="home__lead">
          주제별 예제는 <strong>상단 메뉴</strong>에서 고르세요. 실무 패턴·모션·폼 샘플은{' '}
          <strong>실무·심화</strong> 탭의 하위 메뉴에 나뉘어 있습니다.
        </p>
      </header>
    </div>
  )
}
