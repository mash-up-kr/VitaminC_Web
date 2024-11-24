'use client'

import KakaoMap from '@/components/kakao-map/kakao-map'
import Marker from '@/components/kakao-map/marker'
import PlaceMapPopup from '@/components/place/place-map-popup'
import useSafeRouter from '@/hooks/use-safe-router'
import type { PlaceDetail } from '@/models/api/place'
import type { ClassName } from '@/models/common'
import type { MapInfo } from '@/models/map'
import { getMarkerType } from '@/services/marker'
import cn from '@/utils/cn'

interface PlaceMapProps extends ClassName {
  place: PlaceDetail
  mapId: MapInfo['id']
}

const PlaceMap = ({ className, place, mapId }: PlaceMapProps) => {
  const type = getMarkerType(place.category, true)
  const router = useSafeRouter()

  return (
    <div
      className={cn(
        'flex min-h-dvh w-full flex-col items-center justify-center bg-neutral-700 px-5',
        className,
      )}
    >
      <KakaoMap
        className="h-dvh w-[calc(100%+40px)]"
        center={{ lat: place.y, lng: place.x }}
      >
        <Marker
          key={place.kakaoId}
          latitude={place.y}
          longitude={place.x}
          isSaved={place.isRegisteredPlace}
          type={type}
        />
      </KakaoMap>

      <button
        onClick={() => router.safeBack()}
        className="absolute bottom-5 w-full px-5"
      >
        <PlaceMapPopup mapId={mapId} selectedPlace={place} />
      </button>
    </div>
  )
}

export default PlaceMap
