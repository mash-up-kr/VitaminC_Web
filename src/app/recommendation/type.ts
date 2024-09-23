import type { PlaceDetail } from '@/models/api/place'

export type Chat =
  | {
      type: 'gpt'
      value: string
      suggestionPlaces?: {
        name: PlaceDetail['name']
        address: PlaceDetail['address']
        reason: string
        placeId: PlaceDetail['id']
      }[]
      suggestionKeywords: string[]
    }
  | { type: 'user'; value: string }
