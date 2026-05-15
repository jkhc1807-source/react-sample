import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import CodeSample from '../components/CodeSample.jsx'
import ScrollableTabList from '../components/ScrollableTabList.jsx'
import {
  Badge,
  Button,
  Checkbox,
  Modal,
  RadioGroup,
  Select,
  SurfaceCard,
  TextField,
  ToastHost,
  useToasts,
} from '../components/ui'
import {
  UI_KIT_BADGE,
  UI_KIT_BUTTON,
  UI_KIT_CHECKBOX,
  UI_KIT_COUNTER_PATTERN,
  UI_KIT_INLINE_ALERTS,
  UI_KIT_MODAL,
  UI_KIT_RADIO,
  UI_KIT_SELECT,
  UI_KIT_SURFACE_CARD,
  UI_KIT_SURFACE_CARD_USAGE,
  UI_KIT_TEXTFIELD,
  UI_KIT_TEXTFIELD_READONLY,
  UI_KIT_TEXT_LINKS,
  UI_KIT_TODO_PATTERN,
  UI_KIT_TOAST,
  UI_KIT_TYPE_SCALE,
  UI_KIT_PAGE_EXAMPLE,
} from './snippets/uiKitSnippets.js'
import uiKitInlineAlertsCss from './snippets/paste/UiKitInlineAlerts.css?raw'
import './practice/PracticeLayout.css'
import { usePageHeader } from '../hooks/usePageHeader.js'
import './UiKitPage.css'

const toc = [
  { href: '#ui-kit-typography', label: 'Typography' },
  { href: '#ui-kit-alerts', label: 'Alerts' },
  { href: '#ui-kit-links', label: 'Links' },
  { href: '#ui-kit-cards', label: 'Cards' },
  { href: '#ui-kit-buttons', label: 'Buttons' },
  { href: '#ui-kit-textfield', label: 'Text field' },
  { href: '#ui-kit-readonly', label: '읽기 전용' },
  { href: '#ui-kit-forms', label: 'Select · Checkbox' },
  { href: '#ui-kit-counter', label: 'Counter' },
  { href: '#ui-kit-todo', label: 'List · 폼' },
  { href: '#ui-kit-modal', label: 'Modal' },
  { href: '#ui-kit-toast', label: 'Toast' },
  { href: '#ui-kit-compose', label: '합치기' },
]

