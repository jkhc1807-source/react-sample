import { useState, useEffect, useRef } from 'react'
import CodeSample from '../components/CodeSample.jsx'
import {
  PRACT_EVENT,
  PRACT_CONDITIONAL,
  PRACT_EFFECT,
  PRACT_FETCH,
  PRACT_PROPS,
  PRACT_REF,
} from './snippets/practicalReactSnippets.js'
import './snippets/paste/EventBasicsDemo.css'
import './snippets/paste/PostFetchDemo.css'
import './snippets/paste/PropsCardDemo.css'
import eventBasicsDemoCss from './snippets/paste/EventBasicsDemo.css?raw'
import postFetchDemoCss from './snippets/paste/PostFetchDemo.css?raw'
import propsCardDemoCss from './snippets/paste/PropsCardDemo.css?raw'
import './PracticalReactPage.css'

function Card({ title, children }) {
  return (
    <article className="props-card-demo__card">
      <h3 className="props-card-demo__title">{title}</h3>
      <div>{children}</div>
    </article>
  )
}

export function PracticalReactBody() {
  const [clicks, setClicks] = useState(0)
  const [message, setMessage] = useState('')

  const [open, setOpen] = useState(false)

  const [sec, setSec] = useState(0)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [posts, setPosts] = useState([])
  const [fetchDone, setFetchDone] = useState(false)

  const inputRef = useRef(null)

  useEffect(() => {
    const id = window.setInterval(() => {
      setSec((s) => s + 1)
    }, 1000)
    return () => window.clearInterval(id)
  }, [])

  function handleDemoSubmit(e) {
    e.preventDefault()
    window.alert(`보낸 내용: ${message}`)
  }

  async function loadPosts() {
    setLoading(true)
    setFetchDone(false)
    setError(null)
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=4')
      if (!res.ok) throw new Error('서버 응답이 올바르지 않아요')
      setPosts(await res.json())
      setFetchDone(true)
    } catch (e) {
      setError(e instanceof Error ? e.message : '알 수 없는 오류')
      setFetchDone(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section className="practical-react__section">
        <h2>1. 이벤트 — onClick, onChange, 폼 submit</h2>
        <p>
          버튼은 <code>onClick</code>, 입력창은 <code>onChange</code>에 “함수 하나”를 넘깁니다.
          폼에서 <code>e.preventDefault()</code>를 쓰면 브라우저 기본 동작(새로고침)을 막을 수
          있습니다.
        </p>
        <CodeSample
          label="예시 소스 (복붙용)"
          fileHint="src/components/EventBasicsDemo.jsx"
          code={PRACT_EVENT}
        />
        <CodeSample
          label="예시 스타일 (복붙용)"
          fileHint="src/components/EventBasicsDemo.css"
          code={eventBasicsDemoCss.trim()}
        />
        <p className="practical-react__label">화면</p>
        <div className="practical-react__demo">
          <div className="event-basics-demo__toolbar">
            <button type="button" className="practical-react__btn" onClick={() => setClicks((c) => c + 1)}>
              +
            </button>
            <span className="practical-react__mono practical-react__mono--inline">클릭: {clicks}</span>
            <button
              type="button"
              className="practical-react__btn"
              onClick={() => setClicks((c) => Math.max(0, c - 1))}
              disabled={clicks <= 0}
            >
              −
            </button>
          </div>
          <form onSubmit={handleDemoSubmit}>
            <label>
              메모{' '}
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="타이핑해 보세요"
              />
            </label>
            <button type="submit" className="practical-react__btn">
              전송 (새로고침 막기)
            </button>
          </form>
        </div>
      </section>

      <section className="practical-react__section">
        <h2>2. 조건부 렌더링 — {'&&'}, 삼항 연산자</h2>
        <p>
          데이터가 true/false일 때 화면을 갈라 보여줍니다. <code>{'조건 && <컴포넌트 />'}</code>는
          “참일 때만 그린다”, <code>조건 ? A : B</code>는 “둘 중 하나 고른다”로 읽으면 됩니다.
        </p>
        <CodeSample
          label="예시 소스 (복붙용)"
          fileHint="src/components/TogglePanelDemo.jsx"
          code={PRACT_CONDITIONAL}
        />
        <p className="practical-react__label">화면</p>
        <div className="practical-react__demo">
          <button type="button" className="practical-react__btn" onClick={() => setOpen((v) => !v)}>
            패널 {open ? '닫기' : '열기'}
          </button>
          {open && <p className="practical-react__mono">열렸을 때만 보입니다.</p>}
          <p className="practical-react__mono">{open ? '상태: 열림' : '상태: 닫힘'}</p>
        </div>
      </section>

      <section className="practical-react__section">
        <h2>3. useEffect — 화면 밖 일정·구독 정리</h2>
        <p>
          “렌더 결과”가 아니라 <strong>렌더 이후에 해야 할 일</strong>(타이머, API 구독, 외부
          라이브러리 연결)에 씁니다. 두 번째 인자 <code>[]</code>는 “처음 마운트될 때 한 번만”이라는
          뜻에 가깝게 이해하시면 됩니다.
        </p>
        <CodeSample
          label="예시 소스 (복붙용)"
          fileHint="src/components/TimerEffectDemo.jsx"
          code={PRACT_EFFECT}
        />
        <p className="practical-react__label">화면</p>
        <div className="practical-react__demo">
          <p className="practical-react__mono">경과 초: {sec}</p>
          <button type="button" className="practical-react__btn" onClick={() => setSec(0)}>
            숫자만 리셋
          </button>
        </div>
      </section>

      <section className="practical-react__section">
        <h2>4. fetch — 서버에서 데이터 가져오기</h2>
        <p>
          <code>fetch(주소)</code>는 “약속(Promise)”을 돌려줍니다. <code>await</code>로 기다린 뒤{' '}
          <code>json()</code>으로 객체 배열로 바꿉니다. 로딩·에러·결과를 각각 state에 두는 패턴이
          가장 흔합니다.
        </p>
        <CodeSample
          label="예시 소스 (복붙용)"
          fileHint="src/components/PostFetchDemo.jsx"
          code={PRACT_FETCH}
        />
        <CodeSample
          label="예시 스타일 (복붙용)"
          fileHint="src/components/PostFetchDemo.css"
          code={postFetchDemoCss.trim()}
        />
        <p className="practical-react__label">화면</p>
        <div className="practical-react__demo">
          <button type="button" className="practical-react__btn" onClick={loadPosts} disabled={loading}>
            {loading ? '불러오는 중…' : fetchDone && !error ? '불러오기 완료' : '글 불러오기'}
          </button>
          {error && <p className="post-fetch-demo__error">{error}</p>}
          <ul className="practical-react__list">
            {posts.map((p) => (
              <li key={p.id}>{p.title}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="practical-react__section">
        <h2>5. props + children — 부모가 자식에게 넘기는 값·내용</h2>
        <p>
          퍼블리셔 입장에선 <strong>부모 HTML이 자식 블록을 감싸서 내용을 넘기는 것</strong>과 비슷합니다.
          <code>children</code>은 태그 사이에 적은 모든 내용이 들어옵니다.
        </p>
        <CodeSample
          label="예시 소스 (복붙용)"
          fileHint="src/components/PropsCardDemo.jsx"
          code={PRACT_PROPS}
        />
        <CodeSample
          label="예시 스타일 (복붙용)"
          fileHint="src/components/PropsCardDemo.css"
          code={propsCardDemoCss.trim()}
        />
        <p className="practical-react__label">화면</p>
        <div className="practical-react__demo props-card-demo__stack">
          <Card title="공지">
            <p className="props-card-demo__body-text">부모가 넣은 내용이 children 으로 들어갑니다.</p>
          </Card>
          <Card title="이벤트">
            <button type="button" className="practical-react__btn">
              버튼도 children 안에 둘 수 있어요
            </button>
          </Card>
        </div>
      </section>

      <section className="practical-react__section">
        <h2>6. useRef — DOM에 직접 손대야 할 때</h2>
        <p>
          대부분은 state로 충분하지만, <strong>포커스 이동·스크롤 위치·영상 재생</strong>처럼
          “리렌더와 상관없이 DOM만 건드려야 할 때” <code>useRef</code>를 씁니다.
        </p>
        <CodeSample
          label="예시 소스 (복붙용)"
          fileHint="src/components/FocusInputRefDemo.jsx"
          code={PRACT_REF}
        />
        <p className="practical-react__label">화면</p>
        <div className="practical-react__demo">
          <input ref={inputRef} type="text" placeholder="여기로 포커스" />
          <button
            type="button"
            className="practical-react__btn practical-react__btn--stack"
            onClick={() => inputRef.current?.focus()}
          >
            입력칸으로 포커스 이동
          </button>
        </div>
      </section>

      <aside className="practical-react__section" aria-label="다음 단계">
        <h2>다음에 천천히 알아보면 좋은 것들</h2>
        <p>
          여기까지 익숙해지면, 팀마다 자주 쓰는 <strong>UI 라이브러리</strong>(예: 버튼·모달
          컴포넌트), <strong>React Router</strong>(지금 이 프로젝트처럼 여러 페이지), 그리고
          서버 상태 관리용 <strong>TanStack Query</strong> 같은 도구를 순서대로 만나게 됩니다.
          처음부터 전부 할 필요는 없습니다.
        </p>
      </aside>
    </>
  )
}

export default function PracticalReactPage() {
  return (
    <div className="practical-react">
      <header className="practical-react__header">
        <h1 className="practical-react__title">실무에서 자주 쓰는 React 패턴</h1>
        <p className="practical-react__lead">
          HTML·CSS에 익숙하시다면, <strong>JSX</strong>는 “태그 안에 중괄호 <code>{'{}'}</code>로
          자바스크립트 값을 끼워 넣는 HTML”에 가깝게 생각하셔도 됩니다. 아래는{' '}
          <code>map</code>이나 <code>useState</code>만으로 부족할 때, 현업에서 정말 자주 마주치는
          패턴입니다.
        </p>
        <p className="practical-react__tip">
          <strong>팁.</strong> 처음엔 복사한 코드가 왜 동작하는지 한 줄씩만 따라가 보세요.
          자바스크립트 문법은 나중에 깊게 가도, React는 “화면 = 데이터(state)의 결과”라는 감각만
          잡아도 많이 편해집니다.
        </p>
        <ol className="practical-react__path">
          <li>이벤트 → 조건부 렌더링 → useEffect 순으로 읽으면 흐름이 자연스럽습니다.</li>
          <li>서버 통신(fetch)은 버튼 눌렀을 때만 불러오는 예제로 시작했습니다.</li>
          <li>props·ref는 컴포넌트를 나누거나 입력 UX를 다룰 때 씁니다.</li>
        </ol>
      </header>
      <PracticalReactBody />
    </div>
  )
}
