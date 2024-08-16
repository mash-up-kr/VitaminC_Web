'use client'

import { useMemo, useState, useEffect } from 'react'
import { Avatar, Icon, Typography } from '@/components'
import Tooltip from '@/components/tooltip'
import Link from 'next/link'
import { onboardingStorage, visitedMapIdsStorage } from '@/utils/storage'
import SearchAnchorBox from './search-anchor-box'
import KorrkKakaoMap from '@/components/korrk-kakao-map'
import { api } from '@/utils/api'
import { type PlaceType } from '@/types/api/place'
import { notify } from '@/components/common/custom-toast'
import PlaceListBottomSheet from './place-list-bottom-sheet'
import BottomModal from '@/components/BottomModal'
import FilterModalBody, { type CategoryType } from './filter-modal-body'
import useMeasure from '@/hooks/use-measure'
import PlaceMapPopup from '@/components/place/place-map-popup'
import BottomSheet from '@/components/bottom-sheet'
import MapInfoModal from './map-info-modal'
import { TagItem } from '@/types/api/maps'
import { getMapIdFromCookie, updateMapIdCookie } from '@/services/map-id'
import useFetch from '@/hooks/use-fetch'

export interface FilterIdsType {
  category: string[]
  tags: TagItem['name'][]
}

const INITIAL_FILTER_IDS = {
  category: [],
  tags: [],
}

const MapMain = ({ params: { mapId } }: { params: { mapId: string } }) => {
  const {
    data: userData,
    isFetching,
    error: userError,
  } = useFetch(api.users.me.get, { key: ['user'] })
  const { data: mapData, error: mapError } = useFetch(
    () => api.maps.id.get(mapId),
    { key: ['map', mapId] },
  )
  const {
    data: places,
    error: placesError,
    clear: clearOldPlacedata,
  } = useFetch(() => api.place.mapId.get(mapId), {
    key: ['places', mapId],
    enabled: !!userData && !!mapData,
  })

  const [isMapInfoOpen, setIsMapInfoOpen] = useState(false)
  const [isTooltipOpen, setIsTooltipOpen] = useState(false)
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [selectedFilterNames, setSelectedFilterNames] =
    useState<FilterIdsType>(INITIAL_FILTER_IDS)

  const [filteredPlace, setFilteredPlace] = useState<PlaceType[]>([])
  const [selectedPlace, setSelectedPlace] = useState<PlaceType | null>(null)

  const [bottomRef, bottomBounds] = useMeasure()

  const visitedMapIds = useMemo(
    () => visitedMapIdsStorage.getValueOrNull() ?? [],
    [],
  )

  const mapname = mapData?.name || ''

  const error = userError || mapError || placesError
  if (error) {
    notify.error(error.message)
  }

  const handleClickPlace = (place: PlaceType) => {
    if (selectedPlace?.place.id === place.place.id) {
      setSelectedPlace(null)
      return
    }
    setSelectedPlace(place)
  }

  const handleFilterModalOpen = () => {
    setIsFilterModalOpen(true)
  }

  const handleFilterModalClose = () => {
    setIsFilterModalOpen(false)
  }

  const resetFilter = () => {
    setSelectedFilterNames(INITIAL_FILTER_IDS)
    handleFilterModalOpen()
  }

  const handleSelectedFilterChange = (
    value: CategoryType | TagItem['name'],
  ) => {
    if (value === 'all') {
      setSelectedFilterNames((prev) => ({ ...prev, category: [] }))
      return
    }

    if (value === 'like' || value === 'pick') {
      if (selectedFilterNames.category.includes(value)) {
        setSelectedFilterNames((prev) => ({
          ...prev,
          category: prev.category.filter((c) => c !== value),
        }))
        return
      }
      setSelectedFilterNames((prev) => ({
        ...prev,
        category: [...prev.category, value],
      }))
      return
    }

    if (selectedFilterNames.tags.includes(value)) {
      setSelectedFilterNames((prev) => ({
        ...prev,
        tags: prev.tags.filter((h) => h !== value),
      }))
      return
    }
    setSelectedFilterNames((prev) => ({
      ...prev,
      tags: [...prev.tags, value],
    }))
  }

  useEffect(() => {
    if (onboardingStorage.getValueOrNull()) {
      onboardingStorage.remove()
    }
  }, [])

  useEffect(() => {
    const mapIdFromCookie = getMapIdFromCookie()
    if (mapId !== mapIdFromCookie) {
      updateMapIdCookie(mapId)
    }
  }, [mapId])

  useEffect(() => {
    if (!userData || !places) return
    setFilteredPlace(
      places.filter((place) => {
        const matchesCategory =
          selectedFilterNames.category.length === 0 ||
          selectedFilterNames.category.some((cat) => {
            if (cat === 'like') {
              return place.likedUserIds?.includes(userData.id)
            } else if (cat === 'pick') {
              return place.createdBy?.id === userData.id
            }
            return false
          })

        const matchesTags =
          selectedFilterNames.tags.length === 0 ||
          place.tags.some((tag) => selectedFilterNames.tags.includes(tag.name))

        return matchesCategory && matchesTags
      }),
    )
  }, [places, selectedFilterNames.category, selectedFilterNames, userData])

  useEffect(() => {
    if (!visitedMapIds.includes(mapId)) {
      setIsTooltipOpen(true)
    }
  }, [visitedMapIds, mapId])

  return (
    <div className="h-dvh">
      <header className="absolute inset-x-5 z-50 top-4 flex flex-col gap-2">
        <div className="w-full flex justify-between">
          <button
            className="flex items-center"
            onClick={() => setIsMapInfoOpen(true)}
            aria-label="지도 정보 팝업 열기"
          >
            <Typography size="h3">{mapname}</Typography>
            <Icon type="caretDown" size="lg" />
          </button>
          <Link href="/setting">
            <Avatar value={userData?.nickname ?? ''} loading={isFetching} />
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
          <SearchAnchorBox />
        </Tooltip>
      </header>

      <MapInfoModal
        isOpen={isMapInfoOpen}
        mapId={mapId}
        onClose={() => setIsMapInfoOpen(false)}
      />

      <KorrkKakaoMap<PlaceType>
        places={filteredPlace}
        selectedPlace={selectedPlace}
        onClickMap={() => setSelectedPlace(null)}
        onClickPlace={handleClickPlace}
        topOfBottomBounds={bottomBounds.top}
      />

      {!!places?.length &&
        (selectedPlace === null ? (
          <>
            <BottomSheet
              ref={bottomRef}
              body={
                <PlaceListBottomSheet
                  places={filteredPlace}
                  mapId={mapId}
                  selectedFilter={selectedFilterNames}
                  onClickFilterButton={handleFilterModalOpen}
                  onrRefreshOldPlace={clearOldPlacedata}
                />
              }
            />
            <BottomModal
              title="보고 싶은 맛집을 선택해주세요"
              layoutClassName="max-h-[70dvh]"
              body={
                <FilterModalBody
                  mapId={mapId}
                  selectedFilterNames={selectedFilterNames}
                  onChangeSelectedFilterNames={handleSelectedFilterChange}
                />
              }
              isOpen={isFilterModalOpen}
              cancelMessage="초기화"
              confirmMessage="적용"
              onClose={handleFilterModalClose}
              onConfirm={handleFilterModalClose}
              onCancel={resetFilter}
            />
          </>
        ) : (
          <PlaceMapPopup
            ref={bottomRef}
            mapId={mapId}
            className="absolute bottom-5 px-5"
            selectedPlace={selectedPlace}
          />
        ))}
    </div>
  )
}

export default MapMain
