/** map 학습 페이지 — 복붙용 전체 예제 (파일 하나로 저장해 import 하면 됩니다) */

export const MAP_SNIPPET_1 = `// src/components/NumberListDemo.jsx
import './NumberListDemo.css' /* 없으면 이 줄 삭제 */

const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export default function NumberListDemo() {
  return (
    <section className="number-list-demo">
      <h2>숫자 배열 → 리스트</h2>
      <ul>
        {nums.map((n) => (
          <li key={n}>{n}</li>
        ))}
      </ul>
    </section>
  )
}
`

export const MAP_SNIPPET_2 = `// src/components/ProductTableDemo.jsx
const products = [
  { id: 'p1', name: '노트북', price: 1200000 },
  { id: 'p2', name: '마우스', price: 35000 },
  { id: 'p3', name: '키보드', price: 89000 },
]

export default function ProductTableDemo() {
  return (
    <section>
      <h2>객체 배열 → 표</h2>
      <table>
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
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.price.toLocaleString('ko-KR')}원</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
`

export const MAP_SNIPPET_3 = `// src/components/ScoreChipsDemo.jsx
const scores = [72, 55, 88, 91, 60]

export default function ScoreChipsDemo() {
  return (
    <section>
      <h2>map 두 번째 인자: index</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {scores.map((score, index) => (
          <span key={index} style={{ padding: '0.35rem 0.65rem', borderRadius: '999px' }}>
            #{index + 1}: {score}점
          </span>
        ))}
      </div>
    </section>
  )
}
`

export const MAP_SNIPPET_4 = `// src/components/PassListDemo.jsx
const scores = [72, 55, 88, 91, 60]

export default function PassListDemo() {
  return (
    <section>
      <h2>filter 후 map</h2>
      <ul>
        {scores
          .filter((s) => s >= 70)
          .map((s) => (
            <li key={s}>{s}점 (합격)</li>
          ))}
      </ul>
    </section>
  )
}
`

export const MAP_SNIPPET_5 = `// src/components/TagsStateDemo.jsx
import { useState } from 'react'

export default function TagsStateDemo() {
  const [tags, setTags] = useState(['React', 'map', '배열'])

  return (
    <section>
      <h2>state 배열 + map</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
        {tags.map((tag, i) => (
          <span key={\`\${tag}-\${i}\`} style={{ padding: '0.25rem 0.6rem', borderRadius: '6px' }}>
            {tag}
          </span>
        ))}
      </div>
      <button
        type="button"
        onClick={() =>
          setTags((prev) => [...prev, \`항목 \${prev.length + 1}\`])
        }
      >
        태그 하나 추가
      </button>
    </section>
  )
}
`

export const MAP_SNIPPET_6 = `// src/components/DoubledJoinDemo.jsx
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export default function DoubledJoinDemo() {
  const doubled = nums.map((n) => n * 2)

  return (
    <section>
      <h2>JSX가 아닌 map (join)</h2>
      <p style={{ fontFamily: 'monospace', lineHeight: 1.6 }}>{doubled.join(' → ')}</p>
    </section>
  )
}
`

export const MAP_SNIPPET_7 = `// src/components/GlossaryFragmentDemo.jsx
import { Fragment } from 'react'

const glossary = [
  { id: 'g1', term: 'props', desc: '부모 → 자식으로 넘기는 데이터' },
  { id: 'g2', term: 'state', desc: '컴포넌트 안에서 바뀌는 값' },
  { id: 'g3', term: 'key', desc: '리스트에서 형제 사이 고유 식별' },
]

export default function GlossaryFragmentDemo() {
  return (
    <section>
      <h2>Fragment + key</h2>
      <dl>
        {glossary.map((row) => (
          <Fragment key={row.id}>
            <dt>{row.term}</dt>
            <dd>{row.desc}</dd>
          </Fragment>
        ))}
      </dl>
    </section>
  )
}
`

export const MAP_SNIPPET_8 = `// src/components/NestedGridDemo.jsx
const gridRows = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
]

export default function NestedGridDemo() {
  return (
    <section>
      <h2>중첩 map</h2>
      <table>
        <tbody>
          {gridRows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td key={\`\${ri}-\${ci}\`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
`

export const MAP_SNIPPET_9 = `// map vs forEach — 반환값이 다릅니다
const nums = [1, 2, 3]

// forEach: 반환 undefined, 보통 로그·부수효과용
nums.forEach((n) => {
  console.log(n)
})

// map: 각 요소를 바꾼 새 배열
const doubled = nums.map((n) => n * 2)
// doubled === [2, 4, 6], nums는 그대로
`

export const MAP_SNIPPET_10 = `import { useMemo } from 'react'

// 비싼 변환은 useMemo로 감싸 의존성이 바뀔 때만 다시 map
function Demo({ items, query }) {
  const visible = useMemo(
    () => items.filter((x) => x.title.includes(query)).map((x) => ({ ...x, label: x.title.trim() })),
    [items, query],
  )
  return visible.map((row) => <li key={row.id}>{row.label}</li>)
}
`
