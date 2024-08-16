'use client'

import { forwardRef, useEffect, useState } from 'react'
import Link from 'next/link'

import { Typography, PickChip, TagList, LikeButton, Icon } from '@/components'
import { APIError, type ClassName } from '@/models/interface'
import cn from '@/utils/cn'
import type { PlaceType } from '@/types/api/place'
import { api } from '@/utils/api'
import { notify } from '../common/custom-toast'
import { getStarByScore } from '@/utils/score'
import useFetch from '@/hooks/use-fetch'
import { roundOnePoint } from '@/utils/number'

interface PlaceMapPopupProps extends ClassName {
  selectedPlace: PlaceType
  mapId: string
  onRefreshOldPlace?: VoidFunction
}

const PlaceMapPopup = forwardRef<HTMLAnchorElement, PlaceMapPopupProps>(
  ({ selectedPlace, className, mapId, onRefreshOldPlace }, ref) => {
    const [isLikePlace, setIsLikePlace] = useState(false)
    const { data: user } = useFetch(api.users.me.get, { key: ['user'] })

    const place = selectedPlace.place

    const getNumOfLike = () => {
      const initialNumOfLike = selectedPlace.likedUserIds?.length || 0

      if (!user?.id) return initialNumOfLike
      if (selectedPlace.likedUserIds?.includes(user?.id)) {
        if (isLikePlace) return initialNumOfLike
        return initialNumOfLike - 1
      }
      if (isLikePlace) return initialNumOfLike + 1
      return initialNumOfLike
    }

    const handleLikePlace = async () => {
      try {
        if (!mapId) return

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
      } finally {
        if (onRefreshOldPlace) {
          onRefreshOldPlace()
        }
      }
    }

    const handleUnLikePlace = async () => {
      try {
        if (!mapId) return

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
      } finally {
        if (onRefreshOldPlace) {
          onRefreshOldPlace()
        }
      }
    }

    const kakaoPlace = place.kakaoPlace
    const tags = selectedPlace.tags
    const pick = {
      isLiked: isLikePlace,
      isMyPick:
        typeof selectedPlace.createdBy != 'undefined' &&
        selectedPlace.createdBy.id === user?.id,
      numOfLikes: getNumOfLike(),
      onClickLike: isLikePlace ? handleUnLikePlace : handleLikePlace,
    }

    useEffect(() => {
      if (!user) return
      setIsLikePlace(selectedPlace.likedUserIds.includes(user.id))
    }, [user, selectedPlace])

    return (
      <div
        role="presentation"
        className={cn('flex justify-center w-full', className)}
      >
        <Link
          href={`/place/${place.kakaoPlace.id}`}
          ref={ref}
          className="w-full rounded-[10px] bg-neutral-700 p-5 flex flex-col gap-4 z-10"
        >
          <div className="flex gap-2 justify-between overflow-hidden">
            <div className="flex flex-col justify-between overflow-hidden">
              <div className="flex flex-col gap-1 overflow-hidden">
                <div className="flex gap-1.5 items-center overflow-hidden">
                  <Typography as="h2" size="h4" className="truncate">
                    {kakaoPlace.name}
                  </Typography>
                  <Typography
                    as="span"
                    className="shrink-0"
                    size="body3"
                    color="neutral-400"
                  >
                    {kakaoPlace.category}
                  </Typography>
                </div>

                <div className="flex gap-2">
                  {!!kakaoPlace.score && (
                    <div className="flex gap-0.5 items-center">
                      <Icon
                        type={getStarByScore(kakaoPlace.score)}
                        size="sm"
                        fill="yellow-100"
                      />
                      <Typography as="span" size="h6" color="neutral-100">
                        {roundOnePoint(kakaoPlace.score)}
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

            {kakaoPlace.mainPhotoUrl && (
              <img
                className="rounded-md min-w-20 w-20 h-20"
                src={kakaoPlace.mainPhotoUrl}
                alt="식당"
              />
            )}
          </div>

          {!!tags?.length && <TagList placeId={kakaoPlace.id} tags={tags} />}
        </Link>
      </div>
    )
  },
)

PlaceMapPopup.displayName = 'PlaceMapPopup'

export default PlaceMapPopup
