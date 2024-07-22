'use client'

import { useMemo, useState } from 'react'
import { Avatar, Icon, Typography } from '@/components'
import Tooltip from '@/components/tooltip'
import Link from 'next/link'
import { visitedMapIdsStorage } from '@/utils/storage'
import SearchAnchorBox from './search-anchor-box'
import KorrkKakaoMap from '@/components/korrk-kakao-map'
import { api } from '@/utils/api'
import type { PlaceType } from '@/types/api/place'
import { notify } from '@/components/common/custom-toast'
import { useIsomorphicLayoutEffect } from '@/hooks/use-isomorphic-layout-effect'
import PlaceListBottomSheet from './place-list-bottom-sheet'
import BottomModal from '@/components/BottomModal'
import FilterModalBody, { type CategoryType } from './filter-modal-body'
import useMeasure from '@/hooks/use-measure'
import PlaceMapPopup from '@/components/place/place-map-popup'
import BottomSheet from '@/components/bottom-sheet'
import { APIError, BOTTOM_SHEET_STATE } from '@/models/interface'

export interface FilterIdsType {
  category: string[]
  tags: number[]
}

const INITIAL_FILTER_IDS = {
  category: [],
  tags: [],
}

const MapMain = ({ params: { mapId } }: { params: { mapId: string } }) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false)
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [selectedFilterIds, setSelcectedFilterIds] =
    useState<FilterIdsType>(INITIAL_FILTER_IDS)

  const [places, setPlaces] = useState<PlaceType[]>([])
  const [filteredPlace, setFilteredPlace] = useState<PlaceType[]>([])
  const [selectedPlace, setSelectedPlace] = useState<PlaceType | null>(null)

  const [mapname, setMapname] = useState<string>('')

  const [bottomRef, bottomBounds] = useMeasure()

  const visitedMapIds = useMemo(
    () => visitedMapIdsStorage.getValueOrNull() ?? [],
    [],
  )

  const handleClickPlace = (place: PlaceType) => {
    if (selectedPlace?.place.id === place.place.id) {
      setSelectedPlace(null)
      return
    }
    setSelectedPlace(place)
  }

  const handleFilterModalOpen = () => {
    setIsFilterModalOpen(!isFilterModalOpen)
  }

  const resetFilter = () => {
    setSelcectedFilterIds(INITIAL_FILTER_IDS)
  }

  const handleSelectedFilterChange = (value: CategoryType | number) => {
    if (value === 'all') {
      setSelcectedFilterIds((prev) => ({ ...prev, category: [] }))
      return
    }

    if (value === 'like' || value === 'pick') {
      if (selectedFilterIds.category.includes(value)) {
        setSelcectedFilterIds((prev) => ({
          ...prev,
          category: prev.category.filter((c) => c !== value),
        }))
        return
      }
      setSelcectedFilterIds((prev) => ({
        ...prev,
        category: [...prev.category, value],
      }))
      return
    }

    if (typeof value === 'number') {
      if (selectedFilterIds.tags.includes(value)) {
        setSelcectedFilterIds((prev) => ({
          ...prev,
          tags: prev.tags.filter((h) => h !== value),
        }))
        return
      }
      setSelcectedFilterIds((prev) => ({
        ...prev,
        tags: [...prev.tags, value],
      }))
    }
  }

  useIsomorphicLayoutEffect(() => {
    const getPlaceList = async () => {
      try {
        const { data: placeList } = await api.place.mapId.get(mapId)
        setPlaces(placeList)
      } catch (err) {
        if (err instanceof APIError) {
          notify.error(err.message)
        }
      }
    }

    const getMapname = async () => {
      try {
        const { data } = await api.maps.id.get(mapId)
        setMapname(data.name)
      } catch (err) {
        if (err instanceof APIError) {
          notify.error(err.message)
        }
      }
    }

    getMapname()
    getPlaceList()
  }, [])

  useIsomorphicLayoutEffect(() => {
    setFilteredPlace(
      places.filter((place) => {
        const matchesCategory =
          selectedFilterIds.category.length === 0 ||
          selectedFilterIds.category.some((cat) => {
            if (cat === 'like') {
              //TODO: userId 저장하는 store 완성 후 연결
              return place.likedUserIds.includes(1)
            } else if (cat === 'pick') {
              return place.createdBy.id === 1
            }
            return false
          })

        const matchestags =
          selectedFilterIds.tags.length === 0 ||
          place.tags.some((tag) => selectedFilterIds.tags.includes(tag.id))

        return matchesCategory && matchestags
      }),
    )
  }, [places, selectedFilterIds])

  useIsomorphicLayoutEffect(() => {
    if (!visitedMapIds.includes(mapId)) {
      setIsTooltipOpen(true)
    }
  }, [visitedMapIds, mapId])

  return (
    <>
      <header className="absolute inset-x-5 z-50 top-4 flex flex-col gap-2">
        <div className="w-full flex justify-between">
          {/* TODO: 초대장 페이지 제작 후 연결 */}
          <Link href="" className="flex items-center">
            <Typography size="h3">{mapname}</Typography>
            <Icon type="caretDown" size="lg" />
          </Link>
          <Link href="/setting">
            <Avatar value="홍길동" />
          </Link>
        </div>
        <Tooltip
          isOpen={isTooltipOpen}
          label="원하는 장소를 등록해서 맛집을 등록해보세요!"
          onClose={() => {
            setIsTooltipOpen(false)
            visitedMapIdsStorage.set([
              ...(visitedMapIdsStorage.getValueOrNull() ?? []),
              mapId,
            ])
          }}
        >
          <SearchAnchorBox mapId={mapId} />
        </Tooltip>
      </header>

      <KorrkKakaoMap
        places={filteredPlace}
        selectedPlace={selectedPlace}
        onClickPlace={handleClickPlace}
        topOfBottomBounds={bottomBounds.top}
      />

      {selectedPlace === null ? (
        <>
          <BottomSheet
            ref={bottomRef}
            body={
              <PlaceListBottomSheet
                places={places}
                selectedFilter={selectedFilterIds}
                onClickFilterButton={handleFilterModalOpen}
              />
            }
            state={
              places.length
                ? BOTTOM_SHEET_STATE.Default
                : BOTTOM_SHEET_STATE.Collapsed
            }
          />
          <BottomModal
            title="보고 싶은 맛집을 선택해주세요"
            body={
              <FilterModalBody
                mapId={mapId}
                selectedFilterIds={selectedFilterIds}
                onChangeSelectedFilterIds={handleSelectedFilterChange}
              />
            }
            isOpen={isFilterModalOpen}
            cancelMessage="초기화"
            confirmMessage="적용"
            onClose={handleFilterModalOpen}
            onConfirm={handleFilterModalOpen}
            onCancel={resetFilter}
          />
        </>
      ) : (
        <PlaceMapPopup
          ref={bottomRef}
          className="absolute bottom-5 px-5"
          selectedPlace={selectedPlace}
        />
      )}
    </>
  )
}

export default MapMain
