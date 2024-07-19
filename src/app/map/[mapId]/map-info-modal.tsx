'use client'

import { ChipButton } from '@/components'
import BoardingInfoPass from '@/components/boarding-pass/boarding-info-pass'
import Modal from '@/components/common/Modal/Modal'
import { notify } from '@/components/common/custom-toast'
import { MapItemForUser } from '@/models/interface'
import { MapDataType } from '@/types/api/maps'
import { api } from '@/utils/api'
import { getDiffDateText } from '@/utils/date'
import { useEffect, useState } from 'react'
import { CircleLoader } from 'react-spinners'

interface MapInfoModalProps {
  mapId: string
  isOpen: boolean
  onClose: VoidFunction
}

const MapInfoModal = ({ mapId, isOpen, onClose }: MapInfoModalProps) => {
  const [maps, setMaps] = useState<MapItemForUser[]>([])
  const [mapData, setMapData] = useState<MapDataType>()

  useEffect(() => {
    const getMapList = async () => {
      try {
        const { data } = await api.maps.get()
        setMaps(data)
      } catch (err) {
        notify.error('지도 목록을 가지고 오는데 에러가 발생했습니다. ')
      }
    }

    getMapList()
  }, [])

  useEffect(() => {
    const getMapData = async () => {
      try {
        const { data } = await api.maps.id.get(mapId)
        setMapData(data)
      } catch (err) {
        notify.error('지도 정보를 가지고 오는데 에러가 발생했습니다. ')
      }
    }

    getMapData()
  }, [mapId])

  return (
    <Modal
      className="w-full max-w-[420px] top-0 translate-y-0"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex flex-col items-center gap-3">
        {/* 지도 리스트 */}
        <div className="pt-4 pl-5 flex gap-2 justify-start items-center overflow-x-scroll no-scrollbar">
          {maps.map((map) => (
            <ChipButton
              className="px-6 py-2 rounded-full flex-shrink-0"
              isActive={mapId === map.id}
              fontSize="body1"
            >
              {map.name}
            </ChipButton>
          ))}
        </div>
        {/* 초대장 */}
        <div className="px-5">
          {mapData ? (
            <BoardingInfoPass
              mapId={mapData.id}
              name={mapData.name}
              day={getDiffDateText(new Date(mapData.createdAt), new Date())}
              members={mapData.users}
              numOfCrews={mapData.users.length}
              numOfPins={mapData.registeredPlaceCount}
              owner={mapData.users.filter((user) => user.role === 'ADMIN')[0]}
            />
          ) : (
            <div className="flex justify-center items-center">
              <CircleLoader color="#fff" />
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default MapInfoModal
