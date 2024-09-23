import { useState } from 'react'

import BottomModal from '@/components/common/bottom-modal'
import Typography from '@/components/common/typography'
import { notify } from '@/components/common/custom-toast'
import Icon from '@/components/common/icon'
import Input from '@/components/common/input'
import useFetch from '@/hooks/use-fetch'
import { api } from '@/utils/api'
import type { MapInfo } from '@/models/map'

interface MapInfoTitleProps {
  mapInfo: MapInfo
  refetchMapInfo: VoidFunction
}
const MIN_LENGTH = 2
const MAX_LENGTH = 8

const MapInfoEditableTitle = ({
  mapInfo,
  refetchMapInfo,
}: MapInfoTitleProps) => {
  const [isOpenEditModal, setIsOpenEditModal] = useState(false)
  const [mapNameInput, setMapNameInput] = useState(mapInfo.name || '')
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

  return (
    <>
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
    </>
  )
}

export default MapInfoEditableTitle
