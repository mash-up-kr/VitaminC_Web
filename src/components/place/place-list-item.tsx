import { forwardRef } from 'react'
import {
  Typography,
  PickChip,
  LikeButton,
  HashtagList,
  Icon,
} from '@/components'

interface PlaceListItemProps {
  name: string
  address: string
  rate: number
  images?: string[]
  pick?: {
    isMyPick: boolean
    like: number
    isLiked: boolean
    hashtags: string[]
    onClickLike: () => void
  }
}

// TODO: 클릭 시 식당 상세로 이동 로직
const PlaceListItem = forwardRef<HTMLDivElement, PlaceListItemProps>(
  ({ name, address, rate, images, pick }, ref) => {
    return (
      <section
        ref={ref}
        className="bg-neutral-700 w-full py-4 px-5 flex flex-col gap-3.5 "
      >
        {images && (
          <div className="flex box-border gap-2 max-x-[335px] items-center justify-center overflow-x-scroll no-scrollbar">
            {images.map((image, idx) => (
              <img
                key={image}
                src={image}
                className="w-[106px] h-[106px] rounded-md"
                alt={`${name}${idx}`}
              />
            ))}
          </div>
        )}

        <div className="flex flex-col gap-2 ">
          <div className="flex items-center justify-between">
            <Typography as="h2" size="h4" className="w-[194px]">
              {name}
            </Typography>
            {pick && (
              <div className="flex items-center gap-3">
                <PickChip isMyPick={pick.isMyPick} />
                <LikeButton
                  like={pick.like}
                  isLiked={pick.isLiked}
                  onClickLike={pick.onClickLike}
                />
              </div>
            )}
          </div>

          <div className="flex items-center gap-[7px]">
            <div className="flex gap-0.5 items-center">
              <Icon type="star" size="sm" fill="yellow-100" />
              <Typography as="span" size="body3" color="neutral-300">
                {rate}
              </Typography>
            </div>
            <Typography as="span" size="body3" color="neutral-300">
              {address}
            </Typography>
          </div>
        </div>

        {pick?.hashtags && <HashtagList hashtags={pick.hashtags} />}
      </section>
    )
  },
)

PlaceListItem.displayName = 'PlaceListItem'

export default PlaceListItem
