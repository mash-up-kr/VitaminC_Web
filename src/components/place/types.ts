export interface PlaceProps {
  placeId: number
  name: string
  address: string
  distance?: string
  category?: string
  pick?: {
    isMyPick: boolean
    numOfLikes: number
    isLiked: boolean
    hashtags?: string[]
    onClickLike: () => void
  }
}

export interface PlaceType {
  place: {
    id: number
    kakaoPlace: {
      id: number
      name: string
      category: string
      address: string
      x: number
      y: number
      menuList: {
        menu: string
        price: string
      }[]
      photoList: string[]
    }
    x: number
    y: number
  }
  tags: [
    {
      id: number
      mapId: string
      content: string
      createdAt: string
    },
  ]
  comments: [{}]
  likedUserIds: number[]
  createdBy: {
    id: number
    nickname: string
  }
  createdAt: string
  updatedAt: string
}
