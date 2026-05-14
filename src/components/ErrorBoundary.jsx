import { Component } from 'react'

/**
 * 자식 트리에서 throw된 렌더 에러를 가로채는 경계(클래스 컴포넌트만 가능).
 * @property {import('react').ReactNode} [children]
 * @property {import('react').ReactNode} [fallback] — 정적 폴백(기본 데모용)
 * @property {(args: { error: Error; reset: () => void }) => import('react').ReactNode} [renderFallback] — 루트용: reset으로 복구
 */
export default class ErrorBoundary extends Component {
  state = { hasError: false, error: null }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary]', error, info.componentStack)
  }

  reset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      if (typeof this.props.renderFallback === 'function') {
        return this.props.renderFallback({
          error: this.state.error,
          reset: this.reset,
        })
      }
      return this.props.fallback ?? <p role="alert">문제가 발생했습니다.</p>
    }
    return this.props.children
  }
}
