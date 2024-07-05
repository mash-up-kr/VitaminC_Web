import { formatDistance, getDistance } from '@/utils/location'
import useUserGeoLocation from '@/hooks/use-user-geo-location'
import type { KakaoPlaceItem } from '@/types/map/kakao-raw-type'
import PlaceAutoSearchItem from '@/components/place/place-auto-search-item'

interface SuggestPlaceListProps {
  places: KakaoPlaceItem[]
  query: string
}

const SuggestPlaceList = ({ places, query }: SuggestPlaceListProps) => {
  const userLocation = useUserGeoLocation()

  return (
    <ul className="flex flex-col space-y-[13px] divide-y divide-neutral-600 mx-[-20px]">
      {places.map((place) => {
        console.log(userLocation, place.x, place.y)
        const diffDistance = getDistance(
          userLocation.latitude,
          userLocation.longitude,
          place.y,
          place.x,
        )

        return (
          <PlaceAutoSearchItem
            key={place.id}
            {...place}
            className="px-5"
            query={query}
            distance={diffDistance === 0 ? '' : formatDistance(diffDistance)}
            numOfReview={312}
          />
        )
      })}
    </ul>
  )
}

export default SuggestPlaceList
