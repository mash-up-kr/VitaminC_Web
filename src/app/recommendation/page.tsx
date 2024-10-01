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
  confusingInputChat,
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

const Recommendation = () => {
  const { data: user } = useFetch(api.users.me.get, {
    key: ['user'],
  })
  const {
    data: recommendationUsage,
    status,
    revalidate,
  } = useFetch(api.gpt.usage.get, {
    key: ['recommendation-usage'],
  })
  const availableCount = recommendationUsage
    ? recommendationUsage.maxLimit - recommendationUsage.usageCount
    : 0
  const [input, setInput] = useState('')
  const [chats, setChats] = useState<Chat[]>([initialRecommendChat])
  const [isFinish, setIsFinish] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const bottomChat = useRef<HTMLDivElement>(null)
  const router = useSafeRouter()
  const { userLocation, allowLocation } = useUserGeoLocation()

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

  const askToAI = async (suggestion?: string) => {
    if (availableCount === 0) {
      setChats((prev) => [
        ...prev,
        { ...usageCapReachedChat, suggestionKeywords: [] },
      ])
      return
    }

    setIsFetching(true)

    const isLastChat = (index: number) => chats.length + 1 === index

    setChats((prev) => [
      ...prev,
      {
        type: 'gpt-stream',
        value: '',
        suggestionKeywords: [],
      },
    ])

    try {
      const x = String(userLocation?.longitude || '')
      const y = String(userLocation?.latitude || '')
      const response = await api.gpt.restaurants.recommend.test.get(
        suggestion || input,
        x,
        y,
      )

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      const loopRunner = true
      while (loopRunner) {
        const { value, done } = await reader.read()
        if (done) {
          break
        }

        const decodedChunk = decoder.decode(value, { stream: true })
        setIsFetching(false)

        try {
          const isError = /event: error/g.exec(decodedChunk)
          if (isError) {
            setChats((prev) =>
              prev.map((chat, index) => {
                if (isLastChat(index)) {
                  return confusingInputChat
                }
                return chat
              }),
            )
            return
          }

          const parseTextData = (text: string) => {
            const arr = []
            const regex = /data: ({.*?})\n/g
            const matches = text.match(regex) || []
            for (const match of matches) {
              const jsonData = JSON.parse(
                match?.replace('\n', '').replace('data: ', ''),
              )
              arr.push(jsonData)
            }
            return arr
          }

          const jsonArr = parseTextData(decodedChunk)

          for (const { data, type } of jsonArr) {
            if (type === 'text') {
              const character = data
              setChats((prev) =>
                prev.map((chat, index) => {
                  if (isLastChat(index)) {
                    return {
                      ...chat,
                      value: chat.value + character,
                    }
                  }
                  return chat
                }),
              )
            } else if (type === 'json') {
              setChats((prev) =>
                prev.map((chat, index) => {
                  if (isLastChat(index) && chat.type === 'gpt-stream') {
                    return {
                      ...chat,
                      suggestionPlaces: [
                        ...(chat.suggestionPlaces || []),
                        data,
                      ],
                    }
                  }
                  return chat
                }),
              )
            }
          }
        } catch (err) {
          console.log(err)
        }
      }

      setChats((prev) =>
        prev.map((chat, index) => {
          if (isLastChat(index)) {
            return {
              ...chat,
              suggestionKeywords: ['처음으로'],
            }
          }
          return chat
        }),
      )

      setIsFinish(true)
      revalidate(['recommendation-usage'])
    } catch (error) {
    } finally {
      setIsFetching(false)
    }
  }

  const sendChat = async () => {
    setChats((prev) => [...prev, { type: 'user', value: input }])
    setInput('')
    const { location, allow } = handleQuestionCurrentLocation(input)
    if (!location) {
      askToAI()
      return
    }
    if (allow) {
      await askToAI()
      return
    }
    setChats((prev) => [...prev, noInfoLocationChat])
  }

  const handleLocationPermission = () => {
    navigator.geolocation.getCurrentPosition(
      async () => {
        await askToAI()
      },
      () => {
        notify.error('현재 위치를 찾을 수 없습니다.')
      },
    )
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
        const chatGpt = availableCount
          ? initialRecommendChat
          : usageCapReachedChat
        setChats((prev) => [
          ...prev,
          { type: 'user', value: suggestion },
          { ...chatGpt, suggestionKeywords: [] },
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

      <section className="no-scrollbar max-h-[calc(100vh-96px)] flex-1 overflow-y-scroll pt-[80px]">
        <div className="relative flex flex-col items-center justify-center gap-4 pb-6">
          <img
            src="/images/ai.png"
            className="absolute left-5 top-0 h-[36px] w-[36px]"
          />
          <img src="/images/ai-recommend.png" className="h-[112px] w-[213px]" />
          <Typography
            size="h4"
            color="neutral-000"
            className="whitespace-pre text-center"
          >{`${user?.nickname ?? ''}님, 반가워요.\nAI 맛집 추천 봇이에요!`}</Typography>
        </div>

        <ChatBox
          chats={chats}
          isFetching={isFetching || status === 'pending'}
          className="flex-1 px-5"
          onClickSuggestion={handleClickSuggestion}
        />

        <div ref={bottomChat} />
      </section>

      <footer className="invitation-gradient h-[96px] px-5 pb-5 pt-7">
        <ChatInput
          value={input}
          isFetching={isFetching || status === 'pending'}
          isLimitReached={chats.length > 1 && availableCount === 0}
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
