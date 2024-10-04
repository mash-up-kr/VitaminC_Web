'use client'

import { useState } from 'react'

import HashTagList from './hash-tag-list'
import RegisterCancelModal from './register-cancel-modal'

import AccessibleIconButton from '@/components/common/accessible-icon-button'
import Button from '@/components/common/button'
import { notify } from '@/components/common/custom-toast'
import Typography from '@/components/common/typography'
import useSafeRouter from '@/hooks/use-safe-router'
import { APIError } from '@/models/api/index'
import type { TagItem } from '@/models/api/maps'
import type { PlaceDetail } from '@/models/api/place'
import { api } from '@/utils/api'
import get조사 from '@/utils/조사'
import { revalidatePlaces } from '@/app/actions'

const toTagNames = (tags: TagItem[]): TagItem['name'][] =>
  tags.map((tag) => tag.name)

const RegisterBox = ({
  place,
  tags,
  mapId,
}: {
  place: PlaceDetail
  tags: TagItem[]
  mapId: string
}) => {
  const router = useSafeRouter()
  const [selectedTags, setSelectedTags] = useState<TagItem[]>([])
  const [isOpenBackModal, setIsOpenBackModal] = useState(false)

  const kakaoPlaceName = place.name || '[식당이름]'

  const handleRegisterPlace = async () => {
    try {
      if (!mapId) return

      await api.place.mapId.kakao.kakaoPlaceId.post({
        mapId,
        kakaoPlaceId: place.kakaoId,
        tagNames: toTagNames(selectedTags),
      })

      revalidatePlaces(mapId)

      notify.success('맛집 등록이 완료되었습니다.')
      router.safeBack({ defaultHref: `/place/${place.kakaoId}` })
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
      <div className="flex min-h-dvh flex-col bg-neutral-700">
        <AccessibleIconButton
          icon={{ type: 'caretLeft', size: 'xl' }}
          label="맛집 등록 취소하기"
          className="p-[10px] pt-4"
          onClick={() => setIsOpenBackModal(true)}
        />

        <div className="flex px-5 pt-6">
          <Typography
            size="h1"
            color="neutral-000"
            className="whitespace-pre-line"
          >{`${kakaoPlaceName}${get조사(kakaoPlaceName, '은/는')}\n어떤 장소인가요?`}</Typography>
        </div>

        <div className="absolute bottom-5 w-full px-5">
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
          mapId={mapId}
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
