import type { IconKey } from '@/components/common/icon'
import type { DateTimeType, MutatedAt } from './interface'
import type { Creator, User } from './user.interface'

type MapRole = 'ADMIN' | 'READ' | 'WRITE'

export interface MapMemberData {
  id: User['id']
  nickname: string
  role: MapRole
}
export interface UserByMapInfo extends MutatedAt {
  id: MapInfo['id']
  name: MapInfo['name']
  role: MapRole
}

export interface MapInfo extends MutatedAt {
  id: string
  name: string
  createBy: Creator
  registeredPlaceCount: number
  users: MapMemberData[]
}

export interface InviteLink {
  token: string
  createdAt: DateTimeType
  mapRole: MapRole
  expiresAt: DateTimeType
}

export interface MapInviteInfoResponseType {
  map: MapInfo
  inviteLink: InviteLink
  placePreviewList: string[]
}

export const enum CategoryIcon {
  '찜 탕 찌개' = 1,
  '돈까스 회 일식',
  '피자',
  '고기 구기',
  '호프 요리주점',
  '양식',
  '치킨',
  '중식',
  '아시안',
  '백반 죽 국수',
  '분식',
  '카페 디저트',
  '패스트푸드',
  '기타' = 100,
}

export const categoryIcons: Record<CategoryIcon, IconKey> = {
  [CategoryIcon['찜 탕 찌개']]: '찜',
  [CategoryIcon['돈까스 회 일식']]: '일식',
  [CategoryIcon['피자']]: '피자',
  [CategoryIcon['고기 구기']]: '고기',
  [CategoryIcon['호프 요리주점']]: '호프',
  [CategoryIcon['양식']]: '양식',
  [CategoryIcon['치킨']]: '치킨',
  [CategoryIcon['중식']]: '중식',
  [CategoryIcon['아시안']]: '아시안',
  [CategoryIcon['백반 죽 국수']]: '백반',
  [CategoryIcon['분식']]: '분식',
  [CategoryIcon['카페 디저트']]: '카페',
  [CategoryIcon['패스트푸드']]: '패스트푸드',
  [CategoryIcon['기타']]: '기타',
}
