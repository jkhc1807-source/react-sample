import { Component } from 'react'

/** 클래스 컴포넌트만 가능한 에러 경계(자식 트리에서 throw된 렌더 에러를 가로챔) */
export default class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <p role="alert">문제가 발생했습니다.</p>
    }
    return this.props.children
  }
}
