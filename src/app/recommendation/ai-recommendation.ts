import type { Dispatch, SetStateAction } from 'react'

import type { Chat } from './type'
import {
  confusingInputChat,
  noAuthorizationChat,
  usageCapReachedChat,
} from './guide'
import { api } from '@/utils/api'
import type { LocationType } from '@/models/kakao-map'

interface AIRecommendationProps {
  authorization: boolean
  userLocation: LocationType
  question: string
  availableCount: number
  chats: Chat[]
  setChats: Dispatch<SetStateAction<Chat[]>>
  setIsFetching: Dispatch<SetStateAction<boolean>>
  setIsFinish: Dispatch<SetStateAction<boolean>>
  refetchUsage: VoidFunction
}

export const handleAIRecommendation = async ({
  authorization,
  userLocation,
  question,
  availableCount,
  chats,
  setChats,
  setIsFetching,
  setIsFinish,
  refetchUsage,
}: AIRecommendationProps) => {
  if (!authorization) {
    setChats((prev) => [...prev, noAuthorizationChat])
    return
  }

  if (availableCount <= 0) {
    setChats((prev) => [...prev, usageCapReachedChat])
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
    const recommendationApi =
      process.env.NODE_ENV === 'production'
        ? api.gpt.restaurants.recommend
        : api.gpt.restaurants.recommend.test
    const response = await recommendationApi.get(question, x, y)

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    const loopRunner = true
    while (loopRunner) {
      const { value, done } = await reader.read()
      if (done) {
        break
      }

      const decodedChunk = decoder.decode(value, { stream: true })

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
                    suggestionPlaces: [...(chat.suggestionPlaces || []), data],
                  }
                }
                return chat
              }),
            )
          }
        }
      } catch (err) {
        console.error(err)
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
    refetchUsage()
  } catch (error) {
  } finally {
    setIsFetching(false)
  }
}
