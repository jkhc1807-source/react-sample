import { Navigate } from 'react-router-dom'

/** 예전 경로 호환: 실무·심화와 동일 목적지로 보냄 (README 참고). */
export default function ExtendedStudyPage() {
  return <Navigate to="/practice/overview" replace />
}
