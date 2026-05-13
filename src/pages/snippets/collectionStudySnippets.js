/** 배열·객체 유틸 학습 페이지 — 복붙용 */

export const COL_FILTER = `const products = [
  { id: 'p1', name: '노트북', price: 1200000 },
  { id: 'p2', name: '마우스', price: 35000 },
  { id: 'p3', name: '키보드', price: 89000 },
]

const maxPrice = 500_000
const affordable = products.filter((p) => p.price <= maxPrice)
// affordable: 마우스, 키보드만
`

export const COL_REDUCE = `const prices = [1200000, 35000, 89000]

const total = prices.reduce((sum, n) => sum + n, 0)
// total: 1324000

const lines = ['a', 'b', 'c']
const joined = lines.reduce((acc, line, i) => acc + (i ? '|' : '') + line, '')
// joined: "a|b|c"
`

export const COL_FIND = `const users = [
  { id: 1, name: 'Kim', role: 'admin' },
  { id: 2, name: 'Lee', role: 'guest' },
]

const admin = users.find((u) => u.role === 'admin')
const idx = users.findIndex((u) => u.name === 'Lee')
// admin → Kim 객체, idx → 1
`

export const COL_SOME_EVERY = `const scores = [72, 55, 88, 91, 60]

const anyA = scores.some((s) => s >= 90) // true (91)
const allPass = scores.every((s) => s >= 50) // false (55)
`

export const COL_SORT = `const items = [
  { name: '키보드', price: 89000 },
  { name: '노트북', price: 1200000 },
  { name: '마우스', price: 35000 },
]

// 원본을 바꾸지 않으려면 복사 후 sort
const byPriceAsc = [...items].sort((a, b) => a.price - b.price)
const byPriceDesc = [...items].sort((a, b) => b.price - a.price)
`

export const COL_FLATMAP = `const orders = [
  { id: 'o1', tags: ['gift', 'fragile'] },
  { id: 'o2', tags: ['bulk'] },
]

// 각 주문의 tags를 펼치면서 주문 id를 붙임
const tagRows = orders.flatMap((o) => o.tags.map((t) => ({ orderId: o.id, tag: t })))
// [{ orderId:'o1', tag:'gift' }, { orderId:'o1', tag:'fragile' }, { orderId:'o2', tag:'bulk' }]
`

export const COL_INCLUDES = `const stack = ['React', 'Vite', 'TypeScript']

stack.includes('Vite') // true
stack.includes('Vue') // false
`

export const COL_SLICE = `const nums = [10, 20, 30, 40, 50, 60]

nums.slice(2, 5) // [30, 40, 50] — 원본 nums는 그대로
nums.slice(-2)   // [50, 60]
`

export const COL_OBJECT = `const prefs = { theme: 'dark', lang: 'ko', notifications: true }

Object.keys(prefs)    // ['theme', 'lang', 'notifications']
Object.values(prefs)  // ['dark', 'ko', true]
Object.entries(prefs) // [['theme','dark'], ['lang','ko'], ...]

// entries → 다시 객체
const back = Object.fromEntries(Object.entries(prefs).filter(([k]) => k !== 'lang'))
`

export const COL_SET = `const ids = [1, 2, 2, 3, 1, 4]
const unique = [...new Set(ids)] // [1, 2, 3, 4]

const tags = ['react', 'vite', 'react', 'css']
const uniqueTags = [...new Set(tags)]
`

export const COL_FILTER_CHAIN = `const products = [
  { id: 'p1', name: '노트북', price: 1200000, category: 'pc' },
  { id: 'p2', name: '마우스', price: 35000, category: 'acc' },
]

const maxPrice = 500_000
const category = 'pc' // 'pc' | 'acc' | 'all'
const q = '마' // 이름 검색

const rows = products
  .filter((p) => p.price <= maxPrice)
  .filter((p) => category === 'all' || p.category === category)
  .filter((p) => p.name.includes(q))
`

export const COL_REDUCE_MAX = `const items = [
  { name: '키보드', price: 89000 },
  { name: '노트북', price: 1200000 },
  { name: '마우스', price: 35000 },
]

const top = items.reduce((best, cur) => (cur.price > best.price ? cur : best), items[0])
`

export const COL_REDUCE_GROUP = `const rows = [
  { cat: 'pc', price: 100 },
  { cat: 'acc', price: 20 },
  { cat: 'pc', price: 50 },
]

const byCat = rows.reduce((acc, row) => {
  acc[row.cat] = (acc[row.cat] ?? 0) + row.price
  return acc
}, {})
// { pc: 150, acc: 20 }
`

export const COL_FIND_FALLBACK = `const users = [{ id: 1, name: 'Kim' }]

const found = users.find((u) => u.name === 'Lee')
const name = found?.name ?? '없음'
`

export const COL_SORT_LOCALE = `const words = ['다람쥐', '가나다', '하마']

const sorted = [...words].sort((a, b) => a.localeCompare(b, 'ko'))
// 가나다, 다람쥐, 하마
`

export const COL_FLATMAP_LINES = `const lines = ['a b', 'c']
const tokens = lines.flatMap((line) => line.split(' '))
// ['a','b','c']
`

export const COL_INCLUDES_SOME = `const users = [{ id: 1 }, { id: 2 }]

// 객체 배열에는 includes 대신 some
const hasId2 = users.some((u) => u.id === 2)
`

export const COL_SLICE_PAGE = `const all = Array.from({ length: 24 }, (_, i) => i + 1)
const pageSize = 5
const page = 2 // 0부터

const slice = all.slice(page * pageSize, page * pageSize + pageSize)
// [6,7,8,9,10]
`

export const COL_OBJECT_ASSIGN = `const base = { a: 1, b: 2 }
const next = Object.assign({}, base, { b: 99, c: 3 })
// 스프레드가 더 읽기 쉬운 편: { ...base, b: 99, c: 3 }
`

export const COL_SET_INTER = `const a = [1, 2, 3, 4]
const b = [3, 4, 5, 6]

const inter = [...new Set(a)].filter((x) => new Set(b).has(x))
// [3, 4] — 교집합(작은 데이터용)
`
