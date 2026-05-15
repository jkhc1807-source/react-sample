/** @param {EventTarget | null} el */
export function isTypingOrDialogContext(el) {
  if (!el || !(el instanceof HTMLElement)) return false
  if (el.isContentEditable) return true
  if (el.closest('[role="dialog"]')) return true
  const tag = el.tagName
  if (tag === 'TEXTAREA' || tag === 'SELECT') return true
  if (tag === 'INPUT') {
    const type = (el.getAttribute('type') || 'text').toLowerCase()
    return new Set([
      'text',
      'search',
      'email',
      'url',
      'password',
      'number',
      'tel',
      'date',
      'datetime-local',
      'time',
      'month',
      'week',
    ]).has(type)
  }
  return false
}
