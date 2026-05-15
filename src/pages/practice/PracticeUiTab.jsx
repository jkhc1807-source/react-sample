import CodeSample from '../../components/CodeSample.jsx'
import PracticeBottomSheetDemo from '../../components/practice/PracticeBottomSheetDemo.jsx'
import PracticeLikeFeedDemo from '../../components/practice/PracticeLikeFeedDemo.jsx'
import PracticeOrbitDotsDemo from '../../components/practice/PracticeOrbitDotsDemo.jsx'
import PracticeTiltCardDemo from '../../components/practice/PracticeTiltCardDemo.jsx'
import { PracticalReactBody } from '../PracticalReactPage.jsx'
import {
  PR_DIST_LIKE,
  PR_DIST_ORBIT,
  PR_DIST_SHEET,
  PR_DIST_TILT,
} from '../snippets/practiceDistributedSnippets.js'
import '../ExtendedStudyPage.css'
import '../PracticalReactPage.css'

export default function PracticeUiTab() {
  return (
    <>
      <div className="practical-react practical-react--embed practical-react--on-surface">
        <PracticalReactBody />
      </div>

      <div className="extended-study">
        <section className="extended-study__section">
          <h2 className="extended-study__title pr-tab__title-tight">
            모션 · 마우스 기울임 카드 (<code>transform</code>)
          </h2>
          <p>
            카드 영역의 상대 좌표로 <code>rotateX</code>·<code>rotateY</code>를 계산합니다. 접근성을 위해{' '}
            <code>prefers-reduced-motion</code>이면 기울임을 끕니다.
          </p>
          <CodeSample
            label="예시 소스 (복붙용)"
            fileHint="PracticeTiltCardDemo.jsx + usePrefersReducedMotion.js + CSS"
            code={PR_DIST_TILT}
          />
          <p className="extended-study__label">화면</p>
          <PracticeTiltCardDemo />
        </section>

        <section className="extended-study__section">
          <h2 className="extended-study__title pr-tab__title-tight">모션 · CSS 키프레임 토글</h2>
          <p>
            클래스를 붙였다 떼면 <code>@keyframes</code> 애니메이션이 켜집니다. 로딩 점·배지 강조 등에
            같은 방식을 씁니다.
          </p>
          <CodeSample
            label="예시 소스 (복붙용)"
            fileHint="PracticeOrbitDotsDemo.jsx + CSS (+ 훅은 틸트 예제와 동일)"
            code={PR_DIST_ORBIT}
          />
          <p className="extended-study__label">화면</p>
          <PracticeOrbitDotsDemo />
        </section>

        <section className="extended-study__section">
          <h2 className="extended-study__title pr-tab__title-tight">모션 · 하단 시트 (스크림 + 슬라이드)</h2>
          <p>
            열림 state에 따라 패널에 <code>translateY</code> 트랜지션을 줍니다. 스크림 클릭·닫기 버튼·
            <kbd>Esc</kbd>로 닫히게 연결했습니다.
          </p>
          <CodeSample
            label="예시 소스 (복붙용)"
            fileHint="PracticeBottomSheetDemo.jsx + CSS"
            code={PR_DIST_SHEET}
          />
          <p className="extended-study__label">화면</p>
          <PracticeBottomSheetDemo />
        </section>

        <section className="extended-study__section">
          <h2 className="extended-study__title pr-tab__title-tight">좋아요 · 토글과 집계</h2>
          <p>
            <code>aria-pressed</code>·<code>aria-live</code>로 버튼 상태와 숫자 변화를 보조 기술에도
            전달합니다. 서버 연동 시에는 낙관적 UI·재시도를 이 위에 얹습니다.
          </p>
          <CodeSample
            label="예시 소스 (복붙용)"
            fileHint="PracticeLikeFeedDemo.jsx + CSS"
            code={PR_DIST_LIKE}
          />
          <p className="extended-study__label">화면</p>
          <PracticeLikeFeedDemo />
        </section>
      </div>
    </>
  )
}
