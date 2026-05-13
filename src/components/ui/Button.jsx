import './Button.css'

const VARIANT = {
  primary: 'ui-btn--primary',
  secondary: 'ui-btn--secondary',
  ghost: 'ui-btn--ghost',
}

export default function Button({
  children,
  variant = 'primary',
  size,
  className = '',
  type = 'button',
  disabled,
  onClick,
  ...rest
}) {
  const classes = ['ui-btn', VARIANT[variant] || VARIANT.primary, size === 'sm' && 'ui-btn--sm', className]
    .filter(Boolean)
    .join(' ')

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick} {...rest}>
      {children}
    </button>
  )
}
