import { HOME_SEARCH_ROUTES } from './homeSearchRoutes.js'

/** /llms.txt — 마크다운 사이트 요약. 빌드·dev 시 public/llms.txt 로 씀(UTF-8 BOM). */
export function buildLlmsSiteDocument() {
  const routeBlock = HOME_SEARCH_ROUTES.map(
    (r) => `- [${r.title}](${r.path}): ${r.subtitle ?? ''}`,
  ).join('\n')

  return `# React 학습 허브

> Vite와 React로 만든 **개인 학습용 예제 허브**(한국어 UI). 라우트마다 짧은 설명·샘플 코드·연습 패널이 있습니다. 인증·어드민은 **개발 데모용**이며 실제 서비스의 보안·개인정보 모델이 아닙니다.

## 한 줄 요약

React 학습용 예제 모음(SPA). 컴포넌트·상태·배열 메서드·UI·fetch 등을 다룹니다.

## 권장 탐색 순서

1. [홈](/) — 허브 입구 안내 (예제는 상단 메뉴·실무·심화 탭)
2. [샘플 모음](/playground) — 기초 예제 (실시간 편집은 페이지 안의 CodeSandbox 링크)
3. [함수 — map](/functions/map) — 배열·데이터 처리
4. [UI 키트](/ui-kit) — 폼·모달 등
5. [실무·심화 — 개요](/practice/overview) — 패널·비동기·품질

## 전체 라우트 카탈로그 (경로·제목·한 줄 설명)

${routeBlock}

## 기술 스택

- React 19, React Router 7, Vite 8
- SPA. 선택적 로컬 Express API(인증 데모).

## 기타 파일

- \`/robots.txt\` — 크롤 정책
- \`/llms.txt\` — 이 문서
`
}
