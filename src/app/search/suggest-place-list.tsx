import { formatDistance, getDistance } from '@/utils/location'
import useUserGeoLocation from '@/hooks/use-user-geo-location'
import PlaceAutoSearchItem from '@/components/place/place-auto-search-item'
import { allowUserPositionStorage } from '@/utils/storage'
import type { SearchPlace } from '@/types/api/place'

interface SuggestPlaceListProps {
  places: SearchPlace[]
  query: string
}

const SuggestPlaceList = ({ places, query }: SuggestPlaceListProps) => {
  const userLocation = useUserGeoLocation()
  const isAllowPosition = allowUserPositionStorage.getValueOrNull()

  return (
    <ul className="mx-[-20px] flex flex-col space-y-[17px] divide-y divide-neutral-600">
      {places.map((place) => {
        const diffDistance = getDistance(
          userLocation.latitude,
          userLocation.longitude,
          place.y,
          place.x,
        )

        return (
          <PlaceAutoSearchItem
            key={place.kakaoId}
            className="px-5"
            query={query}
            place={place}
            distance={isAllowPosition ? formatDistance(diffDistance) : null}
          />
        )
      })}
    </ul>
  )
}

export default SuggestPlaceList
