'use client'

import { useEffect, useState } from 'react'

import PlaceDeleteModal from './place-delete-modal'
import PlaceTopInformation from './place-top-information'

import AccessibleIconButton from '@/components/common/accessible-icon-button'
import Button from '@/components/common/button'
import Carousel from '@/components/common/carousel'
import { notify } from '@/components/common/custom-toast'
import KakaoRating from '@/components/place/kakao-rating'
import MenuList from '@/components/place/menu-list'
import PlaceActionButtons from '@/components/place/place-action-buttons'
import PlaceDivider from '@/components/place/place-divider'
import useFetch from '@/hooks/use-fetch'
import useSafeRouter from '@/hooks/use-safe-router'
import useUserGeoLocation from '@/hooks/use-user-geo-location'
import { APIError } from '@/models/api/index'
import type { PlaceDetail } from '@/models/api/place'
import { api } from '@/utils/api'
import { formatDistance, getDistance } from '@/utils/location'
import { roundToNthDecimal } from '@/utils/number'
import { allowUserPositionStorage } from '@/utils/storage'

interface PlaceBoxProps {
  place: PlaceDetail
  mapId: string
}

const PlaceBox = ({ place, mapId }: PlaceBoxProps) => {
  const { data: createdUser} = useFetch(() => api.users.id.get(place.createdBy?.id ?? -1))
  const [isLikePlace, setIsLikePlace] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isRecentlyLike, setIsRecentlyLike] = useState<boolean | null>(null)
  const router = useSafeRouter()
  const [isAlreadyPick, setIsAlreadyPick] = useState(place.isRegisteredPlace)
  const userLocation = useUserGeoLocation()
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

  useEffect(() => {
    if (!place || !user) return
    setIsLikePlace(place.likedUserIds?.includes(user.id) ?? false)
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
      if (!mapId) return

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
      <div className="relative flex min-h-dvh flex-col bg-neutral-700">
        <header className="absolute left-0 top-0 z-[100] h-[60px] w-full bg-gradient-to-t from-[rgba(33,33,36,0)] to-[rgba(33,33,36,0.6)]">
          <AccessibleIconButton
            icon={{ type: 'caretLeft', size: 'xl' }}
            label="뒤로 가기"
            className="absolute left-[10px] top-[26px]"
            onClick={() => router.safeBack()}
          />
        </header>

        <Carousel
          items={place.photoList.slice(0, 3).map((src) => ({ src }))}
          objectFit="cover"
          className="h-[200px] min-h-[200px] w-full"
          indicatorPosition="inside"
        />

        <PlaceTopInformation
          placeId={place.kakaoId}
          category={place.category}
          categoryIconCode={place.categoryIconCode}
          name={place.name}
          address={place.address}
          tags={place.tags}
          rating={place.score}
          distance={isAllowPosition ? formatDistance(diffDistance) : undefined}
          pick={
            typeof place.createdBy !== 'undefined'
              ? {
                  isLiked: isLikePlace || false,
                  numOfLikes,
                  isMyPick: place.createdBy?.nickname === user?.nickname,
                  onClickLike: isLikePlace
                    ? handleUnLikePlace
                    : handleLikePlace,
                }
              : undefined
          }
          className="px-5"
        />
        <PlaceDivider className="w-full" />

        <MenuList
          menuList={place.menuList}
          mainPhotoUrl={place.mainPhotoUrl}
          className="px-5 pt-6"
        />
        <PlaceDivider className="w-full" />

        <KakaoRating
          rating={roundToNthDecimal(place.score, 2)}
          placeId={place.kakaoId}
          className="px-5 py-5"
        />

        <footer className="px-5">
          {isAlreadyPick ? (
            <PlaceActionButtons
              like={isLikePlace}
              onLikePlace={handleLikePlace}
              onDeletePlace={() => setIsDeleteModalOpen(true)}
              onUnLikePlace={handleUnLikePlace}
            />
          ) : (
            <Button
              type="button"
              onClick={handleRegisterPlace}
              className="mb-5"
            >
              맛집 등록하기
            </Button>
          )}
        </footer>
      </div>

      <PlaceDeleteModal
        createdUser={createdUser}
        likedUserIds={place.likedUserIds}
        numOfLike={place.likedUserIds?.length || 0}
        isOpen={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeletePlace}
      />
    </>
  )
}

export default PlaceBox
