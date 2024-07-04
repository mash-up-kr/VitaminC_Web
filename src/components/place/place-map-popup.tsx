import { forwardRef } from 'react'
import { Typography, PickChip, HashtagList, LikeButton } from '@/components'
import { PlaceProps } from './types'

interface PlaceMapPopupProps extends PlaceProps {
  image: string
}

// TODO: 클릭 시 식당 상세로 이동 로직
const PlaceMapPopup = forwardRef<HTMLDivElement, PlaceMapPopupProps>(
  ({ placeId, name, image, distance, address, category, pick }, ref) => {
    return (
      <div role="presentation" className="flex justify-center pb-5">
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
                  <LikeButton
                    like={pick.numOfLike}
                    isLiked={pick.isLiked}
                    onClickLike={pick.onClickLike}
                  />
                </div>
              )}
            </div>

            <img className="rounded-md w-20 h-20" src={image} alt="식당" />
          </div>
          {pick?.hashtags?.length && (
            <HashtagList placeId={placeId} hashtags={pick.hashtags} />
          )}
        </section>
      </div>
    )
  },
)

PlaceMapPopup.displayName = 'PlaceMapPopup'

export default PlaceMapPopup
