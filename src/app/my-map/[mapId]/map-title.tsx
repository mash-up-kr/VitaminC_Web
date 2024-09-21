'use client'

import BottomModal from '@/components/common/bottom-modal'
import { notify } from '@/components/common/custom-toast'
import Icon from '@/components/common/icon'
import Input from '@/components/common/input'
import Typography from '@/components/common/typography'
import useFetch from '@/hooks/use-fetch'
import type { ClassName } from '@/models/common'
import type { MapInfo } from '@/models/map'
import type { User } from '@/models/user'
import { api } from '@/utils/api'
import cn from '@/utils/cn'
import { useState } from 'react'

const MIN_LENGTH = 2
const MAX_LENGTH = 8

interface MapTitleProps extends ClassName {
  mapInfo: MapInfo
  user: User
  refetchMapInfo: VoidFunction
}

const MapTitle = ({
  mapInfo,
  user,
  className,
  refetchMapInfo,
}: MapTitleProps) => {
  const [mapNameInput, setMapNameInput] = useState(mapInfo.name || '')
  const [isOpenEditModal, setIsOpenEditModal] = useState(false)
  const [isOpenPrivateModal, setIsOpenMapToPublicModal] = useState(false)
  const { revalidate } = useFetch()

  const handleChangeMapName = async () => {
    if (mapNameInput.length === 0 || mapNameInput === mapInfo.name) return

    try {
      const { id, isPublic, description } = mapInfo
      await api.maps.id.patch({
        id,
        isPublic,
        description,
        name: mapNameInput,
      })
      revalidate(['map', mapInfo.id])
      notify.success(`${mapNameInput}으로 바꾸었습니다.`)
      refetchMapInfo()
    } catch (err) {
      notify.error('서버에 문제가 생겼습니다.')
    } finally {
      setIsOpenEditModal(false)
    }
  }

  const fetchRevalMap = async (isPublic: boolean) => {
    try {
      const { id, description, name } = mapInfo
      await api.maps.id.patch({
        id,
        isPublic,
        description,
        name,
      })
      revalidate(['map', mapInfo.id])
      notify.success(`${mapNameInput} 지도를 ${isPublic ? '공개' : '비공개'}로 바꾸었습니다.`)
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
    fetchRevalMap(false)
  }

  return (
    <>
      <div className={cn('', className)}>
        {mapInfo.createBy.id === user.id ? (
          <div className="flex w-full items-center justify-between">
            <button
              type="button"
              className="flex items-center gap-1"
              onClick={() => setIsOpenEditModal(true)}
            >
              <Typography size="body0-2" color="neutral-000">
                {mapInfo.name}
              </Typography>
              <Icon type="pencil" size="xl" />
            </button>

            <div className="w-fit rounded-[8px] bg-neutral-600 px-[3px] py-[4px]">
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
            </div>
          </div>
        ) : (
          <Typography size="body0-2" color="neutral-000">
            {mapInfo.name}
          </Typography>
        )}
      </div>

      <BottomModal
        layout="alert"
        title="어떤 이름으로 바꿀까요?"
        isOpen={isOpenEditModal}
        confirmMessage="이름 변경"
        body={
          <Input
            ref={(node) => node?.focus()}
            value={mapNameInput}
            onChange={(value) => setMapNameInput(value)}
            minLength={MIN_LENGTH}
            maxLength={MAX_LENGTH}
            placeholder="지도명 최대 8글자"
          />
        }
        onClose={() => setIsOpenEditModal(false)}
        onCancel={() => setIsOpenEditModal(false)}
        onConfirm={handleChangeMapName}
        disabled={!mapNameInput || mapNameInput === mapInfo.name}
      />

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
        onConfirm={() => fetchRevalMap(true)}
      />
    </>
  )
}

export default MapTitle
