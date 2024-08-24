'use client'

import { useEffect, useState } from 'react'

import BoardingInfoPass from '@/components/boarding-pass/boarding-info-pass'
import ChipButton from '@/components/common/chip-button'
import { notify } from '@/components/common/custom-toast'
import Icon from '@/components/common/icon'
import Modal from '@/components/common/modal'
import Spinner from '@/components/common/spinner'
import useFetch from '@/hooks/use-fetch'
import useSafeRouter from '@/hooks/use-safe-router'
import { APIError } from '@/models/api/index'
import type { MapInfo } from '@/models/map'
import { api } from '@/utils/api'
import { getDiffDateText } from '@/utils/date'

interface MapInfoModalProps {
  mapId: string
  isOpen: boolean
  onClose: VoidFunction
}

const MapList = ({
  mapId,
  onClickMap,
}: {
  mapId: string
  onClickMap: (mapId: string) => void
}) => {
  const {
    data: maps,
    isFetching,
    error,
  } = useFetch(api.maps.get, { initialData: [], key: ['map-list', mapId] })
  const router = useSafeRouter()
  const hasOwnerMap = maps?.some((map) => map.role === 'ADMIN')

  if (error) {
    notify.error('지도 목록을 가져오지 못했습니다.')
  }

  return (
    <div className="no-scrollbar flex items-center justify-start gap-2 overflow-x-scroll pl-5 pt-4">
      {isFetching && (
        <ChipButton
          className="flex-shrink-0 rounded-full bg-transparent py-2"
          fontSize="body1"
        >
          <div className="flex items-center">
            ⠀<Spinner />⠀
          </div>
        </ChipButton>
      )}
      {maps?.map((map) => (
        <ChipButton
          key={map.id}
          className="flex-shrink-0 rounded-full px-6 py-2"
          isActive={mapId === map.id}
          fontSize="body1"
          onClick={() => onClickMap(map.id)}
        >
          {map.name}
        </ChipButton>
      ))}
      {!isFetching && !hasOwnerMap && (
        <ChipButton
          className="flex-shrink-0 rounded-full px-6 py-2"
          onClick={() => router.push('/map/create')}
          aria-label="지도 생성"
        >
          <Icon type="plus" size="lg" />
        </ChipButton>
      )}
    </div>
  )
}

const MapInfoModal = ({ mapId, isOpen, onClose }: MapInfoModalProps) => {
  const [currentMapId, setCurrentMapId] = useState(mapId)
  const [mapData, setMapData] = useState<MapInfo>()

  const router = useSafeRouter()

  const handleCloseModal = () => {
    if (currentMapId === mapId) {
      onClose()
      return
    }
    router.push(`/map/${currentMapId}`)
  }

  const handleChangeMap = (selectedMapId: string) => {
    setCurrentMapId(selectedMapId)
  }

  useEffect(() => {
    if (!isOpen) return

    const getMapData = async () => {
      try {
        const { data } = await api.maps.id.get(currentMapId)
        setMapData(data)
      } catch (error) {
        if (error instanceof APIError) {
          notify.error(error.message)
          return
        }
        notify.error('지도 목록을 가지고 오는데 에러가 발생했습니다.')
      }
    }

    getMapData()
  }, [currentMapId, isOpen])

  return (
    <>
      <Modal
        className="top-0 w-full max-w-[420px] translate-y-0"
        isOpen={isOpen}
        onClose={handleCloseModal}
      >
        <div className="flex flex-col gap-3">
          <MapList mapId={currentMapId} onClickMap={handleChangeMap} />
          <div className="w-full">
            {mapData && (
              <BoardingInfoPass
                className="px-5"
                mapId={mapData.id}
                mapName={mapData.name}
                day={getDiffDateText(new Date(mapData.createdAt), new Date())}
                members={mapData.users}
                numOfCrews={mapData.users.length}
                numOfPins={mapData.registeredPlaceCount}
                creator={mapData.createBy}
              />
            )}
          </div>
        </div>
      </Modal>
    </>
  )
}

export default MapInfoModal
