import { forwardRef } from 'react'
import { AccessibleIconButton, Typography } from '@/components'
import PickChip from './pick-chip'
import HashtagList from './hashtag-list'

interface PlaceMapPopupProps {
  name: string
  image: string
  distance: string
  address: string
  category?: string
  pick?: {
    isMyPick: boolean
    like: number
    isLiked: boolean
    hashtags: string[]
    onClickLike: () => void
  }
}

const PlaceMapPopup = forwardRef<HTMLDivElement, PlaceMapPopupProps>(
  ({ name, image, distance, address, category, pick }, ref) => {
    return (
      <section
        ref={ref}
        className="w-[335px] rounded-[10px] bg-neutral-700 p-5 flex flex-col gap-4"
      >
        <div className="flex gap-2 justify-between h-[83px]">
          <div className="flex flex-col justify-between">
            <div className="flex flex-col gap-1 ">
              <div className="flex gap-1.5 items-end">
                <Typography as="h2" size="h4">
                  {name}
                </Typography>
                <Typography as="span" size="body3" color="neutral-400">
                  {category}
                </Typography>
              </div>
              <div className="flex gap-2">
                <Typography as="span" size="body3" color="neutral-300">
                  {distance}
                </Typography>
                <Typography as="span" size="body3" color="neutral-300">
                  {address}
                </Typography>
              </div>
            </div>
            {pick && (
              <div className="flex gap-3 items-center">
                <PickChip isMyPick={pick.isMyPick} />
                <div className="flex items-center gap-0.5">
                  <AccessibleIconButton
                    label={pick.isLiked ? '좋아요 취소' : '좋아요'}
                    icon={{
                      type: 'heartStraightOutlined',
                      stroke: pick.isLiked ? 'orange-400' : 'neutral-200',
                      fill: pick.isLiked ? 'orange-400' : undefined,
                      'aria-hidden': true,
                      className: 'w-4 h-4',
                    }}
                  />
                  <Typography
                    size="body1"
                    color="neutral-200"
                    className="font-medium"
                  >
                    {pick.like}
                  </Typography>
                </div>
              </div>
            )}
          </div>
          <img className="rounded-md w-20 h-20" src={image} alt="식당" />
        </div>
        {pick?.hashtags.length ? (
          <HashtagList hashtags={pick.hashtags} />
        ) : null}
      </section>
    )
  },
)

PlaceMapPopup.displayName = 'PlaceMapPopup'

export default PlaceMapPopup
