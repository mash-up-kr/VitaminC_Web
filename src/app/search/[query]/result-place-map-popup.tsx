'use client'

import type { ForwardedRef } from 'react'
import { forwardRef, useEffect, useState } from 'react'

import Link from 'next/link'

import PlacePopupSkeleton from '@/components/place/place-popup-skeleton'
import { notify } from '@/components/common/custom-toast'
import Icon from '@/components/common/icon'
import ProxyImage from '@/components/common/proxy-image'
import Typography from '@/components/common/typography'
import LikeButton from '@/components/like-button'
import PickChip from '@/components/pick-chip'
import TagList from '@/components/tag-list'
import useFetch from '@/hooks/use-fetch'
import { APIError } from '@/models/api'
import type { PlaceDetail, SearchPlace } from '@/models/api/place'
import type { ClassName } from '@/models/common'
import type { MapInfo } from '@/models/map'
import { api } from '@/utils/api'
import cn from '@/utils/cn'
import { roundOnePoint } from '@/utils/number'
import { getStarByScore } from '@/utils/score'

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
    const { data: user, revalidate } = useFetch(api.users.me.get, {
      onLoadEnd: (userData) => {
        setIsLikePlace(
          !!place?.likedUsers?.find((likeUser) => likeUser.id === userData.id),
        )
      },
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
            !!place?.likedUsers?.find((likeUser) => likeUser.id === user?.id),
          )
        } catch (error) {
          if (error instanceof APIError || error instanceof Error) {
            notify.error(error.message)
          }
        } finally {
          setIsLoading(false)
        }
      })()
    }, [mapId, kakaoId, user?.id, place?.likedUsers])

    if (!place) return null

    const numOfLikes = (() => {
      const likedUsersCount = place.likedUsers?.length ?? 0

      if (
        user &&
        !!place.likedUsers?.find((likeUser) => likeUser.id === user.id)
      ) {
        if (isRecentlyLike == null) {
          return likedUsersCount
        }

        const recentlyLikedBonus = isRecentlyLike ? 0 : -1
        return likedUsersCount + recentlyLikedBonus
      }
      const recentlyLikedBonus = isRecentlyLike ? 1 : 0

      return likedUsersCount + recentlyLikedBonus
    })()

    const handleLikePlace = async () => {
      try {
        setIsLikePlace(true)
        setIsRecentlyLike(true)
        await api.place.mapId.placeId.like.put({
          placeId: place.id,
          mapId,
        })
        revalidate(['places', mapId])
      } catch (error) {
        setIsLikePlace(false)
        setIsRecentlyLike(
          !!place?.likedUsers?.find((likeUser) => likeUser.id === user?.id),
        )
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
        revalidate(['places', mapId])
      } catch (error) {
        setIsLikePlace(true)
        setIsRecentlyLike(
          !!place?.likedUsers?.find((likeUser) => likeUser.id === user?.id),
        )
        if (error instanceof APIError || error instanceof Error) {
          notify.error(error.message)
        }
      }
    }

    return (
      <div
        role="presentation"
        className={cn('flex w-full justify-center', className)}
      >
        {isLoading ? (
          <PlacePopupSkeleton ref={ref as ForwardedRef<HTMLDivElement>} />
        ) : (
          <Link
            href={`/place/${place.kakaoId}`}
            ref={ref as ForwardedRef<HTMLAnchorElement>}
            className="z-10 flex w-full flex-col gap-4 rounded-[10px] bg-neutral-700 p-5"
          >
            <div className="flex justify-between gap-2">
              <div className="flex flex-col justify-between gap-2 overflow-hidden">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <Typography as="h2" size="h4" className="truncate">
                      {place.name}
                    </Typography>
                    <Typography
                      as="span"
                      size="body3"
                      color="neutral-400"
                      className="flex-grow text-nowrap"
                    >
                      {place.category}
                    </Typography>
                  </div>

                  <div className="flex gap-2">
                    {!!place.score && (
                      <div className="flex items-center gap-0.5">
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
                      className="truncate"
                    >
                      {place.address}
                    </Typography>
                  </div>
                </div>

                {place.isRegisteredPlace && (
                  <div className="flex items-center gap-2">
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
                <ProxyImage
                  className="h-20 w-20 min-w-0 rounded-md"
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
