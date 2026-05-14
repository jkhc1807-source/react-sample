# API (회원가입·로그인 실험용)

개발 전용 메모리 저장소입니다. 프로덕션에서는 DB·이메일 인증·리프레시 토큰 회전·감사 로그를 추가하세요. **재시작하면 가입 계정이 사라지고**, 수평 확장 시 세션 공유도 되지 않습니다.

## 실행

```bash
cd server
npm install
copy .env.example .env   # Windows — JWT_SECRET 을 길게 설정
npm run dev
```

루트에서 `npm run dev`(Vite)와 함께 쓰면 `/api`는 `vite.config.js` 프록시로 이 서버(`PORT`, 기본 3001)로 전달됩니다.

## 엔드포인트

| 메서드 | 경로 | 설명 |
|--------|------|------|
| GET | `/api/health` | 헬스 체크 |
| POST | `/api/auth/register` | `{ email, password }` — 비밀번호 규칙: 12자+, 영문·숫자 포함 |
| POST | `/api/auth/login` | `{ email, password }` — 개발용 `admin`/`admin`은 **`NODE_ENV`가 `production`이 아닐 때만** |
| POST | `/api/auth/logout` | httpOnly 쿠키 삭제 |
| GET | `/api/auth/me` | `access_token` 쿠키로 세션 확인 |

토큰은 **httpOnly** 쿠키(`access_token`)에만 넣습니다. 프론트는 `fetch(..., { credentials: 'include' })`로 호출하세요.

## 서브에이전트 협업 체크 (보안)

- **서버 개발자**: bcrypt 비용 12, JWT 짧은 만료, Helmet·CORS·레이트 리밋, 프로덕션 `JWT_SECRET`. 회원가입은 이메일 중복 여부와 관계없이 **같은 bcrypt 라운드**를 먼저 돌려 타이밍 채널을 줄입니다.
- **개발자(프론트)**: 토큰을 **localStorage에 넣지 않기**(XSS 시 탈취). 쿠키 + `credentials`.
- **퍼블리셔**: 로그인 폼 `autocomplete`, `type="password"`, 라벨·오류 영역 연결.
- **디자이너**: 오류·로딩·로그아웃 상태가 사용자에게 명확히.
- **클라이언트**: 비밀번호 재설정·계정 잠금 등 정책 문구(현재 스텁에는 없음).
- **PM/기획자**: OAuth만 할지, 이메일 인증 필수인지 범위 고정.
