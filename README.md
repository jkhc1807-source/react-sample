# React 학습 허브

Vite + React로 만든 **개인 학습용** 예제 모음입니다. 주제별 페이지로 나뉘어 있습니다.

## 이 프로젝트의 범위

| 구분 | 내용 |
|------|------|
| **목표 사용자** | React·JS 기초를 예제로 익히려는 **본인 학습** 위주 |
| **비목표** | 운영급 계정 보안·진도 저장·수료증 등 완성형 LMS |

배포·일정·우선순위는 저장소 소유자에게만 있다고 가정합니다.

## 실행 방법

```bash
npm install
npm run dev
```

(선택) **로그인 API** 실험: `server/README.md` 참고 후 `server` 폴더에서 `npm install` · `npm run dev`. Vite는 `/api`를 `localhost:3001`로 프록시합니다.

- 빌드: `npm run build`
- 미리보기: `npm run preview`
- ESLint: `npm run lint`

## 주요 경로

| 경로 | 설명 |
|------|------|
| `/` | 홈 (검색바로 다른 경로를 찾을 수 있음) |
| `/auth` | 로그인·회원가입 (`server` 실행 시, httpOnly 쿠키) |
| `/playground` | 샘플 모음 (기초 예제) |
| `/functions/*` | 배열·객체 메서드, map/state 등 |
| `/practice/*` | 실무·심화 탭 |
| `/ui-kit` | UI 컴포넌트 데모 |

## 예전 URL (`/extended-study`)

`/extended-study`로 들어오면 **`/practice/overview`로 리다이렉트**합니다. 북마크·공유 링크 호환용입니다.
