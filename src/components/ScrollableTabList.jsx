import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './ScrollableTabList.css'

export default function ScrollableTabList({ children, trackClassName = '' }) {
  const ref = useRef(null)
  const { pathname, hash } = useLocation()
  const [overflow, setOverflow] = useState(false)
  const [canLeft, setCanLeft] = useState(false)
  const [canRight, setCanRight] = useState(false)

  const updateEdges = useCallback(() => {
    const el = ref.current
    if (!el) return
    const { scrollLeft, scrollWidth, clientWidth } = el
    const ov = scrollWidth > clientWidth + 1
    setOverflow(ov)
    if (!ov) {
      setCanLeft(false)
      setCanRight(false)
      return
    }
    setCanLeft(scrollLeft > 2)
    setCanRight(scrollLeft < scrollWidth - clientWidth - 2)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    updateEdges()
    const ro = new ResizeObserver(updateEdges)
    ro.observe(el)
    el.addEventListener('scroll', updateEdges, { passive: true })
    return () => {
      ro.disconnect()
      el.removeEventListener('scroll', updateEdges)
    }
  }, [updateEdges])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const active =
      el.querySelector('[aria-current="page"]') ||
      el.querySelector('[class*="__tab--active"]')
    requestAnimationFrame(() => {
      active?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
    })
  }, [pathname, hash])

  const scrollByDir = (dir) => {
    const el = ref.current
    if (!el) return
    const delta = Math.max(120, Math.floor(el.clientWidth * 0.62))
    el.scrollBy({ left: dir * delta, behavior: 'smooth' })
  }

  return (
    <div className={`scroll-tab-bar${overflow ? ' scroll-tab-bar--overflow' : ''}`}>
      {overflow && (
        <button
          type="button"
          className="scroll-tab-bar__btn scroll-tab-bar__btn--prev"
          aria-label="왼쪽 탭 더 보기"
          disabled={!canLeft}
          onClick={() => scrollByDir(-1)}
        >
          ‹
        </button>
      )}
      <div ref={ref} className={`scroll-tab-bar__track ${trackClassName}`.trim()}>
        {children}
      </div>
      {overflow && (
        <button
          type="button"
          className="scroll-tab-bar__btn scroll-tab-bar__btn--next"
          aria-label="오른쪽 탭 더 보기"
          disabled={!canRight}
          onClick={() => scrollByDir(1)}
        >
          ›
        </button>
      )}
    </div>
  )
}
