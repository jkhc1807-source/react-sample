import { useState } from 'react'
import CodeSample from '../../components/CodeSample.jsx'
import ErrorBoundary from '../../components/ErrorBoundary.jsx'
import CustomHookToggleDemo from '../../components/extended/CustomHookToggleDemo.jsx'
import A11yFieldsetDemo from '../../components/extended/A11yFieldsetDemo.jsx'
import ErrorBoundaryTriggerDemo from '../../components/extended/ErrorBoundaryTriggerDemo.jsx'
import { EXT_ERROR, EXT_HOOK, EXT_A11Y } from '../snippets/extendedStudySnippets.js'
import '../ExtendedStudyPage.css'

export default function PracticeQualityTab() {
  const [errKey, setErrKey] = useState(0)

  return (
    <div className="extended-study">
      <section className="extended-study__section">
        <h2 className="extended-study__title pr-tab__title-tight">
          에러 경계
        </h2>
        <CodeSample label="예시 소스 (복붙용)" fileHint="ErrorBoundary.jsx" code={EXT_ERROR} />
        <p className="extended-study__label">화면</p>
        <ErrorBoundary
          key={errKey}
          fallback={
            <div className="extended-demo extended-demo--boundary">
              <p role="alert">자식 컴포넌트에서 오류가 났습니다.</p>
              <button type="button" onClick={() => setErrKey((k) => k + 1)}>
                다시 시도
              </button>
            </div>
          }
        >
          <ErrorBoundaryTriggerDemo />
        </ErrorBoundary>
      </section>

      <section className="extended-study__section">
        <h2 className="extended-study__title pr-tab__title-tight">
          커스텀 훅
        </h2>
        <CodeSample label="예시 소스 (복붙용)" fileHint="useToggle.js" code={EXT_HOOK} />
        <p className="extended-study__label">화면</p>
        <CustomHookToggleDemo />
      </section>

      <section className="extended-study__section">
        <h2 className="extended-study__title pr-tab__title-tight">
          접근성 (fieldset·useId)
        </h2>
        <CodeSample label="예시 소스 (복붙용)" fileHint="A11yFieldsetDemo.jsx" code={EXT_A11Y} />
        <p className="extended-study__label">화면</p>
        <A11yFieldsetDemo />
      </section>
    </div>
  )
}
