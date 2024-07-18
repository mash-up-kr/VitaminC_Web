import { KakaoPlaceDetail } from '../map/kakao-raw-type'
import { TagItem } from './maps'

export interface PlaceType {
  place: {
    id: number
    kakaoPlace: KakaoPlaceDetail
    x: number
    y: number
  }
  tags: TagItem[]
  comments: [{}]
  likedUserIds: number[]
  createdBy: {
    id: number
    nickname: string
  }
  createdAt: string
  updatedAt: string
}
