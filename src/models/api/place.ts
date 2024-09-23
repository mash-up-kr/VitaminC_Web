import type { LikeUser } from '@/components/place/types'
import type { TagItem } from './maps'

import type { KakaoPlaceDetail } from '@/models/kakao-map'
import type { CategoryIcon, MapInfo } from '@/models/map'
import type { Creator } from '@/models/user'

export interface PlaceType {
  place: {
    id: number
    kakaoPlace: KakaoPlaceDetail
    x: number
    y: number
  }
  tags: TagItem[]
  comments: unknown[]
  likedUser: Pick<LikeUser, 'id'>[]
  createdBy: {
    id: number
    nickname: string
  }
  createdAt: string
  updatedAt: string
}

export interface SearchPlace {
  isRegisteredPlace: boolean
  kakaoId: PlaceType['place']['kakaoPlace']['id']
  category: string
  categoryIconCode: CategoryIcon
  x: number
  y: number
  placeName: string
  address: string
  placeId: PlaceType['place']['id']
  tags: string[]
  createdBy?: Creator
  score: number
  likedUser: Pick<LikeUser, 'id'>[]
}

export const isSearchPlace = (
  place: PlaceType | SearchPlace | null | undefined,
): place is SearchPlace => {
  if (!place) return false
  return 'isRegisteredPlace' in place
}

export const isPlaceType = (
  place: PlaceType | SearchPlace | null | undefined,
): place is PlaceType => {
  if (!place) return false
  return 'place' in place
}

export interface PlaceMenuItem {
  menu: string
  price: string
  photo: string
}
export interface PlaceDetail {
  id: PlaceType['place']['id']
  kakaoId: PlaceType['place']['kakaoPlace']['id']
  mapId: MapInfo['id']
  isRegisteredPlace: boolean
  likedUser?: LikeUser[]
  tags: TagItem[]
  createdBy?: PlaceType['createdBy']
  name: string
  category: string
  categoryIconCode: CategoryIcon
  address: string
  x: number
  y: number
  menuList: PlaceMenuItem[]
  mainPhotoUrl: string
  photoList: string[]
  score: number
  commentCnt: number
  blogReviewCnt: number
  openTimeList: {
    dayOfWeek: string
    timeName: string
    timeSE: string
  }[]
  offDayList: {
    holidayName: string
    weekAndDay: string
    temporaryHolidays: string
  }[]
  createdAt: string
  updatedAt: string
}
