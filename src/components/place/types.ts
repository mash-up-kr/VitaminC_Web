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
