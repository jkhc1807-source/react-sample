import CodeSample from '../../components/CodeSample.jsx'
import PracticeFilterChipsDemo from '../../components/practice/PracticeFilterChipsDemo.jsx'
import PostExplorerPanel from '../../components/practice/PostExplorerPanel.jsx'
import { PR_DIST_CHIPS } from '../snippets/practiceDistributedSnippets.js'
import { PRACTICE_POST_EXPLORER } from '../snippets/practiceHubSnippets.js'
import '../ExtendedStudyPage.css'

export default function PracticeDataTab() {
  return (
    <div className="extended-study">
      <section className="extended-study__section">
        <h2 className="extended-study__title pr-tab__title-tight">필터 칩 · 선택 state와 UI</h2>
        <p>
          목록·테이블 위에서 자주 쓰는 <strong>세그먼트·칩</strong>입니다. 선택된 id 하나를 state로
          두고, 아래 목록은 <code>filter</code>로 그 값에 맞춥니다 (이 데모는 읽기 전용 UI만).
        </p>
        <CodeSample
          label="예시 소스 (복붙용)"
          fileHint="PracticeFilterChipsDemo.jsx + CSS"
          code={PR_DIST_CHIPS}
        />
        <p className="extended-study__label">화면</p>
        <PracticeFilterChipsDemo />
      </section>

      <section className="extended-study__section">
        <h2 className="extended-study__title pr-tab__title-tight">
          게시글 탐색 패널 (디바운스·중단·필터)
        </h2>
        <p>
          공개 API에서 글 목록을 받아 둔 뒤, <strong>작성자</strong>와 <strong>제목·본문 검색</strong>으로
          클라이언트에서 좁힙니다. 검색어는 타이핑 직후가 아니라 짧게 멈춘 뒤에만 반영됩니다.
        </p>
        <CodeSample
          label="패턴 요약 (복붙용)"
          fileHint="src/components/practice/PostExplorerPanel.jsx"
          code={PRACTICE_POST_EXPLORER}
        />
        <p className="extended-study__label">화면</p>
        <PostExplorerPanel />
      </section>
    </div>
  )
}
