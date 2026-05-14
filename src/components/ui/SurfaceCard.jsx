import './SurfaceCard.css'

export default function SurfaceCard({ title, subtitle, meta, children, footer }) {
  return (
    <article className="ui-surface-card">
      {(title || subtitle || meta) && (
        <header className="ui-surface-card__head">
          <div className="ui-surface-card__titles">
            {title ? <h3 className="ui-surface-card__title">{title}</h3> : null}
            {subtitle ? <p className="ui-surface-card__subtitle">{subtitle}</p> : null}
          </div>
          {meta ? <div className="ui-surface-card__meta">{meta}</div> : null}
        </header>
      )}
      {children ? <div className="ui-surface-card__body">{children}</div> : null}
      {footer ? <footer className="ui-surface-card__footer">{footer}</footer> : null}
    </article>
  )
}
