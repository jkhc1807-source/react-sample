import { useState } from 'react'
import CodeSample from '../components/CodeSample.jsx'
import { Button, TextField, Select, Checkbox, RadioGroup, Modal, ToastHost, useToasts } from '../components/ui'
import {
  UI_KIT_BUTTON,
  UI_KIT_TEXTFIELD,
  UI_KIT_SELECT,
  UI_KIT_CHECKBOX,
  UI_KIT_RADIO,
  UI_KIT_MODAL,
  UI_KIT_TOAST,
  UI_KIT_PAGE_EXAMPLE,
} from './snippets/uiKitSnippets.js'
import './UiKitPage.css'

export default function UiKitPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [fieldError, setFieldError] = useState('')
  const [plan, setPlan] = useState('')
  const [role, setRole] = useState('viewer')
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [newsletter, setNewsletter] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const { toasts, showToast, dismissToast } = useToasts()

  function handleSaveDemo() {
    if (!name.trim()) {
      setFieldError('이름을 입력해 주세요.')
      showToast('입력을 확인해 주세요')
      return
    }
    setFieldError('')
    showToast('저장되었습니다 (데모)')
  }

  return (
    <div className="ui-kit">
      <header className="ui-kit__header">
        <h1 className="ui-kit__title">UI 컴포넌트 키트</h1>
        <p className="ui-kit__lead">
          퍼블리셔 입장에선 <strong>HTML/CSS 조각을 한 덩어리로 묶은 것</strong>이 React의
          컴포넌트입니다. 버튼·입력·팝업(모달)·토스트는 거의 모든 서비스에서 반복되니, 작은
          단위로 만들어 두고 <code>import</code>해서 붙이는 방식이 실무에서 흔합니다.
        </p>
        <p className="ui-kit__tip">
          이 프로젝트에는 <code>src/components/ui/</code> 폴더에 예시 구현을 넣어 두었습니다(버튼,
          텍스트 필드, 셀렉트, 체크박스, 라디오 그룹, 모달, 토스트).
          CSS 파일도 같은 폴더에 있으니, 복사할 때 <strong>jsx와 css를 함께</strong> 가져가면
          됩니다.
        </p>
      </header>

      <section className="ui-kit__section">
        <h2>1. Button — 역할·크기·비활성</h2>
        <p>
          <code>variant</code>로 색 맛을 바꾸고, <code>size=&quot;sm&quot;</code>으로 작은 버튼을 씁니다.
          폼 안에서 제출용이면 <code>type=&quot;submit&quot;</code>을 명시하세요.
        </p>
        <CodeSample label="예시 소스 (복붙용)" fileHint="src/components/ui/Button.jsx" code={UI_KIT_BUTTON} />
        <p className="ui-kit__label">화면</p>
        <div className="ui-kit__demo">
          <div className="ui-kit__row">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="primary" size="sm">
              Small
            </Button>
            <Button variant="primary" disabled>
              Disabled
            </Button>
          </div>
        </div>
      </section>

      <section className="ui-kit__section">
        <h2>2. TextField — 라벨·힌트·에러</h2>
        <p>
          <code>label</code>과 <code>input</code>을 묶고, <code>hint</code>는 도움말,
          <code>error</code>가 있으면 빨간 안내와 스타일이 바뀝니다. 값은 부모 state의{' '}
          <code>value</code> + <code>onChange</code>로 제어합니다.
        </p>
        <CodeSample
          label="예시 소스 (복붙용)"
          fileHint="src/components/ui/TextField.jsx"
          code={UI_KIT_TEXTFIELD}
        />
        <p className="ui-kit__label">화면</p>
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

      <section className="ui-kit__section">
        <h2>3. Select · Checkbox · RadioGroup</h2>
        <p>
          <strong>Select</strong>는 <code>TextField</code>와 같은 <code>.ui-field</code> 래퍼로 라벨·힌트·에러
          톤을 맞춥니다. <strong>Checkbox</strong>는 라벨·설명을 한 블록으로 정렬하고,{' '}
          <strong>RadioGroup</strong>은 <code>fieldset</code>으로 묶어 한 값만 선택되게 합니다.
        </p>
        <CodeSample
          label="Select 예시 소스"
          fileHint="src/components/ui/Select.jsx"
          code={UI_KIT_SELECT}
        />
        <CodeSample
          label="Checkbox 예시 소스"
          fileHint="src/components/ui/Checkbox.jsx"
          code={UI_KIT_CHECKBOX}
        />
        <CodeSample
          label="RadioGroup 예시 소스"
          fileHint="src/components/ui/RadioGroup.jsx"
          code={UI_KIT_RADIO}
        />
        <p className="ui-kit__label">화면</p>
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
            description="필수 항목입니다. 체크하지 않으면 가입이 진행되지 않습니다."
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
          />
          <Checkbox
            label="제품 소식 메일 받기"
            description="선택 사항입니다. 마이페이지에서 언제든 해제할 수 있습니다."
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

      <section className="ui-kit__section">
        <h2>4. Modal — 팝업(다이얼로그)</h2>
        <p>
          배경을 누르거나 <kbd>Esc</kbd>, 닫기 버튼으로 <code>onClose</code>를 호출합니다. 열릴
          때 <code>body</code> 스크롤을 잠그는 정도만 넣었습니다(실무에선 포커스 트랩 등을 더
          넣기도 합니다).
        </p>
        <CodeSample label="예시 소스 (복붙용)" fileHint="src/components/ui/Modal.jsx" code={UI_KIT_MODAL} />
        <p className="ui-kit__label">화면</p>
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
              모달 본문에는 긴 텍스트·폼·이미지 등 무엇이든 넣을 수 있습니다. 퍼블리셔 분들은
              기존에 만든 마크업을 그대로 children으로 옮겨 오시면 됩니다.
            </p>
          </Modal>
        </div>
      </section>

      <section className="ui-kit__section">
        <h2>5. ToastHost + useToasts — 하단 알림</h2>
        <p>
          사용자에게 잠깐 피드백을 줄 때 씁니다. <code>showToast(&apos;메시지&apos;)</code>로
          쌓이고, 시간이 지나면 사라지거나 ×로 닫을 수 있습니다.
        </p>
        <CodeSample label="예시 소스 (복붙용)" fileHint="src/components/ui/useToasts.js · ToastHost.jsx" code={UI_KIT_TOAST} />
        <p className="ui-kit__label">화면</p>
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

      <section className="ui-kit__section">
        <h2>6. 한 페이지에 합치기</h2>
        <p>
          아래는 위 컴포넌트들을 <code>App</code> 같은 상위 컴포넌트에서 함께 쓰는 흐름 예시입니다.
          <code>ToastHost</code>는 보통 화면 맨 바깥(레이아웃 루트)에 한 번만 둡니다.
        </p>
        <CodeSample label="예시 소스 (복붙용)" fileHint="App.jsx 예시" code={UI_KIT_PAGE_EXAMPLE} />
      </section>

      <ToastHost toasts={toasts} onDismiss={dismissToast} />
    </div>
  )
}
