'use client'

import { ChipButton } from '@/components'
import BoardingInfoPass from '@/components/boarding-pass/boarding-info-pass'
import Modal from '@/components/common/Modal/Modal'
import { notify } from '@/components/common/custom-toast'
import { UserByMap } from '@/models/map.interface'
import { MapDataType } from '@/types/api/maps'
import { api } from '@/utils/api'
import { getDiffDateText } from '@/utils/date'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { CircleLoader } from 'react-spinners'

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
  const [maps, setMaps] = useState<UserByMap[]>([])

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

  return (
    <div className="pt-4 pl-5 flex gap-2 justify-start items-center overflow-x-scroll no-scrollbar">
      {maps.map((map) => (
        <ChipButton
          key={map.id}
          className="px-6 py-2 rounded-full flex-shrink-0"
          isActive={mapId === map.id}
          fontSize="body1"
          onClick={() => onClickMap(map.id)}
        >
          {map.name}
        </ChipButton>
      ))}
    </div>
  )
}

const MapInfoModal = ({ mapId, isOpen, onClose }: MapInfoModalProps) => {
  const [currentMapId, setCurrentMapId] = useState(mapId)
  const [mapData, setMapData] = useState<MapDataType>()

  const router = useRouter()

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
    const getMapData = async () => {
      try {
        const { data } = await api.maps.id.get(currentMapId)
        setMapData(data)
      } catch (err) {
        notify.error('지도 정보를 가지고 오는데 에러가 발생했습니다. ')
      }
    }

    getMapData()
  }, [currentMapId])

  return (
    <Modal
      className="w-full max-w-[420px] top-0 translate-y-0"
      isOpen={isOpen}
      onClose={handleCloseModal}
    >
      <div className="flex flex-col items-center gap-3">
        <MapList mapId={currentMapId} onClickMap={handleChangeMap} />
        <div className="px-5">
          {mapData ? (
            <BoardingInfoPass
              mapId={mapData.id}
              name={mapData.name}
              day={getDiffDateText(new Date(mapData.createdAt), new Date())}
              members={mapData.users}
              numOfCrews={mapData.users.length}
              numOfPins={mapData.registeredPlaceCount}
              // TODO: api creator 생성시 변경
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
