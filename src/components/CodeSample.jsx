import { useState } from 'react'
import './CodeSample.css'

async function copyToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text)
    return
  }
  const ta = document.createElement('textarea')
  ta.value = text
  ta.setAttribute('readonly', '')
  ta.style.position = 'fixed'
  ta.style.left = '-9999px'
  document.body.appendChild(ta)
  ta.select()
  document.execCommand('copy')
  document.body.removeChild(ta)
}

export default function CodeSample({
  code,
  label = '예시 소스 (복붙용)',
  fileHint,
}) {
  const [status, setStatus] = useState('idle')

  async function handleCopy() {
    try {
      await copyToClipboard(code)
      setStatus('ok')
      setTimeout(() => setStatus('idle'), 2000)
    } catch {
      setStatus('err')
      setTimeout(() => setStatus('idle'), 2500)
    }
  }

  return (
    <div className="code-sample">
      <div className="code-sample__toolbar">
        <div className="code-sample__meta">
          <span className="code-sample__label">{label}</span>
          {fileHint && (
            <span className="code-sample__file" title="저장 경로 예시">
              {fileHint}
            </span>
          )}
        </div>
        <button
          type="button"
          className="code-sample__copy"
          onClick={handleCopy}
          aria-label={
            status === 'ok' ? '복사 완료됨' : status === 'err' ? '복사에 실패함' : '예시 코드 전체 복사'
          }
        >
          {status === 'ok' ? '복사됨' : status === 'err' ? '복사 실패' : '복사'}
        </button>
      </div>
      <pre className="code-sample__pre">
        <code>{code}</code>
      </pre>
    </div>
  )
}
