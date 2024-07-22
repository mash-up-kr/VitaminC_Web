import { TagItem } from '@/types/api/maps'
import { PlaceType } from '@/types/api/place'

export interface PlaceProps {
  placeId: PlaceType['place']['id']
  name: string
  address: string
  distance?: string
  category?: string
  tags?: TagItem[]
  pick?: {
    isMyPick: boolean
    numOfLikes: number
    isLiked: boolean
    onClickLike: () => void
  }
}
