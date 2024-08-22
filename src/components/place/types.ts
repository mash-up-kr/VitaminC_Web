import type { MouseEventHandler } from 'react'

import type { TagItem } from '@/models/api/maps'
import type { PlaceType } from '@/models/api/place'
import type { CategoryIcon } from '@/models/map'

export interface PlaceProps {
  placeId: PlaceType['place']['id']
  name: string
  address: string
  distance?: string
  category?: string
  categoryIconCode?: CategoryIcon
  tags?: TagItem[]
  pick?: {
    isMyPick: boolean
    numOfLikes: number
    isLiked: boolean
    onClickLike: MouseEventHandler<HTMLButtonElement>
  }
}
