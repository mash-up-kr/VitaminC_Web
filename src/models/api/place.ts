import type { LikeUser } from '@/components/place/types'
import type { TagItem } from './maps'

import type { KakaoPlaceDetail } from '@/models/kakao-map'
import type { MapInfo } from '@/models/map'
import type { Creator } from '@/models/user'

interface Coordinates {
  x: KakaoPlaceDetail['x']
  y: KakaoPlaceDetail['y']
}

interface BaseKakaoPlace {
  kakaoId: KakaoPlaceDetail['id']
  category: KakaoPlaceDetail['category']
  categoryIconCode: KakaoPlaceDetail['categoryIconCode']
  address: KakaoPlaceDetail['address']
  score: KakaoPlaceDetail['score']
}

// 등록된 곳
export interface KorrkPlace {
  place: {
    id: number
    kakaoPlace: KakaoPlaceDetail
  } & Coordinates
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

// 검색할 수 있는 모든 장소
export interface PlaceItem extends BaseKakaoPlace, Coordinates {
  placeName: KakaoPlaceDetail['name']

  isRegisteredPlace: boolean

  placeId: KorrkPlace['place']['id']
  createdBy?: KorrkPlace['createdBy']
  likedUser: KorrkPlace['likedUser']

  tags: TagItem['name'][]
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

interface OpenTime {
  dayOfWeek: string
  timeName: string
  timeSE: string
}

interface OffDay {
  holidayName: string
  weekAndDay: string
  temporaryHolidays: string
}

// 검색할 수 있는 모든 곳의 상세 정보
export interface PlaceDetail extends BaseKakaoPlace, Coordinates {
  name: KakaoPlaceDetail['name']
  menuList: KakaoPlaceDetail['menuList']
  mainPhotoUrl: KakaoPlaceDetail['mainPhotoUrl']
  photoList: KakaoPlaceDetail['photoList']
  createdAt: KakaoPlaceDetail['createdAt']
  updatedAt: KakaoPlaceDetail['updatedAt']

  commentCnt: number
  blogReviewCnt: number
  openTimeList: OpenTime[]
  offDayList: OffDay[]

  isRegisteredPlace: PlaceItem['isRegisteredPlace']

  id: KorrkPlace['place']['id']
  tags: KorrkPlace['tags']
  createdBy?: KorrkPlace['createdBy']

  mapId: MapInfo['id']
  likedUser?: LikeUser[]
}
