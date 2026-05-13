import { useState, useMemo, Fragment } from 'react'
import CodeSample from '../components/CodeSample.jsx'
import {
  MAP_SNIPPET_1,
  MAP_SNIPPET_2,
  MAP_SNIPPET_3,
  MAP_SNIPPET_4,
  MAP_SNIPPET_5,
  MAP_SNIPPET_6,
  MAP_SNIPPET_7,
  MAP_SNIPPET_8,
  MAP_SNIPPET_9,
  MAP_SNIPPET_10,
} from './snippets/mapStudySnippets.js'
import './MapStudyPage.css'

const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const products = [
  { id: 'p1', name: '노트북', price: 1200000 },
  { id: 'p2', name: '마우스', price: 35000 },
  { id: 'p3', name: '키보드', price: 89000 },
]

const scores = [72, 55, 88, 91, 60]

const gridRows = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
]

const glossary = [
  { id: 'g1', term: 'props', desc: '부모 → 자식으로 넘기는 데이터' },
  { id: 'g2', term: 'state', desc: '컴포넌트 안에서 바뀌는 값' },
  { id: 'g3', term: 'key', desc: '리스트에서 형제 사이 고유 식별' },
]

export default function MapStudyPage() {
  const [tags, setTags] = useState(['React', 'map', '배열'])
  const [glossQuery, setGlossQuery] = useState('')

  const filteredGlossary = useMemo(
    () => glossary.filter((g) => g.term.toLowerCase().includes(glossQuery.trim().toLowerCase())),
    [glossQuery],
  )

  return (
    <div className="map-study">
      <header className="map-study__header">
        <h2 className="map-study__title">Array.prototype.map() 샘플</h2>
        <p className="map-study__lead">
          <code>map</code>은 배열의 각 요소를 변환해 <strong>새 배열</strong>을 만듭니다. React에서는
          목록 UI를 만들 때 JSX 요소 배열로 바꿔 <code>{'{}'}</code> 안에 넣어 씁니다.
        </p>
      </header>

      <section className="map-study__section">
        <h2>1. 숫자 배열 → 리스트</h2>
        <p>
          각 숫자를 <code>&lt;li&gt;</code>로 바꿉니다. 예시 소스의 <code>nums</code>와 아래 목록이
          같은 배열을 씁니다.
        </p>
        <CodeSample
          label="예시 소스 (복붙용)"
          fileHint="src/components/NumberListDemo.jsx"
          code={MAP_SNIPPET_1}
        />
        <p className="map-study__label">화면 (10개 모두)</p>
        <ul className="map-study__demo-list map-study__demo-list--cols">
          {nums.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      </section>

      <section className="map-study__section">
        <h2>2. 객체 배열 → 표</h2>
        <p>객체에는 보통 <code>id</code> 같은 고유 값을 두고 <code>key={'{item.id}'}</code>로 씁니다.</p>
        <CodeSample
          label="예시 소스 (복붙용)"
          fileHint="src/components/ProductTableDemo.jsx"
          code={MAP_SNIPPET_2}
        />
        <p className="map-study__label">화면 (행 3개 모두)</p>
        <table className="map-study__table">
          <thead>
            <tr>
              <th>id</th>
              <th>이름</th>
              <th>가격</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item.id}>
                <td><code>{item.id}</code></td>
                <td>{item.name}</td>
                <td>{item.price.toLocaleString('ko-KR')}원</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="map-study__section">
        <h2>3. 두 번째 인자: index</h2>
        <p>
          <code>map((요소, 인덱스) =&gt; ...)</code> 형태입니다. <strong>key에 index만 쓰는 건</strong>
          항목 순서가 바뀌거나 삽입될 때 비효율·버그가 나기 쉬워, 가능하면 데이터의 고유 id를 쓰세요.
        </p>
        <CodeSample
          label="예시 소스 (복붙용)"
          fileHint="src/components/ScoreChipsDemo.jsx"
          code={MAP_SNIPPET_3}
        />
        <p className="map-study__label">화면 (칩 5개 모두)</p>
        <div className="map-study__chips">
          {scores.map((score, index) => (
            <span className="map-study__chip" key={index}>
              #{index + 1}: {score}점
            </span>
          ))}
        </div>
      </section>

      <section className="map-study__section">
        <h2>4. filter 후 map (체이닝)</h2>
        <p>먼저 조건으로 걸러낸 뒤, 남은 것만 JSX로 바꿉니다.</p>
        <CodeSample
          label="예시 소스 (복붙용)"
          fileHint="src/components/PassListDemo.jsx"
          code={MAP_SNIPPET_4}
        />
        <p className="map-study__label">화면 (합격 점수만, 전부 표시)</p>
        <ul className="map-study__demo-list">
          {scores
            .filter((s) => s >= 70)
            .map((s) => (
              <li key={s}>{s}점 (합격)</li>
            ))}
        </ul>
      </section>

      <section className="map-study__section">
        <h2>5. state 배열 + map</h2>
        <p>상태가 배열이면, 화면은 보통 <code>배열.map(...)</code>으로 그립니다.</p>
        <CodeSample
          label="예시 소스 (복붙용)"
          fileHint="src/components/TagsStateDemo.jsx"
          code={MAP_SNIPPET_5}
        />
        <p className="map-study__label">화면</p>
        <div className="map-study__tags">
          {tags.map((tag, i) => (
            <span className="map-study__tag" key={`${tag}-${i}`}>
              {tag}
            </span>
          ))}
        </div>
        <button
          type="button"
          className="map-study__btn"
          onClick={() => setTags((prev) => [...prev, `항목 ${prev.length + 1}`])}
        >
          태그 하나 추가
        </button>
      </section>

      <section className="map-study__section">
        <h2>6. JSX가 아닌 map 결과 (숫자·문자열 배열)</h2>
        <p>
          <code>map</code>은 꼭 JSX만 만드는 게 아닙니다. 변환한 배열을 <code>join</code>하거나
          다른 함수에 넘기는 식으로도 자주 씁니다.
        </p>
        <CodeSample
          label="예시 소스 (복붙용)"
          fileHint="src/components/DoubledJoinDemo.jsx"
          code={MAP_SNIPPET_6}
        />
        <p className="map-study__label">화면</p>
        <p className="map-study__plain">{nums.map((n) => n * 2).join(' → ')}</p>
      </section>

      <section className="map-study__section">
        <h2>7. Fragment + key (한 항목이 dt/dd 두 줄)</h2>
        <p>
          <code>&lt;&gt;...&lt;/&gt;</code>에는 <code>key</code>를 붙일 수 없습니다. 리스트에서
          여러 노드를 묶을 때는 <code>Fragment</code>에 <code>key</code>를 줍니다.
        </p>
        <CodeSample
          label="예시 소스 (복붙용)"
          fileHint="src/components/GlossaryFragmentDemo.jsx"
          code={MAP_SNIPPET_7}
        />
        <p className="map-study__label">화면</p>
        <dl className="map-study__dl">
          {glossary.map((row) => (
            <Fragment key={row.id}>
              <dt>{row.term}</dt>
              <dd>{row.desc}</dd>
            </Fragment>
          ))}
        </dl>
      </section>

      <section className="map-study__section">
        <h2>8. 중첩 map (행마다 또 map)</h2>
        <p>
          2차원 배열처럼 &quot;배열의 배열&quot;이면 바깥 <code>map</code> 안에서 안쪽 배열을
          또 <code>map</code>합니다. 안쪽 <code>key</code>는 행·열 인덱스 조합 등으로 유일하게
          만듭니다.
        </p>
        <CodeSample
          label="예시 소스 (복붙용)"
          fileHint="src/components/NestedGridDemo.jsx"
          code={MAP_SNIPPET_8}
        />
        <p className="map-study__label">화면</p>
        <table className="map-study__table">
          <tbody>
            {gridRows.map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td key={`${ri}-${ci}`}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="map-study__section">
        <h2>9. map vs forEach</h2>
        <p>
          <code>forEach</code>는 반환이 없고 부수효과용으로 쓰는 경우가 많고, <code>map</code>은{' '}
          <strong>변환된 새 배열</strong>이 필요할 때 씁니다. React 렌더에서는 보통 <code>map</code>이
          맞습니다.
        </p>
        <CodeSample label="예시 소스 (복붙용)" fileHint="임의 .js" code={MAP_SNIPPET_9} />
        <p className="map-study__label">화면</p>
        <p className="map-study__plain">
          map 결과: {nums.map((n) => n * 2).join(' → ')}
        </p>
      </section>

      <section className="map-study__section">
        <h2>10. filter + map + useMemo</h2>
        <p>
          목록이 길어지면 매 렌더마다 <code>filter</code>·<code>map</code>을 돌리기보다, 의존성이 바뀔
          때만 다시 계산하도록 <code>useMemo</code>로 감싸는 패턴이 흔합니다.
        </p>
        <CodeSample label="예시 소스 (복붙용)" fileHint="컴포넌트 안" code={MAP_SNIPPET_10} />
        <p className="map-study__label">화면</p>
        <label className="map-study__field">
          용어 검색
          <input
            value={glossQuery}
            onChange={(e) => setGlossQuery(e.target.value)}
            placeholder="예: key"
            autoComplete="off"
          />
        </label>
        <ul className="map-study__demo-list">
          {filteredGlossary.map((g) => (
            <li key={g.id}>
              <strong>{g.term}</strong> — {g.desc}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
