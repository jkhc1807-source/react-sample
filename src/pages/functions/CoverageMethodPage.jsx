import { Link } from 'react-router-dom'
import '../CollectionStudyPage.css'

const ROWS = [
  { name: 'map', path: '/functions/map', note: '배열→JSX, 중첩, Fragment key' },
  { name: 'useState', path: '/functions/state', note: '숫자·객체·배열·폼' },
  { name: 'filter', path: '/functions/filter', note: '조건으로 줄이기' },
  { name: 'reduce', path: '/functions/reduce', note: '합계·최댓값·그룹 합' },
  { name: 'find / findIndex', path: '/functions/find', note: '첫 일치·인덱스' },
  { name: 'some / every', path: '/functions/some-every', note: '존재·전부 만족' },
  { name: 'sort', path: '/functions/sort', note: '복사 후 정렬, localeCompare' },
  { name: 'flatMap', path: '/functions/flatMap', note: '1:다 펼치기' },
  { name: 'includes', path: '/functions/includes', note: '원시값 포함' },
  { name: 'slice', path: '/functions/slice', note: '비파괴 구간, 페이지' },
  { name: 'Object.*', path: '/functions/object', note: 'keys / entries / fromEntries' },
  { name: 'Set', path: '/functions/set', note: '중복 제거·교집합' },
]

const RARE = [
  { name: 'join / split', note: '문자열 ↔ 배열. 탭 예제에만 안 넣었을 뿐 자주 씁니다.' },
  { name: 'concat', note: '대부분 [...a, ...b] 스프레드로 대체' },
  { name: 'splice', note: '원본을 바꿔서 React state에는 비추천. filter·slice로 새 배열' },
  { name: 'findLast', note: 'ES2023. 희귀 검색에만. 보통 find + 역순복사' },
  { name: 'toSorted / toReversed', note: 'ES2023 불변 정렬. 구형 브라우저는 [...].sort' },
]

export default function CoverageMethodPage() {
  return (
    <div className="collection-study">
      <header className="collection-study__header">
        <h2 className="collection-study__title">함수 허브 점검표</h2>
        <p className="collection-study__lead">
          이 프로젝트 <strong>함수</strong> 메뉴에서 <strong>예제로 다룬 것</strong>과, 초보분이 헷갈리기
          쉬운 <strong>아직 탭으로 안 쪼갠 것</strong>을 한눈에 정리했습니다.
        </p>
      </header>

      <section className="collection-study__section">
        <h3>탭으로 연습한 배열·객체 메서드</h3>
        <div className="coverage-table-wrap">
          <table className="coverage-table">
            <thead>
              <tr>
                <th>주제</th>
                <th>이동</th>
                <th>한 줄 설명</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.path}>
                  <td>
                    <code>{r.name}</code>
                  </td>
                  <td>
                    <Link to={r.path}>열기</Link>
                  </td>
                  <td>{r.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="collection-study__section">
        <h3>탭 밖이지만 알아두면 좋은 것</h3>
        <ul className="collection-study__list">
          {RARE.map((r) => (
            <li key={r.name}>
              <strong>{r.name}</strong> — {r.note}
            </li>
          ))}
        </ul>
      </section>

      <section className="collection-study__section">
        <h3>실무·심화 허브에서 쓰는 React API</h3>
        <ul className="collection-study__list">
          <li>
            <code>useState</code>, <code>useEffect</code>, <code>useMemo</code>, <code>useRef</code> — 각 탭
            데모에 흩어져 있습니다.
          </li>
          <li>
            <strong>실무·심화</strong> 메뉴의 <strong>데이터 탭</strong>에서 <code>useDebouncedValue</code>{' '}
            커스텀 훅 패턴을 추가했습니다.
          </li>
        </ul>
      </section>
    </div>
  )
}
