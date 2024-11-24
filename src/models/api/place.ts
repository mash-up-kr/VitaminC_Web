import type { LikeUser } from '@/components/place/types'
import type { TagItem } from './maps'

import type { KakaoPlaceDetail } from '@/models/kakao-map'
import type { MapInfo } from '@/models/map'
import type { Creator } from '@/models/user'

// 등록된 곳
export interface KorrkPlace {
  place: {
    id: number
    kakaoPlace: KakaoPlaceDetail
    x: KakaoPlaceDetail['x']
    y: KakaoPlaceDetail['y']
  }
  tags: TagItem[]
  comments: unknown[]
  likedUser: Pick<LikeUser, 'id'>[]
  createdBy: {
    id: Creator['id']
    nickname: Creator['nickname']
  }
  createdAt: string
  updatedAt: string
}

// 검색할 수 있는 모든 곳
export interface PlaceItem {
  isRegisteredPlace: boolean
  placeId: KorrkPlace['place']['id']
  createdBy?: KorrkPlace['createdBy']
  likedUser: KorrkPlace['likedUser']
  tags: TagItem['name'][]

  kakaoId: KakaoPlaceDetail['id']
  x: KakaoPlaceDetail['x']
  y: KakaoPlaceDetail['y']
  placeName: KakaoPlaceDetail['name']
  category: KakaoPlaceDetail['category']
  categoryIconCode: KakaoPlaceDetail['categoryIconCode']
  address: KakaoPlaceDetail['address']
  score: KakaoPlaceDetail['score']
}

export const isKorrkPlace = (
  place: KorrkPlace | PlaceItem | PlaceDetail | null | undefined,
): place is KorrkPlace => {
  if (!place) return false
  return 'place' in place
}

export const isPlaceItem = (
  place: KorrkPlace | PlaceItem | null | undefined,
): place is PlaceItem => {
  if (!place) return false
  return 'isRegisteredPlace' in place
}

export interface PlaceMenuItem {
  menu: string
  price: string
  photo: string
}

// 검색할 수 있는 모든 곳의 상세 정보
export interface PlaceDetail {
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

  isRegisteredPlace: PlaceItem['isRegisteredPlace']

  id: KorrkPlace['place']['id']
  tags: KorrkPlace['tags']
  createdBy?: KorrkPlace['createdBy']

  mapId: MapInfo['id']
  likedUser?: LikeUser[]

  kakaoId: KakaoPlaceDetail['id']
  name: KakaoPlaceDetail['name']
  x: KakaoPlaceDetail['x']
  y: KakaoPlaceDetail['y']
  category: KakaoPlaceDetail['category']
  categoryIconCode: KakaoPlaceDetail['categoryIconCode']
  address: KakaoPlaceDetail['address']
  score: KakaoPlaceDetail['score']
  menuList: KakaoPlaceDetail['menuList']
  mainPhotoUrl: KakaoPlaceDetail['mainPhotoUrl']
  photoList: KakaoPlaceDetail['photoList']
  createdAt: KakaoPlaceDetail['createdAt']
  updatedAt: KakaoPlaceDetail['updatedAt']
}
