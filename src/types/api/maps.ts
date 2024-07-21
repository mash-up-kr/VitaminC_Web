import type { IconKey } from '@/components/common/icon'

export interface TagItem {
  id: number
  type: IconKey
  mapId: string
  content: string
  createdAt: string
}

export interface User {
  id: number
  nickname: string
  role: string
}

export interface MapDataType {
  id: string
  name: string
  users: User[]
  registeredPlaceCount: number
  createdAt: Date
  updatedAt: Date
}
