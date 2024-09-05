'use client'

import BottomModal from '@/components/common/bottom-modal'
import Icon from '@/components/common/icon'
import Input from '@/components/common/input'
import Typography from '@/components/common/typography'
import type { ClassName } from '@/models/common'
import type { MapInfo } from '@/models/map'
import cn from '@/utils/cn'
import { useState } from 'react'

const MIN_LENGTH = 2
const MAX_LENGTH = 8

interface MapTitleProps extends ClassName {
  mapName: MapInfo['name']
  mapId: MapInfo['id']
  isMyMap: boolean
}

const MapTitle = ({ mapName, className, isMyMap }: MapTitleProps) => {
  const [mapNameInput, setMapNameInput] = useState(mapName || '')
  const [isOpenEditModal, setIsOpenEditModal] = useState(false)

  const handleChangeMapName = async () => {
    // TODO: api 연동
  }

  return (
    <>
      <div className={cn('', className)}>
        {isMyMap ? (
          <button
            type="button"
            className="flex items-center gap-1"
            onClick={() => setIsOpenEditModal(true)}
          >
            <Typography size="body0-2" color="neutral-000">
              {mapName}
            </Typography>
            <Icon type="pencil" size="xl" />
          </button>
        ) : (
          <Typography size="body0-2" color="neutral-000">
            {mapName}
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
        disabled={!mapName || mapName === mapName}
      />
    </>
  )
}

export default MapTitle
