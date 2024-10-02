import type { Chat } from './type'

export const initialRecommendChat: Chat = {
  type: 'gpt-typing',
  value: `어떤 맛집을 찾고 계시나요?`,
  suggestionKeywords: [
    '강남에 맛있는 돈까스 식당 추천해줘',
    '성수에 인기있는 양식 식당 추천해줘',
    '홍대에 인스타 핫플 맛집 추천해줘',
  ],
}

export const lastChat: Chat = {
  type: 'gpt-typing',
  value: 'AI 맛집 추천이 종료되었습니다.',
  suggestionKeywords: ['지도 홈으로'],
}

export const usageCapReachedChat: Chat = {
  type: 'gpt-typing',
  value:
    '앗.. 월 추천 횟수를 넘었어요.\n다음 달이 되면 다시 추천받을 수 있어요.',
  suggestionKeywords: ['지도 홈으로'],
}

export const confusingInputChat: Chat = {
  type: 'gpt-typing',
  value:
    '죄송합니다. 맛집 관련 질문만 대답할 수 있어요. 정확한 추천을 위해서 좀 더 구체적으로 질문해주세요.',
  suggestionKeywords: [],
}

export const noInfoLocationChat: Chat = {
  type: 'gpt-typing',
  value: '현재위치 파악을 위해 위치권한이 필요해요.',
  suggestionKeywords: ['위치권한 허용하기'],
}
