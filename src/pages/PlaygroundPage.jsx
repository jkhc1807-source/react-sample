import CodeSample from '../components/CodeSample.jsx'
import BasicExpressions from '../components/playground/BasicExpressions.jsx'
import ObjectArrayExpressions from '../components/playground/ObjectArrayExpressions.jsx'
import FunctionExpressions from '../components/playground/FunctionExpressions.jsx'
import ElementExpressions from '../components/playground/ElementExpressions.jsx'
import BooksPublishedSection from '../components/playground/BooksPublishedSection.jsx'
import UsernameReadonlyField from '../components/playground/UsernameReadonlyField.jsx'
import SampleButtonsRow from '../components/playground/SampleButtonsRow.jsx'
import ReactLogoHero from '../components/playground/ReactLogoHero.jsx'
import CounterPinSection from '../components/playground/CounterPinSection.jsx'
import InfoCardsSection from '../components/playground/InfoCardsSection.jsx'
import TodoListSection from '../components/playground/TodoListSection.jsx'
import {
  PG_REACT_LOGO,
  PG_SAMPLE_BUTTONS,
  PG_USERNAME,
  PG_BOOKS,
  PG_BASIC,
  PG_OBJECT_ARRAY,
  PG_FUNCTIONS,
  PG_ELEMENT,
  PG_INFO_CARDS,
  PG_COUNTER,
  PG_TODO,
} from './snippets/playgroundSnippets.js'
import './PlaygroundPage.css'

const EXTERNAL_CODESANDBOX_URL = 'https://codesandbox.io/p/sandbox/2x4cck'

export default function PlaygroundPage() {
  return (
    <div className="playground-page">
      <header className="playground-page__header">
        <h1 className="playground-page__title">샘플 모음 (기초 예제)</h1>
        <p className="playground-page__lead">
          강의·튜토리얼에서 자주 나오는 작은 조각들을 한 페이지에 모았습니다. 모바일에서도 줄바꿈과
          그리드가 깨지지 않도록 정리했습니다. JSX를 넓게 실험하려면{' '}
          <a
            href={EXTERNAL_CODESANDBOX_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="playground-page__codepen-link"
          >
            CodeSandbox에서 열기
          </a>
          하세요 (새 탭).
        </p>
      </header>

      <section className="playground-section">
        <h2>React 로고</h2>
        <CodeSample
          label="예시 소스 (복붙용)"
          fileHint="src/components/playground/ReactLogoHero.jsx"
          code={PG_REACT_LOGO}
        />
        <p className="playground-page__demo-label">화면</p>
        <ReactLogoHero />
      </section>

      <section className="playground-section">
        <h2>버튼 두 개 (ButtonA / ButtonB)</h2>
        <CodeSample
          label="예시 소스 (복붙용)"
          fileHint="src/components/playground/SampleButtonsRow.jsx"
          code={PG_SAMPLE_BUTTONS}
        />
        <p className="playground-page__demo-label">화면</p>
        <SampleButtonsRow />
      </section>

      <section className="playground-section">
        <h2>사용자명 필드</h2>
        <CodeSample
          label="예시 소스 (복붙용)"
          fileHint="src/components/playground/UsernameReadonlyField.jsx"
          code={PG_USERNAME}
        />
        <p className="playground-page__demo-label">화면</p>
        <UsernameReadonlyField />
      </section>

      <section className="playground-section">
        <h2>출간한 책만 보기</h2>
        <CodeSample
          label="예시 소스 (복붙용)"
          fileHint="src/components/playground/BooksPublishedSection.jsx"
          code={PG_BOOKS}
        />
        <p className="playground-page__demo-label">화면</p>
        <BooksPublishedSection />
      </section>

      <section className="playground-section">
        <h2>JSX 기본 표현식</h2>
        <CodeSample
          label="예시 소스 (복붙용)"
          fileHint="src/components/playground/BasicExpressions.jsx"
          code={PG_BASIC}
        />
        <p className="playground-page__demo-label">화면</p>
        <BasicExpressions />
      </section>

      <section className="playground-section">
        <h2>객체와 배열</h2>
        <CodeSample
          label="예시 소스 (복붙용)"
          fileHint="src/components/playground/ObjectArrayExpressions.jsx"
          code={PG_OBJECT_ARRAY}
        />
        <p className="playground-page__demo-label">화면</p>
        <ObjectArrayExpressions />
      </section>

      <section className="playground-section">
        <h2>JSX 안에서 함수 호출</h2>
        <CodeSample
          label="예시 소스 (복붙용)"
          fileHint="src/components/playground/FunctionExpressions.jsx"
          code={PG_FUNCTIONS}
        />
        <p className="playground-page__demo-label">화면</p>
        <FunctionExpressions />
      </section>

      <section className="playground-section">
        <h2>변수에 담긴 엘리먼트</h2>
        <CodeSample
          label="예시 소스 (복붙용)"
          fileHint="src/components/playground/ElementExpressions.jsx"
          code={PG_ELEMENT}
        />
        <p className="playground-page__demo-label">화면</p>
        <ElementExpressions />
      </section>

      <section className="playground-section">
        <h2>Info 카드 (props)</h2>
        <CodeSample
          label="예시 소스 (복붙용)"
          fileHint="src/components/playground/InfoCardsSection.jsx"
          code={PG_INFO_CARDS}
        />
        <p className="playground-page__demo-label">화면</p>
        <InfoCardsSection />
      </section>

      <section className="playground-section">
        <h2>카운터와 핀</h2>
        <CodeSample
          label="예시 소스 (복붙용)"
          fileHint="src/components/playground/CounterPinSection.jsx"
          code={PG_COUNTER}
        />
        <p className="playground-page__demo-label">화면</p>
        <CounterPinSection />
      </section>

      <section className="playground-section">
        <h2>할 일 목록</h2>
        <CodeSample
          label="예시 소스 (복붙용)"
          fileHint="src/components/playground/TodoListSection.jsx"
          code={PG_TODO}
        />
        <p className="playground-page__demo-label">화면</p>
        <TodoListSection />
      </section>
    </div>
  )
}
