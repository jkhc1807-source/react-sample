/**
 * 홈 검색에서 경로 매칭용 (제목·부제·키워드 포함)
 */
export const HOME_SEARCH_ROUTES = [
  { path: '/', title: '홈', subtitle: '학습 허브 시작', keywords: ['home', '메인', '처음'] },
  {
    path: '/auth',
    title: '로그인 · 회원가입',
    subtitle: 'httpOnly 쿠키 세션',
    keywords: ['로그인', '회원가입', 'login', 'auth', '계정'],
  },
  {
    path: '/admin',
    title: '어드민 — 회원 목록',
    subtitle: '가입 사용자 조회 (dev only)',
    keywords: ['admin', '어드민', '관리자', '회원 목록'],
  },
  {
    path: '/playground',
    title: '샘플 모음',
    subtitle: '버튼, 표현식, 카운터, 할 일 등 기초 예제',
    keywords: ['playground', '기초', '예제', 'tutorial'],
  },
  {
    path: '/functions/map',
    title: '함수 — map 배열 변환',
    subtitle: '/functions 학습 허브',
    keywords: ['map', '배열', '함수'],
  },
  {
    path: '/functions/state',
    title: '함수 — useState 상태',
    subtitle: '/functions 학습 허브',
    keywords: ['state', 'usestate', '상태'],
  },
  {
    path: '/functions/filter',
    title: '함수 — filter',
    subtitle: '조건 필터링',
    keywords: ['filter', '필터'],
  },
  {
    path: '/functions/reduce',
    title: '함수 — reduce',
    subtitle: '누적·집계',
    keywords: ['reduce', '누적'],
  },
  {
    path: '/functions/find',
    title: '함수 — find',
    subtitle: '요소 검색',
    keywords: ['find'],
  },
  {
    path: '/functions/some-every',
    title: '함수 — some / every',
    subtitle: '조건 존재·전체',
    keywords: ['some', 'every'],
  },
  {
    path: '/functions/sort',
    title: '함수 — sort',
    subtitle: '정렬',
    keywords: ['sort', '정렬'],
  },
  {
    path: '/functions/flatMap',
    title: '함수 — flatMap',
    subtitle: '중첩 펼치기',
    keywords: ['flatmap'],
  },
  {
    path: '/functions/includes',
    title: '함수 — includes',
    subtitle: '포함 여부',
    keywords: ['includes'],
  },
  {
    path: '/functions/slice',
    title: '함수 — slice',
    subtitle: '잘라내기',
    keywords: ['slice'],
  },
  {
    path: '/functions/object',
    title: '함수 — 객체 메서드',
    subtitle: 'Object 유틸',
    keywords: ['object', '객체'],
  },
  {
    path: '/functions/set',
    title: '함수 — Set',
    subtitle: '중복 없는 값',
    keywords: ['set'],
  },
  {
    path: '/functions/coverage',
    title: '함수 — Coverage 점검',
    subtitle: '정리 및 점검표',
    keywords: ['coverage', '점검'],
  },
  {
    path: '/practice/overview',
    title: '실무·심화 — 개요',
    subtitle: '/practice 허브',
    keywords: ['실무', '심화', 'overview'],
  },
  {
    path: '/practice/ui',
    title: '실무·심화 — UI',
    subtitle: 'UI 패턴',
    keywords: ['ui', '패널'],
  },
  {
    path: '/practice/data',
    title: '실무·심화 — 데이터',
    subtitle: '데이터 패널',
    keywords: ['data', '데이터'],
  },
  {
    path: '/practice/workshop',
    title: '실무·심화 — 워크샵',
    subtitle: '폼 등',
    keywords: ['workshop', '폼'],
  },
  {
    path: '/practice/async',
    title: '실무·심화 — 비동기',
    subtitle: 'fetch·effect',
    keywords: ['async', '비동기', 'fetch'],
  },
  {
    path: '/practice/quality',
    title: '실무·심화 — 품질',
    subtitle: '에러 경계 등',
    keywords: ['quality', '품질', 'error'],
  },
  {
    path: '/ui-kit',
    title: 'UI 키트',
    subtitle: '버튼·입력·모달·토스트',
    keywords: ['uikit', '모달', '토스트', '폼 컴포넌트'],
  },
]

/** 검색어 없을 때 아래 목록 순서대로 노출 */
const POPULAR_PATHS = [
  '/playground',
  '/functions/map',
  '/practice/overview',
  '/ui-kit',
  '/practice/async',
  '/functions/filter',
  '/practice/ui',
]

export function getPopularHomeRoutes() {
  return POPULAR_PATHS.map((p) => HOME_SEARCH_ROUTES.find((r) => r.path === p)).filter(Boolean)
}
