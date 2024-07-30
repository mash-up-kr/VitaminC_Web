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

interface PlaceBoxProps {
  place: PlaceDetail
}

const PlaceBox = ({ place }: PlaceBoxProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isLikePlace, setIsLikePlace] = useState(false)
  const router = useSafeRouter()
  const isAlreadyPick = place.isRegisteredPlace

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

  const handleDeletePlace = async () => {
    try {
      const mapId = await getMapId()
      if (!mapId) throw new Error('잘못된 접근입니다.')

      await api.place.mapId.placeId.delete({
        placeId: place.id,
        mapId,
      })
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
          name={place.name}
          address={place.address}
          tags={place.tags}
          rating={place.score}
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
        name={place.createdBy.nickname}
        numOfLike={place.likedUserIds.length}
        isOpen={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeletePlace}
      />
    </>
  )
}

export default PlaceBox
