'use client'

import { useState } from 'react'

import type { EditableMapInfo, OpenModal } from './type'
import MapInfoEditableTitle from './map-info-editable-title'
import MapInfoVisibility from './map-info-visibility'
import MapInfoEditableDescription from './map-info-editable-description'

import Typography from '@/components/common/typography'
import type { ClassName } from '@/models/common'
import type { MapInfo } from '@/models/map'
import type { User } from '@/models/user'
import cn from '@/utils/cn'
import useFetch from '@/hooks/use-fetch'
import { notify } from '@/components/common/custom-toast'
import { api } from '@/utils/api'
import get조사 from '@/utils/조사'

interface MapInfoBoxProps extends ClassName {
  mapInfo: MapInfo
  user: User
  refetchMapInfo: VoidFunction
}

const MapInfoBox = ({
  mapInfo,
  user,
  className,
  refetchMapInfo,
}: MapInfoBoxProps) => {
  const [openModal, setOpenModal] = useState<OpenModal>(null)
  const [mapNameInput, setMapNameInput] = useState(mapInfo.name || '')
  const [mapDescriptionInput, setMapDescriptionInput] = useState(
    mapInfo.description || '',
  )
  const { revalidate } = useFetch()

  const handleOpenModal = (key: OpenModal) => {
    setOpenModal(key)
  }

  const handleChangeInput = (
    key: Omit<EditableMapInfo, 'visibility'>,
    value: string,
  ) => {
    if (key === 'name') {
      setMapNameInput(value)
    } else if (key === 'description') {
      setMapDescriptionInput(value)
    }
  }

  const isValidInput = (key: Omit<EditableMapInfo, 'visibility'>) => {
    if (
      key === 'name' &&
      (mapNameInput.length === 0 || mapNameInput === mapInfo.name)
    ) {
      return false
    }
    if (key === 'description' && mapDescriptionInput === mapInfo.description) {
      return false
    }
    return true
  }

  const notifySuccess = (key: EditableMapInfo) => {
    switch (key) {
      case 'name':
        return notify.success(
          `${mapNameInput}${get조사(mapNameInput, '으로/로')} 변경했습니다.`,
        )
      case 'visibility':
        return notify.success(
          `${mapInfo.name} 지도를 ${!mapInfo.isPublic ? '공개' : '비공개'}로 변경했습니다.`,
        )
      case 'description':
        return notify.success(`${mapInfo.name} 지도 한 줄 소개를 변경했습니다.`)
    }
  }

  const handleChangeMapInfo = async (key: EditableMapInfo) => {
    if (!isValidInput(key)) return

    try {
      let { id, isPublic, name, description } = mapInfo
      if (key === 'name') {
        name = mapNameInput
      } else if (key === 'visibility') {
        isPublic = !isPublic
      } else if (key === 'description') {
        description = mapDescriptionInput
      }

      await api.maps.id.patch({
        id,
        isPublic,
        description,
        name,
      })

      notifySuccess(key)

      revalidate(['map', mapInfo.id])
      refetchMapInfo()
    } catch (err) {
      notify.error('서버에 문제가 생겼습니다.')
    } finally {
      setOpenModal(null)
    }
  }

  return (
    <div className={cn(className)}>
      {mapInfo.createBy.id === user.id ? (
        <div className="space-y-4">
          <div className="flex w-full items-center justify-between">
            <MapInfoEditableTitle
              mapName={mapInfo.name}
              mapNameInput={mapNameInput}
              handleChangeInput={handleChangeInput}
              openModal={openModal}
              handleOpenModal={handleOpenModal}
              handleChangeMapInfo={handleChangeMapInfo}
            />
            <div className="w-fit rounded-[8px] bg-neutral-600 px-[3px] py-[4px]">
              <MapInfoVisibility
                mapName={mapInfo.name}
                isPublic={mapInfo.isPublic}
                openModal={openModal}
                handleOpenModal={handleOpenModal}
                handleChangeMapInfo={handleChangeMapInfo}
              />
            </div>
          </div>
          <MapInfoEditableDescription
            mapName={mapInfo.name}
            mapDescription={mapInfo.description}
            mapDescriptionInput={mapDescriptionInput}
            handleChangeInput={handleChangeInput}
            openModal={openModal}
            handleOpenModal={handleOpenModal}
            handleChangeMapInfo={handleChangeMapInfo}
          />
        </div>
      ) : (
        <div className="space-y-4">
          <Typography size="body0-2" color="neutral-000">
            {mapInfo.name}
          </Typography>
          {mapInfo.description && (
            <Typography size="body1" color="neutral-200">
              {mapInfo.description}
            </Typography>
          )}
        </div>
      )}
    </div>
  )
}

export default MapInfoBox
