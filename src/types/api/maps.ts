export interface TagItem {
  id: number
  mapId: string
  content: string
  createdAt: string
}

export interface MapDataType {
  id: string
  name: string
  users: MapMemberData[]
  registeredPlaceCount: number
  createdAt: Date
  updatedAt: Date
}

export interface MapMemberData {
  id: number
  nickname: string
  role: string
}
