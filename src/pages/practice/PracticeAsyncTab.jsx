import CodeSample from '../../components/CodeSample.jsx'
import EffectCleanupDemo from '../../components/extended/EffectCleanupDemo.jsx'
import PostsAsyncDemo from '../../components/extended/PostsAsyncDemo.jsx'
import EffectDepsStaleDemo from '../../components/extended/EffectDepsStaleDemo.jsx'
import {
  EXT_EFFECT_CLEANUP,
  EXT_POSTS,
  EXT_DEPS_STALE,
} from '../snippets/extendedStudySnippets.js'
import '../ExtendedStudyPage.css'

export default function PracticeAsyncTab() {
  return (
    <div className="extended-study">
      <section className="extended-study__section">
        <h2 className="extended-study__title" style={{ fontSize: '1.2rem' }}>
          effect 정리 — 인터벌·fetch 취소
        </h2>
        <CodeSample label="예시 소스 (복붙용)" fileHint="EffectCleanupDemo.jsx" code={EXT_EFFECT_CLEANUP} />
        <p className="extended-study__label">화면</p>
        <EffectCleanupDemo />
      </section>

      <section className="extended-study__section">
        <h2 className="extended-study__title" style={{ fontSize: '1.2rem' }}>
          비동기 화면 상태 (로딩·오류·빈 목록)
        </h2>
        <CodeSample label="예시 소스 (복붙용)" fileHint="PostsAsyncDemo.jsx" code={EXT_POSTS} />
        <p className="extended-study__label">화면</p>
        <PostsAsyncDemo />
      </section>

      <section className="extended-study__section">
        <h2 className="extended-study__title" style={{ fontSize: '1.2rem' }}>
          의존성 배열과 고착 값
        </h2>
        <CodeSample label="예시 소스 (복붙용)" fileHint="EffectDepsStaleDemo.jsx" code={EXT_DEPS_STALE} />
        <p className="extended-study__label">화면</p>
        <EffectDepsStaleDemo />
      </section>
    </div>
  )
}
