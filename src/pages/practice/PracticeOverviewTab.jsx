import { Link } from 'react-router-dom'
import '../ExtendedStudyPage.css'

export default function PracticeOverviewTab() {
  return (
    <div className="extended-study">
      <section className="extended-study__section">
        <h2 className="extended-study__title pr-tab__title-tight--overview">
          개요·점검
          <span className="pr-tab__overview-subhead">이 허브에서 다루는 것</span>
        </h2>
        <p className="extended-study__lead">
          <strong>UI·이벤트</strong> 탭은 클릭·폼·조건부 렌더·타이머·fetch·props·ref까지 한 번에 돌아볼 수
          있게 묶었습니다. <strong>데이터·검색</strong>은 디바운스·중단 가능한 fetch·클라이언트 필터가
          들어간 패널입니다. <strong>폼·목록·큐</strong>는 검증 폼·id 기반 목록·주문 상태 전이를
          합쳤습니다.
        </p>
        <ul className="extended-study__section-lead pr-tab__bulleted-lead">
          <li>
            <Link to="/functions/coverage">함수 메뉴 → 점검표</Link>에서 배열 메서드 탭을 전부 썼는지
            확인할 수 있습니다.
          </li>
          <li>아래는 코드 없이도 말로 설명해 볼 개념입니다. (펼쳐 보기)</li>
        </ul>
      </section>

      <section className="extended-study__section extended-study__section--concepts">
        <h2>개념으로 꼭 필요한 것</h2>
        <p className="extended-study__section-lead">제목을 눌러 펼칩니다.</p>

        <details className="extended-study__details">
          <summary>불변 업데이트 (immutable state)</summary>
          <div className="extended-study__details-body">
            <ul>
              <li>객체·배열 state는 같은 참조를 고치지 말고, 새 객체·새 배열을 만듭니다.</li>
              <li>
                <code>setItems((prev) =&gt; [...prev, x])</code>,{' '}
                <code>setUser((u) =&gt; ({'{ ...u, name: v }'}))</code> 같은 패턴이 대표적입니다.
              </li>
            </ul>
          </div>
        </details>

        <details className="extended-study__details">
          <summary>선언적 UI</summary>
          <div className="extended-study__details-body">
            <ul>
              <li>화면은 현재 state의 함수입니다. 이벤트로 state만 바꾸고 렌더가 맞춥니다.</li>
            </ul>
          </div>
        </details>

        <details className="extended-study__details">
          <summary>단방향 데이터 흐름</summary>
          <div className="extended-study__details-body">
            <ul>
              <li>부모 → 자식은 props, 자식 → 부모는 콜백 props로 알립니다.</li>
            </ul>
          </div>
        </details>

        <details className="extended-study__details">
          <summary>비동기와 UI (로딩·성공·실패)</summary>
          <div className="extended-study__details-body">
            <ul>
              <li>로딩 / 성공 / 오류를 나눠 state로 표현합니다.</li>
              <li>재요청·언마운트 시 AbortController로 이전 요청을 끊습니다.</li>
            </ul>
          </div>
        </details>

        <details className="extended-study__details">
          <summary>컴포넌트 경계</summary>
          <div className="extended-study__details-body">
            <ul>
              <li>로직이 커지면 커스텀 훅으로 분리해 UI를 얇게 유지합니다.</li>
            </ul>
          </div>
        </details>
      </section>
    </div>
  )
}
