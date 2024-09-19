'use client'

import { useEffect, useRef, useState } from 'react'

import AccessibleIconButton from '@/components/common/accessible-icon-button'
import Typography from '@/components/common/typography'
import useSafeRouter from '@/hooks/use-safe-router'
import ChatInput from './chat-input'
import ChatBox from './chat-box'
import type { Chat } from './type'
import useFetch from '@/hooks/use-fetch'
import { api } from '@/utils/api'
import { getMapId } from '@/services/map-id'

const initialRecommendChat: Chat = {
  type: 'gpt',
  value: `어느지역의 맛집을 찾아드릴까요?`,
  suggestionKeywords: [
    '현재위치',
    '강남',
    '이태원/한남',
    '성수',
    '홍대/연남/상수',
    '신촌',
    '마포/공덕',
    '광화문/종로',
    '시청/을지로',
    '건대/군자',
    '대학로/혜화',
    '판교',
  ],
}

const lastChat: Chat = {
  type: 'gpt',
  value: 'AI 맛집 추천이 종료되었습니다.',
  suggestionKeywords: ['지도 홈으로'],
}

const dummyPlaces = [
  {
    name: '$가게이름$1',
    reason:
      '성수동 중심에 위치하며 다양한 피자 메뉴를 제공합니다. 맛과 재료의 신선함이 뛰어납니다.  이유가 3줄이 넘어가면 이렇게 말줌임표 처리 말줌임표 처리말줌임표 처리',
    placeId: 1,
    address: '서울 성동구 성수동 1가 668-134',
  },
  {
    name: '$가게이름$2',
    reason:
      '경기 중심에 위치하며 다양한 피자 메뉴를 제공합니다. 맛과 재료의 신선함이 뛰어납니다.  이유가 3줄이 넘어가면 이렇게 말줌임표 처리 말줌임표 처리말줌임표 처리',
    placeId: 2,
    address: '경기 성동구 성수동 1가 668-134',
  },
  {
    name: '$가게이름$3',
    reason:
      '대전 중심에 위치하며 다양한 피자 메뉴를 제공합니다. 맛과 재료의 신선함이 뛰어납니다.  이유가 3줄이 넘어가면 이렇게 말줌임표 처리 말줌임표 처리말줌임표 처리',
    placeId: 3,
    address: '대전 성동구 성수동 1가 668-134',
  },
]

const fetchSuggestedPlaces = (): Promise<Chat> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        type: 'gpt',
        value: '성수동의 피자 맛집 5곳을 더 추천드려요.',
        suggestionKeywords: ['5개 더 추천', '처음으로', '추천 종료'],
        suggestionPlaces: dummyPlaces,
      })
    }, 5000)
  })
}

const Recommendation = () => {
  const { data: user } = useFetch(api.users.me.get, {
    key: ['user'],
  })
  const [input, setInput] = useState('')
  const [chats, setChats] = useState<Chat[]>([initialRecommendChat])
  const [isFinish, setIsFinish] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const bottomChat = useRef<HTMLDivElement>(null)

  const router = useSafeRouter()

  const askToAI = async () => {
    try {
      setIsLoading(true)
      const data = await fetchSuggestedPlaces()

      setChats((prev) => [...prev, data])
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }

  const sendChat = () => {
    setChats((prev) => [...prev, { type: 'user', value: input }])
    setInput('')
    askToAI()
  }

  const handleClickSuggestion = async (suggestion: string) => {
    if (suggestion === '추천 종료') {
      setIsFinish(true)
      setChats((prev) => [...prev, lastChat])
      return
    }

    if (suggestion === '지도 홈으로') {
      try {
        const mapId = await getMapId()
        if (mapId) {
          router.push(`/map/${mapId}`)
        }
      } catch (err) {
        router.safeBack()
      }
      return
    }

    if (suggestion === '처음으로') {
      setChats((prev) => [
        ...prev,
        { type: 'user', value: suggestion },
        initialRecommendChat,
      ])
      return
    }

    setChats((prev) => [...prev, { type: 'user', value: suggestion }])
    askToAI()
  }

  useEffect(() => {
    bottomChat.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chats])

  return (
    <>
      <div className="flex min-h-dvh flex-col bg-neutral-700">
        <header className="relative flex items-center pt-4">
          <AccessibleIconButton
            icon={{ type: 'caretLeft', size: 'xl' }}
            label="이전 페이지"
            className="p-[10px]"
            onClick={() => router.safeBack()}
          />
          <Typography
            className="absolute left-1/2 translate-x-[-50%]"
            as="h1"
            size="body0"
          >
            AI 맛집 추천받기
          </Typography>
        </header>

        <section className="no-scrollbar max-h-[calc(100vh-156px)] flex-1 overflow-y-scroll">
          <div className="relative flex flex-col items-center justify-center gap-4 pb-6">
            <img
              src="/images/ai.png"
              className="absolute left-5 top-0 h-[36px] w-[36px]"
            />
            <img
              src="/images/ai-recommend.png"
              className="h-[112px] w-[213px]"
            />
            <Typography
              size="h4"
              color="neutral-000"
              className="whitespace-pre text-center"
            >{`${user?.nickname ?? ''}님, 반가워요.\nAI 맛집 추천 봇이에요!`}</Typography>
          </div>

          <ChatBox
            chats={chats}
            isLoading={isLoading}
            isFinish={isFinish}
            className="flex-1 px-5"
            onClickSuggestion={handleClickSuggestion}
          />

          <div ref={bottomChat} />
        </section>

        <ChatInput
          value={input}
          isLoading={isLoading}
          isFinish={isFinish}
          className="h-[96px] px-5 py-[28px] pb-5"
          onChange={(value) => setInput(value)}
          sendChat={() => {
            if (isLoading || isFinish) return
            sendChat()
          }}
        />
      </div>
    </>
  )
}

export default Recommendation
