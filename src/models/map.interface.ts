import type { DateTimeType, MutatedAt } from './interface'
import { User } from './user.interface'

type MapRole = 'ADMIN' | 'READ' | 'WRITE'

export interface CreateBy {
  id: User['id']
  nickname: User['nickname']
  provider: string
  providerId: string
}
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
  createBy: CreateBy
  registeredPlaceCount: number
  users: MapMemberData[]
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
