'use client'

import { useEffect, useRef, useState } from 'react'
import KakaoMap from '@/components/kakao-map/kakao-map'
import Marker from '@/components/kakao-map/marker'
import PlaceMapPopup from '@/components/place/place-map-popup'
import { Avatar, Icon, Typography } from '@/components'
import Tooltip from '@/components/tooltip'
import Link from 'next/link'
import BottomSheet from '@/components/bottom-sheet'
import { visitedMapIdsStorage } from '@/utils/storage'
import SearchAnchorBox from './search-anchor-box'
import { PLACE_DETAIL_DATA, PLACE_LIST_DATA } from '@/constants/place'

const MAP_DATA = {
  id: '123',
  name: '바이타민C',
}

const MapMain = ({ params: { mapId } }: { params: { mapId: string } }) => {
  const [selectedPlace, setSelectedPlace] = useState<number | null>(null)
  const [isTooltipOpen, setIsTooltipOpen] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  const visitedMapIds = visitedMapIdsStorage.getValueOrNull() ?? []

  const handleClickPlace = (placeId: number) => () => {
    if (selectedPlace === placeId) {
      setSelectedPlace(null)
      return
    }
    setSelectedPlace(placeId)
  }

  useEffect(() => {
    if (!visitedMapIds.includes(mapId)) {
      setIsTooltipOpen(true)
    }
  }, [visitedMapIds, mapId])

  return (
    <>
      <header className="absolute inset-x-5 z-50 top-4 flex flex-col gap-2">
        <div className="w-full flex justify-between">
          <Link href="" className="flex items-center">
            <Typography size="h3">{MAP_DATA.name}</Typography>
            <Icon type="caretDown" size="lg" />
          </Link>
          <Avatar value="홍길동" />
        </div>
        <Tooltip
          open={isTooltipOpen}
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
      <div className="w-full min-h-dvh flex flex-col justify-center items-center bg-neutral-700 px-5">
        <KakaoMap
          className="w-[calc(100%+40px)] h-screen"
          center={{ lat: 37.5665, lng: 126.978 }}
          level={3}
          bottomRef={bottomRef}
        >
          {PLACE_LIST_DATA.map((place) => (
            <Marker
              isSaved
              key={place.place.id}
              latitude={place.place.y}
              longitude={place.place.x}
              type={
                selectedPlace === place.place.id
                  ? 'selectedRestaurant'
                  : 'restaurant'
              }
              onClick={handleClickPlace(place.place.id)}
            />
          ))}
        </KakaoMap>
      </div>
      {selectedPlace === null ? (
        <BottomSheet
          ref={bottomRef}
          body={<Typography size="h1">아 하기 싫어</Typography>}
        />
      ) : (
        <PlaceMapPopup
          ref={bottomRef}
          className="absolute bottom-5 px-5"
          image={PLACE_DETAIL_DATA.place.kakaoPlace.photoList[0]}
          address={PLACE_DETAIL_DATA.place.kakaoPlace.address}
          name={PLACE_DETAIL_DATA.place.kakaoPlace.name}
          placeId={PLACE_DETAIL_DATA.place.kakaoPlace.id}
          category={PLACE_DETAIL_DATA.place.kakaoPlace.category}
          pick={{
            isLiked: PLACE_DETAIL_DATA.likedUserIds.includes(1),
            isMyPick: PLACE_DETAIL_DATA.createdBy.id === 1,
            numOfLikes: PLACE_DETAIL_DATA.likedUserIds.length,
            hashtags: PLACE_DETAIL_DATA.tags.map((tag) => tag.content),
            onClickLike: () => null,
          }}
        />
      )}
    </>
  )
}

export default MapMain
