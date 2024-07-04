export interface PlaceProps {
  placeId: string
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
