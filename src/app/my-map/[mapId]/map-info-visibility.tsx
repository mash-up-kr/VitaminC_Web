import { useState } from 'react'

import type { MapInfoBoxProps } from './map-info'

import Typography from '@/components/common/typography'
import { notify } from '@/components/common/custom-toast'
import cn from '@/utils/cn'
import { api } from '@/utils/api'
import useFetch from '@/hooks/use-fetch'
import BottomModal from '@/components/common/bottom-modal'

const MapInfoVisibility = ({
  mapInfo,
  refetchMapInfo,
}: Pick<MapInfoBoxProps, 'mapInfo' | 'refetchMapInfo'>) => {
  const [isOpenEditModal, setIsOpenEditModal] = useState(false)
  const [isOpenPrivateModal, setIsOpenMapToPublicModal] = useState(false)
  const { revalidate } = useFetch()

  const updateMapVisibility = async (isPublic: boolean) => {
    try {
      const { id, description, name } = mapInfo
      await api.maps.id.patch({
        id,
        isPublic,
        description,
        name,
      })
      revalidate(['map', mapInfo.id])
      notify.success(
        `${mapInfo.name} 지도를 ${isPublic ? '공개' : '비공개'}로 바꾸었습니다.`,
      )
      refetchMapInfo()
    } catch (err) {
      notify.error('서버에 문제가 생겼습니다.')
    } finally {
      setIsOpenMapToPublicModal(false)
    }
  }

  const handleClickMapReveal = () => {
    if (!mapInfo.isPublic) {
      // 비공개 => 공개
      setIsOpenMapToPublicModal(true)
      return
    }

    // 공개 => 비공개
    updateMapVisibility(false)
  }

  return (
    <>
      <button
        type="button"
        className="flex rounded-[8px]"
        onClick={handleClickMapReveal}
      >
        <Typography
          size="h6"
          color={mapInfo.isPublic ? 'neutral-300' : 'neutral-000'}
          className={cn(
            'rounded-[8px] px-[6px] py-[3px]',
            !mapInfo.isPublic && 'bg-neutral-500',
          )}
        >
          비공개
        </Typography>
        <Typography
          size="h6"
          color={mapInfo.isPublic ? 'neutral-000' : 'neutral-300'}
          className={cn(
            'rounded-[8px] px-[6px] py-[3px]',
            mapInfo.isPublic && 'bg-orange-400',
          )}
        >
          공개
        </Typography>
      </button>

      <BottomModal
        layout="confirm"
        title={`${mapInfo.name}지도를 공개할까요?`}
        isOpen={isOpenPrivateModal}
        cancelMessage="취소"
        confirmMessage="공개로 전환"
        body={
          '모두가 지도에 참여할 수 있고, 등록된 맛집을 확인하고 좋아요를 누를 수 있어요.'
        }
        onClose={() => setIsOpenMapToPublicModal(false)}
        onCancel={() => setIsOpenMapToPublicModal(false)}
        onConfirm={() => updateMapVisibility(true)}
      />
    </>
  )
}

export default MapInfoVisibility
