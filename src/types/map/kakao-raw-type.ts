import { CategoryIcon } from '../../models/map.interface'

export interface KakaoPlaceItem {
  address_name: string // "서울 강남구 역삼동 669-17"
  category_group_code: string // "FD6"
  category_group_name: string // "음식점"
  category_name: string // "음식점 > 한식 > 육류,고기 > 곱창,막창"
  distance: string // ""
  id: number // "1261894710"
  phone: string // "02-555-7364"
  place_name: string // "세광양대창 역삼GS타워점"
  place_url: string // "http://place.map.kakao.com/1261894710"
  road_address_name: string // "서울 강남구 논현로94길 13"
  x: number // "127.037366122263"
  y: number // "37.5026329250425"
}

export interface KakaoPlaceDetail {
  id: number // 762214594
  name: string // '정분네중앙곱창 강남본점'
  category: string // '음식점'
  categoryIconCode: CategoryIcon // 100
  address: string // '정분네중앙곱창 강남본점'
  x: number // 0
  y: number // 0
  menuList: {
    menu: string // '구이양념막창'
    price: string // '14,000'
  }[]
  photoList: string[] // ['http://t1.daumcdn.net/place/6DCE4A7D51924FE3A4437B8C91C553D4', 'http://t1.daumcdn.net/local/kakaomapPhoto/review/ed7aa0ecafdfb578c6b394f6f1e76d1dfca5d99e?original']
  createdAt: Date // '2024-06-29T18:08:11.692Z'
  updatedAt: Date // '2024-06-29T18:11:05.368Z'
  mainPhotoUrl: string
  score?: number
}
