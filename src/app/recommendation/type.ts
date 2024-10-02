import type { PlaceDetail } from '@/models/api/place'

export interface AISuggestionPlace {
  name: PlaceDetail['name']
  score: PlaceDetail['score']
  address: PlaceDetail['address']
  openTimeList: { timeSE: string; timeName: string; dayOfWeek: string }[]
  id: PlaceDetail['id']
  photoList: PlaceDetail['photoList']
}
interface ChatGPT {
  type: 'gpt-typing' | 'gpt-stream'
  value: string
  suggestionPlaces?: AISuggestionPlace[]
  suggestionKeywords: string[]
}

interface ChatUser {
  type: 'user'
  value: string
}

export type Chat = ChatGPT | ChatUser
