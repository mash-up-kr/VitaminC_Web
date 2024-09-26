'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

import PlaceDeleteModal from './place-delete-modal'
import PlaceTopInformation from './place-top-information'

import Button from '@/components/common/button'
import Carousel from '@/components/common/carousel'
import { notify } from '@/components/common/custom-toast'
import KakaoRating from '@/components/place/kakao-rating'
import MenuList from '@/components/place/menu-list'
import PlaceActionButtons from '@/components/place/place-action-buttons'
import PlaceDivider from '@/components/place/place-divider'
import ProxyImage from '@/components/common/proxy-image'
import useFetch from '@/hooks/use-fetch'
import useSafeRouter from '@/hooks/use-safe-router'
import useUserGeoLocation from '@/hooks/use-user-geo-location'
import { APIError } from '@/models/api/index'
import type { PlaceDetail } from '@/models/api/place'
import { api } from '@/utils/api'
import { formatDistance, getDistance } from '@/utils/location'
import { roundToNthDecimal } from '@/utils/number'
import { allowUserPositionStorage } from '@/utils/storage'
import cn from '@/utils/cn'

interface PlaceBoxProps {
  place: PlaceDetail
  mapId: string
}

const PlaceBox = ({ place, mapId }: PlaceBoxProps) => {
  let createdById = place.createdBy?.id ?? -1
  const { data: createdUser } = useFetch(() => api.users.id.get(createdById), {
    enabled: createdById !== -1,
  })
  const [isLikePlace, setIsLikePlace] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isRecentlyLike, setIsRecentlyLike] = useState<boolean | null>(null)
  const router = useSafeRouter()
  const [isAlreadyPick, setIsAlreadyPick] = useState(place.isRegisteredPlace)
  const { userLocation } = useUserGeoLocation()
  const isAllowPosition = allowUserPositionStorage.getValueOrNull()
  const diffDistance = getDistance(
    userLocation.latitude,
    userLocation.longitude,
    place.y,
    place.x,
  )

  const { data: user, revalidate } = useFetch(api.users.me.get, {
    key: ['user'],
  })

  const { data: mapInfo, isFetching } = useFetch(() => api.maps.id.get(mapId), {
    enabled: !!mapId,
  })
  const myRole =
    mapInfo?.users.find((mapUser) => mapUser.id === user?.id)?.role ?? 'READ'

  const numOfLikes = (() => {
    const likedUserCount = place.likedUser?.length ?? 0

    if (user && place.likedUser?.find((liked) => liked.id === user.id)) {
      if (isRecentlyLike == null) {
        return likedUserCount
      }

      const recentlyLikedBonus = isRecentlyLike ? 0 : -1
      return likedUserCount + recentlyLikedBonus
    }
    const recentlyLikedBonus = isRecentlyLike ? 1 : 0

    return likedUserCount + recentlyLikedBonus
  })()

  useEffect(() => {
    if (!place || !user) return
    setIsLikePlace(
      !!place.likedUser?.find((liked) => liked.id === user.id) ?? false,
    )
  }, [user, place])

  const handleLikePlace = async () => {
    try {
      if (!mapId) return

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
        !!place.likedUser?.find((liked) => liked.id === user?.id) ?? false,
      )
      if (error instanceof APIError || error instanceof Error) {
        notify.error(error.message)
      }
    }
  }

  const handleUnLikePlace = async () => {
    try {
      if (!mapId) return

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
        !!place.likedUser?.find((liked) => liked.id === user?.id) ?? false,
      )
      if (error instanceof APIError || error instanceof Error) {
        notify.error(error.message)
      }
    }
  }

  const handleDeletePlace = async () => {
    try {
      if (!mapId) return

      await api.place.mapId.placeId.delete({
        placeId: place.id,
        mapId,
      })

      setIsAlreadyPick(false)
      setIsDeleteModalOpen(false)
      window.location.reload()
    } catch (error) {
      if (error instanceof APIError || error instanceof Error) {
        notify.error(error.message)
      }
    }
  }

  const handleRegisterPlace = async () => {
    try {
      router.push(`/place/${place.kakaoId}/register`)
      revalidate(['places', mapId])
    } catch (error) {
      if (error instanceof APIError || error instanceof Error) {
        notify.error(error.message)
      }
    }
  }

  return (
    <>
      <Carousel
        items={place.photoList.slice(0, 3).map((src, index) => (
          <Link
            key={src}
            href={{
              pathname: `/place/${place.kakaoId}/image`,
              query: {
                type: 'photoList',
              },
            }}
          >
            <ProxyImage
              src={src}
              alt={`슬라이드 ${index + 1}`}
              className="object-cover"
              draggable="false"
            />
          </Link>
        ))}
        className="h-[200px] min-h-[200px] w-full"
        indicatorPosition="inside"
      />

      <PlaceTopInformation
        user={user}
        placeId={place.kakaoId}
        category={place.category}
        categoryIconCode={place.categoryIconCode}
        name={place.name}
        address={place.address}
        tags={place.tags}
        rating={place.score}
        likedUser={place.likedUser ?? []}
        distance={isAllowPosition ? formatDistance(diffDistance) : undefined}
        pick={
          typeof place.createdBy !== 'undefined'
            ? {
                isLiked: isLikePlace || false,
                numOfLikes,
                isMyPick: place.createdBy?.nickname === user?.nickname,
                onClickLike: isLikePlace ? handleUnLikePlace : handleLikePlace,
              }
            : undefined
        }
        className="px-5"
      />
      <PlaceDivider className="w-full" />

      <MenuList
        menuList={place.menuList}
        mainPhotoUrl={place.mainPhotoUrl}
        placeId={place.kakaoId}
        className="px-5 pt-6"
      />
      <PlaceDivider className="w-full" />

      <KakaoRating
        rating={roundToNthDecimal(place.score, 2)}
        placeId={place.kakaoId}
        className={cn(
          'px-5 py-5',
          myRole !== 'READ' && !isFetching && 'mb-[102px]',
        )}
      />

      {myRole !== 'READ' && !isFetching && (
        <footer className="px-5">
          <div className="invitation-gradient fixed bottom-0 left-1/2 flex h-[102px] w-full max-w-[420px] -translate-x-1/2 items-center justify-center px-5">
            {isAlreadyPick ? (
              <PlaceActionButtons
                like={isLikePlace}
                role={myRole}
                onLikePlace={handleLikePlace}
                onDeletePlace={() => setIsDeleteModalOpen(true)}
                onUnLikePlace={handleUnLikePlace}
              />
            ) : (
              <Button type="button" onClick={handleRegisterPlace}>
                맛집 등록하기
              </Button>
            )}
          </div>
        </footer>
      )}

      <PlaceDeleteModal
        createdUser={createdUser}
        likedUser={place.likedUser}
        isOpen={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeletePlace}
      />
    </>
  )
}

export default PlaceBox
