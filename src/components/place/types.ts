import type { MouseEventHandler } from 'react'

import type { TagItem } from '@/models/api/maps'
import type { KorrkPlace } from '@/models/api/place'
import type { CategoryIcon } from '@/models/map'
import type { User } from '@/models/user'

export interface LikeUser {
  id: User['id']
  nickname: string
  profileImage: string
}

export interface PlaceProps {
  placeId: KorrkPlace['place']['id']
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
