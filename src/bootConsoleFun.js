/** 개발자 도구 콘솔용 인사 (UI에는 영향 없음) */
export function logHubConsoleGreeting() {
  if (typeof console === 'undefined' || typeof console.info !== 'function') return
  const badge =
    'background:#2f6feb;color:#fff;padding:4px 10px;border-radius:6px;font-weight:700;font-size:12px;'
  const body = 'color:#525866;font-size:12px;line-height:1.55;font-weight:400;'
  console.info(
    '%c React 학습 허브 %c\n⌘K 또는 Ctrl+K, / 키로 페이지 검색\n즐겨찾기는 본문 상단 별(☆) 버튼으로 추가할 수 있어요.',
    badge,
    body,
  )
}

export function logKonamiUnlock() {
  if (typeof console === 'undefined' || typeof console.info !== 'function') return
  const title = 'background:#7c3aed;color:#fff;padding:3px 8px;border-radius:6px;font-weight:700;font-size:11px;'
  const body = 'color:#64748b;font-size:11px;line-height:1.5;'
  console.info(
    '%c KONAMI %c\n↑↑↓↓←→←→BA — 버그는 없고… 아닙니다. 재미만 챙기고 갈게요.',
    title,
    body,
  )
}
