import type { DateTimeType, MutatedAt } from './interface'

type MapRole = 'ADMIN' | 'READ' | 'WRITE'

export interface MapUser {
  id: number
  nickname: string
  role: MapRole
}
export interface UserByMap extends MutatedAt {
  id: string
  name: string
  role: MapRole
}

export interface MapInfo extends MutatedAt {
  id: string
  name: string
  creator: MapUser
  registeredPlaceCount: number
  users: MapUser[]
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
