/** 프로덕션에서 API가 다른 호스트일 때 Vercel 환경 변수로 설정 (끝 슬래시 없이). */
const origin = (import.meta.env.VITE_API_ORIGIN || '').replace(/\/$/, '')

export function apiUrl(path) {
  if (!path.startsWith('/')) {
    throw new Error('apiUrl: path must start with /')
  }
  return origin ? `${origin}${path}` : path
}
