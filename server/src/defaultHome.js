/** 홈(/) 히어로·이득·푸터 기본값 */
export const DEFAULT_HOME = {
  hero: {
    eyebrow: 'React · 학습 허브',
    title: '예제로 익히는 React, 한 화면에서',
    leadBefore: '강의만 보다 말고 ',
    leadEmphasis: '돌려볼 수 있는 샘플',
    leadAfter:
      '로 개념을 잡으세요. 함수형 유틸부터 실무에 가까운 UI·데이터 흐름까지, 상단 메뉴로 바로 이동합니다.',
    ctaPrimary: { label: '실무·심화 둘러보기', path: '/practice/overview' },
    ctaSecondary: { label: '함수(map)부터', path: '/functions/map' },
  },
  benefits: {
    title: '왜 이 허브인가요',
    cards: [
      {
        icon: '◈',
        title: '복붙 가능한 예제',
        text: '설명만이 아니라 소스 블록을 그대로 가져가 실험할 수 있습니다.',
      },
      {
        icon: '◇',
        title: '주제별로 정리',
        text: '함수 탭의 메서드별 페이지와 실무·심화 탭이 역할을 나눕니다.',
      },
      {
        icon: '◆',
        title: '실무에 가까운 흐름',
        text: '모션, 폼·검증, 비동기 등 화면 단위 패턴을 미리 만져 볼 수 있습니다.',
      },
    ],
  },
  footer: {
    textBefore: '전체 라우트는 상단 검색으로도 찾을 수 있습니다.',
    linkLabel: 'FAQ',
    linkPath: '/faq',
  },
}
