import { MapInfo } from '@/models/map.interface'
import { KakaoPlaceDetail } from '../map/kakao-raw-type'
import { TagItem } from './maps'
import { User } from '@/models/user.interface'

export interface PlaceType {
  place: {
    id: number
    kakaoPlace: KakaoPlaceDetail
    x: number
    y: number
  }
  tags: TagItem[]
  comments: unknown[]
  likedUserIds?: User['id'][]
  createdBy?: {
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
  x: number
  y: number
  placeName: string
  address: string
  placeId: PlaceType['place']['id']
  tags: TagItem[]
  createdBy?: {
    id: User['id']
    nickname: string
  }
  score: number
  likedUserIds?: User['id'][]
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
  likedUserIds?: User['id'][]
  tags: TagItem[]
  createdBy?: PlaceType['createdBy']
  name: string
  category: string
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
