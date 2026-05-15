import practiceTiltJsx from '../../components/practice/PracticeTiltCardDemo.jsx?raw'
import practiceTiltCss from '../../components/practice/PracticeTiltCardDemo.css?raw'
import practiceOrbitJsx from '../../components/practice/PracticeOrbitDotsDemo.jsx?raw'
import practiceOrbitCss from '../../components/practice/PracticeOrbitDotsDemo.css?raw'
import practiceSheetJsx from '../../components/practice/PracticeBottomSheetDemo.jsx?raw'
import practiceSheetCss from '../../components/practice/PracticeBottomSheetDemo.css?raw'
import practiceLikeJsx from '../../components/practice/PracticeLikeFeedDemo.jsx?raw'
import practiceLikeCss from '../../components/practice/PracticeLikeFeedDemo.css?raw'
import practiceChipsJsx from '../../components/practice/PracticeFilterChipsDemo.jsx?raw'
import practiceChipsCss from '../../components/practice/PracticeFilterChipsDemo.css?raw'
import practiceUndoJsx from '../../components/practice/PracticeUndoSnackbarDemo.jsx?raw'
import practiceUndoCss from '../../components/practice/PracticeUndoSnackbarDemo.css?raw'
import practiceFieldJsx from '../../components/practice/PracticeInlineFieldDemo.jsx?raw'
import practiceFieldCss from '../../components/practice/PracticeInlineFieldDemo.css?raw'
import prefersMotionJs from '../../hooks/usePrefersReducedMotion.js?raw'

const hookBlock = `// src/hooks/usePrefersReducedMotion.js\n${prefersMotionJs}`

/** UI·이벤트 탭 — 마우스 기울임 카드 */
export const PR_DIST_TILT = `${hookBlock}\n\n// src/components/practice/PracticeTiltCardDemo.jsx\n${practiceTiltJsx}\n\n/* src/components/practice/PracticeTiltCardDemo.css */\n${practiceTiltCss}`

/** UI·이벤트 탭 — 궤도 점 애니 */
export const PR_DIST_ORBIT = `${hookBlock}\n\n// src/components/practice/PracticeOrbitDotsDemo.jsx\n${practiceOrbitJsx}\n\n/* src/components/practice/PracticeOrbitDotsDemo.css */\n${practiceOrbitCss}`

/** UI·이벤트 탭 — 하단 시트 */
export const PR_DIST_SHEET = `// src/components/practice/PracticeBottomSheetDemo.jsx\n${practiceSheetJsx}\n\n/* src/components/practice/PracticeBottomSheetDemo.css */\n${practiceSheetCss}`

/** UI·이벤트 탭 — 좋아요 */
export const PR_DIST_LIKE = `// src/components/practice/PracticeLikeFeedDemo.jsx\n${practiceLikeJsx}\n\n/* src/components/practice/PracticeLikeFeedDemo.css */\n${practiceLikeCss}`

/** 데이터·검색 탭 — 필터 칩 */
export const PR_DIST_CHIPS = `// src/components/practice/PracticeFilterChipsDemo.jsx\n${practiceChipsJsx}\n\n/* src/components/practice/PracticeFilterChipsDemo.css */\n${practiceChipsCss}`

/** 폼·목록·큐 탭 — 실행 취소 토스트 */
export const PR_DIST_UNDO = `// src/components/practice/PracticeUndoSnackbarDemo.jsx\n${practiceUndoJsx}\n\n/* src/components/practice/PracticeUndoSnackbarDemo.css */\n${practiceUndoCss}`

/** 폼·목록·큐 탭 — 인라인 검증 */
export const PR_DIST_INLINE = `// src/components/practice/PracticeInlineFieldDemo.jsx\n${practiceFieldJsx}\n\n/* src/components/practice/PracticeInlineFieldDemo.css */\n${practiceFieldCss}`
