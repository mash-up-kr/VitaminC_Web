'use client'

import { useEffect, useMemo, useState } from 'react'

import Link from 'next/link'

import FilterModalBody, { type CategoryType } from './filter-modal-body'
import PlaceListBottomSheet from './place-list-bottom-sheet'
import SearchAnchorBox from './search-anchor-box'
import PlaceListSkeleton from './place-list-skeleton'

import Avatar from '@/components/common/avatar'
import BottomModal from '@/components/common/bottom-modal'
import BottomSheet from '@/components/common/bottom-sheet'
import { notify } from '@/components/common/custom-toast'
import Icon from '@/components/common/icon'
import Tooltip from '@/components/common/tooltip'
import Typography from '@/components/common/typography'
import KorrkKakaoMap from '@/components/korrk-kakao-map'
import PlaceMapPopup from '@/components/place/place-map-popup'
import useFetch from '@/hooks/use-fetch'
import useMeasure from '@/hooks/use-measure'
import type { TagItem } from '@/models/api/maps'
import type { KorrkPlace } from '@/models/api/place'
import { getMapIdFromCookie, updateMapIdCookie } from '@/services/map-id'
import { api } from '@/utils/api'
import { onboardingStorage, visitedMapIdsStorage } from '@/utils/storage'
import Loading from '@/app/loading'
import useMapCircle from '@/hooks/use-map-circle'

export interface FilterIdsType {
  category: CategoryType
  tags: TagItem['name'][]
}

const INITIAL_FILTER_IDS: FilterIdsType = {
  category: 'all',
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
    { key: ['map', mapId], enabled: !!mapId },
  )

  const { center, radius } = useMapCircle()
  const {
    data: places,
    error: placesError,
    status: placesStatus,
    refetch: clearOldPlacedata,
  } = useFetch(
    () =>
      api.place.mapId.nearby.get({
        mapId,
        lat: center.lat,
        lng: center.lng,
        radius,
      }),
    {
      key: ['places', [mapId, center, radius].join('')],
      enabled: !!mapId && !!center,
    },
  )

  const [status, setStatus] = useState('pending')

  const [isTooltipOpen, setIsTooltipOpen] = useState(false)
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [selectedFilterNames, setSelectedFilterNames] =
    useState<FilterIdsType>(INITIAL_FILTER_IDS)

  const [filteredPlace, setFilteredPlace] = useState<KorrkPlace[] | null>(null)
  const [selectedPlace, setSelectedPlace] = useState<KorrkPlace | null>(null)

  const [mapIdFromCookie, setMapIdFromCookie] = useState('')

  const [bottomRef, bottomBounds] = useMeasure()

  const visitedMapIds = useMemo(
    () => visitedMapIdsStorage.getValueOrNull() ?? [],
    [],
  )

  const mapName = mapData?.name || ''

  const error = userError || mapError || placesError
  if (error) {
    notify.error(error.message)
  }

  const handleClickPlace = (place: KorrkPlace) => {
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
      setSelectedFilterNames((prev) => ({ ...prev, category: 'all' }))
      return
    }

    if (value === 'like' || value === 'pick') {
      if (selectedFilterNames.category === value) {
        setSelectedFilterNames((prev) => ({
          ...prev,
          category: 'all',
        }))
        return
      }
      setSelectedFilterNames((prev) => ({
        ...prev,
        category: value,
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
    setMapIdFromCookie(getMapIdFromCookie() || '')
  }, [])

  useEffect(() => {
    if (!mapId || !mapIdFromCookie) return

    if (mapId !== mapIdFromCookie) {
      ;(async () => {
        const updatedMapIdCookie = await updateMapIdCookie(mapId)
        setMapIdFromCookie(updatedMapIdCookie || '')
      })()
    }
  }, [mapId, mapIdFromCookie])

  useEffect(() => {
    if (!userData || !places) return
    if (
      selectedFilterNames.category === 'all' &&
      selectedFilterNames.tags.length === 0
    ) {
      setFilteredPlace(places)
      setStatus(placesStatus)
      return
    }
    setFilteredPlace(
      places.filter((place) => {
        const checkMatchesCategory = () => {
          if (selectedFilterNames.category === 'all') return true
          if (
            selectedFilterNames.category === 'like' &&
            place.likedUser?.some((liked) => liked.id === userData.id)
          )
            return true
          if (
            selectedFilterNames.category === 'pick' &&
            place.createdBy?.id === userData.id
          )
            return true

          return false
        }
        const matchesCategory = checkMatchesCategory()

        const matchesTags =
          selectedFilterNames.tags.length === 0 ||
          place.tags.some((tag: TagItem) =>
            selectedFilterNames.tags.includes(tag.name),
          )

        return matchesCategory && matchesTags
      }),
    )
    setStatus(placesStatus)
  }, [
    places,
    selectedFilterNames.category,
    selectedFilterNames,
    userData,
    placesStatus,
  ])

  useEffect(() => {
    if (!visitedMapIds.includes(mapId)) {
      setIsTooltipOpen(true)
    }
  }, [visitedMapIds, mapId])

  if (mapId !== mapIdFromCookie) {
    return <Loading />
  }

  return (
    <div className="h-dvh">
      <div className="map-header-gradient absolute top-0 z-[40] h-[117px] w-full" />
      <header className="absolute inset-x-5 top-4 z-50 flex flex-col gap-2">
        <div className="flex w-full justify-between">
          <Link
            className="flex items-center"
            href="/my-map"
            aria-label="지도 정보 팝업 열기"
          >
            <Typography size="h3">{mapName}</Typography>
            <Icon type="caretDown" size="lg" />
          </Link>
          <Link href="/setting">
            <Avatar
              value={userData?.nickname}
              imageUrl={userData?.profileImage}
              loading={isFetching}
            />
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

      <KorrkKakaoMap<KorrkPlace>
        places={filteredPlace}
        selectedPlace={selectedPlace}
        onClickMap={() => setSelectedPlace(null)}
        onClickPlace={handleClickPlace}
        topOfBottomBounds={bottomBounds.top}
      />

      {selectedPlace === null ? (
        <>
          <BottomSheet
            ref={bottomRef}
            body={(contentRef) =>
              status === 'success' ? (
                <PlaceListBottomSheet
                  ref={contentRef}
                  places={filteredPlace}
                  mapId={mapId}
                  selectedFilter={selectedFilterNames}
                  onClickFilterButton={handleFilterModalOpen}
                  onRefreshOldPlace={clearOldPlacedata}
                />
              ) : (
                <PlaceListSkeleton ref={contentRef} />
              )
            }
          />
          <BottomModal
            title="보고 싶은 맛집을 선택해주세요"
            layoutClassName="max-h-[70dvh] pb-[20px]"
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
        <Link
          href={`/place/${selectedPlace.place.kakaoPlace.id}`}
          ref={bottomRef}
        >
          <PlaceMapPopup
            mapId={mapId}
            className="absolute bottom-5 px-5"
            selectedPlace={selectedPlace}
          />
        </Link>
      )}
    </div>
  )
}

export default MapMain
