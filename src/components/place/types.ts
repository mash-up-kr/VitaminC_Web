import type { MouseEventHandler } from 'react'

import type { TagItem } from '@/types/api/maps'
import type { PlaceType } from '@/types/api/place'
import { CategoryIcon } from '@/models/map.interface'

export interface PlaceProps {
  placeId: PlaceType['place']['id']
  name: string
  address: string
  distance?: string
  category?: string
  categoryIconCode: CategoryIcon
  tags?: TagItem[]
  pick?: {
    isMyPick: boolean
    numOfLikes: number
    isLiked: boolean
    onClickLike: MouseEventHandler<HTMLButtonElement>
  }
}
