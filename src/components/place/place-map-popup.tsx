import { forwardRef } from 'react'
import { Typography, PickChip, TagList, LikeButton } from '@/components'
import type { ClassName } from '@/models/interface'
import cn from '@/utils/cn'
import { formatDistance, getDistance } from '@/utils/location'
import useUserGeoLocation from '@/hooks/use-user-geo-location'
import type { PlaceType } from '@/types/api/place'

interface PlaceMapPopupProps extends ClassName {
  selectedPlace: PlaceType
}

// TODO: 클릭 시 식당 상세로 이동 로직
const PlaceMapPopup = forwardRef<HTMLDivElement, PlaceMapPopupProps>(
  ({ selectedPlace, className }, ref) => {
    const userLocation = useUserGeoLocation()
    const place = selectedPlace.place
    const distance = formatDistance(
      getDistance(
        userLocation.latitude,
        userLocation.longitude,
        place.y,
        place.x,
      ),
    )
    const kakaoPlace = place.kakaoPlace
    const tags = selectedPlace.tags
    const pick = {
      //TODO: userId 연동
      isLiked: selectedPlace.likedUserIds.includes(1),
      isMyPick: selectedPlace.createdBy.id === 1,
      numOfLikes: selectedPlace.likedUserIds.length,
      onClickLike: () => null,
    }

    return (
      <div
        role="presentation"
        className={cn('flex justify-center w-full', className)}
      >
        <section
          ref={ref}
          className="w-full rounded-[10px] bg-neutral-700 p-5 flex flex-col gap-4"
        >
          <div className="flex gap-2 justify-between h-[83px]">
            <div className="flex flex-col justify-between">
              <div className="flex flex-col gap-1 ">
                <div className="flex gap-1.5 items-end">
                  <Typography as="h2" size="h4">
                    {kakaoPlace.name}
                  </Typography>
                  <Typography as="span" size="body3" color="neutral-400">
                    {kakaoPlace.category}
                  </Typography>
                </div>

                <div className="flex gap-2">
                  <Typography as="span" size="body3" color="neutral-300">
                    {distance}
                  </Typography>
                  <Typography as="span" size="body3" color="neutral-300">
                    {kakaoPlace.address}
                  </Typography>
                </div>
              </div>

              {pick && (
                <div className="flex gap-3 items-center">
                  <PickChip isMyPick={pick.isMyPick} />
                  <LikeButton
                    numOfLikes={pick.numOfLikes}
                    isLiked={pick.isLiked}
                    onClick={pick.onClickLike}
                  />
                </div>
              )}
            </div>

            <img
              className="rounded-md w-20 h-20"
              src={kakaoPlace.photoList?.[0]}
              alt="식당"
            />
          </div>
          {tags?.length && <TagList placeId={kakaoPlace.id} tags={tags} />}
        </section>
      </div>
    )
  },
)

PlaceMapPopup.displayName = 'PlaceMapPopup'

export default PlaceMapPopup
