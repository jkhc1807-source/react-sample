import './Badge.css'

const VARIANT = {
  neutral: 'ui-badge--neutral',
  accent: 'ui-badge--accent',
  success: 'ui-badge--success',
  warning: 'ui-badge--warning',
  danger: 'ui-badge--danger',
}

export default function Badge({ children, variant = 'neutral', className = '' }) {
  const v = VARIANT[variant] || VARIANT.neutral
  return <span className={['ui-badge', v, className].filter(Boolean).join(' ')}>{children}</span>
}
