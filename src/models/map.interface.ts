import { MapMemberData } from '@/types/api/maps'
import type { DateTimeType, MutatedAt } from './interface'

type MapRole = 'ADMIN' | 'READ' | 'WRITE'
export interface UserByMap extends MutatedAt {
  id: number
  name: string
  role: MapRole
}

export interface MapListItemResponse extends MutatedAt {
  id: string
  name: string
  role: MapRole
}

export interface MapInfo extends MutatedAt {
  id: string
  name: string
  creator: UserByMap
  registeredPlaceCount: number
  users: UserByMap[]
}

export interface InviteLink {
  token: string
  createdAt: DateTimeType
  mapRole: MapRole
  expiresAt: DateTimeType
}

export interface PlacePreview {
  // 임시 설정
  [key: string]: string
}

export interface MapInviteInfoResponseType {
  map: MapInfo
  inviteLink: InviteLink
  placePreviewList: PlacePreview[]
}
