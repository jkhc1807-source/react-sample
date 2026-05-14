import { useState } from 'react'
import CodeSample from '../components/CodeSample.jsx'
import {
  STATE_SNIPPET_1,
  STATE_SNIPPET_2,
  STATE_SNIPPET_3,
  STATE_SNIPPET_4,
  STATE_SNIPPET_5,
  STATE_SNIPPET_6,
  STATE_SNIPPET_7,
  STATE_SNIPPET_8,
} from './snippets/stateStudySnippets.js'
import './snippets/paste/IdListRemoveDemo.css'
import './snippets/paste/TaskToggleDemo.css'
import './snippets/paste/SplitAndFormDemo.css'
import './snippets/paste/CounterDemo.css'
import './snippets/paste/FruitListDemo.css'
import idListRemoveDemoCss from './snippets/paste/IdListRemoveDemo.css?raw'
import taskToggleDemoCss from './snippets/paste/TaskToggleDemo.css?raw'
import splitAndFormDemoCss from './snippets/paste/SplitAndFormDemo.css?raw'
import counterDemoCss from './snippets/paste/CounterDemo.css?raw'
import fruitListDemoCss from './snippets/paste/FruitListDemo.css?raw'
import './StateStudyPage.css'

export default function StateStudyPage() {
  const [count, setCount] = useState(0)
  const [user, setUser] = useState({ name: 'Kim', role: 'guest' })
  const [items, setItems] = useState(['사과', '바나나'])
  const [ids, setIds] = useState(['a', 'b', 'c'])
  const [tasks, setTasks] = useState([
    { id: 1, text: '공부', done: false },
    { id: 2, text: '운동', done: true },
  ])
  const [name, setName] = useState('')
  const [age, setAge] = useState(0)
  const [form, setForm] = useState({ title: '', body: '' })
  const [lazyCount, setLazyCount] = useState(() => Number(sessionStorage.getItem('fnStateLazy') || 0))
  const [panelOpen, setPanelOpen] = useState(false)

  const fruitListPasteStyles = `${fruitListDemoCss.trim()}\n\n/* --- src/components/CounterDemo.css (버튼) --- */\n${counterDemoCss.trim()}`

  return (
    <div className="state-study">
      <header className="state-study__header">
        <h2 className="state-study__title">useState() 샘플</h2>
        <p className="state-study__lead">
          <code>useState</code>는 컴포넌트 안에서 바뀌는 값을 만들고, <code>setState</code>로
          갱신합니다. 갱신은 가능하면 <strong>새 값·새 객체·새 배열</strong>을 만들어 넣는
          불변(immutable) 패턴이 React에 잘 맞습니다.
        </p>
      </header>

      <section className="state-study__section">
        <h2>1. 숫자 state와 함수형 업데이트</h2>
        <p>
          같은 이벤트에서 여러 번 갱신하거나, 이전 값에 의존할 때는{' '}
          <code>setCount((c) =&gt; c + 1)</code>처럼 <strong>함수를 넘기는 형태</strong>가
          안전합니다.
        </p>
        <CodeSample
          label="예시 소스 (복붙용)"
          fileHint="src/components/CounterDemo.jsx"
          code={STATE_SNIPPET_1}
        />
        <CodeSample
          label="예시 스타일 (복붙용)"
          fileHint="src/components/CounterDemo.css"
          code={counterDemoCss.trim()}
        />
        <p className="state-study__label">화면</p>
        <p className="counter-demo__line">count = {count}</p>
        <div className="counter-demo__actions">
          <button type="button" className="counter-demo__btn" onClick={() => setCount((c) => c + 1)}>
            +1
          </button>
          <button type="button" className="counter-demo__btn" onClick={() => setCount(0)}>
            리셋
          </button>
        </div>
      </section>

      <section className="state-study__section">
        <h2>2. 객체 state — 스프레드로 일부만 바꾸기</h2>
        <p>
          객체는 통째로 바꿉니다. <code>{'{ ...user, name: 새값 }'}</code>처럼 이전 값을 펼친 뒤
          덮어씁니다.
        </p>
        <CodeSample
          label="예시 소스 (복붙용)"
          fileHint="src/components/UserObjectDemo.jsx"
          code={STATE_SNIPPET_2}
        />
        <CodeSample
          label="예시 스타일 (복붙용)"
          fileHint="src/components/CounterDemo.css"
          code={counterDemoCss.trim()}
        />
        <p className="state-study__label">화면</p>
        <p className="counter-demo__line">
          {user.name} / {user.role}
        </p>
        <button
          type="button"
          className="counter-demo__btn"
          onClick={() => setUser((u) => ({ ...u, name: u.name === 'Kim' ? 'Lee' : 'Kim' }))}
        >
          이름 Kim ↔ Lee
        </button>
      </section>

      <section className="state-study__section">
        <h2>3. 배열에 추가 (불변)</h2>
        <p>
          <code>[...prev, 새항목]</code>으로 새 배열을 만듭니다. <code>push</code>로 같은 배열을
          고치면 React가 변경을 놓칠 수 있습니다.
        </p>
        <CodeSample
          label="예시 소스 (복붙용)"
          fileHint="src/components/FruitListDemo.jsx"
          code={STATE_SNIPPET_3}
        />
        <CodeSample
          label="예시 스타일 (복붙용)"
          fileHint="src/components/FruitListDemo.css · CounterDemo.css"
          code={fruitListPasteStyles}
        />
        <p className="state-study__label">화면</p>
        <ul className="fruit-list-demo__list">
          {items.map((x, i) => (
            <li key={`${x}-${i}`}>{x}</li>
          ))}
        </ul>
        <button type="button" className="counter-demo__btn" onClick={() => setItems((prev) => [...prev, '오렌지'])}>
          오렌지 추가
        </button>
      </section>

      <section className="state-study__section">
        <h2>4. 배열에서 삭제 — filter</h2>
        <p>
          <code>filter</code>로 빼고 싶은 요소를 제외한 <strong>새 배열</strong>을 넣습니다.
        </p>
        <CodeSample
          label="예시 소스 (복붙용)"
          fileHint="src/components/IdListRemoveDemo.jsx"
          code={STATE_SNIPPET_4}
        />
        <CodeSample
          label="예시 스타일 (복붙용)"
          fileHint="src/components/IdListRemoveDemo.css"
          code={idListRemoveDemoCss.trim()}
        />
        <p className="state-study__label">화면 (항목 클릭 시 삭제)</p>
        <ul className="id-list-remove-demo__list">
          {ids.map((id) => (
            <li key={id}>
              <button
                type="button"
                className="id-list-remove-demo__btn"
                onClick={() => setIds((prev) => prev.filter((x) => x !== id))}
              >
                {id} 삭제
              </button>
            </li>
          ))}
        </ul>
        {ids.length === 0 && <p className="state-study__hint">모두 지웠습니다. 새로고침하면 초기값으로 돌아갑니다.</p>}
      </section>

      <section className="state-study__section">
        <h2>5. 배열 안 객체 수정 — map으로 복사·교체</h2>
        <p>
          한 항목만 바꿀 때는 <code>map</code>으로 해당 id만 새 객체로 바꾸고 나머지는 그대로 둡니다.
        </p>
        <CodeSample
          label="예시 소스 (복붙용)"
          fileHint="src/components/TaskToggleDemo.jsx"
          code={STATE_SNIPPET_5}
        />
        <CodeSample
          label="예시 스타일 (복붙용)"
          fileHint="src/components/TaskToggleDemo.css"
          code={taskToggleDemoCss.trim()}
        />
        <p className="state-study__label">화면 (행 클릭으로 완료 토글)</p>
        <ul className="task-toggle-demo__list">
          {tasks.map((t) => (
            <li key={t.id} className="task-toggle-demo__item">
              <button
                type="button"
                className={`task-toggle-demo__toggle${t.done ? ' task-toggle-demo__toggle--done' : ''}`}
                onClick={() =>
                  setTasks((prev) =>
                    prev.map((x) => (x.id === t.id ? { ...x, done: !x.done } : x))
                  )
                }
              >
                {t.done ? '✓ ' : ''}
                {t.text}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="state-study__section">
        <h2>6. 여러 useState vs 객체 하나</h2>
        <p>
          서로 독립이면 <code>useState</code>를 여러 개 두어도 됩니다. 폼처럼 묶여 있으면 객체
          한 덩어리로 두고 필드만{' '}
          <code>{'setForm((f) => ({ ...f, title: e.target.value }))'}</code>
          처럼 갱신하기도 합니다.
        </p>
        <CodeSample
          label="예시 소스 (복붙용)"
          fileHint="src/components/SplitAndFormDemo.jsx"
          code={STATE_SNIPPET_6}
        />
        <CodeSample
          label="예시 스타일 (복붙용)"
          fileHint="src/components/SplitAndFormDemo.css"
          code={splitAndFormDemoCss.trim()}
        />
        <p className="state-study__label">화면</p>
        <div className="state-study__form-block split-and-form-demo__section">
          <label className="state-study__field">
            name (별도 state)
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="입력" />
          </label>
          <label className="state-study__field">
            age (별도 state)
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(Number(e.target.value) || 0)}
            />
          </label>
          <p className="state-study__mono">
            → {name || '(이름 없음)'}, age {age}
          </p>
        </div>
        <div className="state-study__form-block">
          <label className="state-study__field">
            title (form 객체)
            <input
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="제목"
            />
          </label>
          <label className="state-study__field">
            body (form 객체)
            <input
              value={form.body}
              onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
              placeholder="본문"
            />
          </label>
          <p className="state-study__mono">
            → title: {form.title || '—'} / body: {form.body || '—'}
          </p>
        </div>
      </section>

      <section className="state-study__section">
        <h2>7. 초기값이 무거울 때 — lazy initializer</h2>
        <p>
          <code>useState(() =&gt; ...)</code>에 함수를 넘기면 <strong>첫 렌더 때 한 번만</strong> 실행됩니다.
          아래 숫자는 세션 스토리지에 저장됩니다(탭 단위).
        </p>
        <CodeSample label="예시 소스 (복붙용)" fileHint="임의 컴포넌트" code={STATE_SNIPPET_7} />
        <CodeSample
          label="예시 스타일 (복붙용)"
          fileHint="src/components/CounterDemo.css"
          code={counterDemoCss.trim()}
        />
        <p className="state-study__label">화면</p>
        <p className="counter-demo__line">lazyCount = {lazyCount}</p>
        <button
          type="button"
          className="counter-demo__btn"
          onClick={() =>
            setLazyCount((c) => {
              const n = c + 1
              sessionStorage.setItem('fnStateLazy', String(n))
              return n
            })
          }
        >
          +1 (sessionStorage에 저장)
        </button>
      </section>

      <section className="state-study__section">
        <h2>8. 불리언 토글 — 함수형 업데이트</h2>
        <p>열림/닫힘처럼 이전 값의 반대로만 바꿀 때는 <code>setOpen((v) =&gt; !v)</code> 형태가 안전합니다.</p>
        <CodeSample label="예시 소스 (복붙용)" fileHint="임의 컴포넌트" code={STATE_SNIPPET_8} />
        <CodeSample
          label="예시 스타일 (복붙용)"
          fileHint="src/components/CounterDemo.css"
          code={counterDemoCss.trim()}
        />
        <p className="state-study__label">화면</p>
        <button type="button" className="counter-demo__btn" onClick={() => setPanelOpen((v) => !v)}>
          패널 {panelOpen ? '닫기' : '열기'}
        </button>
        {panelOpen ? <p className="state-study__hint state-study__hint--stack">열린 상태입니다. 다시 누르면 닫힙니다.</p> : null}
      </section>
    </div>
  )
}
