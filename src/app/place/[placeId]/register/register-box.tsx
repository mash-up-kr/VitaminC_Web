'use client'

import { useState } from 'react'

import HashTagList from './hash-tag-list'
import type { TagItem } from '@/types/api/maps'
import type { PlaceDetail } from '@/types/api/place'
import { AccessibleIconButton, Button, Typography } from '@/components'
import { notify } from '@/components/common/custom-toast'
import { APIError } from '@/models/interface'
import { api } from '@/utils/api'
import { getMapId } from '@/services/map-id'
import RegisterCancelModal from './register-cancel-modal'
import get조사 from '@/utils/조사'
import useSafeRouter from '@/hooks/use-safe-router'

const toTagNames = (tags: TagItem[]): TagItem['name'][] =>
  tags.map((tag) => tag.name)

const RegisterBox = ({
  place,
  tags,
}: {
  place: PlaceDetail
  tags: TagItem[]
}) => {
  const router = useSafeRouter()
  const [selectedTags, setSelectedTags] = useState<TagItem[]>([])
  const [isOpenBackModal, setIsOpenBackModal] = useState(false)

  const kakaoPlaceName = place.name || '[식당이름]'

  const handleRegisterPlace = async () => {
    try {
      const mapId = await getMapId()
      if (mapId) {
        await api.place.mapId.kakao.kakaoPlaceId.post({
          mapId,
          kakaoPlaceId: place.kakaoId,
          tagNames: toTagNames(selectedTags),
        })
      }
    } catch (error) {
      if (error instanceof APIError) {
        notify.error(error.message)
      }
    }
  }

  const handleClickTag = (tag: TagItem) => {
    if (selectedTags.includes(tag)) {
      const nextSelectedTags = [...selectedTags].filter(
        (selectedTag) => selectedTag.name !== tag.name,
      )
      setSelectedTags(nextSelectedTags)
      return
    }

    setSelectedTags((prev) => [...prev, tag])
  }

  if (!place.kakaoId) {
    router.safeBack()
  }

  return (
    <>
      <div className="flex flex-col bg-neutral-700 min-h-dvh">
        <AccessibleIconButton
          icon={{ type: 'caretLeft', size: 'xl' }}
          label="맛집 등록 취소하기"
          className=" p-[10px] pt-4"
          onClick={() => setIsOpenBackModal(true)}
        />

        <div className="flex pt-6 px-5">
          <Typography
            size="h1"
            color="neutral-000"
            className="whitespace-pre-line"
          >{`${kakaoPlaceName}${get조사(kakaoPlaceName, '은/는')}\n어떤 장소인가요?`}</Typography>
        </div>

        <div className="absolute bottom-5 w-full">
          <Button
            type="button"
            colorScheme="orange"
            onClick={handleRegisterPlace}
          >
            맛집 등록 완료
          </Button>
        </div>

        <HashTagList
          className="px-5 pt-5"
          defaultTags={tags}
          selectedTags={selectedTags}
          onClickTag={handleClickTag}
        />
      </div>

      <RegisterCancelModal
        isOpen={isOpenBackModal}
        onClose={() => setIsOpenBackModal(false)}
        onConfirm={() => {
          router.safeBack({ defaultHref: `/place/${place.kakaoId}` })
        }}
      />
    </>
  )
}

export default RegisterBox
