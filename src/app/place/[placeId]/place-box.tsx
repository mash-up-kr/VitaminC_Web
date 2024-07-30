'use client'

import { useState } from 'react'

import { AccessibleIconButton, Button, Carousel } from '@/components'
import type { PlaceType } from '@/types/api/place'
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
  place: PlaceType
}

const PlaceBox = ({ place }: PlaceBoxProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isLikePlace, setIsLikePlace] = useState(false)
  const router = useSafeRouter()
  // TODO: API
  const isAlreadyPick = false

  const handleLikePlace = async () => {
    try {
      const mapId = await getMapId()
      if (!mapId) throw new Error('잘못된 접근입니다.')

      setIsLikePlace(true)
      await api.place.mapId.placeId.like.put({
        placeId: place.place.id,
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
        placeId: place.place.id,
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
        placeId: place.place.id,
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
      router.push(`/place/${place.place.id}/register`)
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

        {/* TODO: mainPhotoList가 나오는 경우 수정, 아니면 TODO 지우기 */}
        <Carousel
          items={place.place.kakaoPlace.photoList
            .slice(0, 3)
            .map((src) => ({ src }))}
          objectFit="fill"
          className="mt-0 w-full h-[200px] min-h-[200px]"
          indicatorPosition="inside"
        />

        {/* TODO: api 나오면 rating 추가 */}
        <PlaceTopInformation
          placeId={place.place.id}
          category={place.place.kakaoPlace.category}
          name={place.place.kakaoPlace.name}
          address={place.place.kakaoPlace.address}
          tags={place.tags}
          rating={3.5}
          className="px-5"
        />
        <PlaceDivider className="w-full" />

        {/* TODO: api 나오면 mainPhotoUrl 수정, photoList, menuList 설정 */}
        <MenuList
          menuList={place.place.kakaoPlace.menuList}
          mainPhotoUrl={
            place.place.kakaoPlace.photoList[0] || '/images/food.png'
          }
          photoList={place.place.kakaoPlace.photoList}
          className="px-5 pt-6"
        />
        <PlaceDivider className="w-full" />

        {/* TODO: api 나오면 rating 추가 */}
        <KakaoRating
          rating={3.5}
          placeId={place.place.kakaoPlace.id}
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

      {/* TODO: API */}
      <PlaceDeleteModal
        name="진영"
        numOfLike={6}
        isOpen={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeletePlace}
      />
    </>
  )
}

export default PlaceBox
