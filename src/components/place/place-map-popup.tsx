'use client'

import { type ForwardedRef, forwardRef, useEffect, useState } from 'react'

import { notify } from '@/components/common/custom-toast'
import Icon from '@/components/common/icon'
import ProxyImage from '@/components/common/proxy-image'
import Typography from '@/components/common/typography'
import LikeButton from '@/components/like-button'
import PickChip from '@/components/pick-chip'
import TagList from '@/components/tag-list'
import useFetch from '@/hooks/use-fetch'
import { APIError } from '@/models/api'
import {
  isKorrkPlace,
  type PlaceDetail,
  type KorrkPlace,
} from '@/models/api/place'
import type { ClassName } from '@/models/common'
import { api } from '@/utils/api'
import cn from '@/utils/cn'
import { roundOnePoint } from '@/utils/number'
import { getStarByScore } from '@/utils/score'
import PlacePopupSkeleton from '@/components/place/place-popup-skeleton'
import { revalidatePlaces } from '@/app/actions'

interface PlaceMapPopupProps extends ClassName {
  selectedPlace: KorrkPlace | PlaceDetail
  mapId: string
}

const PlaceMapPopup = forwardRef<HTMLAnchorElement, PlaceMapPopupProps>(
  ({ selectedPlace, className, mapId }, ref) => {
    const [isLikePlace, setIsLikePlace] = useState(false)
    const { data: user } = useFetch(api.users.me.get, {
      key: ['user'],
    })
    const { refetch } = useFetch(() => api.place.mapId.get(mapId), {
      key: ['places', mapId],
      enabled: !!mapId,
    })

    const isLoading = !selectedPlace || !user

    const isKorrkPlaceType = isKorrkPlace(selectedPlace)
    const place = isKorrkPlaceType ? selectedPlace.place : selectedPlace
    const kakaoPlace = isKorrkPlaceType
      ? selectedPlace.place.kakaoPlace
      : selectedPlace
    const isRegisteredPlace = !!place.id

    const getNumOfLike = () => {
      const initialNumOfLike = selectedPlace.likedUser?.length || 0

      if (!user?.id) return initialNumOfLike
      if (selectedPlace.likedUser?.some((liked) => liked.id === user.id)) {
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
        revalidatePlaces(mapId)
      } catch (error) {
        setIsLikePlace(false)
        if (error instanceof APIError || error instanceof Error) {
          notify.error(error.message)
        }
      } finally {
        refetch()
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
        revalidatePlaces(mapId)
      } catch (error) {
        setIsLikePlace(true)
        if (error instanceof APIError || error instanceof Error) {
          notify.error(error.message)
        }
      } finally {
        refetch()
      }
    }

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
      if (selectedPlace.likedUser) {
        setIsLikePlace(
          selectedPlace.likedUser.some((liked) => liked.id === user.id),
        )
      }
    }, [user, selectedPlace])

    return (
      <div
        role="presentation"
        className={cn('flex w-full justify-center', className)}
      >
        {isLoading ? (
          <PlacePopupSkeleton ref={ref as ForwardedRef<HTMLDivElement>} />
        ) : (
          <div className="z-10 flex w-full flex-col gap-4 rounded-[10px] bg-neutral-700 p-5">
            <div className="flex justify-between gap-2">
              <div className="flex flex-col justify-between gap-2 overflow-hidden">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
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
                      <div className="flex items-center gap-0.5">
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
                      className="truncate"
                    >
                      {kakaoPlace.address}
                    </Typography>
                  </div>
                </div>

                {isRegisteredPlace && pick && (
                  <div className="flex items-center gap-2">
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
                <ProxyImage
                  className="h-20 w-20 min-w-20 rounded-md"
                  src={kakaoPlace.mainPhotoUrl}
                  alt="식당"
                />
              )}
            </div>

            {!!tags?.length && <TagList placeId={kakaoPlace.id} tags={tags} />}
          </div>
        )}
      </div>
    )
  },
)

PlaceMapPopup.displayName = 'PlaceMapPopup'

export default PlaceMapPopup
