export interface PlaceProps {
  placeId: string
  name: string
  address: string
  distance?: string
  category?: string
  pick?: {
    isMyPick: boolean
    like: number
    isLiked: boolean
    hashtags: string[]
    onClickLike: () => void
  }
}
