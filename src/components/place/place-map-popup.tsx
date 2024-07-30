'use client'

import { forwardRef, useState, useEffect } from 'react'
import { Typography, PickChip, TagList, LikeButton, Icon } from '@/components'
import { APIError, type ClassName } from '@/models/interface'
import cn from '@/utils/cn'
import { formatDistance, getDistance } from '@/utils/location'
import useUserGeoLocation from '@/hooks/use-user-geo-location'
import type { PlaceType } from '@/types/api/place'
import Link from 'next/link'
import { User } from '@/models/user.interface'
import { api } from '@/utils/api'
import { notify } from '../common/custom-toast'
import { getMapId } from '@/services/map-id'
import { allowUserPositionStorage } from '@/utils/storage'
import { IconKey } from '../common/icon'
import { getStarByScore } from '@/utils/score'

interface PlaceMapPopupProps extends ClassName {
  selectedPlace: PlaceType
}

const PlaceMapPopup = forwardRef<HTMLAnchorElement, PlaceMapPopupProps>(
  ({ selectedPlace, className }, ref) => {
    const isAllowPosition = allowUserPositionStorage.getValueOrNull()
    const userLocation = useUserGeoLocation()
    const [isLikePlace, setIsLikePlace] = useState(false)
    const [userId, setUserId] = useState<User['id']>()

    const place = selectedPlace.place

    const distance = formatDistance(
      getDistance(
        userLocation.latitude,
        userLocation.longitude,
        place.y,
        place.x,
      ),
    )

    const getNumOfLike = () => {
      const initialNumOfLike = selectedPlace.likedUserIds.length

      if (!userId) return initialNumOfLike
      if (selectedPlace.likedUserIds.includes(userId)) {
        if (isLikePlace) return initialNumOfLike
        return initialNumOfLike - 1
      }
      if (isLikePlace) return initialNumOfLike + 1
      return initialNumOfLike
    }

    const handleLikePlace = async () => {
      try {
        const mapId = await getMapId()
        if (!mapId) throw new Error('잘못된 접근입니다.')

        setIsLikePlace(true)
        await api.place.mapId.placeId.like.put({
          placeId: place.id,
          mapId,
        })
      } catch (error) {
        setIsLikePlace(false)
        if (error instanceof APIError || error instanceof Error) {
          notify.error(error.message)
        }
      }
    }

    const handleUnLikePlace = async () => {
      try {
        const mapId = await getMapId()
        if (!mapId) throw new Error('잘못된 접근입니다.')

        setIsLikePlace(false)
        await api.place.mapId.placeId.like.delete({
          placeId: place.id,
          mapId,
        })
      } catch (error) {
        setIsLikePlace(true)
        if (error instanceof APIError || error instanceof Error) {
          notify.error(error.message)
        }
      }
    }

    const kakaoPlace = place.kakaoPlace
    const tags = selectedPlace.tags
    const pick = {
      isLiked: isLikePlace,
      isMyPick: selectedPlace.createdBy.id === userId,
      numOfLikes: getNumOfLike(),
      onClickLike: isLikePlace ? handleUnLikePlace : handleLikePlace,
    }

    useEffect(() => {
      const getUserId = async () => {
        try {
          const {
            data: { id },
          } = await api.users.me.get()
          setUserId(id)
          setIsLikePlace(selectedPlace.likedUserIds.includes(id))
        } catch (error) {
          if (error instanceof APIError) {
            notify.error(error.message)
          }
        }
      }

      getUserId()
    }, [selectedPlace])

    return (
      <div
        role="presentation"
        className={cn('flex justify-center w-full', className)}
      >
        <Link
          href={`/place/${place.id}`}
          ref={ref}
          className="w-full rounded-[10px] bg-neutral-700 p-5 flex flex-col gap-4 z-10"
        >
          <div className="flex gap-2 justify-between h-[83px]">
            <div className="flex flex-col justify-between">
              <div className="flex flex-col gap-1 ">
                <div className="flex gap-1.5 items-end">
                  <Typography
                    as="h2"
                    size="h4"
                    className="text-ellipsis overflow-hidden"
                  >
                    {kakaoPlace.name}
                  </Typography>
                  <Typography as="span" size="body3" color="neutral-400">
                    {kakaoPlace.category}
                  </Typography>
                </div>

                <div className="flex gap-2">
                  {kakaoPlace.score && (
                    <div className="flex gap-0.5 items-center">
                      <Icon
                        type={getStarByScore(kakaoPlace.score)}
                        size="sm"
                        fill="yellow-100"
                      />
                      <Typography as="span" size="body3" color="neutral-300">
                        {kakaoPlace.score}
                      </Typography>
                    </div>
                  )}
                  <Typography
                    as="span"
                    size="body3"
                    color="neutral-300"
                    className="text-ellipsis overflow-hidden"
                  >
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
                    onClick={(e) => {
                      e.stopPropagation()
                      e.preventDefault()
                      pick.onClickLike()
                    }}
                  />
                </div>
              )}
            </div>

            <img
              className="rounded-md w-20 h-20"
              src={kakaoPlace.mainPhotoUrl}
              alt="식당"
            />
          </div>

          {!!tags?.length && <TagList placeId={kakaoPlace.id} tags={tags} />}
        </Link>
      </div>
    )
  },
)

PlaceMapPopup.displayName = 'PlaceMapPopup'

export default PlaceMapPopup
