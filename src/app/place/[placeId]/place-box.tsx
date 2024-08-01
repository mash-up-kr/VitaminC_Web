'use client'

import { useState } from 'react'

import { AccessibleIconButton, Button, Carousel } from '@/components'
import type { PlaceDetail } from '@/types/api/place'
import PlaceTopInformation from './place-top-information'
import PlaceDivider from '@/components/place/place-divider'
import MenuList from '@/components/place/menu-list'
import KakaoRating from '@/components/place/kakao-rating'
import PlaceActionButtons from '@/components/place/place-action-buttons'
import { APIError } from '@/models/interface'
import { notify } from '@/components/common/custom-toast'
import { api } from '@/utils/api'
import { getMapId } from '@/services/map-id'
import PlaceDeleteModal from './place-delete-modal'
import useSafeRouter from '@/hooks/use-safe-router'
import useFetch from '@/hooks/use-fetch'
import useUserGeoLocation from '@/hooks/use-user-geo-location'
import { allowUserPositionStorage } from '@/utils/storage'
import { formatDistance, getDistance } from '@/utils/location'

interface PlaceBoxProps {
  place: PlaceDetail
}

const PlaceBox = ({ place }: PlaceBoxProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isLikePlace, setIsLikePlace] = useState(false)
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

  const { data: user } = useFetch(api.users.me.get, {
    key: ['user'],
    onLoadEnd: (userData) =>
      setIsLikePlace(place.likedUserIds?.includes(userData.id) ?? false),
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

  const handleLikePlace = async () => {
    try {
      const mapId = await getMapId()
      if (!mapId) throw new Error('잘못된 접근입니다.')

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
      const mapId = await getMapId()
      if (!mapId) throw new Error('잘못된 접근입니다.')

      setIsLikePlace(false)
      setIsRecentlyLike(false)
      await api.place.mapId.placeId.like.delete({
        placeId: place.id,
        mapId,
      })
    } catch (error) {
      setIsLikePlace(true)
      setIsRecentlyLike(false)
      setIsRecentlyLike(place.likedUserIds?.includes(user?.id ?? -1) ?? false)
      if (error instanceof APIError || error instanceof Error) {
        notify.error(error.message)
      }
    }
  }

  const handleDeletePlace = async () => {
    try {
      const mapId = await getMapId()
      if (!mapId) throw new Error('잘못된 접근입니다.')

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
    } catch (error) {
      if (error instanceof APIError || error instanceof Error) {
        notify.error(error.message)
      }
    }
  }

  return (
    <>
      <div className="relative flex flex-col bg-neutral-700 min-h-dvh">
        <AccessibleIconButton
          icon={{ type: 'caretLeft', size: 'xl' }}
          label="뒤로 가기"
          className="absolute top-[26px] left-[10px] z-[100]"
          onClick={() => router.safeBack()}
        />

        <Carousel
          items={place.photoList.slice(0, 3).map((src) => ({ src }))}
          objectFit="fill"
          className="mt-0 w-full h-[200px] min-h-[200px]"
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
          rating={place.score}
          placeId={place.kakaoId}
          className="py-5 px-5"
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
        name={place.createdBy?.nickname}
        numOfLike={place.likedUserIds?.length || 0}
        isOpen={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeletePlace}
      />
    </>
  )
}

export default PlaceBox
