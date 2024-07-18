import { PlaceType } from '@/types/api/place'

export interface PlaceProps {
  placeId: PlaceType['place']['id']
  name: string
  address: string
  distance?: string
  category?: string
  pick?: {
    isMyPick: boolean
    numOfLikes: number
    isLiked: boolean
    hashtags?: string[]
    onClickLike: () => void
  }
}
