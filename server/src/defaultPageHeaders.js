/** 학습 허브 페이지 상단 제목·리드 기본값 (코드·데모 본문은 제외) */
export const DEFAULT_PAGE_HEADERS = {
  playground: {
    title: '샘플 모음 (기초 예제)',
    leadBefore:
      '강의·튜토리얼에서 자주 나오는 작은 조각들을 한 페이지에 모았습니다. 모바일에서도 줄바꿈과 그리드가 깨지지 않도록 정리했습니다. JSX를 넓게 실험하려면 ',
    externalLink: {
      label: 'CodeSandbox에서 열기',
      url: 'https://codesandbox.io/p/sandbox/2x4cck',
    },
    leadAfter: ' 하세요 (새 탭).',
  },
  uiKit: {
    title: 'UI 컴포넌트 키트',
    lead:
      '샘플 모음(Playground)에 나오는 카드·뱃지·읽기 전용 필드·카운터·할 일 목록 같은 UI 조각을, 여기서는 src/components/ui의 재사용 컴포넌트로 정리해 두었습니다. 복사할 때는 jsx와 css를 세트로 가져가면 됩니다.',
  },
  functions: {
    title: '함수 학습',
    lead:
      'map·useState·배열·객체 메서드를 탭으로 나눠 두었습니다. 맨 끝 점검표에서 이 허브에 있는 주제를 한눈에 확인할 수 있습니다.',
  },
  practice: {
    title: '실무·심화',
    lead:
      '예전의 실무 패턴 페이지와 다음 단계(심화) 예제를 한 허브로 모았습니다. 탭마다 한 가지 업무 흐름에 가깝게 구성했습니다.',
  },
}
