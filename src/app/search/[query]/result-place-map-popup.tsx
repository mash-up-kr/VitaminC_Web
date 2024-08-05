'use client'

import { ForwardedRef, forwardRef, useEffect, useState } from 'react'
import Link from 'next/link'

import { Typography, TagList, Icon, PickChip, LikeButton } from '@/components'
import { APIError, type ClassName } from '@/models/interface'
import cn from '@/utils/cn'
import type { PlaceDetail, SearchPlace } from '@/types/api/place'
import { api } from '@/utils/api'
import { getStarByScore } from '@/utils/score'
import useFetch from '@/hooks/use-fetch'
import { notify } from '@/components/common/custom-toast'
import type { MapInfo } from '@/models/map.interface'
import ResultPlacePopupSkeleton from './result-place-popup-skeleton'
import { roundOnePoint } from '@/utils/number'

interface ResultPlaceMapPopupProps extends ClassName {
  mapId: MapInfo['id']
  kakaoId: SearchPlace['kakaoId']
}

const ResultPlaceMapPopup = forwardRef<HTMLElement, ResultPlaceMapPopupProps>(
  ({ kakaoId, mapId, className }, ref) => {
    const [isLikePlace, setIsLikePlace] = useState(false)
    const [isRecentlyLike, setIsRecentlyLike] = useState<boolean | null>(null)

    const [isLoading, setIsLoading] = useState(false)
    const [place, setPlace] = useState<PlaceDetail | null>(null)
    const { data: user } = useFetch(api.users.me.get, {
      onLoadEnd: (userData) =>
        setIsLikePlace(place?.likedUserIds?.includes(userData.id) ?? false),
      key: ['user'],
    })

    useEffect(() => {
      ;(async () => {
        try {
          setIsLoading(true)
          const response = await api.place.mapId.kakao.kakaoPlaceId.get({
            mapId,
            kakaoPlaceId: kakaoId,
          })
          setPlace(response.data)
          setIsLikePlace(
            response.data.likedUserIds?.includes(user?.id ?? -1) ?? false,
          )
        } catch (error) {
          if (error instanceof APIError || error instanceof Error) {
            notify.error(error.message)
          }
        } finally {
          setIsLoading(false)
        }
      })()
    }, [mapId, kakaoId, user?.id])

    if (!place) return null

    const numOfLikes = (() => {
      const likedUserIdsCount = place.likedUserIds?.length ?? 0

      if (user && place.likedUserIds?.includes(user.id)) {
        if (isRecentlyLike == null) {
          return likedUserIdsCount
        }

        const recentlyLikedBonus = isRecentlyLike ? 0 : -1
        return likedUserIdsCount + recentlyLikedBonus
      }
      const recentlyLikedBonus = isRecentlyLike ? 1 : 0

      return likedUserIdsCount + recentlyLikedBonus
    })()

    const handleLikePlace = async () => {
      try {
        setIsLikePlace(true)
        setIsRecentlyLike(true)
        await api.place.mapId.placeId.like.put({
          placeId: place.id,
          mapId,
        })
      } catch (error) {
        setIsLikePlace(false)
        setIsRecentlyLike(place.likedUserIds?.includes(user?.id ?? -1) ?? false)
        if (error instanceof APIError || error instanceof Error) {
          notify.error(error.message)
        }
      }
    }

    const handleUnLikePlace = async () => {
      try {
        setIsLikePlace(false)
        setIsRecentlyLike(false)
        await api.place.mapId.placeId.like.delete({
          placeId: place.id,
          mapId,
        })
      } catch (error) {
        setIsLikePlace(true)
        setIsRecentlyLike(place.likedUserIds?.includes(user?.id ?? -1) ?? false)
        if (error instanceof APIError || error instanceof Error) {
          notify.error(error.message)
        }
      }
    }

    return (
      <div
        role="presentation"
        className={cn('flex justify-center w-full', className)}
      >
        {isLoading ? (
          <ResultPlacePopupSkeleton ref={ref as ForwardedRef<HTMLDivElement>} />
        ) : (
          <Link
            href={`/place/${place.kakaoId}`}
            ref={ref as ForwardedRef<HTMLAnchorElement>}
            className="w-full rounded-[10px] bg-neutral-700 p-5 flex flex-col gap-4 z-10"
          >
            <div className="flex gap-2 justify-between">
              <div className="flex flex-col justify-between w-full">
                <div className="flex flex-col gap-1 ">
                  <div className="flex gap-1.5 items-end">
                    <Typography as="h2" size="h4">
                      {place.name}
                    </Typography>
                    <Typography as="span" size="body3" color="neutral-400">
                      {place.category}
                    </Typography>
                  </div>

                  <div className="flex gap-2">
                    {!!place.score && (
                      <div className="flex gap-0.5 items-center">
                        <Icon
                          type={getStarByScore(place.score)}
                          size="sm"
                          fill="yellow-100"
                        />
                        <Typography as="span" size="body3" color="neutral-300">
                          {roundOnePoint(place.score)}
                        </Typography>
                      </div>
                    )}
                    <Typography
                      as="span"
                      size="body3"
                      color="neutral-300"
                      className="text-ellipsis overflow-hidden"
                    >
                      {place.address}
                    </Typography>
                  </div>
                </div>

                {place.isRegisteredPlace && (
                  <div className="flex gap-3 items-center">
                    <PickChip
                      isMyPick={
                        !!place.createdBy && place.createdBy.id === user?.id
                      }
                    />
                    <LikeButton
                      numOfLikes={numOfLikes}
                      isLiked={isLikePlace}
                      onClick={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                        if (isLikePlace) {
                          handleUnLikePlace()
                        } else {
                          handleLikePlace()
                        }
                      }}
                    />
                  </div>
                )}
              </div>

              {place.mainPhotoUrl && (
                <img
                  className="rounded-md w-20 h-20"
                  src={place.mainPhotoUrl}
                  alt="식당"
                />
              )}
            </div>

            {!!place.tags?.length && (
              <TagList placeId={place.id} tags={place.tags} />
            )}
          </Link>
        )}
      </div>
    )
  },
)

ResultPlaceMapPopup.displayName = 'ResultPlaceMapPopup'

export default ResultPlaceMapPopup
