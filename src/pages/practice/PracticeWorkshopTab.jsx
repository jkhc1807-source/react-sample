import CodeSample from '../../components/CodeSample.jsx'
import FormCycleDemo from '../../components/extended/FormCycleDemo.jsx'
import ListKeyDemo from '../../components/extended/ListKeyDemo.jsx'
import OrderQueuePanel from '../../components/practice/OrderQueuePanel.jsx'
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
