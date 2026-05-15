import CodeSample from '../../components/CodeSample.jsx'
import FormCycleDemo from '../../components/extended/FormCycleDemo.jsx'
import ListKeyDemo from '../../components/extended/ListKeyDemo.jsx'
import PracticeInlineFieldDemo from '../../components/practice/PracticeInlineFieldDemo.jsx'
import PracticeUndoSnackbarDemo from '../../components/practice/PracticeUndoSnackbarDemo.jsx'
import OrderQueuePanel from '../../components/practice/OrderQueuePanel.jsx'
import { PR_DIST_INLINE, PR_DIST_UNDO } from '../snippets/practiceDistributedSnippets.js'
import { EXT_FORM, EXT_LIST } from '../snippets/extendedStudySnippets.js'
import '../ExtendedStudyPage.css'

export default function PracticeWorkshopTab() {
  return (
    <div className="extended-study">
      <section className="extended-study__section">
        <h2 className="extended-study__title pr-tab__title-tight">
          폼 검증 한 사이클
        </h2>
        <p>제출·검증·초기화까지 controlled 패턴입니다.</p>
        <CodeSample label="예시 소스 (복붙용)" fileHint="FormCycleDemo.jsx" code={EXT_FORM} />
        <p className="extended-study__label">화면</p>
        <FormCycleDemo />
      </section>

      <section className="extended-study__section">
        <h2 className="extended-study__title pr-tab__title-tight">인라인 필드 검증 (즉시 피드백)</h2>
        <p>
          한 필드만 다룰 때는 blur·길이 조건으로 에러 메시지를 토글합니다. 큰 폼(<code>FormCycleDemo</code>
          )과 비교해 보세요.
        </p>
        <CodeSample
          label="예시 소스 (복붙용)"
          fileHint="PracticeInlineFieldDemo.jsx + CSS"
          code={PR_DIST_INLINE}
        />
        <p className="extended-study__label">화면</p>
        <PracticeInlineFieldDemo />
      </section>

      <section className="extended-study__section">
        <h2 className="extended-study__title pr-tab__title-tight">
          목록 key·불변 업데이트
        </h2>
        <p>
          <code>crypto.randomUUID()</code> 기반 id와 <code>filter</code>·스프레드로 삭제·순서 변경을
          처리합니다.
        </p>
        <CodeSample label="예시 소스 (복붙용)" fileHint="ListKeyDemo.jsx" code={EXT_LIST} />
        <p className="extended-study__label">화면</p>
        <ListKeyDemo />
      </section>

      <section className="extended-study__section">
        <h2 className="extended-study__title pr-tab__title-tight">실행 취소 토스트 (가짜)</h2>
        <p>
          삭제 직후 짧은 바가 슬라이드되며 실행 취소를 제안하는 패턴입니다. <code>useEffect</code>로 자동
          숨김 타이머를 걸고, 언마운트 시 정리합니다.
        </p>
        <CodeSample
          label="예시 소스 (복붙용)"
          fileHint="PracticeUndoSnackbarDemo.jsx + CSS"
          code={PR_DIST_UNDO}
        />
        <p className="extended-study__label">화면</p>
        <PracticeUndoSnackbarDemo />
      </section>

      <section className="extended-study__section">
        <h2 className="extended-study__title pr-tab__title-tight">
          주문 큐 (상태 전이 + filter + reduce 집계)
        </h2>
        <p>배송 단계 버튼으로 상태를 올리고, 상단 칩으로 목록을 걸러 봅니다. 집계는 reduce 패턴입니다.</p>
        <p className="extended-study__label">화면</p>
        <OrderQueuePanel />
      </section>
    </div>
  )
}
