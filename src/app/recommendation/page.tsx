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
import {
  culinaryClassWarsChat,
  initialRecommendChat,
  lastChat,
  noInfoLocationChat,
  usageCapReachedChat,
} from './guide'
import { notify } from '@/components/common/custom-toast'
import useUserGeoLocation from '@/hooks/use-user-geo-location'
import GptIntroModal from '@/components/kakao-map/gpt-intro-modal'
import VisuallyHidden from '@/components/common/visually-hidden'
import Icon from '@/components/common/icon'
import { handleAIRecommendation } from './ai-recommendation'
import AiRecommendLottie from './ai-recommend-lottie'
import { recommendationChatsStorage } from '@/utils/storage'

const Recommendation = () => {
  const { data: user, status: userStatus } = useFetch(api.users.me.get, {
    key: ['user'],
  })
  const {
    data: recommendationUsage,
    status,
    revalidate,
    refetch,
  } = useFetch(api.gpt.usage.get, {
    key: ['recommendation-usage'],
  })
  const availableCount = recommendationUsage
    ? recommendationUsage.maxLimit - recommendationUsage.usageCount
    : 0
  const [chats, setChats] = useState<Chat[]>([])
  const [input, setInput] = useState('')
  const [isFinish, setIsFinish] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const bottomChat = useRef<HTMLDivElement>(null)
  const router = useSafeRouter()
  const { userLocation, allowLocation, handleUserLocation } =
    useUserGeoLocation()

  const handleQuestionCurrentLocation = (userInput: string) => {
    const locationKeywords = [
      '현재',
      '위치',
      '근처',
      '주변',
      '내 위치',
      '좌표',
      '내 주변',
      '현위치',
    ]

    const trimmedInput = userInput.trim()
    const containsLocationKeyword = locationKeywords.some((keyword) =>
      trimmedInput.includes(keyword),
    )

    if (!containsLocationKeyword) return { location: false, allow: null }
    return { location: true, allow: allowLocation }
  }

  const handleCulinaryClassWars = (userInput: string) => {
    const stopWords = ['흑백 요리사', '흑백요리사']
    const trimmedInput = userInput.trim()
    const containsStopWord = stopWords.some((stopWord) =>
      trimmedInput.includes(stopWord),
    )

    if (!containsStopWord) return false
    return true
  }

  const refetchUsage = () => {
    revalidate(['recommendation-usage'])
    refetch()
  }

  const askToAI = async (suggestion?: string) => {
    handleAIRecommendation({
      authorization: !!user,
      userLocation,
      question: suggestion || input,
      availableCount,
      chats,
      setChats,
      setIsFetching,
      setIsFinish,
      refetchUsage,
    })
  }

  const sendChat = async () => {
    setChats((prev) => [...prev, { type: 'user', value: input }])
    setInput('')
    const { location, allow } = handleQuestionCurrentLocation(input)
    const hasCulinaryClassWars = handleCulinaryClassWars(input)
    if (location && !allow) {
      setChats((prev) => [...prev, noInfoLocationChat])
    } else if (hasCulinaryClassWars) {
      setChats((prev) => [...prev, culinaryClassWarsChat])
    } else {
      await askToAI()
    }
  }

  const handleLocationPermission = async () => {
    const isAllow = handleUserLocation()
    if (isAllow) {
      await askToAI()
    } else {
      notify.error('브라우저에서 위치 액세스를 허용해주세요')
    }
  }

  const handleMapNavigation = async () => {
    try {
      const mapId = await getMapId()
      if (mapId) {
        router.push(`/map/${mapId}`)
      }
    } catch (err) {
      router.safeBack()
    }
  }

  const handleClickSuggestion = async (suggestion: string) => {
    switch (suggestion) {
      case '추천 종료':
        setIsFinish(true)
        setChats((prev) => [...prev, lastChat])
        break

      case '위치권한 허용하기':
        handleLocationPermission()
        break

      case '지도 홈으로':
        await handleMapNavigation()
        break

      case '처음으로':
        const chatGpt =
          availableCount > 0
            ? { ...initialRecommendChat, suggestionKeywords: [] }
            : usageCapReachedChat
        setChats((prev) => [
          ...prev,
          { type: 'user', value: suggestion },
          chatGpt,
        ])
        setIsFinish(false)
        break

      default:
        setChats((prev) => [...prev, { type: 'user', value: suggestion }])
        askToAI(suggestion)
        break
    }
  }

  useEffect(() => {
    if (userStatus === 'pending') return

    const savedChats = recommendationChatsStorage.getValueOrNull()
    if (user && savedChats) {
      setChats(savedChats)
    }

    bottomChat.current?.scrollIntoView({ behavior: 'smooth' })
    setChats((prev) => [...prev, initialRecommendChat])
  }, [user, userStatus])

  useEffect(() => {
    bottomChat.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chats, isFetching])

  return (
    <div className="flex min-h-dvh flex-col bg-neutral-700">
      <header className="header-gradient fixed left-1/2 top-0 z-[100] flex h-[90px] w-full max-w-[420px] -translate-x-1/2 px-[10px]">
        <div className="relative flex h-[80px] w-full items-center justify-between">
          <AccessibleIconButton
            icon={{ type: 'caretLeft', size: 'xl' }}
            label="이전 페이지"
            onClick={() => router.safeBack()}
          />
          <Typography
            className="absolute left-1/2 translate-x-[-50%]"
            as="h1"
            size="body0"
          >
            AI 맛집 추천받기
          </Typography>
          <button
            type="button"
            className="flex items-center rounded-full bg-neutral-500 px-2.5 py-1"
            onClick={() => setIsOpenModal(true)}
          >
            <VisuallyHidden>
              <div role="text">사용 정보 확인하기</div>
            </VisuallyHidden>
            <Icon type="ticket" size="md" aria-hidden />
            <Typography size="h7" color="neutral-000" className="ml-1">
              {availableCount}
            </Typography>
          </button>
        </div>
      </header>

      <section className="no-scrollbar h-dvh flex-1 overflow-y-scroll pb-[96px] pt-[80px]">
        <div className="relative flex flex-col items-center justify-center gap-4 pb-6">
          <img
            src="/images/ai.png"
            className="absolute left-5 top-0 h-[36px] w-[36px]"
          />

          <AiRecommendLottie />
          <Typography
            size="h4"
            color="neutral-000"
            className="whitespace-pre text-center"
          >{`${user?.nickname ?? ''}님, 반가워요.\nAI 맛집 추천 봇이에요!`}</Typography>
        </div>

        <ChatBox chats={chats} onClickSuggestion={handleClickSuggestion} />

        <div ref={bottomChat} />
      </section>

      <footer className="invitation-gradient fixed bottom-0 left-1/2 flex h-[96px] w-full max-w-[420px] -translate-x-1/2 content-center items-center px-5 pb-5 pt-7">
        <ChatInput
          value={input}
          isFetching={isFetching || status === 'pending'}
          isLimitReached={status === 'success' && availableCount <= 0}
          isFinish={isFinish}
          onChange={(value) => setInput(value)}
          sendChat={() => {
            if (isFetching || isFinish) return
            sendChat()
          }}
        />
      </footer>

      {isOpenModal && (
        <GptIntroModal
          isOpen={isOpenModal}
          confirmText="확인"
          onConfirm={() => setIsOpenModal(false)}
          onClose={() => setIsOpenModal(false)}
        />
      )}
    </div>
  )
}

export default Recommendation
