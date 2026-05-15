import { useState } from 'react'
import './PracticeLikeFeedDemo.css'

const BASE_LIKES = 12

export default function PracticeLikeFeedDemo() {
  const [userLiked, setUserLiked] = useState(false)
  const total = BASE_LIKES + (userLiked ? 1 : 0)

  return (
    <div className="pr-like">
      <p className="pr-like__caption">게시물 하나를 가정한 축소 UI입니다.</p>
      <div className="pr-like__row">
        <button
          type="button"
          className={`pr-like__btn${userLiked ? ' pr-like__btn--on' : ''}`}
          aria-pressed={userLiked}
          aria-label={userLiked ? '좋아요 취소' : '좋아요'}
          onClick={() => setUserLiked((v) => !v)}
        >
          <span className="pr-like__icon" aria-hidden="true">
            {userLiked ? '♥' : '♡'}
          </span>
          <span>{userLiked ? '좋아요 취소' : '좋아요'}</span>
        </button>
        <p className="pr-like__count" aria-live="polite">
          좋아요 <strong>{total}</strong>개
        </p>
      </div>
    </div>
  )
}