export default function UiKitPage() {
  const header = usePageHeader('uiKit')
  const { hash } = useLocation()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [fieldError, setFieldError] = useState('')
  const [plan, setPlan] = useState('')
  const [role, setRole] = useState('viewer')
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [newsletter, setNewsletter] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [count, setCount] = useState(0)
  const [pinned, setPinned] = useState(false)
  const [todos, setTodos] = useState(['Learn React', 'Build a project'])
  const [newTodo, setNewTodo] = useState('')
  const [todoNotice, setTodoNotice] = useState(null)
  const { toasts, showToast, dismissToast } = useToasts()

  useEffect(() => {
    if (!todoNotice) return
    const t = setTimeout(() => setTodoNotice(null), 2500)
    return () => clearTimeout(t)
  }, [todoNotice])

  function handleSaveDemo() {
    if (!name.trim()) {
      setFieldError('이름을 입력해 주세요.')
      showToast('입력을 확인해 주세요')
      return
    }
    setFieldError('')
    showToast('저장되었습니다 (데모)')
  }

  function addTodo() {
    const trimmed = newTodo.trim()
    if (!trimmed) {
      setTodoNotice('내용을 입력해 주세요.')
      return
    }
    setTodos((prev) => [...prev, trimmed])
    setNewTodo('')
  }

  return (
    <div className="ui-kit">
      <header className="pr-layout__head">
        <h1 className="pr-layout__title">{header.title}</h1>
        <p className="pr-layout__lead">{header.lead}</p>
        <div className="ui-kit__meta-badges" role="list">
          <span role="listitem">
            <Badge variant="accent">폼</Badge>
          </span>
          <span role="listitem">
            <Badge variant="neutral">피드백</Badge>
          </span>
          <span role="listitem">
            <Badge variant="success">레이아웃</Badge>
          </span>
        </div>
      </header>

      <nav className="ui-kit__toc-nav pr-layout__tabs" aria-label="섹션 바로가기">
        <ScrollableTabList trackClassName="pr-layout__tabs-scroll">
          <span className="ui-kit__jump-label">섹션</span>
          {toc.map(({ href, label }) => {
            const isActive = hash === href
            return (
              <a
                key={href}
                href={href}
                className={`pr-layout__tab${isActive ? ' pr-layout__tab--active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {label}
              </a>
            )
          })}
        </ScrollableTabList>
      </nav>

      <section id="ui-kit-typography" className="ui-kit__section">
        <header className="ui-kit__section-head">
          <h2>Typography</h2>
          <p className="ui-kit__section-desc">
            제목·본문·보조 텍스트의 위계입니다. 학습 페이지와 동일한 토큰을 씁니다.
          </p>
        </header>
        <CodeSample label="예시 소스 (복붙용)" fileHint="UiKitPage.css — .ui-kit__type-*" code={UI_KIT_TYPE_SCALE} />
        <p className="ui-kit__label">라이브 프리뷰</p>
        <div className="ui-kit__demo">
          <div className="ui-kit__type-scale">
            <p className="ui-kit__type-sample ui-kit__type-sample--h1">
              <span className="ui-kit__type-meta">Heading 1</span>
              The Life of UI Kit
            </p>
            <p className="ui-kit__type-sample ui-kit__type-sample--h2">
              <span className="ui-kit__type-meta">Heading 2</span>
              Section title — 학습 단원 머리
            </p>
            <p className="ui-kit__type-sample ui-kit__type-sample--h3">
              <span className="ui-kit__type-meta">Heading 3</span>
              카드·폼 블록 소제목
            </p>
            <p className="ui-kit__type-sample ui-kit__type-sample--body">
              <span className="ui-kit__type-meta">Body</span>
              본문 문단입니다. <code>code</code>는 인라인만, 긴 코드는 CodeSample 블록을 씁니다.
            </p>
            <p className="ui-kit__type-sample ui-kit__type-sample--muted">
              <span className="ui-kit__type-meta">Muted</span>
              부가 설명·메타 정보
            </p>
            <p className="ui-kit__type-sample ui-kit__type-sample--mono">
              <span className="ui-kit__type-meta">Mono</span>
              const path = &apos;/api/users&apos;
            </p>
          </div>
        </div>
      </section>

      <section id="ui-kit-alerts" className="ui-kit__section">
        <header className="ui-kit__section-head">
          <h2>Inline alerts</h2>
          <p className="ui-kit__section-desc">
            페이지 본문 안에 넣는 정적 알림 박스입니다. 컴포넌트 없이 클래스만으로도 재사용
            가능합니다.
          </p>
        </header>
        <CodeSample
          label="예시 소스 (복붙용)"
          fileHint="UiKitInlineAlerts.css와 같은 폴더에 두고 import 경로만 맞추면 됩니다"
          code={UI_KIT_INLINE_ALERTS}
        />
        <CodeSample
          label="예시 스타일 (복붙용)"
          fileHint="UiKitInlineAlerts.css"
          code={uiKitInlineAlertsCss.trim()}
        />
        <p className="ui-kit__label">라이브 프리뷰</p>
        <div className="ui-kit__demo">
          <div className="ui-kit__alerts">
            <div className="ui-kit__alert ui-kit__alert--info" role="status">
              <strong>Info</strong>
              새 기능이 배포되었습니다.
            </div>
            <div className="ui-kit__alert ui-kit__alert--success" role="status">
              <strong>Success</strong>
              저장이 완료되었습니다.
            </div>
            <div className="ui-kit__alert ui-kit__alert--warning" role="alert">
              <strong>Warning</strong>
              되돌릴 수 없는 작업입니다.
            </div>
            <div className="ui-kit__alert ui-kit__alert--danger" role="alert">
              <strong>Danger</strong>
              결제 수단을 갱신해 주세요.
            </div>
          </div>
        </div>
      </section>

      <section id="ui-kit-links" className="ui-kit__section">
        <header className="ui-kit__section-head">
          <h2>Text links</h2>
          <p className="ui-kit__section-desc">
            본문 속 링크는 기본·강조·어두운 톤을 구분하면 샘플 페이지의 보조 액션과 맞출 수
            있습니다.
          </p>
        </header>
        <CodeSample label="예시 소스 (복붙용)" fileHint="UiKitPage.css — .ui-kit__link*" code={UI_KIT_TEXT_LINKS} />
        <p className="ui-kit__label">라이브 프리뷰</p>
        <div className="ui-kit__demo">
          <p className="ui-kit__link-row">
            <a href="#ui-kit-buttons" className="ui-kit__link ui-kit__link--default">
              기본 링크 (같은 페이지 앵커)
            </a>
          </p>
          <p className="ui-kit__link-row">
            <a href="/playground" className="ui-kit__link ui-kit__link--accent">
              강조 링크 → 샘플 모음
            </a>
          </p>
          <p className="ui-kit__link-row">
            <span className="ui-kit__link ui-kit__link--muted">비활성처럼 보이는 텍스트 링크</span>
          </p>
        </div>
      </section>

      <section id="ui-kit-cards" className="ui-kit__section">
        <header className="ui-kit__section-head">
          <h2>SurfaceCard · Badge</h2>
          <p className="ui-kit__section-desc">
            샘플 모음의 <strong>Info 카드</strong>·책 목록의 <strong>뱃지/메타</strong>에 해당하는 패턴입니다.
          </p>
        </header>
        <CodeSample label="Badge 예시 소스" fileHint="src/components/ui/Badge.jsx" code={UI_KIT_BADGE} />
        <CodeSample
          label="SurfaceCard 예시 소스"
          fileHint="src/components/ui/SurfaceCard.jsx"
          code={UI_KIT_SURFACE_CARD}
        />
        <CodeSample
          label="카드·뱃지 조합 예시 (복붙용)"
          fileHint="페이지에서 그리드로 묶는 예"
          code={UI_KIT_SURFACE_CARD_USAGE}
        />
        <p className="ui-kit__label">라이브 프리뷰</p>
        <div className="ui-kit__demo">
          <div className="ui-kit__card-grid">
            <SurfaceCard
              title="Props in React"
              subtitle="Props pass data from one component to another."
              meta={<Badge variant="accent">Topic</Badge>}
              footer="Author: Alice"
            >
              카드 본문에는 설명·리스트·버튼 등을 넣을 수 있습니다.
            </SurfaceCard>
            <SurfaceCard
              title="Composition"
              subtitle="Composition makes components reusable."
              meta={<Badge variant="success">Pattern</Badge>}
              footer="Author: Charlie"
            >
              <Badge variant="neutral">neutral</Badge>{' '}
              <Badge variant="warning">warning</Badge>{' '}
              <Badge variant="danger">danger</Badge>
            </SurfaceCard>
          </div>
        </div>
      </section>

      <section id="ui-kit-buttons" className="ui-kit__section">
        <header className="ui-kit__section-head">
          <h2>Button</h2>
          <p className="ui-kit__section-desc">
            샘플의 커스텀 버튼 대신 공통 <code>Button</code>으로 맞춥니다. <code>variant</code>·<code>size</code>·
            <code>disabled</code>를 조합합니다.
          </p>
        </header>
        <CodeSample label="예시 소스 (복붙용)" fileHint="src/components/ui/Button.jsx" code={UI_KIT_BUTTON} />
        <p className="ui-kit__label">라이브 프리뷰</p>
        <div className="ui-kit__demo">
          <p className="ui-kit__subsection">Variants</p>
          <div className="ui-kit__row">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
          <p className="ui-kit__subsection">Size · state</p>
          <div className="ui-kit__row">
            <Button variant="primary" size="sm">
              Small
            </Button>
            <Button variant="primary" disabled>
              Disabled
            </Button>
          </div>
        </div>
      </section>

      <section id="ui-kit-textfield" className="ui-kit__section">
        <header className="ui-kit__section-head">
          <h2>Text field</h2>
          <p className="ui-kit__section-desc">
            라벨·힌트·에러를 한 톤으로 묶었습니다. 값은 <code>value</code> + <code>onChange</code>로 제어합니다.
          </p>
        </header>
        <CodeSample label="예시 소스 (복붙용)" fileHint="src/components/ui/TextField.jsx" code={UI_KIT_TEXTFIELD} />
        <p className="ui-kit__label">라이브 프리뷰</p>
        <div className="ui-kit__demo">
          <TextField
            label="이름"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              if (fieldError) setFieldError('')
            }}
            placeholder="홍길동"
            hint="실명으로 입력해 주세요"
            error={fieldError}
            required
          />
          <TextField
            label="이메일"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
          />
          <div className="ui-kit__row">
            <Button variant="primary" onClick={handleSaveDemo}>
              저장 (검증 데모)
            </Button>
          </div>
        </div>
      </section>

      <section id="ui-kit-readonly" className="ui-kit__section">
        <header className="ui-kit__section-head">
          <h2>읽기 전용 필드</h2>
          <p className="ui-kit__section-desc">
            샘플 모음의 <strong>사용자명</strong>처럼 표시만 하고 수정하지 않을 때는{' '}
            <code>readOnly</code>를 씁니다. <code>disabled</code>와 달리 포커스·복사가 가능합니다.
          </p>
        </header>
        <CodeSample
          label="예시 소스 (복붙용)"
          fileHint="src/components/ui/TextField.jsx"
          code={UI_KIT_TEXTFIELD_READONLY}
        />
        <p className="ui-kit__label">라이브 프리뷰</p>
        <div className="ui-kit__demo">
          <TextField
            label="username"
            value="yalco.student"
            readOnly
            hint="서버에서 내려준 값을 그대로 보여 줄 때"
          />
        </div>
      </section>

      <section id="ui-kit-forms" className="ui-kit__section">
        <header className="ui-kit__section-head">
          <h2>Select · Checkbox · RadioGroup</h2>
          <p className="ui-kit__section-desc">
            플랜 선택·약관 동의·역할 라디오 등 샘플 폼과 같은 구조입니다.
          </p>
        </header>
        <CodeSample label="Select 예시 소스" fileHint="src/components/ui/Select.jsx" code={UI_KIT_SELECT} />
        <CodeSample label="Checkbox 예시 소스" fileHint="src/components/ui/Checkbox.jsx" code={UI_KIT_CHECKBOX} />
        <CodeSample label="RadioGroup 예시 소스" fileHint="src/components/ui/RadioGroup.jsx" code={UI_KIT_RADIO} />
        <p className="ui-kit__label">라이브 프리뷰</p>
        <div className="ui-kit__demo">
          <Select
            label="플랜"
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
            placeholder="플랜을 선택하세요"
            options={[
              { value: 'basic', label: 'Basic' },
              { value: 'pro', label: 'Pro' },
              { value: 'team', label: 'Team' },
            ]}
            hint="요금제는 나중에 언제든 변경할 수 있습니다."
            required
          />
          <Checkbox
            label="서비스 이용약관에 동의합니다"
            description="필수 항목입니다."
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
          />
          <Checkbox
            label="제품 소식 메일 받기"
            description="선택 사항입니다."
            checked={newsletter}
            onChange={(e) => setNewsletter(e.target.checked)}
          />
          <RadioGroup
            label="역할"
            value={role}
            onChange={setRole}
            options={[
              { value: 'viewer', label: '뷰어 — 읽기만' },
              { value: 'editor', label: '에디터 — 작성·수정' },
              { value: 'admin', label: '관리자 — 멤버·설정' },
            ]}
            hint="프로젝트마다 역할을 다르게 줄 수 있습니다."
          />
        </div>
      </section>

      <section id="ui-kit-counter" className="ui-kit__section">
        <header className="ui-kit__section-head">
          <h2>Counter · 토글</h2>
          <p className="ui-kit__section-desc">
            샘플의 <strong>카운터와 핀</strong>과 같이, 숫자를 <code>output</code>으로 두고 ± 버튼으로
            조정합니다.
          </p>
        </header>
        <CodeSample
          label="예시 소스 (복붙용)"
          fileHint="UiKitPage.css — .ui-kit__counter*"
          code={UI_KIT_COUNTER_PATTERN}
        />
        <p className="ui-kit__label">라이브 프리뷰</p>
        <div className="ui-kit__demo">
          <div className="ui-kit__counter-block">
            <div className="ui-kit__counter" aria-label="카운터">
              <Button variant="secondary" size="sm" type="button" onClick={() => setCount((c) => c - 1)}>
                −
              </Button>
              <output className="ui-kit__counter-value">{count}</output>
              <Button variant="secondary" size="sm" type="button" onClick={() => setCount((c) => c + 1)}>
                +
              </Button>
            </div>
            <Button
              variant={pinned ? 'primary' : 'secondary'}
              size="sm"
              type="button"
              onClick={() => setPinned((p) => !p)}
            >
              {pinned ? '📌 ' : ''}핀 {pinned ? '해제' : '고정'}
            </Button>
          </div>
        </div>
      </section>

      <section id="ui-kit-todo" className="ui-kit__section">
        <header className="ui-kit__section-head">
          <h2>List · 인라인 폼</h2>
          <p className="ui-kit__section-desc">
            샘플의 <strong>할 일 목록</strong>과 같이, 리스트 + 입력 + 추가 버튼 + 짧은 알림을 한 덩어리로
            묶습니다.
          </p>
        </header>
        <CodeSample
          label="예시 소스 (복붙용)"
          fileHint="UiKitPage.css — .ui-kit__todo-*"
          code={UI_KIT_TODO_PATTERN}
        />
        <p className="ui-kit__label">라이브 프리뷰</p>
        <div className="ui-kit__demo">
          <h3 className="ui-kit__todo-heading">Todo List</h3>
          <ul className="ui-kit__todo-list">
            {todos.map((todo, index) => (
              <li key={`${todo}-${index}`} className="ui-kit__todo-item">
                <span className="ui-kit__todo-text">{todo}</span>
                <Button variant="ghost" size="sm" type="button" onClick={() => setTodos((t) => t.filter((_, i) => i !== index))}>
                  Delete
                </Button>
              </li>
            ))}
          </ul>
          <p className="ui-kit__todo-typing">
            입력 중: <span>{newTodo || '—'}</span>
          </p>
          <div className="ui-kit__todo-form">
            <TextField
              label="새 할 일"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="할 일을 입력하세요"
            />
            <Button variant="primary" type="button" onClick={addTodo}>
              Add task
            </Button>
          </div>
          {todoNotice ? (
            <div className="ui-kit__todo-notice" role="status">
              {todoNotice}
            </div>
          ) : null}
        </div>
      </section>

      <section id="ui-kit-modal" className="ui-kit__section">
        <header className="ui-kit__section-head">
          <h2>Modal</h2>
          <p className="ui-kit__section-desc">
            배경 클릭·<kbd>Esc</kbd>·닫기로 <code>onClose</code>를 호출합니다.
          </p>
        </header>
        <CodeSample label="예시 소스 (복붙용)" fileHint="src/components/ui/Modal.jsx" code={UI_KIT_MODAL} />
        <p className="ui-kit__label">라이브 프리뷰</p>
        <div className="ui-kit__demo">
          <Button variant="secondary" onClick={() => setModalOpen(true)}>
            약관 열기
          </Button>
          <Modal
            open={modalOpen}
            title="샘플 약관"
            onClose={() => setModalOpen(false)}
            footer={
              <Button variant="primary" onClick={() => setModalOpen(false)}>
                확인
              </Button>
            }
          >
            <p className="ui-kit__modal-text">
              모달 본문에는 긴 텍스트·폼·이미지 등 무엇이든 넣을 수 있습니다.
            </p>
          </Modal>
        </div>
      </section>

      <section id="ui-kit-toast" className="ui-kit__section">
        <header className="ui-kit__section-head">
          <h2>ToastHost + useToasts</h2>
          <p className="ui-kit__section-desc">
            짧은 피드백은 토스트로. <code>showToast(&apos;메시지&apos;)</code>로 쌓입니다.
          </p>
        </header>
        <CodeSample label="예시 소스 (복붙용)" fileHint="src/components/ui/useToasts.js · ToastHost.jsx" code={UI_KIT_TOAST} />
        <p className="ui-kit__label">라이브 프리뷰</p>
        <div className="ui-kit__demo">
          <div className="ui-kit__row">
            <Button variant="secondary" onClick={() => showToast('짧은 알림입니다.')}>
              토스트 하나
            </Button>
            <Button variant="ghost" onClick={() => showToast('조금 더 긴 메시지도 아래에 쌓여 보입니다.', 4000)}>
              긴 토스트
            </Button>
          </div>
        </div>
      </section>

      <section id="ui-kit-compose" className="ui-kit__section">
        <header className="ui-kit__section-head">
          <h2>한 페이지에 합치기</h2>
          <p className="ui-kit__section-desc">
            레이아웃 루트에 <code>ToastHost</code>를 한 번 두고, 폼·모달과 함께 쓰는 예시입니다.
          </p>
        </header>
        <CodeSample label="예시 소스 (복붙용)" fileHint="App.jsx 예시" code={UI_KIT_PAGE_EXAMPLE} />
      </section>

      <ToastHost toasts={toasts} onDismiss={dismissToast} />
    </div>
  )
}
