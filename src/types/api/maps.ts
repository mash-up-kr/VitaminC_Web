export interface TagItem {
  id: number
  mapId: string
  content: string
  createdAt: string
}

export interface MapDataType {
  id: string
  name: string
  users: [
    {
      id: number
      nickname: string
      role: string
    },
  ]
  registeredPlaceCount: number
  createdAt: Date
  updatedAt: Date
}
