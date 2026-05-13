import { useMemo, useState } from 'react'
import CodeSample from '../../components/CodeSample.jsx'
import {
  products,
  users,
  scores,
  orders,
  stack,
  nums,
  prefs,
  dupIds,
  koWords,
} from './collectionData.js'
import {
  COL_FILTER,
  COL_FILTER_CHAIN,
  COL_REDUCE,
  COL_REDUCE_MAX,
  COL_REDUCE_GROUP,
  COL_FIND,
  COL_FIND_FALLBACK,
  COL_SOME_EVERY,
  COL_SORT,
  COL_SORT_LOCALE,
  COL_FLATMAP,
  COL_FLATMAP_LINES,
  COL_INCLUDES,
  COL_INCLUDES_SOME,
  COL_SLICE,
  COL_SLICE_PAGE,
  COL_OBJECT,
  COL_OBJECT_ASSIGN,
  COL_SET,
  COL_SET_INTER,
} from '../snippets/collectionStudySnippets.js'
import '../CollectionStudyPage.css'

export function FilterMethodPage() {
  const [maxPrice, setMaxPrice] = useState(800_000)
  const [category, setCategory] = useState('all')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return products
      .filter((p) => p.price <= maxPrice)
      .filter((p) => category === 'all' || p.category === category)
      .filter((p) => !q || p.name.toLowerCase().includes(q))
  }, [maxPrice, category, query])

  return (
    <div className="collection-study">
      <header className="collection-study__header">
        <h2 className="collection-study__title">filter</h2>
        <p className="collection-study__lead">
          조건을 통과한 요소만 담은 <strong>새 배열</strong>을 만듭니다. React에서는 state 배열을 줄이거나
          후보를 좁힐 때 자주 씁니다.
        </p>
      </header>

      <section className="collection-study__section">
        <h3>한 조건 / 여러 조건 체이닝</h3>
        <p>가격 상한, 카테고리, 이름 검색을 겹쳐 볼 수 있습니다.</p>
        <CodeSample label="예시 ① 가격만" fileHint="임의 .js" code={COL_FILTER} />
        <CodeSample label="예시 ② 여러 번 filter" fileHint="임의 .js" code={COL_FILTER_CHAIN} />
        <p className="collection-study__label">화면</p>
        <div className="collection-study__controls">
          <label>
            최대 가격(원): <strong>{maxPrice.toLocaleString()}</strong>
          </label>
          <input
            type="range"
            min={0}
            max={1_500_000}
            step={10_000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>
        <div className="collection-study__controls collection-study__controls--row">
          <span className="collection-study__row-label">카테고리</span>
          {(['all', 'pc', 'acc']).map((c) => (
            <button
              key={c}
              type="button"
              className={category === c ? 'collection-study__chip collection-study__chip--on' : 'collection-study__chip'}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="collection-study__controls">
          <label htmlFor="filter-q">이름 포함</label>
          <input
            id="filter-q"
            className="collection-study__input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="예: 마우스"
            autoComplete="off"
          />
        </div>
        <ul className="collection-study__list">
          {filtered.map((p) => (
            <li key={p.id}>
              {p.name} — {p.price.toLocaleString()}원 ({p.category})
            </li>
          ))}
        </ul>
        {filtered.length === 0 ? <p className="collection-study__muted">조건에 맞는 상품이 없습니다.</p> : null}
      </section>
    </div>
  )
}

export function ReduceMethodPage() {
  const total = useMemo(() => products.reduce((s, p) => s + p.price, 0), [])
  const top = useMemo(
    () => products.reduce((best, cur) => (cur.price > best.price ? cur : best), products[0]),
    [],
  )
  const byCat = useMemo(
    () =>
      products.reduce((acc, p) => {
        acc[p.category] = (acc[p.category] ?? 0) + p.price
        return acc
      }, {}),
    [],
  )

  return (
    <div className="collection-study">
      <header className="collection-study__header">
        <h2 className="collection-study__title">reduce</h2>
        <p className="collection-study__lead">
          배열을 돌며 <strong>하나의 값</strong>(숫자, 객체, Map 등)으로 접습니다. 합계·최댓값·그룹 합계에
          강합니다.
        </p>
      </header>

      <section className="collection-study__section">
        <h3>합계</h3>
        <CodeSample label="예시 소스 (복붙용)" fileHint="임의 .js" code={COL_REDUCE} />
        <p className="collection-study__label">화면</p>
        <p className="collection-study__mono">총액: {total.toLocaleString()}원</p>
      </section>

      <section className="collection-study__section">
        <h3>최댓값 하나 고르기</h3>
        <CodeSample label="예시 소스 (복붙용)" fileHint="임의 .js" code={COL_REDUCE_MAX} />
        <p className="collection-study__label">화면</p>
        <p className="collection-study__mono">
          최고가: {top.name} ({top.price.toLocaleString()}원)
        </p>
      </section>

      <section className="collection-study__section">
        <h3>그룹별 합계 (객체로 접기)</h3>
        <CodeSample label="예시 소스 (복붙용)" fileHint="임의 .js" code={COL_REDUCE_GROUP} />
        <p className="collection-study__label">화면</p>
        <ul className="collection-study__list">
          {Object.entries(byCat).map(([k, v]) => (
            <li key={k}>
              <code>{k}</code>: {v.toLocaleString()}원
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export function FindMethodPage() {
  const admin = users.find((u) => u.role === 'admin')
  const leeIdx = users.findIndex((u) => u.name === 'Lee')
  const cheap = products.find((p) => p.price < 20_000)

  return (
    <div className="collection-study">
      <header className="collection-study__header">
        <h2 className="collection-study__title">find / findIndex</h2>
        <p className="collection-study__lead">
          조건에 맞는 <strong>첫 요소</strong>만 필요할 때 씁니다. 여러 개가 필요하면 <code>filter</code>입니다.
        </p>
      </header>

      <section className="collection-study__section">
        <h3>기본</h3>
        <CodeSample label="예시 소스 (복붙용)" fileHint="임의 .js" code={COL_FIND} />
        <p className="collection-study__label">화면</p>
        <dl className="collection-study__dl">
          <dt>find(admin)</dt>
          <dd>{admin ? `${admin.name} (#${admin.id})` : '없음'}</dd>
          <dt>findIndex(Lee)</dt>
          <dd>{leeIdx}</dd>
        </dl>
      </section>

      <section className="collection-study__section">
        <h3>없을 때: undefined + 옵셔널 체이닝</h3>
        <p>2만 원 미만 상품은 없으면 <code>undefined</code>입니다.</p>
        <CodeSample label="예시 소스 (복붙용)" fileHint="임의 .js" code={COL_FIND_FALLBACK} />
        <p className="collection-study__label">화면</p>
        <p className="collection-study__mono">
          2만 원 미만 첫 상품: {cheap ? cheap.name : 'undefined (화면에는 ?? 또는 조건 분기)'}
        </p>
      </section>
    </div>
  )
}

export function SomeEveryMethodPage() {
  const anyA = scores.some((s) => s >= 90)
  const allPass = scores.every((s) => s >= 50)
  const anyGuest = users.some((u) => u.role === 'guest')
  const allNamed = users.every((u) => Boolean(u.name))

  return (
    <div className="collection-study">
      <header className="collection-study__header">
        <h2 className="collection-study__title">some / every</h2>
        <p className="collection-study__lead">
          <code>some</code>은 하나라도 참이면 true, <code>every</code>는 모두 참이어야 true입니다. 권한·검증에
          자주 씁니다.
        </p>
      </header>

      <section className="collection-study__section">
        <h3>숫자 배열</h3>
        <CodeSample label="예시 소스 (복붙용)" fileHint="임의 .js" code={COL_SOME_EVERY} />
        <p className="collection-study__label">화면</p>
        <p className="collection-study__mono">
          scores = [{scores.join(', ')}]
          <br />
          90 이상 하나라도: {String(anyA)} / 모두 50 이상: {String(allPass)}
        </p>
      </section>

      <section className="collection-study__section">
        <h3>객체 배열</h3>
        <p className="collection-study__label">화면</p>
        <p className="collection-study__mono">
          guest가 한 명이라도: {String(anyGuest)}
          <br />
          모두 name이 있음: {String(allNamed)}
        </p>
      </section>
    </div>
  )
}

export function SortMethodPage() {
  const [desc, setDesc] = useState(false)
  const sortedProducts = useMemo(() => {
    const c = [...products]
    c.sort((a, b) => (desc ? b.price - a.price : a.price - b.price))
    return c
  }, [desc])

  const sortedKo = useMemo(() => [...koWords].sort((a, b) => a.localeCompare(b, 'ko')), [])

  return (
    <div className="collection-study">
      <header className="collection-study__header">
        <h2 className="collection-study__title">sort</h2>
        <p className="collection-study__lead">
          기본은 제자리 정렬입니다. state에 넣기 전에는 <code>[...arr].sort()</code>로 <strong>복사본</strong>을
          정렬하세요.
        </p>
      </header>

      <section className="collection-study__section">
        <h3>숫자 필드(가격)</h3>
        <CodeSample label="예시 소스 (복붙용)" fileHint="임의 .js" code={COL_SORT} />
        <p className="collection-study__label">화면</p>
        <div className="collection-study__controls">
          <button type="button" onClick={() => setDesc((v) => !v)}>
            {desc ? '가격 높은 순' : '가격 낮은 순'}
          </button>
        </div>
        <ol className="collection-study__list collection-study__list--num">
          {sortedProducts.map((p) => (
            <li key={p.id}>
              {p.name} — {p.price.toLocaleString()}원
            </li>
          ))}
        </ol>
      </section>

      <section className="collection-study__section">
        <h3>한글 문자열: localeCompare</h3>
        <p>사전식 정렬은 <code>localeCompare</code>에 로케일(<code>'ko'</code>)을 넘기면 안정적입니다.</p>
        <CodeSample label="예시 소스 (복붙용)" fileHint="임의 .js" code={COL_SORT_LOCALE} />
        <p className="collection-study__label">화면</p>
        <p className="collection-study__mono">정렬 결과: {sortedKo.join(' → ')}</p>
      </section>
    </div>
  )
}

export function FlatMapMethodPage() {
  const tagRows = orders.flatMap((o) => o.tags.map((t) => ({ orderId: o.id, tag: t })))
  const lines = ['React Vite', 'CSS']
  const tokens = lines.flatMap((line) => line.split(/\s+/).filter(Boolean))

  return (
    <div className="collection-study">
      <header className="collection-study__header">
        <h2 className="collection-study__title">flatMap</h2>
        <p className="collection-study__lead">
          <code>map</code>으로 생긴 “배열의 배열”을 한 단계 펼치며 변환할 때 씁니다. 중첩 <code>map</code> 후{' '}
          <code>flat(1)</code>과 비슷합니다.
        </p>
      </header>

      <section className="collection-study__section">
        <h3>주문별 태그 펼치기</h3>
        <CodeSample label="예시 소스 (복붙용)" fileHint="임의 .js" code={COL_FLATMAP} />
        <p className="collection-study__label">화면</p>
        <ul className="collection-study__list">
          {tagRows.map((row) => (
            <li key={`${row.orderId}-${row.tag}`}>
              <code>{row.orderId}</code> → {row.tag}
            </li>
          ))}
        </ul>
      </section>

      <section className="collection-study__section">
        <h3>문장 → 단어</h3>
        <CodeSample label="예시 소스 (복붙용)" fileHint="임의 .js" code={COL_FLATMAP_LINES} />
        <p className="collection-study__label">화면</p>
        <p className="collection-study__mono">{JSON.stringify(tokens)}</p>
      </section>
    </div>
  )
}

export function IncludesMethodPage() {
  const [picked, setPicked] = useState('Vite')
  const has = stack.includes(picked)
  const hasGuest = users.some((u) => u.role === 'guest')

  return (
    <div className="collection-study">
      <header className="collection-study__header">
        <h2 className="collection-study__title">includes</h2>
        <p className="collection-study__lead">
          원시값 배열에서 “이 값이 있나?”를 빠르게 확인합니다. <strong>객체 참조</strong>는 포함 관계가
          아니라서 객체 배열에는 보통 <code>some</code>을 씁니다.
        </p>
      </header>

      <section className="collection-study__section">
        <h3>문자열 배열</h3>
        <CodeSample label="예시 소스 (복붙용)" fileHint="임의 .js" code={COL_INCLUDES} />
        <p className="collection-study__label">화면</p>
        <p className="collection-study__mono">stack = {JSON.stringify(stack)}</p>
        <input className="collection-study__input" value={picked} onChange={(e) => setPicked(e.target.value)} />
        <p className="collection-study__mono">
          includes(&quot;{picked}&quot;) → <strong>{String(has)}</strong>
        </p>
      </section>

      <section className="collection-study__section">
        <h3>객체 배열은 some</h3>
        <CodeSample label="예시 소스 (복붙용)" fileHint="임의 .js" code={COL_INCLUDES_SOME} />
        <p className="collection-study__label">화면</p>
        <p className="collection-study__mono">users 중 guest 존재: {String(hasGuest)}</p>
      </section>
    </div>
  )
}

export function SliceMethodPage() {
  const all = useMemo(() => Array.from({ length: 24 }, (_, i) => i + 1), [])
  const [page, setPage] = useState(0)
  const pageSize = 6
  const slice = all.slice(page * pageSize, page * pageSize + pageSize)
  const slicedNums = nums.slice(2, 5)

  return (
    <div className="collection-study">
      <header className="collection-study__header">
        <h2 className="collection-study__title">slice</h2>
        <p className="collection-study__lead">
          <code>[start, end)</code> 구간을 <strong>복사</strong>해 옵니다. 원본을 바꾸지 않습니다. 페이지네이션
          미리보기에 자주 씁니다.
        </p>
      </header>

      <section className="collection-study__section">
        <h3>페이지 나누기 예시</h3>
        <CodeSample label="예시 소스 (복붙용)" fileHint="임의 .js" code={COL_SLICE_PAGE} />
        <p className="collection-study__label">화면</p>
        <div className="collection-study__controls collection-study__controls--row">
          <button type="button" disabled={page <= 0} onClick={() => setPage((p) => p - 1)}>
            이전
          </button>
          <span className="collection-study__mono">
            페이지 {page + 1} / {Math.ceil(all.length / pageSize)}
          </span>
          <button
            type="button"
            disabled={(page + 1) * pageSize >= all.length}
            onClick={() => setPage((p) => p + 1)}
          >
            다음
          </button>
        </div>
        <p className="collection-study__mono">이 페이지: [{slice.join(', ')}]</p>
      </section>

      <section className="collection-study__section">
        <h3>고정 구간</h3>
        <CodeSample label="예시 소스 (복붙용)" fileHint="임의 .js" code={COL_SLICE} />
        <p className="collection-study__label">화면</p>
        <p className="collection-study__mono">
          nums = [{nums.join(', ')}] → slice(2,5) = [{slicedNums.join(', ')}]
        </p>
      </section>
    </div>
  )
}

export function ObjectMethodPage() {
  const withoutLang = Object.fromEntries(Object.entries(prefs).filter(([k]) => k !== 'lang'))

  return (
    <div className="collection-study">
      <header className="collection-study__header">
        <h2 className="collection-study__title">Object.keys / values / entries</h2>
        <p className="collection-study__lead">
          객체를 배열로 바꿔 <code>map</code>·<code>filter</code>와 연결합니다. 다시 객체로 만들 땐{' '}
          <code>Object.fromEntries</code>가 편합니다.
        </p>
      </header>

      <section className="collection-study__section">
        <h3>entries로 순회</h3>
        <CodeSample label="예시 소스 (복붙용)" fileHint="임의 .js" code={COL_OBJECT} />
        <p className="collection-study__label">화면</p>
        <ul className="collection-study__list">
          {Object.entries(prefs).map(([k, v]) => (
            <li key={k}>
              <code>{k}</code>: {String(v)}
            </li>
          ))}
        </ul>
      </section>

      <section className="collection-study__section">
        <h3>fromEntries로 필드 제거</h3>
        <p>
          <code>lang</code> 키만 빼고 새 객체를 만드는 예시입니다. (실무에서는 스프레드로 일부 제외도
          많이 씁니다.)
        </p>
        <CodeSample label="예시 소스 (복붙용)" fileHint="임의 .js" code={COL_OBJECT_ASSIGN} />
        <p className="collection-study__label">화면</p>
        <p className="collection-study__mono">{JSON.stringify(withoutLang)}</p>
      </section>
    </div>
  )
}

export function SetMethodPage() {
  const unique = [...new Set(dupIds)]
  const a = [1, 2, 3, 4]
  const b = [3, 4, 5, 6]
  const inter = [...new Set(a)].filter((x) => new Set(b).has(x))

  return (
    <div className="collection-study">
      <header className="collection-study__header">
        <h2 className="collection-study__title">Set</h2>
        <p className="collection-study__lead">
          중복 없는 집합입니다. 배열로 쓰려면 <code>[...new Set(arr)]</code> 패턴을 기억해 두면 좋습니다.
        </p>
      </header>

      <section className="collection-study__section">
        <h3>중복 제거</h3>
        <CodeSample label="예시 소스 (복붙용)" fileHint="임의 .js" code={COL_SET} />
        <p className="collection-study__label">화면</p>
        <p className="collection-study__mono">
          [{dupIds.join(', ')}] → [{unique.join(', ')}]
        </p>
      </section>

      <section className="collection-study__section">
        <h3>교집합(작은 데이터용)</h3>
        <p>큰 데이터에는 전용 자료구조나 라이브러리를 쓰는 편이 안전합니다.</p>
        <CodeSample label="예시 소스 (복붙용)" fileHint="임의 .js" code={COL_SET_INTER} />
        <p className="collection-study__label">화면</p>
        <p className="collection-study__mono">
          a = [{a.join(', ')}], b = [{b.join(', ')}] → 교집합 [{inter.join(', ')}]
        </p>
      </section>
    </div>
  )
}
